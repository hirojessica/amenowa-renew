import test from 'node:test';
import assert from 'node:assert/strict';
import {publicSiteUrl,socialMeta} from '../scripts/social-meta.mjs';

test('nested share URLs and images retain the deployment base path',()=>{
  const tags=socialMeta({title:'会社概要 | amenowa',description:'会社概要'},'about/',publicSiteUrl('https://hirojessica.github.io/amenowa-renew'));
  assert.match(tags,/property="og:url" content="https:\/\/hirojessica.github.io\/amenowa-renew\/about\/"/);
  assert.match(tags,/property="og:image" content="https:\/\/hirojessica.github.io\/amenowa-renew\/assets\/ogp-amenowa-v1.png"/);
  assert.match(tags,/name="twitter:card" content="summary_large_image"/);
  const production=socialMeta({title:'amenowa',description:'水'},'',publicSiteUrl('https://amenowa.co.jp'));
  assert.match(production,/property="og:url" content="https:\/\/amenowa.co.jp\/"/);
  assert.doesNotMatch(production,/github.io|amenowa-renew/);
});

test('CMS title and description are escaped inside static head metadata',()=>{
  const tags=socialMeta({title:'水 "&" <未来>',description:'"><script>alert(1)</script>',type:'article',publishedTime:'2026-09-05T17:51:00+09:00'},'news/example/');
  assert.match(tags,/水 &quot;&amp;&quot; &lt;未来&gt;/);
  assert.doesNotMatch(tags,/<script>/);
  assert.match(tags,/property="og:type" content="article"/);
  assert.match(tags,/property="article:published_time" content="2026-09-05T17:51:00\+09:00"/);
});

test('deployment URL rejects private credentials and non-public URL forms',()=>{
  for(const url of ['http://amenowa.co.jp','https://user:secret@amenowa.co.jp','https://amenowa.co.jp/?token=x','https://amenowa.co.jp/#top','not a URL'])assert.throws(()=>publicSiteUrl(url));
});
