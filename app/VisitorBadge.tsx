'use client';

import { useState, useEffect } from 'react';
import { UAParser } from 'ua-parser-js';

type VisitorInfo = {
  country?: string;
  city?: string;
  browser?: string;
  os?: string;
  isLoading: boolean;
  error?: boolean;
};

export default function VisitorBadge() {
  const [info, setInfo] = useState<VisitorInfo>({ isLoading: true });

  useEffect(() => {
    // 1. 解析设备信息
    const parser = new UAParser();
    const result = parser.getResult();
    const browser = result.browser.name || 'Unknown Browser';
    const os = result.os.name || 'Unknown OS';

    // 2. 获取 IP 定位信息 (使用免费且稳定的 ipapi.co)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setInfo({
          country: data.country_name,
          city: data.city,
          browser,
          os,
          isLoading: false
        });
      })
      .catch(err => {
        console.error('Failed to fetch visitor info:', err);
        setInfo({
          browser,
          os,
          isLoading: false,
          error: true
        });
      });
  }, []);

  if (info.isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
        正在检测访客信息...
      </div>
    );
  }

  // 拼接地理位置，处理可能获取失败的情况
  const location = info.error || !info.country 
    ? '地球' 
    : `${info.country}${info.city ? ` ${info.city}` : ''}`;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow text-xs text-slate-600 dark:text-slate-300">
      <span className="animate-bounce">👋</span>
      <span>欢迎来自 <span className="font-bold text-blue-500 dark:text-blue-400">{location}</span> 的朋友！</span>
      <span className="text-slate-400 dark:text-slate-500 ml-1">
        ({info.browser} / {info.os})
      </span>
    </div>
  );
}
