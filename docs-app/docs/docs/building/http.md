# Servers

In this section, we are going to cover how to run a nanoservice as an HTTP server. This is a common way to run a nanoservice. The nanoservice will be running as a server and will be listening on a specific port for incoming requests. In the first example, we will be using the `actix-web` framework to create an HTTP server, and in the second example, we will be using the `axum` framework. We include both examples to show you how to run a nanoservice using different frameworks, and to emphasize that the nanoservice is not tied to a specific framework or protocol. 

Each framework has an example workspace in the template, with the following files:

- `Cargo.toml` - This file contains the dependencies for the project.
- `src/lib.rs` - This file creates the module so the server routes can be imported into another server.
- `src/routing.rs` - This file contains the routing logic for the server.
- `src/main.rs` - This file contains the main logic for the server.

## Actix-Web
For the `actix-web` example, we need to add the following dependencies to the `Cargo.toml` file:

```toml
[dependencies]
actix-web = "4.4.0"
actix-cors = "0.7.0"
```

The `src/routing.rs` file contains the routing logic for the server. It imports the `actix-web` crate and the `nanoservices_utils` crate, and then the kernel and core crates. 

```rust

use nanoservices_utils::errors::NanoServiceError;
use actix_web::{
    HttpResponse, 
    web::{Json, ServiceConfig, post, scope, get}
};
use kernel::{CalcWork, Echo};
use core::{
    handle_contract_work,
    handle_contract_echo
};
```

We then write two simple wrapper functions that handle the contract work and the contract echo. These functions are called by the Actix server when a request is made to the server. Note that they return a `Result` type, with the `Ok` variant returning an `HttpResponse` and the `Err` variant returning a `NanoServiceError`. 

```rust
/// HTTP wrapper for the Actix web framework to handle the contract work.
pub async fn contract_work(contract: Json<CalcWork>) -> Result<HttpResponse, NanoServiceError> {
    let contract = contract.into_inner();
    let result = handle_contract_work(contract).await?;
    Ok(HttpResponse::Ok().json(result))
}


/// HTTP wrapper for the Actix web framework to handle the contract echo.
pub async fn contract_echo(contract: Json<Echo>) -> Result<HttpResponse, NanoServiceError> {
    let contract = contract.into_inner();
    let result = handle_contract_echo(contract).await?;
    Ok(HttpResponse::Ok().json(result))
}
```

Finally we create a function that binds the endpoints to an Actix Server. This function is called by the Actix server when it starts up. 

```rust

/// binds the endpoints to an Actix Server
pub fn endpoints_factory(app: &mut ServiceConfig) {
    app.service(
        scope("api/v1")
        .route("calc", get().to(contract_work))
        .route("calc", post().to(contract_work))
        .route("echo", get().to(contract_echo))
        .route("echo", post().to(contract_echo))
    );
}
```

The `main.rs` file imports the `routing` module and the `actix-web` crate, and then creates the Actix server. 


## Axum
For the `axum` example, we need to add the following dependencies to the `Cargo.toml` file:

```toml
[dependencies]
axum = { version = "0.7.5", features = [] }
```

This has the same structure as the `actix-web` example, with the following files, and the same logic in the `routing.rs` file. We create our two wrapper functions that handle the contract work and the contract echo. Notice this time we are using the `Json` macro to extract the contract from the request, and returning a tuple with the `StatusCode` and the `Json` contract. 

```rust
async fn contract_work(Json(contract): Json<CalcWork>) -> (StatusCode, Json<CalcWork>) {
    let result = handle_contract_work(contract).await.unwrap();
    (StatusCode::OK, Json(result))
}


/// HTTP wrapper for the Axum web framework to handle the contract echo.
async fn contract_echo(Json(contract): Json<Echo>) -> (StatusCode, Json<Echo>) {
    let result = handle_contract_echo(contract).await.unwrap();
    (StatusCode::OK, Json(result))
}
```

Then we create a function that binds the endpoints to an Axum Server. 

```rust
/// binds the endpoints to an Axum Server
pub fn endpoints_factory() -> Router {
    Router::new()
        .nest("/api/v1", 
            axum::Router::new()
                .route("/calc", get(contract_work))
                .route("/calc", post(contract_work))
                .route("/echo", get(contract_echo))
                .route("/echo", post(contract_echo))
        )
}
```

## TCP

To run a TCP server using tokio you can visit the [TCP Messaging](/docs/docs/iomessaging/receiving-messages) documentation.