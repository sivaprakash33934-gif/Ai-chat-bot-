'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MOTION } from '@/lib/motion-tokens';

interface TraceLineProps {
  points?: string;
  d?: string;
  color?: string;
  className?: string;
  delay?: number;
}

export function TraceLine({
  d = 'M 0 0 L 100 0',
  color = '#D9D9D4',
  className = '',
  delay = 0,
}: TraceLineProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <svg className={className} aria-hidden="true">
        <path d={d} stroke={color} strokeWidth="1" fill="none" />
      </svg>
    );
  }

  return (
    <svg className={className} aria-hidden="true">
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: MOTION.duration.extended,
          delay,
          ease: MOTION.easing.easeOut,
        }}
      />
    </svg>
  );
}
