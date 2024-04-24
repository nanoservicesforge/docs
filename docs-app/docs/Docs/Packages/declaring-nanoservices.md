
# Declaring Nanoservices

You can declare one or more nanoservices in the `Cargo.toml` file with the following outline:

```toml
[nanoservices.nan-four]
dev_image = "maxwellflitton/nan-three"
prod_image = "maxwellflitton/nan-three"
entrypoint = "nan-four"
features = []
local = false
```

### Docker Images

At this point in time the `dev_image` is used and the `prod_image` is ignored, we are still working out the best way to
handle multiple tags. Both the `dev_image` and `prod_image` need to be declared to work but we might be swapping over
to just `image` and having different commandline inputs for the tags in the future. We will announce if and when this
happens.

### entrypoint

This is needed and entrypoint of the nanoservice (where the terminal has to point inside for the build).

### features

This is optional and if not provided is just assumed that there are no features. These features will correlated to the
features of the build you are pointing to via the `entrypoin`.

### local

This is optional and if not provided is just assumed that the nanoservice is not `local`. If you set `local` to `true`
then the package manager does not try and pull the image from a registry, instead, it tries to use the local built
image.

### Aliases

We will be working on aliases soon for nanoservices so you can handle multiple nanoservices with the same package name
in their `Cargo.toml` files or multiple versions of the same nanoservice. This is not implemented yet but will be soon.
