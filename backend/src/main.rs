use std::{
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
    thread,
};

fn main() {
    println!("trying to establish server connection");

    match TcpListener::bind("127.0.0.1:7878"){
        //bind() -> Result<Ok(TcpStream), io::Error>
        Ok(listener) => {
            println!("Established connection");
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
        }
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    println!("Request: {:#?}", http_request); 


    let route = http_request[0].as_str().split_whitespace().collect::<Vec<&str>>();
    
    match route.as_slice() {
            ["GET", "/home", ..]=> {
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            },
            ["GET", "/login", ..] => {
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            },
            ["GET", "/user", ..] => {
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            },
            ["GET", "/party", _, ..] => {
                let partyID = route.as_slice()[2];
                println!("{} is the party id", partyID);
                let response = "HTTP/1.1 200 OK\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            },
            _ => {
                let response = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            }
    }
}

//EXAMPLE of returning a HTML response
//Look into finding HTML's from frontend folder
    //let status_line = "HTTP/1.1 200 OK";
  //  let contents = fs::read_to_string("hello.html").unwrap();
  //  let length = contents.len();

  //  let response =
  //      format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");
