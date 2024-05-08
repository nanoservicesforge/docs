# Creating a Nanoservice

For our example project, we are going to build a basic calculator nanoservice. We can do this by running the following command:

```bash
nanoforge new calc-server
```

Once the nanoservice is created, we get the following layout:

```plaintext
├── Dockerfile
├── README.md
├── clients
│   ├── http
│   └── tcp
├── core
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── kernel
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
└── servers
    ├── actix
    ├── axum
    └── tcp
```

We do not just have the directories, the template of the nanoservice has also generated some boilerplate code for us to get started with which just so
happens to be a basic calculator. We can summarise the high-level structure of the nanoservice as follows:

- **Clients:** The client code is merely a simple `main.rs` file making a couple of networking calls to a local server if you run a local server. It is
not essential for the packing of the nanoservice so it's not included in the dockerfile. We will just run the clients to see if our nanoservice runs.

- **Core:** The core code consists of some basic calculator functions which makes sense as the core part of a calculator is to calculate.

- **Kernel:** The kernel code consists of some basic structs that are needed to call the `core` functions. The `core`, `servers`, and `clients` reference
the `kernel` structs.

- **Servers:** The server code consists of a basic server that wraps the `core` functions and makes them accessible over the network. Each directory
has enough boilerplate code to run and serve the `core` functions for their respective framework.

To test that our server is running, we can run the `actix` server in one terminal with the following command:

```bash
cd servers/actix && cargo run
```

And then we can run the client in another terminal with the following command:

```bash
cd clients/http && cargo run
```
And you should get the following output:

```plaintext
CalcWork Response: CalcWork { input_data1: 10, input_data2: 20, work_type: Sum, result: Some(30), error: None }
Echo Response: Echo { name: "Hello: World!", error: None }
```

Both our data contracts were sent over the network and the server responded the way we expected. You can explore the other servers and the TCP client
which serializes the kernel structs to binary to send over the network.
