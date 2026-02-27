"use client";
import { useState, useRef, useEffect } from "react";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";
import { motion, AnimatePresence } from "framer-motion";

import tr from "@/lib/lang/tr.json";
import en from "@/lib/lang/en.json";
import ar from "@/lib/lang/ar.json";

const dictionaries: Record<string, any> = { tr, en, ar };
const supportedLangs = ["tr", "en", "ar"];

type PartType = "first_sunnah" | "fard" | "last_sunnah";
type RakatType = 1 | 2 | 3 | 4;

export default function DhuhrGuide() {
  const [lang, setLang] = useState<"tr" | "en" | "ar">("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const browserLang = navigator.language.split('-')[0];
    if (supportedLangs.includes(browserLang)) {
      setLang(browserLang as "tr" | "en" | "ar");
    } else {
      setLang("en");
    }
  }, []);

  const t = (key: string) => {
    return dictionaries[lang][key] || key;
  };

  const [activePart, setActivePart] = useState<PartType>("first_sunnah");
  const [activeRakat, setActiveRakat] = useState<RakatType>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    if (activePart === "first_sunnah") {
      if (activeRakat < 4) setActiveRakat((activeRakat + 1) as RakatType);
      else { setActivePart("fard"); setActiveRakat(1); }
    } else if (activePart === "fard") {
      if (activeRakat < 4) setActiveRakat((activeRakat + 1) as RakatType);
      else { setActivePart("last_sunnah"); setActiveRakat(1); }
    } else if (activePart === "last_sunnah") {
      if (activeRakat < 2) setActiveRakat(2);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (part: PartType, rakat: RakatType) => {
    setActivePart(part);
    setActiveRakat(rakat);
    setIsMenuOpen(false);
  };

  if (!isMounted) return null;

  const getCurrentLabel = () => {
    const partName = activePart === "first_sunnah" ? t("first_sunnah") : activePart === "fard" ? t("fard") : t("last_sunnah");
    return `${partName} • ${activeRakat}. ${t("rakat")}`;
  };

  const menuItems: { part: PartType; rakat: RakatType; label: string }[] = [
    { part: "first_sunnah", rakat: 1, label: `${t("first_sunnah")} • 1. ${t("rakat")}` },
    { part: "first_sunnah", rakat: 2, label: `${t("first_sunnah")} • 2. ${t("rakat")}` },
    { part: "first_sunnah", rakat: 3, label: `${t("first_sunnah")} • 3. ${t("rakat")}` },
    { part: "first_sunnah", rakat: 4, label: `${t("first_sunnah")} • 4. ${t("rakat")}` },
    { part: "fard", rakat: 1, label: `${t("fard")} • 1. ${t("rakat")}` },
    { part: "fard", rakat: 2, label: `${t("fard")} • 2. ${t("rakat")}` },
    { part: "fard", rakat: 3, label: `${t("fard")} • 3. ${t("rakat")}` },
    { part: "fard", rakat: 4, label: `${t("fard")} • 4. ${t("rakat")}` },
    { part: "last_sunnah", rakat: 1, label: `${t("last_sunnah")} • 1. ${t("rakat")}` },
    { part: "last_sunnah", rakat: 2, label: `${t("last_sunnah")} • 2. ${t("rakat")}` },
  ];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="w-full">
      <BasePrayerGuide
        title={t("dhuhr_title")}
        subtitle={t("dhuhr_subtitle")}
        description={t("dhuhr_description")}
      >
        <VerseHadithBlock />

        <div className="relative w-full max-w-xxl mx-0 z-40 mb-12" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center bg-white text-[18px] font-medium text-zinc-600 rounded-2xl py-4 pe-8 sm:pe-12 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100"
          >
            <span className="flex-1 text-start text-zinc-800 pe-6 ps-4">
              {getCurrentLabel()}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`transition-transform duration-300 ease-in-out shrink-0 ${isMenuOpen ? "-rotate-180" : "rotate-0"}`}>
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
                className="absolute top-full start-0 end-0 mt-3 w-full bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.08)] z-50 p-3 sm:p-4 space-y-1.5 border border-zinc-100/80 max-h-[60vh] overflow-y-auto"
              >
                {menuItems.map((item, index) => {
                  const isActive = activePart === item.part && activeRakat === item.rakat;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(item.part, item.rakat)}
                      className={`w-full text-start px-4 sm:px-12 py-3 mt-1 mb-1 text-[15px] rounded-2xl transition-all flex justify-between items-center ${
                        isActive ? "text-emerald-600 bg-emerald-50/50 font-semibold" : "text-zinc-500 font-medium hover:text-zinc-800 hover:bg-zinc-50/80"
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
              {/* --- İLK SÜNNET --- */}
              {activePart === "first_sunnah" && activeRakat === 1 && (
                <>
                  <Step num={1} title={t("dh_fs_r1_s1_title")} desc={t("dh_fs_r1_s1_desc")} image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                  <Step num={2} title={t("dh_qiyam_title")} desc={t("dh_fs_r1_s2_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={3} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={4} title={t("dh_kavme_title")} desc={t("dh_kavme_desc")} isRed image="/Kavme.png" image2="/Kavme-W.png" />
                  <Step num={5} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}
              {activePart === "first_sunnah" && activeRakat === 2 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_r2_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("dh_ilk_oturus_title")} desc={t("dh_ilk_oturus_desc")} isRed image="/Celse.png" image2="/Celse-W.png" />
                </>
              )}
              {activePart === "first_sunnah" && activeRakat === 3 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_r3_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}
              {activePart === "first_sunnah" && activeRakat === 4 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_r4_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("dh_son_oturus_title")} desc={t("dh_son_oturus_desc")} isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-left.png" image5="/Selam-right-W.png" image6="/Selam-left-W.png" />
                </>
              )}

              {/* --- FARZ --- */}
              {activePart === "fard" && activeRakat === 1 && (
                <>
                  <Step num={1} title={t("dh_f_r1_s1_title")} desc={t("dh_f_r1_s1_desc")} image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                  <Step num={2} title={t("dh_qiyam_title")} desc={t("dh_fs_r1_s2_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={3} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={4} title={t("dh_kavme_title")} desc={t("dh_kavme_desc")} isRed image="/Kavme.png" image2="/Kavme-W.png" />
                  <Step num={5} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}
              {activePart === "fard" && activeRakat === 2 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_r2_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("dh_ilk_oturus_title")} desc={t("dh_ilk_oturus_desc")} isRed image="/Celse.png" image2="/Celse-W.png" />
                </>
              )}
              {activePart === "fard" && activeRakat === 3 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_f_r3_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}
              {activePart === "fard" && activeRakat === 4 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_f_r4_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("dh_son_oturus_title")} desc={t("dh_son_oturus_desc")} isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-left.png" image5="/Selam-right-W.png" image6="/Selam-left-W.png" />
                </>
              )}

              {/* --- SON SÜNNET --- */}
              {activePart === "last_sunnah" && activeRakat === 1 && (
                <>
                  <Step num={1} title={t("dh_ls_r1_s1_title")} desc={t("dh_ls_r1_s1_desc")} image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                  <Step num={2} title={t("dh_qiyam_title")} desc={t("dh_fs_r1_s2_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={3} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={4} title={t("dh_kavme_title")} desc={t("dh_kavme_desc")} isRed image="/Kavme.png" image2="/Kavme-W.png" />
                  <Step num={5} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                </>
              )}
              {activePart === "last_sunnah" && activeRakat === 2 && (
                <>
                  <Step num={1} title={t("dh_qiyam_title")} desc={t("dh_r2_s1_desc")} isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                  <Step num={2} title={t("dh_ruku_title")} desc={t("dh_ruku_desc")} image="/Rükû.png" image2="/Rükû-W.png" />
                  <Step num={3} title={t("dh_secde_title")} desc={t("dh_secde_desc")} image="/Secde.png" image2="/Secde-W.png" />
                  <Step num={4} title={t("dh_son_oturus_title")} desc={t("dh_son_oturus_desc")} isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-left.png" image5="/Selam-right-W.png" image6="/Selam-right-W.png" />
                </>
              )}

              {!(activePart === "last_sunnah" && activeRakat === 2) && (
                <div className="pt-6 pb-2 w-full flex justify-end">
                  <button 
                    onClick={nextRakat}
                    style={{ backgroundColor: '#f8f9fa' }}
                    className="hover:bg-zinc-900 text-gray px-5 py-2 rounded-xl text-[14px] font-semibold transition-colors shadow-sm flex items-center gap-4 rtl:flex-row-reverse z-50 relative"
                  >
                    <span>
                      {activePart === "first_sunnah" && activeRakat === 4 
                        ? t("btn_switch_fard") 
                        : activePart === "fard" && activeRakat === 4 
                        ? t("btn_switch_last_sunnah") 
                        : t("btn_next_rakat")}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="rtl:-scale-x-100">
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