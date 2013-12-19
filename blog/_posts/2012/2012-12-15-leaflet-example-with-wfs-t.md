---
layout: post
title: "Leaflet example with WFS-T"
author: "Daniel Kastl"
date: 2012-12-15 11:15:00
tags: 
  - Tech 
  - Foss
published: true
comments: true
language: en
---

This article is supposed to be No. 15 in the Japanese [FOSS4G Advent Calendar 2012][1] 
and it's probably the first and last one in English for this year. First I wanted 
to build pgRouting Ubuntu packages and write about it, but then I saw the other 
great blog posts and decided to change the topic.

Recently several customers asked me, if it would be possible to use [Leaflet][2]
instead of [OpenLayers][3]. For a simple map obviously that's no problem and 
quite easy task, but what if you need more than [OpenStreetMap][4], a WMS overlay 
and a few dozen markers?

<!-- more -->

## The mission

![Leaflet example with WFS-T][10]

So I tried to create a simple example with the following goals:

* Simple fullscreen map with [Leaflet][2]
* Drag and drop markers on the map
* Write to the database with WFS-T right away
* Plain HTML, Javascript and CSS (no server-side application except database and [Geoserver][5])
* A [Christmas Tree][9] icon
* Quick, short and simple (maybe failed ;-)

If you have no time to read the whole article, the [source code][7] is hosted
on Github and a [demo][8] exists, too.

## Prerequisites

The primary goal was to not spend much time. [OpenLayers][3] supports so many
data formats and map layers, so it's easy to build a browser map application
in a relatively short time.

But the browser application is just one part. To be able to store data with WFS
you need to install and configure [Geoserver][5] and PostgreSQL with PostGIS.

### PostgreSQL with PostGIS

This is a rather simple task. Create a database and then a table to store point
data:

```
\c mydb
CREATE EXTENSION postgis;
CREATE SCHEMA wfsdemo;

CREATE TABLE wfsdemo.points
(
  id serial NOT NULL,
  class text,
  ip text,
  pid text NOT NULL,
  created timestamp without time zone DEFAULT now(),
  the_geom geometry(Point,4326),
  CONSTRAINT points_pkey PRIMARY KEY (id ),
  CONSTRAINT points_pid_key UNIQUE (pid )
);
CREATE INDEX idx_wfsdemo_points_the_geom ON wfsdemo.points USING gist (the_geom);
CREATE INDEX idx_wfsdemo_points_ip ON wfsdemo.points USING btree (ip);
```

Because Geoserver's WFS doesn't support to insert `empty` attributes and use
default values (instead it inserts `NULL`), the following workaround is necessary
to automatically insert the current timestamp `now()`:

```
CREATE OR REPLACE FUNCTION wfsdemo.points_default_timestamp()
  RETURNS trigger AS
$BODY$
  BEGIN
    IF NEW.created IS NULL THEN
      NEW.created := now();
    END IF;
    RETURN NEW;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION wfsdemo.points_default_timestamp()
  OWNER TO postgres;
  
CREATE TRIGGER points_trigger_default_timestamp
  BEFORE INSERT
  ON wfsdemo.points
  FOR EACH ROW
  EXECUTE PROCEDURE wfsdemo.points_default_timestamp();
```

### Geoserver 

Configuration of Geoserver is done through the browser interface:

* Create a `Workspace` (WFS: `namespace`).
* Create a `PostGIS Store` that connects to the database and schema.
* Publish a `Layer` of the `wfsdemo.points` table
* Enable WFS

**Note**: Because of the browser ["same origin policy"][11] it's usally 
necessary to either use a proxy or run the HTML page as well as Geoserver with 
the same domain name and port number. 

## The Tree Map

After Geoserver and PostgreSQL are setup, finally we can start with the map.
I'm using the following Javascript libraries:

* [Leaflet][2] for the map
* [jQuery][6] and [jQuery UI][12] 
* [hostip.info][14] to read the IP address and filter markers later by user

```
<!DOCTYPE html >
<html>
<head>
	<title>Tree Map</title>
	<meta charset="utf-8" />

	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.css" />
	<!--[if lte IE 8]>
	    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.ie.css" />
	<![endif]-->
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />

	<style>
		<!-- CSS styles -->
	</style>
</head>
<body>
	<div id="map"></div>
	<div id="box">Drag Marker on the map: 
		<span class="poi-type"><img class="drag" type="tree" src="icons/tree_green.png" alt="TREE: green" />Tree</span>
		<span class="poi-type"><img class="drag" type="red" src="icons/poi_red.png" alt="POI: red" />Red</span>
		<span class="poi-type"><img class="drag" type="black" src="icons/poi_black.png" alt="POI: black" />Black</span>
	</div>

	<script src="http://cdn.leafletjs.com/leaflet-0.4.5/leaflet.js"></script>
	<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
	<script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>

	<script>
		// Javascript
	</script>
</body>
</html>
```

### Styling 

To create a fullscreen map view with a floating panel on the top right corner, 
the following CSS works:

```
* { padding: 0; margin: 0; }
body,html { height: 100%; }
#map { width: 100%; height: 100%; min-height: 100%; }
* html #map { height: 100%; }
#box { position: absolute;  top: 10px; right: 10px; 
	background-color: white; padding: 10px; z-index: 1000; }
#box img { margin-left: 20px; margin-right: 5px; cursor: pointer; }
```

### Markers

[The Noun Project][13] has lots of good looking vector icons and I could find a 
[Christmas Treet][9] released under Public Domain license. With Inkscape it's not
difficult to create an icon and a shadow image in a specific size:

With Leaflet markers can be configured easily:

```
var poiIcon = L.Icon.extend({
    options: {
        iconSize: [22,32],
        iconAnchor: [-20,0],
        shadowUrl: 'icons/poi_shadow.png',
        shadowSize: [22,13],
        shadowAnchor: [-31,-19],
        popupAnchor: [32,-2]
    }
});

var blackIcon = new poiIcon({iconUrl:'icons/poi_black.png'});
var redIcon   = new poiIcon({iconUrl:'icons/poi_red.png'});
var treeIcon  = new poiIcon({iconUrl:'icons/tree_green.png',shadowUrl:'icons/tree_shadow.png'});
```

### Drag and Drop

[jQuery UI][12] provides the right tools to implement drag and drop of markers
into the map:

```
$(".drag").draggable({
	helper: 'clone',
	containment: 'map',
	start: function(evt, ui) {
		$('#box').fadeTo('fast', 0.6, function() {});
	},
	stop: function(evt, ui) {
		$('#box').fadeTo('fast', 1.0, function() {});

		// INSERT Point
	}
});
```

### Insert Marker

Then to insert a marker and append a Popup Leaflet also provides all you need:

```
var options = {
	pid: guid(),
	type: ui.helper.attr('type'),
	icon: eval(ui.helper.attr('type') + 'Icon'),
	draggable: true
};

var point = L.marker(position,options).addTo(map);
point.bindPopup(
	'<a onClick="deletePoint(\'' + point.options.pid 
		+ '\');" href="#">Remove Me!</a>',
	{
		closeButton: false
	}
);

point.on('dragend', function(evt){
	// UPDATE POINT
});

markers.push(point);
``` 

Until here everything is easy with Leaflet. The (rather small) API documentation 
and a few Tutorials explain all you need for creating a simple map.


### WFS-T from scratch

With WFS the excercise begins, because Leaflet doesn't provide specific help
with WFS layers. It is the task that takes most of the time, because
[OpenLayers][3] does such a good job in making a developer's life easy, that you 
can work with WFS for many years without digging much into details of the 
WFS standard.

With Leaflet you have to do it yourself! Once you learned about the obstacles
and how it works, it's not too difficult. And it's propably a good excerise as 
well. But it's not fast and with OpenLayers you would save a lot of time.

There are probably various ways to write this better (and shorter), but that you
don't need to start from scratch, here the result which worked for me:

* [WFS GetFeature][15]
* [WFS-T Insert][16]
* [WFS-T Update][17]
* [WFS-T Delete][18]

## Conclusion

To explain about all details here would make this article too long.
You can find the full [source code][7] of this sample map on Github.
Or just try the demo application:

* Drag markers from the panel to the map
* Move markers on the map
* Open marker popups and remove them from the map

All actions send a prompt WFS request, so changes are written right to the database.

<iframe src="http://lab.georepublic.info/leaflet-wfs/" width="100%" height="600" style="border:1px solid #ccc;"></iframe>

Leaflet is fun to work with and for sure suitable for simple slippy maps.
But OpenLayers provides a lot more features and supports a long list formats, 
and the amount of available community resources is still difficult to beat.
 

[1]: http://atnd.org/events/34052
[2]: http://leafletjs.com/
[3]: http://openlayers.org/
[4]: http://openlayers.org/
[5]: http://geoserver.org/
[6]: http://jquery.com/
[7]: https://github.com/Georepublic/leaflet-wfs/
[8]: http://lab.georepublic.info/leaflet-wfs/
[9]: http://thenounproject.com/noun/christmas-tree/#icon-No8011
[10]: /media/2012/treemap.png
[11]: http://en.wikipedia.org/wiki/Same_origin_policy
[12]: http://jqueryui.com/
[13]: http://thenounproject.com/
[14]: http://api.hostip.info
[15]: https://github.com/Georepublic/leaflet-wfs/blob/master/index.html#L137
[16]: https://github.com/Georepublic/leaflet-wfs/blob/master/index.html#L201
[17]: https://github.com/Georepublic/leaflet-wfs/blob/master/index.html#L242
[18]: https://github.com/Georepublic/leaflet-wfs/blob/master/index.html#L295

