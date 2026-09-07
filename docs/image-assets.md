# サイトの画像

## ABOUTの深本南さんの写真

2026-09-07、ユーザー提供の `cd1d1af8-53f5-48de-96d7-ba36a5df9005.jpg`（1108×1477px）を、加工せず `site/public/images/team/fukamoto-minami.jpg` にコピーしました。縦横比を保ってチーム欄に表示しています。役割は同日のユーザー指定により「サステナブル・ブランディング プロデューサー」、紹介文は「未定」です。

## 正式ロゴの文字画像

2026-09-07、ユーザー提供の青い文字画像 `amenowa_2.png`（1307×277px・透過PNG）を、加工せず `site/public/assets/amenowa-wordmark-blue.png` にコピーしました。ヘッダー・フッター・OGP画像で使用します。シンボルと表示レイアウトは既存の設定を維持しています。

## ABOUTの代表者写真

2026-09-06、ユーザー提供の `asahi.jpg` を `site/public/images/representative-asahi.jpg` にコピーし、ABOUTのMESSAGE欄に掲載しました。800×800pxのJPEGを加工せず、元の正方形の構図で表示します。PCでは本文の右側、スマートフォンでは本文の下に配置しています。

## トップページの画像

2026-09-06、採用デザイン「Nature & Science」を参照し、指定された2セクションの画像を再生成しました。

| 使用箇所 | 公開ファイル | サイズ | 内容 |
| --- | --- | --- | --- |
| 水を測る。水を知る。 | `site/public/images/hero-river-v1.webp` | 1086×1448 | 山・緑の森林・岩のある透明な清流。元案の写真の構図と日差しを参照 |
| 見えない水を、見える未来へ。 | `site/public/images/water-cycle-v1.webp` | 1448×1086 | 雲・降雨・森林・山・川・地下水を、細い線と淡い青・緑で描いた水循環イラスト |

写真風画像は特定の実在する撮影場所の記録ではなく、イラストも実測値を示す図ではありません。採用案の見た目を再現した生成画像です。

配信はWebP、生成元のPNGはローカルの `output/generated-assets/2026-09-06/` に保存しています。画像内に文字・ロゴ・UIは含めていません。ヒーローの曲線はサイト側の既存マスクで適用し、スマートフォンでは清流を中心に横長表示します。水循環図は全体が見えるように配置しています。

残りの画像枠は、今回の画像指定に含まれないため維持しています。

## 本番サイトのFavicon

2026-09-06、本番サイト `https://amenowa.co.jp/` のHTMLに指定されているPNGを取得し、加工せずデモの全ページに設定しました。画像はデモ側に保存し、`site/index.html` でベースパスに対応したURLを指定しています。

| 用途 | 公開ファイル | 取得元 |
| --- | --- | --- |
| Favicon 32×32 | `site/public/assets/favicon-32x32.png` | [本番の32px画像](https://amenowa.co.jp/wp-content/uploads/2023/12/cropped-blue_full-2-32x32.png) |
| Favicon 192×192 | `site/public/assets/favicon-192x192.png` | [本番の192px画像](https://amenowa.co.jp/wp-content/uploads/2023/12/cropped-blue_full-2-192x192.png) |
| Apple touch icon 180×180 | `site/public/assets/apple-touch-icon.png` | [本番の180px画像](https://amenowa.co.jp/wp-content/uploads/2023/12/cropped-blue_full-2-180x180.png) |
| Windows tile 270×270 | `site/public/assets/mstile-270x270.png` | [本番の270px画像](https://amenowa.co.jp/wp-content/uploads/2023/12/cropped-blue_full-2-270x270.png) |
