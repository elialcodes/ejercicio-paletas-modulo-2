const i=document.querySelector(".js-container-main"),u=document.querySelector(".js-container-favorite");document.querySelector(".js-message-error");const l=document.querySelector(".js-search-input"),p=document.querySelector(".js-search-reset-button"),v=document.querySelector(".js-favorite-reset-button");let n=[],r=[];function h(e){const o=n.find(s=>e.currentTarget.id===s.id),t=r.findIndex(s=>e.currentTarget.id===s.id);t===-1?r.push(o):r.splice(t,1),a(r,u)}function a(e,o){if(!o){console.error("El contenedor no se encontró en el DOM.");return}let t="";for(const c of e){t+=`<div class="container__palette js-container__palette"  id="${c.id}"><h3>${c.name}</h3><div class="container__palette--colors">`;for(const f of c.colors)t+=`<div class="color" style="background-color:#${f}"></div>`;t+="</div></div>"}o.innerHTML=t;const s=document.querySelectorAll(".js-container__palette");for(const c of s)c.addEventListener("click",h);l.addEventListener("input",m)}function S(){fetch("https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json").then(e=>e.json()).then(e=>{n=e.palettes,a(n,i),localStorage.setItem("palettes",JSON.stringify(n))})}const d=JSON.parse(localStorage.getItem("palettes"));d!==null?(n=d,a(n,i)):S();function m(){const e=l.value,o=n.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));a(o,i)}function j(){l.value="",a(n,i)}p.addEventListener("click",j);function g(){r=[],a(r,u)}v.addEventListener("click",g);
//# sourceMappingURL=main.js.map
