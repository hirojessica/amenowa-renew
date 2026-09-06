# amenowa renewal demo

採用された「Nature & Science」案を基にした、amenowaのリニューアル確認用サイトです。

- デモ: https://hirojessica.github.io/amenowa-renew/
- 公開ブランチ: `main`
- NEWS編集画面: [Pages CMS](https://app.pagescms.org/)
- [CMS・お問い合わせの設定手順](docs/operations.md)
- [ページ構成・実装メモ](docs/implementation.md)
- [デザイン・動作の確認記録](site/design-qa.md)

画像部分は「画像はめ込み予定」の枠で統一しています。写真・図版、下層ページの新しい文言、会社情報、採用条件、個人情報の取り扱いは確認用です。NEWSは3件のサンプルを掲載しています。既存WordPressの記事移行や本番サイトの切り替えは行っていません。

お問い合わせは入力・確認・完了を試せるデモです。現在のGitHub Pagesビルドは送信機能を無効にしており、入力内容を外部へ送信・保存しません。

## 開発

Node.js 22以降を使用します。

```sh
cd site
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

プレビュー: `http://127.0.0.1:4173/amenowa-renew/`

```sh
npm test
npm run build
```

ビルド時に記事を読み込み、各ページのHTMLを生成します。成果物は `site/dist/client/`。`main`へのプッシュでGitHub Actionsがテスト・ビルド・Pages公開を行います。

## 編集する場所

| 内容 | ファイル |
| --- | --- |
| NEWS | `site/content/news/*.md` またはPages CMS |
| 共通色・基本レイアウト | `site/src/amenowa.css` |
| スマートフォン表示 | `site/src/responsive.css` |
| 採用画像への最終調整 | `site/src/fidelity.css` |
| トップ・共通ヘッダー／フッター | `site/src/App.jsx` |
| 下層ページ | `site/src/Pages.jsx` |
| 事業紹介文 | `site/src/site.js` |
| お問い合わせ | `site/src/Contact.jsx` |
| CMS設定 | `.pages.yml` |
| デモ公開設定 | `.github/workflows/pages.yml` |

現行のロゴ形状はamenowa公式サイトの公開素材を使用しています。書体はNoto Serif JP、Noto Sans JP、Barlow Condensed、アイコンはPhosphor Iconsを使用しています。
