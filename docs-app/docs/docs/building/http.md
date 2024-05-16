# Servers

In this section, we will cover what is probably the most common way to run a nanoservice &mdash; from within an HTTP server that listens on a specific port for incoming requests.
In the first example, we will be using the `actix-web` framework to create an HTTP server, and in the second example, we will be using the `axum` framework.
Both examples are included here to show you that nanoservice are both framework and protocol agnostic.

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
env_logger = "0.11.3"
serde = { version = "1.0.200", features = ["derive"] }
serde_json = "1.0.108"
tokio = { version = "1.37.0", features = ["macros", "rt-multi-thread"] }
nanoservices-utils = { version = "0.1.2", features = ["actix"] }
kernel = { path = "../../kernel" }
core = { path = "../../core" }
```

The `src/routing.rs` file contains the routing logic for the server.
It imports the `actix-web` crate and the `nanoservices_utils` crate, and then the kernel and core crates.

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

We then write two simple wrapper functions that handle the contract work and the contract echo.
These functions are called by the Actix server when a request is received.
Note that they return a `Result` type, with the `Ok` variant returning an `HttpResponse` and the `Err` variant returning a `NanoServiceError`.

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

Finally, we create a function that configures the Actix server to respond to requests arriving on these particular endpoints:

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

The `main.rs` file imports the `routing` module and the `actix-web` crate, then creates the Actix server.


## Axum

For the `axum` example, we need to add the following dependencies to the `Cargo.toml` file:

```toml
[dependencies]
axum = { version = "0.7.5", features = [] }
tracing-subscriber = "0.3.18"
env_logger = "0.11.3"
serde = { version = "1.0.200", features = ["derive"] }
serde_json = "1.0.108"
tokio = { version = "1.37.0", features = ["macros", "rt-multi-thread"] }
nanoservices-utils = { version = "0.1.2", features = ["actix"] }
kernel = { path = "../../kernel" }
core = { path = "../../core" }
```

The structure of the `axum` server is very similar to the `actix-web` example, with the same logic in the `routing.rs` file.
We create our two wrapper functions that handle the contract work and the contract echo.
Notice that this time, we are first using the `Json` macro to extract the contract from the request, then we return a tuple containing the `StatusCode` and the `Json` contract.

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

Similarly, we create a function that configures the Axum server to respond to requests arriving on these particular endpoints:

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

To run a TCP server using tokio, you can visit the [TCP Messaging](/docs/docs/iomessaging/receiving-messages) documentation.
