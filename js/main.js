/* =========================================================
   四季彩園 SHIKISAIEN — main.js
   1) スクロールで要素をふわっと表示
   2) 下方向スクロールで固定ヘッダー / 追従CTAを表示
   ========================================================= */
(function () {
  'use strict';

  /* ---- 1) スクロール・リビール ---- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  // /* ---- 2) 固定ヘッダー / 追従CTA ---- */
  var header = document.getElementById('siteHeader');
  var floatCta = document.getElementById('floatCta');
  var SHOW_AFTER = 480; // 何px スクロールしたら表示するか

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var show = y > SHOW_AFTER;
    if (header) header.classList.toggle('is-show', show);
    if (floatCta) floatCta.classList.toggle('is-show', show);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 3) ドロワーナビ ---- */
  var navToggle  = document.getElementById('navToggle');
  var navClose   = document.getElementById('navClose');
  var navDrawer  = document.getElementById('navDrawer');
  var navOverlay = document.getElementById('navOverlay');

  function openNav() {
    navDrawer.classList.add('is-open');
    navOverlay.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
  }
  function closeNav() {
    navDrawer.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
  }

  if (navToggle)  navToggle.addEventListener('click', openNav);
  if (navClose)   navClose.addEventListener('click', closeNav);
  if (navOverlay) navOverlay.addEventListener('click', closeNav);
  if (navDrawer)  navDrawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeNav);
  });
})();
