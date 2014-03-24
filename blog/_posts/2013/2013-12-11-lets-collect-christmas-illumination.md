---
layout: post
title: "僕らの街のクリスマスイルミネーションを集めよう"
date: 2013-12-11 22:40:00
author: Hal Seki
tags:  
  - campaign 
  - shirasete
published: true
comments: true
lang: ja
---


この記事は、[FOSS4G Advent Calendar][1]の10日目の記事です。（1日遅れてしまいましたが・・・）

# イルミネーションを集めよう

本日より、弊社 [知らせて.jp][2]のプロジェクトの一つとして、クリスマスイルミネーションを集めて地図上に表示していくプロジェクトを始めました。

[クリスマスを探そう][3]

画面のように、クリスマスのイルミネーションを地図上に投稿することができます。
![画面](images/2013/christmasmap.png)

知らせて.jp は、自治体と市民とのコラボレーションを目的に開発していますが、今回のように特定の目的に特化したプロジェクトを作ることも可能です。
クリスマスイルミネーションを見つけたら、是非この地図に投稿いただければと思います。
サイトにアクセスすると、iPhone アプリやパソコンからの投稿方法を見ることができます。
iPhone アプリをインストールしたら、プロジェクトから「クリスマスイルミネーションマップ2013」を選択してください。あとはイルミネーションを見かけたら写真を取ってレポートとして投稿します。
皆でイルミネーションを撮影し、地図を飾っていただければと思います。

## APIを利用
上記サイトは、知らせて.jp の API アクセス機能を使い数時間で開発しました。ソースコードは[Githubリポジトリ][3]に公開していますが、非常にシンプルな作りになっています。
表示の仕方に興味がある方は、[このへん][4]を見ていただけると良いかと思います。

知らせて.jp そのものについては、以下のスライドをご確認ください。
<iframe src="http://www.slideshare.net/slideshow/embed_code/27808252?rel=0" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/hal_sk/jp-27808252" title="知らせて.jp 僕らの街を改善するプラットフォーム" target="_blank">知らせて.jp 僕らの街を改善するプラットフォーム</a> </strong> from <strong><a href="http://www.slideshare.net/hal_sk" target="_blank">Hal Seki</a></strong> </div>

## Redmine を活用
ちなみに、なぜこれがFOSS4Gなのかと言いますと、元々このアプリケーションはRedmineというオープンソースのタスク管理ツールをベースに開発しております。Redmineに位置情報の概念を追加するアドオンを開発したというわけです。 そちらのソースコードも近々公開する予定です。

## お問い合わせ
知らせて.jpには他にも幾つかプロジェクトがありますので、そちらのプロジェクトに参加いただき登録することはどなたでも可能です。独自ドメインでの運用やカスタマイズなどもご相談に乗りますので、導入を検討したい自治体や企業の方は、お気軽に[お問い合わせ][5]ください。アプリケーションの不具合なども教えていただけるととても助かります。


[1]: http://atnd.org/events/45511
[2]: https://github.com/Georepublic/christmasmap2013
[3]: http://christmas2013.shirasete.jp/
[4]: https://github.com/Georepublic/christmasmap2013/blob/master/public/script/main.js
[5]: http://georepublic.co.jp/ja/about-us/contact/
