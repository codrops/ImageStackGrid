import { gsap } from 'gsap';

export default class GalleryItem {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.img = this.DOM.el.querySelector('.gallery__item-img');
        this.DOM.imgInner = this.DOM.img.querySelector('.gallery__item-imginner');
        this.DOM.caption = {
            title: this.DOM.el.querySelector('.gallery__item-title'),
            number: this.DOM.el.querySelector('.gallery__item-number'),
            texts: this.DOM.el.querySelectorAll('.gallery__item-text')
        };
        this.DOM.captionChars = this.DOM.caption.title.querySelectorAll('.char');
        this.captionCharsTotal = this.DOM.captionChars.length;
        this.imgRect = this.DOM.img.getBoundingClientRect();
        // part of the stack
        this.inStack = true;
        this.initEvents();
    }
    initEvents() {
        // on hover, scale in/out the image and inner image elements and also the caption titles
        this.onMouseEnterFn = () => {
            if ( this.inStack ) return false;
            gsap
            .timeline({defaults: {duration: 1, ease: 'expo'}})
            .to(this.DOM.img, {scale: 0.95})
            .to(this.DOM.imgInner, {scale: 1.2}, 0)
            .to(this.DOM.captionChars, {
                x: pos => -10*(Math.floor(this.captionCharsTotal/2)-pos),
                stagger: {from: 'center'}
            }, 0);
        };
        this.onMouseLeaveFn = () => {
            if ( this.inStack ) return false;
            gsap
            .timeline({defaults: {duration: 1, ease: 'expo'}})
            .to([this.DOM.img, this.DOM.imgInner], {scale: 1})
            .to(this.DOM.captionChars, {x: 0}, 0);
        };
        this.DOM.img.addEventListener('mouseenter', this.onMouseEnterFn);
        this.DOM.img.addEventListener('mouseleave', this.onMouseLeaveFn);
    }
}