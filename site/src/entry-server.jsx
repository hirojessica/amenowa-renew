import React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from './App.jsx';
import {staticRoutes,pageMeta} from './site.js';
import posts from './generated/news.json';
export const routes=[...staticRoutes,...posts.map(p=>`news/${p.slug}/`)];
export function render(path){const p=posts.find(p=>path===`news/${p.slug}/`);return {html:renderToString(<App initialPath={path}/>),...(p?{title:`${p.title} | amenowa`,description:p.excerpt}:pageMeta(path))};}
