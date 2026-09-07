# amenowa renewal demo

採用された「Nature & Science」の確定デザインを維持し、2026年の制作仕様書に合わせたamenowaのリニューアル確認用サイトです。

- デモ: https://hirojessica.github.io/amenowa-renew/
- 公開ブランチ: `main`
- INSIGHTS・CASE STUDY編集画面: [Pages CMS](https://app.pagescms.org/)
- [新しい構成・バックアップ・noteの掲載方法](docs/content-restructure.md)
- [CMS・お問い合わせの設定手順](docs/operations.md)
- [ページ構成・実装メモ](docs/implementation.md)
- [デザイン・動作の確認記録](site/design-qa.md)

トップの清流写真と水循環イラストは、採用案を参照して再生成した画像です。チームには提供・移行済みの写真を使用しています。未提供の製品画面や活動写真は「画像はめ込み予定」、未確定の紹介文や事例詳細は「未定」です。既存WordPressの公開記事4件と記事URLを維持し、noteの手動リンク掲載・本文掲載を追加しています。本番サイトの切り替えは行っていません。

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
| INSIGHTS・お知らせ・note | `site/content/news/*.md` またはPages CMS |
| CASE STUDY | `site/content/cases/*.md` またはPages CMS |
| 共通色・基本レイアウト | `site/src/amenowa.css` |
| スマートフォン表示 | `site/src/responsive.css` |
| 採用画像への最終調整 | `site/src/fidelity.css` |
| トップ | `site/src/Landing.jsx` |
| 共通ヘッダー／フッター | `site/src/App.jsx` |
| 製品・サービス・事例ページ | `site/src/ContentPages.jsx` |
| ABOUT・記事・その他の下層ページ | `site/src/Pages.jsx` |
| 製品・サービスの原稿 | `site/src/catalog.js` |
| 新構成用の追加スタイル | `site/src/content-structure.css` |
| お問い合わせ | `site/src/Contact.jsx` |
| CMS設定 | `.pages.yml` |
| デモ公開設定 | `.github/workflows/pages.yml` |

ヘッダーとフッターには支給された正式なロゴ・文字画像を使用し、ボタンなどの青はロゴの `#0081a6` に統一しています。書体はNoto Serif JP、Noto Sans JP、アイコンはPhosphor Iconsを使用しています。
