import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {publicSiteUrl} from './social-meta.mjs';

const root=path.resolve('dist/client');
const siteUrl=publicSiteUrl();
const routes=JSON.parse(readFileSync(path.join(root,'route-manifest.json'),'utf8'));
const expectedImage=new URL('assets/ogp-amenowa-v3.png',siteUrl).href;
const required=['og:title','og:type','og:url','og:description','og:image','og:image:width','og:image:height','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'];
for(const route of routes){
  const html=readFileSync(path.join(root,route,'index.html'),'utf8');
  const head=html.match(/<head>([\s\S]*?)<\/head>/)[1];
  const values={};
  for(const [,key,value] of head.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]*)"\s*\/>/g)){
    if(key.startsWith('og:')||key.startsWith('twitter:'))assert.equal(values[key],undefined,`${route}: duplicate ${key}`);
    values[key]=value;
  }
  for(const key of required)assert.ok(values[key],`${route}: missing ${key} in initial HTML`);
  assert.equal(values['og:title'],head.match(/<title>(.*?)<\/title>/)[1],`${route}: title mismatch`);
  assert.equal(values['twitter:title'],values['og:title']);
  assert.equal(values['twitter:description'],values['og:description']);
  assert.equal(values['og:url'],new URL(route,siteUrl).href,`${route}: invalid public URL`);
  assert.equal(values['og:image'],expectedImage);
  assert.equal(values['twitter:image'],expectedImage);
  assert.equal(values['twitter:card'],'summary_large_image');
  assert.equal(values['og:image:width'],'1200');
  assert.equal(values['og:image:height'],'630');
  assert.equal(values['og:type'],/^news\/.+\/$/.test(route)?'article':'website');
}
const image=readFileSync(path.join(root,'assets/ogp-amenowa-v3.png'));
assert.equal(image.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
assert.equal(image.readUInt32BE(16),1200);
assert.equal(image.readUInt32BE(20),630);
assert.ok(image.length<1_000_000,'Keep the social image under 1 MB.');
console.log(`Social metadata passed: ${routes.length} static pages, article titles, absolute URLs, 1200x630 PNG (${image.length} bytes).`);
