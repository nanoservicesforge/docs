# Defining the Core

The `core` is the heart of the nanoservice. This contains the business logic and the main functionality of the nanoservice. In our example, we will be creating a simple calculator that can do basic arithmetic operations. If we examine the `core` folder, we will see the following structure:

```plaintext
core
├── Cargo.toml
└── src
    └── lib.rs
```

The `Cargo.toml` file contains the dependencies for the `core` module. The `lib.rs` file contains the main logic for the nanoservice. Notice that we are using `lib.rs` as the main file for the `core` module. This is because the `core` module will be compiled into a library that can be used by the clients and servers. 

The `lib.rs` file imports the `nanoservices_utils` crate, which contains the error handling, and the `kernel` crate, which contains the contracts that are used to communicate between the clients and servers. We then define the core functionality in the `handle_contract_work` function. This function takes a `CalcWork` contract as input, performs the calculation based on the work type, and returns the result.

```rust
/// Performs a calculation based on the work type and returns the result.
/// 
/// # Arguments
/// * `contract` - The contract to perform the calculation on.
/// 
/// # Returns
/// The contract with the result of the calculation.
pub async fn handle_contract_work(mut contract: CalcWork) -> Result<CalcWork, NanoServiceError> {
    let data1 = contract.input_data1;
    let data2 = contract.input_data2;
    if data1 < 0 || data2 < 0 {
        contract.error = Some(NanoServiceError::new(
            "Input data must be a positive integer".to_string(),
            NanoServiceErrorStatus::BadRequest)
        );
    } else {
        contract.result = match &contract.work_type.clone() {
            WorkType::Sum => Some(data1 + data2),
            WorkType::Diff   =>  Some(data1 - data2),
            WorkType::Mult  => Some(data1 * data2),
            WorkType::Div   => Some(data1 / data2)
        };
    }
    Ok(contract)
}
```
