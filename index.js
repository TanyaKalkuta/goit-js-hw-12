import{a as m,S as h,i as n}from"./assets/vendor-CYMld6vM.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const g="52375997-ed6a7f09fc050a8946ebeea10",y="https://pixabay.com/api/",L=o=>m.get(y,{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:12}}).then(t=>(console.log(t.data.hits),t.data.hits)).catch(t=>{throw t}),c=document.querySelector("#gallery"),l=document.querySelector("#loader"),b=new h("#gallery a",{captionsData:"alt",captionDelay:250,spinner:!0});function S(o){if(!c)return;const t=o.map(({webformatURL:r,largeImageURL:i,tags:e,likes:s,views:a,comments:p,downloads:d})=>`<li class="gallery-item">
  <a class="gallery-link" href='${i}'>
    <img
    loading="lazy"
      class="gallery-image"
      src="${r}"
      alt="${e}"
    />
      </a>
     <ul class="stats">
                <li class="stats-item">
                    <p class="stats-title">Likes</p>
                    <p class="stat-content">${s}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Views</p>
                    <p class="stat-content">${a}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Comments</p>
                    <p class="stat-content">${p}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Downloads</p>
                    <p class="stat-content">${d}</p>
                </li>
            </ul>
</li>`).join("");c.insertAdjacentHTML("beforeend",t),b.refresh()}function v(){c&&(c.innerHTML="")}function x(){l&&l.classList.add("is-active")}function q(){l&&l.classList.remove("is-active")}const u=document.querySelector("#search-form"),w=document.querySelector('input[name="search-text"]'),f=document.querySelector("#search-btn");u||console.error("Search form not found in DOM (expected #search-form).");u.addEventListener("submit",o=>{o.preventDefault();const t=w.value.trim();if(!t){n.warning({title:"Увага",message:"Введіть пошукове слово."});return}v(),x(),f.disabled=!0,L(t).then(r=>{if(!r||r.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight",close:!1,messageSize:"20",timeout:5e3,icon:'<svg class="icon icon-x-circle"><use xlink:href="#icon-x-circle"></use></svg>',maxWidth:900});return}S(r),n.success({title:"Готово",message:`Знайдено ${r.length} зображень.`})}).catch(r=>{console.error("Fetch error:",r),n.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}).finally(()=>{q(),f.disabled=!1}),u.reset()});
//# sourceMappingURL=index.js.map
