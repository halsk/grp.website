---
layout: post
title: "犯罪データや交通事故に関するオープンデータのビジュアライゼーション"
author: "Hal Seki"
date: 2013-10-08 15:50:00
tags: 
  - Open Data 
  - オープンデータ
published: true
comments: true
language: ja
---

Code for America のメーリングリストを見ていた所、犯罪データや交通事故情報のオープンデータのビジュアライゼーションでいくつか面白いサイトが紹介されていました。いくつか紹介させていただきます。

オープンデータに突き進んでいる米国政府では様々なデータの公開を積極的に始めていますが、その中には犯罪や交通事故のデータも含まれています。日本では、県警のデータのオープン化されるのは、はたしていつになるでしょうか。

<!-- more -->

## シアトル

#### データ

シアトル版 data.gov である、data.seattle.gov に警察のインシデントデータが公開されています。

[Seattle Police Department Police Report Incident][1]

#### アプリケーション

上記データから作られたチャートやマップがいくつかあります

* [Crime Bar Chart][2]
  バーチャート
* [Crime Map][3]
  地図
* [Crime Breakdown Chart][4]
  ブレークダウンチャート
* [Crime Treemap][5]
  ツリーマップ

  ![treemap](/images/2013/1008_treemap.png)

## シカゴ


#### データ

シカゴ版データポータル、data.cityofchicago.org に、2001年から現在までのデータが登録されています。

[Crimes - 2001 to present][6]

#### アプリケーション

* [Crime Patterns in Chicago][7]
  犯罪の起きる時間帯や種類、地域特性などをインフォグラフィックで表現したもの
* [Crime in Chicago, Open City][8]
  地域ごとに、犯罪の多い時間帯の比較が可能
* [Crime in Chicago, Chicago Tribune][9]
  地域ごとの犯罪発生率を地図などで表現

  ![Cicago Tribune](/images/2013/1008_crime_chicago.png)
* [CrimeStep][10]
  地図上で From, To を選ぶと、その経路の周辺でどれくらい犯罪が起きているかを表示

  ![CrimeStep](/images/2013/1008_crimestep.png)

## サンフランシスコ

#### アプリケーション

* [San Francisco Crimespotting][11]
  地図上で、どのような犯罪が発生しているかを時系列で見れるツール
  データのありかを調べる時間が無かったが、San Francisco Police から取得している模様。www.datasf.org にあるのかもしれない。

  ![CrimeSpotting](/images/2013/1008_crimespotting.png)

## ニューヨーク

#### アプリケーション

* [Murder:New York City][12]
  New York Times が公開している、殺人事件発生マップ

  ![Murder](/images/2013/1008_murder_nyc.png)
* [CrashStat][13]
  交通事故発生状況を地図上に表示
* [CrashMapper][14]
  交通事故発生状況を地図上にヒートマップで表示。オープンソース。データは[NYPDの公表データ][15]を利用

  ![CrashMapper](/images/2013/1008_crashmapper.png)


## その他

* [Crime Maps][16]
  米国全体の犯罪を地図上で表現。データは[SpotCrime][17]というところから入手している。SpotCrimeは警察発表情報などから独自に集めた情報をアグリゲーションして提供している

  ![CrimeMaps](/images/2013/1008_crimemaps.png)




[1]:https://data.seattle.gov/Public-Safety/Seattle-Police-Department-Police-Report-Incident/7ais-f98f
[2]:https://data.seattle.gov/Public-Safety/Crime-Pie-Chart/gjjg-fbg9
[3]:https://data.seattle.gov/Public-Safety/Crime-Map/x3ji-ckps
[4]:https://data.seattle.gov/Public-Safety/Crime-Breakdown-Graph/ddry-2g4z
[5]:https://data.seattle.gov/Public-Safety/Treemap-distribution-of-the-crime-type-with-count-/a8iv-gqwd
[6]:https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2
[7]:http://fosslien.com/crime/
[8]:http://www.crimeinchicago.org/
[9]:http://crime.chicagotribune.com/
[10]:http://mapmeld.github.io/crimestep/
[11]:http://sanfrancisco.crimespotting.org/
[12]:http://projects.nytimes.com/crime/homicides/map?pagewanted=all
[13]:http://crashstat.org/
[14]:http://nyc.crashmapper.com/
[15]:http://www.nyc.gov/html/nypd/html/traffic_reports/motor_vehicle_collision_data.shtml
[16]:http://www.trulia.com/crime/
[17]:http://www.spotcrime.com/
