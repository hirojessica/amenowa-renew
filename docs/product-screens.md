# 製品のサンプル画面

2026-09-07、ユーザー提供の3資料を確認し、既存のトップ・製品一覧・製品詳細の画像枠へ反映しました。ページ構成・書体・コーポレートカラーは維持しています。画面内の製品UIの配色は提供資料のものです。

## 使用した資料と画像

- `meguru_app_ui_20260905.html`：16画面の構成と各画面の内容を照合。
- `MEGURU_proposal_20260905.pdf`：埋め込み画像を抽出。HTMLを別環境で描画した際のフォント置換を避け、資料の文字と配色を維持。
- `AquaInsights-UI-screens (3).pdf`：該当ページを匿名化してから2400×1350pxで画像化。

公開画像は `site/public/images/products/` のWebPです。以下の名前には `-20260905.webp` が付きます。WebP化は可逆圧縮を使用しています。

| 製品・画面 | ファイル名の先頭 | PDFページ |
| --- | --- | --- |
| AquaInsights 観測断面 | aquainsights-section | 2 |
| AquaInsights 水位・雨量 | aquainsights-rainfall | 4 |
| AquaInsights 涵養区域 | aquainsights-recharge | 5 |
| AquaInsights 水収支 | aquainsights-water-balance | 8 |
| AquaInsights TNFD | aquainsights-tnfd | 10 |
| MEGURU HOME | meguru-home | 13 |
| MEGURU MAP | meguru-map | 14 |
| MEGURU Mission | meguru-mission | 15 |
| MEGURU My Impact | meguru-impact | 16 |
| MEGURU Collective | meguru-collective | 16 |
| MEGURU Corporate Dashboard | meguru-corporate | 18 |

## 公開に向けた匿名化

ユーザー確認により「実測値・ユーザー名などは伏せて掲載」としています。

- AquaInsightsの数値・日時・ユーザー名・拠点名・地域名・観測機器IDをPDFのテキストから削除し、淡い色のマスクを配置しました。実データの値や比率を示す水収支の棒グラフ・比較バーも非表示です。水位・雨量欄には、資料内でダミーデータと明示された雨量画面を選んでいます。
- MEGURUの企業ダッシュボードにも同じ水収支の値が含まれていたため、該当する数値・比較バー・達成表示とエリア名を画像化前に伏せました。その他のサンプルUIの文言・数値は資料を維持しています。
- 公開するのは加工済みの画面画像だけです。元PDF・HTML・抽出テキスト・匿名化前の画像・作業用PDFはリポジトリにも公開サイトにも含めません。
- CSSによる覆い隠しではなく、公開画像の画素自体にマスクを反映しています。拡大表示しても元データは表示されません。元の値を架空の数値に置き換えることもしていません。

私用の検証資料は `output/product-sources-2026-09-07/` にあります。再生成時は匿名化処理を最後まで適用し、匿名化前の抽出画像で公開用ファイルを上書きしないでください。

## 配置と確認

製品詳細は元の5枠（AquaInsights）・6枠（MEGURU）を維持し、画像と「拡大する」リンクから新しいタブで画面を確認できます。MEGURUの紹介部分はHOME・MAP・Missionの3画面を並べ、トップページは両製品の画面を並べています。

トップ・製品一覧・両製品詳細を1440／800／390／320pxで確認。画像の読み込み、縦横比、横方向のはみ出し、5・6画面の件数、拡大画像の表示を検証しました。匿名化後のAquaInsights PDFで対象の識別語と数値文字列が残っていないことを確認し、各画像を目視でも確認しています。
