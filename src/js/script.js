// Configure Tailwind CSS Dark Mode (Class-based)
if (typeof tailwind !== 'undefined') {
    tailwind.config = { darkMode: 'class' };
} else {
    window.tailwind = { config: { darkMode: 'class' } };
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const html = document.documentElement;

function updateThemeIcons() {
    const isDark = html.classList.contains('dark');
    
    // Desktop icons
    const moon = document.getElementById('icon-moon');
    const sun = document.getElementById('icon-sun');
    if (moon && sun) {
        if (isDark) {
            sun.style.display = 'inline-block';
            moon.style.display = 'none';
        } else {
            sun.style.display = 'none';
            moon.style.display = 'inline-block';
        }
    }
    
    // Mobile icons & labels
    const mobileMoon = document.getElementById('mobile-icon-moon');
    const mobileSun = document.getElementById('mobile-icon-sun');
    const textLight = document.getElementById('mobile-text-light');
    const textDark = document.getElementById('mobile-text-dark');
    if (mobileMoon && mobileSun) {
        if (isDark) {
            mobileSun.style.display = 'inline-block';
            if (textLight) textLight.style.display = 'inline';
            mobileMoon.style.display = 'none';
            if (textDark) textDark.style.display = 'none';
        } else {
            mobileMoon.style.display = 'inline-block';
            if (textDark) textDark.style.display = 'inline';
            mobileSun.style.display = 'none';
            if (textLight) textLight.style.display = 'none';
        }
    }
}

function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

// Initial theme setup on load
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
}
updateThemeIcons();

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800; // animation duration in milliseconds

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, startPosition * (1 - easeOutQuad(progress)));
        
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
});

// Brand Card: Toggle expand/collapse with FLIP animation
let activeOpenBrandCard = null;

function toggleBrandCard(btn) {
    const card = btn.closest('.brand-card');
    if (!card) return;

    const panel = card.querySelector('.brand-gallery-content');
    const isCurrentlyOpen = card.classList.contains('open');
    const allBrandCards = Array.from(document.querySelectorAll('.brand-card'));

    // 1. Snapshot ALL brand cards before layout change
    const firstRects = new Map();
    allBrandCards.forEach(c => {
        firstRects.set(c, c.getBoundingClientRect());
    });

    // 2. Close active card if another one is open
    if (activeOpenBrandCard && activeOpenBrandCard !== card) {
        const prevPanel = activeOpenBrandCard.querySelector('.brand-gallery-content');
        const prevBtn = activeOpenBrandCard.querySelector('.brand-work-btn');
        activeOpenBrandCard.classList.remove('open');
        if (prevPanel) prevPanel.classList.remove('open');
        if (prevBtn) prevBtn.classList.remove('open');
    }

    // 3. Toggle target card
    if (!isCurrentlyOpen) {
        card.classList.add('open');
        if (panel) panel.classList.add('open');
        btn.classList.add('open');
        activeOpenBrandCard = card;
    } else {
        card.classList.remove('open');
        if (panel) panel.classList.remove('open');
        btn.classList.remove('open');
        activeOpenBrandCard = null;
    }

    // 4. Force reflow and snapshot NEW positions
    const lastRects = new Map();
    allBrandCards.forEach(c => {
        lastRects.set(c, c.getBoundingClientRect());
    });

    // 5. Animate any card that moved position via Web Animations API (FLIP)
    allBrandCards.forEach(c => {
        const first = firstRects.get(c);
        const last = lastRects.get(c);

        if (!first || !last) return;

        const dx = first.left - last.left;
        const dy = first.top - last.top;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            c.animate(
                [
                    { transform: `translate(${dx}px, ${dy}px)` },
                    { transform: 'translate(0px, 0px)' }
                ],
                {
                    duration: 480,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'none'
                }
            );
        }
    });
}

// Brand Card: Switch between Platforms / Audience Stats tabs
function switchBrandTab(clickedBtn, panelId) {
    const tabBar = clickedBtn.closest('.brand-tab-bar');
    const panel = clickedBtn.closest('.brand-panel-inner');
    tabBar.querySelectorAll('.brand-tab-btn').forEach(b => b.classList.remove('active'));
    panel.querySelectorAll('.brand-tab-panel').forEach(p => p.classList.remove('active'));
    clickedBtn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
}


// --- Contact Form Logic with EmailJS ---
// It's best to place this inside your existing DOMContentLoaded listener if you have one.
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Initialize EmailJS with your Public Key
        emailjs.init({
            publicKey: "Vkx9gRLQoz4KGBcYV", // Get this from your EmailJS account settings
        });

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const captcha = document.getElementById('captcha');
            if (!captcha.checked) {
                alert('Please confirm you are not a robot.');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Replace with your EmailJS Service ID and Template ID
            const serviceID = 'service_ta1ntqb';
            const templateID = 'template_xrvhvqf';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitButton.textContent = 'Message Sent!';
                    alert('Your message has been sent successfully!');
                    contactForm.reset();
                    // Re-enable the button after a delay
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }, 3000);
                }, (err) => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    alert('Failed to send the message. Please try again later. Error: ' + JSON.stringify(err));
                });
        });
    }
});


// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card-hover, .project-card, .scroll-animate').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightYearElement = document.getElementById("copyright-year");

if (copyrightYearElement) {
    copyrightYearElement.textContent = "2023 - " + updateYear;
}

const footerUsernameElement = document.getElementById("footer-username");
const footerUsernames = [
    "@kanannuruyevs.",
    "@kanansnote.",
    "@kanansnoteru.",
    "@kanansnoteaze.",
    "@kananwhispersasmr."
];

if (footerUsernameElement) {
    let footerUsernameIndex = 0;

    setInterval(() => {
        footerUsernameIndex = (footerUsernameIndex + 1) % footerUsernames.length;
        footerUsernameElement.classList.remove("is-changing");
        footerUsernameElement.textContent = footerUsernames[footerUsernameIndex];
        void footerUsernameElement.offsetWidth;
        footerUsernameElement.classList.add("is-changing");
    }, 4000);
}

// --- Option 4: Brand Slider Carousel Logic ---
let currentBrandSlide = 0;
const totalBrandSlides = 3;

function initBrandCarousel() {
    const track = document.getElementById('brandCarouselTrack');
    const prevBtn = document.getElementById('brandCarouselPrev');
    const nextBtn = document.getElementById('brandCarouselNext');
    const dots = document.querySelectorAll('#brandCarouselDots .carousel-dot');

    if (!track) return;

    function updateCarousel() {
        const slides = track.querySelectorAll('.brand-slide');
        track.style.transform = `translateX(-${currentBrandSlide * 100}%)`;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active-slide', idx === currentBrandSlide);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentBrandSlide);
        });
    }

    updateCarousel();

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentBrandSlide = (currentBrandSlide - 1 + totalBrandSlides) % totalBrandSlides;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentBrandSlide = (currentBrandSlide + 1) % totalBrandSlides;
            updateCarousel();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentBrandSlide = idx;
            updateCarousel();
        });
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchEndX = 0;

    const viewport = track.closest('.brand-carousel-viewport');
    if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                currentBrandSlide = (currentBrandSlide + 1) % totalBrandSlides;
                updateCarousel();
            } else if (touchEndX - touchStartX > 50) {
                currentBrandSlide = (currentBrandSlide - 1 + totalBrandSlides) % totalBrandSlides;
                updateCarousel();
            }
        }, { passive: true });
    }
}

// --- KANANSNOTE Language Switcher (EN | AZ | RU) ---
const knLangData = {
    en: {
        avatar: './src/images/brand-avatars/kanansnote-avatar.png',
        titleKey: 'brand_kanansnote',
        titleText: 'KANANSNOTE',
        typeKey: 'brand_kanansnote_type',
        descKey: 'brand_kanansnote_desc',
        reach: '95K+',
        tags: [
            { key: 'tag_lifestyle', text: 'Lifestyle' },
            { key: 'tag_mental_health', text: 'Mental Health' },
            { key: 'tag_personal_style', text: 'Personal Style' },
            { key: 'tag_reactions', text: 'Reactions' },
            { key: 'tag_english', text: 'English' }
        ],
        ig: 'https://instagram.com/kanansnote',
        igFol: '80K followers',
        tt: 'https://tiktok.com/@kanansnote',
        ttFol: '–',
        yt: 'https://youtube.com/@kanansnote',
        ytFol: '15K subscribers'
    },
    aze: {
        avatar: './src/images/brand-avatars/kanansnoteaze-avatar.png',
        titleKey: 'brand_kanansnoteaze',
        titleText: 'KANANSNOTEAZE',
        typeKey: 'brand_kanansnoteaze_type',
        descKey: 'brand_kanansnoteaze_desc',
        reach: '45K+',
        tags: [
            { key: 'tag_lifestyle', text: 'Lifestyle' },
            { key: 'tag_mental_health', text: 'Mental Health' },
            { key: 'tag_personal_style', text: 'Personal Style' },
            { key: 'tag_reactions', text: 'Reactions' },
            { key: 'tag_azerbaijani', text: 'Azerbaijani' }
        ],
        ig: 'https://instagram.com/kanansnoteaze',
        igFol: '45K followers',
        tt: 'https://tiktok.com/@kanansnoteaze',
        ttFol: '–',
        yt: 'https://youtube.com/@kanansnoteaze',
        ytFol: '–'
    },
    ru: {
        avatar: './src/images/brand-avatars/kanansnoteru-avatar.png',
        titleKey: 'brand_kanansnoteru',
        titleText: 'KANANSNOTERU',
        typeKey: 'brand_kanansnoteru_type',
        descKey: 'brand_kanansnoteru_desc',
        reach: '60K+',
        tags: [
            { key: 'tag_lifestyle', text: 'Lifestyle' },
            { key: 'tag_mental_health', text: 'Mental Health' },
            { key: 'tag_personal_style', text: 'Personal Style' },
            { key: 'tag_reactions', text: 'Reactions' },
            { key: 'tag_russian', text: 'Russian' }
        ],
        ig: 'https://instagram.com/kanansnoteru',
        igFol: '60K followers',
        tt: 'https://tiktok.com/@kanansnoteru',
        ttFol: '–',
        yt: 'https://youtube.com/@kanansnoteru',
        ytFol: '–'
    }
};

function switchKnLang(lang, btn) {
    const data = knLangData[lang];
    if (!data) return;

    if (btn) {
        const container = btn.closest('div');
        if (container) {
            container.querySelectorAll('.kn-lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }

    const avatar = document.getElementById('kn-avatar-img');
    if (avatar) avatar.src = data.avatar;

    const title = document.getElementById('kn-brand-title');
    if (title) {
        title.setAttribute('data-i18n-key', data.titleKey);
        const currLang = (typeof currentLanguage !== 'undefined' && currentLanguage) ? currentLanguage : 'en';
        const translated = (typeof translations !== 'undefined' && translations[currLang]) ? translations[currLang][data.titleKey] : null;
        title.textContent = translated || data.titleText;
    }

    const type = document.getElementById('kn-brand-type');
    if (type) {
        type.setAttribute('data-i18n-key', data.typeKey);
        const currLang = (typeof currentLanguage !== 'undefined' && currentLanguage) ? currentLanguage : 'en';
        if (typeof translations !== 'undefined' && translations[currLang] && translations[currLang][data.typeKey]) {
            type.textContent = translations[currLang][data.typeKey];
        }
    }

    const desc = document.getElementById('kn-brand-desc');
    if (desc) {
        desc.setAttribute('data-i18n-key', data.descKey);
        const currLang = (typeof currentLanguage !== 'undefined' && currentLanguage) ? currentLanguage : 'en';
        if (typeof translations !== 'undefined' && translations[currLang] && translations[currLang][data.descKey]) {
            desc.textContent = translations[currLang][data.descKey];
        }
    }

    const reachNum = document.getElementById('kn-reach-num');
    if (reachNum) reachNum.textContent = data.reach;

    const statReach = document.getElementById('kn-stat-reach');
    if (statReach) statReach.textContent = data.reach;

    const tagsContainer = document.getElementById('kn-tags-container');
    if (tagsContainer) {
        tagsContainer.innerHTML = data.tags.map(t => `<span class="brand-chip" data-i18n-key="${t.key}">${t.text}</span>`).join('');
    }

    const igLink = document.getElementById('kn-ig-link');
    if (igLink) igLink.href = data.ig;

    const rowIg = document.getElementById('kn-row-ig');
    if (rowIg) rowIg.href = data.ig;

    const folIg = document.getElementById('kn-fol-ig');
    if (folIg) folIg.textContent = data.igFol;

    const ttLink = document.getElementById('kn-tt-link');
    if (ttLink) ttLink.href = data.tt;

    const rowTt = document.getElementById('kn-row-tt');
    if (rowTt) rowTt.href = data.tt;

    const folTt = document.getElementById('kn-fol-tt');
    if (folTt) folTt.textContent = data.ttFol;

    const ytLink = document.getElementById('kn-yt-link');
    if (ytLink) ytLink.href = data.yt || '#';

    const rowYt = document.getElementById('kn-row-yt');
    if (rowYt) rowYt.href = data.yt || '#';

    const folYt = document.getElementById('kn-fol-yt');
    if (folYt) folYt.textContent = data.ytFol || '–';

    // Top-right platform badges dynamic link update
    const topIg = document.getElementById('kn-top-ig');
    if (topIg) topIg.href = data.ig;

    const topYt = document.getElementById('kn-top-yt');
    if (topYt) topYt.href = data.yt || '#';

    const topTt = document.getElementById('kn-top-tt');
    if (topTt) topTt.href = data.tt || '#';
}

document.addEventListener('DOMContentLoaded', function() {
    initBrandCarousel();
});