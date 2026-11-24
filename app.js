'use strict';
const $ = s => document.querySelector(s);
const config = window.ART_STORE_CONFIG;
let artworks = [], activeFilter = 'All', selected = null, previousFocus = null;
const currency = n => new Intl.NumberFormat('en-NG',{style:'currency',currency:config.currency,maximumFractionDigits:0}).format(n);
function render(){
 const items = artworks.filter(a=>activeFilter==='All'||a.category===activeFilter).slice();
 const sort=$('#sort').value;
 if(sort==='low')items.sort((a,b)=>a.price-b.price);if(sort==='high')items.sort((a,b)=>b.price-a.price);if(sort==='name')items.sort((a,b)=>a.title.localeCompare(b.title));
 $('#gallery').replaceChildren();
 for(const art of items){
 const button=document.createElement('button');button.className='art-card';button.setAttribute('aria-label',`View ${art.title}`);
 const frame=document.createElement('div');frame.className='art-image';const img=document.createElement('img');img.src=window.ARTWORK_IMAGES[art.id]||'assets/art-1.jpg';img.alt=art.title;img.loading='lazy';frame.append(img);const arrow=document.createElement('span');arrow.className='view';arrow.textContent='';arrow.setAttribute('aria-hidden','true');frame.append(arrow);
 const info=document.createElement('div');info.className='art-info';const text=document.createElement('div');const title=document.createElement('h2');title.textContent=art.title;const medium=document.createElement('p');medium.textContent=`${art.medium} · ${art.dimensions}`;text.append(title,medium);const price=document.createElement('span');price.className='art-price';price.textContent=art.status==='sold'?'Sold':currency(art.price);info.append(text,price);button.append(frame,info);button.addEventListener('click',()=>openArtwork(art));$('#gallery').append(button);
 }
 $('#result-count').textContent=items.length?`${items.length} ${items.length===1?'work':'works'} in the collection`:'No artworks in this category yet.';$('#count').textContent=artworks.length;
}
async function load(){
 $('#error').hidden=true;$('#result-count').textContent='Loading collection…';
 try{const res=await fetch(config.apiUrl||'artworks.json',{headers:{Accept:'application/json'}});if(!res.ok)throw Error('Collection unavailable');const json=await res.json();const data=Array.isArray(json)?json:json.data;
 if(!Array.isArray(data)||!data.every(a=>a.id!=null&&typeof a.title==='string'&&['Charcoal','Painting','Digital'].includes(a.category)&&typeof a.medium==='string'&&typeof a.dimensions==='string'&&Number.isFinite(a.price)&&a.price>=0))throw Error('Invalid artwork response');artworks=data;$('#demo-label').hidden=Boolean(config.apiUrl);render();
 }catch(e){$('#gallery').replaceChildren();$('#result-count').textContent='Collection unavailable';$('#error').hidden=false;}
}
function showDialog(dialog){previousFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
function openArtwork(art){selected=art;$('#detail-title').textContent=art.title;$('#detail-medium').textContent=art.category==='Digital'?'DIGITAL ART':art.category.toUpperCase();$('#detail-description').textContent=art.description||'';$('#detail-img').src=window.ARTWORK_IMAGES[art.id]||'assets/art-1.jpg';$('#detail-img').alt=art.title;$('#detail-price').textContent=currency(art.price);$('#detail-facts').replaceChildren();for(const [key,value] of [['Medium',art.medium],['Dimensions',art.dimensions],['Year',art.year||'—'],['Availability',art.status==='sold'?'Sold':'Available']]){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);$('#detail-facts').append(row);}$('#purchase').disabled=art.status==='sold';$('#purchase').textContent=art.status==='sold'?'Artwork sold':'Purchase artwork';$('#purchase-note').textContent='Payment integration is coming soon. No payment will be taken.';showDialog($('#art-dialog'));}
for(const b of document.querySelectorAll('[data-filter]'))b.addEventListener('click',()=>{activeFilter=b.dataset.filter;for(const el of document.querySelectorAll('[data-filter]')){const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));}render();});
$('#sort').addEventListener('change',render);$('#retry').addEventListener('click',load);$('#purchase').addEventListener('click',()=>{$('#purchase-note').textContent='Checkout is not connected yet. This preview cannot accept orders or payments.';});$('#about-open').addEventListener('click',()=>showDialog($('#about-dialog')));$('#back-collection').addEventListener('click',()=>{$('#about-dialog').close();$('#collection').scrollIntoView({behavior:'smooth'});});
for(const dialog of document.querySelectorAll('dialog')){dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});}
$('#year').textContent=new Date().getFullYear();load();
