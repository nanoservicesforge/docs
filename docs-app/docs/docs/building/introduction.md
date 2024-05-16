# Why Nanoservices

We came up with the idea of nanoservices when managing an entire cluster of Rust microservices.
We knew that we wanted to keep the code isolated in the customer's own services, but the complexity of a build process that required frequent juggling of multiple services become a real headache.

This is where we came up with the idea of nanoservices.

A nanoservice has the ability to run as a microservice if needed.
However, a nanoservice also has the ability to be compiled for use within another server.
We ended up with a main Rust server (acting as an ingress) that compiled all of the the other servers into a single binary.
Thus, each server was accessiblke using an in-memory call.
We even ended up embedding our JavaScript frontend as a binary server into the larger Rust server.

Consequently, we saw significant performance improvements the following:

- **Development Speed:** Network communication errors are eliminated as the compiler was able check whethere the required server was availabel at build time.
   The build process was also much faster as we only needed to compile a single binary, as opposed to running and managing multiple indivuidual services.

- **Deployment Speed:** Life is much simpler when you only need to deploy a single binary!

- **Cluster Performance:** Whilst this isn't always the case, microservices can, in some cases prove beneficial; however, calling another service in memory is much faster than over the network.

Our system ended up with an architecture similar to this:

![Nanoservice Diagram](/img/nanoservices_diagram.png)

The dotted line is the binary boundary.
Here, we can see that there are multiple layers to a nanoservice.

When looking at the TCP server code, you will see some macros.
Please visit the messaging part of the docs for more information on binary communication and routing of data contracts.

Now that we have covered these concepts, let's explore our nanoservice.
A good starting point is the kernel and it's data contracts as all other workspaces reference this workspace.
