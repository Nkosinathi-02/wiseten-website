// Home Page Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        
        currentSlide = n;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
        });
    });

    // Start the slider
    startSlider();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initHeroSlider);
// Splash Screen Fade Out
    window.addEventListener("load", () => {
      const splash = document.getElementById("splash-screen");
      setTimeout(() => {
        splash.classList.add("hidden");
      }, 1000);
    });