import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Fayrouz (فيروز) — System 1 Coffee Matcher",
  description: "Connect your palate to the coffeehouse menu in 3 seconds. 3 Safe Matches + 1 Adventure Pick.",
  applicationName: "Fayrouz",
  authors: [{ name: "Noor", url: "https://bynoor.io" }],
  keywords: ["specialty coffee", "coffee matcher", "Fayrouz", "Ambar", "Turath", "System 1", "Arabic coffee"],
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
    <html lang="en" className="h-full bg-espresso-950">
      <body className="min-h-full flex flex-col font-sans bg-espresso-950 text-parchment-50 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
