import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فـيـروز | Fayrouz — System 1 Specialty Coffee Matcher",
  description: "طابق ذوقك مع منيو أي كافيه مختص في ٣ ثواني. ٣ خيارات مضمونة + ١ مغامرة بدون حيرة. Specialty coffee palate matching in Amman, Jordan.",
  applicationName: "Fayrouz",
  metadataBase: new URL("https://fayrouz.bynoor.io"),
  authors: [{ name: "Noor", url: "https://bynoor.io" }],
  keywords: [
    "قهوة مختصة",
    "فيروز",
    "Fayrouz",
    "Almond Coffee House",
    "Dimitri's Coffee",
    "Bunni Roastery",
    "Būn Fellows",
    "Ambar",
    "Amman Specialty Coffee",
    "Coffee Dialects",
    "FayrouzPass",
  ],
  openGraph: {
    title: "فـيـروز | Fayrouz — System 1 Specialty Coffee Matcher",
    description: "Eliminate specialty coffee menu paralysis in Amman. 3 safe picks + 1 adventure pick with 1-tap barista ticket.",
    url: "https://fayrouz.bynoor.io",
    siteName: "Fayrouz (فيروز)",
    locale: "ar_JO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فـيـروز | Fayrouz — Specialty Coffee Matcher",
    description: "Connect your palate with live specialty coffeehouse menus in Amman in 3 seconds.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fayrouz",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#120D0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${amiri.variable} ${arefRuqaa.variable} ${inter.variable} h-full bg-espresso-950`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-espresso-950 text-parchment-50 antialiased selection:bg-gold-500/30 selection:text-gold-200">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
