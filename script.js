// JavaScript to toggle the burger menu on and off
const burgerMenu = document.querySelector('.burger-menu');
const closeMenu = document.querySelector('.burger-menu-close'); // select the close button
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links'); // select the social links

burgerMenu.addEventListener('click', () => {
    navMenu.style.display = "block";
    socialLinks.style.display = "block"; // show the social links
    closeMenu.style.display = "block"; // show the close button
});

closeMenu.addEventListener('click', () => {
    navMenu.style.display = "none";
    socialLinks.style.display = "none"; // hide the social links
    closeMenu.style.display = "none"; // hide the close button
});
