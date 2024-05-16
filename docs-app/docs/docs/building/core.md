# Defining the Core

The `core` is the heart of a nanoservice and contains the main functionality (business logic) of the nanoservice.
In our example, we will are creating a calculator that can perform basic arithmetic operations.
If we examine the `core` folder, we will see the following structure:

```plaintext
core
├── Cargo.toml
└── src
    └── lib.rs
```

As the program grows you will tend to structure your program over multiple files; however, for the purposes of demonstration, we will keep everything in `lib.rs` which contains the following code:

```rust
use nanoservices_utils::errors::{NanoServiceError, NanoServiceErrorStatus};
use kernel::{
    CalcWork,
    WorkType,
    Echo
};

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

pub async fn handle_contract_echo(mut contract: Echo) -> Result<Echo, NanoServiceError> {
    contract.name = format!("Hello: {}", contract.name);
    Ok(contract)
}
```

Seeing as the functions are public, another program can reference the `core` as a dependency and then directly call these functions.
To see this in action, we can move onto the servers.
