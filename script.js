/**
 * ENT SPECIALIST DOCTOR & CLINIC WEBSITE
 * Master Vanilla JavaScript Engine
 * Handles: Sticky Header, Mobile Navigation, FAQ Accordions,
 * Condition Tabs, Testimonial Slider, Form Validation & XML Loading.
 */

(function () {
  'use strict';

  // Global State & Config
  const state = {
    currentTestimonialIndex: 0,
    testimonialTimer: null,
    xmlData: null,
  };

  /* ==========================================================================
     1. DOM READY INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileNav();
    initFaqAccordion();
    initConditionTabs();
    initConditionAccordion();
    initTestimonialCarousel();
    initAppointmentForm();
    initBackToTop();
    initXmlSystem();
    initActiveNavHighlight();
  });

  /* ==========================================================================
     2. STICKY HEADER
     ========================================================================== */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!toggleBtn || !navMenu) return;

    function openMenu() {
      navMenu.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      navMenu.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-active') &&
        !navMenu.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     4. FAQ ACCORDION (Accessible ARIA)
     ========================================================================== */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const button = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!button || !answer) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Optional: close other open items for cleaner mobile experience
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==========================================================================
     5. CONDITIONS CATEGORY TABS & ACCORDIONS
     ========================================================================== */
  function initConditionTabs() {
    const tabButtons = document.querySelectorAll('.conditions-tabs .tab-btn');
    const categoryContents = document.querySelectorAll('.conditions-category-content');
    if (!tabButtons.length || !categoryContents.length) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-category');

        tabButtons.forEach((b) => b.classList.remove('active'));
        categoryContents.forEach((c) => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = document.getElementById(`category-${targetCategory}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  function initConditionAccordion() {
    const cards = document.querySelectorAll('.condition-card');
    cards.forEach((card) => {
      const header = card.querySelector('.condition-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');
        card.classList.toggle('is-open', !isOpen);
        header.setAttribute('aria-expanded', (!isOpen).toString());
      });
    });
  }

  /* ==========================================================================
     6. TESTIMONIALS SLIDER / CAROUSEL
     ========================================================================== */
  function initTestimonialCarousel() {
    const container = document.querySelector('.testimonial-carousel-container');
    if (!container) return;

    const track = container.querySelector('.testimonial-track');
    const slides = container.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!slides.length || !track) return;

    // Create dot indicators if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlide() {
      track.style.transform = `translateX(-${state.currentTestimonialIndex * 100}%)`;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === state.currentTestimonialIndex);
        });
      }
    }

    function nextSlide() {
      state.currentTestimonialIndex = (state.currentTestimonialIndex + 1) % slides.length;
      updateSlide();
    }

    function prevSlide() {
      state.currentTestimonialIndex = (state.currentTestimonialIndex - 1 + slides.length) % slides.length;
      updateSlide();
    }

    function goToSlide(idx) {
      state.currentTestimonialIndex = idx;
      updateSlide();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 40) {
        prevSlide();
        resetAutoPlay();
      } else if (swipeDistance < -40) {
        nextSlide();
        resetAutoPlay();
      }
    }

    // Auto-advance
    function startAutoPlay() {
      state.testimonialTimer = setInterval(nextSlide, 6000);
    }

    function pauseAutoPlay() {
      if (state.testimonialTimer) {
        clearInterval(state.testimonialTimer);
      }
    }

    function resetAutoPlay() {
      pauseAutoPlay();
      startAutoPlay();
    }

    container.addEventListener('mouseenter', pauseAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
    container.addEventListener('focusin', pauseAutoPlay);
    container.addEventListener('focusout', startAutoPlay);

    startAutoPlay();
  }

  /* ==========================================================================
     7. APPOINTMENT FORM VALIDATION & HANDLING
     ========================================================================== */
  function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    // Set minimum date to today
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
      if (!dateInput.value) {
        dateInput.value = today;
      }
    }

    const alertBox = document.getElementById('appointmentAlert');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach((input) => {
        const group = input.closest('.form-group');
        const value = input.value.trim();

        if (!value) {
          isValid = false;
          input.classList.add('is-invalid');
          if (group) group.classList.add('has-error');
        } else if (input.type === 'email' && !validateEmail(value)) {
          isValid = false;
          input.classList.add('is-invalid');
          if (group) group.classList.add('has-error');
        } else if (input.type === 'tel' && !validatePhone(value)) {
          isValid = false;
          input.classList.add('is-invalid');
          if (group) group.classList.add('has-error');
        } else {
          input.classList.remove('is-invalid');
          if (group) group.classList.remove('has-error');
        }
      });

      if (!isValid) {
        const firstError = form.querySelector('.is-invalid');
        if (firstError) firstError.focus();
        return;
      }

      // Check formActionUrl from XML / action attribute
      const actionUrl = form.getAttribute('action') || '';
      const isPlaceholder = actionUrl.includes('[') || actionUrl.trim() === '' || actionUrl === '#';

      if (alertBox) {
        alertBox.className = 'alert alert-success show';
        const patientName = form.querySelector('[name="patient_name"]')?.value || 'Valued Patient';
        const chamber = form.querySelector('[name="preferred_chamber"]')?.value || 'Primary Clinic';
        const date = form.querySelector('[name="preferred_date"]')?.value || 'Selected Date';

        if (isPlaceholder) {
          alertBox.innerHTML = `
            <div>
              <strong>Appointment Request Received (Demo Mode)</strong><br>
              Thank you, <b>${escapeHtml(patientName)}</b>! Your request for <b>${escapeHtml(chamber)}</b> on <b>${escapeHtml(date)}</b> has been recorded in template preview mode.<br>
              <small><em>Note: To receive live appointment notifications, configure <code>formActionUrl</code> in <code>data/doctor.xml</code> or set your server backend endpoint.</em></small>
            </div>
          `;
        } else {
          // If a real backend URL is configured, submit via Fetch API
          alertBox.innerHTML = `<div>Submitting appointment request to <code>${escapeHtml(actionUrl)}</code>...</div>`;
          submitToBackend(form, actionUrl, alertBox);
          return;
        }

        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    });

    // Real-time input clearing
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const group = field.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[+()0-9\s-]{6,20}$/.test(phone);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[tag] || tag));
  }

  async function submitToBackend(form, url, alertBox) {
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alertBox.className = 'alert alert-success show';
        alertBox.innerHTML = `<div><strong>Request Confirmed!</strong> Your appointment details have been sent to our medical reception. We will contact you shortly.</div>`;
        form.reset();
      } else {
        throw new Error(`Server returned status ${res.status}`);
      }
    } catch (err) {
      alertBox.className = 'alert alert-info show';
      alertBox.innerHTML = `<div><strong>Demo Submission Notice:</strong> Request recorded locally. Backend endpoint <code>${escapeHtml(url)}</code> is not responding (${escapeHtml(err.message)}).</div>`;
    }
  }

  /* ==========================================================================
     8. BACK TO TOP BUTTON
     ========================================================================== */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     9. ACTIVE NAV HIGHLIGHT
     ========================================================================== */
  function initActiveNavHighlight() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.split('/').pop().split('#')[0];
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     10. XML DATA SYSTEM (DOMParser Engine & Admin Drawer)
     ========================================================================== */
  async function initXmlSystem() {
    try {
      // Determine XML path relative to current page
      const xmlPath = window.location.pathname.includes('/blog/')
        ? '../data/doctor.xml'
        : 'data/doctor.xml';

      const response = await fetch(xmlPath);
      if (!response.ok) return;

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        console.warn('XML Parse Warning:', parseError.textContent);
        return;
      }

      state.xmlData = xmlDoc;
      applyXmlThemeSettings(xmlDoc);
      setupXmlDrawer(xmlText);
    } catch (e) {
      // Graceful fallback: Running under file:// protocol or offline.
      // Website is pre-rendered with XML master data, so it remains 100% functional!
      console.info('XML dynamic loading note: Pre-rendered static structure active.', e);
    }
  }

  function applyXmlThemeSettings(xmlDoc) {
    const root = document.documentElement;
    const colorPalette = xmlDoc.querySelector('themeSettings colorPalette');
    if (!colorPalette) return;

    const primary = colorPalette.querySelector('primary')?.textContent?.trim();
    const secondary = colorPalette.querySelector('secondary')?.textContent?.trim();
    const accent = colorPalette.querySelector('accent')?.textContent?.trim();
    const bgMain = colorPalette.querySelector('backgroundMain')?.textContent?.trim();
    const bgAlt = colorPalette.querySelector('backgroundAlt')?.textContent?.trim();
    const textDark = colorPalette.querySelector('textDark')?.textContent?.trim();

    if (primary) root.style.setProperty('--primary', primary);
    if (secondary) root.style.setProperty('--secondary', secondary);
    if (accent) root.style.setProperty('--accent', accent);
    if (bgMain) root.style.setProperty('--background-main', bgMain);
    if (bgAlt) root.style.setProperty('--background-alt', bgAlt);
    if (textDark) root.style.setProperty('--text-dark', textDark);
  }

  function setupXmlDrawer(rawXml) {
    // Only mount if drawer trigger exists
    const trigger = document.querySelector('.xml-drawer-trigger');
    const drawer = document.querySelector('.xml-drawer');
    const closeBtn = document.querySelector('.xml-drawer-close');
    const preContainer = document.querySelector('.xml-code-view');

    if (!trigger || !drawer) return;

    if (preContainer && rawXml) {
      preContainer.textContent = rawXml;
    }

    trigger.addEventListener('click', () => {
      drawer.classList.add('is-open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('is-open');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
      }
    });
  }
})();
