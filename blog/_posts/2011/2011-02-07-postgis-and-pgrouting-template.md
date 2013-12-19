---
layout: post
title: "PostGIS and pgRouting template"
author: "Daniel Kastl"
date: 2011-02-07 12:00:00
tags:  
  - Tech 
  - Postgis 
  - Foss
published: true
comments: true
language: en
---

When creating a new database in PostgreSQL using the standard template, PostGIS and pgRouting functions and tables are missing of course. You can add these functions and tables one by one, but doing this every time for every single database is annoying work.

The solution: make some template(s) containing funtions an tables from PostGIS and pgRouting and create a new database with them.

<!-- more -->

## Template for PostGIS

First we create a template for PostGIS. Thanks to [Shoaib from Nomad Labs][1]!

``` bash
createdb -U postgres -E UTF8 -T template0 template_postgis
createlang -U postgres -d template_postgis plpgsql
psql --quiet -U postgres -d template_postgis -f [path/to/postgresql]/contrib/postgis.sql
psql --quiet -U postgres -d template_postgis -f [path/to/postgresql]/contrib/spatial_ref_sys.sql
psql --quiet -U postgres -d template_postgis -f [path/to/postgresql]/contrib/postgis_comments.sql
psql -U postgres -d template_postgis -c "GRANT ALL ON geometry_columns TO PUBLIC;"
psql -U postgres -d template_postgis -c "GRANT ALL ON geography_columns TO PUBLIC;"
psql -U postgres -d template_postgis -c "GRANT ALL ON spatial_ref_sys TO PUBLIC;"
psql -U postgres -d template_postgis -c "VACUUM FULL;"
psql -U postgres -d template_postgis -c "VACUUM FREEZE;"
psql -U postgres -d postgres -c "UPDATE pg_database SET datistemplate='true' WHERE datname='template_postgis';"
psql -U postgres -d postgres -c "UPDATE pg_database SET datallowconn='false' WHERE datname='template_postgis';"
```

## Template for pgRouting

Taking the PostGIS template we made before, we create a template containing pgRouting functions in the same way:

``` bash
createdb -U postgres -E UTF8 -T template_postgis template_routing
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_core.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_core_wrappers.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_topology.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_tsp.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_tsp_wrappers.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_dd.sql
psql -U postgres --quiet -d template_routing -f /usr/share/pgrouting/routing_dd_wrappers.sql
psql -U postgres -d template_routing -c "VACUUM FULL;"
psql -U postgres -d template_routing -c "VACUUM FREEZE;"
psql -U postgres -d postgres -c "UPDATE pg_database SET datistemplate='true' WHERE datname='template_routing';"
psql -U postgres -d postgres -c "UPDATE pg_database SET datallowconn='false' WHERE datname='template_routing';"
```

## Create pgRouting database

Now we can create a pgRouting database like this and all required functions are already there:

``` bash
createdb -U postgres -E UTF8 -T template_routing my_routing_db
```

[1]: http://geospatial.nomad-labs.com/2006/12/24/postgis-template-database/
