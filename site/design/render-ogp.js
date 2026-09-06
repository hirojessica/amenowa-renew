async page => {
  await page.setViewportSize({width:1200,height:630});
  await page.evaluate(async()=>{
    await document.fonts.ready;
    await Promise.all([...document.images].map(img=>img.decode()));
    if(!document.fonts.check('54px OgpSerif','水の未来を')||!document.fonts.check('21px OgpSans','観測とデータ'))throw Error('OGP fonts did not load.');
  });
  const art=page.locator('.share-art');
  await art.screenshot({path:'public/assets/ogp-amenowa-v1.png'});
  return {size:await art.boundingBox(),image:'site/public/assets/ogp-amenowa-v1.png'};
}
