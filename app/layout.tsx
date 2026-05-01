import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { themeInitScript } from "./theme";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  keywords: [
    "许君山",
    "Xu Junshan",
    "Java 后端",
    "AI",
    "全栈开发",
    "个人简历",
    "简历主页",
    "OCR",
    "Next.js",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 512,
        height: 512,
        alt: "许君山",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSansSC.variable} ${jetbrainsMono.variable} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
