document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentIndex = 0;

    // Function to set the active slide and position the slider
    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
            }
        });
        // Update the slider position to center the active slide
        const slider = document.querySelector('.slider');
        const offset = -index * (slides[0].offsetWidth + 20) + (slider.offsetWidth - slides[0].offsetWidth) / 2;
        slider.style.transform = `translateX(${offset}px)`;
    }

    // Event listener for the Next button
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the start
        showSlide(currentIndex);
        
    });

    // Event listener for the Previous button
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to the end
        showSlide(currentIndex);
    });

    // Show the initial slide
    showSlide(currentIndex);
});
