// Hero section
 
document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.querySelector('.bc-hero');
    const mobileDevice = document.querySelector('.device-mobile');

    if (heroSection && mobileDevice) {
        const heroObserverOptions = {
            root: null,
            // 0 means triggers immediately when even 1 pixel moves out of viewport view
            threshold: 0, 
            rootMargin: "-10% 0px -10% 0px"
        };

        const heroObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slide up when entering/returning to the hero layout viewport area
                    mobileDevice.classList.add('is-active');
                } else {
                    // Slide back down when you scroll past it completely
                    mobileDevice.classList.remove('is-active');
                }
            });
        }, heroObserverOptions);

        heroObserver.observe(heroSection);
    }
});


// BUSINESS CENTRAL OVERVIEW
// --- GLOBAL SCOPE YOUTUBE CONTROLLER SYSTEM ---
let ytPlayer;
let copilotYtPlayer; // NEW: Dedicated handle for the Copilot section player

// Official hook called automatically by the dynamically injected YouTube iframe script infrastructure
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('bcPlayer', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });

    // NEW: Initialize player instance for the Copilot section video
    copilotYtPlayer = new YT.Player('copilotPlayer', {
        events: {
            'onStateChange': onCopilotPlayerStateChange
        }
    });
}

// Monitors main video state and intercepts the finished video frame marker event
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        const videoCover = document.getElementById("videoCover");
        if (videoCover) {
            videoCover.classList.remove("is-hidden");
        }
    }
}

// NEW: Monitors Copilot video state to bring back the thumbnail cover when it ends
function onCopilotPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        const copilotVideoCover = document.getElementById("copilotVideoCover");
        if (copilotVideoCover) {
            copilotVideoCover.classList.remove("is-hidden");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Asynchronously load the official YouTube Player runtime script 
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // 2. PART A: SCROLL REVEAL INTERSECTION OBSERVER LOGIC
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 3. PART B: INTERACTIVE COVER LAYOUT HOVER EVENTS & TRIGGERS
    
    // --- Video 1 Trigger: Main Business Central Overview ---
    const videoCover = document.getElementById("videoCover");
    if (videoCover) {
        videoCover.addEventListener("click", function () {
            videoCover.classList.add("is-hidden");
            
            if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
                ytPlayer.playVideo();
            } else {
                // Hard link fallback override loop logic if API fails to populate early
                const bcPlayer = document.getElementById('bcPlayer');
                if (bcPlayer) {
                    let src = bcPlayer.getAttribute('src');
                    if (src && src.indexOf('autoplay=1') === -1) {
                        bcPlayer.setAttribute('src', src + (src.indexOf('?') !== -1 ? '&autoplay=1' : '?autoplay=1'));
                    }
                }
            }
        });
    }

    // --- Video 2 Trigger: New Copilot AI Capabilities Overview Section ---
    const copilotVideoCover = document.getElementById("copilotVideoCover");
    if (copilotVideoCover) {
        copilotVideoCover.addEventListener("click", function () {
            copilotVideoCover.classList.add("is-hidden");
            
            if (copilotYtPlayer && typeof copilotYtPlayer.playVideo === 'function') {
                copilotYtPlayer.playVideo();
            } else {
                // Hard link fallback override loop logic if API fails to populate early
                const copilotPlayer = document.getElementById('copilotPlayer');
                if (copilotPlayer) {
                    let src = copilotPlayer.getAttribute('src');
                    if (src && src.indexOf('autoplay=1') === -1) {
                        copilotPlayer.setAttribute('src', src + (src.indexOf('?') !== -1 ? '&autoplay=1' : '?autoplay=1'));
                    }
                }
            }
        });
    }
});


// WHAT DOES BUSINESS CENTRAL DO
(function () {
    const bczSectionDataset = {
        "finance": {
            title: "Improve financial performance",
            trays: [
                { id: "bcz-f-1", label: "Financial data control", text: "Manage your finances from A to Z: manage your budget, speed up month-end and year-end closing, improve bank transaction and account balance reconciliation.", type: "video" },
                { id: "bcz-f-2", label: "Cash flow forecasting", text: "Predict future financial directions reliably. Take advantage of built-in modeling logic frameworks to match incoming revenue cycles directly against costs.", type: "image", src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-f-3", label: "Improving financial performance", text: "Uncover deep business overhead optimization avenues. Target underperforming product pipelines instantly using automated performance indicators.", type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-f-4", label: "Expanding operations into global markets", text: "Scale business activities into secondary regional operating locations with multi-currency tracking adjustments and localized compliance frameworks.", type: "image", src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "supply-chain": {
            title: "Optimize supply chain management",
            trays: [
                { id: "bcz-s-1", label: "Inventory visibility", text: "Get real-time tracking visibility across your warehouses to optimize stock levels and prevent supply shortages.", type: "image", src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-s-2", label: "Predictive stock replenishment", text: "Use AI analytics forecasting to automatically calculate safety stock volumes and reorder thresholds.", type: "image", src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-s-3", label: "Supplier relationship mapping", text: "Track vendor performance histories, delivery lag trends, and price sheets cleanly inside one matrix.", type: "image", src: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-s-4", label: "Order fulfillment streams", text: "Speed up picking, packing, and dispatch logistical routing pipelines with connected digital workflows.", type: "image", src: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "production": {
            title: "Manage production",
            trays: [
                { id: "bcz-p-1", label: "Capacity planning masteries", text: "Allocate machinery assets and staffing shifts accurately against shifting consumer transaction backlogs.", type: "image", src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-p-2", label: "Bill of Materials (BOM) management", text: "Create structured manufacturing blueprints tracking exact raw items and multi-tier operational steps.", type: "image", src: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-p-3", label: "Production order lifecycles", text: "Monitor active assembly states from raw materials release clear through quality-assurance evaluations.", type: "image", src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-p-4", label: "Shop floor tracking integration", text: "Log exact output volumes and material scraps instantly as workers finish tasks down assembly lines.", type: "image", src: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "ai-analytics": {
            title: "Save time with AI and analytics",
            trays: [
                { id: "bcz-a-1", label: "Copilot conversational intelligence", text: "Draft professional document lines or request deep dataset drill-downs using natural chat instructions.", type: "image", src: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-a-2", label: "Embedded Power BI dashboard visualizer", text: "Render highly tailored graphical business data models without closing your enterprise portal screen layout.", type: "image", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-a-3", label: "Automated anomaly alert signals", text: "Get instant risk notifications if billing trends deviate from typical historical baselines.", type: "image", src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-a-4", label: "Late-payment predictions matrix", text: "Evaluate historical customer payment trends to identify future collection risks early.", type: "image", src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "processes": {
            title: "Transform business processes",
            trays: [
                { id: "bcz-pr-1", label: "Power Automate structural mappings", text: "Set up multi-level validation routings across document networks using logic canvas flows.", type: "image", src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pr-2", label: "Unified database structures", text: "Break down data silos by connecting purchasing, sales, and logistics channels into a single system.", type: "image", src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pr-3", label: "Paperless document capture engines", text: "Convert scanned vendor PDF invoices directly into digital ledger rows using optical character recognition (OCR).", type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pr-4", label: "Role-tailored employee workspace environments", text: "Equip employees with individual cloud dashboard layouts designed specifically for their daily tasks.", type: "image", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "sales": {
            title: "Increase sales of goods and services",
            trays: [
                { id: "bcz-sa-1", label: "Outlook client integration modules", text: "Create sales quotes and process invoices directly from customer emails using native email extensions.", type: "image", src: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-sa-2", label: "Opportunity cycle pipeline indicators", text: "Assign sales probabilities across multi-step pipeline deal phases to build accurate forecasting models.", type: "image", src: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-sa-3", label: "Dynamic Pricing adjustments rules", text: "Set up flexible tier-pricing structures and promotional discount rates for key client categories.", type: "image", src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-sa-4", label: "Customer service ticket logging", text: "Convert consumer complaints into case tickets to track response times and resolution quality.", type: "image", src: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1000&q=80" }
            ]
        },
        "project-mgmt": {
            title: "Deliver projects on time",
            trays: [
                { id: "bcz-pj-1", label: "Job structure breakdowns mapping", text: "Organize project tasks, calculate budgets, and estimate target completion metrics.", type: "image", src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pj-2", label: "Timesheet processing setups", text: "Track billable employee hours against specific project tasks for simple client billing reconciliation.", type: "image", src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pj-3", label: "Real-time resource allocation", text: "Balance individual project workloads effectively to keep development teams optimized.", type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80" },
                { id: "bcz-pj-4", label: "Project profitability tracking", text: "Compare actual project expenses against initial target quotes to maintain healthy profit margins.", type: "image", src: "https://images.unsplash.com/photo-1543286386-7a39e2d9c83e?auto=format&fit=crop&w=1000&q=80" }
            ]
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        const bczTabsTrack = document.getElementById('bczTabsTrack');
        const bczAccordionContainer = document.getElementById('bczAccordionContainer');
        const bczMediaImg = document.getElementById('bczFeatureImage');
        const bczMediaVidWrapper = document.getElementById('bczVideoWrapper');
        const bczLocalPlayer = document.getElementById('bczLocalPlayer');

        function bczMediaPipelineSwitcher(itemObj) {
            if (itemObj.type === 'video') {
                if (bczMediaImg) bczMediaImg.classList.add('bcz-is-hidden');
                if (bczMediaVidWrapper) bczMediaVidWrapper.classList.remove('bcz-is-hidden');
                
                if (bczLocalPlayer) {
                    bczLocalPlayer.currentTime = 0; 
                    bczLocalPlayer.play().catch(err => console.log("Autoplay blocked:", err));
                }
            } else {
                if (bczLocalPlayer) {
                    bczLocalPlayer.pause();
                }
                if (bczMediaVidWrapper) bczMediaVidWrapper.classList.add('bcz-is-hidden');
                if (bczMediaImg) {
                    bczMediaImg.src = itemObj.src;
                    bczMediaImg.classList.remove('bcz-is-hidden');
                }
            }
        }

        function bczRenderAccordionTrays(activeKey) {
            bczAccordionContainer.innerHTML = '';
            const selectedSet = bczSectionDataset[activeKey];

            selectedSet.trays.forEach((tray, index) => {
                const addActiveClass = index === 0 ? 'bcz-active' : '';
                const toggleSymbol = index === 0 ? '−' : '+';

                const trayHTML = `
                    <div class="bcz-accordion-item ${addActiveClass}" data-type="${tray.type}" data-src="${tray.src || ''}">
                        <button class="bcz-accordion-trigger">
                            <span>${tray.label}</span>
                            <span class="bcz-icon-toggle">${toggleSymbol}</span>
                        </button>
                        <div class="bcz-accordion-content">
                            <p>${tray.text}</p>
                        </div>
                    </div>
                `;
                bczAccordionContainer.insertAdjacentHTML('beforeend', trayHTML);
            });

            bczMediaPipelineSwitcher(selectedSet.trays[0]);

            const dynamicItems = bczAccordionContainer.querySelectorAll('.bcz-accordion-item');
            dynamicItems.forEach(item => {
                const clickTarget = item.querySelector('.bcz-accordion-trigger');
                clickTarget.addEventListener('click', function () {
                    if (item.classList.contains('bcz-active')) return;

                    dynamicItems.forEach(i => {
                        i.classList.remove('bcz-active');
                        i.querySelector('.bcz-icon-toggle').textContent = '+';
                    });

                    item.classList.add('bcz-active');
                    item.querySelector('.bcz-icon-toggle').textContent = '−';

                    bczMediaPipelineSwitcher({
                        type: item.getAttribute('data-type'),
                        src: item.getAttribute('data-src')
                    });
                });
            });
        }

        function bczInitializePillsStructure() {
            Object.keys(bczSectionDataset).forEach((key, index) => {
                const activeStateClass = index === 0 ? 'bcz-active' : '';
                const tabHTML = `
                    <button class="bcz-tab-pill ${activeStateClass}" data-key="${key}">
                        ${bczSectionDataset[key].title}
                    </button>
                `;
                bczTabsTrack.insertAdjacentHTML('beforeend', tabHTML);
            });

            bczRenderAccordionTrays(Object.keys(bczSectionDataset)[0]);

            const interactivePills = bczTabsTrack.querySelectorAll('.bcz-tab-pill');
            interactivePills.forEach(pill => {
                pill.addEventListener('click', function () {
                    if (this.classList.contains('bcz-active')) return;
                    interactivePills.forEach(p => p.classList.remove('bcz-active'));
                    this.classList.add('bcz-active');
                    bczRenderAccordionTrays(this.getAttribute('data-key'));
                    
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
            });
        }

        bczInitializePillsStructure();

        const horizontalScroller = document.getElementById('bczTabsScrollContainer');
        const arrowLeftBtn = document.getElementById('bczTabScrollLeft');
        const arrowRightBtn = document.getElementById('bczTabScrollRight');

        if (horizontalScroller && arrowLeftBtn && arrowRightBtn) {
            const recomputeArrowVisibilities = () => {
                const scrollLeftPos = horizontalScroller.scrollLeft;
                const totalScrollableWidth = horizontalScroller.scrollWidth - horizontalScroller.clientWidth;

                if (scrollLeftPos <= 6) {
                    arrowLeftBtn.classList.add('bcz-is-hidden');
                } else {
                    arrowLeftBtn.classList.remove('bcz-is-hidden');
                }

                if (scrollLeftPos >= totalScrollableWidth - 6) {
                    arrowRightBtn.classList.add('bcz-is-hidden');
                } else {
                    arrowRightBtn.classList.remove('bcz-is-hidden');
                }
            };

            arrowRightBtn.addEventListener('click', () => {
                horizontalScroller.scrollBy({ left: 180, behavior: 'smooth' });
            });
            arrowLeftBtn.addEventListener('click', () => {
                horizontalScroller.scrollBy({ left: -180, behavior: 'smooth' });
            });

            horizontalScroller.addEventListener('scroll', recomputeArrowVisibilities);
            window.addEventListener('resize', recomputeArrowVisibilities);
            
            setTimeout(recomputeArrowVisibilities, 350);
        }

        const featureGrid = document.querySelector('.bcz-feature-grid');
        if (featureGrid) {
            const revealOptions = {
                root: null, 
                threshold: 0.15, 
                rootMargin: "0px 0px -50px 0px" 
            };

            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        featureGrid.classList.add('bcz-reveal-active');
                        observer.unobserve(entry.target); 
                    }
                });
            }, revealOptions);

            revealObserver.observe(featureGrid);
        }
    });
})();



// CAPABILITIES
(function () {
    const bccCapabilitiesData = [
        {
            id: "financial-management",
            label: "Financial Management",
            text: "Manage your business financials such as general ledger, accounts receivable and payable, cash flow, budgets, fixed assets, and financial reporting with ease.",
            link: "#",
            src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "sales-order",
            label: "Sales & Order Management",
            text: "Optimize sales flows, log opportunity pipelines, and track open quotes while interfacing directly through native communications environments to expedite processing.",
            link: "#",
            src: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "purchase-management",
            label: "Purchase Management",
            text: "Keep product procurement requests organized cleanly, manage item receipt sequences, and run structured supplier payment processing models contextually.",
            link: "#",
            src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "warehouse-inventory",
            label: "Warehouse / Inventory Management",
            text: "Gain multi-location storage visibility profiles, run inventory picking optimizations, and manage dynamic stock counting updates systematically.",
            link: "#",
            src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "project-management",
            label: "Project Management",
            text: "Build project schedules, formulate detailed resource budgets, analyze machine usage rates, and track exact workforce time metrics against cost curves.",
            link: "#",
            src: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "manufacturing-management",
            label: "Manufacturing Management",
            text: "Generate product bills of materials (BOM), automate material requirement runs (MRP), coordinate technical work centers, and control scheduling pipelines.",
            link: "#",
            src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: "crm-management",
            label: "Customer Relationship Management",
            text: "Consolidate communication logs, respond to client service requests promptly, and automate secondary product support operations dynamically.",
            link: "#",
            src: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1000&q=80"
        }
    ];

    document.addEventListener("DOMContentLoaded", function () {
        const bccAccordionContainer = document.getElementById('bccAccordionContainer');
        const bccMediaStack = document.getElementById('bccMediaStack');

        if (!bccAccordionContainer || !bccMediaStack) return;

        // 1. Render image stacks safely
        bccMediaStack.innerHTML = '';
        bccCapabilitiesData.forEach((capability, index) => {
            const activeImgClass = index === 0 ? 'bcc-img-active' : '';
            const imgHTML = `
                <img class="bcc-display-media ${activeImgClass}" 
                     id="img-bcc-${capability.id}" 
                     src="${capability.src}" 
                     alt="${capability.label}">
            `;
            bccMediaStack.insertAdjacentHTML('beforeend', imgHTML);
        });

        // 2. Build clean Accordion elements
        bccAccordionContainer.innerHTML = '';
        bccCapabilitiesData.forEach((capability, index) => {
            const addActiveClass = index === 0 ? 'bcc-active' : '';
            const itemHTML = `
                <div class="bcc-accordion-item ${addActiveClass}" data-id="${capability.id}">
                    <button class="bcc-accordion-trigger">
                        <span>${capability.label}</span>
                        <span class="bcc-icon-toggle">&gt;</span>
                    </button>
                    <div class="bcc-accordion-content">
                        <div class="bcc-accordion-content-inner">
                            <p>${capability.text}</p>
                            <a href="${capability.link}" class="bcc-learn-more">Learn more &gt;</a>
                        </div>
                    </div>
                </div>
            `;
            bccAccordionContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        const realTimeItems = bccAccordionContainer.querySelectorAll('.bcc-accordion-item');
        const allImages = bccMediaStack.querySelectorAll('.bcc-display-media');

        // 3. Performance Click Events
        realTimeItems.forEach(item => {
            const clickTarget = item.querySelector('.bcc-accordion-trigger');

            clickTarget.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Mobile Toggling View Behavior: allow a mobile user to tap an active tab to close it
                const isDesktop = window.innerWidth >= 992;
                if (item.classList.contains('bcc-active') && isDesktop) return;

                const targetId = item.getAttribute('data-id');

                if (item.classList.contains('bcc-active')) {
                    // Mobile-only close logic
                    item.classList.remove('bcc-active');
                } else {
                    // Clean up active classes across the board
                    realTimeItems.forEach(i => i.classList.remove('bcc-active'));
                    item.classList.add('bcc-active');

                    // Crossfade image transitions only if they are visible (Desktop viewports)
                    if (isDesktop) {
                        allImages.forEach(img => {
                            if (img.id === `img-bcc-${targetId}`) {
                                img.classList.add('bcc-img-active');
                            } else {
                                img.classList.remove('bcc-img-active');
                            }
                        });
                    }
                }
            });
        });

        /* ----------------------------------------------------------------------
            SCROLL REVEAL TIMING INTERSECTION OBSERVER
           ---------------------------------------------------------------------- */
        const capabilitiesGrid = document.querySelector('.bcc-feature-grid');
        if (capabilitiesGrid) {
            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        capabilitiesGrid.classList.add('bcc-reveal-active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.10, rootMargin: "0px 0px -20px 0px" });

            revealObserver.observe(capabilitiesGrid);
        }
    });
})();

// PRICING & LICENSING
/**
 * ==========================================================================
 * DYNAMICS 365 BUSINESS CENTRAL PRICING CARD SCROLL REVEAL ENGINE
 * ==========================================================================
 */
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const pricingGrid = document.getElementById('bccPricingGrid');

        if (pricingGrid) {
            // Instantiate Intersection Observer with safe threshold metrics
            const pricingObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(entry => {
                    // Check if grid has scrolled inside viewport bounds
                    if (entry.isIntersecting) {
                        pricingGrid.classList.add('bcc-slide-up-active');
                        // Stop observing immediately once animation triggers
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,    // Fires smoothly when 12% of the component is visible
                rootMargin: "0px 0px -40px 0px" // Slight offset padding at screen footer
            });

            // Target the observer runtime anchor point
            pricingObserver.observe(pricingGrid);
        }
    });
})();


// METHODOLOGY

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("bcmSliderTrack");
    const container = document.getElementById("bcmSliderContainer");
    const prevBtn = document.getElementById("bcmPrevBtn");
    const nextBtn = document.getElementById("bcmNextBtn");
    
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function getMetrics() {
        const cards = Array.from(track.children);
        if (cards.length === 0) return { maxIndex: 0, amountToMove: 0 };
        
        const cardWidth = cards[0].getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(track);
        const gap = parseFloat(computedStyle.gap) || 0;
        
        const containerWidth = container.getBoundingClientRect().width;
        const totalCards = cards.length;
        
        const visibleCardsCount = Math.round(containerWidth / (cardWidth + gap)) || 1;
        const maxIndex = Math.max(0, totalCards - visibleCardsCount);
        
        const amountToMove = cardWidth + gap;
        return { maxIndex, amountToMove };
    }

    function updateSliderPosition() {
        const { maxIndex, amountToMove } = getMetrics();
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        track.style.transform = `translateX(-${currentIndex * amountToMove}px)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }

    nextBtn.addEventListener("click", function () {
        const { maxIndex } = getMetrics();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    window.addEventListener("resize", updateSliderPosition);
    setTimeout(updateSliderPosition, 150);

    // ==========================================
    // SCROLL REVEAL ANIMATION ENGINE
    // ==========================================
    const methodologySection = document.querySelector(".bcm-methodology-section");
    
    if (methodologySection) {
        const observerOptions = {
            root: null,
            threshold: 0.15, // Triggers animation when 15% of the section enters the viewport
            rootMargin: "0px"
        };

        const sectionObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activates the CSS transition slide-up rule
                    entry.target.classList.add('bcm-revealed');
                    // Stop watching once animation has fired
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sectionObserver.observe(methodologySection);
    }
});

// CASE STUDY (SEE CASE STUDY JS FILE)

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
            overlaySpinner.style.display = 'none';
            overlayMessage.style.color = '#22c55e';
            overlayMessage.innerHTML = "Request submitted successfully!";
            form.reset();
            setTimeout(() => { overlay.style.display = 'none'; }, 2500);
        } else {
            console.log(response);
            overlaySpinner.style.display = 'none';
            overlayMessage.style.color = '#ef4444';
            overlayMessage.innerHTML = res.message || "Submission failed.";
            setTimeout(() => { overlay.style.display = 'none'; }, 3000);
        }
    })
    .catch(error => {
        console.log(error);
        overlaySpinner.style.display = 'none';
        overlayMessage.style.color = '#ef4444';
        overlayMessage.innerHTML = "Something went wrong!";
        setTimeout(() => { overlay.style.display = 'none'; }, 3000);
    });
  });
}