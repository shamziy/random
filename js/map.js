// Love in Lagos: the map, with a little picture for every place (no more pink dots) and the back arrow.
const MP2=[[50,64],[84,94],[50,34],[84,34],[84,64],[16,64],[16,94],[50,94],[16,34]]; // where each place sits on the map (left %, bottom %)
const veh=(t,k,x=2,wd=52)=>{const[w,s]=VT[t](k),h=Math.round(wd*36/w);return `<svg x="${x}" y="${35-h}" width="${wd}" height="${h}" viewBox="0 0 ${w} 36">${s}</svg>`};
const MI=[ // 0 Street, 1 Beach, 2 Cafe, 3 Nightlife, 4 Market, 5 Gym, 6 Suya, 7 Arcade, 8 Park
()=>veh("bus","#f2b705"),
()=>`<ellipse cx="28" cy="40" rx="20" ry="4" fill="#f0d29a"/>`+r(27,18,2,22,"#7a5a3a")+`<path d="M11 20q17-20 34 0z" fill="#e5594f"/>`,
()=>r(14,16,24,20,"#fff",4)+r(18,20,16,5,"#8a5a38",2)+`<path d="M38 20h3a4 4 0 0 1 0 9h-3M20 5q-3 4 0 8M28 5q-3 4 0 8" stroke="#8a5a38" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
()=>r(6,16,44,28,"#2b1a4a",3)+tx(28,33,"CLUB",12,"#ff4fa3")+c(28,8,6,"#cfd8ff")+c(25,6,1.2,"#fff")+c(31,10,1.2,"#4de2e6")+c(12,39,2,"#ffd166")+c(44,39,2,"#4de2e6"),
()=>`<path d="M5 16h46l-4-10H9z" fill="#e5594f"/>`+[0,1,2,3].map(i=>r(8+i*10,22,8,16,["#2a9d8f","#f4b942","#7b5ea7","#d6407a"][i],2)).join("")+r(4,37,48,7,"#c9a46c"),
()=>r(8,12,6,20,"#ffb703",2)+r(14,16,5,12,"#ffb703",2)+r(19,21,18,3,"#ddd")+r(37,16,5,12,"#ffb703",2)+r(42,12,6,20,"#ffb703",2),
()=>c(28,5,3,"#ffe08a")+`<ellipse cx="28" cy="26" rx="19" ry="5" fill="#ff7a2f" opacity=".55"/>`+[0,1,2,3,4].map(i=>`<path d="M${12+i*8} 13l6 15" stroke="#d98b4a" stroke-width="2.5" stroke-linecap="round"/>`).join("")+r(6,27,44,12,"#4a4a4a",5)+r(10,29,36,3,"#ff7a2f"),
()=>r(17,4,22,38,"#2b2358",3)+r(20,8,16,14,"#4de2e6",2)+tx(28,19,"GO",8,"#24104a")+c(23,29,2.6,"#ff4fa3")+c(33,29,2.6,"#ffd166")+r(21,35,14,4,"#0b0b1a",1),
()=>`<ellipse cx="34" cy="40" rx="22" ry="3.5" fill="#0003"/>`+r(9,14,3,24,"#7a5a3a")+c(10,12,9,"#4f9d57")+veh("car","#e5594f",15,38)];
const backBtn=()=>BACK?`<button class="bk" onclick="goBack()">${ic(IC.ar)}<span>Back to ${BACK==="daily"?"Daily":"Map"}</span></button>`:"";
function goBack(){nav(BACK||"map")}
function mapV(){return `<h2>Where to?</h2><p class="sub">Tap a spot in Lagos and see who’s around.</p><div class="scn map"><svg viewBox="0 0 360 300" preserveAspectRatio="none"><rect width="360" height="300" fill="#efe3cc"/><path d="M0 235q60-30 130-10t140 10 90-20v85H0z" fill="#a8d5da"/><path d="M0 140q90 20 180-10t180 20" stroke="#fff" stroke-width="8" fill="none"/><path d="M110 0q20 100 60 170t30 130" stroke="#fff" stroke-width="6" fill="none"/><path d="M250 0q-10 90 20 160" stroke="#fff" stroke-width="5" fill="none"/><ellipse cx="60" cy="70" rx="36" ry="22" fill="#cfe3b4"/><ellipse cx="300" cy="170" rx="30" ry="18" fill="#cfe3b4"/></svg>${MP2.map((m,i)=>`<button class="pin" style="left:${m[0]}%;top:${m[1]}%" onclick="pick(${i})"><span class="pi"><svg viewBox="0 0 56 44">${MI[i]()}</svg></span><span>${SCN[i][0]}</span></button>`).join("")}</div><h2 style="margin:18px 0 8px">Popular spots</h2>`+VENUES.map(v=>`<button class="row" onclick="pick(${v[2]})"><div><b>${v[0]}</b><div class="jb">${v[1]} · ${SCN[v[2]][0]}</div></div>${ic(IC.ar)}</button>`).join("")}
