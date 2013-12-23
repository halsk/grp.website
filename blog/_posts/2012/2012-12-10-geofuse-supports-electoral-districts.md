---
layout: post
title: "GeoFuse が小選挙区レイヤーをサポートしました。"
author: "Hal Seki"
date: 2012-12-10 00:44:00
tags: 
  - Geofuse
published: true
comments: true
lang: ja
---

東京大学空間情報科学研究センターの西澤先生が選挙区のポリゴンデータを公開しており、許可をいただいたので Geofuse のレイヤーに追加を行いました。
西澤先生、どうもありがとうございます。

また、合わせて国勢調査の内容を小選挙区別に集計したファイルも公開されていたので、そのデータをGeoFuse を使ってビジュアライズする手順を公開させていただきます。

さて、まず西澤先生が集計したCSVデータを元に作った表をGoogle Spreadsheet上に公開しておりますので、リンクを開いてください。
OpenOffice の形式のファイルも用意しております。(選挙区集計.ods)

* [選挙区集計 SpreadSheet](http://bit.ly/TOoeeF "選挙区集計.ods")
* [選挙区集計.ods](https://dl.dropbox.com/u/442212/%E9%81%B8%E6%8C%99%E5%8C%BA%E5%88%A5%E9%9B%86%E8%A8%88.ods "選挙区集計.ods")

<!-- more -->

取得すると下記のようなスプレッドシートが開きます。

![data](https://dl.dropbox.com/u/442212/georepublicblog/senkyoku_data.png)

次に、GeoFuse のサイトにアクセスしてください。

[GeoFuse](http://geofuse.georepublic.net/ "GeoFuse")

そのままデータを表示したい場合、黄色い行以降の部分をコピーして、GeoFuse のデータ領域に貼り付けてください。
以下のようになります。

![ペースト後](https://dl.dropbox.com/u/442212/georepublicblog/geofuse_pasted.png)

あとは下にある Submit ボタンを押すと、 Map URL の部分にURLが生成されます。

![URL生成](https://dl.dropbox.com/u/442212/georepublicblog/map_url.png)

URLが生成されたら、Display Map ボタンを押すと、別ウィンドウで地図が開きます。

![生成されたマップ](https://dl.dropbox.com/u/442212/georepublicblog/created_map.png)

Criteria や Range、Type, Color などを調整して、好みのマップに仕上げましょう。
地図の右上の＋ボタンを押すと、別の地図にも切り替えられます。

公開できる状態になったら、Share ボタンを押すと公開用のURLが表示されます。

![Share URL](https://dl.dropbox.com/u/442212/georepublicblog/share_url.png)


これを iframe などで表示することもできます。例えば以下のように書きましょう。

```html
<iframe src="生成されたURL" width="表示したい幅" height="表示したい高さ"></iframe><br/>
<a href="生成されたURL" target="_blank">別ウィンドウで開く</a>
```

以下のように表示できます。

<iframe src="http://bit.ly/UNYTkS" width="100%" height="600"></iframe><br/>
<a href="http://bit.ly/UNYTkS" target="_blank">別ウィンドウで開く</a>

スプレッドシートのデータの集計項目は、自由に追加したり削除したりできます。
計算式なども使うことが可能です。編集をしたら、GeoFuse のデータ部分の Clear ボタンを押してから再度URLを生成してください。

みなさんも、よければ選挙に参考になるデータを使ってマップを作ってみてください。
そして、出来上がったらぜひ [@georepublic](http://twitter.com/georepublic) まで教えていただければ幸いです。

Georepublic では、GeoFuse の商用版である Geothematics というサービスの開始を予定しています。
ご興味ある方は、[Geothematics](http://geothematics.georepublic.info/) からメールアドレスをご登録ください。
サービス開始時には御連絡させていただきます。
