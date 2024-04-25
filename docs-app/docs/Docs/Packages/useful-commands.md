# Package Commands

Once you have defined your nanoservices, installed them, and configured your `Cargo.toml` files you
will need to update and reconfigure your packages when you project changes. Below are package
commands that will help you manage your nanoservices as your project grows.

## Prep

The `prep` command is useful for when you are starting out. If you do not have a `.nanoservices_cache`
directory in your project and you have only declared your nanoservices but have not configured your
`Cargo.toml` files, you can run the `prep` command with the following command:

```bash
nanoforge prep
```

This command will wipe the cache if one exists and then pull the Docker images, unpack and decompress
the image files, and store them in the `.nanoservices_cache` directory. It will then calculate the
relative path of both the `Cargo.toml` file declaring the nanoservice and the downloaded code, then
add this to the `dependencies` section of the `Cargo.toml`.

## Config

The `config` command is useful when you already downloaded all the packages and you do not want to update
those packages. Instead, you add, change, or delete a nanoservice in one or more of your `Cargo.toml`
files and the change does not require another package to be downloaded. You can run the `config`
command with the following command:

```bash
nanoforge config
```

This command will just skip the download and unpacking of the Docker images and will just update the
`Cargo.toml` files with the new nanoservice configuration.

## Install

The `install` command is useful when you have a new nanoservice version of the package that you want to
install. You can run the `install` command with the following command:

```bash
nanoforge install
```

This command will pull the Docker images, unpack and decompress the image files, and store them in the
`.nanoservices_cache` directory. However, it will not update the `Cargo.toml` files.