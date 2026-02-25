"use client";
import { useState, useEffect } from "react";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";
import { motion, AnimatePresence } from "framer-motion";

const uiTranslations = {
  en: { guide: "How to Pray", surahs: "Surahs", back: "← Back to List", loading: "Loading Surahs..." },
  tr: { guide: "Kılınış", surahs: "Sureler", back: "← Listeye Dön", loading: "Sureler Yükleniyor..." },
  ar: { guide: "كيفية الصلاة", surahs: "السور", back: "← العودة للقائمة", loading: "جاري تحميل السور..." }
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

      {/* İKONLU BUTONLAR */}
      <div className="flex justify-center gap-4 mb-8 shrink-0">
        <button
          onClick={() => setActiveTab("guide")}
          className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm tracking-wide flex items-center gap-3 border ${
            activeTab === "guide" 
            ? "bg-zinc-900 text-white shadow-lg border-zinc-900" 
            : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          {/* Namaz Kılan İnsan İkonu */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M11 22V17H13V22H11M16.5 11.5L14.5 10.5C14.2 10.3 13.9 10.2 13.6 10.1C13.3 10 13 10 12.7 10H11.3C10.5 10 9.7 10.4 9.2 11.1L6.4 15.3L7.7 16.2L10 13V15.5V20H14V14L15.3 15.2C15.7 15.6 16.2 15.9 16.8 15.9C17.4 15.9 18 15.7 18.4 15.3L21 12.7L19.6 11.3L16.5 14V11.5" />
          </svg>
          {t.guide}
        </button>

        <button
          onClick={() => {
            setActiveTab("surahs");
            setSelectedSurah(null);
          }}
          className={`px-6 py-3 rounded-2xl font-bold transition-all text-sm tracking-wide flex items-center gap-3 border ${
            activeTab === "surahs" 
            ? "bg-zinc-900 text-white shadow-lg border-zinc-900" 
            : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          {/* Kur'an-ı Kerim / Kitap İkonu */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 6h8" /><path d="M8 10h8" /><path d="M8 14h4" />
          </svg>
          {t.surahs}
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