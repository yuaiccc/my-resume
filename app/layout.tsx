import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "许君山的CV | Xu Junshan", 
  description: "全栈开发工程师 / Java 开发者", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
