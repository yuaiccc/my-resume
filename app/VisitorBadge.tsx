'use client';

import { useState, useEffect } from 'react';

type VisitorInfo = {
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  isLoadingLocation: boolean;
  error?: boolean;
};

function parseBrowser(userAgent: string) {
  if (/Edg\//.test(userAgent)) {
    return 'Edge';
  }
  if (/Firefox\//.test(userAgent)) {
    return 'Firefox';
  }
  if (/Chrome\//.test(userAgent) && !/Edg\//.test(userAgent)) {
    return 'Chrome';
  }
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
    return 'Safari';
  }
  if (/OPR\//.test(userAgent) || /Opera\//.test(userAgent)) {
    return 'Opera';
  }

  return 'Unknown Browser';
}

function parseOS(userAgent: string) {
  if (/Windows NT/.test(userAgent)) {
    return 'Windows';
  }
  if (/Android/.test(userAgent)) {
    return 'Android';
  }
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return 'iOS';
  }
  if (/Mac OS X|Macintosh/.test(userAgent)) {
    return 'macOS';
  }
  if (/Linux/.test(userAgent)) {
    return 'Linux';
  }

  return 'Unknown OS';
}

export default function VisitorBadge() {
  const [info, setInfo] = useState<VisitorInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        browser: 'Unknown Browser',
        os: 'Unknown OS',
        isLoadingLocation: true,
      };
    }

    const userAgent = window.navigator.userAgent;

    return {
      browser: parseBrowser(userAgent),
      os: parseOS(userAgent),
      isLoadingLocation: true,
    };
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadLocation = () => {
      fetch('https://ipapi.co/json/', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          setInfo((current) => ({
            ...current,
            country: data.country_name,
            city: data.city,
            isLoadingLocation: false,
          }));
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }

          console.error('Failed to fetch visitor info:', error);
          setInfo((current) => ({
            ...current,
            isLoadingLocation: false,
            error: true,
          }));
        });
    };

    let idleId = 0;
    let usesIdleCallback = false;

    if (typeof window.requestIdleCallback === 'function') {
      usesIdleCallback = true;
      idleId = window.requestIdleCallback(loadLocation, { timeout: 1200 });
    } else {
      idleId = window.setTimeout(loadLocation, 300);
    }

    return () => {
      controller.abort();

      if (usesIdleCallback && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  const location = info.isLoadingLocation
    ? 'locating you...'
    : info.error || !info.country
    ? 'Earth'
    : `${info.country}${info.city ? ` ${info.city}` : ''}`;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow text-xs text-slate-600 dark:text-slate-300">
      <span className={info.isLoadingLocation ? 'animate-pulse' : 'animate-bounce'}>👋</span>
      <span>Hello from <span className="font-bold text-blue-500 dark:text-blue-400">{location}</span>.</span>
      <span className="text-slate-400 dark:text-slate-500 ml-1">
        ({info.browser || 'Unknown Browser'} / {info.os || 'Unknown OS'})
      </span>
    </div>
  );
}
