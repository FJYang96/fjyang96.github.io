---
layout: page
title: Fengjun
excerpt: "Reading and Project Notes"
---
# Dynamical Systems and Control

# Game Theory
I am currently working on a series of posts on fundamental concepts in game
theory.
{% for post in site.posts %}
  {% if post.tags contains "gt" %}
  - [{{post.title}}]({{post.url}})
  {% endif %}
{% endfor %}
