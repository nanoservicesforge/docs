# IO Messaging Introduction

The idea around a nanoservice is that multiple servers can be compiled into a single binary.
This then allows those servers be called in memory via function calls rather than over some network protocol.
That said, there are certain advantages to packaging one or more nanoservices as a microservice.

This is where IO messaging comes in.

IO messaging allows you to send a Rust `struct` over a TCP connection to other nanoservices.
The routing and serialization is all handled by the `nanoservices-utils` crate.

This is achieved by having one cargo workspace that is essentially a kernel in which all the contract `struct`s are housed.
These `struct`s are then referenced by both the client and server as shown in the diagram below:

![IO Messaging Diagram](/img/contract_structs_overview.png)

IO messaging eliminates the need for a Web framework to act as the communication layer between nanoservices. Instead, `Tokio` TCP is used for message routing.

The working example of the messaging can be found in the link below:

```
https://github.com/nanoservicesforge/example-tcp-messaging
```