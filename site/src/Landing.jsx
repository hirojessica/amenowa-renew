import {Arrow,Button,ContactCTA} from './App.jsx';
import {NewsRows} from './Pages.jsx';
import {TeamIntro} from './Team.jsx';
import {href} from './site.js';
import {supportServices} from './catalog.js';
import {ProductLinks,CaseVisual,ProductOverview} from './ContentPages.jsx';
import posts from './generated/news.json';
import cases from './generated/cases.json';

export function Home(){const featured=cases.find(item=>item.slug==='rusutsu-resort')||cases[0];return <>
  <section className="home-hero"><div className="hero-copy"><h1><span>水と自然を知る。</span><span>守り、育てる。</span><span>未来につなぐ。</span></h1><p>企業や自治体とともに、自然を理解し、<br/>地域の行動と社会への発信につなげます。</p><div className="hero-actions"><Button to="products/">プロダクトを見る</Button>{featured&&<a className="text-link" href={href(`case-study/${featured.slug}/`)}>{featured.client==='RUSUTSU RESORT'?'ルスツの取り組み':'取り組みを見る'}<Arrow/></a>}</div></div><div className="hero-media"><img className="hero-photo" src={href('images/hero-river-v1.webp')} alt="緑豊かな山々の間を流れる、岩と澄んだ水の清流" width="1086" height="1448" fetchPriority="high" decoding="async"/></div></section>
  <section className="home-concept"><div className="concept-copy"><h2>自然は、<br/>見えているようで<br/>見えていない。</h2><p>水や自然は、地域の暮らしや産業を支えています。<br className="desktop-only"/>その状態を理解することから、<br className="desktop-only"/>守り、育てるための行動が始まります。</p></div><figure className="concept-figure"><img className="concept-art" src={href('images/water-cycle-v1.webp')} alt="雨が森や山に降り、地下水と川を通じて海へ流れる水循環のイメージ図" width="1448" height="1086" loading="lazy" decoding="async"/><figcaption>水循環のイメージ</figcaption></figure></section>
  <section className="home-works"><h2 className="eyebrow">PRODUCTS</h2><div className="home-works-content"><ProductLinks/><ProductOverview/></div></section>
  {featured&&<section className="home-case content-width"><div className="section-heading"><div><span className="eyebrow">CASE STUDY</span><h2>構想から、地域の実装へ。</h2></div></div><div className="home-case-body"><CaseVisual item={featured}/><div><span className="eyebrow">{featured.client}</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><ol className="case-summary"><li>考える</li><li>チームをつくる</li><li>現場で知る</li><li>地域につなげる</li></ol><a className="text-link" href={href(`case-study/${featured.slug}/`)}>取り組みを見る<Arrow/></a></div></div></section>}
  <section className="home-services content-width"><div className="section-heading"><div><span className="eyebrow">SERVICES</span><h2>ともに考え、現場で動かす。</h2></div><a className="text-link" href={href('services/')}>すべて見る<Arrow/></a></div><div className="support-grid">{supportServices.map(s=><article key={s.slug}><span className="eyebrow">{s.english}</span><h3>{s.name}</h3><p>{s.description}</p><a className="text-link" href={href(`services/${s.slug}/`)}>詳しく見る<Arrow/></a></article>)}</div></section>
  <TeamIntro/>
  <section className="home-news content-width"><div className="section-heading"><div><span className="eyebrow">INSIGHTS</span><h2>お知らせ</h2></div><a className="text-link" href={href('insights/')}>すべて見る<Arrow/></a></div><NewsRows items={posts.slice(0,3)}/></section><ContactCTA/>
</>;}
