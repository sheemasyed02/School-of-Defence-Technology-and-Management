/* ═══════════════════════════════════════════════════════
   Reusable GSAP Animation Presets
   Pure functions — no React dependency.
   ═══════════════════════════════════════════════════════ */

import { gsap, ScrollTrigger } from "./gsap-setup";

/* ─── Types ─── */
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
}

const DEFAULTS: Required<AnimationConfig> = {
  duration: 0.8,
  delay: 0,
  ease: "power3.out",
  stagger: 0.12,
};

/* ─── Fade-in-up (most common entrance) ─── */
export function fadeInUp(
  elements: gsap.TweenTarget,
  config: ScrollAnimationConfig = {}
) {
  const { duration, delay, ease, stagger, start, toggleActions } = {
    ...DEFAULTS,
    start: "top 85%",
    toggleActions: "play none none none",
    ...config,
  };

  return gsap.fromTo(
    elements,
    { y: 48, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        toggleActions,
      },
    }
  );
}

/* ─── Fade-in (no translate) ─── */
export function fadeIn(
  elements: gsap.TweenTarget,
  config: ScrollAnimationConfig = {}
) {
  const { duration, delay, ease, start, toggleActions } = {
    ...DEFAULTS,
    start: "top 85%",
    toggleActions: "play none none none",
    ...config,
  };

  return gsap.fromTo(
    elements,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        toggleActions,
      },
    }
  );
}

/* ─── Slide-in from direction ─── */
export function slideIn(
  elements: gsap.TweenTarget,
  direction: "left" | "right" | "up" | "down" = "left",
  config: ScrollAnimationConfig = {}
) {
  const offsets: Record<string, gsap.TweenVars> = {
    left:  { x: -80, opacity: 0 },
    right: { x: 80, opacity: 0 },
    up:    { y: -80, opacity: 0 },
    down:  { y: 80, opacity: 0 },
  };

  const { duration, delay, ease, start, toggleActions } = {
    ...DEFAULTS,
    start: "top 85%",
    toggleActions: "play none none none",
    ...config,
  };

  return gsap.fromTo(elements, offsets[direction], {
    x: 0,
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: elements as gsap.DOMTarget,
      start,
      toggleActions,
    },
  });
}

/* ─── Scale-in ─── */
export function scaleIn(
  elements: gsap.TweenTarget,
  config: ScrollAnimationConfig = {}
) {
  const { duration, delay, ease, start, toggleActions } = {
    ...DEFAULTS,
    start: "top 85%",
    toggleActions: "play none none none",
    ...config,
  };

  return gsap.fromTo(
    elements,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start,
        toggleActions,
      },
    }
  );
}

/* ─── Stagger children ─── */
export function staggerChildren(
  parent: gsap.DOMTarget,
  childSelector: string,
  config: ScrollAnimationConfig = {}
) {
  const { duration, delay, ease, stagger, start, toggleActions } = {
    ...DEFAULTS,
    start: "top 80%",
    toggleActions: "play none none none",
    ...config,
  };

  return gsap.fromTo(
    `${parent} ${childSelector}`,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: parent,
        start,
        toggleActions,
      },
    }
  );
}

/* ─── Parallax on scroll ─── */
export function parallax(
  element: gsap.DOMTarget,
  speed: number = 0.3,
  config: Partial<ScrollAnimationConfig> = {}
) {
  const { start, end } = {
    start: "top bottom",
    end: "bottom top",
    ...config,
  };

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/* ─── Counter animation ─── */
export function countUp(
  element: HTMLElement,
  endValue: number,
  config: AnimationConfig = {}
) {
  const { duration, delay, ease } = { ...DEFAULTS, duration: 2, ...config };
  const obj = { val: 0 };

  return gsap.to(obj, {
    val: endValue,
    duration,
    delay,
    ease,
    onUpdate() {
      element.textContent = Math.floor(obj.val).toLocaleString();
    },
  });
}

/* ─── Kill all ScrollTriggers (for cleanup) ─── */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
