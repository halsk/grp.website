---
layout: post
title: "pgRouting 2.0 is coming soon"
author: "Daniel Kastl"
date: 2013-08-06 05:48:00
tags: 
  - Foss 
  - pgRouting 
  - Tech]
published: true
comments: true
language: en
---

With the (inofficial) alpha, beta and rc1 release of the new [pgRouting][2] 2.0.0 lots of smaller and bigger issues have been fixed: for example TSP now accepts a start and also an end point, the "develop" branch is checked on Travis CI
with every commit and tested with different versions of PostgreSQL/PostGIS, the documentation can be translated with [Transifex][14], etc..

![pgRouting Project][1]

Please help with testing and reporting issues, so we can release a stable pgRouting soon!

* Want to know what will be new in pgRouting 2.0?
* Want to help us to get pgRouting 2.0 released?

<!-- more -->


## What is new with pgRouting?

With the release of [pgRouting][2] 2.0 the library has abandoned backwards compatibility to pgRouting 1.x releases. We did this so we could restructure pgRouting, standardize the function naming, and prepare the project for future development. As a result of this effort, we have been able to simplify pgRouting, add significant new functionality, integrate documentation and testing into the source tree and make it easier for multiple developers to make contribution.

* Graph Analytics - tools for detecting and fixing connection some problems in a graph
* Two new All Pairs Short Path algorithms (pgr_apspJohnson, pgr_apspWarshall)
* Bi-directional Dijkstra and A-star search algorithms (pgr_bdAstar, pgr_bdDijkstra)
* One to many nodes search (pgr_kDijkstra)
* K alternate paths shortest path (pgr_ksp)
* New TSP solver that simplifies the code and the build process (pgr_tsp), dropped “Gaul Library” dependency
* Turn Restricted shortest path (pgr_trsp) that replaces Shooting Star
* Modular library design
* Compatibility with PostgreSQL 9.1 or newer
* Compatibility with PostGIS 2.0 or newer
* Installs as PostgreSQL EXTENSION
* Added pgr_ prefix to functions and types
* Better documentation: [http://docs.pgrouting.org][12]

For more changes see the [release notes][13].

## How can you help?

* The website was updated and lists the new features: http://pgrouting.org/
* The documentation for Version "2.0.0-rc1": http://docs.pgrouting.org/v2.0.0-rc1/doc/index.html
* Github project site: https://github.com/pgRouting/pgrouting/tree/develop
* Launchpad PPA: https://launchpad.net/~georepublic/+archive/pgrouting-unstable
* Windows builds: http://winnie.postgis.net/download/windows/pg92/buildbot/
* Download source: https://github.com/pgRouting/pgrouting/tags
* Contribute translations: https://www.transifex.com/projects/p/pgrouting/

Also osm2pgrouting was updated and should work now with OSM 32bit ID's as well as new pgRouting functions: https://github.com/pgRouting/osm2pgrouting/tags

It would be great to get feedback from testers!

Just write to the mailing list and/or report issues on Github:

* pgRouting: https://github.com/pgRouting/pgrouting/issues
* osm2pgrouting: https://github.com/pgRouting/osm2pgrouting/issues


## About pgRouting

[pgRouting][2] is an extension of [PostGIS][3] and [PostgreSQL][4] geospatial database and adds routing and other network analysis functionality. A predecessor of pgRouting – pgDijkstra, written by Sylvain Pasche from [Camptocamp][5], was later extended by [Orkney][6] and renamed to pgRouting. The project is now supported and maintained by [Georepublic][7], [iMaptools][8] and a broad user community.

pgRouting is an [OSGeo Labs][9] project of the [OSGeo Foundation][10] and included on [OSGeo Live][11].


[1]: /media/2013/pgrouting-logo.png
[2]: http://www.pgrouting.org/
[3]: http://postgis.net/
[4]: http://postgresql.org/
[5]: http://camptocamp.com/
[6]: http://www.orkney.co.jp/
[7]: http://georepublic.info/
[8]: http://imaptools.com/
[9]: http://wiki.osgeo.org/wiki/OSGeo_Labs
[10]: http://osgeo.org/
[11]: http://live.osgeo.org/
[12]: http://docs.pgrouting.org
[13]: http://docs.pgrouting.org/dev/doc/src/changelog/2.0.html
[14]: https://www.transifex.com/projects/p/pgrouting/
