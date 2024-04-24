
# Nanoservice

A nanoservice is a design pattern used by us when building medical simulation software for the German government. We found it
useful to have multiple Rust servers with layers that all got compiled into one binary a seen in the diagram below:

![Nanoservice Diagram](/img/nanoservices_diagram.png)

Here, our nanoservice had a data access layer. This data access layer was then compiled into a core layer, and that core layer
was then compiled into the networking layer. This means that other servers can compile the core layer of one server into their
own core layer and call the functions in memory. It is more performant as we bypass the networking latency, we get compiler 
checking, and it was easier to deploy. We even managed to embed the JavaScript React frontend into the binary, getting the Rust 
server to serve the frontend. However, if we needed to spin out a server into a microservice, it was ready.

We really want to see where nanoservices can go. We found the design pattern useful so we decided to build a package manager
tool to see if other people would find it useful.
