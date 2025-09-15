document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const track = document.querySelector('.slider-track');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const images = document.querySelectorAll('.slider-track .blog-card');

    // State variables for the drag functionality
    let isDragging = false;
    let startX;
    let endX; // New variable to store the end position
    let scrollLeft;

    // State variable for button-based navigation
    let currentIndex = 0;

    const updateButtonState = () => {
        // Find how many images are visible
        // We use Math.floor to be more conservative about what's visible
        const imageWidth = images[0].offsetWidth + 20;
        const visibleImagesCount = Math.floor(sliderWrapper.offsetWidth / imageWidth);

        // Disable left button at the beginning of the list
        leftBtn.disabled = (currentIndex === 0);

        // Disable right button when the last image is visible
        rightBtn.disabled = (currentIndex >= images.length - visibleImagesCount);
    };

    // --- Button Navigation Functionality ---
    const updateSliderPosition = () => {
        const imageWidth = images[0].offsetWidth + 20; // image width + gap
        const offset = currentIndex * imageWidth;
        sliderWrapper.scrollLeft = offset;
        updateButtonState();
    };

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    rightBtn.addEventListener('click', () => {
        const imageWidth = images[0].offsetWidth + 20;
        const visibleImagesCount = Math.floor(sliderWrapper.offsetWidth / imageWidth);
        if (currentIndex < images.length - visibleImagesCount) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // --- Drag/Swipe Functionality ---

    sliderWrapper.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.pageX - sliderWrapper.offsetLeft;
        scrollLeft = sliderWrapper.scrollLeft;
        event.preventDefault(); // Prevent text selection
    });

    // We listen for mouseup on the entire window to handle cases where the user drags outside the slider
    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        
        // Let's refine the drag-and-snap logic here
        const dragDistance = endX - startX;
        const dragThreshold = 50; // A minimum distance to trigger a slide change
        
        if (Math.abs(dragDistance) > dragThreshold) {
            if (dragDistance < 0) { // Swiped left (to see the next slide)
                if (currentIndex < images.length - Math.floor(sliderWrapper.offsetWidth / (images[0].offsetWidth + 20))) {
                    currentIndex++;
                }
            } else { // Swiped right (to see the previous slide)
                if (currentIndex > 0) {
                    currentIndex--;
                }
            }
        }
        
        // Snap to the new position
        updateSliderPosition();
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    sliderWrapper.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        
        // Store the current position to be used in mouseup
        endX = event.pageX - sliderWrapper.offsetLeft;
        const walk = (endX - startX) * 1.5;
        
        // This makes the drag feel more natural and responsive
        sliderWrapper.scrollLeft = scrollLeft - walk;
    });

    // Handle window resize to keep the slider aligned and update button state
    window.addEventListener('resize', () => {
        updateSliderPosition();
        updateButtonState();
    });
    
    // Initial state setup, with a small delay for a clean start
    setTimeout(updateSliderPosition, 100);
});