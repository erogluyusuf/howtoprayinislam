"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FajrGuide from './guides/FajrGuide';
import DhuhrGuide from './guides/DhuhrGuide';
import AsrGuide from './guides/AsrGuide';
import MaghribGuide from './guides/MaghribGuide';
import IshaGuide from './guides/IshaGuide';

interface PrayerDrawerProps {
  selectedPrayer: string | null;
  onClose: () => void;
}

export default function PrayerDrawer({ selectedPrayer, onClose }: PrayerDrawerProps) {
  
  // Tıklanan vakte göre ilgili dosyayı getiren fonksiyon
  const renderGuide = () => {
    switch (selectedPrayer) {
      case 'Fajr': return <FajrGuide />;
      case 'Dhuhr': return <DhuhrGuide />;
      case 'Asr': return <AsrGuide />;
      case 'Maghrib': return <MaghribGuide />;
      case 'Isha': return <IshaGuide />;
      default: return (
        <div className="p-10 text-center text-zinc-400 font-bold uppercase tracking-widest border-2 border-dashed border-zinc-200 rounded-2xl">
          {selectedPrayer} namazı rehberi hazırlanıyor...
        </div>
      );
    }
  };

  return (
    <AnimatePresence>
      {selectedPrayer && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-x-0 bottom-0 h-[80vh] md:h-[75vh] bg-white rounded-t-[2.5rem] z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="relative flex justify-center items-center pt-6 pb-4 border-b border-zinc-100 shrink-0">
              <div className="w-16 h-1.5 bg-zinc-200 rounded-full absolute top-3" />
              <h2 className="text-2xl font-black uppercase italic text-zinc-800">{selectedPrayer} Guide</h2>
              <button onClick={onClose} className="absolute right-6 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors">
                <X size={20} className="text-zinc-600" />
              </button>
            </div>
            
            {/* Alt Dosyaların İçeriği Buraya Basılıyor */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {renderGuide()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}