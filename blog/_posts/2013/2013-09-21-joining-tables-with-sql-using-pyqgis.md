---
layout: post
title: "Joining Tables with SQL using pyQGIS"
author: "Mario Basa"
date: 2013-09-21 23:14:00
tags: 
  - Foss 
  - SQL 
  - QGIS 
  - pyQGIS
published: true
comments: true
language: en
---

One of the features that makes MapInfo's MapBasic very useful is the ability to join a normal tabular data with a spatial data using plain SQL statements within an application. This is useful because it makes it possible to link numerous attribute tables (census, crime, marketing, etc. data) with just 1 table that contains the spatial information (map data).

But what a lot of people do not know is that this feature is also possible in [QGIS][3] with [pyQGIS][4], probably because this is not very well documented (it is not in the [pyQGIS cookbook][5]). 

So to illustrate how joining a table that contains attributes with a table that has spatial table, we can start by opening first a [PostGIS][6] table and display it in a [QGIS][3] map.

<!-- more -->

The spatial table contains the Japanese city polygons and has the following [PostgreSQL][7] information:

```
    - hostname         : localhost
    - port number      : 5432
    - database         : statistics
    - username         : postgres
    - password         : 
    - schema           : public
    - table name       : japan_ver52
    - spatial column   : the_geom
    - unique id column : gid
    - QGIS layer name  : Census
```

In the Python Console:

To access [Quantum GIS][3] environment from this console use `qgis.utils.iface` object (instance of `QgisInterface` class).

```
>>> uri = QgsDataSourceURI()
>>> uri.setConnection("localhost","5432","statistics","postgres","")
>>> uri.setDataSource("public","japan_ver52","the_geom","","gid")
>>> vlayer = QgsVectorLayer(uri.uri(),"Census","postgres")
>>> QgsMapLayerRegistry.instance().addMapLayer(vlayer)
```

![QGIS Map view][1]

Now to link `japan_ver52` table with the "2005 Japanese Census" information found in table `census2005`, a SQL string statement is added that will join the 2 tables via a common attribute column in `jcode`. Note that the SQL string must be between parentheses `"( )"`, in order for the [pyQGIS][4] API to recognise it as a SQL string instead of a table name.

And again in the Python Console:

To access [Quantum GIS][3] environment from this console use `qgis.utils.iface` object (instance of `QgisInterface` class).

```
>>> sql = "(select a.gid,a.the_geom,b.population,b.pop_male,b.pop_female,b.household from japan_ver52 a,census2005 b where a.jcode = b.jcode)"
>>> uri = QgsDataSourceURI()
>>> uri.setConnection("localhost","5432","statistics","postgres","")
>>> uri.setDataSource("",sql,"the_geom","","gid")
>>> vlayer = QgsVectorLayer(uri.uri(),"Census","postgres")
>>> QgsMapLayerRegistry.instance().addMapLayer(vlayer)
```

This will result in a [QGIS][3] layer that has the table definition below.

![QGIS Table view][2]

So as seen above, joining tables together using just a SQL statement in [pyQGIS][4] is pretty much straightforward. But what makes this quite exciting is that all the [PostGIS][6] functions can also be used (`ST_BUFFER`, `ST_DISTANCE`, etc.) as well in the SQL statements.
This gives numerous possibilities when creating [pyQGIS][4] applications.

And ofcourse, this method can also be used with [pgRouting][].


[1]: /media/2013/pyqgis_table_1.png
[2]: /media/2013/pyqgis_table_2.png
[3]: http://qgis.org/
[4]: http://pyqgis.org/
[5]: http://new.qgis.org/html/en/docs/pyqgis_developer_cookbook/
[6]: http://postgis.net/
[7]: http://postgresql.org
