# Why Nanoservices

We came up with the idea of nanoservices when managing an entire cluster of Rust microservices. We knew that we wanted to keep the code isolated in their
own services but the build process and juggling of multiple services was becoming a headache. This is where we came up with the idea of nanoservices.
A nanoservice has the ability to run as a microservice if needed. However, a nanoservice also has the ability to be compiled into another server that is
calling it. We ended up with a main Rust server that acted as an ingress, that compiled all of the the other servers into the same binary and directly called
them in memory. We even ended up emebedding our JavaScript frontend into the binary to be served by the Rust server. This greatly sped up the following:

- **Development Speed:** The compiler did the checks as opposed to finding out an error in a network communication at runtime. The build process was also
much faster as we only had to compile one binary as opposed to running multiple services and managing them.

- **Deployment Speed:** We only had to deploy one binary as opposed to multiple services greatly reducing the complications, bugs, and processes.

- **cluster performance:** This isn't always going to be the case, there are benefits to microservices in some cases, however, calling another service
in memory is much faster than over the network.

Our system ended up like the following diagram:

![Nanoservice Diagram](/img/nanoservices_diagram.png)

The dotted line is the binary boundary. Here, we can see that there are multiple layers to a nanoservice. It has changed a bit since this diagram was made
to describe our system we had in production. 

You may see some macros when looking at the TCP server code. Please visit the messaging part of the docs for more information on binary communication
and routing of data contracts.

Now we have covered these concepts, let's explore our nanoservice. A good starting point is the workspace that all over workspaces reference, which is
the kernel and it's data contracts.
