# Installing

This Nanoservice can be directly compiled into another server or run as a standalone server for the following frameworks:

- Actix Web (http)
- Axum (http)
- Tokio (tcp)

The core can also be directly compiled into whatever Rust project you have.

Below are the installation configurations for different frameworks and the core.

The coding for the `calc` example was written by [Jimmy Calahorrano](https://www.linkedin.com/in/jcalahor/) and we decided to use this as the standard example for a nanoservice.

## `Cargo.toml` Configuration

Independent of your choice of framework, the following `Cargo.toml` entries are required:

```toml
[nanoservices.calc_server]
dev_image = "maxwellflitton/nan-calc"
prod_image = "maxwellflitton/nan-calc"
entrypoint = # Framework dependent
package =  # Framework dependent
kernel = { entrypoint = "kernel", package = "kernel", name = "calc-server-kernel" }
```

If necessary, the name `kernel` can also be changed.

### Core

If you don't want your server directly exposed to any external traffic, it can be wrapped inside another server and called directly.
In this case it is sufficient to compile only the core.

```toml
[nanoservices.calc_server]
# As above plus
entrypoint = "core"
package = "core"
```

### Compiling Actix using NanoForge

```toml
[nanoservices.calc_server]
# As above plus
entrypoint = "servers/actix"
package = "actix-server"
```

### Compiling Axum using NanoForge

```toml
[nanoservices.calc_server]
# As above plus
entrypoint = "servers/axum"
package = "axum-server"
```

### Compiling Tokio using NanoForge

```toml
[nanoservices.calc_server]
# As above plus
entrypoint = "servers/tcp"
package = "tcp-server"
```

## Source Code Usage

After running the `nanoforge prep` command in the root of your project (where the `Cargo.toml` is located), both the framework's functions and the kernel containing your functions' structs can be brought into scope with:

```rust
use::calc_server;
use::calc_server_kernel;
```

If you change the `Cargo.toml` declaration to `[nanoservices.some_other_server]`, then that service's functions are brought into scope with `use::some_other_server`.
