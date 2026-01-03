import type { Variants, Transition, Easing } from 'framer-motion';

// Premium easing curve (Stripe-style)
export const premiumEasing: Easing = [0.22, 1, 0.36, 1];

// Smooth spring for natural motion
export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEasing }
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: premiumEasing }
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerCards: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: premiumEasing }
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: premiumEasing }
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: premiumEasing }
  },
};

// Card hover effect - lift + scale
export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: premiumEasing }
  },
};

// Arrow micro-interaction for CTAs
export const arrowHover: Variants = {
  initial: { x: 0 },
  hover: {
    x: 5,
    transition: { duration: 0.2, ease: premiumEasing }
  },
};

// Glow pulse animation
export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0 rgba(99, 102, 241, 0)' },
  animate: {
    boxShadow: [
      '0 0 0 rgba(99, 102, 241, 0)',
      '0 0 30px rgba(99, 102, 241, 0.4)',
      '0 0 0 rgba(99, 102, 241, 0)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Floating animation for mockups
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Reveal from blur
export const blurIn: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: premiumEasing }
  },
};

// Scale up on tap/click
export const tapScale: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.98 },
};

// Subtle shimmer effect
export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },
};
