# Building a Server

When it comes to building the server, our `Cargo.toml` file will have the same dependencies as the kernel as seen below:

```toml
[package]
name = "server"
version = "0.1.0"
edition = "2021"

[dependencies]
nanoservices-utils = "0.1.1"
serde = { version = "1.0.197", features = ["derive"] }
tokio = { version = "1.37.0", features = ["full"] }
bincode = "1.3.3"
kernel = { path = "../kernel" }
tokio-util = { version = "0.7", features = ["codec"] }
bytes = "1.6.0"
futures = "0.3.30"
```

And in our `src/main.rs` file we will import the following:

```rust
use nanoservices_utils::errors::{NanoServiceError, NanoServiceErrorStatus};
use nanoservices_utils::register_contract_routes;
use nanoservices_utils::networking::codec::BincodeCodec;
use tokio::net::TcpListener;
use tokio_util::codec::Framed;
use futures::sink::SinkExt;
use futures::StreamExt;

use kernel::{
    TestContractHandler,
    ContractOne,
    ContractTwo,
};
```

We are now ready to build some functions that handle particular contracts that we want to accept from the client. For our example,
the functions take the form below:

```rust
async fn handle_contract_one(mut contract: ContractOne) -> Result<ContractOne, NanoServiceError> {
    let data = contract.input_data;
    if data < 0 {
        contract.error = Some(NanoServiceError::new(
            "Input data must be a positive integer".to_string(),
            NanoServiceErrorStatus::BadRequest)
        );
    } else {
        contract.result = Some(data * 2);
    }
    Ok(contract)
}

async fn handle_contract_two(mut contract: ContractTwo) -> Result<ContractTwo, NanoServiceError> {
    let data = contract.input_data.clone();
    if data.is_empty() {
        contract.error = Some(NanoServiceError::new(
            "Input data must not be empty".to_string(),
            NanoServiceErrorStatus::BadRequest)
        );
    } else {
        contract.result = Some(data.to_uppercase());
    }
    Ok(contract)
}
```

Now we can map our contracts to the functions we have created with the following code:

```rust
register_contract_routes!(
    TestContractHandler,
    handle_contract_routes,
    ContractOne => handle_contract_one,
    ContractTwo => handle_contract_two
);
```
Here, we are using the `TestContractHandler` struct we created in the kernel to handle the serialixation of the contract
being sent to the server. We then express that we want the handle function to be called `handle_contract_routes`, and
this `handle_contract_routes` maps the contracts to the functions we have created.

Finally, we can start the server with the following code:

```rust
#[tokio::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    println!("Server listening on port 8080");

    while let Ok((socket, _)) = listener.accept().await {
        let mut framed = Framed::new(socket, BincodeCodec::<TestContractHandler>::new());

        while let Some(result) = framed.next().await {
            match result {
                Ok(data) => {
                    println!("Received: {:?}", data);
                    let response = handle_contract_routes(data).await.unwrap();
                    framed.send(response).await.unwrap();
                    break;
                },
                Err(e) => {
                    eprintln!("Error processing data: {}", e);
                    break;
                }
            }
        }
    }
}
```

And now our Tokio TCP server is ready to handle incoming contracts from the client.
