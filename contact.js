// ==========================================================
// UNIFIED CORE LAYOUT ENGINE - CONTACT PAGES
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. HERO SLIDER LOGIC
    // ==========================================
    const heroSlider = document.getElementById('heroSlider');
    const heroHeading = document.getElementById('heroHeading');
    const heroSubText = document.getElementById('heroSubText');

    const heroData = [
        {
            image: '/new_asset/contact1.jpg',
            heading: 'Contact Us',
            subText: 'We’re always here to listen and to provide 24/7 support',
        },
        {
            image:  '/new_asset/CONTACT 2.jpg',
            heading: 'Let’s Work Together',
            subText: 'Tell us about your project goals',
        },
        {
            image:   '/new_asset/company.jpg',
            heading: 'Get In Touch Today',
            subText: 'Solutions tailored for your business',
        }
    ];

    let currentIndex = 0;

    function updateHeroSlide() {
        if (!heroSlider || !heroHeading || !heroSubText) return;

        currentIndex = (currentIndex + 1) % heroData.length;
        const current = heroData[currentIndex];

        heroSlider.style.backgroundImage = `url('${current.image}')`;

        heroHeading.style.opacity = 0;
        heroSubText.style.opacity = 0;

        setTimeout(() => {
            heroHeading.textContent = current.heading;
            heroSubText.textContent = current.subText;
            heroHeading.style.opacity = 1;
            heroSubText.style.opacity = 1;
        }, 300);
    }

    if (heroSlider) {
        setInterval(updateHeroSlide, 6000);
    }

    // ==========================================
    // 2. SCROLL REVEAL PROCESSING ENGINE
    // ==========================================
    const reveals = document.querySelectorAll('.reveal-on-scroll');

    function revealOnScroll() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    function handleRevealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    // Attach scroll tracking systems cleanly
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', handleRevealOnScroll);
    window.addEventListener('load', handleRevealOnScroll);


    // ==========================================
    // 3. ASYNCHRONOUS CONTACT SUBMISSION FETCH ENGINE (WEB3FORMS)
    // ==========================================
    const contactForm = document.getElementById("contactFormEngine");
    const statusBanner = document.getElementById("formStatusMessage");
    const submitBtn = document.getElementById("submitFormBtn");
    
    if (contactForm && statusBanner && submitBtn) {
        const btnText = submitBtn.querySelector(".btn-text");
        const btnSpinner = submitBtn.querySelector(".btn-spinner");

        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Establish loading state variables
            submitBtn.disabled = true;
            if (btnSpinner) btnSpinner.style.display = "block";
            if (btnText) btnText.innerText = "Connecting...";
            
            // Clean dynamic alert views
            statusBanner.style.display = "none";
            statusBanner.className = "status-banner";

            const formData = new FormData(contactForm);

            // Forward structured parameters via AJAX Fetch
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                
                if (response.status === 200) {
                    // Success Path Handler
                    statusBanner.classList.add("success-mode");
                    statusBanner.innerHTML = "Message Sent Successfully! Thank you for contacting Zenithsoft. Our consulting team will review your requirements and reach out shortly.";
                    statusBanner.style.display = "block";
                    
                    // Reset fields cleanly
                    contactForm.reset();
                } else {
                    // Operational Server-Side Reject Handling
                    statusBanner.classList.add("error-mode");
                    statusBanner.innerHTML = jsonResponse.message || "Submission dropped by gateway. Please check field details and re-verify data input metrics.";
                    statusBanner.style.display = "block";
                }
            })
            .catch(error => {
                // Hard Connection / Offline Error Intercepts
                statusBanner.classList.add("error-mode");
                statusBanner.innerHTML = "System connectivity failure. Unable to contact Web3Forms gateway. Please verify network access and try again.";
                statusBanner.style.display = "block";
            })
            .finally(() => {
                // Re-enable interactive trigger button elements
                submitBtn.disabled = false;
                if (btnSpinner) btnSpinner.style.display = "none";
                if (btnText) btnText.innerText = "Let's Connect";
                
                // Automatically scroll screen views smoothly to the message alert container 
                statusBanner.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        });
    }

}); // <--- ENGINE CLOSES SECURELY HERE AT THE ABSOLUTE FOOT OF THE WORKSPACE