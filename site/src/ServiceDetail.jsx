import {Arrow,Button,Media} from './App.jsx';
import {CaseVisual} from './ContentPages.jsx';
import {href} from './site.js';
import {supportServices} from './catalog.js';
import cases from './generated/cases.json';

export function ServiceDetail({service}) {
  const examples=cases.map(item=>({...item,steps:item.timeline.filter(step=>step.services.includes(service.slug))})).filter(item=>item.steps.length);
  return <>
    <div className="breadcrumb content-width"><a href={href()}>HOME</a><span>/</span><a href={href('services/')}>SERVICES</a><span>/</span><span>{service.english}</span></div>
    <section className="service-hero">
      <div><span className="eyebrow">{service.english}</span><p className="service-name">{service.name}</p><h1>{service.headline.map(line=><span key={line}>{line}</span>)}</h1><p>{service.description}</p><a className="text-link" href="#service-cases">事例を見る<Arrow/></a></div>
      <Media name={service.image}/>
    </section>
    <section className="service-lead content-width"><span className="eyebrow">OUR APPROACH</span><h2>{service.lead}</h2><p>{service.body}</p></section>
    <section id="service-cases" className="service-cases content-width">
      <div className="section-heading"><div><span className="eyebrow">CASE STUDY</span><h2>事例から知る、{service.name}。</h2></div></div>
      {examples.length ? examples.map(item=><article className="service-case" key={item.slug}>
        <div className="service-case-intro">
          <CaseVisual item={item}/>
          <div><span className="eyebrow">{item.client}</span><h3>{item.title}</h3><p>{item.slug==='rusutsu-resort'?service.caseIntro:item.excerpt}</p><a className="text-link" href={href(`case-study/${item.slug}/`)}>取り組みの全体を見る<Arrow/></a></div>
        </div>
        <ol className="case-timeline service-case-steps">{item.steps.map((step,i)=><li key={i}>
          <span className="timeline-number">{String(i+1).padStart(2,'0')}</span>
          <div><h4>{step.title}</h4><p>{step.description}</p><p className="service-case-detail">{step.serviceDetail==='未定'?'紹介文：未定':step.serviceDetail}</p><p className="timeline-detail">{step.detail==='未定'?'詳細・実施時期：未定':step.detail}</p></div>
        </li>)}</ol>
      </article>) : <p>事例の掲載準備中です。</p>}
    </section>
    <section className="support-section content-width"><div className="section-heading"><div><span className="eyebrow">HOW WE SUPPORT</span><h2>ご相談いただけること</h2></div></div><div className="support-grid">{service.topics.map(([title,description],i)=><article key={title}><span className="support-number">0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="service-consult content-width"><span className="eyebrow">CONTACT</span><h2>{service.name}ことから、<br className="mobile-only"/>始めませんか。</h2><p>{service.english}に関するご相談をお聞かせください。</p><Button to="contact/">相談する</Button></section>
    <section className="related-works content-width"><span className="eyebrow">SERVICES</span><h2>ほかのサービスを見る</h2><div className="work-links">{supportServices.filter(item=>item.slug!==service.slug).map(item=><a key={item.slug} href={href(`services/${item.slug}/`)}><span>{item.english} / {item.name}</span><Arrow/></a>)}</div><a className="text-link service-back" href={href('services/')}>サービス一覧へ<Arrow/></a></section>
  </>;
}
