---
layout: post
title: "The Cuisines of the world"
author: Pavithran
date: 2013-01-23 12:00:00
tags:
  - OSM
published: true
comments: true
language: en
---

<p><strong>Tags</strong> or <strong>tagging</strong> are quite underrated in mapping where colourful lines/dots make up for most of the look and feel  . <strong><a href="http://wiki.openstreetmap.org/wiki/Main_Page" alt="Open Street Map wiki">OpenStreetMap</a></strong> as the name says is an open map but  also is  a open geographic database licensed under <a href="http://wiki.openstreetmap.org/wiki/Open_Database_License" alt="Open Database License">ODBL</a> . The beauty of the data is that its not just a dump of all the data but follows a certain <a href="http://wiki.openstreetmap.org/wiki/API_v0.6" alt="OSM API">schema</a> and could also be said to be semantic in nature aka it could be easily queried by a human or machine to get required information </p>

<p>What I would like to say is that tagging provides a rich dataset which may or may not pave a way for a beautiful map but definitely provides an insight into both mapping community as well as the geographic features of that region .<a href="http://wiki.openstreetmap.org/wiki/Tag" alt="OSM Tag">Tags</a> are used to represent data in Openstreetmap with Key value pairs . Example could be <code>amenity=cafe</code>
</p>
<p>

Here is a tag "<strong><a href="http://wiki.openstreetmap.org/wiki/Cuisine" alt="OSM wiki cuisine Key">cuisine</a></strong>" which simply tells what people are eating all over the world .</p><p>
<a href="/media/2013/japan.png" target="_blank"><img src="/media/2013/japan-small.png" alt="Japanese cuisine tags"></a><br><div style="color:#990099;background:white">Cusine Tags of Japan from a dataset of 5760 tags</div> </p>
<p>
Here is <strong>Japanese cuisine</strong> which shows that Japanese as a common tag is used added to sushi which is quite popular from Japan .We could also see the japanese eating noodles,chinese and are visiting coffee shops and burger places more often .
</p>

<!-- more -->

## London
<p><a href="/media/2013/london.png" target="_blank"><img src="/media/2013/london-small.png" alt="London cuisine tags"></a><div style="color:#990099">Cusine Tags of London from a dataset of 2134 tags</div></p>
<p>
<strong>London</strong> could be seen to have lot of indian,chinese and italian  eating places while at the same time retaining its traditional fish and Chips .
</p>
## Berlin
<p><a href="/media/2013/berlin.png" target="_blank"><img src="/media/2013/berlin-small.png" alt="Berlin cuisine tags"></a><div style="color:#990099">Cusine Tags of berlin from a dataset of 2970 tags</div></p><p>
italian cusine seems to rule <strong>berlin</strong> with german , asian and kabab cuisines following in later places.</p>
## Paris
<p><a href="/media/2013/paris.png" target="_blank"><img src="/media/2013/paris-small.png" alt=" Paris cuisine tags"></a><div style="color:#990099">Cusine Tags of Paris from a dataset of 2537 tags</div></p>

<p>The french eat their own cuisine at <strong>paris</strong> with also a good appetite for Japanese,Chinese and Pizza.</p>

## Story behind the visualisation
So How did I end up with such neat tag cloud of cuisines ?


<p>I reimported small chunks of OSM data via <a href="http://download.geofabrik.de/openstreetmap/" alt="Geofabrik OSM Downloads">geofabrik</a>  as <strong>Hstore</strong> into postgres so as to get all the tags especially the ones which were not imported via the main mapnik import  . Using the<code> (tags)</code> as key we could query appropriates for> <code> (tags->cuisine)</code> .</p>
<p>
``` bash
SELECT (tags->'cuisine')
  INTO cuisinetable FROM planet_osm_point 
    WHERE  ( (tags->'cuisine') IS NOT NULL  );
```
</p>
<p>Later We could export the table as CSV with headers intact. </p>
``` bash
copy  cuisinetable to '/tmp/cuisine-list.csv' delimiter ',' csv header;
```

<p>As the above query returns lot of cuisine tags , I feed them to a <a href="http://d3js.org" alt="D3 JS" >d3</a> script  to create a cloud of tags .</p>

