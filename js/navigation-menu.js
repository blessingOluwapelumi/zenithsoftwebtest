// ==========================================================
// GLOBAL CORE RESPONSIVE NAVIGATION ENGINE
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- STICKY NAV & UTILITY TOP-BAR ACTION ---
    const topBar = document.getElementById("topBar");
    const mainNavbar = document.getElementById("mainNavbar");
    const stickyActivationPoint = topBar ? topBar.offsetHeight : 40;

    window.addEventListener("scroll", () => {
        if (window.scrollY > stickyActivationPoint) {
            mainNavbar.classList.add("sticky");
            if (topBar) {
                topBar.style.transform = "translateY(-100%)";
                topBar.style.position = "absolute"; 
            }
        } else {
            mainNavbar.classList.remove("sticky");
            if (topBar) {
                topBar.style.transform = "translateY(0)";
                topBar.style.position = "relative";
            }
        }
    });

    // --- SIDEBAR DRAWER TOGGLE (MOBILE) ---
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => navLinks.classList.add("active"));
    }
    if (menuClose && navLinks) {
        menuClose.addEventListener("click", () => {
            navLinks.classList.remove("active");
            closeAllMobileDropdowns();
        });
    }

    // --- INTERACTIVE MOBILE DROPDOWNS & SUB-LISTS ---
    const dropdownContainers = document.querySelectorAll(".nav-item-dropdown");

    dropdownContainers.forEach(container => {
        const trigger = container.querySelector(".dropdown-trigger");
        const pane = container.querySelector(".dropdown-pane");
        const arrow = container.querySelector(".nav-arrow");
        
        // FIX 1: Scope the hide timeout locally to this specific container loop instance 
        // to completely eliminate desktop multi-hover race conditions.
        let localHideTimeout; 

        if (!pane) return;

        // Desktop Hover Events
        const openPaneDesktop = () => {
            if (window.innerWidth > 1024) {
                clearTimeout(localHideTimeout);
                document.querySelectorAll(".dropdown-pane").forEach(p => {
                    if (p !== pane) p.classList.remove("show");
                });
                pane.classList.add("show");
            }
        };

        const closePaneDesktop = () => {
            if (window.innerWidth > 1024) {
                localHideTimeout = setTimeout(() => pane.classList.remove("show"), 150);
            }
        };

        container.addEventListener("mouseenter", openPaneDesktop);
        container.addEventListener("mouseleave", closePaneDesktop);
        pane.addEventListener("mouseenter", openPaneDesktop);
        pane.addEventListener("mouseleave", closePaneDesktop);

        // Mobile Main Link Toggles Panel
        if (trigger) {
            trigger.addEventListener("click", (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const currentlyOpen = pane.classList.contains("show");

                    // Clear sibling elements
                    document.querySelectorAll(".dropdown-pane").forEach(p => {
                        if (p !== pane) p.classList.remove("show");
                    });
                    document.querySelectorAll(".nav-item-dropdown .nav-arrow").forEach(a => {
                        if (a !== arrow) a.style.transform = "";
                    });

                    // Toggle Current Panel
                    if (!currentlyOpen) {
                        pane.classList.add("show");
                        if (arrow) arrow.style.transform = "rotate(180deg)";
                    } else {
                        pane.classList.remove("show");
                        if (arrow) arrow.style.transform = "";
                    }
                }
            });
        }

        // Inner Sub-List Multi-Column Headers Accordion (Mobile)
        const innerColumns = pane.querySelectorAll(".menu-column");
        innerColumns.forEach(column => {
            const heading = column.querySelector(".column-title");
            const subList = column.querySelector(".sub-list");
            const colArrow = column.querySelector(".mobile-column-arrow");

            if (heading && subList) {
                heading.addEventListener("click", (e) => {
                    if (window.innerWidth <= 1024) {
                        e.stopPropagation();
                        const isExpanded = subList.classList.contains("open");

                        // Optional Accordion optimization: Closes adjacent text items inside the active open mega panel
                        const activePane = column.closest(".dropdown-pane");
                        if (activePane) {
                            activePane.querySelectorAll(".sub-list").forEach(sl => {
                                if (sl !== subList) sl.classList.remove("open");
                            });
                            activePane.querySelectorAll(".mobile-column-arrow").forEach(ca => {
                                if (ca !== colArrow) ca.style.transform = "";
                            });
                        }

                        if (!isExpanded) {
                            subList.classList.add("open");
                            if (colArrow) colArrow.style.transform = "rotate(180deg)";
                        } else {
                            subList.classList.remove("open");
                            if (colArrow) colArrow.style.transform = "";
                        }
                    }
                });
            }
        });
    });

    // Helper: Reset active visibility structures 
    function closeAllMobileDropdowns() {
        document.querySelectorAll(".dropdown-pane").forEach(p => p.classList.remove("show"));
        document.querySelectorAll(".sub-list").forEach(sl => sl.classList.remove("open"));
        document.querySelectorAll(".nav-arrow, .mobile-column-arrow").forEach(a => a.style.transform = "");
    }

    // Window Resize Layout Guard Hooks
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            if (navLinks) navLinks.classList.remove("active");
            closeAllMobileDropdowns();
        }
    });
});