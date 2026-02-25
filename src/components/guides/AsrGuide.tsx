export default function AsrGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8 pb-6 border-b border-zinc-200 text-center">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Asr Prayer (İkindi)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">4 Sunnah • 4 Fard</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Asr prayer is the mid-afternoon prayer. The Quran places special emphasis on safeguarding this specific prayer.
        </p>
      </div>

      <div className="space-y-4">
        <Step num={1} title="Niyyah (Intention)" desc="Make the intention to pray the 4 rakats of the Asr prayer." />
        <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar' to start. Keep your eyes looking at the place of prostration while standing." isRed />
        <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
        <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
        <Step num={5} title="Tashahhud (Middle & Final)" desc="Remember to sit after the 2nd rakat for the first Tashahhud, and again at the end of the 4th rakat." />
        <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face to the right, then left, offering greetings of peace." isRed />
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