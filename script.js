// JavaScript to toggle the burger menu and social links on and off
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links'); // select the social links

burgerMenu.addEventListener('click', () => {
    if (navMenu.style.display === "none") {
        navMenu.style.display = "block";
        socialLinks.style.display = "block"; // show the social links
    } else {
        navMenu.style.display = "none";
        socialLinks.style.display = "none"; // hide the social links
    }
});

// Optional: Close the menu and social links when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = "none";
        socialLinks.style.display = "none"; // hide the social links
    });
});

// Initialize Hammer.js on the burger menu element
const hammer = new Hammer(burgerMenu);

// Detect swipe right gesture to open the mobile menu and social links
hammer.on('swiperight', function(event) {
    navMenu.style.display = "block";
    socialLinks.style.display = "block"; // show the social links
});

// Detect swipe left gesture to close the mobile menu and social links
hammer.on('swipeleft', function(event) {
    navMenu.style.display = "none";
    socialLinks.style.display = "none"; // hide the social links
});
