---
layout: post
title: "Genetic Algorithms Fun"
author: "Anton Patrushev"
date: 2010-02-26 12:00:00
tags: 
  - pgrouting 
  - algorithm
published: true
comments: true
language: en
---

I have something to say for those of you who don't believe in the Darwin's Theory of Evolution - evolution just works! 
I mean it really works. One can get perfect and exact solution of a problem from an ugly set of numbers which doesn't make any sense.
Here is the perfect and simple example of this:

<iframe width="420" height="315" src="//www.youtube.com/embed/meNbRVuAsug?rel=0" frameborder="0" allowfullscreen="allowfullscreen">Genetic Algorithms</iframe>

(more info about this project is [here][1])

See? It goes almost directly to a goal, all you need is to have one (here we can speculate if God has a goal).
 
To make evolution work we need an information which describes a creature - an information we can modify and pass to another generations. Mother Nature made it for us - things we call 'genes'. And as long as we copy everything from the nature, we just copied this perfect approach also to solve for example NP-hard problems. And we call it Genetic Algorithms (or GA).

<!-- more -->

!['Genetic Algorithms'][6]

We used GA in pgRouting before for solving [Travelling Salesperson Problem][3] (or TSP), and we used very nice and good working [GAUL][4] library for this. And it worked like a charm!

Now we are facing another challenge - to extend pgRouting by adding the [Vehicle Routing Problem][5] (or VRP) solver using GA. SO, this is kind of an announcement about what is cooking now at Georepublic's kitchen. I just wanted you to share my excitement about GA and thank Kristin Berg Bergvinsdottir for her theses dedicated to this problem and its solution.


[1]: http://rogeralsing.com/2008/12/11/genetic-programming-mona-lisa-source-code-and-binaries/
[3]: http://en.wikipedia.org/wiki/Travelling_salesman_problem
[4]: http://gaul.sourceforge.net/index.php
[5]: http://en.wikipedia.org/wiki/VRP
[6]: http://farm3.staticflickr.com/2602/3953574449_70f1441b94.jpg


