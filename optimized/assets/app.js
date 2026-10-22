/* FIXED-PAGE script. Same mistakes as /assets/js/app.js, except the ones this page has fixed.
   <html data-fixed="tbt cls ..."> says which fixes are on. */
(function () {
  var fixed = (document.documentElement.getAttribute('data-fixed') || '').split(' ');
  var has = function (f) { return fixed.indexOf(f) !== -1; };
  function busy(ms) { var end = Date.now() + ms; while (Date.now() < end) { /* frozen */ } }

  if (!has('tbt')) busy(1200);
  if (!has('bp')) window.addEventListener('unload', function () {});

  document.addEventListener('DOMContentLoaded', function () {
    if (!has('bp')) {
      if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function () {}, function () {});
      if (window.Notification && Notification.requestPermission) Notification.requestPermission();
      console.error('Deliberate error: the bad bakery says hello');
      fetch('/assets/data/this-file-does-not-exist.json').catch(function () {});
    }
    if (!has('tbt')) {
      var n = 0;
      (function chunk() { busy(250); if (++n < 12) setTimeout(chunk, 20); })();
      setTimeout(function () {
        var box = document.getElementById('crumbs');
        for (var i = 0; i < 3000; i++) box.appendChild(document.createElement('i'));
      }, 1500);
    }
    if (!has('cls')) {
      setTimeout(function () { insertBanner('Free croissant Fridays! (fictional)'); }, 800);
      setTimeout(function () { insertBanner('New: rye Tuesdays (fictional)'); }, 1600);
    setTimeout(function () { insertBanner('We are hiring bakers (fictional)'); }, 2200);
    }
    if (!has('geo')) {
      setTimeout(function () {
        document.getElementById('specials').innerHTML = '<h4>Today\'s specials</h4>' +
          '<p>Maple pecan loaf $9.75 &middot; Cardamom bun $4.50 &middot; Black sesame baguette $5.25</p>';
      }, 1200);
    }
  });

  function insertBanner(text) {
    var b = document.createElement('div');
    b.className = 'banner';
    b.textContent = text;
    var notice = document.querySelector('.notice');
    notice.parentNode.insertBefore(b, notice.nextSibling);
  }
})();
