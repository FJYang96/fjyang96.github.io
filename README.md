# Fengjun Yang — personal site

A custom Jekyll site designed around a concise introduction and a reverse-chronological collection of notes.

## Preview locally

```bash
bundle exec jekyll serve --livereload
```

Open <http://localhost:4000>.

## Start a note

```bash
bin/new-post "A title for the new note"
```

The command creates a dated Markdown note in `_posts`. Nothing is published until the file is committed and pushed to the GitHub Pages repository.

Use the post front matter to control its summary, topics, and math support:

```yaml
---
layout: post
title: "A title for the new note"
description: "A short summary shown on the homepage."
date: 2026-08-20
math: true
tags: [control, robotics]
---
```

## Math

Set `math: true`, then write TeX directly in Markdown:

```markdown
Inline math looks like $x_{t+1} = Ax_t + Bu_t$.

$$
x_{t+1} = Ax_t + Bu_t
$$
```

## Sidenotes

Use ordinary Markdown footnotes:

```markdown
Locality changes what the controller can observe.[^locality]

[^locality]: The precise neighborhood depends on the communication graph.
```

On wide screens, these are placed beside the relevant paragraph. On smaller screens, they remain conventional notes at the end of the article.
