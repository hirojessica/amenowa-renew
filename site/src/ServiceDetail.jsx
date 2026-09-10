import {Arrow,Media} from './App.jsx';
import {CaseVisual} from './ContentPages.jsx';
import {ServiceActivities,ServiceProof,ServiceActions,ServiceFlow} from './Services.jsx';
import {href} from './site.js';
import {supportServices} from './catalog.js';
import cases from './generated/cases.json';

export function ServiceDetail({service}) {
  const examples=cases.map(item=>({...item,steps:item.timeline.filter(step=>step.services.includes(service.slug))})).filter(item=>item.steps.length);
  return <>
    <div className="breadcrumb content-width"><a href={href()}>HOME</a><span>/</span><a href={href('services/')}>SERVICES</a><span>/</span><span>{service.name}</span></div>
    <section className="service-hero service-detail-hero">
      <div><span className="eyebrow">{service.number} / {service.english}</span><h1>{service.name}</h1><p className="service-detail-catch">{service.headline.map(line=><span key={line}>{line}</span>)}</p><p>{service.description}</p><a className="text-link" href="#service-cases">事例を見る<Arrow/></a></div>
      <Media name={service.image}/>
    </section>
    <section className="service-detail-intro content-width"><span className="eyebrow">OUR APPROACH</span><h2>{service.headline.join('')}</h2>{service.overview.map(p=><p key={p}>{p}</p>)}{service.flow&&<ServiceFlow steps={service.flow}/>}</section>
    <div className="service-detail-activities content-width"><ServiceActivities service={service}/></div>
    <section id="service-cases" className="service-cases content-width">
      <div className="section-heading"><div><span className="eyebrow">CASE STUDY</span><h2>事例から知る、具体的な取り組み。</h2></div></div>
      {examples.length ? examples.map(item=><article className="service-case" key={item.slug}>
        {item.slug==='rusutsu-resort'?<ServiceProof service={service} item={item}/>:<div className="service-case-intro">
          <CaseVisual item={item}/>
          <div><span className="eyebrow">{item.client}</span><h3>{item.title}</h3><p>{item.excerpt}</p><a className="text-link" href={href('case-study/'+item.slug+'/')}>取り組みの全体を見る<Arrow/></a></div>
        </div>}
        <ol className="case-timeline service-case-steps">{item.steps.map((step,i)=><li key={i}>
          <span className="timeline-number">{String(i+1).padStart(2,'0')}</span>
          <div><h4>{step.title}</h4><p>{step.description}</p><p className="service-case-detail">{step.serviceDetail==='未定'?'紹介文：未定':step.serviceDetail}</p>{step.detail&&step.detail!=='未定'&&<p className="timeline-detail">{step.detail}</p>}</div>
        </li>)}</ol>
      </article>) : <p>事例の掲載準備中です。</p>}
    </section>
    <section className="service-consult content-width"><span className="eyebrow">CONTACT</span><h2>{service.name}について</h2><p>検討段階から、具体的なプロジェクトのご相談まで。まずはお聞かせください。</p><ServiceActions service={service} detail/></section>
    <section className="related-works content-width"><span className="eyebrow">SERVICES</span><h2>ほかのサービスを見る</h2><div className="work-links">{supportServices.filter(item=>item.slug!==service.slug).map(item=><a key={item.slug} href={href('services/'+item.slug+'/')}><span>{item.name}</span><Arrow/></a>)}</div><a className="text-link service-back" href={href('services/')}>サービス一覧へ<Arrow/></a></section>
  </>;
}
