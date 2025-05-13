// Select the body or a larger container
const container = document.body; // or document.querySelector('.your-container');

// Header background appearing by scrolling
const header = document.querySelector('header');
const homeHeader = document.getElementById('homeHeader');

// Select the burger menu and the elements you want to show/hide
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const socialLinks = document.querySelector('.social-links');

// Create a new instance of Hammer on the container
const hammer = new Hammer(container);

// Function to open the menu
function openMenu() {
  navMenu.classList.add('showNavMenu');
  socialLinks.classList.add('showSocialLinks');
  burgerMenu.classList.add('open');
}

// Function to close the menu
function closeMenu() {
  navMenu.classList.remove('showNavMenu');
  socialLinks.classList.remove('showSocialLinks');
  burgerMenu.classList.remove('open');
}

// Event listener for click event

if (burgerMenu){
  burgerMenu.addEventListener('click', function() {
    if (burgerMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

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

// Function to handle the click event on the portfolio button
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    document.querySelectorAll('.expand-portfolio-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = btn.getAttribute('data-target');
            const portfolioSection = document.getElementById(targetId);
            if (portfolioSection.style.display === 'none' || portfolioSection.style.display === '') {
                portfolioSection.style.display = 'block';
                btn.textContent = 'Hide Portfolio';
            } else {
                portfolioSection.style.display = 'none';
                btn.textContent = 'View Portfolio';
            }
        });
    });

    // ...existing code...
});

// Make headline id element disappear when scrolling down

// document.onscroll = function () {
//     const scrollPosition = window.scrollY;

//     // Determine desired scroll threshold (e.g., 50px):
//     const threshold = 50;

//     if (scrollPosition > threshold) {
//         header.style.backgroundColor = '#212529';
//         homeHeader.style.backgroundColor = '#212529';
//     } else {
//         header.style.backgroundColor = 'black';
//         homeHeader.style.backgroundColor = 'transparent';
//     }
// };

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");

copyrightElement.innerHTML = "© 2023 - " + updateYear + " kanannuruyevs. All rights reserved.";

// Scroll to Top

const topBtn = document.getElementById("topBtn");

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";  /* Show button when scrolled down */
  } else {
    topBtn.style.display = "none";   /* Hide button when scrolled up */
  }
}

topBtn.addEventListener("click", function() {
  document.documentElement.scrollIntoView({
    behavior: 'smooth',  // Enables smooth scrolling animation
    block: 'start'       // Scrolls to the top of the page
  });
});

// Go Back Button for Blog Pages
const goBackButton = document.getElementById('goBackButton');

if (goBackButton) {
  goBackButton.addEventListener('click', ()=>{
    window.location.href = '../index.html'
  });
}

// Content Creation Container Slider
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      loop: true, // Enable looping
      slidesPerView: 1, // Ensure only one slide is visible at a time
      spaceBetween: 10, // Add space between slides if needed
  });
});
