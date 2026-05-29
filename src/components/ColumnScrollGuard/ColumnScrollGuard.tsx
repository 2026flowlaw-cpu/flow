"use client";

import { useEffect } from 'react';

export default function ColumnScrollGuard() {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverflowX = document.body.style.overflowX;
    const previousBodyOverflowY = document.body.style.overflowY;
    const previousHtmlOverflowY = document.documentElement.style.overflowY;
    const previousHtmlOverflowX = document.documentElement.style.overflowX;

    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';

    const handleWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey) return;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;

      if (maxScroll <= 0) return;

      const currentTop = window.scrollY;
      const nextTop = Math.min(maxScroll, Math.max(0, currentTop + event.deltaY));

      if (nextTop === currentTop) return;

      window.scrollTo({ top: nextTop, left: window.scrollX, behavior: 'auto' });
      event.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowX = previousBodyOverflowX;
      document.body.style.overflowY = previousBodyOverflowY;
      document.documentElement.style.overflowY = previousHtmlOverflowY;
      document.documentElement.style.overflowX = previousHtmlOverflowX;
    };
  }, []);

  return null;
}
