---
layout: post
title: "第6回ジオメディアサミットでOpenVRPの紹介をしてきました"
author: "Hal Seki"
date: 2010-09-25 12:00:00
comments: true
tags: 
  - Event 
  - Foss 
  - Geomedia 
published: true
comments: true
language: ja
---

9月20日に行われた、第6回ジオメディアサミット in G空間EXPOのライトニングトーク枠にて、OpenVRP に関するプレゼンテーションをさせていただきました。

<object width="480" height="386" data="http://www.ustream.tv/flash/video/9700559?v3=1" type="application/x-shockwave-flash">
<param name="name" value="utv_n_576425"/>
<param name="flashvars" value="loc=%2F&amp;autoplay=false&amp;vid=9700559&amp;locale=ja_JP"/>
<param name="allowfullscreen" value="true"/>
<param name="allowscriptaccess" value="always"/>
<param name="src" value="http://www.ustream.tv/flash/video/9700559?v3=1"/>
</object>

5分間という短い間でしたが、OpenVRP の目的と、概要をお伝えできたと思います。
プレゼンテーションの補足として、いくつかの点を述べさせていたただきます。

<!-- more -->

## DARP Solver

DARP (Dial-a-ride problem) とは、「出発地から目的地まで移動するための乗車リクエスト及び降車リクエストを持つ複数のユーザからの要望に対して、それを満たす配送ルートを計算する」という問題です。
OpenVRPプロジェクトでは、PostgreSQL/PostGIS 用の最短経路探索ライブラリである pgRouting に DARPを解くアルゴリズム( DARP Solver )を実装しています。
 
!['DARP Solver イメージ図'][1]
 
## SQL インターフェースが利用可能

DARP Solver は PostGISの拡張ライブラリになっていますので、例えば下記のようなSQL文で経路を計算することが可能です。

``` sql 
SELECT b.*, a.id, a.order_id, vehicle_id, pick_up,
			to_char(at,'YYYY-MM-DD HH24:MI:SS'::text) AS at
	FROM darp(
		'SELECT * FROM darp_orders WHERE depot_id IN (0,5)',
		'SELECT * FROM darp_vehicles WHERE depot_id = 5',
		'SELECT * FROM distances' 
	) a
	LEFT JOIN (
		SELECT * FROM darp_report WHERE depot_id IN (0,5)
	) AS b 
	ON (a.order_id = b.id);
```

## OpenVRP Engine

上の DARP Solver の機能をRESTfulなWebAPI経由でアクセスするようにラッピングしたものが OpenVRP Engine です。車両情報、オーダー情報、拠点情報を入力し、トリップ情報（ルートとスケジュールが示されたもの）を出力することができます。出力は、JSON形式やKML形式など、複数の形式で取り出すことができます。

!['OpenVRP Engine 概要'][2]
 
## OpenVRPユースケース

OpenVRPを使うユースケースとして、オンデマンドバスや配送サービス、送迎サービス、シェアドタクシー、カーシェアリングなどが考えられます。興味のある方がおりましたら、是非コンタクトページよりご連絡ください。
 
!['OpenVRP ユースケース'][3]
 
当日利用したスライドはこちらにあります。

<iframe src="https://docs.google.com/present/embed?id=d5cjtn5_111dgz6vwhb" width="410" height="342" frameborder="0"> </iframe>

OpenVRP は現在開発中で、 ソースコードは、近日リリース予定です。詳細について知りたい方は、 OpenVRP Project website をご確認いただくか、 contact us にてお問い合わせください。OpenVRPのTwitterアカウントをフォローしていただくと、最新情報を知ることができます。 <http://twitter.com/openvrp>


[1]: /media/2010/darpsolver.png 
[2]: /media/2010/openvrpoverview.png 
[3]: /media/2010/usecases.png 
[4]: http://www.openvrp.com
[5]: http://georepublic.de/ja/about-us/contact
