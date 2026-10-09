'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'json', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="border border-hairline bg-paper-elevated my-4 font-mono text-xs overflow-hidden">
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hairline bg-paper text-ink-muted">
        <span className="text-[11px] uppercase tracking-wider text-ink font-semibold">
          {filename || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-hairline hover:border-ink hover:text-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-success" />
              <span className="text-success text-[10px] font-semibold">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-[10px]">COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 overflow-x-auto text-ink leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
