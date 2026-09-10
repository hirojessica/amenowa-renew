# チーム・アドバイザー紹介

## 2026年9月10日の追加

平戸慎太郎さんを役職 `Legal Counsel` で追加しました。写真は利用者支給の `thumbnail.png`（681×847）を加工せず `site/public/images/team/hirato-shintaro.png` へコピーしています。紹介文は未提供のため「紹介文：未定」です。ABOUTは既存の3列グリッドを維持し、HOMEのメンバー名も同じ人物データから表示します。現在は代表者・アドバイザーを合わせて6名です。

以下は初期構成の記録です。2026年9月7日の構成変更により、代表者と深本南さんもABOUTのTEAMに掲載されています。

2026-09-07にユーザーが承認した構成です。ABOUTの代表メッセージと会社概要の間に `TEAM & ADVISORS / チーム・アドバイザー` を設置し、代表者は既存MESSAGE、アドバイザー3名は追加セクションで紹介します。HOMEのWORKSとNEWSの間から `about/#team` へ案内します。

氏名・役割・所属等は同日に取得した[本番トップ](https://amenowa.co.jp/)の掲載内容を使用しています。氏名から敬称を分け、所属の改行・空白と区切り記号を整理しました。新しい肩書き、経歴、推薦文は追加していません。

| 氏名 | amenowaでの役割・分野 | 本番掲載の所属・専門性 |
| --- | --- | --- |
| 蔵治 光一郎 | 技術アドバイザー | 東京大学大学院 農学生命科学研究科 教授 |
| 髙嶋 洋 | 環境地質学・水文地質学 技術アドバイザー | 第一工科大学 工学部 環境エンジニアリング学科 教授／NPO法人 日本地質汚染審査機構 理事長 |
| 久松 慎一 | ITアドバイザー | データ解析・UX／ITプロフェッショナル |

## 写真

本番で使用されている画像を加工せずコピーし、元の正方形を保って表示します。

| 配信ファイル（site/public/images/team/） | 取得元 |
| --- | --- |
| kuraji-koichiro.jpg | [本番画像](https://amenowa.co.jp/wp-content/uploads/2024/09/DSC_6574-520x520.jpg) |
| takashima-hiroshi.jpg | [本番画像](https://amenowa.co.jp/wp-content/uploads/2024/09/名称未設定-1.jpg) |
| hisamatsu-shinichi.png | [本番画像](https://amenowa.co.jp/wp-content/uploads/2024/09/hisamatu_アートボード-1.png) |

人物情報と表示は `site/src/Team.jsx`、レイアウトは `site/src/team.css` にあります。PCは3列、スマートフォンは写真とプロフィールを組み合わせた縦並びです。本番サイトを自動同期する仕組みではありません。
