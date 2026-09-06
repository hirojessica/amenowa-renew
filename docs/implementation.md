# 構成・実装メモ

## デザイン

採用されたNature & Scienceの縦長トップ画像（946×1663）を参照しました。白を基調とした余白、日本語の明朝見出し、左側のコピー、右側の曲線を持つ画像領域、コンセプト、横罫線のWORKS一覧を再現しています。トップ画像に含まれないNEWS・お問い合わせ・フッターと下層ページは、同じ書体・余白・罫線・色の規則で展開しました。

ヘッダーは追加フィードバックに合わせ、高さをPC 84px・タブレット76px・スマートフォン68pxに調整しています。PCのお問い合わせボタンは180×48pxとし、周囲の余白を確保しました。モバイルメニューの表示位置はヘッダー高さと連動しています。

トップの清流写真と水循環イラストは、2026-09-06の追加指定により採用案を参照した生成画像へ差し替えました（[画像一覧](image-assets.md)）。その他はワイヤーフレームです。画像差し替え後も比率とレイアウトを保てる共通コンポーネント `Media` を使っています。

`--brand: #0081a6` は2026-09-06に支給された正式なロゴ画像の不透明画素（RGB 0, 129, 166）に一致します。ボタン・リンクのアクセントを同じトークンで統一しています。ヘッダーとフッターには、支給されたマーク `amenowa_2_1.png`（602×309）と文字 `amenowa_1.png`（1307×278）を加工せず使用し、透明背景と元の縦横比を維持しています。

## ページ構成

| ページ | パス |
| --- | --- |
| HOME | `/` |
| ABOUT | `/about/` |
| WORKS一覧 | `/works/` |
| 水評価アセスメント（CDP） | `/works/cdp/` |
| 水利用の見える化 | `/works/visualization/` |
| 森林保全と水の涵養 | `/works/regeneration/` |
| サステナブルブランドの構築 | `/works/brand/` |
| NEWS一覧 | `/news/` |
| サンプル記事3件 | `/news/demo-notice/`、`/news/demo-water-story/`、`/news/demo-press/` |
| RECRUIT | `/recruit/` |
| CONTACT | `/contact/` |
| 問い合わせ完了 | `/contact/complete/` |
| 個人情報の取り扱い | `/privacy/` |

15ページと404ページを生成します。デモは各パスの前に `/amenowa-renew` が付きます。CONTACTの入力・確認・デモ完了は同じページ内の状態として実装しています。

## 技術構成

- React + Vite。ビルド時に全ページをHTMLへ描画し、ブラウザーで対話部分を有効化
- GitHub Pagesには `site/dist/client` のみを公開。SSRサーバーの運用は不要
- 記事はMarkdown + YAML frontmatter。Pages CMSがその原稿と画像を編集
- MarkdownのHTMLは許可したタグ・属性・URLスキームに制限してから描画
- 掲載オフ・未来日付は出力対象外。不正なslug・日付・カテゴリーはビルドを停止
- 記事画像の `/uploads/` をPagesのベースパスに合わせて変換
- ローカル書体ファイルを使用。表示のための外部フォント通信は不要
- モバイルナビゲーション、キーボード操作、NEWS検索／分類、問い合わせ確認画面を実装

## 素材

正式ロゴ: ユーザー支給の `amenowa_2_1.png` と `amenowa_1.png`。配信ファイルは `site/public/assets/amenowa-symbol-official.png` と `amenowa-wordmark-official.png` です。

フォント: Noto Serif JP、Noto Sans JP、Barlow Condensed（SIL Open Font License）。Phosphor Icons（MIT）。依存パッケージは `site/package-lock.json` に固定しています。

## 公開対象とローカル記録

Gitには `site/` のソース、CMS設定、GitHub Actions、運用ドキュメントを保存します。`output/` の参考画像・検証用スクリーンショット、`tmp/` の作業用スクリプト、認証情報、`.env.local`、ビルド成果物はGit対象外です。

GitHub Pagesに配信されるのはHTML・CSS・JavaScript・フォント・公開画像です。本番のWordPressファイルは変更していません。
