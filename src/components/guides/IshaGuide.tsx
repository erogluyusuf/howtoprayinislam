export default function IshaGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8 pb-6 border-b border-zinc-200 text-center">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Isha Prayer (Yatsı)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">4 Sunnah • 4 Fard • 2 Sunnah • 3 Witr</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Isha prayer is the final prayer of the day, bringing peace to your heart before you sleep.
        </p>
      </div>

      <div className="space-y-4">
        <Step num={1} title="Niyyah (Intention)" desc="Make your intention for the Isha prayer." />
        <Step num={2} title="Fard Prayer" desc="Perform the 4 rakats of Fard. Similar to Dhuhr and Asr, sit for Tashahhud after the 2nd and 4th rakat." isRed />
        <Step num={3} title="Witr Prayer" desc="After completing the Isha Sunnahs, stand to pray the 3 rakats of Witr, which is highly emphasized." />
        <Step num={4} title="Qunut Supplication" desc="In the 3rd rakat of Witr, before bowing (Ruku), raise your hands, say 'Allahu Akbar', fold them again, and recite Dua Al-Qunut." isRed />
        <Step num={5} title="Final Prostrations" desc="Complete the Witr prayer with the final prostrations." />
        {/* 'end' kelimesi kaldırıldı */}
        <Step num={6} title="Tasleem & Witr" desc="Sit for the final Tashahhud, perform Tasleem, and conclude your daily prayers." isRed />
      </div>
    </div>
  );
}

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