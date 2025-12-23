// Image Carousel Functionality - Works with multiple carousels
document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.image-carousel');
    const carouselImages = container.querySelectorAll('.image-carousel img');
    const prevBtn = container.querySelector('.carousel-prev-button');
    const nextBtn = container.querySelector('.carousel-next-button');
    const indicators = container.querySelectorAll('.carousel-indicator');
    const currentCounter = container.querySelector('#carousel-current');
    const totalCounter = container.querySelector('#carousel-total');

    let currentIndex = 0;
    let isAnimating = false;

    // Set total counter
    if (totalCounter) {
        totalCounter.textContent = carouselImages.length;
    }

    // Initialize - show first image
    carouselImages[0].classList.add('active');
    if (indicators[0]) {
        indicators[0].classList.add('active');
    }

    // Function to show image at specific index with slide animation
    function showImage(newIndex, direction) {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const currentImg = carouselImages[currentIndex];
        const nextImg = carouselImages[newIndex];

        // Remove any existing animation classes
        carouselImages.forEach(img => {
            img.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right');
        });

        // Add the next image as active and set up animations
        nextImg.classList.add('active');
        
        if (direction === 'next') {
            currentImg.classList.add('slide-out-left');
            nextImg.classList.add('slide-in-right');
        } else {
            currentImg.classList.add('slide-out-right');
            nextImg.classList.add('slide-in-left');
        }

        // Clean up after animation completes
        setTimeout(() => {
            currentImg.classList.remove('active', 'slide-out-left', 'slide-out-right');
            nextImg.classList.remove('slide-in-left', 'slide-in-right');
            isAnimating = false;
        }, 500);

        // Update current index
        currentIndex = newIndex;

        // Update indicators
        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[newIndex]) {
            indicators[newIndex].classList.add('active');
        }
        if (currentCounter) {
            currentCounter.textContent = newIndex + 1;
        }
    }

    // Function to go to next image
    function nextImage() {
        const newIndex = (currentIndex + 1) % carouselImages.length;
        showImage(newIndex, 'next');
    }

    // Function to go to previous image
    function prevImage() {
        const newIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        showImage(newIndex, 'prev');
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    // Event listeners for indicator dots
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const newIndex = parseInt(indicator.dataset.index);
            const direction = newIndex > currentIndex ? 'next' : 'prev';
            showImage(newIndex, direction);
        });
    });

    // Keyboard navigation (only for the first carousel to avoid conflicts)
    if (container === document.querySelector('.carousel-container')) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });
    }
});