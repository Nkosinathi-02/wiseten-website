// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    let currentIndex = 1; // Start with center card
    let autoSlideInterval;

    function updateCarousel() {
        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current card and dot
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Calculate transform position to center the active card
        const cardWidth = cards[0].offsetWidth + 32; // card width + gap
        const transformValue = -currentIndex * cardWidth;
        track.style.transform = `translateX(${transformValue}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    // Pause on hover
    const testimonialsSection = document.querySelector('.testimonials');
    testimonialsSection.addEventListener('mouseenter', stopAutoSlide);
    testimonialsSection.addEventListener('mouseleave', startAutoSlide);

    // Initialize carousel
    updateCarousel();
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', updateCarousel);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);