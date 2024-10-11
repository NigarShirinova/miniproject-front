document.addEventListener("DOMContentLoaded", () => {
    const numbers = document.querySelectorAll('.number1');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                const number = entry.target;
                const target = parseInt(number.textContent);
                let count = 0;

                const increment = () => {
                    const incrementValue = 1;

                    if (count < target) {
                        count += incrementValue;
                        number.textContent = Math.ceil(count);
                        setTimeout(increment, 20);
                    } else {
                        number.textContent = target;
                    }
                };

       
                increment();
                observer.unobserve(number);
            }
        });
    }, {
        threshold: 0.5 
    });

    numbers.forEach(number => observer.observe(number));
});


document.addEventListener("DOMContentLoaded", () => {
    const numbers1 = document.querySelectorAll('.number');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                const number = entry.target;
                const target = parseInt(number.textContent);
                let count = 0;

                const increment = () => {
                    const incrementValue = target / 100;

                    if (count < target) {
                        count += incrementValue;
                        number.textContent = Math.ceil(count);
                        setTimeout(increment, 90);
                    } else {
                        number.textContent = target;
                    }
                };

       
                increment();
                observer.unobserve(number);
            }
        });
    }, {
        threshold: 0.5 
    });

    numbers1.forEach(number => observer.observe(number));
});
