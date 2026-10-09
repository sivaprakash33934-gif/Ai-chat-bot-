export interface StreamController {
  cancel: () => void;
}

export function streamText(
  fullText: string,
  onChunk: (currentText: string) => void,
  onComplete: (finalText: string) => void,
  reducedMotion?: boolean
): StreamController {
  const isReduced =
    reducedMotion ??
    (typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));

  if (isReduced) {
    onChunk(fullText);
    onComplete(fullText);
    return { cancel: () => {} };
  }

  let cancelled = false;
  let currentIndex = 0;
  let timeoutId: number | null = null;

  const step = () => {
    if (cancelled) return;

    const stride = Math.floor(Math.random() * 3) + 2;
    currentIndex = Math.min(currentIndex + stride, fullText.length);
    const currentSlice = fullText.slice(0, currentIndex);
    onChunk(currentSlice);

    if (currentIndex >= fullText.length) {
      onComplete(fullText);
      return;
    }

    const lastChar = fullText[currentIndex - 1];
    let delay = 25;
    if (lastChar === "." || lastChar === "?" || lastChar === "!") {
      delay = 180;
    } else if (lastChar === "," || lastChar === ";") {
      delay = 90;
    }

    timeoutId = window.setTimeout(step, delay);
  };

  timeoutId = window.setTimeout(step, 50);

  return {
    cancel: () => {
      cancelled = true;
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    },
  };
}
