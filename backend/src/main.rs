use std::{
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
    thread,
    fs,
    io,
};

use serde::{Deserialize, Serialize};


static mut active_parties : Vec<Party> = Vec::new();



#[derive(Serialize, Deserialize)]
struct Player {
        username : Box<str>,
        avatar : Box<str>,
}

#[derive(Serialize, Deserialize)]
struct Party {
    id : u32,
    players : Vec<Player>,
}



fn main() -> Result<(), io::Error> {
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
                                handle_connection(stream);
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
            return Ok(());
        }
    }
    return Ok(());
}




fn handle_connection(mut stream: TcpStream) -> io::Result<()> {
    
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
            }
            ["GET", "/party", party_id, ..] => {
                let status_line = "HTTP/1.1 200 OK\r\n";
                

                let party_id = party_id.parse::<u32>().unwrap();
                unsafe {
                        
                    for party in &active_parties {
                        if party.id == party_id {
                                let contents = serde_json::to_string(&party).unwrap();
                                let length = contents.len();
                                let content_type = "text/json";

                                let response =
                                    format!("{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n{contents}");
                                stream.write_all(response.as_bytes())?;
                                
                                
                        }
                    }
                }
            },
            ["GET", "/join", party_id, ..] => {
                println!("{} is the party id", party_id);
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes())?;
            },
            ["POST", "/create", ..] => {
                let status_line = "HTTP/1.1 200 OK";
                let party_id = gen_party_id();
                println!("party id {}", party_id);
                let contents = "{party_id}";
                let length = contents.len();
                let content_type = "text/plain";
                



                let reader = BufReader::new(&stream);
                let host: Player = serde_json::from_reader(reader)?;
                

                println!("player {} with url {}", host.username, host.avatar);


                let new_party = Party {
                        id : party_id,
                        players : vec![host],
                };

                unsafe {
                    &active_parties.push(new_party);
                    
                    println!("len of parties {}", &active_parties.len());
                }
                let response = 
                    format!("{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n{contents}");
                stream.write_all(response.as_bytes())?;
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

                let mut content_type = "";

                if possible_asset_req.contains(".js") {
                    content_type = "text/javascript";
                }
                if possible_asset_req.contains(".css") {
                    content_type = "text/css";
                }

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


//This is exceptionally stupid even for me
fn gen_party_id() -> u32 {
    let mut possible_id : u32 = 0;
    unsafe {
        let mut found = false;
        while !found {
            for party in &active_parties {
                if party.id == possible_id {
                    found = true;
                    possible_id += 1;
                    continue;
                }
            }
            if !found {
                return possible_id;
            }
        }
    }
    return possible_id;
}


