import { gsap } from 'gsap';

export default class GalleryItem {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.img = this.DOM.el.querySelector('.gallery__item-img');
        this.DOM.imgInner = this.DOM.img.querySelector('.gallery__item-imginner');
        this.DOM.caption = {
            title: this.DOM.el.querySelector('.gallery__item-caption > .gallery__item-title'),
        };
        this.DOM.captionChars = this.DOM.caption.title.querySelectorAll('.char');
        this.captionCharsTotal = this.DOM.captionChars.length;
        this.imgRect = this.DOM.img.getBoundingClientRect();
        this.captionRect = this.DOM.caption.title.getBoundingClientRect();
        // part of the stack
        this.inStack = true;
        this.initEvents();
    }
    initEvents() {
        this.onMouseEnterFn = () => {
            gsap.killTweensOf(this.DOM.captionChars);
            if ( this.inStack ) return false;
            gsap
            .timeline({defaults: {duration: 1, ease: 'expo'}})
            .to(this.DOM.img, {scale: 0.95})
            .to(this.DOM.imgInner, {scale: 1.2}, 0)
            .to(this.DOM.captionChars, {
                x: pos => this.imgRect.width-this.captionRect.width*1.1,
                stagger: -0.02
            }, 0);
        };
        this.onMouseLeaveFn = () => {
            gsap.killTweensOf(this.DOM.captionChars);
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