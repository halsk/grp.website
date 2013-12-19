---
layout: post
title: "The Georepublic Times is using Octopress"
author: "Daniel Kastl"
date: 2012-10-04 21:53:00
tags: 
  - Tech 
  - Press 
  - Foss
published: true
comments: true
language: en
---

Let's start with a first post about how to publish articles on Georepublic's brand-new blog.

Since the writing of blog articles has almost stalled in this year, even if Georepublic's *population* nearly doubled since 2011, there was probably something wrong the old blog system. Because we're all not very ambitious novelists, there had to be something that we were more familiar with.

Well, [Octopress][1] was the choice , because I hope that it's geeky enough to be accepted by the majority. And because it makes use of the same software and tools that everyone is using anyway.

So how to get started?

<!-- more -->

## Prerequisites

First of all you need to be a *citizen of Georepublic* to be able to post in *The Georepublic Times*. If you're not but want to join us, <a href="mailto:info@georepublic.de">write us</a> an email.

Then make sure that you have the required software installed:

* Install Git (no, seriously ;-)
* Install Ruby (the [project docs][3] say version 1.9.3)

Eventually you will find out later that you're missing some Ruby dependencies.

The next steps are rather simple.


## Get the source

As *citizen* you have acces to the Georepublic [GitHub repository][4]. Open a terminal window and run:

```
$ git clone git@github.com:Georepublic/georepublic.github.com.git
$ cd georepublic.github.com
```

This repository contains 2 branches, `master` and `source`. The `master` branch we don't need to care about, because Octopress does everything there to deploy the content. `source` is our playground, so let's switch there first:

```
$ git checkout source
```

Now it's time to think about a nice topic.


## Write an article

To write a new article run the following command to create a basic page template

```
$ rake new_post["The Georepublic Times using Octopress"]
```

Not to produce a mess with too many files all inside the `source/_posts` directory, move the file containing the new post into a subdirectory, named by the current year.

Then use your favorite editor and first complete the metadata in the file header. It's also a good idea to take a look at existing articles and how they're written.

```
layout: post
title: "The Georepublic Times using Octopress"
author: "Team Georepublic"
date: 2012-10-04 12:00
comments: true
tags: howtos announcements
published: true
```

After that comes your article, written in [Markdown syntax][5].
While writing you can check if your text looks OK with the following command:

```
$ rake generate
$ rake preview
```

You can keep the *preview server* running while writing the article and it will update automatically when changes are saved.


## Publish your work

Before publishing your changes, you need to init new git repository on the `_deploy` directory:

```
$ cd _deploy
$ git init
$ git remote add git@github.com:Georepublic/georepublic.github.com.git
$ git pull origin master
$ cd ..
```

When you're done and satisfied with the result, it's time to publish your post:

```
$ rake generate
$ rake deploy
```

or simply run:

```
$ rake gen_deploy
```

Now you can inform your Twitter and Facebook friends, but don't forget to push your changes to the Github repository:

```
$ git status
$ git add path/to/new/file(s)
$ git commit -m "Great article for The Georepublic Times" path/to/changed/file(s)
$ git push origin source
```

In case this was easy and fun, think about the next article!


[1]: http://octopress.org
[3]: http://octopress.org/docs/setup/
[4]: https://github.com/Georepublic/
[5]: http://daringfireball.net/projects/markdown/syntax

