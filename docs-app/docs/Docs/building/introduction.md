# Building a Nanoservice Introduction

In this section, we will cover the basics of building a nanoservice. We will be using the `nanoforge` tool and the `new` command to create a new nanoservice. This command will generate some boilerplate code for you to get started with.

As a reminder, a nanoservice can be directly compiled into a single binary or run as a server. The choice is yours, and 
will depend on your use case. In the following guide, we will be compiling the nanoservice into a single binary, as well as
breaking it out into a server. This latter option has several frameworks and options including:

- Using `actix-web` to create a server using HTTP
- Using `axum` to create a server using HTTP
- Using `tokio` to use TCP for messaging

The key point here is that the nanoservice can be run in a variety of ways, and the choice is yours. It is not tied to a specific framework or protocol, which gives you maximum flexibility and the ability to migrate to different frameworks or protocols as your project grows.

The key components of our example nanoservice are:

- `core` - This is the core of the nanoservice. It contains the business logic and the `struct`s that are used to communicate with the nanoservice. Our example nanoservice will have a calculator that can do basic arithmetic operations.
- `clients` - This folder contains the clients that can be used to communicate with the nanoservice (http or tcp). 
- `server` - This folder contains the servers that can be used to run the nanoservice as a server. As mentioned above, we will be using `actix-web`, `axum`, and `tcp` as examples.
- `kernel` - This folder contains the rust workspace that contains the contracts that are used to communicate between the clients and the servers.  

