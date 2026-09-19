import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فيروز | Fayrouz — قهوتك الصح بـ ٣ ثواني",
  description: "طابق ذوقك مع منيو أي مقهى مختص في ٣ ثواني. ٣ خيارات مضمونة + ١ مغامرة.",
  applicationName: "Fayrouz",
  authors: [{ name: "Noor", url: "https://bynoor.io" }],
  keywords: ["قهوة مختصة", "فيروز", "Fayrouz", "Ambar", "Turath", "System 1", "Arabic coffee"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#120D0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${inter.variable} h-full bg-espresso-950`}>
      <body className="min-h-full flex flex-col font-sans bg-espresso-950 text-parchment-50 antialiased selection:bg-gold-500/30 selection:text-gold-200">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
