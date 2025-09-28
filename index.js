import{a as w,S as q,i as a}from"./assets/vendor-BSTwZ_tR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const x="52375997-ed6a7f09fc050a8946ebeea10",$="https://pixabay.com/api/",g=async(r,e)=>{try{return(await w.get($,{params:{key:x,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}catch(o){throw o}},d=document.querySelector("#gallery"),f=document.querySelector("#loader"),C=new q("#gallery a",{captionsData:"alt",captionDelay:250,spinner:!0});function h(r){if(!d)return;const e=r.map(({webformatURL:o,largeImageURL:c,tags:t,likes:s,views:i,comments:v,downloads:S})=>`<li class="gallery-item">
  <a class="gallery-link" href='${c}'>
    <img
    loading="lazy"
      class="gallery-image"
      src="${o}"
      alt="${t}"
    />
      </a>
     <ul class="stats">
                <li class="stats-item">
                    <p class="stats-title">Likes</p>
                    <p class="stat-content">${s}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Views</p>
                    <p class="stat-content">${i}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Comments</p>
                    <p class="stat-content">${v}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Downloads</p>
                    <p class="stat-content">${S}</p>
                </li>
            </ul>
</li>`).join("");d.insertAdjacentHTML("beforeend",e),C.refresh()}function O(){d&&(d.innerHTML="")}function y(){f&&f.classList.add("is-active")}function L(){f&&f.classList.remove("is-active")}const l=document.querySelector("#search-form"),z=document.querySelector('input[name="search-text"]'),p=document.querySelector("#search-btn"),m=document.querySelector("#load-btn");let u="",n=1;l||console.error("Search form not found in DOM (expected #search-form).");function b(){const r=document.querySelector(".gallery li");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}l.addEventListener("submit",async r=>{r.preventDefault();try{if(u=z.value.trim(),!u){a.warning({title:"Увага",message:"Введіть пошукове слово."});return}O(),n=1,y(),p.disabled=!0;const e=await g(u,n);if(!e.hits||e.hits.length===0){a.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight",close:!1,messageSize:"20",timeout:5e3,icon:'<svg class="icon icon-x-circle"><use xlink:href="#icon-x-circle"></use></svg>',maxWidth:900}),l.reset();return}h(e.hits),b(),n*15<e.totalHits?m.classList.add("is-active"):(m.classList.remove("is-active"),a.info({title:"Кінець",message:"Більше зображень немає."})),a.success({title:"Готово",message:`Знайдено ${e.totalHits} зображень.`})}catch(e){console.error("Fetch error:",e),a.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{L(),p.disabled=!1}l.reset()});m.addEventListener("click",r=>{r.preventDefault(),n+=1;try{y(),g(u,n).then(e=>{h(e.hits),b()})}catch(e){console.error("Fetch error:",e),a.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{L()}});
//# sourceMappingURL=index.js.map
