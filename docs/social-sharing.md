# SNSリンクの共有カード

全ページの初期HTMLにOpen GraphとXカードのメタ情報を出力します。SNS側がJavaScriptを実行しなくてもタイトル・説明文・画像を取得できます。

- 共通画像：`site/public/assets/ogp-amenowa-v3.png`（1200×630px、PNG）
- 画像原稿：`site/design/ogp.html`。支給の正式ロゴをそのまま使い、波の青は `#0081a6`。文字ロゴは2026-09-07支給の青い `amenowa_2.png`
- 固定ページ：`site/src/site.js` の `pageMeta` にあるタイトル・説明文
- NEWS詳細：記事のタイトルと `excerpt`。概要が空欄の場合はNEWS共通説明を使用
- NEWSの画像も現在は共通画像です。記事本文の画像・CMSの記事画像とは別設定です
- メタ情報生成：`site/scripts/social-meta.mjs` と `prerender.mjs`

旧画像 `ogp-amenowa-v1.png` と `ogp-amenowa-v2.png` は、以前の共有URLからも取得できるよう残しています。v3は制作仕様書の「水と自然を知る。守り、育てる。未来につなぐ。」を反映しています。

## 公開先を変更するとき

現在のGitHub Actionsでは `SITE_BASE=/amenowa-renew/`、`SITE_URL=https://hirojessica.github.io/amenowa-renew/` を指定しています。`SITE_URL` は画像・ページURL・canonicalの生成に使用します。

本番移行時は `SITE_BASE=/` と `SITE_URL=https://amenowa.co.jp/` をビルド環境へ設定して再ビルドしてください。`.env.example` は設定値の見本で、自動読込ではありません。デモの `noindex,nofollow` は保持しており、本番移行時に別途切り替えます。

## 画像を更新するとき

ローカルViteを起動し、`/amenowa-renew/design/ogp.html` をブラウザで開いて原稿を確認します。Playwright CLIの専用セッションを `site/` を作業ディレクトリとして開始し、`design/render-ogp.js` を `run-code --filename` で実行すると、フォントと画像の読み込みを待って `public/assets/ogp-amenowa-v3.png` に書き出せます。このHTML原稿自体は公開ビルドに含まれません。

画像を変更した場合、SNSのキャッシュと区別するため画像名のバージョンも更新し、`social-meta.mjs` と `check-social.mjs` の参照をそろえてください。

## 確認

`npm test` と `npm run build` で、文字のエスケープ、公開URL、記事タイトル、OGP画像の実在・寸法を検証します。SNSに実際の投稿は行っていません。サービスごとのカードの見た目や再取得タイミングは各サービスに依存します。

仕様参照：[Open Graph protocol](https://ogp.me/)。
