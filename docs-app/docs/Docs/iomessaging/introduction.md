# IO Messaging Introduction

The idea around nanoservice is that we can compile multiple servers into one binary and have those servers be called in memory
via function calls. However, there are advantages to breaking out nanoservices into microservices if needed. This is where IO messaging
comes in. IO messaging enables Rust structs to be sent over TCP to other nanoservices. The routing and serialization is all handled
by the `nanoservices-utils` crate.

This is achieved by having one cargo workspace that is essentially a kernel that houses all the contract structs and these structs
are then both referenced by the client and server as shown in the diagram below:

![IO Messaging Diagram](/img/contract_structs_overview.png)

IO messaging enables us to get our server routing incoming messages and handling them just using `Tokio` TCP and no web frameworks.
