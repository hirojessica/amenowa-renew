export const products = [
  {
    slug:'aquainsights', name:'AquaInsights', english:'WATER INTELLIGENCE PLATFORM',
    headline:['水と自然を知り、','次の判断へ。'],
    intro:'観測・調査・地形地質・水利用などをつなぎ、自然の状態を理解し、守り育てる判断と開示につなげるプラットフォーム。',
    image:'AquaInsights 公開用サンプル画面', imageSrc:'images/products/aquainsights-section-20260905.webp', imageAlt:'AquaInsightsの観測断面画面。数値・識別情報は非表示', imageWidth:2400, imageHeight:1350,
    screenNote:'サンプル画像です',
    lead:'自然を理解し、意思決定に使う。',
    body:'データを集めること自体を目的とせず、水と自然の状態を知り、次の判断に活かします。',
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
    image:'MEGURU 公開用サンプル画面', imageSrc:'images/products/meguru-home-branded-20260907.png', imageAlt:'MEGURU by amenowaのHOME画面。地域の状況と参加できるミッションを表示', imageWidth:853, imageHeight:1844,
    lead:'知るだけで終わらせない。',
    body:'自然の課題を具体的な行動へ。人が参加し、行動の結果を残しながら、次の取り組みにつなげます。',
    items:[['Missionに変える','地域に必要な環境活動を、具体的なMissionにします。'],['人が参加する','企業・自治体・地域住民が、活動を通じてつながります。'],['行動を次につなげる','行動の結果を残し、次の取り組みにつなげます。']],
    screens:[
      {name:'HOME',src:'images/products/meguru-home-branded-20260907.png',width:853,height:1844,alt:'MEGURU by amenowaのホーム画面。地域の状況と近くで参加できるミッションを表示'},
      {name:'MAP',src:'images/products/meguru-map-20260905.webp',width:678,height:1467,alt:'活動場所とミッションの報酬を地図で確認する画面'},
      {name:'Mission',src:'images/products/meguru-mission-20260905.webp',width:631,height:1366,alt:'ミッションの内容・完了条件・必要性・支援者を確認する画面'},
      {name:'My Impact',src:'images/products/meguru-impact-20260905.webp',width:678,height:1467,alt:'参加した活動と水・森林への貢献を振り返る画面'},
      {name:'Collective',src:'images/products/meguru-collective-20260905.webp',width:678,height:1467,alt:'地域全体の目標と参加者ごとの貢献を表示する画面'},
      {name:'Corporate Dashboard',src:'images/products/meguru-corporate-20260905.webp',width:735,height:1589,alt:'企業の環境投資・活動・水収支を表示するダッシュボード画面。水収支の実数値は非表示'},
    ],
  },
];

export const supportServices = [
  {
    slug:'strategy',english:'STRATEGY',name:'一緒に考える',description:'水・自然資本戦略、社内プロジェクト設計、チーム組成、研究者・自治体との連携。',image:'戦略づくり・対話の写真',
    headline:['自然への想いを、','実行できる戦略へ。'],
    lead:'課題を共有し、取り組みの道筋をつくる。',
    body:'水や自然と事業の関わりを整理し、目指す姿と優先する課題を考えます。社内のプロジェクト設計から、地域や専門家と連携する体制づくりまで、ともに検討します。',
    caseIntro:'社内での検討と、企業・自治体・研究者・専門家によるチームづくり。ルスツの取り組みを、戦略と連携体制の視点から紹介します。',
    topics:[['水・自然資本戦略','水利用や自然との関わりを整理し、取り組む目的と優先順位を考えます。'],['社内プロジェクトの設計','目指す姿を共有し、社内で進めるプロジェクトの内容や役割を検討します。'],['チームづくりと連携','研究者・自治体・専門家との接点をつくり、取り組みを支える体制を考えます。']],
  },
  {
    slug:'field',english:'FIELD',name:'現場で動かす',description:'調査・観測・実証、シンポジウム、地域イベント、環境教育、企業研修・エクスカーション。',image:'調査・地域活動の写真',
    headline:['現場で知り、','地域の行動へ。'],
    lead:'自然を確かめ、人が関わる機会をつくる。',
    body:'現場での調査・観測・実証を、自然への理解と具体的な行動につなげます。地域の人々や企業が参加できるイベント、環境教育、研修の機会も、ともに考えます。',
    caseIntro:'地下水・湧水・地質・雨量・森林の調査から、地域で学び、参加する機会へ。ルスツの取り組みを、観測と地域活動の視点から紹介します。',
    topics:[['調査・観測・実証','水や森林の状態を知るために、目的や現場の条件に合う調査・観測を検討します。'],['地域イベントと環境教育','シンポジウムや子ども向けの学びを通じ、地域の自然に触れる機会を考えます。'],['企業研修・エクスカーション','現場での体験と対話を、企業や参加者の次の行動につなげるプログラムを考えます。']],
  },
  {
    slug:'communication',english:'COMMUNICATION',name:'社会に伝える',description:'TNFD等の開示、環境サイト、Web、PR、イベント、ブランドストーリー。',image:'発信・コミュニケーションの写真',
    headline:['取り組みの価値を、','社会へつなぐ。'],
    lead:'活動の背景から、伝わる言葉と形へ。',
    body:'なぜ取り組むのか、現場で何を行い、何が見えてきたのか。活動の事実と背景を整理し、情報開示、Web、PR、イベントなどを通じて、関係者や社会に伝える方法を考えます。',
    caseIntro:'環境サイト、シンポジウム、ブランディング。ルスツの取り組みを、活動の価値を共有し、社会へ伝える視点から紹介します。',
    topics:[['情報開示と発信方針','TNFD等の開示を見据え、伝える相手と目的、整理する情報を検討します。'],['環境サイト・Web・PR','取り組みの背景と活動内容を整理し、伝えるためのコンテンツや媒体を考えます。'],['対話とブランドストーリー','イベントや継続的な発信を通じて、企業の姿勢と現場の活動をつなぐストーリーを考えます。']],
  },
];
