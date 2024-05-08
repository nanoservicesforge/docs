# Creating a Package

When it comes to creating a package for nanoservices, we must understand how the package manager uses Docker to distribute
our packages.
When `NanoForge` downloads the docker image, it reads the manifest file in the docker image and loops through the layers in the image, unzipping them and extracting the files into the `.nanoservices_cache` directory.
Essentially, the folder and file structure found within the Docker image is unpacked into the nanoservice cache.
Therefore, we can create a package with a simple Dockerfile like the one below:

```Dockerfile
FROM scratch

COPY ./your_package .
```

Here, we are copying the entire contents of the `your_package` directory into the root of the Docker image.
If the `Cargo.toml` file is in the root of the `your_package` directory, then the entry point for the nanoservice will be `"."`.
With this in mind, we can take advantage of Docker layers when packaging multiple builds within the same Docker image.

Let's say we have the following directory structure:

```
├── nan-five
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── three
    ├── nan-four
    │   ├── Cargo.toml
    │   └── src
    │       └── lib.rs
    └── nan-three
        ├── Cargo.toml
        └── src
            └── lib.rs
```

We can package both of these layers with the following Dockerfile:

```Dockerfile
FROM scratch

COPY ./three .
COPY ./nan-five .
```

When we unpack the Docker image we will have the following directory structure:

```
└───Cargo.toml
    ├── nan-four
    │   ├── Cargo.toml
    │   └── src
    │       └── lib.rs
    ├── nan-three
    │   ├── Cargo.toml
    │   └── src
    │       └── lib.rs
    └── src
        └── lib.rs
```

The root `Cargo.toml` file is found in the `nan-five` directory, and then we have the other two packages in their respective directories.
We can declare multiple nanoservices in the same `Cargo.toml` file pointing to the same Docker image &mdash; as long as the entry point is set correctly!

For example, multiple nanoservices in our `Cargo.toml` file would look like this:

```toml
[nanoservices.nan-four]
dev_image = "maxwellflitton/nan-three"
prod_image = "maxwellflitton/nan-three"
entrypoint = "nan-four"

[nanoservices.nan-five]
dev_image = "maxwellflitton/nan-three"
prod_image = "maxwellflitton/nan-three"
entrypoint = "."
```

If we run a `nanoforge prep` and then a `nanoforge graph` we get the following dependency graph:

![Complex nanoservice dependency graph](/img/packaging_graph.png)

Here we can see that the our build relies on both the `nan-four` and `nan-five` nanoservices; which matches the dependencies in our
main `Cargo.toml` file as seen below:

```toml
[dependencies.nan-four]
path = ".nanoservices_cache/domain_services/nanoservices/maxwellflitton_nan-three/nan-four"

[dependencies.nan-five]
path = ".nanoservices_cache/domain_services/nanoservices/maxwellflitton_nan-three/."
```

The dependency graph also shows us that, if we were to use it, the `nan-three` nanoservice relies on the `nan-one` nanoservice.
We could add further isolation to the packages by putting each in their own directory in the Docker image, like so:

```Dockerfile
FROM scratch

COPY ./package_one ./package_one
COPY ./package_two ./package_two
```

Here we are copying two cargo projects into the Docker image.
If we want to build the `package_one` project we can set the entry point to `"./package_one"`, and if we want to build the `package_two` project we can set the entry point to `"./package_two"`.
