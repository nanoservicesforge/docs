
# Declaring Nanoservices

You can declare one or more nanoservices in the `Cargo.toml` file with the parameters:

```toml
[nanoservices.nan-four]
dev_image = "maxwellflitton/nan-three"
prod_image = "maxwellflitton/nan-three"
entrypoint = "nan-four"
features = []
local = false
```

## Configuration Parameters

| Parameter | Value | Default | Required? | Description
|---|---|---|:-:|---|
| `dev_image` | Docker image name | N/A | ✅ | The Docker image to be used for deployment to a development environment
| `prod_image` | Docker image name | N/A | ✅ | The Docker image to be used for deployment to a production environment
| `entrypoint` | Directory name | N/A | ✅ | The nanoservice's root directory within the Docker image
| `features` | List of feature names | `[]` | | The feature list of the build you are pointing to via `entrypoint`
| `local` | Boolean | `false` | | When set to `true`, the package manager does not pull the Docker image from a registry; instead, it uses the locally built image

Although both the `dev_image` and `prod_image` parameters are required, we have not yet worked out the best way to handle their difference.
So for the time being, only the `dev_image` parameter value is acted upon, and the `prod_image` parameter value is ignored.

We are considering replacing these two parameters with a single `image` parameter that is then used in conjunction with command line flags.
Since this will be a breaking change, its implementation will be announced in advance.

## Aliases

We are also planning to implement alias names for nanoservices.

The use of an alias name will allow you to handle both multiple nanoservices with the same package name, and multiple versions of the same package within a single `Cargo.toml` file.
