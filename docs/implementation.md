# 構成・実装メモ

## デザイン

採用されたNature & Scienceの縦長トップ画像（946×1663）を参照しました。白を基調とした余白、日本語の明朝見出し、左側のコピー、右側の曲線を持つ画像領域、コンセプト、横罫線のWORKS一覧を再現しています。トップ画像に含まれないNEWS・お問い合わせ・フッターと下層ページは、同じ書体・余白・罫線・色の規則で展開しました。

画像と図版の領域はユーザー指定のワイヤーフレームです。画像差し替え後も比率とレイアウトを保てる共通コンポーネント `Media` を使っています。

`--brand: #0086c1` は採用画像の左上の青に合わせた暫定値です。ロゴのマーク・ボタン・リンクのアクセントを同じトークンで統一しています。正式な指定HEX値が提示された場合も1か所で変更できます。ロゴの形状には公式公開素材を使い、文字部分は採用画像からそのまま切り出した素材です。元画像の解像度に限りがあるため、本番では正式なロゴデータへの差し替えを推奨します。

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

ロゴ形状の公開元: [amenowa公式ロゴ](https://amenowa.co.jp/wp-content/uploads/2024/09/amenowa_2_1-e1726549949396.png)

フォント: Noto Serif JP、Noto Sans JP、Barlow Condensed（SIL Open Font License）。Phosphor Icons（MIT）。依存パッケージは `site/package-lock.json` に固定しています。

## 公開対象とローカル記録

Gitには `site/` のソース、CMS設定、GitHub Actions、運用ドキュメントを保存します。`output/` の参考画像・検証用スクリーンショット、`tmp/` の作業用スクリプト、認証情報、`.env.local`、ビルド成果物はGit対象外です。

GitHub Pagesに配信されるのはHTML・CSS・JavaScript・フォント・公開画像です。本番のWordPressファイルは変更していません。
