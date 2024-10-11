window.addEventListener('scroll', function () {
    var headerBottom = document.querySelector('.main-header');
    if (window.scrollY > 400) {
        headerBottom.classList.add('fixed');
    } else {
        headerBottom.classList.remove('fixed');
    }
});

