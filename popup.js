(function(){"use strict";try{const s=document.getElementById("txtakunfb");s.addEventListener("change",async e=>{let n=s.value;chrome.storage.sync.set({TWBMC_AKUNFB:n})}),chrome.storage.sync.get("TWBMC_AKUNFB",async e=>{document.getElementById("txtakunfb").value=e.TWBMC_AKUNFB});const i=document.getElementById("txtTmplTW");i.addEventListener("change",async e=>{let n=i.value;chrome.storage.sync.set({TWBMC_TMPLTXT:n})}),chrome.storage.sync.get("TWBMC_TMPLTXT",async e=>{if(e.TWBMC_TMPLTXT==null||e.TWBMC_TMPLTXT=="undefined"||e.TWBMC_TMPLTXT==""||e.TWBMC_TMPLTXT==null){document.getElementById("txtTmplTW").value=`📜 PMA NOMOR 30 TAHUN 2024 Pasal 9

PENGUMUMAN KEHENDAK NIKAH

1. CALON LAKI-LAKI
Nama : \${nmsuami}
Bin : \${binsuami}
Alamat : \${addsuami}
Umur : \${umursuami}

2. CALON PEREMPUAN
Nama : \${nmistri}
Binti : \${bintiistri}
Alamat : \${addistri}
Umur : \${umuristri}

3. WALI NIKAH
Nasab/Hakim : \${stwali}
Akad : \${nikahdi}

4. HARI, TANGGAL TEMPAT NIKAH
Hari : \${hariakad}
Tanggal : \${tglakad}
Tempat : \${lokasiakad}

💡 BAGI BAPAK/IBU/KELUARGA YANG BERKEBERATAN DAN MENGETAHUI ADANYA HALANGAN ATAS PERNIKAHAN INI MOHON DISAMPAIKAN KEPADA KAMI MELALUI NO. HP KUA :081XX

`;var n=document.getElementById("txtTmplTW").value;chrome.storage.sync.set({TWBMC_TMPLTXT:n})}else document.getElementById("txtTmplTW").value=e.TWBMC_TMPLTXT});const o=document.getElementById("pilihtw");o.addEventListener("change",async e=>{let n=o.value;chrome.storage.sync.set({TWBMC_TMPLIMG:n})}),chrome.storage.sync.get("TWBMC_TMPLIMG",async e=>{document.getElementById("pilihtw").value=e.TWBMC_TMPLIMG});const l=document.getElementById("btn_preview");l.addEventListener("click",async e=>{var n=document.getElementById("txtTmplTW").value;await chrome.runtime.sendMessage({type:"Preview_template",payload:{message:`Please Preview Template ${n}`}},a=>{console.log(a.message)})});const t=document.getElementById("btn_create");l.addEventListener("click",async e=>{document.querySelector(".card_img").classList.remove("d-none"),document.getElementById("img_preview").src=""})}catch{}window.addEventListener("load",async()=>{var s="",i="",o=await chrome.storage.sync.get(["isLOGIN","TWB_NC_Version","tokeneKUA","TWBMC_TMPLTXT","TWBMC_TMPLIMG"]),l=o.TWB_NC_Version;if(i=o.TWBMC_TMPLIMG,l!==null){let t=document.getElementById("row-bttm");t!==null&&(t.innerHTML="Twibbon NC versi <strong>"+l+" by ariessda</strong>")}else{let t=document.getElementById("row-bttm");t.innerHTML="Twibbon NC versi <strong>0.0.0 by ariessda</strong>"}s=o.tokeneKUA,s==null||s==null?await chrome.runtime.sendMessage({type:"GETTOKENKUA",payload:{message:"Please get token KUA!"}},t=>{o.isLOGIN&&setTimeout(async()=>{var e=!1;chrome.storage.sync.set({isLOGIN:e}),location.reload()},1e3)}):await fetch(`http://localhost:5000/getTemplate/${s}`).then(t=>t.json()).then(async t=>{var e=document.getElementById("pilihtw");if(e!==null&&(e.innerHTML="",t.success)){if(t.data.length>0)var n='<option value="0">--Pilih Template Twibbon--</option>';else var n='<option value="0" selected>--Pilih Template Twibbon--</option>';for(var a=0;a<t.data.length;a++)t.data[a].name==i?n+=`<option value="${t.data[a].name}" selected>${t.data[a].caption}</option>`:n+=`<option value="${t.data[a].name}">${t.data[a].caption}</option>`;e.innerHTML=n,await chrome.runtime.sendMessage({type:"DEMO",payload:{message:"Please Mode DEMO On!"}})}}),document.getElementById("loader")},!1)})();
