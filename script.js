// ============================================
// Navigation – active link, smooth scroll, and burger menu
// ============================================

const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-list a");
const navToggle = document.getElementById("nav-toggle");

// Removes .active class from all links and applies it to the clicked link
function setActiveLink(clickedLink) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  clickedLink.classList.add("active");
}

// Custom smooth scroll function to control the duration and account for the sticky header
function scrollToSection(targetId) {
  const section = document.querySelector(targetId);

  if (!section) {
    return;
  }

  const headerHeight = header.offsetHeight;
  const targetPosition =
    section.getBoundingClientRect().top + window.scrollY - headerHeight;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  // Duration in milliseconds (1000ms = 1 second).
  // Increase this number to make it even slower, or decrease to speed it up.
  const duration = 2500;
  let startTimestamp = null;

  // Animation step function running on each frame
  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const elapsed = timestamp - startTimestamp;

    // Calculate progress ratio (capped at 1)
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (easeInOutCubic) for a smooth acceleration and deceleration
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // Scroll to the calculated position
    window.scrollTo(0, startPosition + distance * ease);

    // Continue the animation if the duration has not been reached
    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  }

  // Trigger the first animation frame
  window.requestAnimationFrame(step);
}

// Click event listener for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");

    setActiveLink(link);
    scrollToSection(targetId);

    // Close the mobile burger menu after clicking a link
    if (navToggle) {
      navToggle.checked = false;
    }
  });
});

// Highlight the correct navigation link based on URL hash when the page loads
const hash = window.location.hash;

if (hash) {
  const matchingLink = document.querySelector(`.nav-list a[href="${hash}"]`);

  if (matchingLink) {
    setActiveLink(matchingLink);
  }
} else {
  const homeLink = document.querySelector('.nav-list a[href="#hjem"]');

  if (homeLink) {
    setActiveLink(homeLink);
  }
}
