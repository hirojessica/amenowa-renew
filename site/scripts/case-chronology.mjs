import {caseCategories} from '../src/caseCategories.js';

export function parseChronology(data,filename,validateImage){
 if(data==null)return null;
 if(!data||typeof data!=='object'||Array.isArray(data)||!data.title||!Array.isArray(data.years)||!data.years.length)throw new Error(`Chronology requires a title and years: ${filename}`);
 const years=data.years.map(year=>{
  if(!year||!Number.isInteger(year.year)||year.year<1900||year.year>9999||!year.phase||!Array.isArray(year.periods)||!year.periods.length)throw new Error(`Invalid chronology year: ${filename}`);
  const periods=year.periods.map(period=>{
   if(!period?.label||!Array.isArray(period.events)||!period.events.length)throw new Error(`Chronology period requires events: ${filename}`);
   const events=period.events.map(event=>{
    if(!event?.title||!caseCategories.some(category=>category.id===event.category))throw new Error(`Invalid chronology event/category: ${filename}`);
    const image=validateImage(event.image,filename);
    return {title:String(event.title),category:event.category,next:String(event.next||''),related:String(event.related||''),image,imageAlt:String(event.imageAlt||event.title),caption:String(event.caption||'')};
   });
   return {label:String(period.label),events};
  });
  return {year:year.year,phase:String(year.phase),description:String(year.description||''),periods};
 });
 if(new Set(years.map(year=>year.year)).size!==years.length)throw new Error(`Duplicate chronology year: ${filename}`);
 return {title:String(data.title),intro:String(data.intro||''),outcomeTitle:String(data.outcomeTitle||''),outcome:String(data.outcome||''),years:years.sort((a,b)=>a.year-b.year)};
}
