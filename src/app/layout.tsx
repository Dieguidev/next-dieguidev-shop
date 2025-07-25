import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from "@/config/fonts";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Dieguidev Shop",
    default: "Dieguidev Shop",
  },
  description: "A Next.js e-commerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
