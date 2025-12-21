// Image Carousel Functionality - Works with multiple carousels
document.querySelectorAll('.carousel-container').forEach(container => {
    const carouselImages = container.querySelectorAll('.image-carousel img');
    const prevBtn = container.querySelector('.carousel-prev-button');
    const nextBtn = container.querySelector('.carousel-next-button');
    const indicators = container.querySelectorAll('.carousel-indicator');
    const currentCounter = container.querySelector('#carousel-current');
    const totalCounter = container.querySelector('#carousel-total');

    let currentIndex = 0;

    // Set total counter
    if (totalCounter) {
        totalCounter.textContent = carouselImages.length;
    }

    // Function to show image at specific index
    function showImage(index) {
        carouselImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        carouselImages[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }
    }

    // Function to go to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        showImage(currentIndex);
    }

    // Function to go to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        showImage(currentIndex);
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    // Event listeners for indicator dots
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.dataset.index);
            showImage(currentIndex);
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