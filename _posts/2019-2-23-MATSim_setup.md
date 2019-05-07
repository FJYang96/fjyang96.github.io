---
layout: post
title: "[AMoD] Setting up MATSim"
modified: 2/23/2019, 11:23:24
tags: [workflow]
category: blog
excerpt: Notes on how to setup MATSim
---

This is my notes on setting up the MATSim Environment, its visualization tool,
and accessories for AMoD simulation. I think these are great software packages
that the authors are kind enough to make public online, and they deserve a lot
of kudos. However, my experience in downloading and setting up these packages
has been less than smooth. Here I document the problems that I came across, and
how I overcame them. So, hopefully, others will not have to be suffer from the
same problems.

*Disclaimers*:
- I am not very familiar with Java. This means that some solutions proposed
    below might not be optimal. Also, some statements might not be accurate.
- I do not plan to actively maintain this post to keep it up to date. So please
    bear in mind that this post is written in Feb 2019 when you read on.

# How does Java work?


# Installing Java & Eclipse
We need to install JDK (Java development kit) for developing java code. JRE is
the java running environment, and JVM is the java virtual machine.
```
sudo apt install default-jdk openjdk-8-jdk
```


# MATSim
## What is MATSim?
## Downloading and installing MATSim
Very important hint: we need to use Java 8 for MATSim! I initially tried to run
the downloaded MATSim example project in eclipse, and it always throws
exceptions. With the error message being "Bad Location: (some number)". It
was not apparent to me how this arised, and I did not have the slightest clue
that this is something related to the version of Java that I was using. After a
full day of random attempts, and when I was just about to give up, I noticed
that the MATSim handbook says MATSim is currently only supported for Java 8.
While the GUI said that I was running with Java 11 JRE.

Then there was some other struggle. I changed my commandline java version to
Java 8, using the command that will be described below in the Via section.  I
even tried to change the project to use Java 8 library. (Turns out that it was
using Java 8 library anyways.) Completely new to Eclipse, I did not know I had
to change the Java runtime environment in my Eclipse preferences. Once I
figured that out, it was just googling. To do this, you simply go to the
toolbar in Eclipse, go to Window>Preferences. Then find Java>Installed JREs. If
Java 8 is not installed, then add it, otherwise, just select it and set it to
default. You might also need to change the compiler compliance level, also in
Preferences, under Java>Compiler.

## Running my First Simulation in MATSim
## MATSim Resources Online
Somehow I was not able to download the MATSim book from the official link from
Ubiquity Press. (The downloaded PDF failed to open.) I am curious as in whether
I am the only one. However, I was able to download the MATSim user
manual/handbook.

# Running Via for visualization
## What is Via?
Via is a visualization software that visualizes the output of MATSim. 

## Downloading and Installing
Unlike MATSim, the website of Via appears to be better maintained.
At the time of the writing (Feb 2019), Via is currently supported only Java
8, but not Java 11. So you might want to know the command to switch your Java
versions.  This can be done by running
```
update-java-alternatives --list
sudo update-java-alternatives --set /path
```
where `/path` is the path listed next to your desired java version in the
output of the first command.

I believe that Via uses JavaFX for the graphic interface. Since I installed
`openjdk-8`, I had to install JavaFX separately using the command:
```
sudo apt install openjfx
```
However, if you use the oracle jdk, then it should come with JFX, although I
have not tried that myself.

This tutorial on using Via I found to be very helpful. [Via Tutorial on Youtube
by Johan
Joubert](https://www.youtube.com/watch?v=otH6q0rCaPw&index=10&list=PLLGIZCXnKbU6-9vy_rKZ6gW7E_ra42hfX)
