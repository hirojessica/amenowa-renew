/* GA4 stream verified on amenowa.co.jp on 2026-09-08. */
(() => {
  'use strict';
  const measurementId = 'G-LRG73BYTV4';
  const productionHosts = ['amenowa.co.jp', 'www.amenowa.co.jp'];
  const siteBase = document.currentScript?.dataset.siteBase;

  // Both the public domain and a root-path build are required. Preview builds
  // remain untracked even when uploaded beneath the production domain.
  if (location.protocol !== 'https:' || location.port ||
      !productionHosts.includes(location.hostname) || siteBase !== '/') return;

  const disableKey = `ga-disable-${measurementId}`;
  const optedOut = document.cookie.split(';').some(cookie => cookie.trim() === `${disableKey}=true`);
  if (optedOut) window[disableKey] = true;
  if (window[disableKey] || window.__amenowaGa4Started) return;
  window.__amenowaGa4Started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Ordinary links load a new HTML document. config sends the page_view;
  // do not also send it from a React effect or from anchor/filter interactions.
  window.gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.id = 'amenowa-ga4-tag';
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tag);
})();
