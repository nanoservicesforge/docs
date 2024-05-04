# Building a Server

In order to build a server, our `Cargo.toml` file must have the same shared dependencies as the `Cargo.toml` used by the kernel:

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

In `src/main.rs`, bring the following crates into scope:

```rust
use futures::{sink::SinkExt, StreamExt};
use nanoservices_utils::{
    register_contract_routes,
    errors::{NanoServiceError, NanoServiceErrorStatus},
    networking::codec::BincodeCodec
};
use tokio::net::TcpListener;
use tokio_util::codec::Framed;

use kernel::{
    TestContractHandler,
    ContractOne,
    ContractTwo,
};
```

We are now ready to build some functions that handle the various contracts arriving from the client.
For our example, the functions take the form below:

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
    TestContractHandler,                  // Struct handling contract serialization
    handle_contract_routes,               // Generate an overall contract handler function of this name
    ContractOne => handle_contract_one,   // Map a contract struct to existing handler function
    ContractTwo => handle_contract_two    // Map a contract struct to existing handler function
);
```

Here, the serialized contracts are handled buy the `TestContractHandler` `struct` created in the kernel.

We then declare that we want to generate a function called `handle_contract_routes` that maps the individual contract `struct`s to the handler functions we've just defined.

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
