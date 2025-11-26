export default function initPreloader() {

  // Select preloader elements
  const viPreloaderText = document.querySelectorAll('.vi-preloader__slide'); // Text slides that appear one by one
  const viPreloaderElement = document.querySelector('.vi-preloader__logo'); // Logo element in preloader
  const viPreloader = document.querySelector('.vi-preloader'); // Main preloader wrapper
  const viPreloaderBar = document.querySelector('.vi-preloader__bar'); // Progress bar element

  // Flags to track completion of animations and page loading
  let viIsGsapFinished = false;
  let viIsProgressFinished = false;

  // Function to calculate letter spacing based on screen width
  const getLetterSpacing = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1025) {
      return "10px"; // Desktop
    } else if (screenWidth >= 768 && screenWidth <= 1024) {
      return "5px"; // Tablet
    } else {
      return "2px"; // Mobile
    }
  };

  // GSAP timeline for preloader text and logo animations
  const viPreloaderTL = gsap.timeline({
    onComplete: () => {
      viIsGsapFinished = true; // Mark GSAP animations as finished
      onPreloader2Completion(); // Check if preloader can exit
    }
  });

  // Animate each text slide
  viPreloaderText.forEach((viText) => {
    viPreloaderTL.to(viText, {
      onStart: () => {
        viText.style.display = "block"; // Show text when animation starts
      },
      letterSpacing: getLetterSpacing(), // Set responsive letter spacing
      duration: 1,
      ease: CustomEase.create("custom", "M0,0 C0,0 0,1.018 0.497,1.019 1,1.019 1,0 1,1"), // Smooth custom ease
      onComplete: () => {
        viText.style.display = 'none'; // Hide text after animation
      }
    });
  });

  // Animate logo scaling in
  viPreloaderTL.from(viPreloaderElement, {
    onStart: () => {
      viPreloaderElement.style.display = "block"; // Show logo
    },
    transform: 'scale(0)', // Start from scale 0
    duration: 0.5,
    ease: CustomEase.create("custom", "M0,0 C0.098,0.247 0.298,1.49 1,0.9") // Custom easing
  });

  // Animate progress bar using Pace.js
  Pace.on("progress", function(percent) {
    const viPreloaderText = document.querySelector(".vi-preloader__progress");
    viPreloaderText.textContent = `${Math.floor(percent)}%`; // Update percentage text
    viPreloaderBar.style.width = `${percent}%`; // Update bar width
  });

  // When page loading is complete
  Pace.on('done', function() {
    viIsProgressFinished = true; // Mark page load as finished
    onPreloader2Completion(); // Check if preloader can exit
  });

  // Function to remove preloader when both animations and page loading are finished
  function onPreloader2Completion() {
    if (viIsProgressFinished && viIsGsapFinished) {
      // Exit animation for preloader
      gsap.to('.vi-preloader', {
        clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)', // Shrink preloader to nothing
        duration: 1,
        ease: 'power4.out',
        delay: 1,
        onComplete: () => {
          viPreloader.style.display = 'none'; // Hide preloader after animation
        }
      });
    }
  }
}
