# WordPressからNEWSへの移行

2026-09-06、ChromeのWordPress投稿一覧で公開済み4件・下書き1件を確認しました。公開済み4件の本文を認証不要の公開ページから取得し、デモのサンプル3件と差し替えています。本番の投稿や設定は変更していません。下書きは取得・掲載していません。

| 元記事 | 公開日 | カテゴリー | デモ |
| --- | --- | --- | --- |
| [AIの成長を止めないために、地下水を守る。](https://amenowa.co.jp/?p=430) | 2026-09-05 | ブログ | [wp-430](https://hirojessica.github.io/amenowa-renew/news/wp-430/) |
| [「AIの時代に、なぜ『水』を選んだのか」](https://amenowa.co.jp/?p=421) | 2026-08-16 | ブログ | [wp-421](https://hirojessica.github.io/amenowa-renew/news/wp-421/) |
| [北海道ルスツリゾートで水循環シンポジウム開催！](https://amenowa.co.jp/?p=401) | 2024-09-17 | プレスリリース | [wp-401](https://hirojessica.github.io/amenowa-renew/news/wp-401/) |
| [水循環シンポジウムを留寿都にて開催いたします](https://amenowa.co.jp/?p=396) | 2024-09-17 | お知らせ | [wp-396](https://hirojessica.github.io/amenowa-renew/news/wp-396/) |

原稿は `site/content/news/wp-*.md` に保存し、Pages CMSから編集できます。公開日は投稿一覧と公開ページに表示される元の公開日を採用しています。更新日への置き換えは行っていません。同日公開の記事は、投稿一覧に表示されていた公開時刻（日本時間）で新しい順に並べます。一覧用の説明文は元記事の冒頭から抜粋しています。

## 移行時の調整

- 本文の文言、強調、改行、箇条書き、外部リンクを保持。本文内の見出しはデモの構造に合わせてH2に統一しました。
- 本文の公開メールアドレス2件は、文字列を変えずメール作成用リンクとして表示します。
- ブログ2件の画像は元の位置に配置。画像がない2件には仮の画像枠を表示しません。
- WordPressのリンクカードは、表示されていたドメイン・タイトル・説明文とリンク先を保持した引用ブロックに変換。プラグインの装飾CSSと「画像なし」のサムネイルは除きました。
- 既存の案内やイベント日時は原文のままです。デモ上で申込みやフォーム送信は実施していません。

## 添付ファイル

いずれも本番の公開ファイルを加工せずコピーしています。

| デモの保存先 | 取得元 |
| --- | --- |
| `site/public/uploads/wordpress/wp-430-ai-groundwater.webp` | [ブログ430の画像](https://amenowa.co.jp/wp-content/uploads/2026/09/rectangle_large_type_2_4b9c4f41ae91e2c17ff372184a678ea7.webp) |
| `site/public/uploads/wordpress/wp-421-ai-water.webp` | [ブログ421の画像](https://amenowa.co.jp/wp-content/uploads/2026/08/rectangle_large_type_2_0638356294d98618c2b7ed192dbe1fa0.webp) |
| `site/public/uploads/wordpress/wp-401-press-release.pdf` | [プレスリリースのPDF](https://amenowa.co.jp/wp-content/uploads/2024/09/%E3%80%90%E3%83%97%E3%83%AC%E3%82%B9%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%80%91%E6%B0%B4%E5%BE%AA%E7%92%B0%E3%82%B7%E3%83%B3%E3%83%9D%E3%82%B8%E3%82%A6%E3%83%A00904-1.pdf) |

今回の移行は一度限りのコピーです。WordPressでの変更は自動反映されません。本番公開時の旧URL転送とPages CMSへの初回ログイン・保存の実確認は別途必要です。
