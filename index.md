---
layout: page
title: Fengjun Yang
excerpt: "About Me..."
---
# Homepage of Fengjun Yang 杨逢君
[LinkedIn](https://www.linkedin.com/in/fengjun-yang-920328a9) /
[Resume](/assets/resume.pdf) / 
[Scholar](https://scholar.google.com/citations?user=7FfHurgAAAAJ&hl=en) /
[Email](/email_address.html)

<img src="/assets/selfie.jpg" width="400" class="center">


## About me
I am a fifth-year CS Ph.D. student in the [GRASP](https://www.grasp.upenn.edu/)
Lab at the University of Pennsylvania, working with [Nik
Matni](https://nikolaimatni.github.io/). During my PhD, I also interned
at [The AI Institute](https://theaiinstitute.com/) (working with
[Surya Singh](https://sites.google.com/view/spns/home) and [David
Watkins](https://davidjosephwatkins.com/)) and [Honda Research
Institute](https://usa.honda-ri.com/) (working with [Behdad
Chalaki](https://www.linkedin.com/in/behdadchalaki/)). Before starting my PhD,
I graduated with a MSc in aero/astro from Stanford and a BA in computer science
from Swarthmore.

## Research
My research interest lies at the intersection of machine learning, control
theory, and multiagent systems. Specifically, I think about how to learn to
control multiple dynamically coupled systems using only local information.
Please see
[Scholar](https://scholar.google.com/citations?user=7FfHurgAAAAJ&hl=en) for a
full list my papers.

## Miscellaneous
Some notes to myself.
<ul class="listing">
{% for post in site.posts %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <p>{{ post.excerpt }}</p>
  </li>
{% endfor %}
</ul>

<!-- Insert these to distinguish between technical vs. nontechnical posts
{% if post.category != "technical" %}
{% endif %}
-->
