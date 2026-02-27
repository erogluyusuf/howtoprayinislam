"use client";
import { useState, useRef, useEffect } from "react";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";
import { motion, AnimatePresence } from "framer-motion";

// 1. JSON DOSYALARINI DOĞRUDAN İÇE AKTARIYORUZ
import tr from "@/lib/lang/tr.json";
import en from "@/lib/lang/en.json";
import ar from "@/lib/lang/ar.json";

// Tüm dilleri bir objede topluyoruz
const dictionaries: Record<string, any> = { tr, en, ar };

// Desteklenen diller listesi
const supportedLangs = ["tr", "en", "ar"];

export default function FajrGuide() {
  // 2. AKTİF DİLİ BELİRLİYORUZ (Varsayılan olarak 'en' atıyoruz, useEffect ile güncelleyeceğiz)
  const [lang, setLang] = useState<"tr" | "en" | "ar">("en");
  // Sayfanın ilk yüklenmesinde dil algılanana kadar flash olmasını engellemek için
  const [isMounted, setIsMounted] = useState(false);

  // 3. TARAYICI DİLİNİ OTOMATİK ALGILAMA
  useEffect(() => {
    setIsMounted(true);
    // Kullanıcının tarayıcı dilini al (örn: 'tr-TR', 'en-US', 'ar-SA' vb.)
    const browserLang = navigator.language.split('-')[0]; // Sadece ilk kısmını al ('tr', 'en', 'ar')
    
    // Eğer tarayıcı dili desteklediğimiz dillerden biriyse onu kullan, değilse 'en' kullan
    if (supportedLangs.includes(browserLang)) {
      setLang(browserLang as "tr" | "en" | "ar");
    } else {
      setLang("en"); // Desteklenmeyen bir dilse varsayılan İngilizce olsun
    }
  }, []);

  // 4. KENDİ ÇEVİRİ FONKSİYONUMUZ
  const t = (key: string) => {
    return dictionaries[lang][key] || key;
  };

  const [activePart, setActivePart] = useState<"sunnah" | "fard">("sunnah");
  const [activeRakat, setActiveRakat] = useState<1 | 2>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklanınca kapatma
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextRakat = () => {
    if (activePart === "sunnah" && activeRakat === 1) setActiveRakat(2);
    else if (activePart === "sunnah" && activeRakat === 2) {
      setActivePart("fard");
      setActiveRakat(1);
    } else if (activePart === "fard" && activeRakat === 1) setActiveRakat(2);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (part: "sunnah" | "fard", rakat: 1 | 2) => {
    setActivePart(part);
    setActiveRakat(rakat);
    setIsMenuOpen(false);
  };

  // Hydration hatasını önlemek için client-side mount olana kadar render etme
  if (!isMounted) return null;

  const getCurrentLabel = () => {
    const partName = activePart === "sunnah" ? t("sunnah") : t("fard");
    return `${partName} • ${activeRakat}. ${t("rakat")}`;
  };

  const menuItems: { part: "sunnah" | "fard"; rakat: 1 | 2; label: string }[] = [
    { part: "sunnah", rakat: 1, label: `${t("sunnah")} • 1. ${t("rakat")}` },
    { part: "sunnah", rakat: 2, label: `${t("sunnah")} • 2. ${t("rakat")}` },
    { part: "fard", rakat: 1, label: `${t("fard")} • 1. ${t("rakat")}` },
    { part: "fard", rakat: 2, label: `${t("fard")} • 2. ${t("rakat")}` },
  ];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="w-full">
      <BasePrayerGuide
        title={t("fajr_title")}
        subtitle={t("fajr_subtitle")}
        description={t("fajr_description")}
      >
        <VerseHadithBlock />

        {/* --- MİNİMAL LİSTBOX --- */}
        <div className="relative w-full max-w-xxl mx-0 z-40 mb-12" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center bg-white text-[18px] font-medium text-zinc-600 rounded-2xl py-4 pe-8 sm:pe-12 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100"
          >
            <span className="flex-1 text-start text-zinc-800 pe-6 ps-4">
              {getCurrentLabel()}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              className={`transition-transform duration-300 ease-in-out shrink-0 ${isMenuOpen ? "-rotate-180" : "rotate-0"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full start-0 end-0 mt-3 w-full bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.08)] z-50 p-3 sm:p-4 space-y-1.5 border border-zinc-100/80"
              >
                {menuItems.map((item, index) => {
                  const isActive = activePart === item.part && activeRakat === item.rakat;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(item.part, item.rakat)}
                      className={`w-full text-start px-4 sm:px-12 py-4 mt-2 mb-4 text-[15px] rounded-2xl transition-all flex justify-between items-center ${
                        isActive 
                          ? "text-emerald-600 bg-emerald-50/50 font-semibold" 
                          : "text-zinc-500 font-medium hover:text-zinc-800 hover:bg-zinc-50/80"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-500 shrink-0 ms-2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-[18px] ms-2 shrink-0"></div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- REKAT ADIMLARI --- */}
        <div className="relative w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePart}-${activeRakat}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 w-full"
            >
              {activePart === "sunnah" && activeRakat === 1 && (
                <>
                  <Step num={1} title={t("sunnah_r1_s1_title")} desc={t("sunnah_r1_s1_desc")} image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                  <Step num={2} title={t("sunnah_r1_s2_title")} desc={t("sunnah_r1_s2_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={3} title={t("sunnah_r1_s3_title")} desc={t("sunnah_r1_s3_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={4} title={t("sunnah_r1_s4_title")} desc={t("sunnah_r1_s4_desc")} isRed image="/Kavme.png" image2="/Kavme-W.png" />
                  <Step num={5} title={t("sunnah_r1_s5_title")} desc={t("sunnah_r1_s5_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}

              {activePart === "sunnah" && activeRakat === 2 && (
                <>
                  <Step num={1} title={t("sunnah_r2_s1_title")} desc={t("sunnah_r2_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("sunnah_r2_s2_title")} desc={t("sunnah_r2_s2_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("sunnah_r2_s3_title")} desc={t("sunnah_r2_s3_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("sunnah_r2_s4_title")} desc={t("sunnah_r2_s4_desc")} isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-left.png" image5="/Selam-right-W.png" image6="/Selam-left-W.png" />
                </>
              )}

              {activePart === "fard" && activeRakat === 1 && (
                <>
                  <Step num={1} title={t("fard_r1_s1_title")} desc={t("fard_r1_s1_desc")} image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                  <Step num={2} title={t("fard_r1_s2_title")} desc={t("fard_r1_s2_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={3} title={t("fard_r1_s3_title")} desc={t("fard_r1_s3_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={4} title={t("fard_r1_s4_title")} desc={t("fard_r1_s4_desc")} isRed image="/Kavme.png" image2="/Kavme-W.png" />
                  <Step num={5} title={t("fard_r1_s5_title")} desc={t("fard_r1_s5_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}

              {activePart === "fard" && activeRakat === 2 && (
                <>
                  <Step num={1} title={t("fard_r2_s1_title")} desc={t("fard_r2_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("fard_r2_s2_title")} desc={t("fard_r2_s2_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("fard_r2_s3_title")} desc={t("fard_r2_s3_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("fard_r2_s4_title")} desc={t("fard_r2_s4_desc")} isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-left.png" image5="/Selam-right-W.png" image6="/Selam-left-W.png" />
                </>
              )}

              {/* SONRAKİ REKATA GEÇ BUTONU */}
              {!(activePart === "fard" && activeRakat === 2) && (
                <div className="pt-6 pb-2 w-full flex justify-end">
                <button 
                  onClick={nextRakat}
                  style={{ backgroundColor: '#f8f9fa' }} /* bg-zinc-800'ün gerçek HEX kodu */
                  className="hover:bg-zinc-900 text-gray px-5 py-2 rounded-xl text-[6px] font-semibold transition-colors shadow-sm flex items-center gap-4 rtl:flex-row-reverse z-50 relative"
                >
                  <span>{(activePart === "sunnah" && activeRakat === 2) ? t("btn_switch_fard") : t("btn_next_rakat")}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </BasePrayerGuide>
    </div>
  );
}