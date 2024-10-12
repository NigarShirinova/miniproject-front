window.addEventListener('scroll', function () {
    var headerBottom = document.querySelector('.main-header');
    if (window.scrollY > 600) {
        headerBottom.style.position = 'fixed';  
        headerBottom.style.top = '0'; 
        headerBottom.style.width = '80%';  
    } else {
        headerBottom.style.position = ''; 
        headerBottom.style.top = '';
        headerBottom.style.width = '';
    }
});
