# Package Commands

Once you have defined your nanoservices, installed them, and configured your `Cargo.toml` files you will need to update and reconfigure your packages when your project changes.
Below are the package commands that will help you manage your nanoservices as your project grows.

## Prep

The `prep` command is useful for when you are starting out.
If you do not have a `.nanoservices_cache` directory in your project and you have only declared your nanoservices but have not configured your `Cargo.toml` files, you can run:

```bash
nanoforge prep
```

This wipes the cache (if one exists) and then pulls the Docker images, unpack and decompress the image files, then stores them in the `.nanoservices_cache` directory.
It will then calculate the relative paths of both the `Cargo.toml` file declaring the nanoservice and the downloaded code, then
add this to the `dependencies` section of the `Cargo.toml`.

## Config

The `config` command is useful when you have already downloaded all the packages and you do not want to update them.
Instead, you add, change, or delete a nanoservice in one or more of your `Cargo.toml` files and the change does not require another package to be downloaded.
You can run:

```bash
nanoforge config
```

This command will skip downloading and unpacking the Docker images, and will just update the `Cargo.toml` files with the new nanoservice configuration.

## Install

The `install` command is useful when you have a new nanoservice version of the package that you want to install.
You can run:

```bash
nanoforge install
```

This command will pull the Docker images, unpack and decompress the image files, then store them in the `.nanoservices_cache` directory.
However, it will not update the `Cargo.toml` files.
