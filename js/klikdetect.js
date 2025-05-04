function getParentNode(selection, x) {
  var i = 0;
  for (var i = 0; i < x; i++) {
    selection = selection.parentNode;
  }
  return selection;
}
async function waits(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
window.addEventListener('click', async function (events) {
  try {
    var td = event.target.closest('td');
    var url, tokencsrf;
    //console.log('event.target.closest',td,events)
    if (td) {
      //console.log('klikdetek',td.parentNode.parentNode)
      var isikolom = td.parentElement.innerText.split('\t');
      var xxx = td.parentNode.getAttribute('aria-rowindex');

      var dtelm = document.evaluate(
        '//*[contains(text(),"Tgl. Expired")]',
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      //console.log('dtelm.snapshotLength',dtelm)
      if (dtelm.snapshotLength == 2) {
        //console.log(dtelm.snapshotLength)
        var dt = {};
        //console.log('isikolom',isikolom)
        dt['suami_nama'] = isikolom[9];
        dt['istri_nama'] = isikolom[11];
        dt['no_billing'] = isikolom[4];
        dt['tgl_billing'] = isikolom[5];
        dt['expired_billing'] = isikolom[6];
        dt['setor_billing'] = '600.000,-';
        dt['tglakad'] = isikolom[13];
        dt['pukul'] = isikolom[14];
        dt['lokasi'] = isikolom[15];
        dt['terbilang_billing'] = 'Enam Ratus Ribu Rupiah';
        let isiBILLING = dt;
        //console.log('isiBILLING',isiBILLING)
        chrome.storage.sync.set({ isiBILLING });
      } else {
        //console.log('isikolom',isikolom[3])
        chrome.storage.sync.get('LAPXLS', (dat) => {
          if (!dat['LAPXLS']) {
            //console.log('tglakad',isikolom[9])
            let LAPXLS_TGL = isikolom[9];
            chrome.storage.sync.set({ LAPXLS_TGL });
          }
        });
      }

      var dtaf = document.querySelectorAll('#gridValidasi');
      //if buka daftarnikah get urlnya
      if (dtaf.length > 0) {
        var htmlisi = document.body.innerHTML;
        var nmde =
          htmlisi
            .split('function Edit(no_daftar){')[1]
            .replace('\n', '')
            .split(';')[0]
            .split('"')[1] + '?no_daftar=';
        var URL_END_POINT_DAFTAR = nmde;
        chrome.storage.sync.set({ URL_END_POINT_DAFTAR });
        chrome.storage.local.set({ URL_END_POINT_DAFTAR });
        //console.log('Daftar nikah',nmde)
      }
      var dtaf = document.querySelectorAll('#grid');
      if (dtaf.length > 0) {
        var htmlisi = document.body.innerHTML;
        var nmde =
          htmlisi
            .split('function Pemeriksaan(no_daftar){')[1]
            .replace('\n', '')
            .split(';')[0]
            .split('"')[1] + '?status_edit=pemeriksaan&no_daftar=';
        //https://simkah4.kemenag.go.id/5c599d9b-6a66-44e7-a23f-d194b603614c?no_daftar=ND00383515161102022&status_edit=pemeriksaan
        var URL_END_POINT_NB = nmde;
        chrome.storage.sync.set({ URL_END_POINT_NB });
        chrome.storage.local.set({ URL_END_POINT_NB });
      }
      var dtaf = document.querySelectorAll('#gridPencatatan');
      if (dtaf.length > 0) {
        var htmlisi = document.body.innerHTML;
        var nmde =
          htmlisi
            .split('function EditData(no_daftar){')[1]
            .split(';')[0]
            .split('"')[1] + '?status_edit=pencatatan&no_daftar=';
        var URL_END_POINT1 = nmde;
        chrome.storage.sync.set({ URL_END_POINT1 });
        chrome.storage.local.set({ URL_END_POINT1 });

        var nmde =
          htmlisi
            .split('function EditPencatatan(no_daftar){')[1]
            .split(';')[0]
            .split('"')[1] + '?param=edit&no_daftar=';
        var URL_END_POINT = nmde;
        chrome.storage.sync.set({ URL_END_POINT });
        chrome.storage.local.set({ URL_END_POINT });

        var nmde =
          htmlisi
            .split('function EditFoto(no_daftar){')[1]
            .replace('\n', '')
            .split(';')[0]
            .split('"')[1] + '?no_daftar=';
        var URL_END_POINT_PHOTO = nmde;
        chrome.storage.sync.set({ URL_END_POINT_PHOTO });
        chrome.storage.local.set({ URL_END_POINT_PHOTO });

        var nmde = htmlisi
          .split(
            "else if(value.itemData.text=='Cetak Kartu Nikah Digital'){"
          )[1]
          .split('});')[1]
          .split('"')[1];
        var URL_KARTUNIKAH = nmde;
        chrome.storage.sync.set({ URL_KARTUNIKAH });
        chrome.storage.local.set({ URL_KARTUNIKAH });

        var nmde = htmlisi
          .split("}else if(value.itemData.text=='Cetak Buku Nikah 2022'){")[1]
          .split('var url = "')[1]
          .split('"')[0]
          .trim();
        var URL_BUKUNIKAH_DL = nmde;
        chrome.storage.sync.set({ URL_BUKUNIKAH_DL });
        chrome.storage.local.set({ URL_BUKUNIKAH_DL });

        var nmde =
          htmlisi.split('function Lihat(no_daftar){')[1].split('"')[1] +
          '?no_daftar=';
        var URL_BILLING = nmde;
        var URL_NTPN = URL_BILLING;
        chrome.storage.sync.set({ URL_BILLING });
        chrome.storage.local.set({ URL_BILLING });
        chrome.storage.sync.set({ URL_NTPN });
        chrome.storage.local.set({ URL_NTPN });

        var URL_EDITFOTO =
          htmlisi
            .split('function EditFoto(no_daftar){')[1]
            .split('";')[0]
            .split('url = "')[1] + '?no_daftar=';
        //console.log('URL_EDITFOTO',URL_EDITFOTO)
        chrome.storage.sync.set({ URL_EDITFOTO });
        //console.log(htmlisi)
      }
      var dtaf = document.querySelectorAll('#grid_akta');
      if (dtaf.length > 0) {
        var htmlisi = document.body.innerHTML;
        var nmde =
          htmlisi.split('function Detail(no_daftar){')[1].split('"')[1] +
          '?no_daftar=';
        var URL_ARSIP = nmde;
        chrome.storage.sync.set({ URL_ARSIP });
        chrome.storage.local.set({ URL_ARSIP });

        var nmde = htmlisi
          .split("}else if(value.itemData.text=='Cetak Buku Nikah 2022'){")[1]
          .split('"')[1];
        var URL_BUKUNIKAH_ARSIP = nmde;
        chrome.storage.sync.set({ URL_BUKUNIKAH_ARSIP });
        chrome.storage.local.set({ URL_BUKUNIKAH_ARSIP });

        console.log('htmlisi', htmlisi);
      }
    }
    var il = event.target.closest('i');
    if (il) {
      //console.log('IL',il)
      var nmmenu = await chrome.storage.sync.get(['mnuKlik']);
      if (
        il.getAttribute('type') == 'button' &&
        il.getAttribute('class') == 'fa fa-list' &&
        nmmenu['mnuKlik'] == 'Pemeriksaan'
      ) {
        //console.log(il.parentNode.parentNode.parentNode.parentNode.innerText)
        var htmlisi = document.documentElement.outerHTML;
        //console.log('htmlisi',htmlisi)
        if (htmlisi.includes('function Edit(no_daftar){')) {
          url = htmlisi
            .split('function Edit(no_daftar){')[1]
            .split(';')[0]
            .split('=')[1]
            .replaceAll('"', '');
        }
        if (htmlisi.indexOf('csrf-token') > 0) {
          let elems1 = document.querySelector("[name='csrf-token']"); // Grab every element in the dom
          tokencsrf = elems1.getAttribute('content');
        }
        var elmgrid = document.querySelectorAll("[id='grid']");
        //console.log(elmgrid)
        if (elmgrid.length > 0) {
          var isikolom =
            il.parentNode.parentNode.parentNode.parentNode.innerText
              .trim()
              .replace(/\t/g, ';');
          isikolom = isikolom.split(';');
          var dts = isikolom[2];
          console.log('dt grid', dts);
          let menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim Pesan" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-message"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim Pesan</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          var mnu = document.querySelectorAll(
            'div[class="dx-popup-content"]'
          )[1];
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim ke EKUA" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-download"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim ke EKUA</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Berkas Digital" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-pdffile"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Berkas Digital</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);
          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Berkas Digital" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-pdffile"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Ke Gdrive</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);
          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Berkas Digital" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-pdffile"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Media Sosial</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);
        }
      } else if (
        il.getAttribute('type') == 'button' &&
        il.getAttribute('class') == 'fa fa-list' &&
        nmmenu['mnuKlik'] == 'Daftar Nikah'
      ) {
        //console.log(il.parentNode.parentNode.parentNode.parentNode.innerText)
        var htmlisi = document.documentElement.outerHTML;
        //console.log('htmlisi',htmlisi)
        if (htmlisi.includes('function Edit(no_daftar){')) {
          url = htmlisi
            .split('function Edit(no_daftar){')[1]
            .split(';')[0]
            .split('=')[1]
            .replaceAll('"', '');
        }
        if (htmlisi.indexOf('csrf-token') > 0) {
          let elems1 = document.querySelector("[name='csrf-token']"); // Grab every element in the dom
          tokencsrf = elems1.getAttribute('content');
        }
        var elmgrid = document.querySelectorAll("[id='gridValidasi']");
        //console.log(elmgrid)
        if (elmgrid.length > 0) {
          var isikolom =
            il.parentNode.parentNode.parentNode.parentNode.innerText
              .trim()
              .replace(/\t/g, ';');
          isikolom = isikolom.split(';');
          var dts = isikolom[2];
          console.log('dt gridValidasi', dts);
          let menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim Pesan" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-message"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim Pesan</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          var mnu = document.querySelectorAll(
            'div[class="dx-popup-content"]'
          )[1];
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim ke EKUA" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-download"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim ke EKUA</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Berkas Digital" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-pdffile"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Berkas Digital</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);
        }
      } else if (
        il.getAttribute('type') == 'button' &&
        il.getAttribute('class') == 'fa fa-list' &&
        nmmenu['mnuKlik'] == 'Akta Nikah'
      ) {
        var xxx = td.parentNode.getAttribute('aria-rowindex');
        var htmlisi = document.documentElement.outerHTML;
        //console.log('htmlisi',htmlisi)
        if (htmlisi.includes('function EditData(no_daftar){')) {
          url = htmlisi
            .split('function EditData(no_daftar){')[1]
            .split(';')[0]
            .split('=')[1]
            .replaceAll('"', '');
        }
        if (htmlisi.indexOf('csrf-token') > 0) {
          let elems1 = document.querySelector("[name='csrf-token']"); // Grab every element in the dom
          tokencsrf = elems1.getAttribute('content');
        }
        var elmgrid = document.querySelectorAll("[id='gridPencatatan']");
        if (elmgrid.length > 0) {
          var isikolom =
            td.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].querySelector(
              `tr[aria-rowindex="${xxx}"]`
            ).innerText;
          var dts = '';
          if (isikolom.includes('\t')) {
            isikolom = isikolom.replace(/\t/g, ';');
            var dtsx = isikolom.split(';');
            dts = dtsx[1];
          }
          let menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim Pesan" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-message"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim Pesan</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          var mnu = document.querySelectorAll(
            'div[class="dx-popup-content"]'
          )[1];
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Kirim ke EKUA" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-download"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Kirim ke EKUA</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);

          menuwa = `<div class="dx-item-content dx-actionsheet-item-content">
							<div class="dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-icon dx-button-has-text" role="button" aria-label="Berkas Digital" tabindex="0"><div class="dx-button-content"><i class="dx-icon dx-icon-pdffile"></i><span class="dx-button-text" data-no="${dts}" data-url="${url}" data-csrf="${tokencsrf}">Berkas Digital</span></div></div></div>`;
          var newdiv = document.createElement('div');
          newdiv.classList.add('dx-item');
          newdiv.classList.add('dx-actionsheet-item');
          newdiv.insertAdjacentHTML('beforeend', menuwa);
          //var mnu=document.querySelectorAll('div[class="dx-popup-content"]')[1]
          mnu.children[0].append(newdiv);
        }
      }
    }
    var div = event.target.closest('div');
    if (div) {
      //console.log('DIV',div)
      if (
        div.getAttribute('class') == 'dx-button-content' &&
        div.innerText == 'Kirim Pesan'
      ) {
        var elm = div.querySelector('span[class="dx-button-text"]');
        var no = elm.getAttribute('data-no');
        var csrf = elm.getAttribute('data-csrf');
        var url = elm.getAttribute('data-url').trim();
        //console.log(`${url}?no_daftar=${no}`)
        chrome.storage.sync.get(['tmpl_daftarnikah'], async function (dat) {
          var html = await fetch(`${url}?no_daftar=${no}`, {
            headers: {
              accept: '*/*',
              'accept-language': 'en-US,en;q=0.9',
              'sec-ch-ua':
                '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'x-csrf-token': csrf,
              'x-requested-with': 'XMLHttpRequest',
            },
            referrer:
              'https://simkah4.kemenag.go.id/8b01cbba-027e-4d8d-b9a9-2af3c9c43634',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          })
            .then((response) => {
              if (response.ok) {
                return response.text();
              }
              throw new Error('Response was not ok.');
            })
            .then(async (data) => {
              var tmpl_daftarnikah = '';
              //console.log(data)
              tmpl_daftarnikah = dat['tmpl_daftarnikah'];
              //console.log('tmpl_daftarnikah',tmpl_daftarnikah)
              var datas = JSON.parse(data);
              var html = datas.html.split('var data = ')[1].split(';')[0];
              var dts = JSON.parse(html);
              //console.log(dts)
              var masterData = [
                'istri_binti',
                'no_daftar',
                'no_pemeriksaan',
                'tgl_akad',
                'lokasi_akad',
                'jam_akad',
                'suami_nama',
                'suami_umur',
                'suami_nohp',
                'suami_bin',
                'istri_nama',
                'istri_umur',
                'istri_nohp',
              ];
              var datax = {};
              moment.locale('id');
              datax['no_daftar'] = dts['no_daftar'];
              datax['no_pemeriksaan'] = dts['no_daftar'];
              datax['tgl_akad'] = moment(new Date(dts['tgl_akad'])).format(
                'dddd, DD MMMM YYYY'
              );
              datax['lokasi_akad'] = dts['lokasi_akad'];
              datax['jam_akad'] = dts['jam_akad'];
              datax['suami_nama'] = dts['datasuami']['nama'];
              datax['suami_umur'] = dts['datasuami']['umur'].replace(
                ' Tahun',
                ''
              );
              datax['suami_nohp'] = dts['datasuami']['no_hp'];
              datax['suami_bin'] = dts['dataayahsuami']['nama'];
              datax['istri_nama'] = dts['dataistri']['nama'];
              datax['istri_umur'] = dts['dataistri']['umur'].replace(
                ' Tahun',
                ''
              );
              datax['istri_nohp'] = dts['dataistri']['no_hp'];
              datax['istri_binti'] = dts['dataayahistri']['nama'];
              //console.log(datax)
              if (datax['istri_nohp'] == null) {
                datax['istri_nohp'] = '';
              }
              if (datax['suami_nohp'] == null) {
                datax['suami_nohp'] = '';
              }
              var nohp = '';
              if (datax['istri_nohp'].length > 9) {
                try {
                  if (parseInt(datax['istri_nohp'])) {
                    nohp = datax['istri_nohp'] + ',';
                  }
                } catch (e) {}
              }
              if (datax['suami_nohp'].length > 9) {
                try {
                  if (parseInt(datax['suami_nohp'])) {
                    nohp += datax['suami_nohp'];
                  }
                } catch (e) {}
              }

              var isipesan = tmpl_daftarnikah;
              //console.log('isipesan',isipesan)
              if (isipesan !== undefined) {
                for (var i = 0; i < masterData.length; i++) {
                  //console.log(`[${masterData[i]}]`)
                  //console.log(datax[masterData[i]],isipesan.includes(`[${masterData[i]}]`))
                  if (isipesan.includes(`[${masterData[i]}]`)) {
                    isipesan = isipesan.replaceAll(
                      `[${masterData[i]}]`,
                      datax[masterData[i]]
                    );
                  }
                }
                //console.log(isipesan)
                if (nohp == '') {
                  //nohp='085890493171, 085105225764'
                  alert('Nomor Tujuan tidak boleh kosong !');
                  return false;
                }
                var mnuWASEND = true;
                chrome.storage.sync.set({ mnuWASEND });
                var sendWANo = nohp;
                var sendWAMsg = isipesan;
                var sendWAKe = 0;
                chrome.storage.sync.set({ sendWANo });
                chrome.storage.sync.set({ sendWAMsg });
                chrome.storage.sync.set({ sendWAKe });
                const response = await chrome.runtime.sendMessage(
                  { cmd: 'kirimpesan' },
                  async (resp) => {
                    console.log(resp);
                  }
                );
              } else {
                isipesan = '';
                alert('Template Pesan untuk data pendaftaran masih kosong!');
              }
              return isipesan;
            })
            .catch((error) => {
              console.log('error', error);
              return '';
            });
        });
      } else if (
        div.getAttribute('class') ==
          'dx-item-content dx-treeview-item-content' &&
        div.innerText == 'Kecamatan'
      ) {
        //console.log('kecamatan click',div)
      } else if (
        div.getAttribute('class') == 'dx-button-content' &&
        div.innerText == 'Kirim ke EKUA'
      ) {
        var elm = div.querySelector('span[class="dx-button-text"]');
        var no = elm.getAttribute('data-no');
        const response = chrome.runtime.sendMessage({
          cmd: 'daftartoekua',
          no: no,
        });
      } else if (
        div.getAttribute('class') == 'dx-button-content' &&
        div.innerText == 'Berkas Digital'
      ) {
        var data = await chrome.storage.sync.get(['idGAS', 'tokeneKUA']);
        var IDG = data['idGAS'];
        var elm = div.querySelector('span[class="dx-button-text"]');
        var no = elm.getAttribute('data-no');
        var urlx =
          'https://script.google.com/macros/s/' +
          IDG +
          '/exec?aksi=BK_berkasdigital&id=' +
          no;
        console.log('data-no', urlx);
        var dtx = await fetch(urlx, {
          body: null,
          method: 'GET',
          contentType: 'application/json; charset=utf-8',
        })
          .then((response) => {
            if (response.ok) {
              return response.text();
            }
            throw new Error('Response was not ok.');
          })
          .then(async (datax) => {
            console.log(datax);
            return datax;
          });
        console.log(dtx);
      } else if (
        div.getAttribute('class') == 'dx-item-content dx-treeview-item-content'
      ) {
        //console.log(div.textContent())
        try {
          let moduleaktif = div
            .textContent()
            .replace('<span>', '')
            .replace('</span>', '');
          console.log('moduleaktif');
          chrome.storage.sync.set({ moduleaktif });
        } catch (e) {}
      }
    }
  } catch (e) {}
});
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}
