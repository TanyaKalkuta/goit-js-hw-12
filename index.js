import{a as x,S as B,i as o}from"./assets/vendor-BSTwZ_tR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const $="52375997-ed6a7f09fc050a8946ebeea10",M="https://pixabay.com/api/",h=async(r,e)=>{try{return(await x.get(M,{params:{key:$,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}catch(a){throw a}},f=document.querySelector("#gallery"),m=document.querySelector("#loader"),y=document.querySelector("#load-btn"),C=new B("#gallery a",{captionsData:"alt",captionDelay:250,spinner:!0});function b(r){if(!f)return;const e=r.map(({webformatURL:a,largeImageURL:c,tags:t,likes:s,views:n,comments:w,downloads:q})=>`<li class="gallery-item">
  <a class="gallery-link" href='${c}'>
    <img
    loading="lazy"
      class="gallery-image"
      src="${a}"
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
                    <p class="stat-content">${n}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Comments</p>
                    <p class="stat-content">${w}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Downloads</p>
                    <p class="stat-content">${q}</p>
                </li>
            </ul>
</li>`).join("");f.insertAdjacentHTML("beforeend",e),C.refresh()}function O(){f&&(f.innerHTML="")}function L(){m&&m.classList.add("is-active")}function S(){m&&m.classList.remove("is-active")}function v(){y.classList.add("is-active")}function l(){y.classList.remove("is-active")}const u=document.querySelector("#search-form"),z=document.querySelector('input[name="search-text"]'),g=document.querySelector("#search-btn"),p=document.querySelector("#load-btn");let d="",i=1;u||console.error("Search form not found in DOM (expected #search-form).");function D(){const r=document.querySelector(".gallery li");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}u.addEventListener("submit",async r=>{r.preventDefault();try{if(d=z.value.trim(),!d){o.warning({title:"Увага",message:"Введіть пошукове слово."});return}O(),l(),i=1,L(),g.disabled=!0;const e=await h(d,i);if(!e.hits||e.hits.length===0){o.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight",close:!1,messageSize:"20",timeout:5e3,icon:'<svg class="icon icon-x-circle"><use xlink:href="#icon-x-circle"></use></svg>',maxWidth:900}),l(),u.reset();return}b(e.hits),i*15<e.totalHits?v():(l(),o.info({title:"Кінець",message:"Більше зображень немає."})),o.success({title:"Готово",message:`Знайдено ${e.totalHits} зображень.`})}catch(e){console.error("Fetch error:",e),o.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{S(),g.disabled=!1}u.reset()});p.addEventListener("click",async r=>{r.preventDefault(),i+=1;try{l(),p.disabled=!0,L();const e=await h(d,i);b(e.hits),requestAnimationFrame(()=>{D()}),i*15<e.totalHits?v():(l(),o.info({title:"Кінець",message:"Більше зображень немає."}))}catch(e){console.error("Fetch error:",e),o.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{S(),p.disabled=!1}});
//# sourceMappingURL=index.js.map
