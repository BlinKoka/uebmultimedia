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


document.addEventListener('DOMContentLoaded', function() {
    let app = new PIXI.Application({ 
        width: 800,         // Set the width of the canvas
        height: 400,        // Set the height of the canvas
        backgroundColor: 0x2088bb // Set the background color
    });
    document.getElementById('pixi-slider').appendChild(app.view);

    // Load images
    const images = [
        'img/s1.jpg',
        'img/s2.jpg',
        'img/s3.jpg',
        'img/s4.jpg'
    ];

    // Create a loader
    const loader = new PIXI.Loader();

    // Add images to the loader
    images.forEach((image, index) => loader.add(`img${index}`, image));

    // Load the images
    loader.load((loader, resources) => {
        const textures = images.map((image, index) => resources[`img${index}`].texture);
        const container = new PIXI.Container();
        app.stage.addChild(container);

        let currentIndex = 0;
        const sprite = new PIXI.Sprite(textures[currentIndex]);
        container.addChild(sprite);

        function updateSprite() {
            sprite.texture = textures[currentIndex];
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % textures.length;
            updateSprite();
        }

        function previousSlide() {
            currentIndex = (currentIndex - 1 + textures.length) % textures.length;
            updateSprite();
        }

        // Add next and previous buttons
        const nextButton = new PIXI.Text('Next', { fontSize: 36, fill: 0xffffff, align: 'center' });
        nextButton.interactive = true;
        nextButton.buttonMode = true;
        nextButton.position.set(app.screen.width - 100, app.screen.height - 50);
        nextButton.on('pointerdown', nextSlide);

        const prevButton = new PIXI.Text('Previous', { fontSize: 36, fill: 0xffffff, align: 'center' });
        prevButton.interactive = true;
        prevButton.buttonMode = true;
        prevButton.position.set(20, app.screen.height - 50);
        prevButton.on('pointerdown', previousSlide);

        app.stage.addChild(nextButton);
        app.stage.addChild(prevButton);
    });
});
