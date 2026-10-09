'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyCodeBlockProps {
  code: string;
  filename: string;
  className?: string;
}

export function CopyCodeBlock({ code, filename, className = '' }: CopyCodeBlockProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopyStatus('copied');
          setTimeout(() => setCopyStatus('idle'), 2000);
        })
        .catch(() => {
          setCopyStatus('failed');
          setTimeout(() => setCopyStatus('idle'), 2500);
        });
    } else {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  return (
    <div className={`border border-hairline bg-paper-elevated font-mono ${className}`}>
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-hairline text-[10px]">
        <span className="text-ink font-semibold">{filename}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="relative text-ink hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-ink px-1.5 py-0.5"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copyStatus === 'copied' ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="text-success font-semibold"
              >
                Copied ✓
              </motion.span>
            ) : copyStatus === 'failed' ? (
              <motion.span
                key="failed"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="text-error"
              >
                Copy failed (select manually)
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                Copy Spec
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <pre className="p-2.5 text-[10px] text-ink-muted overflow-x-auto leading-tight max-h-48">
        {code}
      </pre>
    </div>
  );
}
