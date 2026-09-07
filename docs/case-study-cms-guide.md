# CASE STUDYとSERVICESの更新方法

CASE STUDYはPages CMSのコレクションです。現在はルスツリゾート1件を公開しています。同じ項目で事例を追加すると、一覧と専用の詳細ページが、現在のルスツと同じテンプレートで生成されます。

## 事例を追加する

1. [Pages CMS](https://app.pagescms.org/)でGitHubにログインし、`hirojessica/amenowa-renew` の `main` を選びます。初回はGitHub Appのリポジトリアクセス設定が必要です。
2. 「CASE STUDY（取り組み・事例）」から新しい事例を作成します。
3. 事例名、事例URL、メイン見出し、紹介文、英字ラベル、活動写真と説明を入力します。URLは半角英数字とハイフンで、公開後は変更しないでください。
4. 「表示順」に整数を入力します。ルスツは **10**。その下に追加するときは **20、30…** と指定します。小さい数字から表示し、同じ数字の場合はURL順です。未指定は100です。
5. 年表形式は「写真を追加できる年表」に年・時期・取り組みを登録します。詳しい入力方法は [ルスツ年表の更新方法](rusutsu-timeline.md) を参照。従来形式の場合は「従来の取り組みの流れ・SERVICESへの関連付け」に見出し・内容・詳細を入力します。どちらの形式も項目を追加できます。
6. 必要に応じて「補足本文」に背景や成果、追加写真を入力します。
7. 「サイトに掲載する」をオンにして保存します。`main`への保存後、GitHub Actionsがサイトを再構築してPagesへ公開します。公開処理には少し時間がかかります。

一覧の行と `/case-study/入力したURL/` の詳細ページ、ページのタイトル・OGPは自動で作られます。ページごとのHTML作成は不要です。トップで紹介する事例は引き続きルスツを優先し、ルスツが非掲載なら一覧の先頭を表示します。

## SERVICESの詳細にも掲載する

「従来の取り組みの流れ・SERVICESへの関連付け」の各項目に以下を追加しています。新しい年表の4分類とは独立した設定です。

- **関連するサービス**：STRATEGY / FIELD / COMMUNICATIONから選びます。複数選択できます。
- **サービス詳細ページ用の紹介文**：背景・課題、具体的な進め方、確定した成果などを入力します。改行を保持する長文入力です。未確定の内容は「未定」にします。

選択したサービスの詳細ページに、事例名・写真・該当する取り組み・紹介文が表示されます。未選択ならCASE STUDYだけに掲載されます。事例を非掲載にすると、SERVICESの関連事例からも外れます。

- [STRATEGY](https://hirojessica.github.io/amenowa-renew/services/strategy/)
- [FIELD](https://hirojessica.github.io/amenowa-renew/services/field/)
- [COMMUNICATION](https://hirojessica.github.io/amenowa-renew/services/communication/)

これらのページは、既存の写真・書体・余白・細い罫線を継承した共通テンプレートです。ページ内の「相談する」からお問い合わせへ進めます。

## 保存先と確認範囲

- 設定：`.pages.yml`
- 事例原稿：`site/content/cases/*.md`
- サービス共通紹介：`site/src/catalog.js`
- 事例テンプレート：`site/src/ContentPages.jsx`
- サービス詳細テンプレート：`site/src/ServiceDetail.jsx`

ルスツの事例ページは、2026年9月7日に提供された本文と2024〜2026年の22項目の年表へ更新しました。年表には後から画像を追加できます。SERVICESに関連付けた従来の8項目は保持しており、そのサービス詳細用の未確定の紹介文は引き続き未定です。実施済みという新たな判断や成果の追加はせず、写真未提供のルスツにAI写真は使っていません。

非掲載の原稿も公開GitHubリポジトリ内では閲覧できるため、非公開情報を原稿に保存しないでください。ビルド失敗時は直前の公開サイトが残ります。GitHub Actionsの該当実行で入力エラーを確認します。

CMS設定、原稿の追加・並べ替え・非掲載・ページ生成をコードとビルドで検証しています。利用者のGitHubアカウントでのCMS保存操作は未確認です。

公式設定資料：[コレクション](https://pagescms.org/docs/configuration/content/)、[表示順](https://pagescms.org/docs/configuration/content/view/)、[複数選択](https://pagescms.org/docs/configuration/fields/select/)。
