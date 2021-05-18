/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

// Define Global Variables
const sections = document.querySelectorAll('section');
const navPosition = document.querySelector('#navbar__list');
// End Global Variables

// Begin Main Functions

// Navigation
// loops through the sections nodelist and adds the list items to the navPosition
// Uses the attributes of each section to build the list item
function createNav() {
  for(const section of sections) {
    const navLink = `<a href="#${section.id}" class="menu__link ${section.className}" data-link="${section.dataset.nav}"><li>${section.dataset.nav}</li></a>`;
    navPosition.insertAdjacentHTML('beforeend', navLink);
  }
}

// Checks if an element is in the viewport using getBoundingClientRect
function isInViewport(element) {
  const bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Set sections and nav with active class
// Loops through section items and checks in view using isInViewport function
function setActiveSection() {
  for (let i=0; i < sections.length; i++) {
    // Selects all the nav items and stores in NodeList
    const navItems = document.querySelectorAll('.menu__link');
      if (isInViewport(sections[i])) {
        sections[i].classList.add('active');
          // Removes all active classes from each navItem
          navItems.forEach(navItem => navItem.classList.remove('active'));
          // Adds active class to the navItem that matches the section that is in view
          navItems[i].classList.add('active');
      }
      else {
        // Removes active classes if the section is not in view
        sections[i].classList.remove('active');
      }
  }
}

// End Main Functions

// Build the nav
createNav();

// Begin Events
// Starts listening for scroll to change the active state with setActiveSection and isInViewport functions
document.addEventListener('scroll', function() {
  setActiveSection();
});
