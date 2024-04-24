# NanoForge

This Nanoservices package manager is built on top of Docker which means it is supported by all major CI pipelines.
Authentication, caching and version control is handled by Docker, and all major cloud providers support private registries.

## Prerequisites

1. Docker must be installed and running
1. Rust must be installed because the Rust tool `cargo` is needed for compilation
1. `python3` must be installed

## Installation

To install the `NanoForge`, run the following command:

> ### Windows Users
>
> There is no windows install script yet, but windows developers can clone the [GitHub repository](https://github.com/nanoservicesforge/NanoForge) and build from source.  Add the binary into an appropriate directory in your `$PATH`.

On *NIX machines, you can run the installer from `wget`:

```bash
wget -qO- https://raw.githubusercontent.com/nanoservicesforge/NanoForge/main/scripts/install.py | python3
```

Or instead, if you have `curl` installed, then run:

```bash
curl -s https://raw.githubusercontent.com/nanoservicesforge/NanoForge/main/scripts/install.py | python3
```

On *NIX machines, the installation process uses the `sudo` command to insert the compiled tool into your `bin` path, so
you might have to input your password to complete the installation process.

Once the tool is installed, you will need to create a Rust project upon which this tool can act.

## Quick Start

To quick start a project:

```bash
cargo new nanoforge-test
```

Inside the `Cargo.toml` file, we declare the following nanoservice:

```toml
[nanoservices.nan-one]
dev_image = "maxwellflitton/nan-one"
prod_image = "maxwellflitton/nan-one"
entrypoint = "."
```

We can then download the docker package and configure the `Cargo.toml` file by running the following command:

```bash
nanoforge prep
```

The `nanoforge` tool now performs the following steps:

1. It pulls the Docker images (just `maxwellflitton/nan-one` in this case)
1. Unpacks and decompresses the image files, then stores them in the `.nanoservices_cache` directory
1. Calculates the relative path of both the `Cargo.toml` file declaring the nanoservice and the downloaded code, then adds this to the `dependencies` section of the `Cargo.toml`

This results in the following update to the `[dependencies.nan-one]` section of `Cargo.toml`:

```toml
[dependencies.nan-one]
path = "../.nanoservices_cache/domain_services/nanoservices/maxwellflitton_nan-one/."
```

The `entrypoint` is added to the end of the relative path so you can have multiple workspaces inside your package
and you can just point to the right one you want in the build with the `entrypoint`.

To test to see if our build works, we can add the following code to the `src/main.rs` file:

```rust
use nan_one::hello;

fn main() {
    println!("Hello, world!");
    hello();
}
```

We can then perform a `cargo run` command to see if the code runs correctly.
