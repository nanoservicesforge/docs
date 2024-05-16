# Packaging

Because the package manager is built on top of Docker, packaging your nanoservice amounts to following these simple steps:

* Build the `Dockerfile` described in the root of the nanoservice
* Tagging that `Docketfile`
* Push the `Dockerfile` to whichever resigtry you prefer

If you want to complete this example without doing all of this, do not worry; This example has already been packaged and
hosted on an open registry readu for you to use.
In the next section, we cover how to install this nanoservice.
