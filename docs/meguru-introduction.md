# MEGURU 補足説明・導入セクション

2026年9月7日提供の `amenowa HP制作指示書｜MEGURU 補足説明・導入セクション改修.zip` 内の `amenowaHPMEGURU.html` をもとに、`/products/meguru/` を更新。

## 内容の対応

- メインコピー「自然の課題を、みんなの行動に変える。」と採用済みのヒーロー画像を保持。紹介文でMissionと参加者への報酬を明示。
- 補足コピーは候補から「企業の環境投資を、地域で動く人の力へ。」を選択。
- HOW MEGURU WORKS：企業の支援、Mission配信、必要性と支援企業の理解、実行・完了確認、報酬、成果と次のMissionの6ステップ。文意を維持して段落を短く整理。
- 「お金が、行動になって、自然に返る。」の7項目の循環図をHTML/CSSで実装。
- Missionを見つける、必要性と支援企業を知る、実行して報酬を受け取る、自分と地域のImpactを振り返る順に、説明と提供画面を組み合わせた。
- Missionの具体例6件は開閉できる補足に配置。
- 企業を知る体験は独立したセクション。`Sponsored by ○○株式会社` のリンクは同じページにあるサンプル企業画面へ移動する。実際の企業情報ページや広告配信を新設するものではない。
- 企業側の成果確認、参加者・企業・地域の3者の価値を掲載。
- MEGURU単独導入と、AquaInsights → MEGURU → AquaInsightsの観測・行動・再評価の循環を掲載。AquaInsights詳細へのリンクを設置。
- ポイント・決済等への交換は将来構想として、本文とウォレット画像の近く、拡大表示でも明記。交換機能の稼働や外部サービスとの契約成立を新たに断定しない。

## 追加画面の出典

| 画面 | 公開ファイル | 元資料 |
| --- | --- | --- |
| Mission Execution | `site/public/images/products/meguru-execution-20260905.webp` | `MEGURU_proposal_20260905.pdf` 15ページの埋め込み画像 `/Im976`、631×1366px |
| Wallet | `site/public/images/products/meguru-wallet-20260905.webp` | `meguru_app_ui_20260905.html` の `cp_08_wallet` を含むSVG。日本語フォントをローカルで読み込み、2倍解像度で取得、780×1690px |
| Company Page | `site/public/images/products/meguru-company-20260905.webp` | 同PDF20ページの埋め込み画像 `/Im1237`、734×1589px |

3画像は資料内のサンプルUI。Company Pageは○○株式会社という仮名、Walletはサンプル残高・履歴であり、サイト本文に実績値として転記していない。実測値を伏せた既存Corporate Dashboard、AquaInsights各画面は既存ファイルを維持。元PDF・HTML・抽出テキストは公開しない。

WebPは可逆変換し、画像の画素と四隅の透過を確認。採用済みHOMEのロゴや四隅は変更していない。既存6画面の一覧を保ち、追加3画面は本文の該当箇所で表示・拡大できる。

## 実装

本文と画面の配置：`site/src/MeguruDetails.jsx`、6ステップ・循環・価値・追加画面定義：`site/src/meguruContent.js`、スタイル：`site/src/meguru-details.css`。

既存の `ProductGallery` を本文でも再利用。企業画面へのアンカーと、将来構想の注記を任意項目として追加した。AquaInsightsや既存ギャラリーにも同じ拡大・閉じる挙動を維持する。

## 確認

- `npm run build`：26ページと404、内部リンク・画像・見出し・noindex・OGPの検証を通過。
- 1440／1024／390／320px：6ステップ、7項目の循環、3者の価値、単独導入、本文9画面・既存一覧6画面を確認。横にはみ出さず、画像がすべて表示される。
- 「仕組みを見る」、Mission例の開閉、企業サンプルへのページ内移動を各幅で確認。
- 追加3画面の拡大、Escで閉じる、操作元へのフォーカス復帰、背景スクロールの抑止をPC・スマートフォンで確認。Walletの拡大にも将来構想の注記がある。
- 共有ギャラリーを使うAquaInsightsの4ステップ・既存画像拡大・閉じる操作と、MEGURUからのリンクも確認。ブラウザーの実行時エラーなし。
- 追加3画像は元の抽出・描画PNGとRGBA画素が一致し、四隅の透明度はいずれも0。採用済み画像は差し替えていない。

ローカル確認ログと画面キャプチャは非公開の `output/playwright/meguru-introduction-20260907/` に保存。
