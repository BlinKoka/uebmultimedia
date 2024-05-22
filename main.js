let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active')
}


function typeEffect(element, speed) {
    const text = element.innerHTML;
    element.innerHTML = '';

    let i = 0;
    const interval = setInterval(function() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                const endIndex = text.indexOf('>', i) + 1;
                
                element.innerHTML += text.substring(i, endIndex);
                i = endIndex;
            } else {
                element.append(text.charAt(i));
                i++;
            }
        } else {
            clearInterval(interval);
        }
    }, speed);
}

document.addEventListener("DOMContentLoaded", function() {
    
    AOS.init();

    const textElement = document.querySelector('.home-text h1');

    typeEffect(textElement, 100); 

    
});
document.addEventListener("DOMContentLoaded", function() {

    const aboutSlider = document.querySelector('.about-slider');
    if (aboutSlider) {
        $('.about-slider').slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000
        });
    }
});
