"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const uiTranslations = {
  en: { back: "← Back to List", loading: "Loading Surahs..." },
  tr: { back: "← Listeye Dön", loading: "Sureler Yükleniyor..." },
  ar: { back: "← العودة للقائمة", loading: "جاري تحميل السور..." }
};

interface BasePrayerGuideProps {
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode; // Kılınış adımları (Step'ler) buraya gelecek
}

export default function BasePrayerGuide({ title, subtitle, description, children }: BasePrayerGuideProps) {
  const [activeTab, setActiveTab] = useState<"guide" | "surahs">("guide");
  const [userLang, setUserLang] = useState<"en" | "tr" | "ar">("en");
  const [surahsData, setSurahsData] = useState<any[]>([]);
  const [isLoadingSurahs, setIsLoadingSurahs] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<any | null>(null);

  useEffect(() => {
    const lang = navigator.language;
    if (lang.startsWith("tr")) setUserLang("tr");
    else if (lang.startsWith("ar")) setUserLang("ar");
    else setUserLang("en");
  }, []);

  useEffect(() => {
    if (activeTab === "surahs" && surahsData.length === 0) {
      setIsLoadingSurahs(true);
      const shortLang = navigator.language.split("-")[0];
      
      fetch(`/api/surahs?lang=${shortLang}`)
        .then(res => res.json())
        .then(data => {
          setSurahsData(data);
          setIsLoadingSurahs(false);
        })
        .catch(() => setIsLoadingSurahs(false));
    }
  }, [activeTab, surahsData.length]);

  const t = uiTranslations[userLang];

  return (
    <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
      {/* BAŞLIK KISMI (Değişken) */}
      <div className="mb-6 pb-6 border-b border-zinc-200 text-center shrink-0">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">{title}</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">{subtitle}</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">{description}</p>
      </div>

      {/* SEKME BUTONLARI (Sabit) */}
      <div className="flex justify-center gap-6 mb-8 shrink-0">
        <button
          onClick={() => setActiveTab("guide")}
          className={`rounded-full transition-all flex items-center justify-center bg-white border-2 ${
            activeTab === "guide" ? "border-emerald-500 shadow-md scale-110" : "border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100" 
          }`}
          style={{ width: '60px', height: '60px', minWidth: '60px', minHeight: '60px' }}
          title="Guide" 
        >
          <Image src="/pray.svg" alt="Prayer Icon" width={32} height={32} className="transition-all" />
        </button>

        <button
          onClick={() => {
            setActiveTab("surahs");
            setSelectedSurah(null);
          }}
          className={`rounded-full transition-all flex items-center justify-center bg-white border-2 ${
            activeTab === "surahs" ? "border-emerald-500 shadow-md scale-110" : "border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100"
          }`}
          style={{ width: '60px', height: '60px', minWidth: '60px', minHeight: '60px' }}
          title="Surahs"
        >
          <Image src="/quran.svg" alt="Quran Icon" width={32} height={32} className="transition-all" />
        </button>
      </div>

      <div className="flex-1 relative w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === "guide" ? (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 pb-10 w-full"
            >
              {/* ÇOCUK BİLEŞENLER (Kılınış adımları ve Hadis bu araya girecek) */}
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="surahs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-sm p-4 sm:p-8 border border-zinc-200 w-full flex-1 flex flex-col mb-10 min-h-[400px]"
            >
              {isLoadingSurahs ? (
                <div className="flex items-center justify-center h-full text-zinc-400 font-bold animate-pulse w-full">
                  {t.loading}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {selectedSurah ? (
                    <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex-1 flex flex-col h-full w-full">
                      <div className="flex justify-between items-center mb-2 shrink-0">
                        <button onClick={() => setSelectedSurah(null)} className="text-sm font-bold text-zinc-500 hover:text-zinc-800 flex items-center gap-2 transition-colors">
                          {t.back}
                        </button>
                        <h4 className="text-xl font-black text-zinc-800">{selectedSurah.name.local}</h4>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar pb-10 w-full">
                        {selectedSurah.verses.map((verse: any) => (
                          <div key={verse.number} className="flex flex-col gap-4 p-6 pt-10 sm:pt-6 rounded-3xl bg-[#f8f9fa] border border-zinc-200 relative group transition-all hover:border-zinc-300 hover:shadow-sm w-full">
                            <div className="absolute bg-zinc-900 group-hover:bg-emerald-600 transition-colors text-white flex items-center justify-center font-bold shadow-sm" style={{ top: '16px', left: '16px', width: '32px', height: '32px', borderRadius: '50%', fontSize: '14px', flexShrink: 0 }}>
                              {verse.number}
                            </div>
                            <p className="text-2xl leading-[2.5] font-medium text-zinc-900 text-right font-arabic" dir="rtl">
                              {verse.ar} <span className="text-emerald-600 font-bold ml-1">﴿{verse.number.toLocaleString('ar-EG')}﴾</span>
                            </p>
                            <div className="border-t border-zinc-200/60 w-full" />
                            <p className="text-zinc-600 text-[15px] leading-relaxed">{verse.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full pb-8">
                      {surahsData.map((surah) => (
                        <button key={surah.id} onClick={() => setSelectedSurah(surah)} className="relative w-full h-28 p-3 border border-zinc-200 rounded-3xl hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group bg-[#f8f9fa] hover:bg-white overflow-hidden">
                          <div className="flex flex-col items-center gap-1 w-full px-1">
                            <span className="text-2xl sm:text-3xl text-zinc-800 group-hover:text-emerald-700 transition-colors font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full" dir="rtl">
                              {surah.name.ar}
                            </span>
                            <span className="font-bold text-[10px] sm:text-xs text-zinc-400 group-hover:text-emerald-600 transition-colors uppercase tracking-wider truncate w-full">
                              {surah.name.local}
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ADIM BİLEŞENİ (Diğer dosyalarda kolayca kullanılabilsin diye export ediyoruz)
// BasePrayerGuide.tsx dosyasının en altı:
// BasePrayerGuide.tsx dosyasının en altı:

export const Step = ({ num, title, desc, isRed, image, image2, image3, image4 }: { num: number, title: string, desc: string, isRed?: boolean, image?: string, image2?: string, image3?: string, image4?: string }) => (
  <div className="flex gap-4 items-start p-5 bg-[#f8f9fa] rounded-2xl border border-zinc-100 transition-all hover:border-zinc-300 hover:shadow-sm w-full">
    {/* Numara Yuvarlağı */}
    <div 
      className={`text-white flex items-center justify-center font-black shadow-md ${isRed ? 'bg-[#E63946]' : 'bg-zinc-900'}`}
      style={{ width: '48px', height: '48px', borderRadius: '50%', fontSize: '18px', flexShrink: 0 }}
    >
      {num}
    </div>
    
    {/* Metin ve Görsel Alanı */}
    <div className="pt-1 flex-1">
      <h3 className="text-lg font-bold mb-1 text-zinc-800">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
      
      {/* Eğer herhangi bir image prop'u varsa bu alanı göster */}
      {(image || image2 || image3 || image4) && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm w-full">
          {/* flex-wrap eklendi: Eğer 4 resim ekrana sığmazsa (mobilde) otomatik 2x2 alt alta geçer */}
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            
            {image && (
              <div className="flex-1 min-w-[100px] flex justify-center items-center bg-[#f8f9fa] rounded-lg p-3 border border-zinc-100">
                <Image src={image} alt={`${title} - 1`} width={120} height={120} className="opacity-80 object-contain" />
              </div>
            )}

            {image2 && (
              <div className="flex-1 min-w-[100px] flex justify-center items-center bg-[#f8f9fa] rounded-lg p-3 border border-zinc-100">
                <Image src={image2} alt={`${title} - 2`} width={120} height={120} className="opacity-80 object-contain" />
              </div>
            )}

            {image3 && (
              <div className="flex-1 min-w-[100px] flex justify-center items-center bg-[#f8f9fa] rounded-lg p-3 border border-zinc-100">
                <Image src={image3} alt={`${title} - 3`} width={120} height={120} className="opacity-80 object-contain" />
              </div>
            )}

            {image4 && (
              <div className="flex-1 min-w-[100px] flex justify-center items-center bg-[#f8f9fa] rounded-lg p-3 border border-zinc-100">
                <Image src={image4} alt={`${title} - 4`} width={120} height={120} className="opacity-80 object-contain" />
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  </div>
);