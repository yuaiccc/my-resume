'use client';

import { useEffect } from 'react';

export default function InteractiveEffects() {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-spotlight-card]');
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      target.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
      target.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return null;
}
