---
layout: post
title: "Setting up my Ubuntu Workflow"
modified: 8/24/2021, 16:00:00
tags: [workflow]
category: workflow
excerpt: ""
---

As much as I enjoy tinkering with my Ubuntu workflow, setting up a new machine
has been a struggle for me each time. Recently, I had to setup a new machine I
got for my office, and I decided to document the steps I took and the helpful
advices I referenced. Hopefully this will be helpful to my future self and some
other amateur debian users out there.

# [NeoVim](https://neovim.io/)
- Can now be done with a simple `sudo apt install neovim`.
- TODO: Setting up vimplug

# [Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
- Can now be install through apt with `sudo apt install zsh`. After first-time
  installation, zsh will prompt you for setup instructions. Follow the
  instructions and you'll be fine.
- Changing the default shell can be done with `chsh -s $(which zsh)`. Using
  sudo on this did not work for me. Maybe just stick with chsh, it will ask you
  for password.
- Installing oh-my-zsh: instructions can be found
  [here](https://ohmyz.sh/#install). Might require installing `curl` first.
- Default themes can be selected by changing `ZSH\_THEME` in `~/.zshrc`.
  Currently using af-magic.

# Tmux
- Can be installed with `sudo apt install tmux`.
- Fixing the esc(ape) delay: add `set -sg escape-time 20` to `~/.tmux.conf`.

# Git
- Can be installed with `sudo apt install git`.
- Configuring user info:
```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```
- Using github:
    * Generate ssh key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
    * Adding the key to github:
      [instructions](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)


# Jekyll
- [Official Setup Guide](https://jekyllrb.com/docs/step-by-step/01-setup/)
- Installation
    * Install ruby by using `apt install ruby` causes permission issues when
      trying to install gems.
    * The better way is to install rvm:
      [instructions](https://rvm.io/rvm/install#explained).
    * After installing rvm, run (I still get some dependency issue for 3.0.1, hence the older version of ruby).
        ```
        rvm install 2.7.0
        rvm use 2.7.0
        ```
    * Then, `gem install jekyll bundle` installs jekyll.
- You might need to specify the ruby version with rvm before using jekyll each
  time. Do that by calling `rvm use 2.7.0`. You might get "rvm is not a
  function", to address this, follow
  [this](https://stackoverflow.com/a/16103755) answer.


# Virtual env and Python
- Install `pip` with `sudo apt install python3-pip`.
- Install `virtualenv` with `sudo apt install virtualenv`. Add
    ```
    export VIRTUALENVWRAPPER\_PYTHON=/usr/bin/python3
    export WORKON_HOME=$HOME/.virtualenvs
    export PROJECT_HOME=$HOME/Devel
    source /home/fengjun/.local/bin/virtualenvwrapper.sh
    ```
    to `~/.zshrc`. 
- Then, install `virtualenvwrapper` with `pip3 install virtualenvwrapper`.
- I broke `pip` with some `apt purge` commands. To fix it, I had to force Then
  I needed to adI somehow broke pip along the way with some `apt purge`
  commands that I ran. To fix it, I had to force reinstall `sudo apt install
  --reinstall python3-pkg-resources python3-setuptools`.  Thankfully pip now
  works and I can also use virtualenvwrapper without a problem.
- To add desired kernels to jupyter notebook, use `python -m ipykernel install
  --user --name general --display-name "general"`

# Matlab
- [Installation
  instructions](https://cets.seas.upenn.edu/software/matlab/student/) for Penn
  SEAS students.
- Note to myself: remember to install the control system toolbox for stuff like
  `idare`!
- **CVX**: just download the cvx .tar file from the official website and run
  cvx\_setup in the matlab commandline. Then add the command `run
  /home/fengjun/.cvx/cvx_startup.m` to the file
  `/home/username/Documents/MATLAB/startup.m`.
- **Gurobi**: somehow the `cvx\_getgrbkey` does not work for me. The easier way
  is to download gurobi from the official site, and then go to the bin folder
  of gurobi to run the executable `grbgetkey`. When prompted, save the `.lic`
  file to the home directory and then run cvx\_setup. cvx should be able to
  automatically detect the license.

## Misc
- [Fusuma](https://github.com/iberianpig/fusuma)
- [Chrome](https://www.google.com/chrome/)
- [Slack](https://slack.com/downloads/linux): Note that the big button
  downloads the `.rpm` package, but they have a link on the same page to
  download the `.deb` package.
- [Zoom](https://zoom.us/download)
- TODO: Chinese input
