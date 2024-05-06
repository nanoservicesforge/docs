# Mapping Packages

If you carried out the steps in the [Quick Start](../quickstart.md) section, we can now map our packages by running the following command:

```bash
nanoforge graph
```

This will create a `nanoserve_dep_graph.png` file in the root of the project which will show the dependencies of
all the nanoservices in the project like the example below:

![Basic nanoservice dependency graph](/img/nanoserve_dep_graph.png)

Having multiple workspaces referencing nanoservices will result in a more complex dependency graph, such as the example below:

![Complex nanoservice dependency graph](/img/complex_graph.png)

Here we can see that the two workspaces `testing_nano` and `testing_two` rely on some nanoservices.
However, we can also see that the `nan-five` nanoservice also relies on the `nan-one` nanoservice.
On the basis of this observation, we can see that nanoservices can also reference and build off each other.  That said, it is advisable to keep this to a minimum as it can lead to circular dependencies.

Rely on the `nanoforge graph` command to see the dependencies of the nanoservices in your project.
