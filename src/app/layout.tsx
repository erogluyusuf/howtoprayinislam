"use client"; // Google Translate scripti için client bileşeni olması gerekiyor
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Translate Çeviri Ayarları */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: true, // Kullanıcının diline göre otomatik çevir
              }, 'google_translate_element');
            }
          `}
        </Script>
        
        {/* Google Translate'in tepedeki çirkin barını gizlemek için özel CSS */}
        <style>{`
          body { top: 0 !important; }
          .goog-te-banner-frame { display: none !important; }
          .goog-te-balloon-frame { display: none !important; }
          #google_translate_element { display: none; }
          .skiptranslate { display: none !important; }
          body > .skiptranslate { display: none !important; }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Gizli bir div içinde çeviri elementi (Scriptin çalışması için şart) */}
        <div id="google_translate_element"></div>
        
        {children}
      </body>
    </html>
  );
}