// JavaScript to toggle the burger menu on and off
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links'); // select the social links

burgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    socialLinks.classList.toggle('show'); // toggle the social links
    burgerMenu.classList.toggle('open'); // toggle the open class on burger menu
});
