---
layout: post
title: "pgRouting preview: the new VRP solver"
author: "St. Nikolaus"
date: 2013-12-06 00:05:00
tags: 
  - pgRouting 
  - Foss 
  - OpenVRP 
published: true
comments: true
language: en
---

> <small>This is a guest post of "St. Nikolaus". It is written for the [Japanese FOSS4G Advent Calendar 2013][1] and it’s probably again the only one in English as in [2012][2].</small> 

<figure class="image" style="float:left;margin-right:20px;">
	<img src="http://upload.wikimedia.org/wikipedia/commons/7/7d/Sinterklaas_2007.jpg" alt="St. Nikolaus" style="width:300px;">
	<figcaption>St. Nikolaus (Source: [1])</figcaption>
</figure>

Let me introduce myself: My name is "St. Nikolaus" and December 6th is <bold>my day</bold>. 

December 6th is the "[St. Nikolaus Day][3]" in Germany and several other countries. Although this is not a public holiday, it is taken rather serious, and people make an effort to celebrate. It starts the night before, when kids shine their boots and put them in front of their bedroom doors. According to folklore, St. Nikolaus will appear overnight and put little gifts into their boots if they have been "good" throughout the year. For the "bad" kids I usually bring my colleage "[Knecht Ruprecht][7]" with me.  

You see, that I'm a a busy man on that day, so I need to think well about my tour plan. Fortunately [pgRouting][4] got some new Vehicle Route Planner (VRP) function, which helped me to optimize my schedule this year.

The [Vehicle Route Planner (VRP)][5] is a new addition to the pgRouting suite of algorithms. It was designed primarily to facilitate an efficient route plan for delivery or pick up vehicles based on the different travel or time cost of each location that has to be visited.
Although the VRP was designed for a delivery system, it is totally possible to use its algorithm for entirely different use cases.

<!-- more -->

For the VRP to compute a route plan, it needs 3 tables. These are:

## 1. The Distance Table

The Distance Table (vdistance) that contains the cost (distance and travel time) from 1 location to all the other locations. This table is created by an another algorithm of the pgRouting suite and the distances can be computed with pgRouting shortest path algorithms, but also with any other routing software and can then be stored in the following table:

```
 dest_id    | integer          | 
 cost       | double precision | 
 distance   | double precision | 
 traveltime | double precision | 
```

## 2. The Vehicles Table

The Vehicles Table (vvehicles) that contains the information of the available vehicles that can be utilised in the creation of the route plan. 

```
   Column   |  Type   | Modifiers 
------------+---------+-----------
 vehicle_id | integer | 
 capacity   | integer | 
 case_no    | integer | 
```

## 3. The Orders Table

The Orders Table (vorders) that contains the information of the location points that have to be visited (tasks, kids, etc.).

```
    Column    |       Type       | Modifiers 
--------------+------------------+-----------
 id           | integer          | 
 order_unit   | integer          |           -- number of units that 
              |                  |              have to be delivered
 open_time    | integer          |           -- start time in min. of 
              |                  |              availability
 close_time   | integer          |           -- end time in min. of 
              |                  |              availability
 service_time | integer          |           -- number of min. necessary
              |                  |              for servicing
 x            | double precision |           -- not used
 y            | double precision |           -- not used
```

## The VRP query

With these tables in place, the route plan can be created using the SQL statement below:

```
vrp=# select * from pgr_vrpOneDepot(
    'select * from vorders'::text,
    'select * from vvehicles'::text,
    'select * from vdistance'::text,
    1 );                                -- 1 is the ID number that 
                                           will be used as the base.
```

This will result in a schedule like this:

```
 oid | opos | vid | tarrival | tdepart 
-----+------+-----+----------+---------
   1 |    0 |   1 |       -1 |       0  -- Vehicle 1 leaves the base 
   7 |    1 |   1 |       33 |      93  -- arrives at Order7 33 mins later,
     |      |     |          |             and then leave 60 mins later 
   3 |    2 |   1 |       97 |     157  -- arrives at Order3 4  mins after
     |      |     |          |             leaving Order7
   5 |    3 |   1 |      180 |     240  -- arrives at Order5 23 mins after
     |      |     |          |             leaving Order3
   4 |    4 |   1 |      245 |     305  -- arrives at Order4 5  mins after
     |      |     |          |             leaving Order5
   1 |    5 |   1 |      344 |      -1  -- returns to base for a total 344
     |      |     |          |             minutes travel time 
   1 |    0 |   2 |       -1 |       0  -- Vehicle 2 leaves the base 
   2 |    1 |   2 |       38 |      98  -- arrives at Order2 38 mins later,
     |      |     |          |             and then leave 60 mins later 
   6 |    2 |   2 |      180 |     240  -- arrives at Order6 82 mins after
     |      |     |          |             leaving Order2
   1 |    3 |   2 |      280 |      -1  -- returns to base for a total 280
     |      |     |          |             minutes travel time 
(10 rows)
```

There are many more steps required to actually build an application with a user interface and graphical output, which will not fit into this blog post.

Try out the following demo application, which currently provides results for routes in Japan only.

## Demo Appplication

<iframe src="http://demo.smartvrp.com:3000" seamless="" width="100%" height="840px"></iframe>

* Demo URL (to view in full size): http://demo.smartvrp.com:3000
* Related presentation: http://talks.dkastl.georepublic.info/2013/smartvrp.html#/

## We need your help!

The [Vehicle Route Planner (VRP)][5] is ready to be integrated into the next release. But this requires some additional effort, for example to do code review, improve the documentation, add automated tests and much more.

If you are interested in using the VRP algorithm, and if you can either help with the tasks above, or if you're able to support us as a sponsor to make the next release happen in the near future, please [contact us][6] and we can provide you with details.


<bold>References:</bold>

* (1): http://en.wikipedia.org/wiki/File:Sinterklaas_2007.jpg


[1]: http://atnd.org/events/45511
[2]: http://blog.georepublic.info/2012/leaflet-example-with-wfs-t/
[3]: http://en.wikipedia.org/wiki/Feast_of_St._Nicholas
[4]: http://pgrouting.org
[5]: https://github.com/pgRouting/pgrouting/wiki/Gsoc-2013-Razequl-Islam
[6]: http://georepublic.info/en/about-us/contact
[7]: https://www.google.co.jp/search?q=Knecht+Ruprecht&tbm=isch

