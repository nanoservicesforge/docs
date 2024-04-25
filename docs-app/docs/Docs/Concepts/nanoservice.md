# The Nanoservice Concept

A nanoservice is a design pattern used by the authors when building medical simulation software for the German government.
It was found very useful to have multiple Rust servers with layers that all got compiled into one binary, as seen in the diagram below:

![Nanoservice Diagram](/img/nanoservices_diagram.png)

Here, our nanoservice had a data access layer.
This data access layer was then compiled into a core layer, and that core layer was then compiled into the networking layer.
This means that other servers can build the core layer of one server into their own core layer and call the functions in memory.
This makes the architecture more performant for several reasons:

* We bypass any latency associated with networking
* We get compile-time checking, and
* It is easier to deploy
* If a server needed to be spun out as microservice, it was ready to go

We even managed to embed a JavaScript React frontend into the binary, which allowed the Rust server to serve the frontend!

We have found this design pattern to be very useful, so we decided to build a package manager tool around it to see if others also find it useful.

We really want to see where nanoservices can go!
