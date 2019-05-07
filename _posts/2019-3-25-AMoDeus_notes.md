---
layout: post
title: "[AMoD] AMoDeus Setup and Example"
modified: 3/25/2019, 20:40:00 
tags: [notes]
category: blog
excerpt: Setting up AMoDeus and running a basic rebalancing algorithm
---

AMoDeus is an open-source high-fidelity traffic simulator for autonomous
mobility on demand, developed by researchers at ETH Zurich. AMoDeus provides a
consistent interface between operation policies of fleets and the MATSim
traffic simulator. Since AMoDeus uses MATSim, it is written in Java, but it
also provides an interface defined over a protocol using TCP/IP, so that the
operational policies need not be implemented by Java.

# Setting up AMoDeus
The AMoDeus team has two repositories on Github.
The [AMoDeus](https://github.com/idsc-frazzoli/amodeus) repository contains the
implementation of the package, while the
[AMoD](https://github.com/idsc-frazzoli/amod) repository contains an example
project for people to build upon. Note that AMoD is an Apache Maven project
that has AMoDeus as one of its dependencies. My understanding is that unless
you have a specific need in modifying the code in AMoDeus, it is sufficient to
only clone the AMoD repository, as Maven will automatically pull down the
simulator for you. In IDE's like Eclipse, you will still be able to view the
code for AMoDeus.

It is fairly easy to download and setup the dependencies by following the
instructions on the AMoD repo README. Getting the requirements (JDK, Maven,
GLPK), cloning the repo, and importing it into the IDE should all be
straightfoward.

However, figuring out how to implement a new operational policy, and more
importantly, how to run a simulation, is, to say the least, not immediately
obvious. I found myself lacking a significant amount of information both about
the core classes in AMoDeus to implement an operational policy, and about the
organization of the AMoD package to be able to run a simulation and visualize
it. After a day of playing around with it, I am starting to understand a little
bit of how everything fits together. And let me walk you through the steps I
took to run my first AMoD experiment.

# Some Important Classes
Before working on the project, it might be helpful to look at some core classes
in AMoDeus. 

# The AIDO Architecture (Yes, Yes, Yes, Python!)
The authors of AMoDeus are also co-organizing the AI Driving Olympics (Aido).
Of course, one of the competitions in Aido is on AMoD operational policies. To
make experimentation easier for people who are not familiar with the AMoDeus
package, they implemented an interface which hides most of the details of AMoDeus
from the user. On a high level, the functionalities of AMoDeus is separated
into two parts: the **AidoHost**, which runs the simulation, and the
**AidoGuest**, which computes the operational policy (both dispatching logic
and rebalancing strategy). The two components communicate through TCP/IP at
port `9382` (although I assume there is a way to change the port number). The
protocol is carefully documented on this
[page](https://github.com/idsc-frazzoli/amod/blob/master/doc/aido-client-protocol.md).

Well, what does this mean? As an engineer interested only in testing out new
dispatching strategies, all that I need to change is the AidoGuest component.
It is almost completely OK now to treat the AidoHost as a black box that gives
us all the information we need, and takes in all our instructions for
simulation. And yes, this means that as long as you follow the protocol,
nothing is stopping you from implementing your operational policy in assembly.
However, I do get a bit concerned as the TCP/IP communication seems to create
quite an overhead. Whether this overhead is overall negligible compared to the
high cost of MATSim is something I want to find out some time. So, the
information in the previous section is not totally worthless.

Now, how do you run the AIDO architecture? In the AMoD repository, you can see
that under src/main/java, there are many packages under the name of amod.aido.*
or amod.demo.*. These are the packages that implement this interface between
AMoDeus and AIDO-guests. Specifically, demo.stanford.StarterHelper is something
you can run to launch both the AidoHost and the AidoGuest.
You can run it from the commandline with
```bash
mvn exec:java -Dexec.mainClass=demo.stanford.StarterHelper \
    -Dexec.cleanupDaemonThreads=false -Dexec.workingdir=../tmp/{}
```

What if you want to set up your own scenario? You can modify the av.xml and
config.xml to specify how you want your scenario to be.

# How to Implement a Simple Dispatcher
If we were to use the Aido architecture, the dispatcher is part of the
AidoGuest. The dispatcher gets the AVRequests, state of the RoboTaxis, and
other statistics from the AidoHost, which runs the simulation. It then will
send back the dispatching signals. This communication is specified by a
specific protocol, and is carefully documented on this
[page](https://github.com/idsc-frazzoli/amod/blob/master/doc/aido-client-protocol.md).

As specified in the page, 
