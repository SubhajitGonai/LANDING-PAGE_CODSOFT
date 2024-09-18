let currentIndex = 0;
let direction = 1; // 1 for forward, -1 for reverse
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;
let isTransitioning = false;

// Show the slide based on the current index
function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const transformValue = -index * 100;
    document.querySelector('.slider').style.transform = `translateX(${transformValue}%)`;

    document.querySelector('.prev').style.display = index === 0 ? 'none' : 'block';
    document.querySelector('.next').style.display = index === totalSlides - 1 ? 'none' : 'block';

    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

// Move to the next slide
function nextSlide() {
    if (isTransitioning) return;

    if (direction === -1 && currentIndex === 0) {
        direction = 1;
    }

    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        direction = -1;
        currentIndex--;
    }

    showSlide(currentIndex);
}

// Move to the previous slide
function prevSlide() {
    if (isTransitioning) return;

    if (direction === 1 && currentIndex === totalSlides - 1) {
        direction = -1;
    }

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        direction = 1;
        currentIndex++;
    }

    showSlide(currentIndex);
}

// Automatically cycle through slides every 4 seconds
setInterval(() => {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}, 4000);

// Add event listeners for buttons
document.querySelector('.next').addEventListener('click', () => {
    if (!isTransitioning) {
        direction = 1; // Ensure direction is forward when the next button is clicked
        nextSlide();
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    if (!isTransitioning) {
        direction = -1; // Ensure direction is reverse when the prev button is clicked
        prevSlide();
    }
});

// Initialize the slider by showing the first slide
showSlide(currentIndex);
