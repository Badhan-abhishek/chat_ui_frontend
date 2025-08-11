import { animate, createSpring } from 'animejs';

export const ANIMATION_PRESETS = {
  fadeInUp: {
    translateY: [{ from: 30, to: 0 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 600,
    ease: 'out(3)'
  },

  fadeInDown: {
    translateY: [{ from: -30, to: 0 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 600,
    ease: 'out(3)'
  },

  fadeInLeft: {
    translateX: [{ from: -30, to: 0 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 500,
    ease: 'out(3)'
  },

  fadeInRight: {
    translateX: [{ from: 30, to: 0 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 500,
    ease: 'out(3)'
  },

  scaleIn: {
    scale: [{ from: 0.8, to: 1 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 500,
    ease: 'outBack(2)'
  },

  bounceIn: {
    scale: [
      { to: 1.05, ease: 'out(3)', duration: 400 },
      { to: 1, ease: createSpring({ stiffness: 300 }), duration: 400 }
    ],
    opacity: [{ from: 0, to: 1 }],
    duration: 800
  },

  buttonPress: {
    scale: [
      { to: 0.95, duration: 75 },
      { to: 1, duration: 75 }
    ],
    ease: 'out(2)'
  },

  buttonHover: {
    scale: [{ to: 1.02 }],
    duration: 200,
    ease: 'out(2)'
  },

  pulse: {
    scale: [
      { to: 1.05, duration: 750 },
      { to: 1, duration: 750 }
    ],
    loop: true,
    ease: 'inOut(2)'
  },

  messageSlideIn: {
    translateY: [{ from: 20, to: 0 }],
    opacity: [{ from: 0, to: 1 }],
    duration: 400,
    ease: 'out(3)'
  }
};

export const createAnimation = (
  targets: string | HTMLElement | NodeList | null,
  preset: keyof typeof ANIMATION_PRESETS,
  overrides: any = {}
) => {
  if (!targets) return;
  
  return animate(targets, {
    ...ANIMATION_PRESETS[preset],
    ...overrides
  });
};

export const createStaggerAnimation = (
  targets: string | HTMLElement[] | NodeList,
  preset: keyof typeof ANIMATION_PRESETS,
  staggerDelay = 100,
  overrides: any = {}
) => {
  return animate(targets, {
    ...ANIMATION_PRESETS[preset],
    delay: (el: any, i: number) => i * staggerDelay,
    ...overrides
  });
};

export const createSpringAnimation = (
  targets: string | HTMLElement | NodeList | null,
  properties: any,
  springConfig = { stiffness: 300, damping: 30 }
) => {
  if (!targets) return;
  
  return animate(targets, {
    ...properties,
    ease: createSpring(springConfig)
  });
};