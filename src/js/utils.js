// Map number x from range [a, b] to [c, d]
const imagesLoaded = require('imagesloaded');

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

const calcWinsize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Preload images
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

// Preload fonts
const preloadFonts = (id) => {
    return new Promise((resolve) => {
        WebFont.load({
            typekit: {
                id: id
            },
            active: resolve
        });
    });
};

export {
    lerp,
    getMousePos,
    calcWinsize,
    getRandomInteger,
    preloadImages,
    preloadFonts
};