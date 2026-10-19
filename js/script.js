const $=id=>document.getElementById(id);
const LINES={Vintage:[350,"Hand-wound","Timeless design inspired by early 20th century watchmaking."],Luxury:[4200,"Automatic","Fine finishing, precious metals and a movement built to last generations."],Smart:[199,"Sensor + Bluetooth","Tracks heart rate, sleep and steps, with notifications on your wrist."],Sport:[520,"Quartz Chrono","Rugged case, luminous hands and strong water resistance."],Dress:[780,"Automatic","Slim, minimal and elegant for formal wear."],Diver:[950,"Automatic","Rotating bezel and high water resistance for diving."],Pilot:[690,"Automatic","Large, easy-to-read dial inspired by cockpit instruments."],Skeleton:[1800,"Hand-wound","Open dial that shows the movement at work."],Ladies:[480,"Quartz","Small, elegant cases with fine straps."],Kids:[59,"Quartz","Bright, light and tough watches for children."]};
const ADJ="Aurora,Meridian,Equinox,Solstice,Horizon,Zenith,Apex,Vertex,Cascade,Ember,Onyx,Ivory,Cobalt,Crimson,Amber,Jade,Slate,Silver,Midnight,Dawn,Harbor,Summit,Atlas,Orion,Lyra,Vega,Mercury,Phoenix,Falcon,Sterling".split(","),NOU="Heritage,Classic,Edition,Series,Signature,Reserve,Legacy,Original,Prime,Master,Select,Limited,Royale,Studio,Era,Line,Collection,Craft,Standard,Icon,Noir,Blanc,Gold,Steel,Tempo,Chrono,Ring,Crest,Mark,Form".split(",");
const S=["#3b2a20","#1f2937","#7c2d12","#0f172a","#374151","#14532d"],C=["#d4af37","#c0c4cc","#2b2b2b","#b87333"],D=["#f5efe0","#0b1220","#1e3a5f","#faf7f2","#151515","#7a1f2b"],K=["#ef4444","#3b82f6","#22c55e","#f59e0b","#a855f7"];
const W=[];let k=0;
Object.keys(LINES).forEach(L=>{for(let i=0;i<12;i++,k++){W.push({id:k,name:ADJ[k%30]+" "+NOU[(k*7+Math.floor(k/30))%30],line:L,price:Math.round(LINES[L][0]*(1+((i*7)%10)/8)/5)*5,size:(L=="Ladies"?28:L=="Kids"?30:34)+(k%5)*2+" mm",wr:[30,50,100,200][k%4]+" m"})}});
function svg(w){const i=w.id,L=w.line,kd=L=="Kids",sc=kd?K[i%5]:S[i%6],cc=L=="Ladies"?"#e8b4a0":C[(i*3)%4],dc=kd?"#ffffff":D[(i*5)%6],hc=(dc=="#f5efe0"||dc=="#faf7f2"||dc=="#ffffff")?"#222":"#f1f1f1",sw=L=="Ladies"?14:kd?20:24;
let s=`<svg viewBox="0 0 100 120" role="img" aria-label="${w.name}"><rect x="${50-sw/2}" y="0" width="${sw}" height="120" rx="4" fill="${sc}"/>`;
s+=(L=="Smart")?`<rect x="20" y="30" width="60" height="60" rx="14" fill="${cc}"/><rect x="25" y="35" width="50" height="50" rx="10" fill="#050505"/><text x="50" y="62" fill="#7dd3fc" font-size="14" text-anchor="middle" font-family="monospace">10:${10+i%50}</text><rect x="32" y="72" width="${16+i%20}" height="4" rx="2" fill="#4ade80"/>`
:`<circle cx="50" cy="60" r="35" fill="${cc}"/><circle cx="50" cy="60" r="29" fill="${dc}"/>`;
if(L!="Smart"){for(let t=0;t<12;t++){const a=t*Math.PI/6,r1=L=="Vintage"?23:24,r2=27;s+=`<line x1="${50+r1*Math.sin(a)}" y1="${60-r1*Math.cos(a)}" x2="${50+r2*Math.sin(a)}" y2="${60-r2*Math.cos(a)}" stroke="${hc}" stroke-width="${t%3?1:2}"/>`}
if(L=="Sport")s+=`<circle cx="42" cy="60" r="6" fill="none" stroke="${hc}" stroke-width=".8"/><circle cx="58" cy="60" r="6" fill="none" stroke="${hc}" stroke-width=".8"/>`;
if(L=="Diver")s+=`<circle cx="50" cy="60" r="32" fill="none" stroke="#111" stroke-width="4" stroke-dasharray="1 3"/>`;if(L=="Pilot")s+=`<text x="50" y="42" fill="${hc}" font-size="9" text-anchor="middle" font-family="sans-serif">12</text>`;if(L=="Skeleton")s+=`<circle cx="42" cy="68" r="8" fill="none" stroke="${hc}" stroke-width="1" stroke-dasharray="2 1.5"/><circle cx="58" cy="52" r="6" fill="none" stroke="${hc}" stroke-width="1" stroke-dasharray="2 1.5"/>`;if(L=="Luxury")s+=`<circle cx="50" cy="70" r="5" fill="none" stroke="${hc}" stroke-width=".8"/>`;
const a=(i%12)*Math.PI/6,b=(i*5%60)*Math.PI/30;
s+=`<line x1="50" y1="60" x2="${50+13*Math.sin(a)}" y2="${60-13*Math.cos(a)}" stroke="${hc}" stroke-width="2.4" stroke-linecap="round"/><line x1="50" y1="60" x2="${50+20*Math.sin(b)}" y2="${60-20*Math.cos(b)}" stroke="${hc}" stroke-width="1.5" stroke-linecap="round"/><circle cx="50" cy="60" r="2" fill="#c0392b"/>`}
return s+`<rect x="82" y="56" width="5" height="8" rx="2" fill="${cc}"/></svg>`}
const card=w=>`<div class="card" data-id="${w.id}" tabindex="0">${svg(w)}<h3>${w.name}</h3><p>${w.line}</p><p class="price">$${w.price.toLocaleString()}</p></div>`;
const SEC=[["home","Home"],["products","Products"],["prices","Price List"],["technology","Technology"],["gallery","Gallery"],["stores","Store Locator"],["support","Support"],["about","About Us"],["contact","Contact Us"],["sitemap","Site Map"]];
let cur="home",busy=false;
$("nav").innerHTML=SEC.map(s=>`<button data-go="${s[0]}">${s[1]}</button>`).join("");
$("sm").innerHTML=SEC.map(s=>`<p><a href="#${s[0]}" data-go="${s[0]}" style="color:var(--gold)">${s[1]}</a></p>`).join("");
function go(id){if(busy||id==cur&&$(id).classList.contains("show"))return;busy=true;const o=$(cur);o.classList.remove("in");
setTimeout(()=>{o.classList.remove("show");const n=$(id);n.classList.add("show");requestAnimationFrame(()=>n.classList.add("in"));cur=id;busy=false;
document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.go==id));scrollTo(0,0)},o.classList.contains("show")?280:0)}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){e.preventDefault();go(g.dataset.go);return}
const c=e.target.closest(".card");if(c)openM(+c.dataset.id);if(e.target==$("md")||e.target.classList.contains("x"))$("md").classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key=="Escape")$("md").classList.remove("open");if(e.key=="Enter"&&e.target.classList.contains("card"))openM(+e.target.dataset.id)});
function openM(id){const w=W[id];$("mb").innerHTML=`<button class="x" aria-label="Close">&times;</button>${svg(w)}<div><h2 style="margin-top:0">${w.name}</h2><p>${DESC[w.line]}</p><p><b>Line-up:</b> ${w.line}<br><b>Movement:</b> ${MOVE[w.line]}<br><b>Case:</b> ${w.size}<br><b>Water resistance:</b> ${w.wr}</p><p class="price" style="font-size:1.3rem">$${w.price.toLocaleString()}</p></div>`;$("md").classList.add("open")}
let tab="All";const names=["All",...Object.keys(LINES)];
$("tabs").innerHTML=names.map(n=>`<button data-t="${n}">${n}</button>`).join("");
function render(){const q=$("q").value.toLowerCase();document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.t==tab));
const r=W.filter(w=>(tab=="All"||w.line==tab)&&w.name.toLowerCase().includes(q));$("list").innerHTML=r.length?r.map(card).join(""):"<p>No watches found.</p>"}
$("tabs").onclick=e=>{if(e.target.dataset.t){tab=e.target.dataset.t;render()}};$("q").oninput=render;render();
$("feat").innerHTML=[1,13,25,49].map(i=>card(W[i])).join("");
$("gal").innerHTML=W.map(w=>`<div class="card" data-id="${w.id}">${svg(w)}</div>`).join("");
$("ptb").innerHTML=W.map(w=>`<tr><td>${w.id+1}</td><td>${w.name}</td><td>${w.line}</td><td>$${w.price.toLocaleString()}</td></tr>`).join("");
$("tech").innerHTML=[["Mechanical Movement","Hand-wound and automatic movements powered by a spring and gear train."],["Quartz","A vibrating crystal keeps accurate time with very little maintenance."],["Sapphire Crystal","Scratch-resistant glass used on luxury and sport models."],["Smart Sensors","Heart-rate, step and sleep tracking with Bluetooth sync."]].map(t=>`<div class="box"><h3 style="margin-top:0">${t[0]}</h3><p>${t[1]}</p></div>`).join("");
$("st").innerHTML=[["New York Flagship","12 Clock Tower Lane, New York, NY","Mon-Sat 10-7"],["Los Angeles","88 Sunset Row, Los Angeles, CA","Mon-Sat 10-8"],["Chicago","41 Lakeview Ave, Chicago, IL","Tue-Sun 11-7"],["Houston","7 Market Square, Houston, TX","Mon-Sat 10-6"]].map(t=>`<div class="box"><h3 style="margin-top:0">${t[0]}</h3><p>${t[1]}<br>${t[2]}</p></div>`).join("");
$("cf").onsubmit=e=>{e.preventDefault();const n=$("n").value.trim(),m=$("m").value.trim(),t=$("t").value.trim();
$("e1").textContent=n?"":"Please enter your name.";$("e2").textContent=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)?"":"Please enter a valid email.";$("e3").textContent=t.length>=10?"":"Message must be at least 10 characters.";
$("okm").textContent=(n&&!$("e2").textContent&&t.length>=10)?"Thank you! We will reply soon (demo, nothing is sent).":""};
let v=1;try{v=(+localStorage.getItem("awc_v")||0)+1;localStorage.setItem("awc_v",v)}catch(e){}$("vis").textContent="Visitors: "+v.toLocaleString();
let loc="locating...";const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
try{navigator.geolocation.getCurrentPosition(p=>loc=p.coords.latitude.toFixed(2)+", "+p.coords.longitude.toFixed(2),()=>loc="Time zone "+tz,{timeout:5000})}catch(e){loc="Time zone "+tz}
setTimeout(()=>{if(loc=="locating...")loc="Time zone "+tz},5500);
function tick(){const d=new Date();$("tk").textContent="Date: "+d.toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"})+"   |   Time: "+d.toLocaleTimeString()+"   |   Location: "+loc+"   |   Welcome to Alberto Watch Company"}
tick();setInterval(tick,1000);
$("home").classList.add("show","in");document.querySelector('#nav button').classList.add("on");
