// Configure Tailwind CSS Dark Mode (Class-based) & Cyberpunk Theme Extensions
const cyberpunkTheme = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                obsidian: {
                    DEFAULT: '#0B0E14',
                    card: '#12161F',
                    border: 'rgba(255, 255, 255, 0.08)',
                },
                cyber: {
                    cyan: '#0EA5E9',
                    sky: '#38BDF8',
                    mint: '#34D399',
                    purple: '#A855F7',
                    violet: '#7C3AED',
                    coral: '#FF5E62',
                    orange: '#F97316',
                    slate: '#F8FAFC',
                    muted: '#94A3B8'
                }
            }
        }
    }
};

if (typeof tailwind !== 'undefined') {
    tailwind.config = cyberpunkTheme;
} else {
    window.tailwind = { config: cyberpunkTheme };
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

// Initial theme setup on load (default to dark mode for cyberpunk portfolio experience)
if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
} else {
    html.classList.add('dark');
}
updateThemeIcons();

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile Menu & Backdrop Overlay
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
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

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

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
}

// Brand Card: Toggle expand/collapse with FLIP animation
let activeOpenBrandCard = null;

function closeAllBrandCards() {
    document.querySelectorAll('.brand-card').forEach(c => {
        c.classList.remove('open');
        const panel = c.querySelector('.brand-gallery-content');
        const btn = c.querySelector('.brand-work-btn');
        if (panel) {
            panel.classList.remove('open');
            panel.style.maxHeight = '';
        }
        if (btn) {
            btn.classList.remove('open');
            const icon = btn.querySelector('.bwb-chevron');
            if (icon) icon.classList.remove('rotate-180');
        }
    });
    activeOpenBrandCard = null;
}

function toggleBrandCard(btn) {
    const card = btn.closest('.brand-card');
    if (!card) return;

    const panel = card.querySelector('.brand-gallery-content');
    const chevron = btn.querySelector('.bwb-chevron');
    const isCurrentlyOpen = card.classList.contains('open') || (panel && panel.classList.contains('open'));
    const allBrandCards = Array.from(document.querySelectorAll('.brand-card'));

    // 1. Snapshot ALL brand cards before layout change
    const firstRects = new Map();
    allBrandCards.forEach(c => {
        firstRects.set(c, c.getBoundingClientRect());
    });

    // 2. Close active card if another one is open
    if (activeOpenBrandCard && activeOpenBrandCard !== card) {
        closeAllBrandCards();
    }

    // 3. Toggle target card
    if (!isCurrentlyOpen) {
        card.classList.add('open');
        if (panel) {
            panel.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
        btn.classList.add('open');
        if (chevron) chevron.classList.add('rotate-180');
        activeOpenBrandCard = card;
    } else {
        card.classList.remove('open');
        if (panel) {
            panel.classList.remove('open');
            panel.style.maxHeight = '';
        }
        btn.classList.remove('open');
        if (chevron) chevron.classList.remove('rotate-180');
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


// Smooth Scroll Reveal Animations (GPU Accelerated, Lag-Free)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';

            // Clear transform after transition completes so CSS hover scale works seamlessly
            setTimeout(() => {
                target.style.transform = '';
            }, 500);

            observer.unobserve(target);
        }
    });
}, observerOptions);

// Observe elements for smooth reveal as user scrolls down
document.querySelectorAll('.card-hover, .project-card, .scroll-animate, .hover-lift, .solution-a-card, .brand-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    // Reveal top fold elements immediately without animation delay
    if (rect.top < window.innerHeight * 0.75) {
        el.style.opacity = '1';
        el.style.transform = '';
    } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    }
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
        closeAllBrandCards();

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
    let touchStartY = 0;

    const viewport = track.closest('.brand-carousel-viewport');
    if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Ignore vertical scrolling: if Y movement is greater than X movement, do not switch slides
            if (Math.abs(deltaY) >= Math.abs(deltaX)) {
                return;
            }

            // Only trigger slide transition for intentional horizontal swipes (> 60px)
            if (Math.abs(deltaX) > 60) {
                if (deltaX < 0) {
                    currentBrandSlide = (currentBrandSlide + 1) % totalBrandSlides;
                    updateCarousel();
                } else {
                    currentBrandSlide = (currentBrandSlide - 1 + totalBrandSlides) % totalBrandSlides;
                    updateCarousel();
                }
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

    autoFitBrandTitles();
}

function autoFitBrandTitles() {
    const titles = document.querySelectorAll('.brand-card-title');
    titles.forEach(title => {
        const parent = title.parentElement;
        if (!parent) return;
        title.style.fontSize = '';
        let currentSize = parseFloat(window.getComputedStyle(title).fontSize);
        const availableWidth = parent.clientWidth;
        if (availableWidth > 0) {
            while (title.scrollWidth > availableWidth && currentSize > 14) {
                currentSize -= 0.5;
                title.style.fontSize = currentSize + 'px';
            }
        }
    });
}

window.addEventListener('resize', autoFitBrandTitles);

// Services Section & Interactive Modal Logic (Variant 1 + Variant 3)
const servicesData = {
    'content-creation': {
        keyPrefix: 'service_1',
        icon: 'fas fa-video',
        deliverables: {
            en: [
                { step: '1. Brief & Concept', desc: 'Topic selection, target audience analysis, and concept planning.' },
                { step: '2. Filming & Audio Capture', desc: 'Professional 4K camera, studio lighting, and crisp microphone audio recording.' },
                { step: '3. Editing & Post-Production', desc: 'Dynamic cuts, captions/subtitles, sound effects, and color grading.' },
                { step: '4. Final Delivery & Formatting', desc: 'Delivery of ready-to-publish files in Instagram (9:16) and YouTube (16:9) formats.' }
            ],
            az: [
                { step: '1. Brifinq və İdeya', desc: 'Mövzunun seçilməsi, hədəf auditoriyanın təhlili və konsept planlaşdırılması.' },
                { step: '2. Çəkiliş və Səs Yazılışı', desc: 'Peşəkar kamera (4K), işıqlandırma və aydın mikrafon səs yazılışı.' },
                { step: '3. Montaj və Post-prodakşn', desc: 'Dinamik kəsimlər, altyazılar (subtitles), səs effektləri və rəng korreksiyası.' },
                { step: '4. Təhvil və Formatlaşdırma', desc: 'Instagram (9:16) və YouTube (16:9) formatlarında hazır faylların çatdırılması.' }
            ],
            ru: [
                { step: '1. Брифинг и Концепция', desc: 'Выбор темы, анализ целевой аудитории и планирование концепта.' },
                { step: '2. Съемка и Запись Звука', desc: 'Профессиональная 4K камера, студийное освещение и чистая запись звука.' },
                { step: '3. Монтаж и Пост-продакшн', desc: 'Динамичный монтаж, субтитры, звуковые эффекты и цветокоррекция.' },
                { step: '4. Финальная Сдача и Форматирование', desc: 'Передача готовых файлов в форматах Instagram (9:16) и YouTube (16:9).' }
            ]
        }
    },
    'ai-content': {
        keyPrefix: 'service_2',
        icon: 'fas fa-wand-magic-sparkles',
        deliverables: {
            en: [
                { step: '1. AI Prompt Strategy', desc: 'Analyzing topic ideas, target hooks, and structuring viral AI prompts.' },
                { step: '2. AI Scriptwriting & Copywriting', desc: 'Generating engaging video scripts, captions, and content outlines using AI.' },
                { step: '3. AI Thumbnail & Graphic Design', desc: 'Generating eye-catching cover graphics and visual assets with Midjourney/DALL-E.' },
                { step: '4. Automated Publishing Setup', desc: 'Configuring AI content pipelines and scheduling tools for multi-platform delivery.' }
            ],
            az: [
                { step: '1. AI Prompt Strategiyası', desc: 'Mövzu ideyalarının, diqqətçəkən başlıqların və AI sorğularının planlaşdırılması.' },
                { step: '2. AI Skript & Mətn Yazılışı', desc: 'AI alətləri ilə cəlbedici video skriptlərinin, altyazıların və kontent planının hazırlanması.' },
                { step: '3. AI Örtük & Qrafik Dizayn', desc: 'Midjourney/DALL-E ilə yüksək diqqətçəkən örtük şəkillərinin və vizualların hazırlanması.' },
                { step: '4. Avtomatlaşdırılmış Paylaşım', desc: 'Kontent zəncirinin qurulması və sosial şəbəkələrdə avtomatlaşdırılmış vaxt planı.' }
            ],
            ru: [
                { step: '1. ИИ Промпт-Стратегия', desc: 'Анализ идей, цепляющих хуков и составление промптов для ИИ.' },
                { step: '2. Написание ИИ-Сценариев', desc: 'Генерация увлекательных видео-сценариев и текстов с помощью ИИ.' },
                { step: '3. ИИ Дизайн Обложек и Графики', desc: 'Создание привлекательных обложек и визуала с Midjourney/DALL-E.' },
                { step: '4. Автоматизация Публикаций', desc: 'Настройка контент-цепочек и автопостинга для нескольких платформ.' }
            ]
        }
    },
    'vibe-coding': {
        keyPrefix: 'service_3',
        icon: 'fas fa-laptop-code',
        deliverables: {
            en: [
                { step: '1. Architecture & Design Wireframe', desc: 'Defining website requirements, glassmorphism dark-mode UI, and structure.' },
                { step: '2. AI-Assisted Vibe Coding', desc: 'Building responsive web pages, interactive components, and smooth animations.' },
                { step: '3. SEO & Mobile Optimization', desc: 'Ensuring ultra-fast page speeds, mobile responsiveness, and search optimization.' },
                { step: '4. Launch & Hosting Setup', desc: 'Connecting custom domain, SSL certification, and deployment.' }
            ],
            az: [
                { step: '1. Arxitektura və Struktur Planı', desc: 'Saytın ehtiyaclarının, şüşə effekti (Glassmorphism) və dark-mode dizaynının təyini.' },
                { step: '2. AI Dəstəkli Vibe Coding', desc: 'Responsiv səhifələrin, interaktiv komponentlərin və animasiyaların hazırlanması.' },
                { step: '3. SEO və Mobil Optimizasiya', desc: 'Yüksək açılış sürəti, mobil cihazlara tam uyğunluq və SEO optimallaşdırılması.' },
                { step: '4. Buraxılış və Hostinq Qurulması', desc: 'Domenin qoşulması, SSL təhlükəsizlik sertifikatı və saytın canlıya verilməsi.' }
            ],
            ru: [
                { step: '1. Архитектура и Структура', desc: 'Определение требований к сайту, темного Glassmorphism интерфейса.' },
                { step: '2. Vibe Coding с Помощью ИИ', desc: 'Разработка адаптивных страниц, интерактивных элементов и анимаций.' },
                { step: '3. SEO и Мобильная Оптимизация', desc: 'Обеспечение молниеносной скорости загрузки, мобильной адаптивности и SEO.' },
                { step: '4. Запуск и Настройка Хостинга', desc: 'Подключение домена, SSL сертификата и деплой проекта.' }
            ]
        }
    },
    'personal-branding': {
        keyPrefix: 'service_4',
        icon: 'fas fa-bullhorn',
        deliverables: {
            en: [
                { step: '1. Authentic Identity & Positioning', desc: 'Finding your unique voice, niche positioning, and audience resonance.' },
                { step: '2. Content Strategy & Pillars', desc: 'Structuring content pillars for Instagram Reels, YouTube, and TikTok.' },
                { step: '3. Visual Feed & Aesthetics', desc: 'Designing cohesive cyber-minimalist feed templates and profile branding.' },
                { step: '4. Growth & Engagement Audit', desc: 'Optimizing reach, community engagement, and analytics tracking.' }
            ],
            az: [
                { step: '1. Səmimi Kimlik və Pozisionlanma', desc: 'Öz unikal səsini tapmaq, niş seçimi və auditoriya ilə dərin əlaqə.' },
                { step: '2. Kontent Strategiyası və Sütunlar', desc: 'Instagram Reels, YouTube və TikTok üçün kontent mövzularının bölüşdürülməsi.' },
                { step: '3. Vizual Şəbəkə və Estetika', desc: 'Kiber-minimalist profil dizaynı və estetik post/story şablonları.' },
                { step: '4. Böyümə və Əlaqə Auditi', desc: 'Baxış sayının artırılması, auditoriya ilə qarşılıqlı əlaqə və analitika.' }
            ],
            ru: [
                { step: '1. Искренний Стиль и Позиционирование', desc: 'Поиск уникального голоса, выбор ниши и связь с аудиторией.' },
                { step: '2. Контент-Стратегия и Рубрики', desc: 'Структурирование рубрик для Instagram Reels, YouTube и TikTok.' },
                { step: '3. Визуальный Стиль и Шаблоны', desc: 'Создание эстетичного оформления профиля и кибер-минималистичных шаблонов.' },
                { step: '4. Аудит Роста и Вовлеченности', desc: 'Оптимизация охватов, работы с аудиторией и аналитики.' }
            ]
        }
    },
    'creator-mentorship': {
        keyPrefix: 'service_5',
        icon: 'fas fa-user-astronaut',
        deliverables: {
            en: [
                { step: '1. Pre-Session Questionnaire', desc: 'Analyzing your current creator stage, goals, and primary roadblocks.' },
                { step: '2. 1-on-1 Live Strategy Session', desc: 'In-depth consultation covering camera confidence, topic ideas, and mindset.' },
                { step: '3. Overcoming Burnout & Blocks', desc: 'Actionable techniques to maintain consistency without mental exhaustion.' },
                { step: '4. Digital Tools Roadmap', desc: 'Personalized toolkit recommendation for editing, AI tools, and workflow.' }
            ],
            az: [
                { step: '1. Seans Önçəsi Sorğu', desc: 'Hazırkı məzmun yaradıcılığı mərhələinizin və maneələrin təhlili.' },
                { step: '2. 1-ə-1 Canlı Strategiya Seansı', desc: 'Kamera qarşısında sərbəstlik, mövzu seçimi və mental rahatlıq üzrə dərin seans.' },
                { step: '3. Tıxanma və Burnout-un Dəfi', desc: 'Tükanmadan, rəvan şəkildə davamlı kontent yaratmaq üçün texnikalar.' },
                { step: '4. Rəqəmsal Alətlər Xəritəsi', desc: 'Montaj, AI alətləri və avtomatlaşdırma üzrə fərdi alət tövsiyələri.' }
            ],
            ru: [
                { step: '1. Предсессионный Опросник', desc: 'Анализ текущего этапа, целей и главных трудностей авторского пути.' },
                { step: '2. 1-на-1 Живая Стратегическая Сессия', desc: 'Глубокая консультация: уверенность перед камерой, выбор тем и настрой.' },
                { step: '3. Преодоление Выгорания', desc: 'Практические техники регулярного создания контента без выгорания.' },
                { step: '4. Дорожная Карта Инструментов', desc: 'Персональные рекомендации инструментов для монтажа, ИИ и процессов.' }
            ]
        }
    }
};

let currentActiveServiceId = 'content-creation';

function getActiveLanguage() {
    return localStorage.getItem('language') || 'en';
}

function initServicesSection() {
    // Service Filter Tabs
    const filterBtns = document.querySelectorAll('.service-tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Service Modal Trigger Buttons
    const openModalBtns = document.querySelectorAll('.open-service-btn');
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceId = this.getAttribute('data-service-id');
            openServiceModal(serviceId);
        });
    });

    // Close Modal Listeners
    const modalBackdrop = document.getElementById('service-modal-backdrop');
    const closeModalBtn = document.getElementById('close-service-modal');

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeServiceModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeServiceModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeServiceModal();
    });

    // WhatsApp Submit Handler
    const btnSubmitWhatsapp = document.getElementById('btn-submit-whatsapp');
    if (btnSubmitWhatsapp) {
        btnSubmitWhatsapp.addEventListener('click', sendOrderToWhatsApp);
    }

    // Email / Form Submit Handler
    const btnSubmitEmail = document.getElementById('btn-submit-email');
    if (btnSubmitEmail) {
        btnSubmitEmail.addEventListener('click', sendOrderViaForm);
    }

    // Check URL Parameters for Direct Instagram Ad Traffic landing (e.g. ?service=content-creation)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && servicesData[serviceParam]) {
        setTimeout(() => {
            openServiceModal(serviceParam);
        }, 500);
    }
}

function openServiceModal(serviceId) {
    const lang = getActiveLanguage();
    const data = servicesData[serviceId] || servicesData['content-creation'];
    currentActiveServiceId = serviceId;

    const modal = document.getElementById('service-modal');
    const modalBadge = document.getElementById('modal-service-badge');
    const modalTitle = document.getElementById('modal-service-title');
    const modalDesc = document.getElementById('modal-service-desc');
    const modalPrice = document.getElementById('modal-service-price');
    const modalIcon = document.getElementById('modal-service-icon');
    const modalDeliverables = document.getElementById('modal-service-deliverables');

    const titleKey = `${data.keyPrefix}_title`;
    const badgeKey = `${data.keyPrefix}_badge`;
    const descKey = `${data.keyPrefix}_desc`;
    const priceKey = `${data.keyPrefix}_price`;

    if (modalBadge) {
        modalBadge.setAttribute('data-i18n-key', badgeKey);
        modalBadge.textContent = (typeof translations !== 'undefined' && translations[lang] && translations[lang][badgeKey]) ? translations[lang][badgeKey] : 'Service Booking';
    }
    if (modalTitle) {
        modalTitle.setAttribute('data-i18n-key', titleKey);
        modalTitle.textContent = (typeof translations !== 'undefined' && translations[lang] && translations[lang][titleKey]) ? translations[lang][titleKey] : '';
    }
    if (modalDesc) {
        modalDesc.setAttribute('data-i18n-key', descKey);
        modalDesc.textContent = (typeof translations !== 'undefined' && translations[lang] && translations[lang][descKey]) ? translations[lang][descKey] : '';
    }
    if (modalPrice) {
        modalPrice.setAttribute('data-i18n-key', priceKey);
        modalPrice.textContent = (typeof translations !== 'undefined' && translations[lang] && translations[lang][priceKey]) ? translations[lang][priceKey] : '';
    }
    if (modalIcon) {
        modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
    }

    const stepsList = data.deliverables[lang] || data.deliverables['en'];
    if (modalDeliverables) {
        modalDeliverables.innerHTML = stepsList.map(item => `
            <div class="p-3 rounded-xl bg-slate-950/40 border border-gray-800/80 flex items-start space-x-3">
                <i class="fas fa-check-circle text-cyan-400 text-sm mt-0.5"></i>
                <div>
                    <span class="block text-xs font-bold text-gray-200">${item.step}</span>
                    <span class="block text-xs text-gray-400 mt-0.5">${item.desc}</span>
                </div>
            </div>
        `).join('');
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

function sendOrderToWhatsApp() {
    const lang = getActiveLanguage();
    const name = document.getElementById('modal-client-name')?.value || 'N/A';
    const phone = document.getElementById('modal-client-phone')?.value || 'N/A';
    const ig = document.getElementById('modal-client-ig')?.value || 'N/A';
    const notes = document.getElementById('modal-client-notes')?.value || 'N/A';
    const serviceData = servicesData[currentActiveServiceId];
    const serviceTitleKey = serviceData ? `${serviceData.keyPrefix}_title` : '';
    const serviceTitle = (serviceTitleKey && typeof translations !== 'undefined' && translations[lang] && translations[lang][serviceTitleKey]) ? translations[lang][serviceTitleKey] : 'Service Inquiry';

    const text = `Hello Kanan! New service inquiry from website:%0A%0A📌 *Service:* ${encodeURIComponent(serviceTitle)}%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone/WhatsApp:* ${encodeURIComponent(phone)}%0A📸 *Instagram:* ${encodeURIComponent(ig)}%0A📝 *Notes:* ${encodeURIComponent(notes)}`;

    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
}

function sendOrderViaForm() {
    const lang = getActiveLanguage();
    const name = document.getElementById('modal-client-name')?.value;
    const phone = document.getElementById('modal-client-phone')?.value;

    const alertFillKey = 'service_modal_alert_fill';
    const alertFill = (typeof translations !== 'undefined' && translations[lang] && translations[lang][alertFillKey]) ? translations[lang][alertFillKey] : 'Please enter your Name and Phone / WhatsApp number.';

    if (!name || !phone) {
        alert(alertFill);
        return;
    }

    const alertSuccessKey = 'service_modal_alert_success';
    const alertSuccessTpl = (typeof translations !== 'undefined' && translations[lang] && translations[lang][alertSuccessKey]) ? translations[lang][alertSuccessKey] : 'Thank you, {name}! Your inquiry has been received. We will contact you soon.';
    const alertSuccess = alertSuccessTpl.replace('{name}', name);

    alert(alertSuccess);
    closeServiceModal();
}

window.addEventListener('languageChanged', (e) => {
    const modal = document.getElementById('service-modal');
    if (modal && modal.classList.contains('open')) {
        openServiceModal(currentActiveServiceId);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initBrandCarousel();
    autoFitBrandTitles();
    initServicesSection();
});