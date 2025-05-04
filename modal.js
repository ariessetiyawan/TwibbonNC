let dofungsi=null
window.onload =async(event) => {
    chrome.storage.sync.get(["alertmsg","html","foto_nikah_i","foto_nikah_s"],function(data){
		chrome.storage.local.get(["foto_nikah_i","foto_nikah_s"],function(data1){
			try{
				const urlString = window.location.search;
				let paramString = urlString.split('?')[1];
				let queryString = new URLSearchParams(paramString);
				for(let pair of queryString.entries()) {
					if (pair[0]=='do'){
						dofungsi=pair[1]
					}
				}
			} catch(e){}
			var isipesan=data['alertmsg']
			//console.log(isipesan)
			let spinnermsg = document.getElementById('msg');
			if (isipesan.includes('id="imgkartunikah"')){
				let spinnerx = document.getElementById('loader');
				spinnerx.style.display = "block";
				chrome.storage.sync.get("imgkartunikah",function(data){
					setTimeout(()=>{
						let imgkartu = document.getElementById('imgkartunikah');
						var newImg = new Image;
						newImg.onload = function() {
							imgkartu.src = this.src;
							spinnerx.style.display = "none";	
						}
						imgkartu.src = 'http://localhost:5000/data/'+data['imgkartunikah']
						spinnerx.style.display = "none";
						
					},1000)
				})
				
			} else if (isipesan.includes('photo_pa') && isipesan.includes('photo_pi')){
				let spinnerx = document.getElementById('content');
				//console.log('spinnerx',spinnerx)
				//console.log('fotos',data['fotos'])
				spinnerx.insertAdjacentHTML('afterbegin',isipesan)
				setTimeout(()=>{
					document.getElementById('photo_pa').src=data1['foto_nikah_s'];
					document.getElementById('photo_pi').src=data1['foto_nikah_i'];
				},500
				)
				//spinnerx.appendChild(isipesan)
			} else if (isipesan.includes('twibbon')){
				let spinnerx = document.getElementById('content');
				chrome.storage.sync.get(["URL_EDITFOTO","tokencsrf","tokeneKUA","TWBMC_TMPLIMG","TWBMC_TMPLTXT","TWBMC_AKUNFB","URL_END_POINT_NB"], async function (data) {
					var pilihtmpl=data['TWBMC_TMPLIMG']
					var NCTOFBIsi=data['TWBMC_TMPLTXT']
					var URL_END_POINT_NB=data["URL_END_POINT_NB"]
					var tokenkua=data['tokeneKUA']
					var tokenkel=data['tokencsrf']
					var urlfb=data["TWBMC_AKUNFB"]
					var fsuami="",fistri="";					
					var urlhost='http://localhost:5000/templatenc/'+tokenkua
					//console.log('urlhost',urlhost)
					var params={
						"namasuami":'NAMA SUAMI',
						"bin":'BIN '+'NAMA AYAH SUAMI',
						"namaistri":'NAMA ISTRI',
						"binti":'BINTI '+'NAMA AYAH ISTRI',
						"kabko":'KEMENAG KABUPATEN/KOTA',
						"kua":'KANTOR URUSAN AGAMA KECAMATAN',
						"tanggal":'TANGGAL AKAD NIKAH',
						"lokasi":'LOKASI AKAD NIKAH',
						"template":pilihtmpl,
						"photosuami":"",
						"photoistri":"",
						"rgb":[0,0,0]
					}
					//console.log('params',params)
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
								document.getElementById('content').innerText="Preview Template"
								var dt=JSON.parse(data);
								var NCTOFB_img=dt['data']
								var dtx={}
								var message=`<img src="data:image/png;base64,${NCTOFB_img}" width="600px" id="twibbon"/>`
								spinnerx.insertAdjacentHTML('afterbegin',message)
								
							} catch(e){
								
							}
						})
				})
			}
			//console.log('spinnermsg',spinnermsg)
			
			if (spinnermsg!==null){
				spinnermsg.innerHTML=isipesan
			}
		});
	});
}
const myKeluar = async() => {
	 chrome.windows.getCurrent((tabWindow) => {
			  chrome.windows.remove(tabWindow.id);
	})
}
function download(content, filename, contentType)
{
    if(!contentType) contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
}
async function base64ToFile(base64String, mimeType, fileName) {
            const base64Data = base64String.replace(/^data:.+;base64,/, '');
            const byteCharacters = atob(base64Data); // Decode Base64 string
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });
            const url = URL.createObjectURL(blob);

            // Create a link element to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();

            // Cleanup
            URL.revokeObjectURL(url);
        }
const myUnduh = async() => {
	chrome.storage.local.get(["foto_nikah_i","foto_nikah_s"], async function(data1){
		await base64ToFile (data1['foto_nikah_s'],'image/jpeg','suami_photo.jpg')
		await base64ToFile (data1['foto_nikah_i'],'image/jpeg','istri_photo.jpg')
	});
}
const myFunction = async() => {
  try{
	  //console.log('dofungsi',dofungsi)
	  if (dofungsi==null){
		  chrome.windows.getCurrent((tabWindow) => {
			  chrome.windows.remove(tabWindow.id);
		  })
	  } 
	  else if (dofungsi=='loadImage'){
		let spinner = document.getElementById('loader');
		spinner.style.display = "block";
		setTimeout(()=>{
			spinner.style.display = "none";	
		},3000)
	  }
	  else if (dofungsi=='update'){
		let spinner = document.getElementById('loader');
		spinner.style.display = "block";
		 chrome.storage.sync.get(["username","kuaname","tokeneKUA","userID"], async function (data) {	 
			 var urlx= "https://script.google.com/macros/s/AKfycbzw5Uheulz4HbcIdgz6q4z4yakP_Ta05rKd3TnWvQ9DfajQ8uuCYybHjwM1uAweb6A7-w/exec";
			 var dtx={}
			 dtx['aksi']=3
			 dtx['userID']=data['userID']
			 dtx['kuaname']=data['kuaname']
			 dtx['username']=data['username']
			 var tokeneKUA=data['tokeneKUA']
			 var hssx = await fetch(urlx, {
									"body": JSON.stringify(dtx),
									"method": "POST",
									'contentType': 'application/json',
							}).then(response => {
								//console.log(response);
								if (response.ok) {
								  return response.text();
								}
								throw new Error('Response was not ok.');
							}).then(async(data) => {
								return data
							}).catch(error=>{console.log(error);})
			 var getID=JSON.parse(hssx)
			 let hasil=await fetch('http://localhost:5000/updextg4/'+tokeneKUA+'/'+getID.data,{
								headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json'
									},
									"body": JSON.stringify({'filename':getID.data}),
									"method": "POST",
									"mode": "cors",
							}).then(response => {
									if (response.ok) {
										return response.text();
									}
								throw new Error('Response was not ok.');							
							}).then(data => {
								console.log(data)
								chrome.runtime.reload() 
								spinner.style.display = "hide";
								var dt=JSON.parse(data)
								if (dt.success){
									chrome.windows.getCurrent((tabWindow) => {
										  chrome.windows.remove(tabWindow.id);
									  })
								}
								return data
							})
		 });
	  }

	} catch(e){
	  window.close()
  }
	
}
try{
	document.getElementById("myButton").addEventListener("click", myFunction);
}catch(e){}
try{
	const btunduh=document.getElementById("myunduh")
	if (btunduh!==null){
		btunduh.addEventListener("click", myUnduh)
	}
}catch(e){}
try{
	document.getElementById("btnkeluar").addEventListener("click", myKeluar);
} catch(e){}
