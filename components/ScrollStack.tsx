"use client";

import {
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";

/**
 * ScrollStack (React Bits) — cards that stack and scale as the user scrolls.
 * TypeScript port; component logic is verbatim from the reference source.
 * CSS lives in app/globals.css to match the project's single-stylesheet convention.
 */

export type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  style?: CSSProperties;
};

type Transform = { translateY: number; scale: number; rotation: number; blur: number };

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  style,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const rafScheduledRef = useRef(false);
  const inViewRef = useRef(true);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, Transform>>(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === "number" ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    }
    const scroller = scrollerRef.current!;
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
      scrollContainer: scroller,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        // getBoundingClientRect returns the *transformed* position, which the
        // stack itself is mutating every frame — reading it feeds the transform
        // back into the pin math and drifts the anchor. Walk the offsetParent
        // chain instead so we always get the untransformed document position.
        let top = 0;
        let el: HTMLElement | null = element;
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        return top;
      }
      return element.offsetTop;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector<HTMLElement>(".scroll-stack-end")
      : scrollerRef.current?.querySelector<HTMLElement>(".scroll-stack-end");

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // Compute the topmost card in the stack (the one currently at
    // `stackPosition` or above). Used for both the blur logic and
    // toggling the `.is-active` class so consumers can react to
    // "which card is in focus" (e.g. play/pause a video on that card).
    let topCardIndex = 0;
    for (let j = 0; j < cardsRef.current.length; j++) {
      const jCardTop = getElementOffset(cardsRef.current[j]);
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (scrollTop >= jTriggerStart) {
        topCardIndex = j;
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Toggle `.is-active` on the current front card
      const shouldBeActive = i === topCardIndex && scrollTop >= triggerStart;
      const isActive = card.classList.contains("is-active");
      if (shouldBeActive && !isActive) card.classList.add("is-active");
      else if (!shouldBeActive && isActive) card.classList.remove("is-active");

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: Transform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  // rAF-throttle scroll updates and skip entirely when the stack is off-screen.
  // Replaces Lenis + its permanent RAF loop — native scroll is faster on
  // machines without hardware compositing, which is what the site sees most.
  const scheduleUpdate = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      if (inViewRef.current) updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll<HTMLElement>(".scroll-stack-card")
        : scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      // Note: no permanent will-change/perspective — those forced a compositor
      // layer per card for the whole page lifetime. We rely on `transform`
      // itself to hint the browser during actual scrolls.
      card.style.transformOrigin = "top center";
    });

    // Native scroll listener (rAF-throttled) + visibility gate.
    const scrollTarget: EventTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const visibilityTarget = useWindowScroll
      ? (document.querySelector(".scroll-stack-inner") as HTMLElement | null) ?? scroller
      : scroller;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const nowInView = entries[0]?.isIntersecting ?? false;
        inViewRef.current = nowInView;
        if (nowInView) scheduleUpdate();
      },
      { rootMargin: "400px 0px" }
    );
    visibilityObserver.observe(visibilityTarget);

    // Initial paint
    scheduleUpdate();

    return () => {
      scrollTarget.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      visibilityObserver.disconnect();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    scheduleUpdate,
    updateCardTransforms,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef} style={style}>
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
