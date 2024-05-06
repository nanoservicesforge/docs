# Defining a Contract

A contract is a Struct that is used to communicate between the client and server. The contract is serialized and deserialized, and sent between the client and server. The contract is defined in the `kernel` module and is used by both the client and server. For more information on building a kernel, see the [Building a Kernel](/docs/docs/iomessaging/building-a-kernel) documentation.

In the `kernel` workspace, we have a `lib.rs` file that contains the contracts. 

```rust
/// Type of operation that the math server will perform.
/// 
/// # Fields
/// * `Sum` - Adds two numbers together.
/// * `Diff` - Subtracts two numbers.
/// * `Div` - Divides two numbers.
/// * `Mult` - Multiplies two numbers.
#[derive(Serialize, Deserialize, Debug, PartialEq, Clone, Copy)]
pub enum WorkType {
    Sum,
    Diff,
    Div,
    Mult
}


/// A contract that houses the sending and response data.
/// 
/// # Fields
/// * `input_data1` - The first number to perform the operation on.
/// * `input_data2` - The second number to perform the operation on.
/// * `work_type` - The type of operation to perform.
/// * `result` - The result of the operation.
/// * `error` - The error if the operation failed.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct CalcWork {
    pub input_data1: i32,
    pub input_data2: i32,
    pub work_type: WorkType,
    pub result: Option<i32>,
    pub error: Option<NanoServiceError>,
}
```

You can see that the contract is a simple Struct that contains the input data, the type of operation to perform, the result, and an error if the operation fails. 

We then use the `create_contract_handler!` macro to create a handler for the contract. This macro will generate the code needed to handle the contract. In the boiler plate code, we are also creating a second contract called `Echo` that simply echoes back the input data.

```rust
create_contract_handler!(
    TestContractHandler, // this handler struct is created by the macro
    CalcWork,
    Echo
);
```
