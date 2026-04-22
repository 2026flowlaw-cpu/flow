document.addEventListener("DOMContentLoaded", () => {
    // Force all videos to play (important for mobile autoplay)
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.muted = true; // Ensure they are muted (requirement for autoplay)
        video.play().catch(error => {
            console.log("Autoplay was prevented, trying again on user interaction", error);
            // Optional: fallback to play on first interaction
            const playOnFirstTouch = () => {
                video.play();
                document.removeEventListener('touchstart', playOnFirstTouch);
                document.removeEventListener('click', playOnFirstTouch);
            };
            document.addEventListener('touchstart', playOnFirstTouch);
            document.addEventListener('click', playOnFirstTouch);
        });
    });

    // Simple interactions can be added here
    console.log("Gangnam Central Eye Clinic Landing Page Initialized!");

    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* Enhanced Holographic NOVA Interactive */
    (function () {
        const section = document.getElementById('nova-interactive-section');
        const container = document.getElementById('hologramWrapper');
        const glare = document.getElementById('hologramGlare');
        const spotlight = document.getElementById('novaSpotlight');
        const starField = document.getElementById('starField');

        if (!section || !container) return;

        // Generate dynamic stars
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;
            starField.appendChild(star);
        }

        const maxTilt = 15; // Refined tilt angle

        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update spotlight
            if (spotlight) {
                spotlight.style.left = `${x}px`;
                spotlight.style.top = `${y}px`;
            }
        });

        section.addEventListener('mouseleave', () => {
            // No reset needed as tilt is removed
        });
    })();

    /* --- Unified Full-Screen Section System --- */
    class FullScreenCarousel {
        constructor(sectionId, stepSelector, onActivate = null) {
            this.section = document.querySelector(sectionId);
            if (!this.section) return;

            this.steps = this.section.querySelectorAll(stepSelector);
            this.onActivate = onActivate;
            this.activeIndex = 0;
            this.isTransitioning = false;
            this.isLocked = false;
            this.lastUnlockTime = 0;
            this.scrollDirection = 1; // 1 = down, -1 = up
            this.lastScrollY = window.scrollY;

            this.init();
        }

        init() {
            // Track scroll direction to prevent wrong-direction snapping
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                if (currentScrollY !== this.lastScrollY) {
                    this.scrollDirection = currentScrollY > this.lastScrollY ? 1 : -1;
                    this.lastScrollY = currentScrollY;
                }
            }, { passive: true });

            // 1. Snap Detection — 98% threshold prevents large teleport-style snaps when header/footer exist
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.98) {
                        this.lockAndSnap();
                    } else if (!entry.isIntersecting) {
                        this.unlock();
                    }
                });
            }, { threshold: [0.5, 0.98, 1.0] });

            this.observer.observe(this.section);

            // Removed tight ±12vh scroll listener to stop jumpy teleportation when reversing scroll direction

            this.activateStep(0);
        }

        lockAndSnap() {
            if (this.isLocked) return;
            // Lower cooldown from 3000ms to 1000ms for more responsive re-entry, 
            // but rely on intersection more accurately.
            if (Date.now() - this.lastUnlockTime < 1000) return;

            const rect = this.section.getBoundingClientRect();

            // When re-entering from below (scrolling up), start at the last step
            const startIndex = this.scrollDirection < 0 ? this.steps.length - 1 : 0;
            this.activateStep(startIndex);

            this.isLocked = true;
            document.body.classList.add('cx-lock');

            const targetY = window.scrollY + rect.top;
            window.scrollTo({ top: targetY, behavior: 'auto' }); // Snapping should be instant to avoid "floating" feel

            window.activeCarousel = this;
        }

        unlock() {
            if (!this.isLocked) return;
            this.isLocked = false;
            document.body.classList.remove('cx-lock');
            if (window.activeCarousel === this) window.activeCarousel = null;
        }

        activateStep(index) {
            if (index < 0 || index >= this.steps.length) return;
            this.activeIndex = index;

            this.steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
            });

            if (this.onActivate) this.onActivate(index, this.steps[index], this.section);
        }

        handleDirection(direction) {
            if (this.isTransitioning) return true;

            const transitionDuration = 850; // Matches 0.8s CSS + buffer

            if (direction === 'down') {
                if (this.activeIndex < this.steps.length - 1) {
                    this.isTransitioning = true;
                    this.activateStep(this.activeIndex + 1);
                    setTimeout(() => { this.isTransitioning = false; }, transitionDuration);
                    return true;
                } else {
                    // Exit BOTTOM
                    this.lastUnlockTime = Date.now();
                    this.unlock();
                    // Scroll enough to clear the 98% threshold
                    window.scrollBy({ top: 300, behavior: 'smooth' });
                    return false;
                }
            } else if (direction === 'up') {
                if (this.activeIndex > 0) {
                    this.isTransitioning = true;
                    this.activateStep(this.activeIndex - 1);
                    setTimeout(() => { this.isTransitioning = false; }, transitionDuration);
                    return true;
                } else {
                    // Exit TOP
                    this.lastUnlockTime = Date.now();
                    this.unlock();
                    // Scroll enough to clear the 98% threshold
                    window.scrollBy({ top: -300, behavior: 'smooth' });
                    return false;
                }
            }
            return false;
        }
    }

    // --- Specialized Callbacks for Hero Carousel ---
    function heroCarouselCallback(index, step, section) {
        // We can add logic here for background changes per step if needed
        // Currently just handles basic visibility through classes in the constructor
    }

    // --- Global Gesture Handlers ---
    // PC: wheel event with debounce threshold
    let wheelAccumulator = 0;
    const wheelThreshold = 30; // Minimum delta to trigger a step
    
    window.addEventListener('wheel', (e) => {
        if (!window.activeCarousel) return;
        
        // Use a threshold to prevent accidental double-triggers from sensitive wheels
        if (Math.abs(e.deltaY) < wheelThreshold) return;

        const direction = e.deltaY > 0 ? 'down' : 'up';
        if (window.activeCarousel.handleDirection(direction)) {
            e.preventDefault();
        }
    }, { passive: false });

    // Mobile: touch events
    let globalTouchStartY = 0;
    let globalTouchCurrentY = 0;
    let touchHandled = false;

    window.addEventListener('touchstart', (e) => {
        globalTouchStartY = e.touches[0].clientY;
        globalTouchCurrentY = globalTouchStartY;
        touchHandled = false;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!window.activeCarousel) return;

        // Always prevent default while locked to stop native scroll fighting the carousel
        e.preventDefault();

        if (touchHandled) return;

        globalTouchCurrentY = e.touches[0].clientY;
        const diff = globalTouchStartY - globalTouchCurrentY;

        // Increased threshold to 60px for more robust mobile interaction
        if (Math.abs(diff) > 60) {
            touchHandled = true;
            const direction = diff > 0 ? 'down' : 'up';
            window.activeCarousel.handleDirection(direction);
        }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
        // If swipe was short but decisive, still handle it
        if (!touchHandled && window.activeCarousel) {
            const diff = globalTouchStartY - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 20) {
                const direction = diff > 0 ? 'down' : 'up';
                window.activeCarousel.handleDirection(direction);
            }
        }
        touchHandled = false;
    }, { passive: true });

    // --- Initialize Full-Screen Section (Centrax ONLY) ---
    // --- Hero Section is now static; carousel initialization removed. ---

    // --- Standalone Centrax Section Reveal ---
    const centraxSection = document.getElementById('centrax-section');
    if (centraxSection) {
        const cxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    centraxSection.classList.add('revealed');
                    
                    // Stagger the detail groups
                    const groups = centraxSection.querySelectorAll('.cx-detail-group');
                    setTimeout(() => groups[0]?.classList.add('active'), 600);
                    setTimeout(() => groups[1]?.classList.add('active'), 1000);
                }
            });
        }, { threshold: 0.4 });
        cxObserver.observe(centraxSection);
    }

    /* Side-by-Side Scroll Logic (Frame 152) - RESTORED ORIGINAL */
    (function () {
        const steps = document.querySelectorAll('.side-step');
        if (steps.length === 0) return;

        function updateSideScroll() {
            // Only apply scroll effects for desktop (larger screens)
            if (window.innerWidth <= 1024) {
                steps.forEach(step => step.classList.add('active'));
                return;
            }

            steps.forEach(step => {
                const rect = step.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // If the middle of the step is near the middle of the screen
                if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateSideScroll);
        window.addEventListener('resize', updateSideScroll);
        updateSideScroll();
    })();

    /* Comparison section is now a static grid; legacy scroll logic removed. */

    /* Unit Correction Precision Counter Animation (Updated) */
    (function () {
        const counterEl = document.getElementById('dsCounterValue');
        const wrapperEl = document.getElementById('dsTargetNum');
        const trigger = document.getElementById('precisionAnimationTrigger');

        if (!counterEl || !wrapperEl || !trigger) return;

        const startVal = 25; // 0.25
        const endVal = 5;    // 0.05
        let interval;
        let timeoutId;
        let isHasAnimated = false; // Only animate once per scroll in usually, but let's follow user logic

        function playAnimation() {
            // Reset state
            clearInterval(interval);
            clearTimeout(timeoutId);
            wrapperEl.classList.remove('glow-final');
            let currentVal = startVal;
            counterEl.innerText = "0.25";
            
            // Start dropping down rapidly after a short delay
            timeoutId = setTimeout(() => {
                interval = setInterval(() => {
                    currentVal--;
                    
                    // Formatting as "0.XX"
                    let displayStr = "0." + (currentVal < 10 ? "0" + currentVal : currentVal);
                    counterEl.innerText = displayStr;
                    
                    if (currentVal <= endVal) {
                        clearInterval(interval);
                        // Hit 0.05: Boom! Sparkle & Glow effect
                        wrapperEl.classList.add('glow-final');
                    }
                }, 40); // 40ms per tick provides the extremely fast linear "촤르륵" speed
            }, 600); // 0.6 seconds pause before starting
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playAnimation();
                } else {
                    // Reset when out of view to allow re-trigger
                    clearInterval(interval);
                    clearTimeout(timeoutId);
                    wrapperEl.classList.remove('glow-final');
                    counterEl.innerText = "0.25";
                }
            });
        }, { threshold: 0.5 });

        observer.observe(trigger);
    })();

    /* Asymmetric Detail Section Interactive Visualization */
    (function () {
        const vizBox = document.querySelector('.asymmetric-viz-box');
        const activeLaser = document.querySelector('.viz-active-laser');

        if (!vizBox || !activeLaser) return;

        vizBox.addEventListener('mousemove', (e) => {
            const rect = vizBox.getBoundingClientRect();
            if (!rect) return;
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            vizBox.style.setProperty('--mouse-x', `${x}%`);
            vizBox.style.setProperty('--mouse-y', `${y}%`);
        });

        // Optional: Periodic "Laser Pulse" effect on random spots
        setInterval(() => {
            if (Math.random() > 0.7) {
                const pulse = document.querySelector('.viz-laser-pulse');
                if (pulse) {
                    pulse.style.opacity = '0.8';
                    setTimeout(() => { pulse.style.opacity = '0.2'; }, 150);
                }
            }
        }, 1000);
    })();

    /* Centrax Showcase Scroll Interactive */
    (function () {
        const showcase = document.getElementById('centrax-showcase');
        const movingElement = document.getElementById('csMovingElement');
        const infoSteps = document.querySelectorAll('.cs-info-step');

        if (!showcase || !movingElement) return;

        function updateCentraxScroll() {
            const rect = showcase.getBoundingClientRect();
            const totalHeight = showcase.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate progress (0 to 1) based on section scroll
            // Starts when section top hits viewport top, ends when section bottom hits viewport bottom
            let progress = -rect.top / (totalHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));

            // 1. Move Centrax Circle Up
            // Move from center (0) to top (-300px or more)
            const moveUp = progress * 400;
            movingElement.style.transform = `translateY(-${moveUp}px)`;
            movingElement.style.opacity = 1 - (progress * 0.5); // Fade slightly as it goes up

            // 2. Control Info Steps Appearance
            // Step 1: 0.2 to 0.4
            // Step 2: 0.5 to 0.7
            // Step 3: 0.8 to 1.0
            infoSteps.forEach((step, index) => {
                const stepStart = 0.2 + (index * 0.3);
                const stepEnd = stepStart + 0.2;

                if (progress >= stepStart && progress <= stepEnd) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateCentraxScroll);
        window.addEventListener('resize', updateCentraxScroll);
        updateCentraxScroll();
    })();

    /* Gauge & Counter Animation */
    (function () {
        const section = document.getElementById('tech-comparison-section');
        const needles = document.querySelectorAll('.gauge-needle-wrap');
        const counters = document.querySelectorAll('.g-val');

        if (!section) return;

        let isAnimating = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isAnimating) return;
                    isAnimating = true;
                    section.dataset.intersecting = "true";

                    // Animate Counters and Needles in Sync
                    counters.forEach((counter, index) => {
                        const targetText = counter.getAttribute('data-target') || counter.innerText.replace(/,/g, '');
                        if (!counter.hasAttribute('data-target')) {
                            counter.setAttribute('data-target', targetText);
                        }

                        const target = parseInt(targetText);
                        const duration = 2000;
                        const startTime = performance.now();

                        // Link needle to its corresponding counter
                        const needle = needles[index];
                        const startAngle = -90; // Far left
                        const endAngle = target === 4000 ? 65 : -55; // Match previous v4000/v500 angles

                        counter.classList.remove('final-highlight');

                        function updateSync(currentTime) {
                            if (section.dataset.intersecting !== "true") return;

                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            const easeOutQuad = t => t * (2 - t);
                            const easedProgress = easeOutQuad(progress);

                            // Update Counter
                            const currentCount = Math.floor(easedProgress * target);
                            counter.innerText = currentCount;

                            // Update Needle (Sync with counter eased progress)
                            if (needle) {
                                const currentAngle = startAngle + (easedProgress * (endAngle - startAngle));
                                needle.style.transform = `rotate(${currentAngle}deg)`;
                            }

                            if (progress < 1) {
                                requestAnimationFrame(updateSync);
                            } else {
                                counter.innerText = target;
                                if (needle) needle.style.transform = `rotate(${endAngle}deg)`;
                                if (target === 4000) {
                                    counter.classList.add('final-highlight');
                                }
                            }
                        }
                        requestAnimationFrame(updateSync);
                    });
                } else {
                    isAnimating = false;
                    section.dataset.intersecting = "false";
                    // RESET when out of view
                    needles.forEach(needle => {
                        needle.style.transform = 'rotate(-90deg)';
                    });
                    counters.forEach(counter => {
                        counter.classList.remove('final-highlight');
                        counter.innerText = "0";
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    })();

    /* Global Intersection Observer for Technical Section Reveals */
    (function () {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Once revealed, we can stop observing this specific element if we want it to stay
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);

        // Observe all technical sections
        const techSections = [
            '#centrax-section',
            '#asymmetric-detail-section',
            '.astigmatism-precision-section',
            '#tech-comparison-section',
            '#redocking-section'
        ];

        techSections.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) revealObserver.observe(el);
        });
    })();

    /* HUD Data Streaming Logic */
    (function () {
        const dataLines = document.querySelectorAll('.hud-data-line');
        if (dataLines.length === 0) return;

        setInterval(() => {
            dataLines.forEach(line => {
                // Only update half the time for natural feel
                if (Math.random() > 0.5) {
                    const originalText = line.innerText;
                    if (originalText.includes('POS:')) {
                        const val1 = (Math.random() * 0.05).toFixed(2);
                        const val2 = (Math.random() * 0.05).toFixed(2);
                        line.innerText = `POS: ${val1} | ${val2}`;
                    } else if (originalText.includes('ERR:')) {
                        // 4th gen vs 5th gen error display
                        if (line.parentElement.classList.contains('blue')) {
                            line.innerText = `ERR: ${(Math.random() * 0.01).toFixed(3)}`;
                        } else {
                            line.innerText = `ERR: ${(0.25 + Math.random() * 0.05).toFixed(2)}D`;
                        }
                    }
                }
            });
        }, 1500);
    })();

    /* Section 04 Graph Animation Trigger */
    const rdSection = document.getElementById('redocking-section');
    if (rdSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    rdSection.classList.add('active');
                    // Stop observing once animation has started if preferred
                    // observer.unobserve(rdSection); 
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

        observer.observe(rdSection);
    }
});
