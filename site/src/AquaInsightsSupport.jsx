import {ArrowRight} from '@phosphor-icons/react';
import {href} from './site.js';

const steps=[
 {english:'FIELD RESEARCH',flow:'現地を知る',flowEnglish:'FIELD',title:'現地を知る',paragraphs:['水文地質、地下水、湧水、河川、森林、地形・地質などを調査し、その地域の水循環を理解します。']},
 {english:'MONITORING DESIGN',flow:'測る',flowEnglish:'MONITOR',title:'何を、どこで測るかを決める',titleParts:['何を、どこで','測るかを決める'],paragraphs:['地下水位、雨量、河川、水利用など、目的に応じて必要な観測地点、センサー、IoT環境を設計します。']},
 {english:'DATA INTEGRATION',flow:'データをつなぐ',flowEnglish:'UNDERSTAND',title:'バラバラなデータをつなぐ',paragraphs:['センサー、既存データ、地形・地質、森林、水利用などをAquaInsights上で統合し、水の状態を一つの視点から理解できるようにします。']},
 {english:'ACTION & REVIEW',flow:'行動する',flowEnglish:'ACTION',title:'次に何をするかを判断する',paragraphs:['森林整備、涵養、取水、水利用、グリーンインフラなど、どこを守り、どのような施策を実施するべきかを判断します。','施策後も継続して観測し、変化を確認しながら次の判断につなげます。']},
];

export function AquaInsightsSupport(){
 return <section id="support" className="support-section aqua-support content-width" aria-labelledby="aqua-support-title">
  <header className="section-heading"><div><span className="eyebrow">SUPPORT</span><h2 id="aqua-support-title">AquaInsightsの導入を、<span>現地から支援します。</span></h2></div></header>
  <p className="aqua-support-intro">AquaInsightsは、単にセンサーデータを表示するためのツールではありません。水がどこから来て、どのように流れ、自然や事業とどう関係しているのかを理解するためには、現地調査、観測地点の設計、センサーの設置、地形・地質などの専門的な情報が必要です。amenowaでは、研究者・専門家と連携しながら、調査・観測設計からデータ統合、分析、改善施策の検討まで、AquaInsightsの導入を一貫して支援します。</p>
  <ol className="aqua-support-flow" aria-label="導入支援の流れ">{steps.map((step,i)=><li key={step.english}><span>{step.flow}<small lang="en">{step.flowEnglish}</small></span>{i<steps.length-1&&<ArrowRight size={24} weight="thin" aria-hidden="true"/>}</li>)}</ol>
  <ol className="aqua-support-steps">{steps.map((step,i)=><li key={step.english}><div className="aqua-support-step-label"><span className="support-number">{String(i+1).padStart(2,'0')}</span><span lang="en">{step.english}</span></div><h3>{step.titleParts?step.titleParts.map(part=><span key={part}>{part}</span>):step.title}</h3>{step.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</li>)}</ol>
  <div className="aqua-support-message"><h3>「見える化」は、ゴールではありません。</h3><p>水を知ることで、どこを守るのか、どこに投資するのか、何を変えるべきなのかを判断できるようにする。<br/>それがAquaInsightsの役割です。</p></div>
  <article className="aqua-support-case">
   <div><span className="eyebrow">CASE STUDY / RUSUTSU RESORT</span><h3>実際のフィールドから<wbr/>つくるAquaInsights</h3></div>
   <div><p>ルスツリゾートでは、研究者による現地調査から始まり、観測井戸、水位計、雨量計、IoTを設置。</p><p>地下水、雨、河川、地形・地質などの情報をつなぎ、水循環の状態を継続的に把握する取り組みを進めています。</p><p>現在は、そのデータを森林涵養やグリーンインフラなどの「水を守り、育てる」施策へつなげています。</p><a className="text-link" href={href('case-study/rusutsu-resort/')}>ルスツリゾートの取組を見る<ArrowRight size={26} weight="thin" aria-hidden="true"/></a></div>
  </article>
 </section>;
}
