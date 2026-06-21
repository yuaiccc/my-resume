'use client';

type NameEntry = {
  label: string;
  lang: string;
  hint: string;
};

const NAMES: NameEntry[] = [
  { label: '许君山', lang: 'zh-CN', hint: 'Chinese' },
  { label: '許君山', lang: 'zh-Hant', hint: '繁體' },
  { label: 'Xu Junshan', lang: 'en', hint: 'Pinyin' },
  { label: 'Junshan Xu', lang: 'en', hint: 'Western order' },
  { label: 'シュ・ジュンシャン', lang: 'ja', hint: '日本語' },
  { label: 'キョ クンザン', lang: 'ja', hint: '音読み' },
  { label: '슈쥔산', lang: 'ko', hint: '한국어' },
  { label: 'Сюй Цзюньшань', lang: 'ru', hint: 'Русский' },
  { label: 'Σου Τζουνσάν', lang: 'el', hint: 'Ελληνικά' },
  { label: 'شو جون شان', lang: 'ar', hint: 'العربية' },
  { label: 'ซู จุนซาน', lang: 'th', hint: 'ไทย' },
  { label: 'Xu Junshan', lang: 'vi', hint: 'Tiếng Việt' },
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex items-center gap-10 whitespace-nowrap px-5 text-base sm:text-lg text-white/55"
      aria-hidden={ariaHidden || undefined}
    >
      {NAMES.map((n, i) => (
        <li key={`${n.label}-${i}`} className="inline-flex items-baseline gap-2">
          <span lang={n.lang} className="font-medium tracking-wide text-white/80">
            {n.label}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/35">{n.hint}</span>
          <span aria-hidden="true" className="text-white/20">·</span>
        </li>
      ))}
    </ul>
  );
}

export default function NameMarquee() {
  return (
    <div
      className="name-marquee mt-6 -mx-8 md:-mx-10 select-none"
      aria-label="Xu Junshan written in various languages"
    >
      <div className="name-marquee-track group flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
