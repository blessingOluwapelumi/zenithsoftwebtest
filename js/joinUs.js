// ==========================================================
// ZENITHSOFT CAREERS & RESOURCES FUNCTIONAL ENGINE
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


    // ==========================================
    // 3. BLOG CARD STAGGERED REVEAL & SLIDER ENGINE
    // ==========================================
    const blogCards = document.querySelectorAll(".blog-card");
    const track = document.getElementById("blogSliderTrack");
    const prevBtn = document.getElementById("blogPrevBtn");
    const nextBtn = document.getElementById("blogNextBtn");
    const dotsContainer = document.getElementById("blogDots");

    let currentIndex = 0;
    let cardsPerView = 3;

    // A. Handle Staggered Scroll Entrance Fade-In Behavior
    if ('IntersectionObserver' in window) {
        const blogObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Match visual sequence based on their current DOM index
                    const cardArray = Array.from(blogCards);
                    const index = cardArray.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, (index % cardsPerView) * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.02 });

        blogCards.forEach(card => blogObserver.observe(card));
    } else {
        blogCards.forEach(card => card.classList.add("show"));
    }

    // B. Carousel Slider Implementation Logic
    function updateSliderDimensions() {
        if (window.innerWidth >= 1024) {
            cardsPerView = 3;
        } else if (window.innerWidth >= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 1;
        }
        setupPaginationDots();
        moveSlider();
    }

    function setupPaginationDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        const totalSteps = Math.max(1, blogCards.length - cardsPerView + 1);
        
        // Safeguard upper bound index values during display layout switches
        if (currentIndex >= totalSteps) {
            currentIndex = totalSteps - 1;
        }

        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement("div");
            dot.classList.add("blog-dot");
            if (i === currentIndex) dot.classList.add("active");
            
            dot.addEventListener("click", () => {
                currentIndex = i;
                moveSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function moveSlider() {
        if (!track || blogCards.length === 0) return;
        
        const cardStyle = window.getComputedStyle(blogCards[0]);
        const cardWidth = blogCards[0].getBoundingClientRect().width;
        const gapValue = parseFloat(window.getComputedStyle(track).gap) || 0;
        
        // Compute exact transform shift coordinates factoring dynamic gap rules
        const amountToMove = currentIndex * (cardWidth + gapValue);
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Refresh dynamic UI controls components state properties
        const totalSteps = Math.max(1, blogCards.length - cardsPerView + 1);
        
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalSteps - 1;

        const dots = dotsContainer ? dotsContainer.querySelectorAll(".blog-dot") : [];
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Bind Navigation Button Press Intercepts
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const totalSteps = Math.max(1, blogCards.length - cardsPerView + 1);
            if (currentIndex < totalSteps - 1) {
                currentIndex++;
                moveSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                moveSlider();
            }
        });
    }

    // Initialize Layout and bind resize trackers
    if (track && blogCards.length > 0) {
        window.addEventListener("resize", updateSliderDimensions);
        updateSliderDimensions();
    }


    
    // ==========================================
    // 4. DYNAMIC APPLICATION FIELD VISIBILITY ENGINE
    // ==========================================
    const academyBlock = document.getElementById('academyConditionalBlock');
    const cohortSelect = document.getElementById('cohortSelect');
    const programSelect = document.getElementById('programSelect');

    const trainingBlock = document.getElementById('trainingConditionalBlock');
    const trainingProgramSelect = document.getElementById('trainingProgramSelect');
    const trainingDateSelect = document.getElementById('trainingDateSelect');
    const trainingTimeSelect = document.getElementById('trainingTimeSelect');

    function toggleConditionalFields(value) {
        if (academyBlock) {
            if (value === 'Academy Training') {
                academyBlock.style.display = 'block';
                if (cohortSelect) cohortSelect.required = true;
                if (programSelect) programSelect.required = true;
            } else {
                academyBlock.style.display = 'none';
                if (cohortSelect) { cohortSelect.required = false; cohortSelect.value = ""; }
                if (programSelect) { programSelect.required = false; programSelect.value = ""; }
            }
        }

        if (trainingBlock) {
            if (value === 'Free Introductory Training') {
                trainingBlock.style.display = 'block';
                if (trainingProgramSelect) trainingProgramSelect.required = true;
                if (trainingDateSelect) trainingDateSelect.required = true;
                if (trainingTimeSelect) trainingTimeSelect.required = true;
            } else {
                trainingBlock.style.display = 'none';
                if (trainingProgramSelect) { trainingProgramSelect.required = false; trainingProgramSelect.value = ""; }
                if (trainingDateSelect) { trainingDateSelect.required = false; trainingDateSelect.value = ""; }
                if (trainingTimeSelect) { trainingTimeSelect.required = false; trainingTimeSelect.value = ""; }
            }
        }
    }

    if (pathwaySelect) {
        pathwaySelect.addEventListener('change', function() {
            toggleConditionalFields(this.value);
        });
    }

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
