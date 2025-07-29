/**
* Template Name: Sailor
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const articles = document.querySelectorAll(".article-item");
    const pageLinks = document.querySelectorAll(".page-link");

    function showPage(page) {
      articles.forEach(article => {
        if (article.getAttribute("data-page") === page) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    }

    pageLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        pageLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
        showPage(page);
      });
    });

    // Initially show the first page
    showPage("1");
  });
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const testimonialItem = this.closest('.testimonial-item');
        testimonialItem.classList.toggle('expanded');
  
        // Toggle button text
        if (testimonialItem.classList.contains('expanded')) {
          this.textContent = 'Read Less';
        } else {
          this.textContent = 'Read More';
        }
      });
    });
  });
 
   /**
         * Yanda Accessibility Suite - Fixed Version
         */
        class YandaAccessibility {
            constructor() {
                this.speechSynthesis = window.speechSynthesis;
                this.currentUtterance = null;
                this.isReading = false;
                this.currentElement = null;
                this.readableContent = [];
                this.currentIndex = 0;
                this.settings = this.loadSettings();
                
                this.init();
            }

            init() {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => this.setupAccessibility());
                } else {
                    this.setupAccessibility();
                }
            }

            setupAccessibility() {
                this.bindEvents();
                this.loadSavedSettings();
                this.setupKeyboardShortcuts();
                this.announcePageLoad();
                this.updateSpeedDisplay();
            }

            bindEvents() {
                const toggle = document.getElementById('accessibilityToggle');
                const options = document.getElementById('accessibilityOptions');
                
                if (!toggle || !options) {
                    console.warn('Yanda Accessibility: Required elements not found');
                    return;
                }

                // Toggle accessibility menu
                toggle.addEventListener('click', () => {
                    const isOpen = options.classList.contains('active');
                    options.classList.toggle('active');
                    toggle.setAttribute('aria-expanded', !isOpen);
                    
                    if (!isOpen) {
                        const firstOption = options.querySelector('.accessibility-option');
                        if (firstOption) {
                            setTimeout(() => firstOption.focus(), 100);
                        }
                    }
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.accessibility-menu')) {
                        options.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && options.classList.contains('active')) {
                        options.classList.remove('active');
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.focus();
                    }
                });

                this.bindAccessibilityFeatures();
            }

            bindAccessibilityFeatures() {
                // High Contrast
                const highContrast = document.getElementById('highContrast');
                if (highContrast) {
                    highContrast.addEventListener('click', () => this.toggleHighContrast());
                }

                // Large Text
                const largeText = document.getElementById('largeText');
                if (largeText) {
                    largeText.addEventListener('click', () => this.toggleLargeText());
                }

                // Enhanced Focus
                const enhancedFocus = document.getElementById('enhancedFocus');
                if (enhancedFocus) {
                    enhancedFocus.addEventListener('click', () => this.toggleEnhancedFocus());
                }

                // Reading Mode
                const readingMode = document.getElementById('readingMode');
                if (readingMode) {
                    readingMode.addEventListener('click', () => this.toggleReadingMode());
                }

                // Pause Animations
                const pauseAnimations = document.getElementById('pauseAnimations');
                if (pauseAnimations) {
                    pauseAnimations.addEventListener('click', () => this.togglePauseAnimations());
                }

                // TTS Controls
                this.bindTTSControls();

                // Reset All
                const resetAll = document.getElementById('resetAll');
                if (resetAll) {
                    resetAll.addEventListener('click', () => this.resetAll());
                }
            }

            bindTTSControls() {
                const startTTS = document.getElementById('startTTS');
                const pauseTTS = document.getElementById('pauseTTS');
                const stopTTS = document.getElementById('stopTTS');
                const speechRate = document.getElementById('speechRate');

                if (startTTS) {
                    startTTS.addEventListener('click', () => this.toggleTTS());
                }

                if (pauseTTS) {
                    pauseTTS.addEventListener('click', () => this.pauseResumeTTS());
                }

                if (stopTTS) {
                    stopTTS.addEventListener('click', () => this.stopTTS());
                }

                if (speechRate) {
                    speechRate.addEventListener('input', () => {
                        this.settings.speechRate = speechRate.value;
                        this.saveSettings();
                        this.updateSpeedDisplay();
                    });
                }
            }

            updateSpeedDisplay() {
                const speedValue = document.getElementById('speedValue');
                const speechRate = document.getElementById('speechRate');
                if (speedValue && speechRate) {
                    speedValue.textContent = `${parseFloat(speechRate.value).toFixed(1)}x`;
                }
            }

            // Accessibility Feature Methods
            toggleHighContrast() {
                document.body.classList.toggle('high-contrast');
                const button = document.getElementById('highContrast');
                const isActive = document.body.classList.contains('high-contrast');
                
                button.classList.toggle('active', isActive);
                this.settings.highContrast = isActive;
                this.saveSettings();
                this.announceFeature('High contrast', isActive);
            }

            toggleLargeText() {
                document.body.classList.toggle('large-text');
                const button = document.getElementById('largeText');
                const isActive = document.body.classList.contains('large-text');
                
                button.classList.toggle('active', isActive);
                this.settings.largeText = isActive;
                this.saveSettings();
                this.announceFeature('Large text', isActive);
            }

            toggleEnhancedFocus() {
                document.body.classList.toggle('enhanced-focus');
                const button = document.getElementById('enhancedFocus');
                const isActive = document.body.classList.contains('enhanced-focus');
                
                button.classList.toggle('active', isActive);
                this.settings.enhancedFocus = isActive;
                this.saveSettings();
                this.announceFeature('Enhanced focus', isActive);
            }

            toggleReadingMode() {
                document.body.classList.toggle('reading-mode');
                const button = document.getElementById('readingMode');
                const isActive = document.body.classList.contains('reading-mode');
                
                button.classList.toggle('active', isActive);
                this.settings.readingMode = isActive;
                this.saveSettings();
                this.announceFeature('Reading mode', isActive);
            }

            togglePauseAnimations() {
                document.body.classList.toggle('no-animations');
                const button = document.getElementById('pauseAnimations');
                const isActive = document.body.classList.contains('no-animations');
                
                button.classList.toggle('active', isActive);
                this.settings.pauseAnimations = isActive;
                this.saveSettings();
                this.announceFeature('Animation pause', isActive);
            }

            // Text-to-Speech Methods
            getReadableText() {
                const mainContent = document.querySelector('main') || document.querySelector('.demo-content') || document.body;
                const textContent = [];
                
                const selectors = [
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'p', 'li', 'blockquote', 'figcaption'
                ];
                
                selectors.forEach(selector => {
                    const elements = mainContent.querySelectorAll(selector);
                    elements.forEach(element => {
                        const text = this.getCleanText(element);
                        if (text && text.length > 3 && !this.isElementHidden(element)) {
                            textContent.push({
                                element: element,
                                text: text,
                                type: element.tagName.toLowerCase()
                            });
                        }
                    });
                });
                
                return this.removeDuplicateContent(textContent);
            }

            getCleanText(element) {
                const clone = element.cloneNode(true);
                clone.querySelectorAll('script, style, [hidden], .sr-only').forEach(el => el.remove());
                
                let text = clone.textContent || clone.innerText || '';
                text = text.trim().replace(/\s+/g, ' ');
                
                const skipPatterns = [
                    /^(home|about|services|contact|menu|skip to|navigation)$/i,
                    /^(click here|read more|learn more|view more)$/i,
                    /^\s*$/
                ];
                
                return skipPatterns.some(pattern => pattern.test(text)) ? '' : text;
            }

            isElementHidden(element) {
                const style = window.getComputedStyle(element);
                return style.display === 'none' || 
                       style.visibility === 'hidden' || 
                       style.opacity === '0' ||
                       element.hidden ||
                       element.getAttribute('aria-hidden') === 'true';
            }

            removeDuplicateContent(textContent) {
                const seen = new Set();
                return textContent.filter(item => {
                    const key = item.text.toLowerCase().substring(0, 50);
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
            }

            toggleTTS() {
                if (this.isReading) {
                    if (this.speechSynthesis.paused) {
                        this.resumeTTS();
                    } else {
                        this.pauseTTS();
                    }
                } else {
                    this.startTTS();
                }
            }

            startTTS() {
                this.readableContent = this.getReadableText();
                
                if (this.readableContent.length === 0) {
                    this.announceMessage('No readable content found on this page');
                    return;
                }

                this.isReading = true;
                this.currentIndex = 0;
                
                const startButton = document.getElementById('startTTS');
                if (startButton) {
                    startButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
                    startButton.classList.add('active');
                }

                this.announceMessage(`Starting to read page content. ${this.readableContent.length} items found.`);
                
                setTimeout(() => {
                    this.readNext();
                }, 1000);
            }

            readNext() {
                if (this.currentIndex >= this.readableContent.length || !this.isReading) {
                    this.stopTTS();
                    return;
                }

                const item = this.readableContent[this.currentIndex];
                this.highlightElement(item.element);

                let textToRead = item.text;
                if (item.type.match(/^h[1-6]$/)) {
                    textToRead = `Heading: ${textToRead}`;
                }

                this.currentUtterance = new SpeechSynthesisUtterance(textToRead);
                this.currentUtterance.rate = parseFloat(this.settings.speechRate) || 1;
                this.currentUtterance.pitch = 1;
                this.currentUtterance.volume = 1;

                this.currentUtterance.onend = () => {
                    if (this.isReading) {
                        this.currentIndex++;
                        setTimeout(() => this.readNext(), 300);
                    }
                };

                this.currentUtterance.onerror = (e) => {
                    console.warn('TTS Error:', e);
                    if (this.isReading) {
                        this.currentIndex++;
                        this.readNext();
                    }
                };

                this.speechSynthesis.speak(this.currentUtterance);
            }

            pauseTTS() {
                if (this.speechSynthesis.speaking && !this.speechSynthesis.paused) {
                    this.speechSynthesis.pause();
                    const startButton = document.getElementById('startTTS');
                    if (startButton) {
                        startButton.innerHTML = '<i class="fas fa-play"></i> Resume';
                    }
                }
            }

            resumeTTS() {
                if (this.speechSynthesis.paused) {
                    this.speechSynthesis.resume();
                    const startButton = document.getElementById('startTTS');
                    if (startButton) {
                        startButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
                    }
                }
            }

            pauseResumeTTS() {
                if (this.speechSynthesis.speaking && !this.speechSynthesis.paused) {
                    this.pauseTTS();
                } else if (this.speechSynthesis.paused) {
                    this.resumeTTS();
                }
            }

            stopTTS() {
                this.speechSynthesis.cancel();
                this.isReading = false;
                this.currentIndex = 0;
                
                const startButton = document.getElementById('startTTS');
                if (startButton) {
                    startButton.innerHTML = '<i class="fas fa-play"></i> Start';
                    startButton.classList.remove('active');
                }

                this.removeAllHighlights();
            }

            highlightElement(element) {
                this.removeAllHighlights();
                
                if (element) {
                    element.classList.add('text-highlight');
                    this.currentElement = element;
                    
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest'
                    });
                }
            }

            removeAllHighlights() {
                document.querySelectorAll('.text-highlight').forEach(el => {
                    el.classList.remove('text-highlight');
                });
                this.currentElement = null;
            }

            // Utility Methods
            announceFeature(feature, isEnabled) {
                const status = isEnabled ? 'enabled' : 'disabled';
                this.announceMessage(`${feature} ${status}`);
            }

            announceMessage(message) {
                let liveRegion = document.getElementById('yanda-live-region');
                if (!liveRegion) {
                    liveRegion = document.createElement('div');
                    liveRegion.id = 'yanda-live-region';
                    liveRegion.setAttribute('aria-live', 'polite');
                    liveRegion.setAttribute('aria-atomic', 'true');
                    liveRegion.className = 'sr-only';
                    document.body.appendChild(liveRegion);
                }
                
                liveRegion.textContent = '';
                setTimeout(() => {
                    liveRegion.textContent = message;
                }, 100);
            }

            announcePageLoad() {
                const pageTitle = document.title || 'Page';
                setTimeout(() => {
                    this.announceMessage(`${pageTitle} loaded. Press Alt+A for accessibility options.`);
                }, 2000);
            }

            resetAll() {
                this.stopTTS();
                
                document.body.classList.remove(
                    'high-contrast', 
                    'large-text', 
                    'enhanced-focus', 
                    'reading-mode', 
                    'no-animations'
                );
                
                document.querySelectorAll('.accessibility-option').forEach(option => {
                    option.classList.remove('active');
                });
                
                this.settings = {
                    highContrast: false,
                    largeText: false,
                    enhancedFocus: false,
                    readingMode: false,
                    pauseAnimations: false,
                    speechRate: 1
                };
                
                const speechRateInput = document.getElementById('speechRate');
                if (speechRateInput) {
                    speechRateInput.value = 1;
                    this.updateSpeedDisplay();
                }
                
                this.saveSettings();
                this.announceMessage('All accessibility features reset');
            }

            // Settings Management
            loadSettings() {
                try {
                    const saved = localStorage.getItem('yanda-accessibility-settings');
                    return saved ? JSON.parse(saved) : {
                        highContrast: false,
                        largeText: false,
                        enhancedFocus: false,
                        readingMode: false,
                        pauseAnimations: false,
                        speechRate: 1
                    };
                } catch (e) {
                    console.warn('Could not load accessibility settings:', e);
                    return {
                        highContrast: false,
                        largeText: false,
                        enhancedFocus: false,
                        readingMode: false,
                        pauseAnimations: false,
                        speechRate: 1
                    };
                }
            }

            saveSettings() {
                try {
                    localStorage.setItem('yanda-accessibility-settings', JSON.stringify(this.settings));
                } catch (e) {
                    console.warn('Could not save accessibility settings:', e);
                }
            }

            loadSavedSettings() {
                // Apply saved settings
                if (this.settings.highContrast) {
                    document.body.classList.add('high-contrast');
                    document.getElementById('highContrast')?.classList.add('active');
                }
                
                if (this.settings.largeText) {
                    document.body.classList.add('large-text');
                    document.getElementById('largeText')?.classList.add('active');
                }
                
                if (this.settings.enhancedFocus) {
                    document.body.classList.add('enhanced-focus');
                    document.getElementById('enhancedFocus')?.classList.add('active');
                }
                
                if (this.settings.readingMode) {
                    document.body.classList.add('reading-mode');
                    document.getElementById('readingMode')?.classList.add('active');
                }
                
                if (this.settings.pauseAnimations) {
                    document.body.classList.add('no-animations');
                    document.getElementById('pauseAnimations')?.classList.add('active');
                }

                // Set speech rate
                const speechRateInput = document.getElementById('speechRate');
                if (speechRateInput) {
                    speechRateInput.value = this.settings.speechRate || 1;
                }
            }

            // Keyboard Shortcuts
            setupKeyboardShortcuts() {
                document.addEventListener('keydown', (e) => {
                    // Alt + A: Toggle accessibility menu
                    if (e.altKey && e.key.toLowerCase() === 'a') {
                        e.preventDefault();
                        document.getElementById('accessibilityToggle')?.click();
                    }
                    
                    // Alt + R: Start/pause reading
                    if (e.altKey && e.key.toLowerCase() === 'r') {
                        e.preventDefault();
                        this.toggleTTS();
                    }
                    
                    // Alt + S: Stop reading
                    if (e.altKey && e.key.toLowerCase() === 's') {
                        e.preventDefault();
                        this.stopTTS();
                    }
                    
                    // Alt + H: Toggle high contrast
                    if (e.altKey && e.key.toLowerCase() === 'h') {
                        e.preventDefault();
                        this.toggleHighContrast();
                    }
                    
                    // Alt + T: Toggle large text
                    if (e.altKey && e.key.toLowerCase() === 't') {
                        e.preventDefault();
                        this.toggleLargeText();
                    }
                    
                    // Alt + F: Toggle enhanced focus
                    if (e.altKey && e.key.toLowerCase() === 'f') {
                        e.preventDefault();
                        this.toggleEnhancedFocus();
                    }
                });

                // Click-to-read with Alt+Click
                document.addEventListener('click', (e) => {
                    if (e.altKey) {
                        e.preventDefault();
                        const text = this.getCleanText(e.target);
                        if (text && text.length > 0) {
                            this.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(text);
                            utterance.rate = parseFloat(this.settings.speechRate) || 1;
                            this.speechSynthesis.speak(utterance);
                            
                            // Temporarily highlight clicked element
                            e.target.classList.add('text-highlight');
                            setTimeout(() => {
                                e.target.classList.remove('text-highlight');
                            }, 2000);
                        }
                    }
                });
            }
        }

        // Initialize when DOM is ready
        (() => {
            if (typeof window !== 'undefined') {
                window.YandaAccessibility = YandaAccessibility;
                
                // Auto-initialize
                new YandaAccessibility();
            }
        })();

  
  

})();