import{a as S,S as w,i as o}from"./assets/vendor-BSTwZ_tR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const x="52375997-ed6a7f09fc050a8946ebeea10",q="https://pixabay.com/api/",g=async(r,e)=>{try{return(await S.get(q,{params:{key:x,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}catch(a){throw a}},u=document.querySelector("#gallery"),d=document.querySelector("#loader"),$=new w("#gallery a",{captionsData:"alt",captionDelay:250,spinner:!0});function h(r){if(!u)return;const e=r.map(({webformatURL:a,largeImageURL:c,tags:t,likes:s,views:i,comments:b,downloads:v})=>`<li class="gallery-item">
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
                    <p class="stat-content">${i}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Comments</p>
                    <p class="stat-content">${b}</p>
                </li>
                <li class="stats-item">
                    <p class="stats-title">Downloads</p>
                    <p class="stat-content">${v}</p>
                </li>
            </ul>
</li>`).join("");u.insertAdjacentHTML("beforeend",e),$.refresh()}function O(){u&&(u.innerHTML="")}function y(){d&&d.classList.add("is-active")}function L(){d&&d.classList.remove("is-active")}const p=document.querySelector("#search-form"),z=document.querySelector('input[name="search-text"]'),f=document.querySelector("#search-btn"),m=document.querySelector("#load-btn");let l="",n=1;p||console.error("Search form not found in DOM (expected #search-form).");p.addEventListener("submit",async r=>{r.preventDefault();try{if(l=z.value.trim(),!l){o.warning({title:"Увага",message:"Введіть пошукове слово."});return}O(),n=1,y(),f.disabled=!0;const e=await g(l,n);if(!e.hits||e.hits.length===0){o.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topRight",close:!1,messageSize:"20",timeout:5e3,icon:'<svg class="icon icon-x-circle"><use xlink:href="#icon-x-circle"></use></svg>',maxWidth:900});return}h(e.hits),n*15<e.totalHits?m.classList.add("is-active"):(m.classList.remove("is-active"),o.info({title:"Кінець",message:"Більше зображень немає."})),o.success({title:"Готово",message:`Знайдено ${e.totalHits} зображень.`})}catch(e){console.error("Fetch error:",e),o.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{L(),f.disabled=!1}p.reset()});m.addEventListener("click",r=>{r.preventDefault(),n+=1;try{y(),g(l,n).then(e=>{h(e.hits)})}catch(e){console.error("Fetch error:",e),o.error({title:"Помилка",message:"Проблема при завантаженні зображень. Спробуйте пізніше.",backgroundColor:"red",position:"topRight",close:!1,messageSize:"30",timeout:5e3})}finally{L()}});
//# sourceMappingURL=index.js.map
