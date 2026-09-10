# FormSubmit 有効化・受信確認

2026年9月10日。利用者から本番用の有効化と受信テストを依頼されたため、切り替え前の確認に着手しました。本番サイトの切り替えはまだ行っていません。

## 確認結果

| 対象 | 結果 |
| --- | --- |
| 宛先 | `info@amenowa.co.jp`（利用者指定） |
| 実送信 | ローカル環境の実際のフォームから計2回。識別子 `AMENOWA-20260910-01`、`AMENOWA-20260910-02`。2回目も利用者の明示依頼に従ってCodexが送信ボタンを押した |
| FormSubmitの表示 | `The form was submitted successfully.` の受付画面 |
| メール到達 | 1回目は利用者から「まだ届いていない」と回答。2回目は受信確認待ち。有効化・受信成功は未完了 |
| 完了画面への遷移 | サイト側の完了ページではなく、FormSubmit標準受付画面を表示。原因は未確定 |
| 送信データの検証 | 別の独立ブラウザーで外部通信を遮断し、実際のPOSTをローカルで捕捉。日本語・改行・email・subject・template・絶対URLのnextが一致し、honeyは空欄。追加の外部送信なし |
| 公開デモ | `VITE_CONTACT_MODE=demo` のまま。実送信なし |
| 現行本番 | WordPress・DNS・フォームを変更していない |

ローカル検証記録は `output/playwright/contact-transport-result.json`（Git管理外）です。受付画面のみを根拠に有効化や配信成功とは判断しません。CAPTCHAや迷惑メール対策を無効化していません。

## 次の確認

1. `AMENOWA-20260910-02` は利用者から「送信するまで押してください」と依頼を受け、Codexが送信済み。再びFormSubmitの標準受付画面を表示。受信者によるメール確認待ちです。
2. 有効化メールが届いた場合、受信者が確認リンクを開く。有効化リンクや管理用情報はGitやNotionへ保存しない。
3. テストメールの到達、宛先、本文・日本語・改行、Reply-To、迷惑メール判定を確認する。
4. 完了ページへの遷移も再確認する。未着が続く場合は、通常メールの受信可否と迷惑メール・隔離・受信サーバー側の拒否履歴を調べ、必要に応じて利用者の依頼でFormSubmitへ照会する。

## 本番切り替え時

有効化と受信確認は可能な範囲で事前に済ませ、切り替え直後に本番ドメインから再確認する方針です。画像・紹介文の確定と別に、問い合わせ経路が動作することを公開条件として確認します。

- 本番向けビルドで `SITE_BASE=/`、`SITE_URL=https://amenowa.co.jp/`、`VITE_CONTACT_MODE=live`、`VITE_FORM_ENDPOINT` を設定する。環境変数はビルド時に反映されるため、公開後の値の変更だけでは切り替わらず再ビルドが必要。
- `VITE_FORM_ENDPOINT` には確認済みのFormSubmit宛先を使う。確認メールで匿名化された送信用URLが得られた場合も、本番設定へ反映する前に正しい宛先を確認する。
- 本番フォームの入力→確認→送信→必要な認証→完了ページ→受信箱までを1件の識別可能なテストで通す。本番で再度有効化を求められた場合は、その案内に従う。
- 本番環境での受信が確認されるまで、Notionのタスク8を完了扱いにしない。運用方針の照合事項は [privacy-operations.md](privacy-operations.md) に記載。
- GitHub Pagesのデモ用ワークフローをliveへ変えない。本番公開・インデックス設定・GA4は別途、切り替え作業として確認する。

## 公式資料

- [FormSubmit Help](https://formsubmit.co/help)：有効化メール、未着時の確認、宛先変更時の再有効化。
- [FormSubmit Documentation](https://formsubmit.co/documentation)：email、next、subject、template、honey、reCAPTCHAの仕様。
