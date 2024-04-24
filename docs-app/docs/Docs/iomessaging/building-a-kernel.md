
# Building a Kernel

When it comes to building our kernel cargo workspace, we have the following `Cargo.toml` file:

```toml
[package]
name = "kernel"
version = "0.1.0"
edition = "2021"

[dependencies]
nanoservices-utils = "0.1.1"
serde = { version = "1.0.197", features = ["derive"] }
tokio = { version = "1.37.0", features = ["full"] }
bincode = "1.3.3"
tokio-util = { version = "0.7", features = ["codec"] }
bytes = "1.6.0"
futures = "0.3.30"
```

We then in our `src/lib.rs` file import the following:

```rust
use nanoservices_utils::create_contract_handler;
use nanoservices_utils::errors::{NanoServiceError, NanoServiceErrorStatus};
use serde::{Deserialize, Serialize};
use tokio::net::TcpStream;
use tokio_util::codec::Framed;
use nanoservices_utils::networking::codec::BincodeCodec;
use futures::sink::SinkExt;
use futures::StreamExt;
```

We will be relying on some serialization and `tokio` framing but do not worry, we will not be writing any of the code
ourselves. The `nanoservices-utils` macros will generate all the code we need to handle the serialization and sending
of contracts.

We can then define the contracts that we want to send between client and server with the code below:

```rust
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ContractOne {
    pub input_data: i32,
    pub result: Option<i32>,
    pub error: Option<NanoServiceError>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct ContractTwo {
    pub input_data: String,
    pub result: Option<String>,
    pub error: Option<NanoServiceError>,
}
```

We can do whatever we want with our structs, but here we can see that we want to send some input data, and then either have
a result or an error. We can then create a handler for these contracts with the following macro:

```rust
create_contract_handler!(
    TestContractHandler,
    ContractOne, 
    ContractTwo
);
```

Here, we are essentially creating the `TestContractHandler` but you can define whatever you want for the handler name. The
following contracts are then bound to the handler. We can now reference the handler in the server or client.