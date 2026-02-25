"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
import { getExtendedPrayerData } from '@/lib/adhan';
import { motion } from 'framer-motion';
import { Sun, Sunrise, Sunset, Moon, CloudSun, MapPin } from 'lucide-react';
import PrayerDrawer from '@/components/PrayerDrawer';

const DAYS_BEFORE = 15;
const DAYS_AFTER = 15;
const TOTAL_DAYS = DAYS_BEFORE + DAYS_AFTER + 1;
const DAY_WIDTH = 3600; 
const TOTAL_WIDTH = TOTAL_DAYS * DAY_WIDTH;


export default function Home() {
  const prayerNamesMap: any = {
    tr: { Fajr: "Sabah", Sunrise: "Güneş", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı", Midnight: "Gece Yarısı" },
    ar: { Fajr: "الفجر", Sunrise: "الشروق", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء", Midnight: "منتصف الليل" }
  };
  function getPrayerTranslation(name: string) {
    if (typeof window === "undefined") return name;
    const lang = navigator.language.split('-')[0];
    const dictionary = prayerNamesMap[lang];
    if (dictionary && dictionary[name]) return dictionary[name];
    return name; 
  }
  const [prayers, setPrayers] = useState<any[]>([]);
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const [centerOffset, setCenterOffset] = useState((DAYS_BEFORE * DAY_WIDTH) + (DAY_WIDTH * 0.5));

  useEffect(() => {
    const data = getExtendedPrayerData(40.77, 29.35, DAYS_BEFORE, DAYS_AFTER); 
    setPrayers(data);
  }, []);

  useEffect(() => {
    if (scrollRef.current && prayers.length > 0) {
      const todayStartPx = DAYS_BEFORE * DAY_WIDTH;
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const percentOfDay = currentMinutes / 1440;
      const timeOffsetPx = DAY_WIDTH * percentOfDay;

      const targetScroll = (todayStartPx + timeOffsetPx) - (scrollRef.current.clientWidth / 2);
      scrollRef.current.scrollLeft = targetScroll;
      setCenterOffset(todayStartPx + timeOffsetPx);
    }
  }, [prayers]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      setCenterOffset(scrollLeft + clientWidth / 2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); 
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const timeMarkers = useMemo(() => {
    const markers = [];
    const totalTicks = TOTAL_DAYS * 24 * 4; 
    for (let i = 0; i <= totalTicks; i++) {
      const isHour = i % 4 === 0;
      const isHalfHour = i % 2 === 0 && !isHour;
      
      const hour = Math.floor((i % (24 * 4)) / 4);
      const minute = (i % 4) * 15;
      const isMidnight = isHour && hour === 0;
      const percentage = (i / totalTicks) * 100; 
      
      markers.push({ isHour, isHalfHour, isMidnight, hour, minute, percentage, index: i });
    }
    return markers;
  }, []);

  const activeDayOffset = Math.floor(centerOffset / DAY_WIDTH) - DAYS_BEFORE;
  const activeDateObj = new Date();
  activeDateObj.setDate(activeDateObj.getDate() + activeDayOffset);
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const str = activeDateObj.toLocaleDateString(navigator.language, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDateStr(str);
  }, [centerOffset]);
  const pixelWithinDay = centerOffset % DAY_WIDTH;
  const minuteWithinDay = Math.floor((pixelWithinDay / DAY_WIDTH) * 1440);
  const centerHours = Math.floor(minuteWithinDay / 60);
  const centerMins = minuteWithinDay % 60;
  const safeHours = centerHours >= 0 ? centerHours : 0;
  const safeMins = centerMins >= 0 ? centerMins : 0;
  const exactTimeStr = `${safeHours.toString().padStart(2, '0')}:${safeMins.toString().padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#212529] font-sans flex flex-col relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto w-full pt-12 px-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 pb-8 shrink-0 relative z-20">
        <div>
          <h1 className="notranslate text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-zinc-900 leading-tight">
            How to pray in Islam?
          </h1>
          <div className="flex items-center gap-2 text-zinc-500 mt-3">
            <MapPin size={18} className="text-emerald-600" />
            <span className="text-sm font-bold uppercase tracking-widest">Darıca, Kocaeli</span>
            <span className="mx-2 text-zinc-300">|</span>
            <span className="text-sm font-bold text-zinc-400 transition-all">{currentDateStr}</span>
          </div>
        </div>
      </div>

      {/* KESİN DAKİKA GÖSTERİCİ (KIRMIZI İMLEÇ / PLAYHEAD) */}
      <div className="absolute left-1/2 top-32 bottom-20 w-[1px] bg-red-500 z-30 pointer-events-none opacity-40 border-l border-dashed border-red-500" />
      <div className="notranslate absolute left-1/2 top-[42%] -mt-2 -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] z-40 pointer-events-none transition-all">
        {exactTimeStr}
      </div>

      {/* SÜRÜKLENEBİLİR TIMELINE ALANI */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto pb-20 select-none hide-scrollbar relative z-10 flex-1 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className="relative flex items-center" style={{ width: `${TOTAL_WIDTH}px`, height: '450px' }}>

          {/* YATAY TIMELINE ANA ÇİZGİSİ */}
          <div className="absolute left-0 w-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none h-20">
            <div className="absolute w-full h-[1px] bg-zinc-300" />
            
            {timeMarkers.map((marker) => {
              const positionPx = (marker.percentage / 100) * TOTAL_WIDTH;
              const distanceToCenter = Math.abs(centerOffset - positionPx);
              
              if (distanceToCenter > 2000) return null;

              const scale = Math.max(1, 1.5 - (distanceToCenter / 200)); 
              const textOpacity = Math.max(0, 1 - (distanceToCenter / 80));
              const showText = textOpacity > 0;

              return (
                <div 
                  key={marker.index} 
                  className="absolute flex flex-col items-center -translate-x-1/2" 
                  style={{ left: `${marker.percentage}%` }}
                >
                  <div 
                    className={`w-[1px] ${marker.isMidnight ? 'bg-red-500' : 'bg-zinc-400'} transition-all duration-75`}
                    style={{ 
                      height: marker.isMidnight ? '24px' : (marker.isHour ? '12px' : (marker.isHalfHour ? '8px' : '4px')),
                      transform: `scaleY(${scale})`,
                      transformOrigin: 'center'
                    }} 
                  />
                  
                  {showText && (
                    <span 
                      className={`notranslate absolute mt-6 font-bold transition-all duration-75 whitespace-nowrap ${marker.isMidnight ? 'text-red-500' : ''}`}
                      style={{ 
                        fontSize: `${9 * scale}px`,
                        opacity: textOpacity, 
                        color: marker.isMidnight ? '#ef4444' : (marker.isHour ? '#000' : '#71717a') 
                      }}
                    >
                      {marker.isMidnight ? 'NEW DAY' : `${marker.hour.toString().padStart(2, '0')}:${marker.minute.toString().padStart(2, '0')}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* VAKİTLERİN DAĞILIMI */}
          {prayers.map((prayer, idx) => {
            const pDate = new Date(prayer.time);
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - DAYS_BEFORE);
            startDate.setHours(0, 0, 0, 0);
            
            const totalMinutesFromStart = (pDate.getTime() - startDate.getTime()) / (1000 * 60);
            const totalTimelineMinutes = TOTAL_DAYS * 24 * 60;
            const pPercent = (totalMinutesFromStart / totalTimelineMinutes) * 100;
            
            if (pPercent < 0 || pPercent > 100) return null;

            const positionPx = (pPercent / 100) * TOTAL_WIDTH;
            const distanceToCenter = Math.abs(centerOffset - positionPx);
            if (distanceToCenter > 1500) return null;

            const dynamicScale = Math.max(1, 1.4 - (distanceToCenter / 500));
            const dynamicOpacity = Math.max(0.4, 1 - (distanceToCenter / 600));

            const dailyIdx = idx % 6; 
            const isTop = dailyIdx % 2 === 0;

            return (
              <div 
                key={idx} 
                className="absolute top-1/2 pointer-events-none transition-all duration-75 ease-out" 
                style={{ 
                  left: `${pPercent}%`,
                  transform: `scale(${dynamicScale})`,
                  opacity: dynamicOpacity,
                  zIndex: distanceToCenter < 200 ? 50 : 10 
                }}
              >
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#f8f9fa] shadow-sm" />

                {isTop ? (
                  <div className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center pb-[50px]">
                    <div className="absolute bottom-0 w-[2px] h-[50px] border-l-2 border-dashed border-zinc-300" />
                    <motion.div
                      whileHover={{ y: -5 }}
                      onClick={() => { if (!isDragging) setSelectedPrayer(prayer.name); }}
                      className="flex flex-col items-center cursor-pointer group pointer-events-auto"
                    >
                      <div className="mb-4 w-40 text-center pointer-events-none">
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">
                          {pDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {pDate.getHours()}:{pDate.getMinutes().toString().padStart(2,'0')}
                        </p>
                        <h3 className="text-xl font-black uppercase italic leading-none text-zinc-800">
                          {getPrayerTranslation(prayer.name)}
                            </h3>
                      </div>
                      <div className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white pointer-events-none">
                        {getIcon(prayer.name)}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="absolute top-0 -translate-x-1/2 flex flex-col items-center pt-[50px]">
                    <div className="absolute top-0 w-[2px] h-[50px] border-l-2 border-dashed border-zinc-300" />
                    <motion.div
                      whileHover={{ y: 5 }}
                      onClick={() => { if (!isDragging) setSelectedPrayer(prayer.name); }}
                      className="flex flex-col items-center cursor-pointer group pointer-events-auto"
                    >
                      <div className="w-14 h-14 bg-[#E63946] text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white pointer-events-none">
                        {getIcon(prayer.name)}
                      </div>
                      <div className="mt-4 w-40 text-center pointer-events-none">
                        <h3 className="text-xl font-black uppercase italic leading-none text-zinc-800">{getPrayerTranslation(prayer.name)}</h3>
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mt-1">
                          {pDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {pDate.getHours()}:{pDate.getMinutes().toString().padStart(2,'0')}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* YENİ VE TEMİZ ÇEKMECE BİLEŞENİ */}
      <PrayerDrawer 
        selectedPrayer={selectedPrayer} 
        onClose={() => setSelectedPrayer(null)} 
      />

    </main>
  );
}

function getIcon(name: string) {
  switch (name) {
    case 'Fajr': return <Sunrise size={24} />;
    case 'Dhuhr': return <Sun size={24} />;
    case 'Asr': return <CloudSun size={24} />;
    case 'Maghrib': return <Sunset size={24} />;
    case 'Isha': return <Moon size={24} />;
    default: return <Sun size={24} />;
  }
}