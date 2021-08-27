---
layout: page
title: Blog
permalink: /blog/
---

# Technical
<hr class="blog-section-underscore">
<ul class="listing">
{% for post in site.posts %}
{% if post.category == "technical" %}
<!-- {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator">{{ y }}</li> 
  {% endif %} -->
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <p>{{ post.excerpt }}</p>
  </li>
{% endif %}
{% endfor %}
</ul>

# Non-technical
<hr class="blog-section-underscore">
<ul class="listing">
{% for post in site.posts %}
{% if post.category != "technical" %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <p>{{ post.excerpt }}</p>
  </li>
{% endif %}
{% endfor %}
</ul>
