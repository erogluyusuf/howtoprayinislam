"use client";
import { useState } from "react";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";
import { motion, AnimatePresence } from "framer-motion";

export default function FajrGuide() {
  const [activePart, setActivePart] = useState<"sunnah" | "fard">("sunnah");
  const [activeRakat, setActiveRakat] = useState<1 | 2>(1);

  const nextRakat = () => {
    if (activePart === "sunnah" && activeRakat === 1) setActiveRakat(2);
    else if (activePart === "sunnah" && activeRakat === 2) {
      setActivePart("fard");
      setActiveRakat(1);
    } else if (activePart === "fard" && activeRakat === 1) setActiveRakat(2);
  };

  return (
    <BasePrayerGuide
      title="Sabah Namazı"
      subtitle="2 Rekat Sünnet • 2 Rekat Farz"
      description="Sabah namazı toplam 4 rekattır. Kılmak istediğiniz bölümü aşağıdan doğrudan seçebilirsiniz."
    >
      <VerseHadithBlock />

      {/* --- YENİ, EN BASİT VE NET TASARIM --- */}
      <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-sm mb-10 z-10 flex flex-col gap-5">
        
        {/* SÜNNET GRUBU */}
        <div>
          <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            2 Rekat Sünnet
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => { setActivePart("sunnah"); setActiveRakat(1); }}
              className={`flex-1 py-3 text-sm sm:text-base font-semibold rounded-xl transition-all ${
                activePart === "sunnah" && activeRakat === 1
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600/20 ring-offset-1"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              1. Rekat
            </button>
            <button
              onClick={() => { setActivePart("sunnah"); setActiveRakat(2); }}
              className={`flex-1 py-3 text-sm sm:text-base font-semibold rounded-xl transition-all ${
                activePart === "sunnah" && activeRakat === 2
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600/20 ring-offset-1"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              2. Rekat
            </button>
          </div>
        </div>

        {/* FARZ GRUBU */}
        <div>
          <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            2 Rekat Farz
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => { setActivePart("fard"); setActiveRakat(1); }}
              className={`flex-1 py-3 text-sm sm:text-base font-semibold rounded-xl transition-all ${
                activePart === "fard" && activeRakat === 1
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600/20 ring-offset-1"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              1. Rekat
            </button>
            <button
              onClick={() => { setActivePart("fard"); setActiveRakat(2); }}
              className={`flex-1 py-3 text-sm sm:text-base font-semibold rounded-xl transition-all ${
                activePart === "fard" && activeRakat === 2
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600/20 ring-offset-1"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              2. Rekat
            </button>
          </div>
        </div>

      </div>

      {/* --- REKAT ADIMLARI --- */}
      <div className="relative w-full min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePart}-${activeRakat}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 w-full"
          >
            {/* ==================================
                SÜNNET - 1. REKAT
            ================================== */}
            {activePart === "sunnah" && activeRakat === 1 && (
              <>
                <Step num={1} title="Niyet ve Tekbir" desc="Niyet ettim Allah rızası için sabah namazının iki rekat sünnetini kılmaya. 'Allahu Ekber' diyerek namaza başlanır." image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                <Step num={2} title="Kıyam ve Kıraat" desc="Sırasıyla; Sübhaneke, Eûzü Besmele, Fatiha ve zamm-ı sure okunur." isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                <Step num={3} title="Rüku" desc="'Allahu Ekber' diyerek rükuya eğilinir. 3 defa 'Sübhâne Rabbiyel Azîm' denir." image="/Rükû.png" image2="/Rükû-W.png" />
                <Step num={4} title="Kavme (Doğrulma)" desc="'Semiallahu limen hamideh' diyerek kalkılır, tam doğrulunca 'Rabbena lekel hamd' denir." isRed image="/Kavme.png" image2="/Kavme-W.png" />
                <Step num={5} title="Secdeler" desc="'Allahu Ekber' diyerek secdeye gidilir (3 defa Sübhâne Rabbiyel A'lâ). Oturulur, tekrar secdeye gidilir (3 defa Sübhâne Rabbiyel A'lâ)." image="/Secde.png" image2="/Secde-W.png" />
              </>
            )}

            {/* ==================================
                SÜNNET - 2. REKAT
            ================================== */}
            {activePart === "sunnah" && activeRakat === 2 && (
              <>
                <Step num={1} title="Ayağa Kalkış ve Kıraat" desc="Ayağa kalkılır. Sadece Besmele, Fatiha ve zamm-ı sure okunur." isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                <Step num={2} title="Rüku" desc="'Allahu Ekber' diyerek rükuya gidilir. 3 defa 'Sübhâne Rabbiyel Azîm' denir." image="/Rükû.png" image2="/Rükû-W.png" />
                <Step num={3} title="Secdeler" desc="Kavme yapıldıktan sonra iki kere secdeye gidilir." image="/Secde.png" image2="/Secde-W.png" />
                <Step num={4} title="Son Oturuş ve Selam" desc="Secdeden sonra oturulur. Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur. Önce sağa, sonra sola selam verilerek sünnet namazı tamamlanır." isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-right-W.png" />
              </>
            )}

            {/* ==================================
                FARZ - 1. REKAT
            ================================== */}
            {activePart === "fard" && activeRakat === 1 && (
              <>
                <Step num={1} title="Kamet, Niyet ve Tekbir" desc="Erkekler farzdan önce Kamet getirir. Niyet ettim Allah rızası için sabah namazının iki rekat farzını kılmaya diyerek başlanır." image="/iftitahtekbiri.png" image2="/iftitahtekbiri-W.png" />
                <Step num={2} title="Kıyam ve Kıraat" desc="Sırasıyla; Sübhaneke, Eûzü Besmele, Fatiha ve zamm-ı sure okunur." isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                <Step num={3} title="Rüku" desc="'Allahu Ekber' diyerek rükuya eğilinir. 3 defa 'Sübhâne Rabbiyel Azîm' denir." image="/Rükû.png" image2="/Rükû-W.png" />
                <Step num={4} title="Kavme (Doğrulma)" desc="'Semiallahu limen hamideh' diyerek kalkılır, tam doğrulunca 'Rabbena lekel hamd' denir." isRed image="/Kavme.png" image2="/Kavme-W.png" />
                <Step num={5} title="Secdeler" desc="Peş peşe iki secde yapılır. Her birinde 3 defa 'Sübhâne Rabbiyel A'lâ' denir." image="/Secde.png" image2="/Secde-W.png" />
              </>
            )}

            {/* ==================================
                FARZ - 2. REKAT
            ================================== */}
            {activePart === "fard" && activeRakat === 2 && (
              <>
                <Step num={1} title="Ayağa Kalkış ve Kıraat" desc="Ayağa kalkılır. Besmele, Fatiha ve zamm-ı sure okunur." isRed image="/Kıyam.png" image2="/Kıyam-W.png" />
                <Step num={2} title="Rüku" desc="'Allahu Ekber' diyerek rükuya gidilir. 3 defa 'Sübhâne Rabbiyel Azîm' denir." image="/Rükû.png" image2="/Rükû-W.png" />
                <Step num={3} title="Secdeler" desc="Kavme yapıldıktan sonra iki kere secdeye gidilir." image="/Secde.png" image2="/Secde-W.png" />
                <Step num={4} title="Son Oturuş ve Selam" desc="Secdeden sonra oturulur. Ettehiyyatü, Salli, Barik ve Rabbena duaları okunur. Sağa ve sola selam verilerek farz namazı da tamamlanır." isRed image="/Celse.png" image2="/Celse-W.png" image3="/Selam-right.png" image4="/Selam-right-W.png" />
              </>
            )}

            {/* SONRAKİ REKATA GEÇ BUTONU */}
            {!(activePart === "fard" && activeRakat === 2) && (
              <div className="pt-8 pb-4 w-full flex justify-end">
                <button 
                  onClick={nextRakat}
                  className="bg-zinc-800 hover:bg-zinc-900 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                >
                  {(activePart === "sunnah" && activeRakat === 2) ? "Farz Namazına Geç" : "Sonraki Rekat"} 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
      </div>
    </BasePrayerGuide>
  );
}