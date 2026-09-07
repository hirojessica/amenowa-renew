import {useEffect,useId,useRef,useState} from 'react';
import {ArrowRight,ArrowsOut,X} from '@phosphor-icons/react';
import {href} from './site.js';
import {caseCategories} from './caseCategories.js';

const mediaHref=src=>src.startsWith('/uploads/')?href(src):src;

export function CaseNarrative({item}){
 if(!item.projectIntro&&!item.storySections.length)return null;
 return <div className="case-narrative content-width">
   {item.projectIntro&&<div className="case-project-intro prose" dangerouslySetInnerHTML={{__html:item.projectIntro}}/>}
   {item.storySections.map((section,i)=><section className="case-story-section" key={i}>
     <div><span className="eyebrow">{section.label}</span><h2>{section.headline}</h2></div>
     <div className="prose" dangerouslySetInnerHTML={{__html:section.html}}/>
   </section>)}
 </div>;
}

export function CaseChronology({chronology,slug}){
 const [category,setCategory]=useState('all');
 const [selected,setSelected]=useState(null);
 const dialogRef=useRef(null),openerRef=useRef(null),backdropPress=useRef(false);
 const titleId=useId();
 const total=chronology.years.flatMap(year=>year.periods.flatMap(period=>period.events)).filter(event=>category==='all'||event.category===category).length;
 useEffect(()=>{
  if(!selected)return;
  const dialog=dialogRef.current,overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';dialog.showModal();
  return()=>{dialog.close();document.body.style.overflow=overflow;openerRef.current?.focus({preventScroll:true});};
 },[selected]);
 function open(event,trigger){openerRef.current=trigger;setSelected(event);}
 function close(){setSelected(null);}
 return <section id="journey" className="case-chronology content-width">
   <header className="chronology-heading"><span className="eyebrow">OUR JOURNEY</span><h2>{chronology.title}</h2>{chronology.intro&&<p>{chronology.intro}</p>}</header>
   <nav className="chronology-year-links" aria-label="年表の年へ移動">{chronology.years.map(year=><a key={year.year} href={`#${slug}-${year.year}`}><strong>{year.year}</strong><span>{year.phase}</span><ArrowRight size={22} weight="thin" aria-hidden="true"/></a>)}</nav>
   <div className="chronology-controls"><div className="chronology-filters" role="group" aria-label="年表をサービスで絞り込む"><button type="button" aria-pressed={category==='all'} onClick={()=>setCategory('all')}>すべて</button>{caseCategories.map(item=><button type="button" key={item.id} aria-pressed={category===item.id} onClick={()=>setCategory(item.id)}>{item.number} {item.short}</button>)}</div><p className="chronology-count" role="status">{total}件の取り組み</p></div>
   {chronology.years.map(year=>{
     const periods=year.periods.map(period=>({...period,events:period.events.filter(event=>category==='all'||event.category===category)})).filter(period=>period.events.length);
     const gridRows=1+5*Math.max(0,...periods.map(period=>period.events.length));
     return <section id={`${slug}-${year.year}`} className="chronology-year" key={year.year}>
       <header className="chronology-year-heading"><h3>{year.year}</h3><div><p className="chronology-phase">{year.phase}</p><p>{year.description}</p></div></header>
       {periods.length?<div className="chronology-periods" style={{'--chronology-rows':gridRows}}>{periods.map((period,i)=><section className="chronology-period" key={i}>
         <h4>{period.label}</h4>
         <ol className="chronology-events">{period.events.map((event,j)=>{
           const item=caseCategories.find(item=>item.id===event.category);
           return <li className="chronology-event" data-category={event.category} key={j}>
             <span className="chronology-category">{item.number} {item.short}</span><h5>{event.title}</h5>
             {event.next&&<p className="chronology-next"><ArrowRight size={17} weight="thin" aria-hidden="true"/><span>{event.next}</span></p>}
             {event.related&&<p className="chronology-related">＋ {event.related}</p>}
             {event.image&&<figure className="chronology-media"><button type="button" className="chronology-image-button" aria-haspopup="dialog" aria-label={`${event.title}の画像を拡大`} onClick={e=>open(event,e.currentTarget)}><img src={mediaHref(event.image)} alt={event.imageAlt} loading="lazy" decoding="async"/><span><ArrowsOut size={14} aria-hidden="true"/>拡大する</span></button>{event.caption&&<figcaption>{event.caption}</figcaption>}</figure>}
           </li>;
         })}</ol>
       </section>)}</div>:<p className="chronology-empty">この年の該当する取り組みはありません。</p>}
     </section>;
   })}
   {(chronology.outcomeTitle||chronology.outcome)&&<aside className="chronology-outcome"><span className="eyebrow">NEXT</span><h3>{chronology.outcomeTitle}</h3><p>{chronology.outcome}</p></aside>}
   <dialog ref={dialogRef} className="product-lightbox chronology-lightbox" aria-labelledby={titleId} onCancel={e=>{e.preventDefault();close();}} onPointerDown={e=>{backdropPress.current=e.target===e.currentTarget;}} onClick={e=>{if(backdropPress.current&&e.target===e.currentTarget)close();backdropPress.current=false;}}>
     {selected&&<div className="product-lightbox-panel"><div className="product-lightbox-header"><h3 id={titleId}>{selected.title}</h3><button type="button" className="product-lightbox-close" autoFocus aria-label="拡大画像を閉じる" onClick={close}>閉じる<X size={20} aria-hidden="true"/></button></div><div className="product-lightbox-image"><img src={mediaHref(selected.image)} alt={selected.imageAlt}/></div>{selected.caption&&<p className="chronology-lightbox-caption">{selected.caption}</p>}</div>}
   </dialog>
 </section>;
}
