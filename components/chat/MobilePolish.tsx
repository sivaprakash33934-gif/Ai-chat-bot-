"use client";

import { useState, useEffect } from "react";

export function useMobileChat(isOpen: boolean) {
  const [isMobile, setIsMobile] = useState(false);
  const [safeAreaBottom, setSafeAreaBottom] = useState("0px");

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (isMobile) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setSafeAreaBottom("env(safe-area-inset-bottom, 0px)");

      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen, isMobile]);

  return { isMobile, safeAreaBottom };
}
