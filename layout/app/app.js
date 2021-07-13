(()=>{"use strict";var e=function(){document.querySelectorAll(".popup").forEach((function(e){e.classList.remove("active")})),o()},t=function(e){e.classList.add("active"),r()},n=function(e){e.classList.remove("active"),o()},o=function(){document.body.style.overflowY="auto",document.body.style.paddingRight=""},r=function(){document.body.style.overflowY="hidden",document.body.style.paddingRight=function(){var e=document.createElement("div");e.style.overflowY="scroll",e.style.width="50px",e.style.height="50px",document.body.append(e);var t=e.offsetWidth-e.clientWidth;return e.remove(),t}()+"px"};function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,u=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){a=!0,c=e},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw c}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const u=function(e){var o=document.querySelector(".popup-thank"),r=document.querySelector(".popup-thank__title"),c=document.querySelector(".popup-thank__descr"),i=document.getElementById(e),u=document.createElement("div");u.style.cssText="font-size: 2rem;",i.addEventListener("submit",(function(e){e.preventDefault(),function(e){var t=new FormData(e),n={};t.forEach((function(e,t){return n[t]=e})),e.appendChild(u),function(e){return fetch("server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(n).then((function(t){if(200!==t.status)throw new Error("status network not 200!");a("Спасибо за обращение!","Ожидайте звонка нашего специалиста. Будем рады помочь Вам!"),e.reset(),l()})).catch((function(e){a("Ошибка отправки сообщения"),console.error(e),l()}))}(i)}));var a=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";r.textContent=e,c.textContent=n,t(o),console.log("show")},l=function(){setTimeout((function(){n(o)}),3e3),console.log("hide")}};var a,l;(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.5,t=document.querySelectorAll('a[href^="#"]:not([href="#"])'),n=function(t){t.preventDefault();var n=0,o=window.pageYOffset,r=t.target.closest("a").getAttribute("href"),c=document.querySelector(r).getBoundingClientRect().top-10;requestAnimationFrame((function t(r){n||(n=r);var i=r-n,u=c<0?Math.max(o-i/e,o+c):Math.min(o+i/e,o+c);window.scrollTo(0,u),(c>0&&u<o+c||c<0&&u>o+c)&&requestAnimationFrame(t)}))};t.forEach((function(e){return e.addEventListener("click",n)}))})(.2),a=document.querySelector(".header-contacts__arrow"),l=document.querySelector(".header-contacts__phone-number-accord"),a.addEventListener("click",(function(){l.classList.toggle("active"),a.classList.toggle("active")})),document.body.addEventListener("keydown",(function(t){"Escape"===t.key&&e()})),document.body.addEventListener("click",(function(o){var r=o.target;r.closest(".popup")&&!r.closest(".popup-wrapper")&&n(r.closest(".popup")),r.closest(".menu-link")&&n(r.closest(".popup")),r.closest(".close")&&n(r.closest(".popup")),r.closest(".all-services")&&(o.preventDefault(),e(),t(document.querySelector(".popup-repair-types"))),r.closest(".menu__icon")&&t(document.querySelector(".popup-menu")),r.matches(".link-privacy")&&t(document.querySelector(".popup-privacy"))})),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"+7 (___) ___-__-__",n=document.querySelectorAll(e);function o(e){var n=e.keyCode,o=t,r=o.replace(/\D/g,""),c=this.value.replace(/\D/g,""),i=0,u=o.replace(/[_\d]/g,(function(e){return i<c.length?c.charAt(i++)||r.charAt(i):e}));-1!=(i=u.indexOf("_"))&&(u=u.slice(0,i));var a=o.substr(0,this.value.length).replace(/_+/g,(function(e){return"\\d{1,"+e.length+"}"})).replace(/[+()]/g,"\\$&");(!(a=new RegExp("^"+a+"$")).test(this.value)||this.value.length<5||n>47&&n<58)&&(this.value=u),"blur"==e.type&&this.value.length<5&&(this.value="")}var r,i=c(n);try{for(i.s();!(r=i.n()).done;){var u=r.value;u.addEventListener("input",o),u.addEventListener("focus",o),u.addEventListener("blur",o)}}catch(e){i.e(e)}finally{i.f()}}('input[name="phone"]'),u("feedback1"),u("feedback2"),u("feedback3"),u("feedback4"),u("feedback5"),u("feedback6"),document.querySelectorAll(".formula-item__icon").forEach((function(e){e.addEventListener("mouseover",(function(){console.log(this),console.log(this.parentElement),t(this.parentElement.children[0])})),e.addEventListener("mouseout",(function(){n(this.parentElement.children[0])}))}))})();