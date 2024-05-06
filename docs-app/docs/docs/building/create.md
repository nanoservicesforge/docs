# Creating the project

To create a new nanoservice project, run the following command:

```bash
nanoforge new
```

This command will generate a new nanoservice project with the following structure:

```plaintext
├── Dockerfile
├── README.md
├── clients
│   ├── http
│   │   ├── Cargo.toml
│   │   └── src
│   │       └── main.rs
│   └── tcp
│       ├── Cargo.toml
│       └── src
│           └── main.rs
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
    │   ├── Cargo.toml
    │   └── src
    │       ├── lib.rs
    │       ├── main.rs
    │       └── routing.rs
    ├── axum
    │   ├── Cargo.toml
    │   └── src
    │       ├── lib.rs
    │       ├── main.rs
    │       └── routing.rs
    └── tcp
        ├── Cargo.toml
        └── src
            ├── lib.rs
            ├── main.rs
            └── routing.rs
```

The README.md contains brief instructions on how to build and run the nanoservice, and we will be referring to this file throughout the guide.