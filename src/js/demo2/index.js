import { preloadImages, preloadFonts } from '../utils';
import Cursor from '../cursor';
import GalleryController from './galleryController';

// Preload images and fonts
Promise.all([preloadImages('.gallery__item-imginner'), preloadFonts('lty4rfv')]).then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Initialize the GalleryController
    new GalleryController(document.querySelector('.gallery'));

    // Mouse effects on all links and others
    [...document.querySelectorAll('a, .gallery__item-img')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});