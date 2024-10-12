document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentIndex = 0;


    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
            }
        });
        const slider = document.querySelector('.slider');
        const offset = -index * (slides[0].offsetWidth ) + (slider.offsetWidth - slides[0].offsetWidth) / 2;
        slider.style.transform = `translateX(${offset}px)`;
    }

  
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the start
        showSlide(currentIndex);
        
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to the end
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
});
