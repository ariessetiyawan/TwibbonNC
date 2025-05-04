(() => {
  var ix = 0;
  var ddhtml = setInterval(() => {
    //https://simkah4.kemenag.go.id/6fb5cdc5-2b80-4514-be3c-a81b304cca71?nip=196404231991031002
    var dt = document.querySelectorAll('#grid_penghulu');
    if (dt.length > 0) {
      var dhtmld = document.body.innerHTML;
      console.log('document.body.innerHTML', dhtmld);
      clearInterval(ddhtml);
    }
    if (ix == 5) {
      clearInterval(ddhtml);
    }
    ix++;
  }, 3000);
  addEvent(document, 'onreadystatechange', function () {
    if (document.readyState == 'complete') console.log('ready');
    var dt = document.body.innerHTML;
    console.log('DOMContentLoaded document.body.innerHTML', dt);
  });

  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function () {
        return obj['e' + type + fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    }
  }
})();
