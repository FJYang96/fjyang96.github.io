---
layout: post
title: "[AMoD] MATSim Study Notes"
modified: 2/23/2019, 20:40:00 
tags: [notes]
category: blog
excerpt: Notes on how MATSim works
---

This is my study notes on MATSim. I share what I learned about what MATSim is,
and how to use it to run a simulation. I am just starting to learn about
MATSim, and I also write down things that I am still trying to understand in
the "My Questions" section.

# What is MATSim
MATSim is a traffic simulation tool developed at ETH Zurich and TU Berlin. The
name MATSim stands for **M**ulti- **A**gent **T**ransportation **Sim**ulation. 
As the name suggests, MATSim uses an agent-based simulation method. Using
agent-based method allows MATSim to treat the traffic system as a complex
adaptive system, where each agent tries to maximize her utility by optimizing
her travel plans. As we will see later, this is reflected in the design of the
MATSim algorithm. MATSim is considered to be a highly accurate simulator and
have been used in many research projects.

# What does it do under the hood?
The workflow of MATSim is summarized in this diagram.
[Figure 1.1 from the MATSim User Manual: The MATSim Loop]

Use an example here. Imagine there is an agent Alice. Let's assume that Alice
only leaves home for work everyday, and walk through the loop.

- Initial demand: Each agent will have her own transportation needs. The
    initial demand is something that the user should specify for the
    simulation. It can be sampled from empirical data. Note that the initial
    demand is only a heuristics, and the agents' plans will be optimized during
    the loop.
As we can see, the the loop consists of three modules.
- Mobility Simulation (Mobsim): This is where the simulation happens. With a
    given command for all the agents, the mobsim module simulates the traffic
    flow in the area. 
- Scoring: After the mobility simulation is done, the agents will gain an idea
    of how well their recent plans faired. Did it lead to a long commute time?
    Or was actually not bad? Each agent will have her own utility function that
    maps the plan to a real number. Basically have each agent rate how was the
    travel.
- Replanning: So now we have scored the plans, we try to improve the plans
    based on the information we have at hand.
We repeat these three steps until the average utility of the agents converges
or after a certain number of iterations. (One thing to note here is that the
authors mentioned that when the value converges, it does not necessarily mean
that the system has reached Nash equilibrium.)
- Analyses: MATSim logs all the data during each loop of the simulation. After
    the simulation ends, we can use the collected data to do whatever analyses
    we are interested in.

# How to Run MATSim
Each run would have its own directory, where different input files of this run
is stored. Perhaps the most important one is the config.xml file, which is the
interface between the input and the MATSim program. It stores
configurations for all modules, and stores the path to other files that need to
be referred.

## config.xml
The configuration file groups parameters by the modules and store the values
of these parameters for this run. For example the config.xml can import the
network of this run, specified in another xml file, with
```xml
<module name="network">
    <param name="inputNetworkFile" value="($filename).xml"/>
</module>
```
Specify the start and end time of the mobility simulation in the mobsim module
```xml
<module name="qsim">
    <param name="startTime" value="00:00:00"/>
    <param name="endTime" value="00:00:00"/>
</module>
```
where startTime and endTime equals to `00:00:00` means to start from the
earliest active vehicle event, and end when the last event finished.

We can also specify the number of iterations in the controller module with
```xml
<module name="controler">
    <param name="outputDirectory" value="./output"/>
    <param name="firstIteration" value="0"/>
    <param name="lastIteration" value="10"/>
</module>
```
would mean that we have 10 iterations and the MATSim result will be stored in
the directory `./output`.

Arguably the most important sections in config.xml are the strategy module and
the scoreing module. The strategy module specifies the how many agents in the
population will replan and how they will go about doing that. The scoring
modules scores the each agent's route based on their own utility functions.
From section 2.2.4 in the handbook,
``` xml
<module name= " strategy ">
    <param name= " maxAgentPlanMemorySize " value= "5" / > <! -- 0 means unlimited -->
    ...
</ module>
```
This sets how many plans the agents will keep in their memory. If the agent
has executed more than this number of plans, then the plan with the lowest
score will be thrown out.
```xml
<module name="strategy">
    ...
    < parameterset type= " strategysettings " >
    <param name= " strategyName " value= " ReRoute " / >
    <param name= " weight " value= " 0.1 " / >
    </ parameterset >

    < parameterset type= " strategysettings " >
    <param name= " strategyName " value= " BestScore " / >
    <param name= " weight " value= " 0.9 " / >
    </ parameterset >
</ module >
```
This is less obvious than the setting of other parameters. This means that 10%
of the agents will use the `ReRoute` module to replan their route, while the
remaining 90% of the population will keep picking the route with the highest
score they have in their memory.

The scoring section does not really do the scoring, nor does it specify the
utility functions of each agent. It merely specifies the information needed to
compute the score. As the example given in the MATSim handbook, we need to
specify the duration of the two types of activities given in the population
module.
```xml
<module name= " planCalcScore " >
    < parameterset type= " activityParams " >
    <param name= " activityType " value= "home" / >
    <param name= " typicalDuration " value= " 12:00:00 " / >
    </ parameterset >

    < parameterset type= " activityParams " >
    <param name= " activityType " value= "work" / >
    <param name= " typicalDuration " value= " 08:00:00 " / >
    </ parameterset >
</ module >
```


## network.xml
Here we specify the transportation infrastructure of the simulation. The road
network is modeled as a graph with nodes representing the different locations
of interest, and links that connect the nodes representing the roads.

In the network.xml, we specify nodes with their coordinates, and links with
their starting and ending nodes. Specifically, the network file should look
something like this.
```xml
<network name= " example network ">
    <nodes >
        <node id= "1" x=" 0.0 " y="0.0"/ >
        <node id= "2" x=" 1000.0 " y=" 0.0 "/ >
        ...
    </ nodes >
    <links >
        <link id= "1" from= "1" to= "2" length= " 3000.00 " capacity= " 3600 "
              freespeed= " 27.78 " permlanes= "2" modes= "car" / >
        ...
    </ links >
</ network >
```
## population.xml / plan.xml
This specifies the initial demands of all the agents. This quote in the MATSim
handbook summarizes it well:
> The population contains a list of persons, each person contains a list of
> plans, and each plan contains a list of activities and legs.
Note here activity is done at a single location, and is immediately followed by
a leg, where the agent finishes the activity and travels from this activity to
the next.

Specifically, the file should look something like this.
```xml
<population >
    <person id= "1">
        <plan selected= " yes " score= " 93.2987721 ">
            <act type= " home " link= "1" end_time= " 07:16:23 " / >
            <leg mode= "car ">
                <route type= " links ">1 2 3 </ route >
            </ leg >
            <act type= " work " link= "3" end_time= " 17:38:34 " / >
            <leg mode= "car ">
                <route type= " links ">3 1 </ route >
            </ leg >
            ...
        </ plan>
    </ person >

    <person id= "2">
        ...
    </ person >

    ...
</ population >
```
