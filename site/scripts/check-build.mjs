import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist/client');const routes=JSON.parse(readFileSync(path.join(root,'route-manifest.json'),'utf8'));const failures=[];
const base=process.env.SITE_BASE||'/amenowa-renew/';
for(const route of [...routes,'404.html']){
 const html=readFileSync(path.join(root,route,route==='404.html'?'':'index.html'),'utf8');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(`${route}: must contain one H1`);
 if(!html.includes('noindex,nofollow'))failures.push(`${route}: demo noindex missing`);
 for(const match of html.matchAll(/(?:href|src)="([^"?#]*)/g)){
  if(!match[1].startsWith(base)||match[1].startsWith('//'))continue;
  const relative=decodeURIComponent(match[1].slice(base.length));
  const target=path.join(root,relative,relative.endsWith('/')||relative===''?'index.html':'');
  if(!existsSync(target))failures.push(`${route}: missing ${relative}`);
 }
 const head=html.split('</head>')[0];
 const loaders=[...head.matchAll(/<script\b[^>]*src="[^"]*assets\/analytics\.js"[^>]*><\/script>/g)];
 if(loaders.length!==1||!loaders[0][0].includes(`src="${base}assets/analytics.js"`)||!loaders[0][0].includes(`data-site-base="${base}"`)||!loaders[0][0].includes('defer'))failures.push(`${route}: missing or duplicate domain-gated GA4 loader`);
}
if(!existsSync(path.join(root,'assets/analytics.js')))failures.push('Missing GA4 loader asset');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Build validation passed: ${routes.length} pages, internal links, assets, headings, demo indexing, domain-gated GA4.`);
