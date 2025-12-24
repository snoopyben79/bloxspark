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
    
    // Swipe detection variables
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let currentX = 0;

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

    // Touch/Mouse event handlers
    function handleStart(e) {
        if (isAnimating) return;
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        carousel.style.cursor = 'grabbing';
    }

    function handleMove(e) {
        if (!isDragging) return;
        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        // Calculate the difference to detect vertical vs horizontal scroll
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // If horizontal movement is greater than vertical, prevent default (stop page scroll)
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }

    function handleEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        
        const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // Minimum swipe distance

        // Swipe left (next image)
        if (diff > threshold) {
            nextImage();
        }
        // Swipe right (previous image)
        else if (diff < -threshold) {
            prevImage();
        }
    }

    // Add touch event listeners
    carousel.addEventListener('touchstart', handleStart, { passive: true });
    carousel.addEventListener('touchmove', handleMove, { passive: false });
    carousel.addEventListener('touchend', handleEnd, { passive: true });

    // Add mouse event listeners
    carousel.addEventListener('mousedown', handleStart);
    carousel.addEventListener('mousemove', handleMove);
    carousel.addEventListener('mouseup', handleEnd);
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
        }
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';

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