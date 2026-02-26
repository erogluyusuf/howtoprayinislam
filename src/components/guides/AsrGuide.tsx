"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";
import { motion, AnimatePresence } from "framer-motion";

const uiTranslations = {
  en: { back: "← Back to List", loading: "Loading Surahs..." },
  tr: { back: "← Listeye Dön", loading: "Sureler Yükleniyor..." },
  ar: { back: "← العودة للقائمة", loading: "جاري تحميل السور..." }
};

export default function AsrGuide() {
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
      <div className="mb-6 pb-6 border-b border-zinc-200 text-center shrink-0">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Asr Prayer (İkindi)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">4 Sunnah • 4 Fard</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Asr prayer is the mid-afternoon prayer. The Quran places special emphasis on safeguarding this specific prayer.
        </p>
      </div>

      {/* YUVARLAK, YAZISIZ, BEYAZ İKON BUTONLARI */}
      <div className="flex justify-center gap-6 mb-8 shrink-0">
        <button
          onClick={() => setActiveTab("guide")}
          // w-14 h-14 ile tam kare yapıp rounded-full ile yuvarlattık. bg-white sabit.
          className={`w-14 h-14 rounded-full transition-all flex items-center justify-center bg-white border-2 ${
            activeTab === "guide" 
            ? "border-emerald-500 shadow-md scale-110" // Aktifse çerçevesi yeşil, gölgeli ve hafif büyük
            : "border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100" // Aktif değilse soluk ve gri çerçeve
          }`}
          title="Guide" // Üzerine gelince ne olduğu anlaşılsın diye title eklendi
        >
          <Image 
            src="/pray.svg" 
            alt="Prayer Icon" 
            width={28} 
            height={28}
            // SVG'nin rengi siyahsa, invert filtresi kaldırıldı ki beyaz butonda görünsün
            className="transition-all"
          />
        </button>

        <button
          onClick={() => {
            setActiveTab("surahs");
            setSelectedSurah(null);
          }}
          className={`w-14 h-14 rounded-full transition-all flex items-center justify-center bg-white border-2 ${
            activeTab === "surahs" 
            ? "border-emerald-500 shadow-md scale-110" 
            : "border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100"
          }`}
          title="Surahs"
        >
          <Image 
            src="/quran.svg" 
            alt="Quran Icon" 
            width={28} 
            height={28}
            className="transition-all"
          />
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
              <VerseHadithBlock />
              <Step num={1} title="Niyyah (Intention)" desc="Make the intention to pray the 4 rakats of the Asr prayer." />
              <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar' to start. Keep your eyes looking at the place of prostration while standing." isRed />
              <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
              <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
              <Step num={5} title="Tashahhud (Middle & Final)" desc="Remember to sit after the 2nd rakat for the first Tashahhud, and again at the end of the 4th rakat." />
              <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face to the right, then left, offering greetings of peace." isRed />
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
                    <motion.div 
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 flex-1 flex flex-col h-full w-full"
                    >
                      <div className="flex justify-between items-center mb-2 shrink-0">
                        <button 
                          onClick={() => setSelectedSurah(null)}
                          className="text-sm font-bold text-zinc-500 hover:text-zinc-800 flex items-center gap-2 transition-colors"
                        >
                          {t.back}
                        </button>
                        <h4 className="text-xl font-black text-zinc-800">
                          {selectedSurah.name.local}
                        </h4>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar pb-10 w-full">
                        {selectedSurah.verses.map((verse: any) => (
                          <div key={verse.number} className="flex flex-col gap-4 p-5 rounded-3xl bg-[#f8f9fa] border border-zinc-200 relative group transition-all hover:border-zinc-300 hover:shadow-sm w-full">
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-zinc-900 group-hover:bg-emerald-600 transition-colors text-white flex items-center justify-center rounded-full font-bold text-xs border-4 border-white shadow-sm">
                              {verse.number}
                            </div>
                            <p className="text-2xl leading-[2.5] font-medium text-zinc-900 text-right font-arabic" dir="rtl">
                              {verse.ar} <span className="text-emerald-600 font-bold ml-1">﴿{verse.number.toLocaleString('ar-EG')}﴾</span>
                            </p>
                            <div className="border-t border-zinc-200/60 w-full" />
                            <p className="text-zinc-600 text-[15px] leading-relaxed">
                              {verse.meaning}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full pb-8 auto-rows-max"
                    >
                      {surahsData.map((surah) => (
                        <button
                          key={surah.id}
                          onClick={() => setSelectedSurah(surah)}
                          className="relative w-full p-6 border border-zinc-200 rounded-[2rem] hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col items-center justify-center text-center group bg-[#f8f9fa] hover:bg-white aspect-square overflow-visible"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-3xl sm:text-4xl text-zinc-800 group-hover:text-emerald-700 transition-colors font-medium" dir="rtl">
                              {surah.name.ar}
                            </span>
                            <span className="font-bold text-[10px] sm:text-xs text-zinc-400 group-hover:text-emerald-600 transition-colors uppercase tracking-wider truncate w-full px-2">
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

const Step = ({ num, title, desc, isRed }: { num: number, title: string, desc: string, isRed?: boolean }) => (
  <div className="flex gap-4 items-start p-5 bg-[#f8f9fa] rounded-2xl border border-zinc-100 transition-all hover:border-zinc-300 hover:shadow-sm w-full">
    <div className={`w-12 h-12 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-md ${isRed ? 'bg-[#E63946]' : 'bg-zinc-900'}`}>
      {num}
    </div>
    <div className="pt-1">
      <h3 className="text-lg font-bold mb-1 text-zinc-800">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);