// Select the body or a larger container
const container = document.body; // or document.querySelector('.your-container');

// Select the burger menu and the elements you want to show/hide
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links');

// Create a new instance of Hammer on the container
const hammer = new Hammer(container);

// Function to open the menu
function openMenu() {
  navMenu.classList.add('show');
  socialLinks.classList.add('show');
  burgerMenu.classList.add('open');
}

// Function to close the menu
function closeMenu() {
  navMenu.classList.remove('show');
  socialLinks.classList.remove('show');
  burgerMenu.classList.remove('open');
}

// Event listener for click event
burgerMenu.addEventListener('click', function() {
  if (burgerMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Event listener for swipe events
hammer.on('swiperight', openMenu);
hammer.on('swipeleft', closeMenu);

// Event listener for click event on the document body
document.addEventListener('click', function(event) {
  // Check if the click was outside the burger menu and the menu is open
  if (!burgerMenu.contains(event.target) && burgerMenu.classList.contains('open')) {
    closeMenu();
  }
});

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");

copyrightElement.innerHTML = "© 2023 - " + updateYear + " kanansnote. All rights reserved.";

const projectsSwiper = new Swiper('.projects-container', {
  slidesPerView: '3', // Adjust this value to control how many slides are visible at a time
  navigation: {
    prevEl: '.arrowLeftButton',
    nextEl: '.arrowRightButton',
  },
});

