'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION } from '@/lib/motion-tokens';

interface StaticFirstRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

/**
 * StaticFirstReveal: progressive enhancement wrapper.
 * By default semantic HTML is rendered. If JS is active, Framer Motion
 * provides a restrained single-shot viewport reveal.
 * Respects prefers-reduced-motion immediately.
 */
export function StaticFirstReveal({
  children,
  className = '',
  delay = 0,
  distance = MOTION.distance.medium,
}: StaticFirstRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: MOTION.duration.long,
        delay,
        ease: MOTION.easing.easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
