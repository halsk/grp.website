---
layout: post
title: "How to contribute to an existing Octopress blog"
author: "Daniel Kastl"
date: 2012-11-27 15:11:00
tags: 
  - Tech 
  - Howto
published: true
comments: true
lang: en
---

You managed to setup your own Octopress blog? Great!
After a while you switch to another PC or your colleague wants to contribute 
an article and nothing worked as easy as I expected.
 
There are probably hundreds of blog posts that describe how to setup Octopress 
with Github hosting, but how often do you start a blog from scratch? Setting up
Octopress was fun, starting with an existing setup was frustration.

And it was rather diffuclt to find useful information to solve the problems, so
while this post is mainly for the Georepublic citizens to be able to contribute 
articles to this blog, it might be also helpful for others.

<!-- more -->

First it's necessary to clone the existing Github repository, that contains the blog, 
and switch to the `source` branch:

```
git clone git@github.com:Georepublic/georepublic.github.com.git
cd georepublic.github.com
git checkout source
```

## Issue 1: Ruby versions

If you're a Ruby developer you probably got used to this, but to have the correct
version installed is a never ending story. Fortunately with Ubuntu 12.10 you can
now install the correct version of Ruby with `sudo apt-get install ruby1.9.3` and
the following steps should work:

```
ruby --version  # Should report Ruby 1.9.3
sudo gem install bundler
bundle install
```

If you're using MacOS or have multiple versions of Ruby installed, there are lots
of articles out there to manage the mess.

If you're lucky you can now already run `rake generate` or `rake preview`.

## Issue 2: Japanese characters in URL's

While it worked on Ubuntu, MacOS was throwing errors and `rake generate` refused 
to do its job. This was the first big showstopper for Georepublic Mac users. Finding
the reason for the error was rather difficult, the solution was to encode URL's with 
Japanese characters in URL segments:

```
@@ -18,12 +18,12 @@ footer: true

 ## 2012/11/07~ FOSS4G 2012 Osaka & Kansai Open Forum

-> Website: <http://www.osgeo.jp/イベント/foss4g2012osaka/>
+> Website: <http://www.osgeo.jp/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/foss4g2012osaka/>

 ## 2012/11/03~ FOSS4G 2012 Tokyo

-> Website: <http://www.osgeo.jp/イベント/foss4g2012tokyo/>
+> Website: <http://www.osgeo.jp/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88/foss4g2012tokyo/>

 ## 2012/10/05 ジオメディアサミット神戸
```

Not a big win for readability, but this solved the issue.

## Issue 3: Rsync failed with wrong configuration 

I didn't remember that I had ever made any settings for `rsysnc`, but suddenly
`rake deploy` didn't work anymore and returned a strange error:

```
## Deploying website via Rsync
ssh: connect to host domain.com port 22: Connection refused
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: unexplained error (code 255) at /SourceCache/rsync/rsync-42/rsync/io.c(452) [sender=2.6.9]
FAILED
```

The reason: an Octopress update had modified the `Rakefile` and silently changed the
default deployment method:

```
@@ -7,8 +7,8 @@ require "stringex"
 ssh_user       = "user@domain.com"
 ssh_port       = "22"
 document_root  = "~/website.com/"
-rsync_delete   = true
-deploy_default = "push"
+rsync_delete   = false
+deploy_default = "rsync"
 
 # This will be configured for you when you run config_deploy
 deploy_branch  = "master"
```

## Issue 4: nothing to commit

After that everything seemed to work and the preview of a new article looked good.
But then after `rake deploy` nothing changed:

```
[...]
fatal: no files added

## Commiting: Site updated at 2012-11-27 05:42:30 UTC
# On branch source
nothing to commit (working directory clean)

## Pushing generated _deploy website
Everything up-to-date

## Github Pages deploy complete
cd -
```

Changes in `_deploy` aren't synchronized with the Github repository. The console
log is rather confusing, but the following steps fixed it:

```
# If the _deploy directory exists already, remove it first
rm -Rf _deploy

# Then create a new one and configure it as the master branch
mkdir _deploy
cd _deploy
git init
git remote add origin git@github.com:Georepublic/georepublic.github.com.git
git pull origin master
cd ..
```

If this article appears now on the blog, it finally worked!

## Summary

All commands to contribute to Georepublic Times:

```
git clone git@github.com:Georepublic/georepublic.github.com.git
cd georepublic.github.com
git checkout source

sudo gem install bundler
bundle install

mkdir _deploy && cd _deploy
git init
git remote add origin git@github.com:Georepublic/georepublic.github.com.git
git pull origin master
cd ..
```
