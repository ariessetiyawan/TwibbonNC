const waitForElm=async (selector) =>{
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
const dataURItoBlob= async(dataURI) =>{
	try{
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs
                var byteString = atob(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }


                try {
                    // 新版本浏览器
                    return new $window.Blob([ia], {type: mimeString});
                } catch (e) {

                    // TypeError old chrome and FF
                    // Android 中该方式无效
                    $window.BlobBuilder = $window.BlobBuilder ||
                        $window.WebKitBlobBuilder ||
                        $window.MozBlobBuilder ||
                        $window.MSBlobBuilder;

                    if (e.name == 'TypeError' && $window.BlobBuilder) {

                        var bb = new $window.BlobBuilder();
                        bb.append(ab);
                        return bb.getBlob(mimeString);

                    } else {
                        return null;
                    }
                }
	} catch (e) {
		console.log('dataURItoBlob',e)
		return ''
	}
}
const b64toBlob = async(b64Data, contentType='', sliceSize=512) => {
  try{
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
  } catch(e){
	  console.log('b64toBlob error',e)
	  return ''
  }
}
const elementChildren= async (element) =>{
    var childNodes = element.childNodes,
        children = [],
        i = childNodes.length;
    
    while (i--) {
        if (childNodes[i].nodeType == 1) {
            children.unshift(childNodes[i]);
        }
    }

    return children;
}
const tunggu=async (ms)=>{
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
const getDetKUA=async(kdkua)=>{
	try{
		var kabko=""
		var prop="",kec="";
		let list_kua=await fetch('./kua_list.json')
					.then((response) => response.json())
					.then((json) => {
						return (json)
					});				
		var detKUA=list_kua.filter(function(item){
			return item.Kode == kdkua;         
		})
		//console.log(detKUA[0])
		kabko=detKUA[0]['Kabupaten']
		prop=detKUA[0]['Propinsi']
		kec=detKUA[0]['Kecamatan']
	} catch(e){
		var kabko="", prop="",kec="";
		//console.log(e)
	}
	return [kec,kabko,prop]
	
}
const formatTanggalX=async(tgl)=>{
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	let fdd1 = new Date(tgl);
	let harileng=fdd1.toLocaleDateString("id-ID",options)
	let month = new Intl.DateTimeFormat('id', { month: 'long' }).format(fdd1);
	let day = new Intl.DateTimeFormat('id', { day: '2-digit' }).format(fdd1);
	return harileng
}
async function showModal(data){
	let alertmsg=data.pesan;
	var w = parseInt(data.width);
	var h = parseInt(data.height);
	var url=data.url?data.url:'alert.html';
	await chrome.storage.sync.set({ alertmsg });
	//await chrome.windows.create({focused: true,'url': 'alert.html', 'type': 'popup', 'width': w, 'height': h} , function(window) {})
	chrome.windows.getCurrent((tabWindow) => {
	  let popwinId = tabWindow.id;
	  chrome.storage.sync.set({ popwinId });
	  const width = w//Math.round(tabWindow.width/2 * 0.5) // dynamic width
	  const height =h //Math.round(tabWindow.height/2 * 0.3) // dynamic height
	  const left = Math.round((tabWindow.width - width) * 0.5 + tabWindow.left)
	  const top = Math.round((tabWindow.height - height) * 0.5 + tabWindow.top)
	  chrome.windows.create( // https://developer.chrome.com/docs/extensions/reference/windows/#method-create
		{
		  focused: true,
		  url: url,
		  type: 'popup', // https://developer.chrome.com/docs/extensions/reference/windows/#type-WindowType
		  width, height,
		  left, top
		},
		(subWindow) => {
			console.log('tabWindow.id',tabWindow.id)
		}
	  )
	})
}
async function fb_send(data){
	async function simulateKeyboardInput(element, key, kcode,type = 'keydown', modifiers = {}) {
	  //console.log(`Key${key.toUpperCase()}`)
	  const eventV = new KeyboardEvent(type, {
		key: key,
		code:key,//`Key${key.toUpperCase()}`,
		which: kcode,
		keyCode: kcode,
		...modifiers,
	  });
	  element.dispatchEvent(eventV);
	}
	async function data1(xx,elm,k) {
		await new Promise(()=>setTimeout(async()=>{
			await document.execCommand('insertText', false, xx[k]);
			await simulateKeyboardInput(elm,'Enter',13,'keydown');
			await simulateKeyboardInput(elm,'Enter',13,'keydown');		
		},1000))
		console.log('data1 completed')
		return 'data1 result'
	}
	async function data2(xx,elm) {
		await new Promise(()=>setTimeout(async()=>{
			await document.execCommand('insertText', false, xx[3]);
			await simulateKeyboardInput(elm,'Enter',13,'keydown');
		},1000))
		console.log('data1 completed')
		return 'data1 result'
	}
	async function data3(xx,elm) {
		await new Promise(()=>setTimeout(async()=>{
			await document.execCommand('insertText', false, xx[4]);
			await simulateKeyboardInput(elm,'Enter',13,'keydown');
		},1000))
		console.log('data3 completed')
		return 'data3 result'
	}
	async function data4(xx,elm,k) {
		await new Promise(()=>setTimeout(async()=>{
			await document.execCommand('insertText', false, xx[k]);
			await simulateKeyboardInput(elm,'Enter',13,'keydown');
		},1000))
		console.log('data4 completed')
		return 'data4 result'
	}
	async function bam() {
		try {
			await new Promise((_,reject)=>setTimeout(reject,2000))
		} catch {
			console.log('bam errored')
			throw 'bam'
		}
	}
	function handleRejection(p) {
		return p.catch((error)=>({
			error
		}))
	}
	function waitForAll(...ps) {
		console.log('started...')
		return Promise.all(ps.map(handleRejection))
	}
	async function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
		 end = new Date().getTime();
	  }
	}
	var write_text = function(input,isi,current,l,time) {
	  input.textContent+=isi[current];
	  if(current < l-1) {
		current++;
		setTimeout(function(){write_text()},time);
	  } else {
		input.setAttribute('textContent',input.value);
	  }
	}
		
	let elmn=waitForElm("[aria-label='Buat postingan']")
	console.log(elmn)
	await chrome.storage.sync.get(["NCTOFBIsi","NCTOFB_akun","NCTOFB_img"], async function(h){
		console.log(h["NCTOFBIsi"]+", "+h["NCTOFB_akun"])
		var akfb=h["NCTOFB_akun"]
		if (akfb.includes('https://www.facebook.com/')){
			akfb=akfb.replace("https://www.facebook.com/","")
		}
		akfb='https://www.facebook.com/'+akfb
		var htmlisi=document.body.innerHTML;
		let myNewText = h['NCTOFBIsi'];
		var xxx=myNewText.split('\n');
		if (htmlisi.includes('Apa yang Anda pikirkan sekarang?')>0){		
			let elems = document.querySelectorAll("a[href='"+akfb+"']"); // Grab every element in the dom
			try{
				var elemsp=elems[1].parentElement.children[1]			
				var epost=document.querySelector("[aria-label='Buat postingan']");
				const event = new KeyboardEvent('keydown', {
						  key: 'Shift',
						  code: 'Shift',
						  which: 16,
						  keyCode: 16,
						});
						// event = new KeyboardEvent('keydown', { key });						
				const eventx = new KeyboardEvent('keydown', {
						  key: 'Enter',
						  code: 'Enter',
						  which: 13,
						  keyCode: 13,
						});
				if (epost==null){
					//var headings=document.evaluate("//span[contains(text(), 'Apa yang Anda pikirkan sekarang?')]", document, null, XPathResult.ANY_TYPE, null );
					await elemsp.click();
					await setTimeout(async()=>{
						//var elemsp=(document.querySelector("div[aria-placeholder='Apa yang Anda pikirkan sekarang?']").parentElement.children[0].children)
						var elemsp=document.querySelector("div[aria-placeholder='Apa yang Anda pikirkan sekarang?']"); 	
						//console.log('elemsp',elemsp)
						//elemsp.innerHTML=xx.innerHTML
						var xx=document.querySelector("[id='tmplWallFB']");
						//await elemsp.dispatchEvent(eventx)
						waitForAll(
							data1(xxx,elemsp,0),
							data4(xxx,elemsp,2), 
							data2(xxx,elemsp), 
							data3(xxx,elemsp),
							data4(xxx,elemsp,5),
							data1(xxx,elemsp,6),
							data4(xxx,elemsp,8),
							data4(xxx,elemsp,9),
							data4(xxx,elemsp,10),
							data4(xxx,elemsp,11),
							data1(xxx,elemsp,12),
							data4(xxx,elemsp,14),
							data4(xxx,elemsp,15),
							data1(xxx,elemsp,16),
							data4(xxx,elemsp,18),
							data4(xxx,elemsp,19),
							data4(xxx,elemsp,20),
							data1(xxx,elemsp,21),
							data1(xxx,elemsp,23),
							)
							.then(async(results)=>{
								console.log('done', results)
									
							})
							await setTimeout(async()=>{	
									var btnnext=document.querySelector("[aria-label='Berikutnya']");
									//console.log('berikutnya',btnnext)
									if (btnnext!==null){
										//console.log('btnnext click')
										await btnnext.click()
									}
									await setTimeout(async()=>{	
										var btnnext=document.querySelector("[aria-label='Kirim']");
										console.log('kirim',btnnext)
										if (btnnext!==null){
											await btnnext.click()
										}
									},2000);	
							},2000);		
					},1800);
					
				}
			} catch(e){		
				console.log('terjadi error klik',e);
			}		
		}
	})
}
function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'mainmenu',
    title: 'Twibbon NC',
    contexts: ['selection'],
    visible: false,
  });
  chrome.contextMenus.create({
    id: 'nctofb',
    title: 'NC to FB',
    contexts: ['selection'],
    visible: true,
  });
}
async function getDataElement(tab) {
	setTimeout(async()=>{
		try{
			var htmlisi=document.body.innerHTML;
			//console.log('htmlisi',htmlisi)
			try{
				var url='http://localhost:5000';
				await fetch(url).then(function (response) {
					return response.text();
				}).then(function (html) {
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, 'text/html');
					tokenkua=doc.querySelector('#tokenkua').innerHTML ;
					let tokeneKUA=tokenkua;
					chrome.storage.sync.set({tokeneKUA});
				}).catch(function (err) {
					console.warn('Something went wrong.', err);
				});
			} catch(e){}
			var elems1 = document.querySelector("[name='csrf-token']"); // Grab every element in the dom
			tokencsrf =elems1.getAttribute("content")
			chrome.storage.sync.set({ tokencsrf });
			if (htmlisi.indexOf('MENU_URL')){
				var isLOGIN=true;
				chrome.storage.sync.set({ isLOGIN })
				var menuurl=htmlisi.split("var MENU_URL = ")[1].split("'")[1]
				let get_url_custom=menuurl
				chrome.storage.sync.set({ get_url_custom });
				chrome.storage.sync.set({ menuurl });
				//console.log('get_url_custom',get_url_custom)
				var tkn=await chrome.storage.sync.get(["tokencsrf"])
				var toke=tkn['tokencsrf']
				//await getURLCustom(get_url_custom,dlr["tokencsrf"])
				var hsl= fetch(get_url_custom,{
				  "headers": {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
					"sec-ch-ua-mobile": "?0",
					"sec-ch-ua-platform": "\"Windows\"",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"x-csrf-token": toke,
					"x-requested-with": "XMLHttpRequest"
				  },
				  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
				  "referrerPolicy": "strict-origin-when-cross-origin",
				  "body": null,
				  "method": "GET",
				  "mode": "cors",
				  "credentials": "include"
				})
				.then(response =>response.json())
				.then(async(datax) =>{
					//console.log('getURLCustom',datax)
					let get_url_menu_cust=JSON.stringify(datax)
					chrome.storage.local.set({ get_url_menu_cust });
					
					var urlid=datax.filter(kua=>kua.name=='Data KUA')
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_KUA=isihtml.split("function Edit(kode_kua){")[1].split('"')[1]
							chrome.storage.sync.set({ URL_KUA });

							URL_KUA_LIST=isihtml.split("var kua = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_KUA_LIST });
							
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Data Penghulu")
					
					//console.log('urlid',urlid)
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							URL_PEGAWAI_DET=isihtml.split("function Edit(nip){")[1].split('"')[1]
							chrome.storage.sync.set({ URL_PEGAWAI_DET });

							URL_PEGAWAI=isihtml.split("var penghulu = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_PEGAWAI });
							
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Desa/Kelurahan")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_KELURAHAN=isihtml.split("var kelurahan = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_KELURAHAN });
							//console.log('URL_KELURAHAN',URL_KELURAHAN)
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Daftar Nikah")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_END_POINT_DAFTAR=isihtml.split("function Edit(no_daftar){")[1].split('"')[1]+"?no_daftar="
							chrome.storage.sync.set({ URL_END_POINT_DAFTAR });
							URL_END_POINT_DAFTAR_LIST=isihtml.split("var datastore = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_END_POINT_DAFTAR_LIST });
							
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Pemeriksaan")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_END_POINT_NB=isihtml.split("function Edit(no_daftar){")[1].split('"')[1]+"?status_edit=pemeriksaan&no_daftar="
							chrome.storage.sync.set({ URL_END_POINT_NB });
							var URL_END_POINT_NB1=isihtml.split("function Edit(no_daftar){")[1].split('"')[1]
							chrome.storage.sync.set({ URL_END_POINT_NB1 });
							URL_END_POINT_NB_LIST=isihtml.split("var datastore = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_END_POINT_NB_LIST });
							URL_NTPN=isihtml.split("function Lihat(no_daftar){")[1].split('"')[1]+"?no_daftar="
							chrome.storage.sync.set({ URL_NTPN });
							URL_BILLING=URL_NTPN
							chrome.storage.sync.set({ URL_BILLING });
							
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Akta Nikah")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_END_POINT=isihtml.split("function EditData(no_daftar){")[1].split('"')[1]+"?status_edit=pencatatan&no_daftar="
							chrome.storage.sync.set({ URL_END_POINT });
							URL_END_POINT1=isihtml.split("function EditPencatatan(no_daftar){")[1].split('"')[1]+"?param=edit&no_daftar="
							chrome.storage.sync.set({ URL_END_POINT1 });
							URL_END_POINT_LIST=isihtml.split("var datastore = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_END_POINT_LIST });
							URL_KARTUNIKAH=isihtml.split("else if(value.itemData.text=='Cetak Kartu Nikah Digital'){")[1].split('var url =')[1].split('"')[1]
							chrome.storage.sync.set({ URL_KARTUNIKAH });
							//URL_KARTUNIKAH1=isihtml.split("else if(value.itemData.text=='Cetak Kartu Nikah Digital'){")[1].split('var url =')[1].split('"')[1]
							//chrome.storage.sync.set({ URL_KARTUNIKAH1 });
							
							
						})
					} catch(e){}
									
					var urlid=datax.filter(kua=>kua.name=="Arsip Akta")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_ARSIP=isihtml.split("function EditAkta(no_daftar){")[1].split('"')[1]+"?no_daftar="
							chrome.storage.sync.set({ URL_ARSIP });
							URL_ARSIP_LIST=isihtml.split("var datastore = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_ARSIP_LIST });							
							URL_BUKUNIKAH_ARSIP=isihtml.split("}else if(value.itemData.text=='Cetak Buku Nikah 2022'){")[1].split('"')[1]
							//console.log('URL_BUKUNIKAH_ARSIP',URL_BUKUNIKAH_ARSIP)
							chrome.storage.sync.set({ URL_BUKUNIKAH_ARSIP });							
						})
					} catch(e){}
					
					
					var urlid=datax.filter(kua=>kua.name=="Laporan Simponi")
					
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							var isihtml=(dataxy.html)
							//console.log(isihtml)
							URL_LAPSIMPONI=isihtml.split("var datastore = new DevExpress.data.CustomStore({")[1].split('url:')[1].split('"')[1]
							chrome.storage.sync.set({ URL_LAPSIMPONI });
							
						})
					} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Laporan Excel")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							//console.log(dataxy.html.split("url:")[1].split('"')[1].trim())
							URL_EXCEL=dataxy.html.split("url:")[1].split('"')[1].trim()
							chrome.storage.sync.set({ URL_EXCEL });
					})} catch(e){}
					
					var urlid=datax.filter(kua=>kua.name=="Akta Nikah")
					
					try{
						var urlx='https://simkah4.kemenag.go.id/'+urlid[0].URL.public_id
						var dts=await fetch(urlx,{
						  "headers": {
							"accept": "*/*",
							"accept-language": "en-US,en;q=0.9",
							"sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
							"sec-ch-ua-mobile": "?0",
							"sec-ch-ua-platform": "\"Windows\"",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
							"x-csrf-token": toke,
							"x-requested-with": "XMLHttpRequest"
						  },
						  "referrer": "https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634",
						  "referrerPolicy": "strict-origin-when-cross-origin",
						  "body": null,
						  "method": "GET",
						  "mode": "cors",
						  "credentials": "include"
						})
						.then(response =>response.json())
						.then(async(dataxy) =>{
							//console.log(dataxy.html)
							//console.log(dataxy.html.split("'Cetak Buku Nikah 2022'")[1].split('var url = "')[1].split('"')[1].trim())
							URL_BUKUNIKAH_DL=dataxy.html.split("'Cetak Buku Nikah 2022'")[1].split('var url = "')[1].split('"')[0].trim()
							chrome.storage.sync.set({ URL_BUKUNIKAH_DL });
							chrome.storage.local.set({ URL_BUKUNIKAH_DL });
					})} catch(e){}
					
					
					//fetchNTPN
					return datax;
				})
				//console.log( hsl);
			}
			if (htmlisi.indexOf('PARAMETER_URL')){
				
				var menuurl=htmlisi.split("var PARAMETER_URL = ")[1].split("'")[1]
				let get_url_params=menuurl
				chrome.storage.sync.set({ get_url_params });
				chrome.storage.sync.set({ menuurl });
			}	
			if (htmlisi.indexOf('btnProfile')>0){
					let elems1 = document.querySelector("[name='csrf-token']"); // Grab every element in the dom
					let tokencsrf =elems1.getAttribute("content")
					chrome.storage.sync.set({ tokencsrf });
					var dtmm=htmlisi.split('btnProfile');
					let elems = document.querySelector("[id='btnProfile']"); // Grab every element in the dom
					let divprofile = document.querySelector("#UserDropdown").parentNode.childNodes[3].childNodes[1].childNodes[5];
					if (divprofile.innerText.includes('@')){
						let kuamail=divprofile.innerText
						chrome.storage.sync.set({ kuamail });	
						var usridg=kuamail.split('@')[0]	
						userID=usridg
						kuakode=userID
						chrome.storage.sync.set({ userID });
						chrome.storage.sync.set({ kuakode });
					}
					divprofile = document.querySelector("#UserDropdown").parentNode.childNodes[3].childNodes[1].childNodes[3];
					let kuaname=divprofile.innerText.toUpperCase();	
					//console.log('kuaname',kuaname)	
					//console.log('userID',userID)		
					chrome.storage.sync.set({ kuaname });
					chrome.storage.sync.set({ userID });		
					const cookies = await cookieStore.getAll(); //Array of all available cookie info 
					//console.log('cookies',cookies)
					var mnurul=chrome.storage.local.get(['get_url_menu_cust']);				
			}
			
		} catch(e){		
			console.log('terjadi error',e)
		}
	},1000)
}
async function getUserInfo(info) {
	//console.log('getUserInfo',info)
	var tabx = await chrome.tabs.get(info.tabId, async function(tab) {
		if (tab.url=='https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634'){
			await chrome.tabs.query({ active: true, currentWindow: true },async function (tabs) {
				var activeTab = tabs[0];
				var activeTabId = activeTab.id;
				await chrome.scripting.executeScript({
					target: {tabId: activeTabId},
					function: getDataElement,
					args:[tab]
				});	
			})	
		}
		else if (tab.url.includes('facebook.com')){
			await chrome.tabs.query({ active: true, currentWindow: true },async function (tabs) {
				var activeTab = tabs[0];
				var activeTabId = activeTab.id;
				var delayklik=3000
				console.log('getUserInfo chrome.tabs.query',tab.url)
			
			})	
		}
	})
}
async function hiddenJudul(){
	var htmlisi=document.body.innerHTML;
	var elementx=document.querySelector(".welcome-text")
	//console.log(elementx.innerText)
	if ((elementx.innerText).includes('Simbuang')){
		if (elementx!==null){
			elementx.childNodes[1].classList.add('d-none')
			elementx=document.querySelectorAll(".navbar-toggler.navbar-toggler.align-self-center")
			if (elementx[0]){
				elementx[0].click()
			}
		}
		var elementx=document.querySelector("#overview")
		if (elementx!==null){
			elementx.classList.add('d-none')
		}
	}
}
const pageSimkahweb=async()=>{
	await chrome.runtime.sendMessage(
	  {
		type: 'GREETINGS',
		payload: {
		  message: 'Hello, my name is Con. I am from ContentScript.',
		},
	  },
	  (response) => {
		//console.log(response.message);
	  }
	);
}
const pageFB=async()=>{}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }
  sendResponse({});
  return true;
});
export{
	formatTanggalX,
	getDetKUA,
	waitForElm,
	b64toBlob,
	dataURItoBlob,
	elementChildren,
	tunggu,
	setupContextMenu,
	fb_send,
	showModal,
	getUserInfo,
	getDataElement,
	hiddenJudul,
	pageSimkahweb,
	pageFB
}