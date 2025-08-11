import { animate, createSpring } from 'animejs';

export const slideInFromBottom = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        translateY: [{ from: 50, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 600,
        delay,
        ease: 'out(3)'
    });
};

export const slideInFromRight = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        translateX: [{ from: 30, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 500,
        delay,
        ease: 'out(3)'
    });
};

export const slideInFromLeft = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        translateX: [{ from: -30, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 500,
        delay,
        ease: 'out(3)'
    });
};

export const bounceIn = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        scale: [
            { from: 0.8, to: 1.05, duration: 400 },
            { to: 1, ease: createSpring({ stiffness: 300 }), duration: 400 }
        ],
        opacity: [{ from: 0, to: 1 }],
        delay,
        duration: 800
    });
};

export const fadeIn = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        opacity: [{ from: 0, to: 1 }],
        duration: 400,
        delay,
        ease: 'out(2)'
    });
};

export const scaleIn = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        scale: [{ from: 0.9, to: 1 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 500,
        delay,
        ease: 'outBack(2)'
    });
};

export const typewriterEffect = (element: string | HTMLElement, text: string) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return Promise.resolve();

    el.textContent = '';

    const progressObj = { progress: 0 };

    return animate(progressObj, {
        progress: [{ to: text.length }],
        duration: text.length * 50,
        ease: 'linear',
        update: () => {
            const progress = Math.floor(progressObj.progress);
            el.textContent = text.slice(0, progress);
        }
    });
};

export const pulseGlow = (element: string | HTMLElement) => {
    return animate(element, {
        scale: [
            { to: 1.02, duration: 1000 },
            { to: 1, duration: 1000 }
        ],
        loop: true,
        ease: 'inOut(2)'
    });
};

export const staggerIn = (elements: string | NodeList | HTMLElement[], delay = 100) => {
    return animate(elements, {
        translateY: [{ from: 20, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 600,
        delay: (el: any, i: number) => i * delay,
        ease: 'out(3)'
    });
};

export const morphButton = (element: string | HTMLElement) => {
    return animate(element, {
        scale: [
            { to: 0.95, duration: 100 },
            { to: 1, duration: 100 }
        ],
        ease: 'out(2)'
    });
};

export const slideUp = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        translateY: [{ from: 30, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 500,
        delay,
        ease: 'outExpo(3)'
    });
};

export const rotateIn = (element: string | HTMLElement, delay = 0) => {
    return animate(element, {
        rotate: [{ from: 180, to: 0 }],
        opacity: [{ from: 0, to: 1 }],
        duration: 800,
        delay,
        ease: 'outBack(2)'
    });
};