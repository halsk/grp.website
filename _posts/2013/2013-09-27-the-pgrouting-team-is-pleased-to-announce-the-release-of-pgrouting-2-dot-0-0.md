---
layout: post
title: "The pgRouting Team is pleased to announce the release of pgRouting 2.0.0"
author: "Daniel Kastl"
date: 2013-09-27 08:13:00
tags: 
  - Foss 
  - pgRouting 
  - Tech
published: true
comments: true
language: en
---

This 2.0 release brings a number of major new features:

* All Pairs Shortest Path, Johnson’s Algorithm **NEW**
* All Pairs Shortest Path, Floyd-Warshall Algorithm **NEW**
* Shortest Path A*
* Bi-directional Dijkstra Shortest Path **NEW**
* Bi-directional A* Shortest Path **NEW**
* Shortest Path Dijkstra
* Driving Distance
* K-Shortest Path, Multiple Alternative Paths **NEW**
* K-Dijkstra, One to Many Shortest Path **NEW**
* Traveling Sales Person **NEW Implementation**
* Turn Restriction Shortest Path (TRSP) **NEW**
* New functions for creating routing topology
* New functions for analyzing a graph for problems

<!-- more -->

[pgRouting][2] 2.0 is **not** backwards compatible with the 1.x version. This is a significant overhaul of the whole pgRouting environment and we have renamed all the functions and rationalized the arguments and return types. While this will be a painful migration for 1.x applications, we believe the new functionality, the high quality of the code, and new documentation will make it much easier to grow the product and support it over future releases.

## Project resources

![pgRouting 2.0.0][1]

* The pgRouting project website: http://pgrouting.org
* The new pgRouting documentation: http://docs.pgrouting.org
* An updated pgRouting workshop: http://workshop.pgrouting.org
* pgRouting support: http://pgrouting.org/support.html

## Thanks

Thank you to all of the users, developers, and supporters of [pgRouting][2]. We would like to call out special thanks to [CSIS (University of Tokyo)][5], [Georepublic][3], [Paragon Corporation][6], [iMaptools.com][4] and to Vicky Vergara for their time and support that really made this release possible. We also had a lot of support from our users testing releases, submitting patches, reporting issues and our apologies for not being able to list everyone by name but we do appreciate everyone's efforts.
Enjoy.

The pgRouting Team


[1]: /media/2013/pgrouting-logo.png
[2]: http://www.pgrouting.org/
[3]: http://georepublic.info/
[4]: http://imaptools.com/
[5]: http://www.csis.u-tokyo.ac.jp/english/
[6]: http://www.paragoncorporation.com/
