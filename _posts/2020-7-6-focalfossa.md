---
layout: post
title: "[Workflow] Re-Setting up My Machine"
modified: 3/24/2019, 16:00:00
tags: [workflow]
category: blog
excerpt: ""
---

I had to set up a machine with my work environment last week, and I decided to
compile the steps I took and the tutorials I read so that I will have a
one-stop reference to what I did when I need to set up another machine in the
future. I am running Ubuntu 20.04 as my OS. Hopefully this can be useful for
other amateur debian users out there.

## Vim
Installing neovim is pretty easy these days. It's a simple
`sudo apt install neovim`
For some reason, I did not even need to set the alias in bashrc/zshrc this
time. The command `vim` is automatically recognized as nvim.

stuff like making vim share system clipboard and make vim use mouse can easily
be done by copying the `~/.config/nvim/init.vim` over.

TODO: How to setup vimplug and how to really setup the vim environment

## Zsh
- [zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
Installing zsh is also really easy now. `sudo apt install zsh` does the job.
When zsh is launched for the first time, it will ask the user for certain
settings, just follow the instructions and you will be fine.

Now we still need to set a theme and set zsh as the default shell.

Changing zsh to the default can be done easily as
`chsh -s $(which zsh)`. using sudo on this did not work for me. Maybe just stick with chsh, it will ask you for password.

Installing oh-my-zsh (need to apt install curl first)
`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

Now we can select a theme. This can usually be done easily by going to ~/.zshrc
and changing the ZSH\_THEME. Some themes require specific installation
procedures (eg. pure), in which case you might need to follow a different set
of instructions.

## Tmux
Installing tmux is also a simple `sudo apt install tmux`.
A common problem is that the esc(ape) key can be delayed in tmux. The fix
(reference in
[superuser](https://superuser.com/questions/942677/consequences-of-escape-time-0-tmux-setting))
says to add `set -sg escape-time 20` to `~/.tmux.conf`.

## Git
`sudo apt install git`
- add the ssh keys to github
[generating ssh key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
` ssh-keygen -t ed25519 -C "your_email@example.com"`
[adding ssh key to github](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- add usernames and stuff

## Jekyll
Install ruby by using `apt install ruby` causes permission issues when trying
to install gems. According to the accepted answer in [this
post](https://stackoverflow.com/questions/17550903/why-do-i-get-a-permission-denied-error-while-installing-a-gem),
the better way is to install rvm, whose process can be found
[here](https://rvm.io/rvm/install#explained).

After rvm is installed, we can use
```
rvm install 2.7.0
rvm use 2.7.0
```
(I still get some dependency issue for 3.0.1, hence the older version of ruby).
Then we can just call
`gem install jekyll bundle`, after which we can launch jekyll as `jekyll
serve`. Note that everytime we want to run jekyll, we have to first specify the
ruby version with rvm by calling `rvm use 2.7.0`. You might get "rvm is not a
function", to address this, follow [this](https://stackoverflow.com/a/16103755)
answer.

[Official Setup Guide](https://jekyllrb.com/docs/step-by-step/01-setup/)

## Virtual env and Python
- virtualenvwrapper
	- installation (pip3 install virtualenvwrapper)
	- zsh setup (https://gist.github.com/heymonkeyriot/9a2f429caff5c091d5429666fa080403)
	- also note to add to zshrc VIRTUALENVWRAPPER\_PYTHON=/usr/bin/python3
	- https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/virtualenv
- install python packages (includes ipython and jupyter notebook)

## Productivity Software

## Misc
- fusuma (https://github.com/iberianpig/fusuma)
- chrome (go to chrome official site and download .deb)
- slack, zoom (pretty easy to install, just look up slack and zoom in google.
  slack somehow has a big button that downloads the .rpm package, but they also
  have the .deb version on the same page)
- chinese input (using fcitx and google pinyin)
- matlab (cvx, gurobi)
