/* BROKEN ON PURPOSE. Every block below is a deliberate mistake, labelled with its ID.
   Loaded with a plain <script> in <head>, so the page can't even start drawing until it has run. */
(function () {
  function busy(ms) {
    var end = Date.now() + ms;
    while (Date.now() < end) { /* the browser can do nothing else while this spins */ }
  }

  // D-P4: freeze for 1.2 s before the first paint
  busy(1200);

  // D-B3: "unload" is a deprecated event
  window.addEventListener('unload', function () {});

  document.addEventListener('DOMContentLoaded', function () {
    // D-B2: ask for the visitor's location and for notifications the moment the page opens
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function () {}, function () {});
    if (window.Notification && Notification.requestPermission) Notification.requestPermission();

    // D-B7: errors in the console
    console.error('Deliberate error: the bad bakery says hello');
    fetch('assets/data/this-file-does-not-exist.json').catch(function () {});

    // D-P5: twelve 250 ms freezes in a row (about 3 s where taps and scrolls are ignored)
    var n = 0;
    (function chunk() {
      busy(250);
      if (++n < 12) setTimeout(chunk, 20);
    })();

    // D-C2: banners pushed in above content that is already on screen
    setTimeout(function () { insertBanner('Free croissant Fridays! (fictional)'); }, 800);
    setTimeout(renderSpecials, 1200);
    setTimeout(fillPrices, 1300);
    setTimeout(addCrumbs, 1500);
    setTimeout(function () { insertBanner('New: rye Tuesdays (fictional)'); }, 1600);
    setTimeout(function () { insertBanner('We are hiring bakers (fictional)'); }, 2200);
  });

  function insertBanner(text) {
    var b = document.createElement('div');
    b.className = 'banner';
    b.textContent = text;
    var notice = document.querySelector('.notice');
    notice.parentNode.insertBefore(b, notice.nextSibling);
  }

  // D-R2: content that only exists after JavaScript runs
  function renderSpecials() {
    var box = document.getElementById('specials');
    if (!box) return;
    box.innerHTML = '<h4>Today\'s specials</h4>' +
      '<p>Maple pecan loaf $9.75 &middot; Cardamom bun $4.50 &middot; Black sesame baguette $5.25</p>';
  }

  function fillPrices() {
    var prices = { levain: '$8.50', croissant: '$3.25', graines: '$9.00', baguette: '$4.25' };
    document.querySelectorAll('[data-price]').forEach(function (td) {
      td.textContent = prices[td.getAttribute('data-price')];
    });
  }

  // D-P7: 3,000 empty elements make every layout and style recalculation slower
  function addCrumbs() {
    var box = document.getElementById('crumbs');
    if (!box) return;
    for (var i = 0; i < 3000; i++) box.appendChild(document.createElement('i'));
  }
})();
