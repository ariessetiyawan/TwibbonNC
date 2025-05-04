const contentScriptLinks = [
  'js/jquery.min.js',
  'js/moment.min.js',
  'js/bootstrap.bundle.min.js',
  'js/bootstrap-datepicker.js',
  'js/dataTables.dateTime.min.js',
  'js/bootstrap-datetimepicker.min.js',
  'js/jquery.dataTables.min.js',
  'js/fabric.min.js',
  'js/datetime-moment.js'
];
try{
	const txtakunfb = document.getElementById('txtakunfb');
	txtakunfb.addEventListener('change', async (e) => {
	  let TWBMC_AKUNFB = txtakunfb.value;
	  chrome.storage.sync.set({ TWBMC_AKUNFB });
	});
	chrome.storage.sync.get('TWBMC_AKUNFB', async (data) => {
	  document.getElementById('txtakunfb').value = data['TWBMC_AKUNFB'];
	});
	const txtTmplTW = document.getElementById('txtTmplTW');
	txtTmplTW.addEventListener('change', async (e) => {
	  let TWBMC_TMPLTXT = txtTmplTW.value;
	  chrome.storage.sync.set({ TWBMC_TMPLTXT });
	});
	chrome.storage.sync.get('TWBMC_TMPLTXT', async (data) => {
	 if (data['TWBMC_TMPLTXT']==undefined||data['TWBMC_TMPLTXT']=='undefined'||data['TWBMC_TMPLTXT']==''||data['TWBMC_TMPLTXT']==null){
		document.getElementById('txtTmplTW').value = "PMA NOMOR 11 TAHUN 2007 Pasal 13\n\nPENGUMUMAN KEHENDAK NIKAH\n\n1. CALON LAKI-LAKI\nNama : ${nmsuami}\nBin : ${binsuami}\nAlamat : ${addsuami}\nUmur : ${umursuami}\n\n2. CALON PEREMPUAN\nNama : ${nmistri}\nBin : ${bintiistri}\nAlamat : ${addistri}\nUmur : ${umuristri}\n\n3. WALI NIKAH\nNasab/Hakim : ${stwali}\nAkad : ${nikahdi}\n\n4. HARI, TANGGAL TEMPAT NIKAH\nHari : ${hariakad}\nTanggal : ${tglakad}\nTempat : ${lokasiakad}\n\n";
		var TWBMC_TMPLTXT=document.getElementById('txtTmplTW').value;
	 chrome.storage.sync.set({TWBMC_TMPLTXT});
	 } else {
		document.getElementById('txtTmplTW').value = data['TWBMC_TMPLTXT'];
	 }
	});
	const pilihtw = document.getElementById('pilihtw');
	pilihtw.addEventListener('change', async (e) => {
	  let TWBMC_TMPLIMG = pilihtw.value;
	  chrome.storage.sync.set({ TWBMC_TMPLIMG });
	});
	chrome.storage.sync.get('TWBMC_TMPLIMG', async (data) => {
	  document.getElementById('pilihtw').value = data['TWBMC_TMPLIMG'];
	});
	const btnpreview = document.getElementById('btn_preview');
	btnpreview.addEventListener('click', async (e) => {
		var vtmpl=document.getElementById('txtTmplTW').value
		await chrome.runtime.sendMessage(
		  {
			type: 'Preview_template',
			payload: {
			  message: `Please Preview Template ${vtmpl}`,
			},
		  },
		  (response) => {
			console.log(response.message);
		  }
		);
	});
	const btncreate = document.getElementById('btn_create')
	btnpreview.addEventListener('click', async (e) => {
		document.querySelector('.card_img').classList.remove('d-none');
		document.getElementById('img_preview').src=""
	});
	
}catch(e){}
window.addEventListener('load', async()=>{
	var tokenx=""
	var tmplslt=""
	var dt=await chrome.storage.sync.get(["isLOGIN","TWB_NC_Version","tokeneKUA","TWBMC_TMPLTXT","TWBMC_TMPLIMG"])
			var version=dt['TWB_NC_Version'];
			tmplslt=dt["TWBMC_TMPLIMG"];
			if (version!==null){
				let xx=document.getElementById('row-bttm');
				if (xx!==null){
					xx.innerHTML="Twibbon NC versi <strong>"+version+" by ariessda</strong>";
				}
			} else {
				let xx=document.getElementById('row-bttm');
				xx.innerHTML="Twibbon NC versi <strong>"+'0.0.0'+" by ariessda</strong>";
			}
			tokenx=dt["tokeneKUA"];
			if( tokenx==null||tokenx==undefined){
				await chrome.runtime.sendMessage(
				  {
					type: 'GETTOKENKUA',
					payload: {
					  message: 'Please get token KUA!',
					},
				  },
				  (response) => {
					if (dt['isLOGIN']){
						setTimeout(async()=>{
							var isLOGIN=false
							chrome.storage.sync.set({isLOGIN})
							location.reload();
						},1000)
					}
					
				  });
			} else {
				await fetch(`http://localhost:5000/getTemplate/${tokenx}`)
				.then(response =>response.json())
				.then(async(dts)=>{
					var xx=document.getElementById('pilihtw');
					if (xx!==null){
						xx.innerHTML=""
						if (dts['success']){
							if (dts['data'].length>0){
								var html=`<option value="0">--Pilih Template Twibbon--</option>`
							} else {
								var html=`<option value="0" selected>--Pilih Template Twibbon--</option>`
							}
							for (var i=0;i<dts['data'].length;i++){
								if (dts['data'][i]['name']==tmplslt){
									html+=`<option value="${dts['data'][i]['name']}" selected>${dts['data'][i]['caption']}</option>` 
								} else {
									html+=`<option value="${dts['data'][i]['name']}">${dts['data'][i]['caption']}</option>`
								}
							}
							xx.innerHTML=html;
							await chrome.runtime.sendMessage(
							{
								type: 'DEMO',
								payload: {
									message: 'Please Mode DEMO On!',
								},
							});
						}
					}
				});
			}

			let spinner = document.getElementById('loader');
			/*await contentScriptLinks.forEach(async(src) => {			
					try{
						let el = document.createElement('script');
						el.setAttribute('type', 'text/javascript');
						el.src = await chrome.runtime.getURL(src);
						document.body.appendChild(el);
					  } catch(e){}			  
			});*/
},false)
