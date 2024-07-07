# Creating a Nanoservice

For our example project, we are going to build a basic calculator nanoservice.
We start the development process by running the following command:

```bash
nanoforge new calc-server
```

Our new nanoservice has the following file and folder structure:

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

We do not just have the directories, the nanoservice template has also generated some boilerplate code to get us started &mdash; this happens to be a basic calculator.
We can summarise the high-level structure of the nanoservice as follows:

- **Clients:** The client code is a simple `main.rs` file in which a couple of network calls are made to a local server (if you choose to run a local server).
   This file is not included in the dockerfile as it is only used for local testing and is therefore not essential.

- **Core:** This core consists of some basic calculation functions which make up the core of a calculator.

- **Kernel:** The kernel consists of the basic `structs` needed to call functions in the `core`.
   The `core`, `servers`, and `clients` reference the `kernel` structs.

- **Servers:** The server is a wrapper around the `core` functions and makes them accessible over the network.
   Each directory has enough boilerplate code to run and serve the `core` functions for their respective framework.

To test that our server is running, we will start an `actix` server in one terminal:

```bash
cd servers/actix && cargo run
```

We can then run the client in another terminal with the following command:

```bash
cd clients/http && cargo run
```

And you should get the following output:

```plaintext
CalcWork Response: CalcWork { input_data1: 10, input_data2: 20, work_type: Sum, result: Some(30), error: None }
Echo Response: Echo { name: "Hello: World!", error: None }
```

Both our data contracts were sent over the network and the server responded in the way we expect.
You can explore the other servers and the TCP client which serializes kernel structs in order to send them over the network.
