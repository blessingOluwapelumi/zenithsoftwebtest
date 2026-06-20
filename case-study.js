document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("bccStudyTrack");
    const viewport = document.getElementById("bccSliderViewport");
    const prevBtn = document.getElementById("bccPrevStudyBtn");
    const nextBtn = document.getElementById("bccNextStudyBtn");

    if (!track || !viewport || !prevBtn || !nextBtn) return;

    let activeIndex = 0;

    function evaluateSliderMetrics() {
        const totalSlides = track.children.length;
        const currentWidth = viewport.getBoundingClientRect().width;

        // Ensure indices stay within valid boundaries
        if (activeIndex >= totalSlides) activeIndex = totalSlides - 1;
        if (activeIndex < 0) activeIndex = 0;

        // Perform hardware-accelerated slide translation
        track.style.transform = `translateX(-${activeIndex * currentWidth}px)`;

        // Control accessibility properties of buttons
        prevBtn.disabled = activeIndex === 0;
        nextBtn.disabled = activeIndex === totalSlides - 1;
    }

    nextBtn.addEventListener("click", function () {
        const totalSlides = track.children.length;
        if (activeIndex < totalSlides - 1) {
            activeIndex++;
            evaluateSliderMetrics();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (activeIndex > 0) {
            activeIndex--;
            evaluateSliderMetrics();
        }
    });

    // Recalculate component dimensions seamlessly during screen resize actions
    window.addEventListener("resize", evaluateSliderMetrics);
    
    // Set baseline state layout values instantly on load
    setTimeout(evaluateSliderMetrics, 100);

    // ==========================================
    // CASE STUDY SCROLL REVEAL ENGINE
    // ==========================================
    const caseStudySection = document.querySelector(".bcc-casestudy-section");
    
    if (caseStudySection) {
        const observerOptions = {
            root: null,
            threshold: 0.15, // Triggers layout shift when 15% of the frame is visible
            rootMargin: "0px"
        };

        const caseStudyObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Inject slide up transition target class
                    entry.target.classList.add('bcc-revealed');
                    // Stop watching once active view state finishes
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        caseStudyObserver.observe(caseStudySection);
    }
});