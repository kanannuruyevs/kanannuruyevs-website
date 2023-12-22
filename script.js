// Toggle the burger menu on and off
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links'); // select the social links

burgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    socialLinks.classList.toggle('show'); // toggle the social links
    burgerMenu.classList.toggle('open'); // toggle the open class on burger menu
});

// Left and right arrow buttons for scrolling through projects
const scrollContainer = document.querySelector('.scrollContainer');
const arrowLeft = document.getElementById('arrowLeftButton');
const arrowRight = document.getElementById('arrowRightButton');

arrowLeft.addEventListener('click', () => {
  scrollContainer.scrollLeft -= 200; // Change this value to adjust scroll distance
});

arrowRight.addEventListener('click', () => {
  scrollContainer.scrollLeft += 200; // Change this value to adjust scroll distance
});
