// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./recoilProvider";

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ระบบคอร์สเรียน (เฉพาะธุรกิจ)",
  description: "ระบบการเรียนการสอนออนไลน์ที่ออกแบบมาเฉพาะสำหรับธุรกิจ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body><RecoilProvider>{children}</RecoilProvider></body>
    </html>
  );
}
