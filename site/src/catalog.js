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
    intro:'地域に必要な環境活動をMissionとして届け、参加した人に報酬を還元するEnvironment Action Platform。',
    image:'MEGURU 公開用サンプル画面', imageSrc:'images/products/meguru-home-branded-20260907.png', imageAlt:'MEGURU by amenowaのHOME画面。地域の状況と参加できるミッションを表示', imageWidth:853, imageHeight:1844,
    screenNote:'サンプル画像です',
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

export {supportServices} from './supportServices.js';
