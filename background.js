import {
	formatTanggalX,
	getDetKUA,
	showModal,
	fb_send,
	setupContextMenu,
	getDataElement,
	getUserInfo,
	waitForElm,
	hiddenJudul
} from "./customfunc.js" 

const WEB_ORIGIN = 'https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634';
const mainPage = 'sidebar.html';
let tokenkua="",tokencsrf="";

chrome.runtime.onInstalled.addListener(async() => {
  setupContextMenu();
  var isLOGIN=false;
  chrome.storage.sync.set({ isLOGIN })
});
chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;
	sendResponse({
		  message
	});
	let [tabs] = await chrome.tabs.query({active: true});
	//console.log('onMessage GREETINGS',tabs)
	const url = new URL(tabs.url);
	if (tabs.url === WEB_ORIGIN) {
		var isLOGIN=true;
		chrome.storage.sync.set({ isLOGIN })
		await chrome.scripting.executeScript({
			target: {tabId: tabs.id},
			function: getDataElement,
			args:[tabs]
		});
	}
	return true
  }
  else if (request.type === 'FB_INJECT') {
	  const message = `Hi ${
		  sender.tab ? 'Con' : 'Pop'
		}, my name is Bac. I am from Background. It's great to hear from you.`;
		
		// Log message coming from the `request` parameter
		
		//console.log(request.payload.message);
		sendResponse({
			  message
		});
	  return true;
  }
  else if (request.type === 'KIRIMNC') {
	  const message = `Hi ${
		  sender.tab ? 'Con' : 'Pop'
		}, my name is Bac. I am from Background. It's great to hear from you.`;
		sendResponse({
			  message
		});
		var delayklik=2000
		let [tabs] = await chrome.tabs.query({active: true});
		console.log(request.payload.message);
		
	  return true;
  }
  else if (request.type === 'Preview_template'){
	let message = `Please wait...`;
	var dtx={}
	sendResponse({
		message
	});
	var NCTOFB_img=''
	message=`<img src="${NCTOFB_img}" id="twibbon"/>`
	dtx['width']=600
	dtx['height']=600
	dtx['pesan']=message
	dtx['url']='modal.html'
	showModal(dtx)
	return true;
  }
  else if (request.type === 'GETTOKENKUA'){
	let message = `Please wait to get token KUA...`;
	var dtx={}
	sendResponse({
		message
	});
	let [tabs] = await chrome.tabs.query({active: true});
	const url = new URL(tabs.url);
	if (tabs.url === WEB_ORIGIN) {
		var isLOGIN=true;
		chrome.storage.sync.set({ isLOGIN })
		await chrome.scripting.executeScript({
			target: {tabId: tabs.id},
			function: getDataElement,
			args:[tabs]
		});
	}
	return true;
  }
  else if (request.type === 'DEMO'){
	let message = `Please wait to get token KUA...`;
	var dtx={}
	sendResponse({
		message
	});
	try{
		let [tabs] = await chrome.tabs.query({active: true});
		await chrome.scripting.executeScript({
			target: {tabId: tabs.id},
			function : hiddenJudul
		})
		
	} catch(e){}
	return true;
  }
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log("%cChrome extension made by ariessda, have you donated?", "color: blue; font-size: x-large");
  if (!tab.url) return;
  const url = new URL(tab.url);
  if (tab.url === WEB_ORIGIN) {
    if ((info.status === 'complete', tab.status === 'complete')) {
		var manifestData = chrome.runtime.getManifest();
		var version = (manifestData.version);
		var TWB_NC_Version=version
		chrome.storage.sync.set({ TWB_NC_Version})
		var isLOGIN=true;
		chrome.storage.sync.set({ isLOGIN })
		await chrome.sidePanel.setOptions({
			tabId,
			path: mainPage,
			enabled: true,
		  });
		chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
	  
    }
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
	//console.log('tab.url.includes',tab.url.includes('facebook.com'))
	if (tab.url.includes('facebook.com')) {
		let page_fb=false	
		chrome.storage.sync.get(["NCTOFB_pros"], async function(h){
			if (tab.active==true && tab.url.includes("facebook.com" )&& h["NCTOFB_pros"]){
				try{
					if (info.status === 'complete' && tab.status === 'complete'){
						var delayklik=3000						
						let [tabs] = await chrome.tabs.query({active: true});
						//console.log('chrome.tabs.onUpdated.addListener',tabs.url);				
					}
				} catch(e){
					console.log(e)
					let NCTOFB_pros=false
					chrome.storage.sync.set({ NCTOFB_pros });
				}
			} else {
				let NCTOFB_pros=false;
				chrome.storage.sync.set({ NCTOFB_pros });
			}
		});
	}
  }
});
chrome.action.onClicked.addListener(async (tab) => {
  console.log('chrome.action.onClicked.addListener tab', tab);
/*const url = new URL(tab.url);
  if (url.origin !== WEB_ORIGIN) {
	var isLOGIN=false;
	chrome.storage.sync.set({ isLOGIN })
  }*/
});
chrome.tabs.onActivated.addListener(getUserInfo);
chrome.contextMenus.onClicked.addListener(async(info, tab) => {
	const formatTanggalq=async(tgl)=>{
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
		let fdd1 = new Date(tgl);
		let harileng=fdd1.toLocaleDateString("id-ID",options)
		let month = new Intl.DateTimeFormat('id', { month: 'long' }).format(fdd1);
		let day = new Intl.DateTimeFormat('id', { day: '2-digit' }).format(fdd1);
		return harileng
	}
	if (info.menuItemId === "nctofb") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			var activeTab = tabs[0];
			var activeTabId = activeTab.id;
			if(tabs[0].url=='https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634'){
				var nomor=info.selectionText;
				var tabID=null
				var NCTOFB_pros=true
				chrome.storage.sync.set({NCTOFB_pros})//chrome.storage.sync.set({ TWBMC_TMPLIMG });
				chrome.storage.sync.get(["URL_EDITFOTO","tokencsrf","tokeneKUA","TWBMC_TMPLIMG","TWBMC_TMPLTXT","TWBMC_AKUNFB","URL_END_POINT_NB"], async function (data) {
					var urlphoto=data['URL_EDITFOTO']+nomor
					var pilihtmpl=data['TWBMC_TMPLIMG']
					var NCTOFBIsi=data['TWBMC_TMPLTXT'] 
					var URL_END_POINT_NB=data["URL_END_POINT_NB"]
					var url=URL_END_POINT_NB+nomor
					tokenkua=data['tokeneKUA']
					var tokenkel=data['tokencsrf']
					var urlfb=data["TWBMC_AKUNFB"]
					var fsuami="",fistri="";					
					var hasl=await fetch(url, {
						"headers": {
							"accept": "application/json, text/javascript, */*; q=0.01",
							"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
							"sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": tokenkel,
							"x-requested-with": "XMLHttpRequest"
						},
						"referrer": "https://simkah4.kemenag.go.id/",
						"referrerPolicy": "strict-origin",
						"body": null,
						"method": "GET",
						"mode": "cors",
						"credentials": "include"
					})
					.then(response => {
						//console.log(response);
						if (response.ok) {
							return response.text();
						}
						throw new Error('Response was not ok.');
					
					})
					.then(async(data) => {
						var dt=JSON.parse(data)
						var pdata=dt
						var isipesan='';
						var html=dt.html;
						fsuami=dt['html'].split('fotosuami')[1].split(`width=`)[0].split(`src=`)[1].replaceAll('&quot;','').replaceAll('"','')
						fistri=dt['html'].split('fotoistri')[1].split(`width=`)[0].split(`src=`)[1].replaceAll('&quot;','').replaceAll('"','')
						var xx=html.split('var data = ');
						var xx=xx[1].split('};');
						var dt=JSON.parse(xx[0]+"}");
						var id_kec=dt['id_kecamatan']
						try{
							var [KEC,KABKO,PROP]=await getDetKUA(id_kec);
							if (KABKO.includes('KAB.')){
								KABKO=KABKO.replace('KAB.','KABUPATEN')
							}
						} catch(e){
							var KEC="",KABKO="",PROP="";
						}
						var nmsuami=dt.datasuami['nama']
						var umursuami=dt.datasuami['umur']
						var addsuami=dt.datasuami['alamat']
						var binsuami=dt.dataayahsuami['nama']
						
						var nmistri=dt.dataistri['nama']
						var umuristri=dt.dataistri['umur']
						var addistri=dt.dataistri['alamat']
						var bintiistri=dt.dataayahistri['nama']
						var lokasiakad=dt['lokasi_akad']
						
						var tglakad=dt['tgl_akad']
						tglakad=await formatTanggalX(dt['tgl_akad'])
						var hariakad=tglakad.split(", ")[0].toUpperCase()
						tglakad=tglakad.split(", ")[1].toUpperCase()

						var nikahdi=dt['nikah_di']
						if (nikahdi=='1'||nikahdi==1){
							nikahdi='LUAR KANTOR KUA'
						} else {
							nikahdi='KANTOR KUA'
						}
						var stwali=dt.datawali['status_wali']
						if (stwali=='1'||stwali==1){
							stwali='HAKIM'
						} else {
							stwali='NASAB'
						}

						NCTOFBIsi=NCTOFBIsi.replace("${nmsuami}",nmsuami)
						NCTOFBIsi=NCTOFBIsi.replace("${umursuami}",umursuami)
						NCTOFBIsi=NCTOFBIsi.replace("${addsuami}",addsuami)
						NCTOFBIsi=NCTOFBIsi.replace("${binsuami}",binsuami)
						NCTOFBIsi=NCTOFBIsi.replace("${nmistri}",nmistri)
						NCTOFBIsi=NCTOFBIsi.replace("${umuristri}",umuristri)
						NCTOFBIsi=NCTOFBIsi.replace("${bintiistri}",bintiistri)
						NCTOFBIsi=NCTOFBIsi.replace("${lokasiakad}",lokasiakad)
						NCTOFBIsi=NCTOFBIsi.replace("${tglakad}",tglakad)
						NCTOFBIsi=NCTOFBIsi.replace("${nikahdi}",nikahdi)
						NCTOFBIsi=NCTOFBIsi.replace("${stwali}",stwali)
						NCTOFBIsi=NCTOFBIsi.replace("${hariakad}",hariakad)
						NCTOFBIsi=NCTOFBIsi.replace("${addistri}",addistri)
						
						var isihtml=NCTOFBIsi
						//console.log(isihtml)
						var urlhost='http://localhost:5000/templatenc/'+tokenkua
						var params={
							"namasuami":nmsuami,
							"bin":'BIN '+binsuami,
							"namaistri":nmistri,
							"binti":'BINTI '+bintiistri,
							"kabko":(`Kemenag ${KABKO} ${PROP}`).toUpperCase(),
							"kua":(`Kantor Urusan Agama Kecamatan ${KEC}`).toUpperCase(),
							"tanggal":tglakad,
							"lokasi":lokasiakad,
							"template":pilihtmpl,
							"photosuami":fsuami.trim(),
							"photoistri":fistri.trim(),
							"rgb":[0,0,0]
						}
						let fts_hasil=await fetch(urlhost,{
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								"body": JSON.stringify(params),
								"method": "POST",
								"mode": "cors",
							})
							.then(response => {
								if (response.ok) {
									return response.text();
								}
								throw new Error('Response was not ok.');
						
							})
							.then(async(data) => {
								try{
									//console.log(data)
									var dt=JSON.parse(data);
									if (dt['success']){
										var NCTOFB_img=dt['data']
										chrome.storage.sync.set({ NCTOFB_img });
										chrome.storage.local.set({ NCTOFB_img });
										var NCTOFB_akun=urlfb
										chrome.storage.sync.set({ NCTOFB_akun });
										chrome.storage.sync.set({ NCTOFBIsi });	
										//return false
										setTimeout(async()=>{
											await chrome.tabs.query({active: false, currentWindow: true},async (tabs) => {
												for (const tabe of tabs) {
													//console.log(tabe.url)
													if (tabe.url.indexOf('facebook.com')>0){
														tabID=tabe
														break
													}
												}

												if (tabID==null){
													await chrome.tabs.create({url: urlfb});
												} else {
													await chrome.tabs.update(tabID.id, {active: true,url: urlfb},async function(){
														let queryOptions = { active: true };//get active tab
														let [tabs] = await chrome.tabs.query(queryOptions);
														console.log('chrome.tabs.update',tabs);
														var tabID=tabs
													});
												}						
											});
										},1000)
									} else {
										dtx={}
										dtx['width']=300
										dtx['height']=180
										dtx['pesan']=dt['msg']
										dtx['url']='modal.html'
										showModal(dtx)
									}
								} catch(e){
									
								}
							})
					
					})
				})
			}
		})
	}
})