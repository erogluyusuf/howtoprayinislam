export default function DhuhrGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8 pb-6 border-b border-zinc-200 text-center">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Dhuhr Prayer (Öğle)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">4 Sunnah • 4 Fard • 2 Sunnah</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Dhuhr prayer is performed just after the sun has passed its zenith. It acts as a midday spiritual reset.
        </p>
      </div>

      <div className="space-y-4">
        <Step num={1} title="Niyyah (Intention)" desc="Face the Qiblah and formulate the intention in your heart for the Dhuhr prayer." />
        <Step num={2} title="Takbir & Qiyam" desc="Raise your hands and say 'Allahu Akbar'. Stand quietly and recite Surah Al-Fatiha." isRed />
        <Step num={3} title="Ruku (Bowing)" desc="Bow with a straight back, hands on knees, and recite 'Subhana Rabbiyal Azim' 3 times." />
        <Step num={4} title="Sujud (Prostration)" desc="Go down in prostration. Recite 'Subhana Rabbiyal A'la' 3 times. Sit briefly, then prostrate again." isRed />
        <Step num={5} title="Middle Sitting (Tashahhud)" desc="After 2 rakats, sit and recite the first part of Tashahhud. Then stand up for the remaining rakats." />
        <Step num={6} title="Final Sitting & Salam" desc="In the last rakat, sit to recite the full Tashahhud, Salawat, and end by turning your head right and left with Salam." isRed />
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