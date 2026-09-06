import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePost} from '../scripts/content.mjs';
const source=(extra='',body='本文')=>`---\ntitle: Test\nslug: test\ndate: '2026-09-06'\ncategory: お知らせ\npublished: true\n${extra}\n---\n${body}`;
test('drafts and future articles are excluded',()=>{assert.equal(parsePost(source().replace('published: true','published: false'),'test.md','2026-09-06'),null);assert.equal(parsePost(source(),'test.md','2026-09-05'),null);});
test('published content has safe HTML and base-prefixed media',()=>{const p=parsePost(source('',`## 見出し\n<script>alert(1)</script>\n<a href="javascript:alert(1)">x</a>\n![alt](/uploads/test.png)`),'test.md','2026-09-06');assert.match(p.html,/<h2>見出し/);assert.doesNotMatch(p.html,/<script|javascript:/);assert.match(p.html,/amenowa-renew\/uploads\/test.png/);});
test('invalid routes, dates and categories fail the build',()=>{assert.throws(()=>parsePost(source().replace('slug: test','slug: ../../secret'),'test.md'));assert.throws(()=>parsePost(source().replace('2026-09-06','2026-02-30'),'test.md'));assert.throws(()=>parsePost(source().replace('category: お知らせ','category: unknown'),'test.md'));});
