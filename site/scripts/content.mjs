import {readdirSync, readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';

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
 const base = process.env.SITE_BASE || '/amenowa-renew/';
 const assetHref=url=>url?.startsWith('/uploads/')?`${base}${url.slice(1)}`:url;
 const html=sanitizeHtml(marked.parse(content), {
  allowedTags:[...sanitizeHtml.defaults.allowedTags,'img'],
  allowedAttributes:{a:['href','title','rel'],img:['src','alt','title','loading'], '*':['id']},
  allowedSchemes:['https','http','mailto'],
  transformTags:{
   img:(tag,attrs)=>({tagName:tag,attribs:{...attrs,src:assetHref(attrs.src),loading:'lazy'}}),
   a:(tag,attrs)=>({tagName:tag,attribs:{...attrs,href:assetHref(attrs.href)}})
  }
 });
 return {slug,title:String(data.title),date,time,category:data.category,excerpt:String(data.excerpt || ''),image:String(data.image || ''),imageAlt:String(data.imageAlt || ''),html};
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
 console.log(`NEWS: ${posts.length} published articles generated.`);
}
