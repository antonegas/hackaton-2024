use std::{
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
    thread,
    fs,
    io,
    collections::HashMap
};

use serde::{Deserialize, Serialize};


static mut stream_party_map : HashMap<u32, Vec<&mut TcpStream>> = HashMap::new(); 
static mut active_parties : Vec<Party> = Vec::new();

#[derive(Serialize, Deserialize)]
struct Player {
        username : Box<str>,
        avatar_url : Box<str>,
}

#[derive(Serialize, Deserialize)]
struct Party {
    id : u32,
    players : Vec<Player>,
}



fn main() {
    println!("trying to establish server connection");

    match TcpListener::bind("192.168.168.218:5173"){
        //bind() -> Result<Ok(TcpStream), io::Error>
        Ok(listener) => {
            println!("Established connection, {}", listener.local_addr().unwrap());
            for stream in listener.incoming() {
                //println!("trying to unwrap >w<");
                //let stream = stream.unwrap(); //Probably replace this unwrap unless i'm too retarded
                println!("Spawning a thread");

                match  stream {
                        Ok(stream) => {
                                
                            thread::spawn(|| {
                                handle_connection(&mut stream);
                            });
                        },
                        Err(..) => {
                            let response = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
                            //WTF does expect("REASON") do ???
                            stream.expect("REASON").write_all(response.as_bytes()).unwrap();
                        }
                }
            }
        },
        Err(..) => {
            println!("Establishing connection failed");
        }
    }
}


fn handle_connection(stream: &mut TcpStream) -> io::Result<()> {
    
    let buf_reader = BufReader::new(&mut stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .take_while(|result| match result {
            Ok(line) => !line.is_empty(),
            Err(_) => false,
        })
        .collect::<Result<_, _>>()?;

    println!("Request: {:#?}", http_request);

    if let Some(route) = http_request.get(0) {
        let parts = route.split_whitespace().collect::<Vec<&str>>();

        match parts.as_slice() {
            ["GET", "/", ..] => {
                return return_home(&stream);
            },
            ["GET", "/join", party_id, ..] => {
                println!("{} is the party id", party_id);
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes())?;
            },
            ["GET", "/create", ..] => {
                let status_line = "HTTP/1.1 200 OK";
                let party_id = gen_party_id();
                println!("{}", party_id);
                let contents = "{party_id}";
                let length = contents.len();
                let content_type = "text/text";
                 
                let mut new_player = serde_json::Deserializer::from_reader(stream);
                let host = Player::deserialize(&mut new_player)?;

                let new_party = Party {
                        id : party_id,
                        players : vec![host], //TODO get initial player
                };

                unsafe {
                        let new_vec = vec![stream];
                        stream_party_map.insert(party_id, new_vec);
                }

                //insert the party into my bunghole
                unsafe { //entering my bunghole is very unsafe
                        active_parties.push(new_party);
                }

                let response = 
                    format!("{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n{contents}");
            },
            ["GET", possible_asset_req, ..] => {
                let status_line = "HTTP/1.1 200 OK";

                //This means it  has a Token and should be sent to home page
                if possible_asset_req.starts_with("/#") {
                    return return_home(&stream);
                }


                let mut asset_path: String = "../../frontend/dist".to_owned();
                asset_path.push_str(possible_asset_req);

                let contents = fs::read_to_string(asset_path).unwrap();
                let length = contents.len();
                let content_type = "text/javascript";

                let response =
                    format!("{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n{contents}");
                stream.write_all(response.as_bytes())?;
            }
            _ => {
                let response = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
                stream.write_all(response.as_bytes())?;
            }
        }
    } else {
        let response = "HTTP/1.1 400 Bad Request\r\n\r\n";
        stream.write_all(response.as_bytes())?;
    }

    Ok(())
}


//Just writing some test code to play with JSON, probably won't compile and definitley won't work
//For JSON objects, there must be a corresponding struct, with [derive(Serialize, Deserialize)]
//#[serde(rename = "userId")] - how to serialize by a certain name. serde requires camelCase unlike
//Rust which uses snake_case by convention
#[derive(Serialize, Deserialize)]
struct Player_state {
        id : u8,
        x : f32,
        y : f32,
        velocity : (f32, f32),
}

#[derive(Serialize, Deserialize)]
struct Bullet {
        x : f32,
        y : f32,
        velocity : (f32, f32),
}

#[derive(Serialize, Deserialize)]
struct Game_state {
        players : Vec<Player_state>,
        bullets : Vec<Bullet>,
}

#[tokio::main]
async fn turn_json_into_struct() -> Result<(), reqwest::Error> {
        let some_request //: Some_struct
            = reqwest::Client::new() // new request client
            .get("http://127.0.0.1:7878/userId=1") // this issues a get to the placeholder
            .send() // send the request
            .await?
            .text() //turn response body into a str. Replace with .json later
            .await?;
        //still dont know what's happening'

        println!("{:#?}", some_request);
        Ok(())
}

#[tokio::main]
async fn create_and_return_json() -> Result<(), reqwest::Error> {
    let some_struct = Player_state {
        id : 1,
        x : 1.0,
        y : 1.0,
        velocity : (0.1, 0.1),
    };
    let some_struct = reqwest::Client::new()
        .post("http://placeholder")
        .json(&some_struct) //serialize struct into JSON
        .send()
        .await?
        .json() //second send is to take the ressponse and put it into a json and save it in some_struct? seems retarded af
        .await?;

    println!("{:#?}", some_struct);
    
    Ok(())
}



fn return_home(mut stream : &TcpStream) -> io::Result<()>{
    let status_line = "HTTP/1.1 200 OK";
    let contents = fs::read_to_string("../../frontend/dist/index.html").unwrap();
    let length = contents.len();
    let content_type = "text/html";

    let response =
        format!("{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n{contents}");
    stream.write_all(response.as_bytes())?;
    Ok(())
}


fn gen_party_id() -> u32 {
    let mut possible_id : u32 = 0;
    unsafe {
    loop 
    {   
        let mut found = false;
        for party in &active_parties {
            if possible_id == party.id {
                possible_id += 1;
                found = true;
                break
            }
        }
        if !found {
                return possible_id;
        }
        
    }
    }
    return possible_id; // this is dumb, but makes the compiler shut up
}
