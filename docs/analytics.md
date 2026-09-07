# GA4の引き継ぎと本番切り替え

2026年9月8日、[現在の本番サイト](https://amenowa.co.jp/)の公開HTMLから、測定ID **`G-LRG73BYTV4`** を確認した。WordPressのMonsterInsightsがGoogleタグを読み込んでおり、GTMコンテナは公開HTMLからは確認されなかった。

新サイトも同じ測定IDに送信する。GA4の新規プロパティ・ストリームは作成しない。管理画面の設定や現在のWordPressサイトは変更していない。

## 計測が始まる条件

全ページと404のheadに `assets/analytics.js` を1回読み込む。次の条件をすべて満たす場合だけ、Googleタグを読み込んで計測を始める。

- HTTPS、通常の443ポート
- ホスト名が `amenowa.co.jp` または `www.amenowa.co.jp` と完全一致
- ルート公開用のビルド（`SITE_BASE=/`）
- GAの計測停止フラグ・既存のオプトアウトCookieが有効になっていない

GitHub Pages、localhost、stagingサブドメイン、`/amenowa-renew/` 用のデモビルドはGoogleタグを読み込まない。WordPress側の `ga-disable-G-LRG73BYTV4=true` Cookieによる計測停止も引き継ぐ。

通常のリンクでページごとにHTMLを読み込む構成のため、`gtag('config', 'G-LRG73BYTV4')` の自動ページビューを利用する。Reactの再描画や、年表の絞り込み・画像拡大から追加のページビューは送らない。Google公式の[ページビュー測定](https://developers.google.com/analytics/devguides/collection/ga4/views?hl=ja)と[タグ設定](https://developers.google.com/tag-platform/gtagjs/configure)に基づく。

フォーム入力値や独自のユーザーIDを送る処理は追加していない。MonsterInsights固有の独自イベント、ダウンロード計測などの完全移植は今回の対象外。GA4の拡張計測・キーイベント・フィルターの実際の管理設定は、公開HTMLだけでは確認できない。

## 切り替え時

1. 公開環境のビルドに `SITE_BASE=/`、`SITE_URL=https://amenowa.co.jp/` を指定する。GA4用の追加スイッチや秘密鍵は不要。
2. `site/dist/client/` のHTMLとassetsを一緒に本番へ配置する。デモ用成果物をそのままルートにコピーせず、ルート公開用にビルドする。GA4は独自ドメインでの表示時に自動で有効になる。
3. WordPressタグやGTMから同じIDを別途追加せず、今回のローダーに一本化する。
4. 本番ドメインでタグが1回読み込まれ、ページ遷移ごとの `page_view` の `tid` が `G-LRG73BYTV4` になっていることを確認する。
5. 既存GA4プロパティのリアルタイムレポートで到達を確認する。管理画面上の受信確認は本番切り替え後に実施する。

PowerShellでのビルド例（`site` ディレクトリで実行）：

```powershell
$env:SITE_BASE='/'
$env:SITE_URL='https://amenowa.co.jp/'
npm.cmd run build
```

この例はGA4と公開パスの準備であり、サイト全体の公開を完了させるものではない。現段階の `noindex,nofollow`、問い合わせのデモ設定、公開先の切り替えは維持している。公開時にそれぞれの最終設定を行う（[運用手順](operations.md)参照）。

## 変更箇所

- `site/public/assets/analytics.js`：測定ID、対象ホスト、計測停止の条件、初期化
- `site/index.html`：全ページ共通の読み込み
- `site/tests/analytics.test.mjs`：本番での有効化、デモでの停止、オプトアウト、二重初期化の防止
- `site/scripts/check-build.mjs`：全HTML・404にローダーが1回含まれることを検証

## 検証記録

- 自動テスト17件を通過。GA4の本番ホスト・HTTPS・ルートビルド条件、非本番での停止、既存オプトアウト、二重初期化を検証。
- ルート公開用に26ページ＋404をビルドし、全ページのローダー、リンク・画像・OGPを確認。
- 実ブラウザーに本番ドメインと生成HTMLを再現し、取得したGoogleタグをローカルから読み込ませた。HOME・ABOUT・MEGURUで各1件の `page_view`、測定ID、ページURL、タイトルを確認。収集先への通信はすべて遮断し、実プロパティへテストデータは送信していない。
- 同じブラウザーでGitHub Pages・localhost・stagingホストを再現し、Googleタグ・計測キュー・収集通信が発生しないことを確認。

実際のGA4管理画面への到達は未確認。切り替え後に既存プロパティのリアルタイムで確認する。作業ログは非公開の `output/ga4-migration-20260908/` と `output/playwright/ga4-cutover-20260908/`。
