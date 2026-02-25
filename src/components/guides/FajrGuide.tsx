export default function FajrGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Vakit Başlığı ve Rekat Bilgisi */}
      <div className="mb-8 pb-6 border-b border-zinc-200 text-center">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Fajr Prayer (Sabah)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">2 Sunnah • 2 Fard</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Fajr prayer is the dawn prayer. It is highly rewarded as it starts your day with the remembrance of Allah.
        </p>
      </div>

      {/* Adımlar */}
      <div className="space-y-4">
        <Step num={1} title="Niyyah (Intention)" desc="Stand facing the Qiblah. Silently make the intention in your heart to perform the Fajr prayer." />
        <Step num={2} title="Takbiratul Ihram" desc="Raise your hands to your ears and say 'Allahu Akbar' (God is the greatest)." isRed />
        <Step num={3} title="Qiyam (Standing)" desc="Place your right hand over your left on your chest. Recite Surah Al-Fatiha, followed by another short Surah." />
        <Step num={4} title="Ruku (Bowing)" desc="Bow down with your hands on your knees. Say 'Subhana Rabbiyal Azim' (Glory be to my Lord the Supreme) 3 times." isRed />
        <Step num={5} title="Sujud (Prostration)" desc="Prostrate on the ground touching your forehead, nose, both hands, knees, and toes to the floor. Say 'Subhana Rabbiyal A'la' 3 times." />
        <Step num={6} title="Tashahhud & Tasleem" desc="After the final rakat, sit and recite the Tashahhud and Salawat. Then turn your head to the right and left, saying 'Assalamu alaikum wa rahmatullah'." isRed />
      </div>
    </div>
  );
}

// Tasarımı kolaylaştıran yardımcı bileşen
const Step = ({ num, title, desc, isRed }: { num: number, title: string, desc: string, isRed?: boolean }) => (
  <div className="flex gap-4 items-start p-5 bg-[#f8f9fa] rounded-2xl border border-zinc-100 transition-all hover:border-zinc-300 hover:shadow-sm">
    <div className={`w-12 h-12 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-md ${isRed ? 'bg-[#E63946]' : 'bg-zinc-900'}`}>
      {num}
    </div>
    <div className="pt-1">
      <h3 className="text-lg font-bold mb-1 text-zinc-800">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);