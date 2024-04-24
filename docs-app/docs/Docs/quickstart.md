
# Quickstart

Nanoservices package manager is built on top of Docker for distributing code. This means that the package manager is
supported by all major CI pipelines, authentication, caching and version control is handled by Docker, and all major
cloud providers support private registeries.

To install the package manager `NanoForge` you will need `Rust Cargo` for compilation of the tool and `python3` to
run the install scripts. You can install the tool by running the following command:

**Note:** The tool does not have windows install scripts yet but windows developers can visit the 
[GitHub repository](https://github.com/nanoservicesforge/NanoForge) to download and build from source
to put the binary into the directory to be called.

```bash
wget -qO- https://raw.githubusercontent.com/nanoservicesforge/NanoForge/main/scripts/install.py | python3
```

The tool uses `sudo` commands to insert the compiled tool into the `bin` for execution so you might have to
input your password to complete the installation process. Once the tool is installed, you will need a Rust
project to use the tool. To get a quickstart create the following project:

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

This defintion means that `NanoForge` will pull the `maxwellflitton/nan-one` Docker image, unpack and decompress 
the files in that image, and store them in the `.nanoservices_cache` directory. `NanoForge` will then calculate
the relative path of the `Cargo.toml` file declaring the nanoservice, and the downloaded code, and add this to
the `dependencies` section of the `Cargo.toml` resulting in the `dependencies` section below:

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
