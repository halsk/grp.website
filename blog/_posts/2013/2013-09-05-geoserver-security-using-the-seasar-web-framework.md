---
layout: post
title: "Geoserver Security using the Seasar Web Framework"
author: "Mario Basa"
date: 2013-09-05 06:19:00
tags: 
  - Foss 
  - Geoserver 
  - Seasar 
  - Security
published: true
comments: true
lang: en
---

Although [Geoserver][1] has its own valid Security system, exposing it directly to the internet still raises concerns, especially if Geoserver is being used to host corporate data. One source of these concerns is that Geoserver offers numerous Services that have to be closed properly, and a single unintended mistake in closing these Services might lead to an unauthorised access to the Services or sensitive data. This is in the same vein as a Database (Oracle or [PostgreSQL][2]) which has its own security system, but it will be foolhardy to make it accessible to the Internet instead of in the backend of an application where it rightfully belongs. 

![Geoserver Logo][7]

[Georepublic][6] recently completed a project that relied heavily on Geoserver's [WFS-T][5] service with data coming from [PostGIS][3]. Since a WFS-T request entails getting both the attribute data as well as the geographic component of a feature, extra care has to be done for security to ensure that none of the data are exposed. 

![Seasar Logo][8]

Part of the requirements also of the project is to use the [Seasar Web Framework][4] ( Super Agile (SA) Struts2 ) in the creation of the application. And in order to place Geoserver into the backend, a Seasar Proxy service was created that receives the WFS-T xml request and passes it on into the Geoserver for actual processing. Afterwards, the Proxy receives the Geoserver response, which is then passed back to the original requesting agent.

<!-- more -->

With Java, getting the WFS-T request string is done by just creating a BufferedReader for the HTTPServletRequest class:

```
HttpServletRequest request = RequestUtil.getRequest();
BufferedReader reader      = request.getReader();  
```

and then writing the request string to Geoserver via an OutputStreamWriter:

```
URL geoURL = new URL(getGeoServerURL());
geoConn    = (HttpURLConnection) geoURL.openConnection();

geoConn.setRequestProperty("Content-Type", "text/xml");

wr = new OutputStreamWriter(geoConn.getOutputStream(), 
                            REQUEST_ENCODE_NAME);
wr.write(getRequestMessage());
wr.flush();
```
            
while the response of Geoserver is also read by just an InputStream:


```
in = geoConn.getInputStream();
```        

```     
+---------+           +---------+            +-----------+            +---------+
|         |           |         |            |           |            |         | 
| WFS-T   | =======>  | Seasar  |  =======>  | Geoserver |  =======>  | PostGIS |
| Request |           | Proxy   |            | WFS-T     |            |         |
|         |           | Service |            |           |            |         |
|         |           |         |            |           |            |         |
+---------+           +---------+            +-----------+            +---------+
```

But the good thing with using Seasar is that for the authentication of the Proxy service above, all that is needed is to use Seasar's Interceptors. An Interceptor class, as the name implies, intercepts service requests of the Seasar application, and executes a particular logic first before handling it over to the requested service, depending on the logic. Interceptors are commonly used for authentication, with the login information is checked in the Session State first before going to the requested service. And since the Proxy service for Geoserver is just a regular Seasar service, it benefits right away with the authentication Interceptor.

```
+---------+           +---------+            +-----------+            +---------+
|         |           |         |            |           |            |         |
| WFS-T   | =======>  | Seasar  |  =======>  | Geoserver |  =======>  | PostGIS |
| Request |    |      | Proxy   |            | WFS-T     |            |         | 
|         |    |      | Service |            |           |            |         |
|         |    |      |         |            |           |            |         |
+---------+    |      +---------+            +-----------+            +---------+
               |
               |
               |          +-------------+
               |          |             |
               |          | Seasar      | 
               L------->  | Interceptor | ( Session Authentication )
                          | Class       |
                          |             |
                          +-------------+
```

So with this setup, the [Geoserver][1] is placed in the backend of a [Seasar][4] application, with only the WFS-T Proxy service exposed. And this Proxy service can only be truly accessed when a user already has a login information found in the Session State which the Interceptor class will check. 

[1]: http://geoserver.org/
[2]: http://postgresql.org/
[3]: http://postgis.net/
[4]: http://www.seasar.org/
[5]: http://www.opengeospatial.org/standards/wfs
[6]: http://georepublic.info/
[7]: /media/2013/geoserver.png
[8]: /media/2013/seasar_logo_blue.gif
