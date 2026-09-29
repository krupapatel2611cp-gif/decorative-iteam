function getWish(){return JSON.parse(localStorage.getItem("decorWishlist")||"[]")}
function toggleWish(id){let w=getWish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];localStorage.setItem("decorWishlist",JSON.stringify(w));renderAll();toast(w.includes(id)?"Added to wishlist ♡":"Removed from wishlist")}
function itemCard(x){let s=getWish().includes(x.id);return `<article class="card"><img src="${x.img}" alt="${x.name}"><div class="card-body"><button class="wish ${s?"saved":""}" onclick="toggleWish('${x.id}')">${s?"♥":"♡"}</button><span class="tag">${x.style}</span><span class="tag">${x.room}</span><h3>${x.name}</h3><p class="muted">${x.desc}</p><b>Category: ${x.cat}</b></div></article>`}
function ideaCard(x){return `<article class="card"><img src="${x.img}" alt="${x.name}"><div class="card-body"><span class="tag">Room Inspiration</span><h3>${x.name}</h3><p class="muted">${x.desc}</p><b>Decor checklist:</b><ul class="idea-list">${x.things.map(i=>`<li>${i}</li>`).join("")}</ul></div></article>`}
function collectionCard(x){return `<article class="card"><img src="${x.img}" alt="${x.name}"><div class="card-body"><span class="tag">Curated Style</span><h3>${x.name}</h3><p class="muted">${x.desc}</p><b>Pieces:</b><p>${x.items.join(" · ")}</p></div></article>`}
function blogCard(x){return `<article class="card"><img src="${x.img}" alt="${x.title}"><div class="card-body"><span class="tag">${x.cat}</span><h3>${x.title}</h3><p class="muted">${x.text}</p><a href="blog.html"><b>Read more →</b></a></div></article>`}
function renderAll(){
let f=document.getElementById("featured");if(f)f.innerHTML=items.slice(0,6).map(itemCard).join("");
let g=document.getElementById("itemGrid");if(g){let q=(document.getElementById("itemSearch")?.value||"").toLowerCase(),c=document.getElementById("itemFilter")?.value||"all";g.innerHTML=items.filter(x=>(c==="all"||x.cat===c)&&(x.name+" "+x.room+" "+x.style).toLowerCase().includes(q)).map(itemCard).join("")||"<p>No decor item found.</p>"}
let ig=document.getElementById("ideaGrid");if(ig)ig.innerHTML=ideas.map(ideaCard).join("");
let cg=document.getElementById("collectionGrid");if(cg)cg.innerHTML=collections.map(collectionCard).join("");
let bg=document.getElementById("blogGrid");if(bg)bg.innerHTML=blogs.map(blogCard).join("");
let hb=document.getElementById("homeBlogs");if(hb)hb.innerHTML=blogs.map(blogCard).join("");
let w=document.getElementById("wishlistGrid");if(w){let a=items.filter(x=>getWish().includes(x.id));w.innerHTML=a.length?a.map(itemCard).join(""):"<div class='card'><div class='card-body'><h3>Your wishlist is empty ♡</h3><p class='muted'>Browse Decor Items and tap ♡ to save something.</p><a class='btn' href='items.html'>Explore Decor</a></div></div>"}
}
function toast(m){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";Object.assign(t.style,{position:"fixed",bottom:"25px",right:"25px",background:"#29231f",color:"#fff",padding:"12px 18px",borderRadius:"999px",zIndex:99});document.body.appendChild(t)}t.textContent=m;clearTimeout(window.tt);window.tt=setTimeout(()=>t.remove(),1800)}
document.addEventListener("DOMContentLoaded",()=>{renderAll();document.getElementById("itemSearch")?.addEventListener("input",renderAll);document.getElementById("itemFilter")?.addEventListener("change",renderAll)});
