# Pages CMSの実更新確認

2026年9月8日、利用者のGitHubアカウントでPages CMSへ接続し、管理画面での作成・編集・削除とGitHub Pagesデモへの反映を確認しました。

## 接続先

- [管理画面](https://app.pagescms.org/hirojessica/amenowa-renew/main/collection/news)
- GitHubアカウント：hirojessica
- リポジトリ：hirojessica/amenowa-renew のみ（Only select repositories）
- ブランチ：main
- 保存先：お知らせは `site/content/news`、事例は `site/content/cases`、メディアは `site/public/uploads`

利用者がGitHub画面で本人再認証を完了しました。パスワード・トークンはコードや記録に保存していません。今回の権限はデモ用として承認され、本番公開前に接続先と権限を見直す方針です。

## 実際に確認した操作

| 操作 | 確認結果 |
| --- | --- |
| 初回ログイン・リポジトリ接続 | mainのお知らせ4件とルスツ1件を表示 |
| お知らせを作成 | 確認用記事を管理画面から保存し、一覧・本文に表示 |
| 既存記事を編集 | 確認用記事の任意時刻を空欄にして保存・公開 |
| CASE STUDYを作成 | 一時事例と年表を管理画面から作成し、一覧・詳細に表示 |
| 年表の画像を任意登録 | 2項目のうち1項目だけ既存公開画像を選択。空欄の項目は文字のみで表示 |
| 年表画像を拡大 | ポップアップの開閉と画像読込成功を確認 |
| CASE STUDYの表示順を変更 | 表示順20ではルスツ（10）の下、5では上へ移動することをCMSとデモで確認 |
| 確認用データを削除 | お知らせ・事例をそれぞれCMSから削除。原稿は元のお知らせ4件・ルスツ1件に復帰 |

確認用記事・事例のURL名は `cms-verification-20260908` です。正式な原稿は編集せず、年表画像には既存の公開記事画像を参照しました。新規ファイルアップロードは今回の確認範囲に含めていません。

テスト前の原稿・CMS設定のZIPとハッシュはローカルの `output/pages-cms-check-20260908/` に保存しました。元の記事4件とルスツ原稿のSHA-256がすべて一致しています。確認用データはサイト・現在の原稿から削除しましたが、公開Gitの変更履歴には残ります。

## 実更新で判明し修正した問題

1. 任意の公開時刻が空欄だと、CMSの入力検証で保存できませんでした。`.pages.yml` の時刻パターンを空欄にも対応させました。
2. Pages CMSは `time: 19:30` のように引用符なしで保存します。従来のYAML読み取りでは1170という数値に変換され、サイトのビルドが失敗しました。YAML 1.2に沿ったスキーマを明示して読み取るよう修正しました。手作業で引用符を追加する運用は不要です。

修正コミット：`9ba91cd`。CMSが実際に保存した日付・時刻、時刻空欄、不正な時刻を含む回帰テストを追加し、22件のテストが成功しました。

## GitHub Actionsの証跡

- [初回保存時の失敗（ee54eba）](https://github.com/hirojessica/amenowa-renew/actions/runs/34222663992)
- [時刻の修正後・公開成功（9ba91cd）](https://github.com/hirojessica/amenowa-renew/actions/runs/34222990396)
- [CMSで時刻を空欄にして保存・公開成功（d462f70）](https://github.com/hirojessica/amenowa-renew/actions/runs/34223088591)
- [CMSで年表つき事例を作成・公開成功（7d7e466）](https://github.com/hirojessica/amenowa-renew/actions/runs/34223449307)
- [CMSで表示順を変更・公開成功（ff2d3f2）](https://github.com/hirojessica/amenowa-renew/actions/runs/34223781807)

削除コミットはお知らせ `be7b299`、事例 `57fafa5` です。

## 本番公開前の確認

- 管理者、リポジトリ、ブランチ、公開先を確定する。
- 保存と同時に公開するか、公開前の確認を挟むか決める。現在はmainへの保存がデモの自動公開を起動します。
- Pages CMSの接続範囲を確認し、不要になった接続を停止・削除する。ドメイン変更だけでは権限は変わりません。
- GitHub AppにはコードだけでなくActions・ワークフロー・リポジトリ管理の書き込み権限があります。同じPages CMSを使い続ける場合、公開時にこれらが自動で不要になるわけではありません。[権限確認・変更の公式手順](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps)
- GA4・フォーム・検索設定・旧URL転送は各本番公開タスクで確認する。現在のWordPress・DNS・フォーム送信・GA4収集は今回の作業で変更していません。

初回接続については[Pages CMS公式クイックスタート](https://pagescms.org/docs/quick-start/)も参照してください。
