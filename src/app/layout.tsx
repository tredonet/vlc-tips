import type { Metadata } from "next";
import { Patrick_Hand as Inter } from "next/font/google";
import "./globals.css";
import { TipProvider } from "@/providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--patrick-font",
});

export const metadata: Metadata = {
  title: "VLC Tips",
  description: "Valencia tips based on real experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TipProvider>
        <body className={inter.className}>{children}</body>
      </TipProvider>
      <Analytics />
    </html>
  );
}
