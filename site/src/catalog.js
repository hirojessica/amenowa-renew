export const products = [
  {
    slug:'aquainsights', name:'AquaInsights', english:'WATER INTELLIGENCE PLATFORM',
    headline:['水と自然を知り、','次の判断へ。'],
    intro:'観測・調査・地形地質・水利用などをつなぎ、自然の状態を理解し、守り育てる判断と開示につなげるプラットフォーム。',
    image:'AquaInsights 公開用サンプル画面', imageSrc:'images/products/aquainsights-section-20260905.webp', imageAlt:'AquaInsightsの観測断面画面。数値・識別情報は非表示', imageWidth:2400, imageHeight:1350,
    screenNote:'数値・識別情報を伏せた画面サンプルです。',
    lead:'自然を理解し、意思決定に使う。',
    body:'データを集めること自体を目的とせず、水と自然の状態を知り、次の判断に活かします。',
    items:[['見えるようにする','観測・調査・地形地質・水利用の情報をつなぎます。'],['理解する','水と自然の状態を理解できる情報に整理します。'],['判断・開示につなげる','自然を守り育てるための判断と、社会への開示につなげます。']],
    screens:[
      {name:'観測断面',src:'images/products/aquainsights-section-20260905.webp',width:2400,height:1350,alt:'地質構造と地下水位を表示する観測断面。数値・識別情報は非表示'},
      {name:'水位・雨量',src:'images/products/aquainsights-rainfall-20260905.webp',width:2400,height:1350,alt:'雨量と地下水位の応答を表示する画面。数値・識別情報は非表示'},
      {name:'涵養区域',src:'images/products/aquainsights-recharge-20260905.webp',width:2400,height:1350,alt:'推定集水域と涵養・利用の情報を表示する画面。数値・識別情報は非表示'},
      {name:'水収支',src:'images/products/aquainsights-water-balance-20260905.webp',width:2400,height:1350,alt:'水収支シミュレーション画面。数値・実データのグラフ・識別情報は非表示'},
      {name:'TNFD',src:'images/products/aquainsights-tnfd-20260905.webp',width:2400,height:1350,alt:'TNFDレポートの帳票と出力設定画面。対象拠点・日時は非表示'},
    ],
  },
  {
    slug:'meguru', name:'MEGURU', english:'ENVIRONMENT ACTION PLATFORM',
    headline:['自然の課題を、','みんなの行動に','変える。'],
    intro:'企業・自治体・地域住民をつなぎ、地域に必要な環境活動をMissionとして実行につなげるプラットフォーム。',
    image:'MEGURU 公開用サンプル画面', imageSrc:'images/products/meguru-home-20260905.webp', imageAlt:'MEGURUのHOME画面。地域の状況と参加できるミッションを表示', imageWidth:741, imageHeight:1602,
    lead:'知るだけで終わらせない。',
    body:'自然の課題を具体的な行動へ。人が参加し、行動の結果を残しながら、次の取り組みにつなげます。',
    items:[['Missionに変える','地域に必要な環境活動を、具体的なMissionにします。'],['人が参加する','企業・自治体・地域住民が、活動を通じてつながります。'],['行動を次につなげる','行動の結果を残し、次の取り組みにつなげます。']],
    screens:[
      {name:'HOME',src:'images/products/meguru-home-20260905.webp',width:741,height:1602,alt:'地域の状況と近くで参加できるミッションを表示するホーム画面'},
      {name:'MAP',src:'images/products/meguru-map-20260905.webp',width:678,height:1467,alt:'活動場所とミッションの報酬を地図で確認する画面'},
      {name:'Mission',src:'images/products/meguru-mission-20260905.webp',width:631,height:1366,alt:'ミッションの内容・完了条件・必要性・支援者を確認する画面'},
      {name:'My Impact',src:'images/products/meguru-impact-20260905.webp',width:678,height:1467,alt:'参加した活動と水・森林への貢献を振り返る画面'},
      {name:'Collective',src:'images/products/meguru-collective-20260905.webp',width:678,height:1467,alt:'地域全体の目標と参加者ごとの貢献を表示する画面'},
      {name:'Corporate Dashboard',src:'images/products/meguru-corporate-20260905.webp',width:735,height:1589,alt:'企業の環境投資・活動・水収支を表示するダッシュボード画面。水収支の実数値は非表示'},
    ],
  },
];

export const supportServices = [
  {slug:'strategy',english:'STRATEGY',name:'一緒に考える',description:'水・自然資本戦略、社内プロジェクト設計、チーム組成、研究者・自治体との連携。',image:'戦略づくり・対話の写真'},
  {slug:'field',english:'FIELD',name:'現場で動かす',description:'調査・観測・実証、シンポジウム、地域イベント、環境教育、企業研修・エクスカーション。',image:'調査・地域活動の写真'},
  {slug:'communication',english:'COMMUNICATION',name:'社会に伝える',description:'TNFD等の開示、環境サイト、Web、PR、イベント、ブランドストーリー。',image:'発信・コミュニケーションの写真'},
];
