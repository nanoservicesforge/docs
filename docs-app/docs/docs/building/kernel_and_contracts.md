# Kernel and Data Contracts

A data contract is a struct designed to allow communication over some two boundary.
The term "Kernel" is heavily used in domain driven design and refers to any entity that acts as a bridge between two domains.
Because the nanoservice ecosystem is focused on ensuring that multiple Rust servers play with nicely each other, we will build our kernel as a pair of Rust entities that communicate with each other.
If one entity compiles another entity into its binary, then the kernel is merely housing the structs.
However, if the two entities are separate binaries, then the kernel's structs must be serialised and sent over the network.
Because both entities share the same structs, the deserialisation process is seamless, and the rust compiler performs its type checking across a commen set of structs.

Because the same contract is sent back and fourth between the client and server, the contract must act as a carrier for both the incoming and outgoing data.
Since it does not make sense to send both incoming and outgoing data at the same time, the respective fields arte typically of type `Option<T>`.

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

This essentially binds the `TestContractHandler` struct to the contracts; therefore, we can now use the `TestContractHandler` struct both for serialisation and deserialisation of the contracts.
We can also pass the `TestContractHandler` struct into macros that bind functions to the contracts for the purposes of route handling, or sending the contract over the network.

Now that we have our kernel, we can explore the `core`.
