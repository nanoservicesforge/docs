# Installing

This Nanoservice can be directly compiled into another server or ran as a standalone server for the following:

- Actix Web (http)
- Axum (http)
- Tokio (tcp)

The core can also be directly compiled into whatever rust project you have. Below are the installation configs
for different frameworks and the core. The calc example code was coded by [Jimmy Calahorrano](https://www.linkedin.com/in/jcalahor/) 
and we decided to lift the example into the standard example for a nanoservice. 

## Core

If you don't want to expose the server to external traffic but want another server to compile this server into the binary and
call it directly then just compiling the core is enough. Below is the config for compiling the core into your project:

```toml
[nanoservices.calc_server]
dev_image = "maxwellflitton/nan-calc"
prod_image = "maxwellflitton/nan-calc"
entrypoint = "core"
package = "core"
kernel = { entrypoint = "kernel", package = "kernel", name = "calc-server-kernel" }
```

After running the `nanoforge prep` command in the root of your project where the `Cargo.toml` is located, you will be able
to access the core functions in your project with `use::calc_server` and the kernel which is the structs for your functions
with `use::calc_server_kernel`. If you change the declaration to `[nanoservices.some_other_server]` then you can access the
core functions for that server with `use::some_other_server`. You can also change the `kernel` name to change the name needed
to import the `kernel` structs.

### Compiling Actix using NanoForge
You can compile the Actix endpoints into your actix server project with the following config in your `Cargo.toml`:

```toml
[nanoservices.calc_server]
dev_image = "maxwellflitton/nan-calc"
prod_image = "maxwellflitton/nan-calc"
entrypoint = "servers/actix"
package = "actix-server"
kernel = { entrypoint = "kernel", package = "kernel", name = "calc-server-kernel" }
```

After running the `nanoforge prep` command in the root of your project where the `Cargo.toml` is located, you will be able
to access the Actix functions in your project with `use::calc_server` and the kernel which is the structs for your functions
with `use::calc_server_kernel`.

### Compiling Axum using NanoForge
You can compile the Axum endpoints into your axum server project with the following config in your `Cargo.toml`:

```toml
[nanoservices.calc_server]
dev_image = "maxwellflitton/nan-calc"
prod_image = "maxwellflitton/nan-calc"
entrypoint = "servers/axum"
package = "axum-server"
kernel = { entrypoint = "kernel", package = "kernel", name = "calc-server-kernel" }
```

After running the `nanoforge prep` command in the root of your project where the `Cargo.toml` is located, you will be able
to access the Axum functions in your project with `use::calc_server` and the kernel which is the structs for your functions
with `use::calc_server_kernel`.

### Compiling Tokio using NanoForge
You can compile the Tokio endpoints into your tokio server project with the following config in your `Cargo.toml`:

```toml
[nanoservices.calc_server]
dev_image = "maxwellflitton/nan-calc"
prod_image = "maxwellflitton/nan-calc"
entrypoint = "servers/tcp"
package = "tcp-server"
kernel = { entrypoint = "kernel", package = "kernel", name = "calc-server-kernel" }
```

After running the `nanoforge prep` command in the root of your project where the `Cargo.toml` is located, you will be able
to access the TCP routing functions in your project with `use::calc_server` and the kernel which is the structs for your functions
with `use::calc_server_kernel`.
