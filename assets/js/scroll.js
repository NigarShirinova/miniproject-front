window.addEventListener('scroll', function () {
    var headerBottom = document.querySelector('.main-header');
    
    if (window.innerWidth > 1000) { // Use innerWidth instead of document.width
        if (window.scrollY > 600) {
            headerBottom.style.position = 'fixed';
            headerBottom.style.top = '0';
            headerBottom.style.width = '80%'; // Set width to 80%
        } else {
            headerBottom.style.position = '';
            headerBottom.style.top = '';
            headerBottom.style.width = '';
        }
    } else {
        // Reset styles if the screen is smaller than 1000px
        headerBottom.style.position = '';
        headerBottom.style.top = '';
        headerBottom.style.width = '';
    }
});
