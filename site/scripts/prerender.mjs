import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {routes,render} from '../dist/ssr/entry-server.js';
import {socialMeta,publicSiteUrl} from './social-meta.mjs';
const siteUrl=publicSiteUrl();
const template=readFileSync('dist/client/index.html','utf8');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const route of [...routes,'404/']){
 const page=render(route);
 const html=template
  .replace('<div id="root"></div>',()=>`<div id="root">${page.html}</div>`)
  .replace(/<title>.*?<\/title>/,()=>`<title>${escape(page.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/>/,()=>`<meta name="description" content="${escape(page.description)}" />`)
  .replace('<!--social-meta-->',()=>socialMeta(page,route,siteUrl));
 const output=route==='404/'?'dist/client/404.html':path.join('dist/client',route,'index.html');mkdirSync(path.dirname(output),{recursive:true});writeFileSync(output,html);
}
writeFileSync('dist/client/.nojekyll','');
writeFileSync('dist/client/route-manifest.json',JSON.stringify(routes,null,2));
console.log(`Prerendered ${routes.length} pages + 404.`);
