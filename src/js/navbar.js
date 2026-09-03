(function () {
  function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/public/pages/') !== -1 || path.indexOf('/public/auth/') !== -1 || path.indexOf('/auth/admin/') !== -1 || path.indexOf('/auth/user/') !== -1) {
      return '../../';
    }
    return './';
  }

  function renderNavbar() {
    var basePath = getBasePath();

    if (document.querySelector('.dashboard-layout')) {
      var dashHeader = document.querySelector('.dashboard-header');
      if (dashHeader && !dashHeader.querySelector('.nav-toggles')) {
        var themeSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
        var rtlSvg = 'RTL';
        var profileDropdown = dashHeader.querySelector('.profile-dropdown');
        if (profileDropdown) {
          profileDropdown.insertAdjacentHTML('beforebegin',
            '<div class="nav-toggles">' +
            '<button class="toggle-btn" id="themeToggle" title="Toggle theme" aria-label="Toggle theme">' + themeSvg + '</button>' +
            '<button class="toggle-btn" id="rtlToggle" title="Toggle RTL" aria-label="Toggle RTL">' + rtlSvg + '</button>' +
            '</div>'
          );
        }
      }
      initNavbarEvents();
      if (window.MotorWorks && window.MotorWorks.initTheme && window.MotorWorks.initRTL) {
        window.MotorWorks.initTheme();
        window.MotorWorks.initRTL();
      }
      return;
    }

    var existingHeader = document.querySelector('header.site-header');
    var existingMobile = document.getElementById('mobileMenu');

    var themeSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    var rtlSvg = 'RTL';

    var headerHTML =
      '<header class="site-header">' +
      '<div class="nav">' +
      '<a href="' + basePath + 'index.html" class="logo" aria-label="Riderz Home"><img src="' + basePath + 'assets/img/logo.png" alt="Riderz Logo" class="logo-img"><span class="logo-text-group"><span class="logo-brand-title">Riderz</span></span></a>' +
      '<nav class="navlinks">' +
      '<a href="' + basePath + 'index.html">Home</a>' +
      '<a href="' + basePath + 'public/pages/home-2.html">Home 2</a>' +
      '<a href="' + basePath + 'public/pages/about.html">About</a>' +
      '<a href="' + basePath + 'public/pages/services.html">Services</a>' +
      '<a href="' + basePath + 'public/pages/blog.html">Blog</a>' +
      '<a href="' + basePath + 'public/pages/contact.html">Contact</a>' +
      '</nav>' +
      '<div class="navcta">' +
      '<div class="nav-toggles">' +
      '<button class="toggle-btn" id="themeToggle" title="Toggle theme" aria-label="Toggle theme">' + themeSvg + '</button>' +
      '<button class="toggle-btn" id="rtlToggle" title="Toggle RTL" aria-label="Toggle RTL">' + rtlSvg + '</button>' +
      '</div>' +
      '<a href="' + basePath + 'public/pages/booking.html" class="btn btn-solid nav-book-btn">Book Service</a>' +
      '<button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '</div>' +
      '</header>';

    var mobileHTML =
      '<div class="mobile-menu" id="mobileMenu">' +
      '<button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>' +
      '<div class="mobile-menu-inner">' +
      '<a href="' + basePath + 'index.html" class="mobile-nav-link">Home</a>' +
      '<a href="' + basePath + 'public/pages/home-2.html" class="mobile-nav-link">Home 2</a>' +
      '<a href="' + basePath + 'public/pages/about.html" class="mobile-nav-link">About</a>' +
      '<a href="' + basePath + 'public/pages/services.html" class="mobile-nav-link">Services</a>' +
      '<a href="' + basePath + 'public/pages/blog.html" class="mobile-nav-link">Blog</a>' +
      '<a href="' + basePath + 'public/pages/contact.html" class="mobile-nav-link">Contact</a>' +
      '<a href="' + basePath + 'public/pages/booking.html" class="mobile-nav-link mobile-nav-cta">Book Service</a>' +
      '</div>' +
      '</div>';

    if (existingHeader) {
      existingHeader.outerHTML = headerHTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    if (existingMobile) {
      existingMobile.outerHTML = mobileHTML;
    } else {
      var headerEl = document.querySelector('header.site-header');
      if (headerEl) {
        headerEl.insertAdjacentHTML('afterend', mobileHTML);
      }
    }

    initNavbarEvents();
    if (window.MotorWorks && window.MotorWorks.initTheme && window.MotorWorks.initRTL) {
      window.MotorWorks.initTheme();
      window.MotorWorks.initRTL();
    }
  }

  function initNavbarEvents() {
    var profileToggle = document.getElementById('profileToggle');
    var profileDropdown = document.getElementById('profileDropdown');
    if (profileToggle && profileDropdown) {
      profileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
      });
      document.addEventListener('click', function (e) {
        if (!profileDropdown.contains(e.target) && !profileToggle.contains(e.target)) {
          profileDropdown.classList.remove('active');
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          profileDropdown.classList.remove('active');
          var mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu) mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    var mobileToggle = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileClose = document.getElementById('mobileClose');

    function closeMobile() {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      if (mobileClose) {
        mobileClose.addEventListener('click', closeMobile);
      }
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobile);
      });
    }

    // Active page highlighting on desktop and mobile
    var path = window.location.pathname;
    var currentPage = path.split('/').pop().split('?')[0].split('#')[0] || 'index.html';
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

    function isPageMatch(href) {
      if (!href) return false;
      var linkPage = href.split('/').pop().split('?')[0].split('#')[0];
      if (linkPage === currentPage) return true;
      if (currentPage === 'service-details.html' && linkPage === 'services.html') return true;
      if (currentPage === 'blog-details.html' && linkPage === 'blog.html') return true;
      return false;
    }

    document.querySelectorAll('.navlinks a').forEach(function (link) {
      if (isPageMatch(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });

    document.querySelectorAll('.mobile-menu a').forEach(function (link) {
      if (isPageMatch(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  }

  window.MotorWorks = window.MotorWorks || {};
  window.MotorWorks.renderNavbar = renderNavbar;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();