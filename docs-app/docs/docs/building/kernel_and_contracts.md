# Kernel and Data Contracts

A data contract is a struct that is used to communicate through two boundaries. The term Kernel is heavily used in domain driven design where a kernel is
any entity that acts as a bridge between two domains. Because the ecosystem of nanoservices is focused on smoothing out how multiple Rust servers play with
each other, our kernel is compiled into two Rust entities that want to communicate with each other. If one entity compiles another entity into its binary,
then the kernel is merely housing the structs. However, if the two entities are separate binaries, then the kernel's structs are then serialised and sent over
the network. Because both entitlies have the same structs from the same kernel, then the deserialisation process is seamless, and the kernel acts as a compilation
bridge between the two entities, allowing the rust compiler to still perform its type checking.

Because the same contract is sent back and fourth between the client and server, the contract must house both the incoming and outgoing data. The incoming
and outgoing data does not have to be housed at the same time, both ingoing and outgoing fields can be `Option<T>`.

In the `kernel` workspace, we have a `lib.rs` file that contains the contracts. 

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

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone, Copy)]
pub enum WorkType {
    Sum,
    Diff,
    Div,
    Mult
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct CalcWork {
    pub input_data1: i32,
    pub input_data2: i32,
    pub work_type: WorkType,
    pub result: Option<i32>,
    pub error: Option<NanoServiceError>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct Echo {
    pub name: String,
    pub error: Option<NanoServiceError>,
}
```

We then use the `create_contract_handler!` macro to create a handler for the contract. This macro will generate the code needed to handle the contract:

```rust
create_contract_handler!(
    TestContractHandler, // this handler struct is created by the macro
    CalcWork,
    Echo
);
```

This essentially binds the `TestContractHandler` struct to the contracts, therefore, we can now use the `TestContractHandler` struct to either serialise or deserialise the contracts. We can also pass the `TestContractHandler` struct into other macros to bind functions to the contracts for route handling or
another macro for sending the contract over the network. Now that we have our kernel, we can explore the `core`.
