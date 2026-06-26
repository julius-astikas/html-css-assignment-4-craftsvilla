// ============================================
// Navigation – active link, smooth scroll, and burger menu
// ============================================

const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-list a");
const internalLinks = document.querySelectorAll('a[href^="#"]');
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

// Click event listener for all internal links, including nav links and buttons
internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");

    // If the clicked link is a navigation link, mark it as active
    if (link.classList.contains("active") || link.closest(".nav-list")) {
      setActiveLink(link);
    }

    // If the hero button goes to booking, mark the Booking nav link as active
    if (targetId === "#booking") {
      const bookingLink = document.querySelector(
        '.nav-list a[href="#booking"]',
      );

      if (bookingLink) {
        setActiveLink(bookingLink);
      }
    }

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

// ============================================
// Hero Video Bounce (Yo-Yo) Effect
// ============================================

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  // Remove the native 'loop' attribute so we can control the replay manually
  heroVideo.removeAttribute("loop");

  // Track whether the video is playing backwards
  let isReversing = false;

  // Interval running at ~25 frames per second to handle the reverse playback smoothly
  setInterval(() => {
    if (isReversing) {
      // If reversing, decrement the video's current time by a small fraction (0.04s)
      if (heroVideo.currentTime > 0.1) {
        heroVideo.currentTime -= 0.04;
      } else {
        // Once the video reaches the beginning, switch back to forward playback
        isReversing = false;
        heroVideo.play().catch(() => {});
      }
    }
  }, 40);

  // Listen for the 'ended' event to know when the video reaches its natural end
  heroVideo.addEventListener("ended", () => {
    isReversing = true;
  });
}

// ============================================
// Gallery Slider
// ============================================

const gallerySlides = [
  {
    src: "images/gallery-akvarell-1.png",
    alt: "Akvarellmaleri av blomster laget av en gjest",
    caption: "Blomster i akvarell",
  },
  {
    src: "images/gallery-akvarell-2.png",
    alt: "Akvarelllandskap malt av en gjest",
    caption: "Landskap i akvarell",
  },
  {
    src: "images/gallery-larret-1.png",
    alt: "Abstrakt lerretsmaling laget av en gjest",
    caption: "Abstrakt lerretsmaling",
  },
  {
    src: "images/gallery-larret-2.png",
    alt: "Fargerik lerretsmaling laget av en gjest",
    caption: "Fargerik lerretsmaling",
  },
  {
    src: "images/gallery-mosaic-1.png",
    alt: "Mosaikkbilde av solnedgang laget av en gjest",
    caption: "Solnedgang i mosaikk",
  },
  {
    src: "images/gallery-mosaic-2.png",
    alt: "Geometrisk mosaikkbilde laget av en gjest",
    caption: "Geometrisk mosaikk",
  },
];

const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryCounter = document.querySelector("#gallery-counter");
const galleryPrevBtn = document.querySelector("#gallery-prev");
const galleryNextBtn = document.querySelector("#gallery-next");

if (galleryImage && gallerySlides.length) {
  let currentIndex = 0;

  function showSlide(index) {
    const slide = gallerySlides[index];
    galleryImage.src = slide.src;
    galleryImage.alt = slide.alt;
    galleryCaption.textContent = slide.caption;
    galleryCounter.textContent = `${index + 1} / ${gallerySlides.length}`;
  }

  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
      showSlide(currentIndex);
    });
  }

  if (galleryNextBtn) {
    galleryNextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % gallerySlides.length;
      showSlide(currentIndex);
    });
  }

  showSlide(currentIndex);
}
