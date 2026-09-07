import {useEffect,useId,useRef,useState} from 'react';
import {ArrowsOut,X} from '@phosphor-icons/react';
import {Media} from './App.jsx';
import {href} from './site.js';

export function ProductGallery({product,idPrefix}) {
  const [selected,setSelected]=useState(null);
  const dialogRef=useRef(null);
  const openerRef=useRef(null);
  const backdropPress=useRef(false);
  const titleId=useId();

  useEffect(()=>{
    if(!selected)return;
    const dialog=dialogRef.current;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialog.showModal();
    return()=>{
      dialog.close();
      document.body.style.overflow=previousOverflow;
      openerRef.current?.focus({preventScroll:true});
    };
  },[selected]);

  function open(screen,event) {
    openerRef.current=event.currentTarget;
    setSelected(screen);
  }

  function close() {
    setSelected(null);
  }

  return <>
    <div className={`screen-placeholders${product.slug==='meguru'?' screen-placeholders-mobile':''}`}>
      {product.screens.map((screen,index)=><figure key={screen.name} id={idPrefix?`${idPrefix}-${index}`:undefined}>
        {screen.src
          ? <button type="button" className="product-screen-link" onClick={event=>open(screen,event)} aria-haspopup="dialog" aria-label={`${product.name} ${screen.name}の画面を拡大`}>
              <img src={href(screen.src)} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" decoding="async"/>
            </button>
          : <Media name={`${product.name} / ${screen.name}`} ratio={product.slug==='meguru'?'0.56':'1.6'}/>}
        <figcaption><span>{screen.name}</span>{screen.src&&<button type="button" className="screen-enlarge" onClick={event=>open(screen,event)} aria-haspopup="dialog" aria-label={`${screen.name}の画面を拡大`}>拡大する<ArrowsOut size={13} aria-hidden="true"/></button>}</figcaption>
        {screen.note&&<p className="product-screen-detail-note">{screen.note}</p>}
      </figure>)}
    </div>
    <dialog ref={dialogRef} className={`product-lightbox${product.slug==='meguru'?' product-lightbox-portrait':''}`} aria-labelledby={titleId}
      onCancel={event=>{event.preventDefault();close();}}
      onPointerDown={event=>{backdropPress.current=event.target===event.currentTarget;}}
      onClick={event=>{if(backdropPress.current&&event.target===event.currentTarget)close();backdropPress.current=false;}}>
      {selected&&<div className="product-lightbox-panel">
        <div className="product-lightbox-header">
          <h3 id={titleId}>{product.name}<span>{selected.name}</span></h3>
          <button type="button" className="product-lightbox-close" onClick={close} autoFocus aria-label="拡大画像を閉じる">閉じる<X size={20} aria-hidden="true"/></button>
        </div>
        <div className="product-lightbox-image">
          <img src={href(selected.src)} alt={selected.alt} width={selected.width} height={selected.height}/>
        </div>
        {selected.note&&<p className="product-screen-detail-note">{selected.note}</p>}
      </div>}
    </dialog>
  </>;
}
