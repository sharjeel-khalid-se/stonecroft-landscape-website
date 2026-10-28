/* ==========================================
   STONECROFT LANDSCAPING — Main JavaScript
   ========================================== */

(function () {
  'use strict';

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavigation();
    initStickyHeader();
    initScrollAnimations();
    initSmoothScroll();
    initActiveNavLink();
    initBackToTop();
    initContactForm();
    initGalleryFilter();
    initLightbox();
  }

  // ---- Mobile Navigation ----
  function initNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('nav-overlay');

    if (!toggle || !nav) return;

    function openNav() {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close nav on link click
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // ---- Sticky Header ----
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    var lastScroll = 0;
    var ticking = false;

    function onScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // Run once on page load
    onScroll();
  }

  // ---- Scroll Animations ----
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    if (!elements.length) return;

    // Set stagger indices
    document.querySelectorAll('.stagger').forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.style.setProperty('--i', i);
      });
    });

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ---- Smooth Scroll for Anchor Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- Active Nav Link ----
  function initActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      var linkPage = href.split('/').pop();

      if (linkPage === currentPage) {
        link.classList.add('active');
      } else if (currentPage === '' && linkPage === 'index.html') {
        link.classList.add('active');
      } else if (currentPage.indexOf('blog-') === 0 && linkPage === 'blog.html') {
        link.classList.add('active');
      }
    });
  }

  // ---- Back to Top ----
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.pageYOffset > 600) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact Form Validation ----
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var successEl = form.querySelector('.form-success') || document.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check
      var hp = form.querySelector('.form-hp input');
      if (hp && hp.value !== '') return;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('error');
      });

      var valid = true;

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        var group = field.closest('.form-group');
        if (!field.value.trim()) {
          if (group) group.classList.add('error');
          valid = false;
        }
      });

      // Validate email
      var email = form.querySelector('[type="email"]');
      if (email && email.value.trim()) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          var group = email.closest('.form-group');
          if (group) group.classList.add('error');
          valid = false;
        }
      }

      // Validate phone (optional, but if filled must be reasonable)
      var phone = form.querySelector('[type="tel"]');
      if (phone && phone.value.trim()) {
        var phoneClean = phone.value.replace(/[\s\-\(\)\.]/g, '');
        if (phoneClean.length < 7 || phoneClean.length > 15) {
          var pGroup = phone.closest('.form-group');
          if (pGroup) pGroup.classList.add('error');
          valid = false;
        }
      }

      if (valid) {
        // Simulate successful submission
        form.style.display = 'none';
        if (successEl) successEl.classList.add('visible');

        // In a real implementation, you would submit to your server here:
        // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      }
    });

    // Real-time validation clearing
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        var group = this.closest('.form-group');
        if (group) group.classList.remove('error');
      });
    });
  }

  // ---- Gallery Filter ----
  function initGalleryFilter() {
    var filters = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery-item[data-category]');

    if (!filters.length || !items.length) return;

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = this.getAttribute('data-filter');

        // Update active button
        filters.forEach(function (f) { f.classList.remove('active'); });
        this.classList.add('active');

        // Filter items
        items.forEach(function (item) {
          var itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = '';
            setTimeout(function () { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(function () { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ---- Lightbox ----
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    // Open lightbox on gallery item click
    document.querySelectorAll('.gallery-item[data-full]').forEach(function (item) {
      item.addEventListener('click', function () {
        var fullSrc = this.getAttribute('data-full');
        var alt = this.querySelector('img') ? this.querySelector('img').alt : '';

        if (lightboxImg) {
          lightboxImg.src = fullSrc;
          lightboxImg.alt = alt;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

})();
