// ==========================================================
// ZENITHSOFT CAREERS PAGE FUNCTIONAL ENGINE
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. INTERACTIVE MOSAIC CARD NAVIGATION & AUTO-FOCUS
    // ==========================================
    const mosaicCards = document.querySelectorAll(".mosaic-card");
    const pathwaySelect = document.getElementById("pathwaySelect");
    const applicationTarget = document.getElementById("application-form");

    mosaicCards.forEach(card => {
        card.addEventListener("click", () => {
            const targetUrl = card.getAttribute("data-destination");
            const chosenPathway = card.getAttribute("data-pathway");

            if (targetUrl && targetUrl.startsWith("#")) {
                if (chosenPathway && pathwaySelect) {
                    pathwaySelect.value = chosenPathway;
                    pathwaySelect.dispatchEvent(new Event('change'));
                }
                if (applicationTarget) {
                    applicationTarget.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } 
            else if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });

    // ==========================================
    // 2. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
    // ==========================================
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12, 
            rootMargin: "0px 0px -30px 0px"
        });

        animatedElements.forEach(element => revealObserver.observe(element));
    } else {
        animatedElements.forEach(el => el.classList.add('reveal-active'));
    }

   
// BLOGS
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("blogSliderTrack");
  const viewport = document.getElementById("blogSliderViewport");
  const prevBtn = document.getElementById("blogPrevBtn");
  const nextBtn = document.getElementById("blogNextBtn");
  const dotsContainer = document.getElementById("blogDots");
  const filterButtons = document.querySelectorAll(".filter-pill");
  const section = document.querySelector(".blog-section");

  if (!track || !viewport || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let currentFilter = "d365"; // Default baseline view filter

  // ==========================================
  // 1. SCROLL REVEAL MONITOR ENGINE
  // ==========================================
  if (section) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("blog-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sectionObserver.observe(section);
  }

  // ==========================================
  // 2. SLIDER UTILITY GRID CALCULATOR
  // ==========================================
  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getActiveCards() {
    const allCards = Array.from(track.children);
    return allCards.filter(card => {
      if (currentFilter === "all") return true;
      return card.getAttribute("data-category") === currentFilter;
    });
  }

  function setupPaginationDots(maxIndex) {
    dotsContainer.innerHTML = "";
    if (maxIndex <= 0) return; // Hide dots container completely if cards fit perfectly

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("div");
      dot.classList.add("blog-dot");
      if (i === currentIndex) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const activeCards = getActiveCards();
    const allCards = Array.from(track.children);

    // Apply visibility filter states cleanly
    allCards.forEach(card => {
      if (currentFilter === "all" || card.getAttribute("data-category") === currentFilter) {
        card.classList.remove("filtered-out");
      } else {
        card.classList.add("filtered-out");
      }
    });

    const visibleCount = getVisibleCardsCount();
    const maxIndex = Math.max(0, activeCards.length - visibleCount);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Execute transform movement mathematics
    if (activeCards.length > 0) {
      const cardWidth = activeCards[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      const amountToMove = (cardWidth + gap) * currentIndex;
      track.style.transform = `translateX(-${amountToMove}px)`;
    } else {
      track.style.transform = `translateX(0px)`;
    }

    // Set accessibility states on control triggers
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    setupPaginationDots(maxIndex);
  }

  // ==========================================
  // 3. ACTION AND NAVIGATION LISTENERS
  // ==========================================
  nextBtn.addEventListener("click", function () {
    const visibleCount = getVisibleCardsCount();
    const maxIndex = getActiveCards().length - visibleCount;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Filter Bar Controller - Splits filter state from global redirect links
  filterButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      const targetFilter = this.getAttribute("data-filter");

      // Interrupt workflow for "View All Blogs" to cleanly launch external tab
      if (targetFilter === "all") {
        e.preventDefault();
        window.open("/blogs", "_blank"); // Updates window context natively to a secure separate sheet
        return; 
      }

      // Default layout filtration logic for structural categories
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      currentFilter = targetFilter;
      currentIndex = 0; 
      
      track.style.transform = `translateX(0px)`;
      updateSlider();
    });
  });

  window.addEventListener("resize", updateSlider);
  
  // Fire primary build sequence on execution lifecycle loop
  updateSlider();
});

    // ==========================================
    // 5. FOOTER FORM OBSERVER DETECTION
    // ==========================================
    const animatedForm = document.querySelectorAll('.footer-form-reveal');

    if ('IntersectionObserver' in window) {
        const formObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('form-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.1 });

        animatedForm.forEach(element => formObserver.observe(element));
    } else {
        animatedForm.forEach(el => el.classList.add('form-visible'));
    }

    // ==========================================
    // 6. BACKGROUND SUBMISSION MULTIPART FETCH ENGINE
    // ==========================================
    const connectForm = document.getElementById("connectForm");
    const overlay = document.getElementById('formOverlay');
    const overlayMessage = document.getElementById('overlayMessage');
    const overlaySpinner = document.getElementById('overlaySpinner');
    const fileText = document.getElementById('fileUploadText');

    if (connectForm && overlay) {
        connectForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            overlay.style.display = 'flex';
            if (overlaySpinner) overlaySpinner.style.display = 'block';
            if (overlayMessage) {
                overlayMessage.style.color = '#070b20';
                overlayMessage.innerHTML = "Submitting your career application profile...";
            }
            
            const formData = new FormData(connectForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData 
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    if (overlaySpinner) overlaySpinner.style.display = 'none'; 
                    if (overlayMessage) {
                        overlayMessage.style.color = '#22c55e';
                        overlayMessage.innerHTML = "Application Sent! Thank you for choosing Zenithsoft. Our recruitment team will review your credentials and reach out shortly.";
                    }
                    
                    connectForm.reset(); 
                    if (fileText) {
                        fileText.innerText = "*Upload Resume/CV (PDF, DOCX)";
                        fileText.style.color = "#4a5568";
                        fileText.style.fontWeight = "400";
                    }
                    
                    toggleConditionalFields("");
                    setTimeout(() => { overlay.style.display = 'none'; }, 8000);
                } else {
                    if (overlaySpinner) overlaySpinner.style.display = 'none';
                    if (overlayMessage) {
                        overlayMessage.style.color = '#d9383a';
                        overlayMessage.innerHTML = res.message || "Submission rejected. Please verify details.";
                    }
                    setTimeout(() => { overlay.style.display = 'none'; }, 5000);
                }
            })
            .catch(error => {
                if (overlaySpinner) overlaySpinner.style.display = 'none';
                if (overlayMessage) {
                    overlayMessage.style.color = '#d9383a';
                    overlayMessage.innerHTML = "System connectivity failure. Please verify connection and try again.";
                }
                setTimeout(() => { overlay.style.display = 'none'; }, 5000);
            });
        });
    }
});
