'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResumeLanguage } from './language';

const QrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="15" width="6" height="6" rx="1" />
    <path d="M15 15h2v2h-2zM19 15h2v6h-2zM15 19h2v2h-2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function FeishuContact() {
  const [open, setOpen] = useState(false);
  const zh = useResumeLanguage() === 'zh';

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 transition hover:text-slate-900 dark:hover:text-white md:justify-end"
        aria-haspopup="dialog"
      >
        <QrIcon />
        <span>{zh ? '飞书 · 扫码联系' : 'Feishu · Scan to connect'}</span>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-5 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feishu-contact-title"
            className="w-full max-w-[320px] rounded-lg border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <div className="mb-4 flex items-start justify-between gap-4 text-left">
              <div>
                <h2 id="feishu-contact-title" className="text-base font-bold">{zh ? '在飞书联系我' : 'Connect on Feishu'}</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{zh ? '使用飞书扫描下方二维码' : 'Scan this QR code with Feishu'}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label={zh ? '关闭飞书二维码' : 'Close Feishu QR code'}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700">
              <Image
                src="/feishu-qr.png"
                alt={zh ? '许君山的飞书二维码' : 'Xu Junshan Feishu QR code'}
                width={460}
                height={452}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
