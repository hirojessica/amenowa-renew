import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const script=readFileSync(new URL('../public/assets/analytics.js',import.meta.url),'utf8');
const id='G-LRG73BYTV4';
function environment(url,{base='/',cookie='',disabled=false}={}){
 const tags=[];
 const context=vm.createContext({location:new URL(url),window:disabled?{[`ga-disable-${id}`]:true}:{},document:{cookie,currentScript:{dataset:{siteBase:base}},createElement:()=>({}),head:{appendChild:tag=>tags.push(tag)}}});
 return {context,tags,run(){vm.runInContext(script,context);}};
}

test('the existing GA4 stream starts once on production, with one automatic page view',()=>{
 for(const host of ['amenowa.co.jp','www.amenowa.co.jp']){
  const env=environment(`https://${host}/products/meguru/`);env.run();env.run();
  assert.equal(env.tags.length,1);
  assert.equal(env.tags[0].src,`https://www.googletagmanager.com/gtag/js?id=${id}`);
  assert.equal(env.tags[0].async,true);
  const commands=Array.from(env.context.window.dataLayer,args=>Array.from(args));
  assert.equal(commands.length,2);
  assert.equal(commands[0][0],'js');
  assert.deepEqual(commands[1],['config',id]);
 }
});

test('demo, local, staging, non-HTTPS and nonstandard ports never load Google or create a queue',()=>{
 for(const url of ['https://hirojessica.github.io/amenowa-renew/','http://localhost:4174/','https://localhost/','http://127.0.0.1:4174/','https://staging.amenowa.co.jp/','https://amenowa.co.jp.example.com/','http://amenowa.co.jp/','https://amenowa.co.jp:8443/']){
  const env=environment(url);env.run();
  assert.equal(env.tags.length,0,url);assert.equal(env.context.window.dataLayer,undefined,url);
 }
 for(const base of ['/amenowa-renew/','/preview/','']){
  const env=environment('https://amenowa.co.jp/',{base});env.run();
  assert.equal(env.tags.length,0);assert.equal(env.context.window.dataLayer,undefined);
 }
});

test('existing MonsterInsights opt-out cookies and GA disable flags remain effective',()=>{
 for(const options of [{cookie:`other=1; ga-disable-${id}=true; another=2`},{disabled:true}]){
  const env=environment('https://amenowa.co.jp/',options);env.run();
  assert.equal(env.tags.length,0);assert.equal(env.context.window.dataLayer,undefined);
  assert.equal(env.context.window[`ga-disable-${id}`],true);
 }
 const env=environment('https://amenowa.co.jp/',{cookie:`other-ga-disable-${id}=true`});env.run();assert.equal(env.tags.length,1);
});
