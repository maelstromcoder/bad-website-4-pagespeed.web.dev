/* BROKEN ON PURPOSE. Every block below is a deliberate mistake, labelled with its ID.
   The same file runs on the fixed pages: <html data-fixed="tbt cls ..."> switches off the mistakes they repair.
   On the bad page it is loaded with a plain <script> in <head>, so nothing is drawn until it has run. */
(function () {
  var fixed = (document.documentElement.getAttribute('data-fixed') || '').split(' ');
  var has = function (f) { return fixed.indexOf(f) !== -1; };
  function busy(ms) {
    var end = Date.now() + ms;
    while (Date.now() < end) { /* the browser can do nothing else while this spins */ }
  }

  // D-P4: freeze for 1.2 s before the first paint
  if (!has('tbt')) busy(1200);

  // D-B3: "unload" is a deprecated event
  if (!has('bp')) window.addEventListener('unload', function () {});

  document.addEventListener('DOMContentLoaded', function () {
    if (!has('bp')) {
      // D-B2: ask for the visitor's location and for notifications the moment the page opens
      if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function () {}, function () {});
      if (window.Notification && Notification.requestPermission) Notification.requestPermission();
      // D-B7: errors in the console
      console.error('Deliberate error: the bad bakery says hello');
      fetch('/assets/data/this-file-does-not-exist.json').catch(function () {});
    }
    if (!has('tbt')) {
      // D-P5: twelve 250 ms freezes in a row (about 3 s where taps and scrolls are ignored)
      var n = 0;
      (function chunk() {
        busy(250);
        if (++n < 12) setTimeout(chunk, 20);
      })();
      // D-P7: 3,000 empty elements make every layout and style recalculation slower
      setTimeout(function () {
        var box = document.getElementById('crumbs');
        for (var i = 0; box && i < 3000; i++) box.appendChild(document.createElement('i'));
      }, 1500);
    }
    if (!has('cls')) {
      // D-C2: banners pushed in above content that is already on screen
      setTimeout(function () { insertBanner('Free croissant Fridays!'); }, 800);
      setTimeout(function () { insertBanner('New: rye Tuesdays'); }, 1600);
      setTimeout(function () { insertBanner('We are hiring bakers'); }, 2200);
    }
    if (!has('geo')) {
      // D-R2: content that only exists after JavaScript runs
      setTimeout(function () {
        var box = document.getElementById('specials');
        var h = has('a11y') ? 'h2' : 'h4';
        if (box) box.innerHTML = '<' + h + ' class="specials-title">Today\'s specials</' + h + '>' +
          '<p>Maple pecan loaf $9.75 &middot; Cardamom bun $4.50 &middot; Black sesame baguette $5.25</p>';
      }, 1200);
      setTimeout(function () {
        var prices = { levain: '$8.50', croissant: '$3.25', graines: '$9.00', baguette: '$4.25' };
        document.querySelectorAll('[data-price]').forEach(function (td) {
          td.textContent = prices[td.getAttribute('data-price')];
        });
      }, 1300);
    }
  });

  function insertBanner(text) {
    var b = document.createElement('div');
    b.className = 'banner';
    b.innerHTML = text + ' <span>(fictional)</span>';
    var notice = document.querySelector('.notice');
    notice.parentNode.insertBefore(b, notice.nextSibling);
  }
})();
