use std::{
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
};

fn main() {


    match TcpListener::bind("127.0.0.1:7878"){

        Ok(listener) => {
                    
            for stream in listener.incoming() {
                let stream = stream.unwrap();

                handle_connection(stream);
                }
        }
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


    let route = http_request[0].as_str().split_whitespace().collect::vec<&str>();
    
    match route.as_slice() {
            ["GET", "/A", ..] => {
                    //Do Stuff
            },
            ["GET", "/B", ..] => {
                    //DO stuff
            }
            - => {
                let response = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
                stream.write_all(response.as_bytes()).unwrap();
            }
    }
}
