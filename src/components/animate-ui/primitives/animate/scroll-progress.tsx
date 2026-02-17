'use client';

import * as React from 'react';
import {
  motion,
  useScroll,
  useSpring,
  type MotionValue,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';

import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';
import { getStrictContext } from '@/lib/get-strict-context';
import { useMotionValueState } from '@/hooks/use-motion-value-state';

type ScrollProgressDirection = 'horizontal' | 'vertical';

type ScrollProgressContextType = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  scale: MotionValue<number>;
  direction: ScrollProgressDirection;
  global: boolean;
};

const [LocalScrollProgressProvider, useScrollProgress] =
  getStrictContext<ScrollProgressContextType>('ScrollProgressContext');

type ScrollProgressProviderProps = {
  children: React.ReactNode;
  global?: boolean;
  transition?: SpringOptions;
  direction?: ScrollProgressDirection;
};

function ScrollProgressProvider({
  global = false,
  transition = { stiffness: 250, damping: 40, bounce: 0 },
  direction = 'vertical',
  ...props
}: ScrollProgressProviderProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress, scrollXProgress } = useScroll(
    global ? undefined : { container: containerRef },
  );

  const progress = direction === 'vertical' ? scrollYProgress : scrollXProgress;
  const scale = useSpring(progress, transition);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      const el = global ? document.documentElement : containerRef.current;
      if (el) {
        const scrollPos = direction === 'vertical' ? el.scrollTop : el.scrollLeft;
        const scrollSize = direction === 'vertical'
          ? el.scrollHeight - el.clientHeight
          : el.scrollWidth - el.clientWidth;
        const correctProgress = scrollSize > 0 ? scrollPos / scrollSize : 0;
        scale.jump(correctProgress);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LocalScrollProgressProvider
      value={{
        containerRef,
        progress,
        scale,
        direction,
        global,
      }}
      {...props}
    />
  );
}

type ScrollProgressMode = 'width' | 'height' | 'scaleY' | 'scaleX';

type ScrollProgressProps = WithAsChild<
  HTMLMotionProps<'div'> & {
    mode?: ScrollProgressMode;
  }
>;

function ScrollProgress({
  style,
  mode = 'width',
  asChild = false,
  ...props
}: ScrollProgressProps) {
  const { scale, direction, global, containerRef } = useScrollProgress();
  const scaleValue = useMotionValueState(scale);
  const [isScrollable, setIsScrollable] = React.useState(false);

  React.useEffect(() => {
    const el = global ? document.documentElement : containerRef.current;
    if (!el) return;

    const check = () => {
      const scrollable = direction === 'vertical'
        ? el.scrollHeight > el.clientHeight
        : el.scrollWidth > el.clientWidth;
      setIsScrollable(scrollable);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    // Also observe children changes
    if (!global && containerRef.current) {
      for (const child of Array.from(containerRef.current.children)) {
        ro.observe(child);
      }
    }

    return () => ro.disconnect();
  }, [global, containerRef, direction]);

  const Component = asChild ? Slot : motion.div;

  if (!isScrollable) return null;

  return (
    <Component
      data-slot="scroll-progress"
      data-direction={direction}
      data-mode={mode}
      data-global={global}
      style={{
        ...(mode === 'width' || mode === 'height'
          ? {
            [mode]: scaleValue * 100 + '%',
          }
          : {
            [mode]: scale,
          }),
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollProgressContainerProps = WithAsChild<HTMLMotionProps<'div'>>;

function ScrollProgressContainer({
  ref,
  asChild = false,
  ...props
}: ScrollProgressContainerProps) {
  const { containerRef, direction, global } = useScrollProgress();

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={containerRef}
      data-slot="scroll-progress-container"
      data-direction={direction}
      data-global={global}
      {...props}
    />
  );
}

export {
  ScrollProgressProvider,
  ScrollProgress,
  ScrollProgressContainer,
  useScrollProgress,
  type ScrollProgressProviderProps,
  type ScrollProgressProps,
  type ScrollProgressContainerProps,
  type ScrollProgressDirection,
  type ScrollProgressMode,
  type ScrollProgressContextType,
};
