import {readdirSync, readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';

export function publicLink(value, filename) {
 if(!value)return '';
 let url;
 try{url=new URL(String(value));}catch{throw new Error(`Invalid public URL: ${filename}`);}
 if(url.protocol!=='https:'||url.username||url.password)throw new Error(`Invalid public URL: ${filename}`);
 return url.href;
}

export function renderBody(content) {
 const base=process.env.SITE_BASE||'/amenowa-renew/';
 const assetHref=url=>url?.startsWith('/uploads/')?`${base}${url.slice(1)}`:url;
 return sanitizeHtml(marked.parse(content),{
  allowedTags:[...sanitizeHtml.defaults.allowedTags,'img'],
  allowedAttributes:{a:['href','title','rel'],img:['src','alt','title','loading'],'*':['id']},
  allowedSchemes:['https','http','mailto'],
  transformTags:{img:(tag,attrs)=>({tagName:tag,attribs:{...attrs,src:assetHref(attrs.src),loading:'lazy'}}),a:(tag,attrs)=>({tagName:tag,attribs:{...attrs,href:assetHref(attrs.href)}})}
 });
}

export function parsePost(source, filename, today = new Date().toLocaleDateString('sv-SE', {timeZone:'Asia/Tokyo'})) {
 const {data,content}=matter(source);
 if(data.published !== true) return null;
 const slug=String(data.slug || path.basename(filename,'.md'));
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid news slug: ${filename}`);
 const date=data.date instanceof Date ? data.date.toISOString().slice(0,10) : String(data.date || '').slice(0,10);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10)!==date) throw new Error(`Invalid date: ${filename}`);
 if(date>today) return null;
 const time=String(data.time || '00:00');
 if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error(`Invalid publication time: ${filename}`);
 if(!data.title || !['お知らせ','ブログ','プレスリリース'].includes(data.category)) throw new Error(`Missing title or invalid category: ${filename}`);
 const kind=data.kind||'article';
 if(!['article','link'].includes(kind))throw new Error(`Invalid article kind: ${filename}`);
 const externalUrl=kind==='link'?publicLink(data.externalUrl,filename):'';
 if(kind==='link'&&!externalUrl)throw new Error(`External link requires a URL: ${filename}`);
 if(kind==='article'&&!content.trim())throw new Error(`Article requires body text: ${filename}`);
 const sourceUrl=publicLink(data.sourceUrl,filename);
 return {slug,title:String(data.title),date,time,category:data.category,excerpt:String(data.excerpt || ''),image:String(data.image || ''),imageAlt:String(data.imageAlt || ''),kind,externalUrl,sourceUrl,html:kind==='article'?renderBody(content):''};
}

export function parseCase(source,filename){
 const {data,content}=matter(source);
 if(data.published!==true)return null;
 const slug=String(data.slug||path.basename(filename,'.md'));
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||!data.title||!data.headline)throw new Error(`Invalid case study: ${filename}`);
 if(!Array.isArray(data.timeline)||!data.timeline.length||data.timeline.some(step=>!step.title||!step.description))throw new Error(`Case study requires a timeline: ${filename}`);
 const image=String(data.image||'');
 if(image&&!image.startsWith('/uploads/'))publicLink(image,filename);
 return {slug,title:String(data.title),client:String(data.client||''),headline:String(data.headline),excerpt:String(data.excerpt||''),image,imageAlt:String(data.imageAlt||''),timeline:data.timeline.map(step=>({title:String(step.title),description:String(step.description),detail:String(step.detail||'未定')})),html:renderBody(content)};
}

export function loadCases(dir){
 const items=readdirSync(dir).filter(file=>file.endsWith('.md')).sort().map(file=>parseCase(readFileSync(path.join(dir,file),'utf8'),file)).filter(Boolean);
 if(new Set(items.map(item=>item.slug)).size!==items.length)throw new Error('Duplicate case study slugs');
 return items;
}
export function loadPosts(dir) {
 const posts=readdirSync(dir).filter(f=>f.endsWith('.md')).map(f=>parsePost(readFileSync(path.join(dir,f),'utf8'),f)).filter(Boolean).sort((a,b)=>b.date.localeCompare(a.date)||b.time.localeCompare(a.time)||a.slug.localeCompare(b.slug));
 if(new Set(posts.map(p=>p.slug)).size!==posts.length) throw new Error('Duplicate news slugs');
 return posts;
}
export function generate() {
 const posts=loadPosts(path.resolve('content/news'));
 mkdirSync('src/generated',{recursive:true});
 writeFileSync('src/generated/news.json',JSON.stringify(posts,null,2)+'\n');
 const cases=loadCases(path.resolve('content/cases'));
 writeFileSync('src/generated/cases.json',JSON.stringify(cases,null,2)+'\n');
 console.log(`Content: ${posts.length} published insights, ${cases.length} case studies generated.`);
}
