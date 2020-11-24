import { gsap } from 'gsap';
import { calcWinsize, getRandomInteger } from '../utils';
import GalleryItem from './galleryItem';
import LocomotiveScroll from 'locomotive-scroll';
import Splitting from "splitting";

Splitting();

// Initialize the Locomotive scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

export default class GalleryController {
    constructor(galleryEl) {
        this.DOM = {
            galleryEl: galleryEl,
            title: document.querySelector('.content__title'),
            text: document.querySelector('.content__text'),
        };
        this.DOM.galleryItemElems = [...this.DOM.galleryEl.querySelectorAll('.gallery__item')];
        this.galleryItems = [];
        this.DOM.galleryItemElems.forEach(el => this.galleryItems.push(new GalleryItem(el)));
        this.itemsTotal = this.galleryItems.length;

        this.intro();
    }
    intro() {
        for (const [pos, item] of this.galleryItems.entries()) {
            gsap.set(item.DOM.el, {zIndex: this.itemsTotal-1-pos});
        }

        gsap.to(this.DOM.galleryEl, {
            duration: 1.2,
            ease: 'expo',
            startAt: {y: '4%'},
            y: '0%'
        });

        // access the first and other images in the stack
        const [firstImage,secondImage,thirdImage, ...otherImages] = this.galleryItems.map(el => el.DOM.img);
        this.galleryItems.reverse();
        
        const timeline = gsap.timeline();

        // first let's center the images
        for (const [pos, item] of this.galleryItems.entries()) {
            timeline.set(item.DOM.img, {
                x: winsize.width/2 - item.imgRect.left - item.imgRect.width/2,
                y:  winsize.height/2 - item.imgRect.top - item.imgRect.height/2,
                scale: 0.6,
                rotation: getRandomInteger(-10,10),
                opacity: 1,
                delay: 0.1*pos
            }, 0);

            if ( pos >= this.itemsTotal-3 ) {
                timeline.set(item.DOM.imgInner, {
                    scale: 1.8
                }, 0);
            }
            else {
                timeline.set(item.DOM.img, {
                    opacity: 0,
                    delay: 0.1*pos
                }, 0.3);
            }
        }

        timeline
        .addLabel('startAnimation', '+=0.1')
        .add(() => {
            document.body.classList.remove('noscroll');
            scroll.update();
        }, 'startAnimation')

        .to([firstImage,secondImage,thirdImage], {
            duration: 1.2,
            ease: 'expo',
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1
        }, 'startAnimation')
        .to(this.galleryItems.filter((_,pos) => pos >= this.itemsTotal-3).map(item => item.DOM.imgInner), {
            duration: 1.2,
            ease: 'expo',
            scale: 1
        }, 'startAnimation')

        .to(otherImages, {
            duration: 1.2,
            ease: 'expo',
            startAt: {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 0.8
            },
            scale: 1,
            opacity: 1
        }, 'startAnimation');
        
        for (const item of this.galleryItems) {
            timeline
            .add( () => item.inStack = false, 'startAnimation+=1.2' )
            .to(item.DOM.captionChars, {
                duration: 1,
                ease: 'expo',
                startAt: {
                    opacity: 0,
                    y: '40%'
                },
                y: '0%',
                opacity: 1,
                stagger: 0.03
            }, 'startAnimation+=0.5')
        }

        timeline.to([this.DOM.title, this.DOM.text], {
            duration: 1.2,
            ease: 'expo',
            startAt: {
                y: '50%'
            },
            y: '0%',
            opacity: 1,
            stagger: 0.04
        }, 'startAnimation+=0.2');
    }
}