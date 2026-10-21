// Analytics bootstrap. Kept as a same-origin file instead of inline scripts so
// the Content-Security-Policy can allow scripts by origin without
// 'unsafe-inline'. Hosts loaded here are listed in worker/site.ts.

// Google tag (gtag.js). Page views are sent per SPA route by the app.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-S58LTWMLE9', { send_page_view: false });

// Microsoft Clarity
(function (c, l, a, r, i, t, y) {
  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
  t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', 'z0x97gh9xm');
