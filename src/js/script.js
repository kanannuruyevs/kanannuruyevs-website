// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const html = document.documentElement;

function updateThemeIcons() {
    // Desktop
    const moon = document.getElementById('icon-moon');
    const sun = document.getElementById('icon-sun');
    if (moon && sun) {
        if (html.classList.contains('dark')) {
            sun.style.display = 'none';
            moon.style.display = 'inline';
        } else {
            sun.style.display = 'inline';
            moon.style.display = 'none';
        }
    }
    // Mobile
    const mobileMoon = document.getElementById('mobile-icon-moon');
    const mobileSun = document.getElementById('mobile-icon-sun');
    const textLight = document.getElementById('mobile-text-light');
    const textDark = document.getElementById('mobile-text-dark');
    if (mobileMoon && mobileSun) {
        if (html.classList.contains('dark')) {
            mobileMoon.style.display = 'inline';
            textDark.style.display = 'inline';
            mobileSun.style.display = 'none';
            textLight.style.display = 'none';
        } else {
            mobileMoon.style.display = 'none';
            textDark.style.display = 'none';
            mobileSun.style.display = 'inline';
            textLight.style.display = 'inline';
        }
    }
}

function toggleTheme() {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcons();
}

// On page load, set theme and icons
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}
updateThemeIcons();

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

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