'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CounterBadgeProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CounterBadge({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: CounterBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 90, damping: 20 });
  const displayVal = useTransform(springVal, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    return displayVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
  }, [displayVal]);

  return (
    <span ref={ref} className={`tabular-nums font-mono ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
