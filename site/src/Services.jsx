import {Arrow,Button,Media,PageIntro,ContactCTA} from './App.jsx';
import {CaseVisual} from './ContentPages.jsx';
import {href} from './site.js';
import {supportServices,servicesIntro} from './supportServices.js';
import cases from './generated/cases.json';

export const serviceContact=service=>'contact/?service='+service.slug;
export function ServiceFlow({steps}) {
  return <ol className="service-flow">{steps.map(step=><li key={step}>{step}</li>)}</ol>;
}
export function ServiceActivities({service}) {
  return <section className="service-activities" aria-label={service.name+'の実施内容'}>
    <div><span className="eyebrow">WHAT WE DO</span><h3>具体的な実施内容</h3></div>
    <div className={service.activities.length>1?'service-activity-groups':'service-activity-list'}>
      {service.activities.map((group,i)=><div key={group.label||i}>
        {group.label&&<><span className="eyebrow">{group.label}</span><h4>{group.name}</h4></>}
        <ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul>
      </div>)}
    </div>
  </section>;
}
function ProofTimeline({items}) {
  return <ol className="service-proof-timeline">{items.map(([year,text])=><li key={year}><span>{year}</span><p>{text}</p></li>)}</ol>;
}
function ProofPhoto({item,photo}) {
  const media=item.servicePhotos?.find(image=>image.slot===photo.slot&&image.image);
  return <figure className="service-proof-photo">
    {media?<img src={media.image.startsWith('/uploads/')?href(media.image):media.image} alt={media.imageAlt} loading="lazy" decoding="async"/>:<Media name={item.title+'：'+photo.label}/>}
    {media?.caption&&<figcaption>{media.caption}</figcaption>}
  </figure>;
}
export function ServiceProof({service,item}) {
  const proof=service.proof;
  return <section className={'service-proof service-proof-'+service.slug} aria-label={service.name+'のルスツ実績'}>
    <div className="service-proof-intro"><div><span className="eyebrow">CASE / {item.client}</span><h3>{proof.title}</h3></div>
      <div>{proof.paragraphs.map(p=><p key={p}>{p}</p>)}
        {proof.timeline&&<ProofTimeline items={proof.timeline}/>}
        {proof.flow&&<ServiceFlow steps={proof.flow}/>}
        {proof.conclusion&&<p>{proof.conclusion}</p>}
      </div>
    </div>
    {proof.photos?.map(photo=><ProofPhoto key={photo.slot} item={item} photo={photo}/>)}
    {proof.parts&&<div className="service-proof-parts">{proof.parts.map(part=><section key={part.title}>
      <h4>{part.title}</h4><div>{part.paragraphs.map(p=><p key={p}>{p}</p>)}
        {part.timeline&&<ProofTimeline items={part.timeline}/>}
      </div><ProofPhoto item={item} photo={part.photo}/>
    </section>)}</div>}
    <a className="text-link" href={href('case-study/'+item.slug+'/')}>ルスツリゾートの取組を見る<Arrow/></a>
  </section>;
}
export function ServiceActions({service,detail=false}) {
  return <div className="service-actions">
    {!detail&&<a className="text-link" href={href('services/'+service.slug+'/')}>事例・詳しい内容を見る<Arrow/></a>}
    <Button to={serviceContact(service)}><span>{service.contactLabel.replace(/相談する$/,'')}<wbr/><span className="service-action-verb">相談する</span></span></Button>
  </div>;
}
export function Services() {
  const rusutsu=cases.find(item=>item.slug==='rusutsu-resort');
  return <>
    <div className="services-introduction">
      <PageIntro label="SERVICES" title={servicesIntro.title} description={<>{servicesIntro.paragraphs[0]}<br/><br/>{servicesIntro.paragraphs[1]}</>}/>
    </div>
    <nav className="service-anchor-nav content-width" aria-label="4つのサービス">
      {supportServices.map(s=><a href={'#'+s.slug} key={s.slug}><span>{s.number}</span><strong>{s.name}</strong><Arrow/></a>)}
    </nav>
    <div className="services-expanded content-width">
      {supportServices.map(s=><article id={s.slug} className="service-section" key={s.slug}>
        <div className="service-index">
          <div className="service-index-image"><Media name={s.image}/></div>
          <div><span className="eyebrow">{s.number} / {s.english}</span><h2>{s.name}</h2>
            {s.overview.map(p=><p key={p}>{p}</p>)}
            {s.flow&&<ServiceFlow steps={s.flow}/>}
          </div>
        </div>
        <ServiceActivities service={s}/>
        {rusutsu&&<ServiceProof service={s} item={rusutsu}/>}
        <ServiceActions service={s}/>
      </article>)}
    </div>
    <section className="services-connected content-width">
      <span className="eyebrow">ONE PROJECT, FOUR SERVICES</span>
      <h2>サービスを、別々に提供するだけではありません。</h2>
      <p>amenowaでは、プロジェクトに応じて各サービスを組み合わせて提供します。</p>
      <ol className="services-project-flow">{supportServices.map(s=><li key={s.slug}><span className="eyebrow">{s.number} / {s.english}</span><h3>{s.name}</h3><p>{s.projectRole}</p></li>)}</ol>
      {rusutsu&&<div className="services-project-case">
        <CaseVisual item={rusutsu}/>
        <div><span className="eyebrow">CASE STUDY / From Strategy to Action</span><h3>ルスツリゾートでつくる、水循環モデル</h3><p>構想から調査、IoT、森林、研究、教育、地域連携、発信まで。amenowaのサービスを複合的に実装している代表事例です。</p><a className="text-link" href={href('case-study/'+rusutsu.slug+'/')}>ルスツリゾートの取組を見る<Arrow/></a></div>
      </div>}
    </section>
    <ContactCTA/>
  </>;
}
