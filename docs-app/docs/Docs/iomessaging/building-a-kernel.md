# Building a Kernel

In order to build an IO Messaging kernel, we start with at least the following entries in the `Cargo.toml` file:

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

Then, in `src/lib.rs`, bring the following crates into scope:

```rust
use futures::{sink::SinkExt, StreamExt};
use nanoservices_utils::{
    create_contract_handler,
    errors::{NanoServiceError, NanoServiceErrorStatus},
    networking::codec::BincodeCodec
};
use serde::{Deserialize, Serialize};
use tokio::net::TcpStream;
use tokio_util::codec::Framed;
```

A set of macros in `nanoservices-utils` will generate all the code we need to handle the serialization and sending of contracts.
This saves us the trouble of having to write the serialization or `tokio` framing code ourselves.

The contracts sent between the client and the server are simply `struct`s that can be compared and (de)serialized:

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

These `struct`s can be defined in whatever way we require.
In this particular example, each contract sends input data of some type and expects either a result or an error in response.

We then define a handler for these contracts with the following macro:

```rust
create_contract_handler!(
    TestContractHandler,
    ContractOne,
    ContractTwo
);
```

The first name (`TestContractHandler`) in the list is the handler name.
The subsequent contract `struct`s are then bound to this handler.

We can now reference the handler in both the server and the client.
