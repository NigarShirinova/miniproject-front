document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const mainHeader = document.querySelector('.main-header');
    document.getElementById("pages").style.display= none;
    hamburger.addEventListener('click', function() {
     
        document.getElementById("pages").style.display= block;

    });
  });
  