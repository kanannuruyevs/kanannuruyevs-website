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
    if (mobileMoon && mobileSun) {
        if (html.classList.contains('dark')) {
            mobileMoon.style.display = 'none';
            mobileSun.style.display = 'inline';
        } else {
            mobileMoon.style.display = 'inline';
            mobileSun.style.display = 'none';
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Expand/Collapse Brand Cards
document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const slider = this.parentElement.querySelector('.video-slider');
        const isHidden = slider.classList.contains('hidden');
        
        if (isHidden) {
            slider.classList.remove('hidden');
            this.textContent = 'Hide Content';
            
            // Initialize Swiper
            new Swiper(slider.querySelector('.swiper'), {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 3000,
                },
            });
        } else {
            slider.classList.add('hidden');
            this.textContent = 'View Content';
        }
    });
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const captcha = document.getElementById('captcha').checked;
    
    if (!name || !email || !message || !captcha) {
        alert('Please fill in all fields and complete the captcha.');
        return;
    }
    
    // Demo submission
    alert('Thank you for your message! This is a demo form - in a real implementation, your message would be sent securely.');
    this.reset();
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
document.querySelectorAll('.card-hover, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");

copyrightElement.innerHTML = "© 2023 - " + updateYear + " @kanannuruyevs. All rights reserved.";
