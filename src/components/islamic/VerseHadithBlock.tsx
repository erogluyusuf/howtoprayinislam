"use client";
import { useEffect, useState } from "react";

// Hata mesajını da kapsayacak şekilde type güncellendi
type DataType = {
  error?: string;
  verse?: {
    ar: string;
    en: string;
    tr: string;
    reference: string;
  };
  hadith?: {
    ar: string;
    en: string;
    tr: string;
    reference: string;
  };
};

export default function VerseHadithBlock() {
  const [data, setData] = useState<DataType | null>(null);
  const [userLang, setUserLang] = useState<"tr" | "en">("en");

  useEffect(() => {
    const lang = navigator.language || "en";
    if (lang.startsWith("tr")) setUserLang("tr");
    else setUserLang("en");

    fetch("/api/islamic-content")
      .then(res => res.json())
      .then(setData)
      .catch(err => setData({ error: "Bağlantı hatası oluştu" }));
  }, []);

  if (!data) {
    return (
      <div className="text-center py-10 text-zinc-400 text-sm animate-pulse">
        Loading Islamic content...
      </div>
    );
  }

  // Eğer API'den hata döndüyse çökmeden ekrana hatayı bas
  if (data.error || !data.verse || !data.hadith) {
    return (
      <div className="text-center py-10 text-red-400 text-sm border border-red-100 rounded-2xl bg-red-50">
        İçerik yüklenirken bir hata oluştu. (Lütfen API anahtarınızı kontrol edin)
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-10 border border-zinc-200 space-y-10 mb-12">
      {/* AYET */}
      <div className="text-center space-y-5">
        <p className="text-3xl leading-loose font-semibold" dir="rtl">
          {data.verse.ar}
        </p>
        <p className="text-zinc-600 text-base max-w-2xl mx-auto">
          {data.verse[userLang]}
        </p>
        <span className="text-xs text-zinc-400 uppercase tracking-widest">
          {data.verse.reference}
        </span>
      </div>

      <div className="border-t border-zinc-200" />

      {/* HADİS */}
      <div className="text-center space-y-5">
        <p className="text-2xl leading-loose font-semibold" dir="rtl" dangerouslySetInnerHTML={{ __html: data.hadith.ar }} />
        <p className="text-zinc-600 text-base max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: data.hadith[userLang] }} />
        <span className="text-xs text-zinc-400 uppercase tracking-widest">
          {data.hadith.reference}
        </span>
      </div>
    </div>
  );
}