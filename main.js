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
    const pixiSlider = document.getElementById('pixi-slider');
    if (pixiSlider) {
        let app = new PIXI.Application({ 
            width: 800,         
            height: 800,        
            backgroundColor: 0xffffff 
        });
        pixiSlider.appendChild(app.view);

        // Background image
        const backgroundTexture = PIXI.Texture.from('img/ps1.jpg'); 
        const background = new PIXI.Sprite(backgroundTexture);
        app.stage.addChild(background);

        function resizeBackground(background) {
            const canvasAspectRatio = app.screen.width / app.screen.height;
            const imageAspectRatio = background.texture.width / background.texture.height;

            if (canvasAspectRatio > imageAspectRatio) {
                background.width = app.screen.width;
                background.height = app.screen.width / imageAspectRatio;
            } else {
                background.height = app.screen.height;
                background.width = app.screen.height * imageAspectRatio;
            }

            background.x = (app.screen.width - background.width) / 2;
            background.y = (app.screen.height - background.height) / 2;
        }

        resizeBackground(background);

        // Retrieve images from the HTML
        const imageElements = document.querySelectorAll('#pixi-images img');
        const textures = Array.from(imageElements).map(img => PIXI.Texture.from(img.src));

        const container = new PIXI.Container();
        app.stage.addChild(container);

        let currentIndex = 0;
        const sprite = new PIXI.Sprite(textures[currentIndex]);
        container.addChild(sprite);

        // Set maximum dimensions for the images
        const maxImageWidth = 800;
        const maxImageHeight = 600;

        function resizeImage(imageSprite) {
            const texture = imageSprite.texture;
            const originalWidth = texture.width;
            const originalHeight = texture.height;
            
            // Calculate scaling factors
            const scale = Math.min(maxImageWidth / originalWidth, maxImageHeight / originalHeight);
            
            // Apply scaling
            imageSprite.width = originalWidth * scale;
            imageSprite.height = originalHeight * scale;
            
            // Center the image
            imageSprite.x = (app.screen.width - imageSprite.width) / 2;
            imageSprite.y = (app.screen.height - imageSprite.height) / 2;
        }

        function updateSprite() {
            sprite.texture = textures[currentIndex];
            resizeImage(sprite);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % textures.length;
            updateSprite();
        }

        function previousSlide() {
            currentIndex = (currentIndex - 1 + textures.length) % textures.length;
            updateSprite();
        }

        // Initial resize of the first image
        resizeImage(sprite);

        // Create a button function
        function createButton(text, x, y, callback) {
            const button = new PIXI.Container();

            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x007bff);
            graphics.drawRoundedRect(0, 0, 100, 50, 10);
            graphics.endFill();

            const buttonText = new PIXI.Text(text, { fontSize: 20, fill: 0xffffff });
            buttonText.anchor.set(0.5);
            buttonText.x = 50;
            buttonText.y = 25;

            button.addChild(graphics);
            button.addChild(buttonText);

            button.interactive = true;
            button.buttonMode = true;
            button.on('pointerdown', callback);

            button.x = x;
            button.y = y;

            button.on('pointerover', () => {
                graphics.tint = 0x0056b3;
            });
            button.on('pointerout', () => {
                graphics.tint = 0x007bff;
            });

            return button;
        }

        // Add next and previous buttons
        const nextButton = createButton('Next', app.screen.width - 120, app.screen.height - 70, nextSlide);
        const prevButton = createButton('Previous', 20, app.screen.height - 70, previousSlide);

        app.stage.addChild(nextButton);
        app.stage.addChild(prevButton);

        // Resize the background when the window is resized
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            resizeBackground(background);
            resizeImage(sprite);
        });
    } else {
        console.error('Element #pixi-slider not found');
    }
});



