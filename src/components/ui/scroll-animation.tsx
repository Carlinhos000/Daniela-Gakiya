import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps, Variant, TargetAndTransition } from 'motion/react';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';
const generateVariants = (direction: Direction): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;
  return {
    hidden: { filter: 'blur(10px)', opacity: 0, x: axis==='x'?value:0, y: axis==='y'?value:0 },
    visible: { filter: 'blur(0px)', opacity: 1, x:0, y:0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
};
const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px', once: true };
export interface ScrollAnimationProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variants?: { hidden?: Variant; visible?: Variant };
  viewport?: { amount?: number; margin?: string; once?: boolean };
  delay?: number;
  direction?: Direction;
}
const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  ({ children, className, variants, viewport = defaultViewport, delay = 0, direction = 'down', ...rest }, ref) => {
    const reducedMotion = useReducedMotion();
    const baseVariants = variants || generateVariants(direction);
    const withDelay = (target: TargetAndTransition): TargetAndTransition => ({
      ...target, transition: { ...target.transition, delay },
    });
    const visible = baseVariants.visible;
    const modifiedVariants = {
      hidden: baseVariants.hidden ?? generateVariants(direction).hidden,
      visible: typeof visible === 'function'
        ? ((custom, current, velocity) => { const target=visible(custom,current,velocity);return typeof target==='string'?target:withDelay(target); }) as Variant
        : withDelay(visible ?? generateVariants(direction).visible as TargetAndTransition),
    };
    return <motion.div ref={ref} initial={reducedMotion ? false : 'hidden'} whileInView="visible"
      variants={modifiedVariants} viewport={viewport} className={cn(className)} {...rest}>
      {children}
    </motion.div>;
  },
);
ScrollAnimation.displayName = 'ScrollAnimation';
export default ScrollAnimation;
