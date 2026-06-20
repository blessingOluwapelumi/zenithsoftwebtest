document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. STICKY NAVIGATION LOGIC
    // ==========================================
    const topBar = document.getElementById("topBar");
    const mainNavbar = document.getElementById("mainNavbar");
    
    const stickyActivationPoint = topBar.offsetHeight;

    window.addEventListener("scroll", () => {
        if (window.scrollY > stickyActivationPoint) {
            mainNavbar.classList.add("sticky");
            topBar.style.transform = "translateY(-100%)";
            topBar.style.position = "absolute"; 
        } else {
            mainNavbar.classList.remove("sticky");
            topBar.style.transform = "translateY(0)";
            topBar.style.position = "relative";
        }
    });

    // ==========================================
    // 2. HERO SLIDER & SLIDESHOW TEXT ROTATION
    // ==========================================
    const slides = document.querySelectorAll(".hero-slide");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");

    const dynamicContents = [
        {
            title: "Real-time reporting",
            subtitle: "Gain actionable, automated analytical insights over your entire enterprise workspace instantly."
        },
        {
            title: "Seamless Cloud Architecture",
            subtitle: "Migrate your physical workflow ecosystems into high availability dynamic secure cluster assets."
        },
        {
            title: "Innovative Engineering",
            subtitle: "Custom application structures tailor built from concept validation phases down directly to implementation."
        },
        {
            title: "Strategic ERP Deployments",
            subtitle: "Maximize functional tracking operational ROI parameters using verified enterprise frameworks."
        }
    ];

    let currentSlideIndex = 0;
    
    // Change this value to adjust image swap speed (e.g., 4000 = 4 seconds)
    const changeIntervalDuration = 4000; 

    const cycleHeroElements = () => {
        slides[currentSlideIndex].classList.remove("active");
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add("active");

        heroTitle.style.opacity = "0";
        heroSubtitle.style.opacity = "0";

        setTimeout(() => {
            heroTitle.textContent = dynamicContents[currentSlideIndex].title;
            heroSubtitle.textContent = dynamicContents[currentSlideIndex].subtitle;
            
            heroTitle.style.opacity = "1";
            heroSubtitle.style.opacity = "1";
        }, 400);
    };

    setInterval(cycleHeroElements, changeIntervalDuration);

    // ==========================================
    // 3. NEW: SLIDE IN INFO BOXES ON SCROLL
    // ==========================================
    const boxes = document.querySelectorAll('.info-box');

    const infoBoxOptions = {
        root: null,         // Uses browser viewport context
        threshold: 0.05,    // Triggers as soon as 5% of the box enters the screen
        rootMargin: "0px 0px -10px 0px"
    };

    const infoBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            } else {
                entry.target.classList.remove('slide-in'); // Replays animation when scrolling back up
            }
        });
    }, infoBoxOptions);

    boxes.forEach(box => infoBoxObserver.observe(box));

    // ==========================================
    // 4. RESPONSIVE MENU INTERACTIVE BEHAVIORS
    // ==========================================
    const dropdownContainers = document.querySelectorAll(".nav-item-dropdown");
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const navLinks = document.getElementById("navLinks");
    let hideTimeout;

    menuToggle.addEventListener("click", () => navLinks.classList.add("active"));
    menuClose.addEventListener("click", () => navLinks.classList.remove("active"));

    dropdownContainers.forEach(container => {
        const trigger = container.querySelector(".dropdown-trigger");
        const pane = container.querySelector(".dropdown-pane");
        const arrow = container.querySelector(".nav-arrow");

        if (!trigger || !pane) return;

        const openPaneDesktop = () => {
            if (window.innerWidth > 1024) {
                clearTimeout(hideTimeout);
                document.querySelectorAll(".dropdown-pane").forEach(p => {
                    if (p !== pane) p.classList.remove("show");
                });
                pane.classList.add("show");
            }
        };

        const closePaneDesktop = () => {
            if (window.innerWidth > 1024) {
                hideTimeout = setTimeout(() => pane.classList.remove("show"), 150);
            }
        };

        container.addEventListener("mouseenter", openPaneDesktop);
        container.addEventListener("mouseleave", closePaneDesktop);
        pane.addEventListener("mouseenter", openPaneDesktop);
        pane.addEventListener("mouseleave", closePaneDesktop);

        trigger.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const currentlyOpen = pane.classList.contains("show");

                document.querySelectorAll(".dropdown-pane").forEach(p => p.classList.remove("show"));
                document.querySelectorAll(".nav-arrow").forEach(a => a.style.transform = "");

                if (!currentlyOpen) {
                    pane.classList.add("show");
                    if (arrow) arrow.style.transform = "rotate(180deg)";
                }
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove("active");
            document.querySelectorAll(".dropdown-pane").forEach(p => {
                p.classList.remove("show");
                p.style.maxHeight = "";
            });
            document.querySelectorAll(".nav-arrow").forEach(a => a.style.transform = "");
        }
    });
});


// ==========================================================================
// ABOUT US SECTION SCROLL ANIMATIONS
// ==========================================================================
const aboutVisualCol = document.querySelector('.about-visual-column');
const aboutTextCol = document.querySelector('.about-text-column');

function animateAboutSection() {
  // Elements trigger gracefully when 15% inside the view area boundaries
  const triggerPoint = window.innerHeight * 0.85;

  // Animate Left Column (Logo + Portrait Grid)
  if (aboutVisualCol && !aboutVisualCol.classList.contains('slide-in-left')) {
    if (aboutVisualCol.getBoundingClientRect().top < triggerPoint) {
      aboutVisualCol.classList.add('slide-in-left');
    }
  }

  // Animate Right Column (Text Card)
  if (aboutTextCol && !aboutTextCol.classList.contains('slide-in-right')) {
    if (aboutTextCol.getBoundingClientRect().top < triggerPoint) {
      aboutTextCol.classList.add('slide-in-right');
    }
  }
}

// Event Listeners for smooth execution handling
window.addEventListener('scroll', animateAboutSection);

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateAboutSection, 150); // Safe layout cycle execution delay
});




// ==========================================
// 5. WHY CHOOSE US INTERACTIVE ANIMATION SCENE
// ==========================================
const sectionContainer = document.querySelector('.why-choose-us');
const whyHeader = document.querySelector('.why-header');
const whyItems = document.querySelectorAll('.why-item');

if (sectionContainer && whyHeader) {
    const generalObserverOptions = {
        root: null,
        threshold: 0.15, // Triggers sequence actions when 15% of box target area reveals
        rootMargin: "0px 0px -40px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Unveil section backdrop layer base template
                sectionContainer.classList.add('fade-in');
                
                // 2. Cascade header slide execution sequence
                setTimeout(() => {
                    whyHeader.classList.add('show');
                }, 200);

                // 3. Stagger inner grids dynamic elements generation loops
                whyItems.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 400 + (index * 150)); // Seamless mathematical cascading index generation delays
                });

                // Structural execution trace is finished, close listener instances
                sectionObserver.unobserve(entry.target);
            }
        });
    }, generalObserverOptions);

    sectionObserver.observe(sectionContainer);
}


// services
document.addEventListener("DOMContentLoaded", () => {
    
    // --- SYSTEM A: MULTI-BOX INFINITE AUTO-ROTATION SLIDER LOGIC ---
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsIndicators');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const originalCards = Array.from(track.children);
        const totalOriginals = originalCards.length;
        const cloneCount = 3; 
        
        // Build clone rails layouts
        for (let i = 0; i < cloneCount; i++) {
            const cloneTail = originalCards[i].cloneNode(true);
            cloneTail.classList.add('cloned-card');
            track.appendChild(cloneTail);
            
            const cloneHead = originalCards[totalOriginals - 1 - i].cloneNode(true);
            cloneHead.classList.add('cloned-card');
            track.insertBefore(cloneHead, track.firstChild);
        }

        const allCards = Array.from(track.children);
        let cardIndex = cloneCount; 
        let isTransitioning = false;
        let autoCycleTimer;
        const scrollInterval = 4500; 

        // Build navigation dots UI anchors
        dotsContainer.innerHTML = ''; 
        originalCards.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active-dot');
            dot.addEventListener('click', () => jumpToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updatePosition(animate = true) {
            const currentCard = allCards[cardIndex];
            if (!currentCard) return;

            const cardWidth = currentCard.offsetWidth;
            const cardMarginLeft = parseFloat(window.getComputedStyle(currentCard).marginLeft) || 0;
            const cardMarginRight = parseFloat(window.getComputedStyle(currentCard).marginRight) || 0;
            const fullStepX = cardWidth + cardMarginLeft + cardMarginRight;

            const viewportWidth = track.parentElement.offsetWidth;
            const centerOffset = (viewportWidth / 2) - (fullStepX / 2) - cardMarginLeft;

            if (animate) {
                track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
            } else {
                track.style.transition = "none";
            }

            const translateValue = -(cardIndex * fullStepX) + centerOffset;
            track.style.transform = `translateX(${translateValue}px)`;

            allCards.forEach((box, idx) => {
                if (idx === cardIndex) {
                    box.classList.add('focused-box');
                } else {
                    box.classList.remove('focused-box');
                }
            });

            const activeCard = allCards[cardIndex];
            if (activeCard && activeCard.hasAttribute('data-index')) {
                const activeOriginalIndex = parseInt(activeCard.getAttribute('data-index'), 10);
                dots.forEach((dot, idx) => {
                    if (idx === activeOriginalIndex) {
                        dot.classList.add('active-dot');
                    } else {
                        dot.classList.remove('active-dot');
                    }
                });
            }
        }

        function moveNext() {
            if (isTransitioning) return;
            isTransitioning = true;
            cardIndex++;
            updatePosition(true);
        }

        function movePrev() {
            if (isTransitioning) return;
            isTransitioning = true;
            cardIndex--;
            updatePosition(true);
        }

        function jumpToSlide(originalIndex) {
            if (isTransitioning) return;
            cardIndex = originalIndex + cloneCount;
            updatePosition(true);
            restartTimer();
        }

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (cardIndex >= totalOriginals + cloneCount) {
                track.style.transition = "none";
                cardIndex = cloneCount;
                updatePosition(false);
            } else if (cardIndex < cloneCount) {
                track.style.transition = "none";
                cardIndex = totalOriginals + cloneCount - 1;
                updatePosition(false);
            }
        });

        function startTimer() {
            autoCycleTimer = setInterval(moveNext, scrollInterval);
        }

        function restartTimer() {
            clearInterval(autoCycleTimer);
            startTimer();
        }

        nextBtn.addEventListener('click', () => { moveNext(); restartTimer(); });
        prevBtn.addEventListener('click', () => { movePrev(); restartTimer(); });
        window.addEventListener('resize', () => updatePosition(false));

        // Export system bindings to global hooks window scope variables
        window.refreshSliderPosition = () => updatePosition(false);
        window.startSliderRotation = startTimer;
    }

    // --- SYSTEM B: SCROLL REVEAL OBSERVER WITH MULTI-LAYER FALLBACKS ---
    const fullCarouselSection = document.getElementById('storiesCarousel');
    
    if (fullCarouselSection) {
        
        function triggerTheReveal() {
            // Guard loop check parameters
            if (fullCarouselSection.classList.contains('reveal-active')) return;
            
            // 1. Fire up CSS slide transitions reveal mechanics
            fullCarouselSection.classList.add('reveal-active');
            
            // 2. Compute elements dimensions instantly once element paint maps are readable
            setTimeout(() => {
                if (typeof window.refreshSliderPosition === 'function') {
                    window.refreshSliderPosition();
                    window.startSliderRotation();
                }
            }, 150); 
        }

        // Catch Route A: Intersection Observer Mode Configuration Profile (10% standard fold metrics)
        const revealOptions = { root: null, threshold: 0.10, rootMargin: "0px" };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerTheReveal();
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        sectionObserver.observe(fullCarouselSection);

        // Catch Route B: Scroll Event Baseline Calculation Fallbacks
        function checkScrollFallback() {
            const rect = fullCarouselSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.92) {
                triggerTheReveal();
                window.removeEventListener('scroll', checkScrollFallback);
            }
        }
        window.addEventListener('scroll', checkScrollFallback);
        checkScrollFallback(); // Fire directly on start if page refreshed halfway down fold

        // Catch Route C: Fail-Safe Master Timeout Overwrite Engine
        setTimeout(() => {
            triggerTheReveal();
        }, 1500);
    }
});


//track record 
//track record
const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const step = +counter.getAttribute('data-step') || Math.ceil(target / 150);
  const isPercent = target === 100;

  const updateCount = () => {
    const current = +counter.innerText;
    if (current < target) {
      counter.innerText = Math.min(Math.ceil(current + step), target);
      setTimeout(updateCount, 70);
    } else {
      counter.innerText = target + (isPercent ? '%' : '+');
    }
  };

  updateCount();
};

// Observe and start counter only when visible
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      startCounter(counter);
      observer.unobserve(counter); // Start once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// to animate track records

// Slide-up animation on scroll for .track-header and .counter-box
const trackElements = document.querySelectorAll('.track-record-section .track-header, .track-record-section .counter-box');

const trackObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-up');
    }
  });
}, { threshold: 0.3 });

trackElements.forEach(el => trackObserver.observe(el));



// SOFTWARE WE SUPPORT
document.addEventListener("DOMContentLoaded", () => {
    
    const tabButtons = document.querySelectorAll('.nav-pill-btn');
    const cards = document.querySelectorAll('.app-card');
    const revealElements = document.querySelectorAll('.scroll-reveal-element');

    // --- 1. STAGGERED SCROLL REVEAL ENGINE ---
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.02,
            rootMargin: "0px 0px -20px 0px"
        };

        let cardDelayIndex = 0;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (element.classList.contains('app-card')) {
                        if (!element.classList.contains('card-inactive')) {
                            element.style.transitionDelay = `${cardDelayIndex * 80}ms`;
                            cardDelayIndex++;
                        }
                    } else {
                        element.style.transitionDelay = '0ms';
                    }

                    element.classList.add('is-visible');
                    revealObserver.unobserve(element);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }


    // --- 2. SMOOTH TAB FILTER FLUID ANIMATOR ---
    const filterCards = (filterValue) => {
        let staggerIndex = 0;

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (cardCategory === filterValue) {
                // Remove architectural clip/mask flags
                card.classList.remove('card-inactive');
                
                // Stagger loading calculations sequence smoothly
                setTimeout(() => {
                    card.style.transitionDelay = `${staggerIndex * 80}ms`;
                    card.classList.add('is-visible');
                    staggerIndex++;
                }, 30); 

            } else {
                // Reset alternate tab properties down immediately
                card.style.transitionDelay = '0ms';
                card.classList.remove('is-visible');
                card.classList.add('card-inactive');
            }
        });
    };

    // Run engine on launch configuration setting to Dynamics 365 
    filterCards('d365');

    // Tab Switcher Click Handler
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const nextFilterTarget = btn.getAttribute('data-filter');

            // Momentarily pull elements out of visibility frame so they reveal upwards seamlessly
            cards.forEach(card => {
                if(card.getAttribute('data-category') === nextFilterTarget) {
                    card.classList.remove('is-visible');
                }
            });

            // Trigger the fresh staggered reveal sequence
            filterCards(nextFilterTarget);
        });
    });
});


// INDUSTRIES
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // 1. SCROLL REVEAL INTERSECTION OBSERVER
    // ==========================================================
    const revealSection = document.querySelector('.scroll-reveal-section');

    if ('IntersectionObserver' in window) {
        const sectionObserverOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: "0px"
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, sectionObserverOptions);

        if (revealSection) {
            sectionObserver.observe(revealSection);
        }
    } else {
        if (revealSection) revealSection.classList.add('section-visible');
    }


    // ==========================================================
    // 2. SOFT TAB DISPLAY REVEAL CONTROLLER (CLICK HANDLER)
    // ==========================================================
    const menuItems = document.querySelectorAll('.industry-menu-item');
    const contentPanels = document.querySelectorAll('.industry-content-panel');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Guard clause: stop execution if clicking on the currently active tab
            if (item.classList.contains('active')) return;

            // Update active indicators on the left navigation list
            menuItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetCategory = item.getAttribute('data-target');
            const targetPanel = document.getElementById(`panel-${targetCategory}`);

            // Instantly drop old active layout selections and turn off displays
            contentPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none'; 
            });

            if (targetPanel) {
                // Step A: Set structure to flex while element properties stay invisible
                targetPanel.style.display = 'flex';

                // Step B: Double requestAnimationFrame allows browser painting engines
                // to register structural changes before firing off opacity/transform updates.
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        targetPanel.classList.add('active');
                    });
                });
            }
        });
    });
});


// testimonials
document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================================
  // 1. ISOLATED TESTIMONIAL SCROLL REVEAL OBSERVER
  // ==========================================================
  const testimonialSection = document.querySelector('.testimonial-fade-in');

  if (testimonialSection) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('testimonial-visible');
            revealObserver.unobserve(entry.target); 
          }
        });
      }, observerOptions);

      revealObserver.observe(testimonialSection);
    } else {
      testimonialSection.classList.add('testimonial-visible');
    }
  }

  // ==========================================================
  // 2. SEAMLESS GROUP-SHIFT CAROUSEL LOOP ENGINE
  // ==========================================================
  const slider = document.getElementById("testimonialSlider");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");
  const dotsContainer = document.getElementById("testimonialDots");

  if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

  const originalGroups = Array.from(slider.children);
  const totalOriginals = originalGroups.length; // Exactly 3 Group Blocks
  
  let isTransitioning = false;
  let autoPlayTimer = null;

  // Clone exactly 1 group at each end to allow a seamless sliding interface loop
  const appendGroupClones = () => {
    const firstClone = originalGroups[0].cloneNode(true);
    const lastClone = originalGroups[totalOriginals - 1].cloneNode(true);

    firstClone.classList.add('cloned-group');
    lastClone.classList.add('cloned-group');

    slider.insertBefore(lastClone, slider.firstChild);
    slider.appendChild(firstClone);
  };
  appendGroupClones();

  // The track starts balanced at Index 1 due to the prepended clone
  let currentIndex = 1;

  // Render exactly 3 navigation dots to map against your original 3 group slides
  const buildGroupDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalOriginals; i++) {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-dot");
      if (i === 0) dot.classList.add("active");
      
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        resetAutoPlay();
        currentIndex = i + 1;
        updateSliderPosition(true);
      });
      dotsContainer.appendChild(dot);
    }
  };

  const updateSliderPosition = (animate = true) => {
    if (!animate) {
      slider.classList.add('no-transition');
    } else {
      slider.classList.remove('no-transition');
      isTransitioning = true;
    }

    // Measure the exact layout width of a single group block frame
    const groupWidth = originalGroups[0].getBoundingClientRect().width || originalGroups[0].offsetWidth;
    const gapWidth = parseFloat(window.getComputedStyle(slider).gap) || 0;
    
    // Calculate translate displacement offset coordinates
    const targetTranslation = (groupWidth + gapWidth) * currentIndex;
    slider.style.setProperty('transform', `translateX(-${targetTranslation}px)`, 'important');

    // Sync active state indicators on your dot pagination elements
    let realIndex = (currentIndex - 1) % totalOriginals;
    if (realIndex < 0) realIndex += totalOriginals;

    const dots = dotsContainer.querySelectorAll(".testimonial-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === realIndex);
    });
  };

  // Monitor layout boundaries to trigger instant, un-animated coordinate loops
  slider.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // Loop forward snap reset triggers
    if (currentIndex >= totalOriginals + 1) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    // Loop backward snap reset triggers
    if (currentIndex <= 0) {
      currentIndex = totalOriginals;
      updateSliderPosition(false);
    }
  });

  const shiftNext = () => {
    if (isTransitioning) return;
    currentIndex++;
    updateSliderPosition(true);
  };

  const shiftPrev = () => {
    if (isTransitioning) return;
    currentIndex--;
    updateSliderPosition(true);
  };

  const startAutoPlay = () => {
    if (autoPlayTimer === null) {
      autoPlayTimer = setInterval(shiftNext, 5000); // Loops groups every 5 seconds
    }
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
    startAutoPlay();
  };

  // Action Click Click Listeners
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetAutoPlay();
    shiftNext();
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetAutoPlay();
    shiftPrev();
  });

  // Keep dimensions steady when the window resizes
  let resizeDebounce;
  window.addEventListener("resize", () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      updateSliderPosition(false);
    }, 100);
  });

  // Fire engine activation routines
  buildGroupDots();
  updateSliderPosition(false);
  startAutoPlay();
});


// blog
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".blog-card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200); // 200ms stagger between cards
          observer.unobserve(entry.target); // Optional: remove once shown
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach(card => observer.observe(card));
});




















// form and footer
// Footer Scroll Element Animation Engine Tracker
document.addEventListener("DOMContentLoaded", () => {
  const revealForm = document.querySelector('.footer-form-reveal');

  if (revealForm) {
    if ('IntersectionObserver' in window) {
      const formObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      };

      const formRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('form-visible');
            formRevealObserver.unobserve(entry.target); 
          }
        });
      }, formObserverOptions);

      formRevealObserver.observe(revealForm);
    } else {
      revealForm.classList.add('form-visible');
    }
  }
});

// Asynchronous Web3Forms Overlay Execution Rules
const form = document.getElementById('connectForm');
const overlay = document.getElementById('formOverlay');
const overlayMessage = document.getElementById('overlayMessage');
const overlaySpinner = document.getElementById('overlaySpinner');

if (form && overlay) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Lock native redirection threads
    
    // 1. Instantly display the frosted backdrop box & run spinner
    overlay.style.display = 'flex';
    overlaySpinner.style.display = 'block';
    overlayMessage.style.color = '#070b20';
    overlayMessage.innerHTML = "Sending your optimization request...";
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let res = await response.json();
      if (response.status == 200) {
        // 2. Success Scenario Configuration adjustments
        overlaySpinner.style.display = 'none'; 
        overlayMessage.style.color = '#22c55e'; // Green confirmation message color
        overlayMessage.innerHTML = "Thank you! Your request has been sent successfully. Our team will contact you shortly.";
        form.reset(); // Wipe all field validation elements clean
        
        // Clear box view completely after 8 seconds
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 8000);

      } else {
        // Handle explicit endpoint API error validation branches
        overlaySpinner.style.display = 'none';
        overlayMessage.style.color = '#d9383a';
        overlayMessage.innerHTML = res.message;
        setTimeout(() => { overlay.style.display = 'none'; }, 5000);
      }
    })
    .catch(error => {
      // Fallback path tracking structural infrastructure disconnect failures
      overlaySpinner.style.display = 'none';
      overlayMessage.style.color = '#d9383a';
      overlayMessage.innerHTML = "Network connection failure. Please try again later.";
      setTimeout(() => { overlay.style.display = 'none'; }, 5000);
    });
  });
}