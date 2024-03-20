// Select the body or a larger container
var container = document.body; // or document.querySelector('.your-container');

// Select the burger menu and the elements you want to show/hide
var burgerMenu = document.querySelector('.burger-menu');
var navMenu = document.querySelector('.nav-menu');
var socialLinks = document.querySelector('.social-links');

// Create a new instance of Hammer on the container
var hammer = new Hammer(container);

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

// Left and right arrow buttons for scrolling through projects
const scrollContainer = document.querySelector('.scrollContainer'); // Modify based on your chosen element

if (scrollContainer) {
  const arrowLeft = document.getElementById('arrowLeftButton'); // Replace with your arrow element IDs
  const arrowRight = document.getElementById('arrowRightButton');

  arrowLeft.addEventListener('click', () => {
    scrollContainer.scrollLeft -= 200; // Adjust scroll distance
  });

  arrowRight.addEventListener('click', () => {
    scrollContainer.scrollLeft += 200; // Adjust scroll distance
  });
}

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");

copyrightElement.innerHTML = "© 2023 - " + updateYear + " Kanan N. All rights reserved.";
