import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePost,parseCase,loadCases} from '../scripts/content.mjs';
import {mkdtempSync,writeFileSync,unlinkSync,rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';
const source=(extra='',body='本文')=>`---\ntitle: Test\nslug: test\ndate: '2026-09-06'\ncategory: お知らせ\npublished: true\n${extra}\n---\n${body}`;
test('drafts and future articles are excluded',()=>{assert.equal(parsePost(source().replace('published: true','published: false'),'test.md','2026-09-06'),null);assert.equal(parsePost(source(),'test.md','2026-09-05'),null);});
test('published content has safe HTML and base-prefixed media',()=>{const p=parsePost(source('',`## 見出し\n<script>alert(1)</script>\n<a href="javascript:alert(1)">x</a>\n![alt](/uploads/test.png)`),'test.md','2026-09-06');assert.match(p.html,/<h2>見出し/);assert.doesNotMatch(p.html,/<script|javascript:/);assert.match(p.html,/amenowa-renew\/uploads\/test.png/);});
test('invalid routes, dates and categories fail the build',()=>{assert.throws(()=>parsePost(source().replace('slug: test','slug: ../../secret'),'test.md'));assert.throws(()=>parsePost(source().replace('2026-09-06','2026-02-30'),'test.md'));assert.throws(()=>parsePost(source().replace('category: お知らせ','category: unknown'),'test.md'));});
test('uploaded PDF links work under the demo base while external links are preserved',()=>{
 const p=parsePost(source('', '[PDF](/uploads/wordpress/report.pdf)\n\n[Source](https://example.com/report)\n\n[Unsafe](javascript:alert(1))'),'test.md','2026-09-06');
 assert.match(p.html, /href="\/amenowa-renew\/uploads\/wordpress\/report\.pdf"/);
 assert.match(p.html, /href="https:\/\/example\.com\/report"/);
 assert.doesNotMatch(p.html, /javascript:/);
});
test('external articles need a safe URL, do not require a body, and do not publish unused body content',()=>{
 const link=parsePost(source('kind: link\nexternalUrl: https://note.com/example/n/demo',''),'link.md','2026-09-06');
 assert.equal(link.externalUrl,'https://note.com/example/n/demo');
 assert.equal(link.html,'');
 assert.throws(()=>parsePost(source('kind: link',''),'link.md'));
 for(const url of ['javascript:alert(1)','http://note.com/example','https://user:secret@note.com/example'])assert.throws(()=>parsePost(source(`kind: link\nexternalUrl: ${url}`,''),'link.md'));
 const copied=parsePost(source('sourceUrl: https://note.com/example/n/demo','## コピーした本文'),'copy.md','2026-09-06');
 assert.equal(copied.externalUrl,'');assert.match(copied.html,/<h2>コピーした本文/);assert.equal(copied.sourceUrl,'https://note.com/example/n/demo');
});
test('case studies exclude drafts, validate routes and stages, and sanitize the body',()=>{
 const item=`---\ntitle: Example\nslug: example\nheadline: Example case\npublished: true\ntimeline:\n  - title: 調べる\n    description: 観測\n---\n<script>alert(1)</script>\n[写真](/uploads/case.jpg)`;
 const parsed=parseCase(item,'example.md');
 assert.equal(parsed.timeline[0].detail,'未定');assert.doesNotMatch(parsed.html,/<script/);assert.match(parsed.html,/amenowa-renew\/uploads\/case.jpg/);
 assert.equal(parseCase(item.replace('published: true','published: false'),'example.md'),null);
 assert.throws(()=>parseCase(item.replace('slug: example','slug: ../example'),'example.md'));
 assert.throws(()=>parseCase(item.replace('    description: 観測',''),'example.md'));
});

const caseSource=(slug,extra='',stageExtra='')=>`---\ntitle: ${slug}\nslug: ${slug}\nheadline: Example case\npublished: true\n${extra}\ntimeline:\n  - title: 調べる\n    description: 観測\n${stageExtra}\n---\n補足本文`;
test('CMS additions can be ordered after Rusutsu and unpublished cases stay out',t=>{
 const dir=mkdtempSync(path.join(tmpdir(),'amenowa-cases-'));
 const files=['rusutsu-resort.md','added-case.md','draft.md'];
 t.after(()=>{for(const name of files)unlinkSync(path.join(dir,name));rmdirSync(dir);});
 writeFileSync(path.join(dir,files[0]),caseSource('rusutsu-resort','order: 10'));
 writeFileSync(path.join(dir,files[1]),caseSource('added-case','order: 20'));
 writeFileSync(path.join(dir,files[2]),caseSource('draft','order: 0').replace('published: true','published: false'));
 assert.deepEqual(loadCases(dir).map(item=>item.slug),['rusutsu-resort','added-case']);
 writeFileSync(path.join(dir,files[1]),caseSource('added-case','order: 5'));
 assert.deepEqual(loadCases(dir).map(item=>item.slug),['added-case','rusutsu-resort']);
 writeFileSync(path.join(dir,files[1]),caseSource('rusutsu-resort','order: 20'));
 assert.throws(()=>loadCases(dir),/Duplicate case study slugs/);
});
test('service association is optional, supports several services, and retains detailed copy',()=>{
 const legacy=parseCase(caseSource('legacy'),'legacy.md');
 assert.deepEqual(legacy.timeline[0].services,[]);
 assert.equal(legacy.timeline[0].serviceDetail,'未定');
 const item=parseCase(caseSource('multi','order: 20','    services: [strategy, field]\n    serviceDetail: |\n      背景と課題\n      具体的な取り組み'),'multi.md');
 assert.deepEqual(item.timeline[0].services,['strategy','field']);
 assert.equal(item.timeline[0].serviceDetail,'背景と課題\n具体的な取り組み\n');
 for(const invalid of ['-1','1.5',"'abc'","'20'"])assert.throws(()=>parseCase(caseSource('bad',`order: ${invalid}`),'bad.md'),/order/);
 for(const invalid of ['strategy','[unknown]'])assert.throws(()=>parseCase(caseSource('bad','','    services: '+invalid),'bad.md'),/service/);
});

const chronologyCase=()=>({title:'Example',slug:'example',headline:'Project',published:true,chronology:{title:'Project timeline',years:[{year:2026,phase:'つなぐ',periods:[{label:'夏〜通年',events:[{title:'取り組み',category:'research',image:'/uploads/cases/現地調査.jpg',imageAlt:'川の調査',caption:'調査の様子'}]}]}]}});
const readChronology=data=>parseCase(matter.stringify('',data),'example.md');

test('a CMS chronology works without legacy stages, supports later images and retains optional narrative',()=>{
 const data=chronologyCase();
 data.projectIntro='水を知る。<br>測る。<script>alert(1)</script>';
 data.storySections=[{label:'01 戦略',headline:'水を起点に',body:'**取り組み**\n\n![写真](/uploads/cases/photo.jpg)<script>bad()</script>'}];
 const item=readChronology(data);
 assert.deepEqual(item.timeline,[]);
 const event=item.chronology.years[0].periods[0].events[0];
 assert.equal(event.image,'/uploads/cases/現地調査.jpg');
 assert.equal(event.imageAlt,'川の調査');assert.equal(event.caption,'調査の様子');
 assert.match(item.projectIntro,/<br\s*\/>/);assert.doesNotMatch(item.projectIntro,/<script/);
 assert.match(item.storySections[0].html,/<strong>取り組み<\/strong>/);
 assert.match(item.storySections[0].html,/amenowa-renew\/uploads\/cases\/photo.jpg/);
 assert.doesNotMatch(item.storySections[0].html,/<script/);
 delete data.chronology.years[0].periods[0].events[0].image;
 assert.equal(readChronology(data).chronology.years[0].periods[0].events[0].image,'');
 const legacy=parseCase(caseSource('legacy'),'legacy.md');
 assert.equal(legacy.chronology,null);assert.deepEqual(legacy.storySections,[]);
});

test('CMS years sort chronologically while preserving period order and rejecting ambiguous years or categories',()=>{
 const data=chronologyCase();
 data.chronology.years.push({...structuredClone(data.chronology.years[0]),year:2024});
 assert.deepEqual(readChronology(data).chronology.years.map(year=>year.year),[2024,2026]);
 data.chronology.years[1].year=2026;
 assert.throws(()=>readChronology(data),/Duplicate chronology year/);
 for(const invalid of ['2026',2026.5,0]){
  const bad=chronologyCase();bad.chronology.years[0].year=invalid;
  assert.throws(()=>readChronology(bad),/Invalid chronology year/);
 }
 const unknown=chronologyCase();unknown.chronology.years[0].periods[0].events[0].category='field';
 assert.throws(()=>readChronology(unknown),/event\/category/);
 const empty=chronologyCase();empty.chronology.years[0].periods[0].events=[];
 assert.throws(()=>readChronology(empty),/requires events/);
});

test('chronology images reject unsafe or non-public locations',()=>{
 for(const image of ['javascript:alert(1)','file:///E:/private.jpg','http://example.com/photo.jpg','https://user:secret@example.com/photo.jpg','/uploads/../private.jpg','/uploads/%2e%2e/private.jpg','/uploads/case%5cprivate.jpg']){
  const bad=chronologyCase();bad.chronology.years[0].periods[0].events[0].image=image;
  assert.throws(()=>readChronology(bad),/Invalid (case image|public URL)/);
 }
 const publicImage=chronologyCase();publicImage.chronology.years[0].periods[0].events[0].image='https://example.com/photo.jpg';
 assert.equal(readChronology(publicImage).chronology.years[0].periods[0].events[0].image,'https://example.com/photo.jpg');
});
