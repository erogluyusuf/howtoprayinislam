export default function MaghribGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8 pb-6 border-b border-zinc-200 text-center">
        <h3 className="text-3xl font-black uppercase italic text-zinc-800">Maghrib Prayer (Akşam)</h3>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mt-2">3 Fard • 2 Sunnah</p>
        <p className="text-zinc-500 mt-4 text-sm max-w-lg mx-auto">
          The Maghrib prayer starts immediately after sunset. It is a time to express gratitude for the completed day.
        </p>
      </div>

      <div className="space-y-4">
        <Step num={1} title="Niyyah (Intention)" desc="Make intention for Maghrib. Note that the Fard (obligatory) part is performed first." />
        <Step num={2} title="Loud Recitation (For Men)" desc="If praying in congregation, the Imam recites the Quran aloud during the first two rakats." isRed />
        <Step num={3} title="Ruku & Sujud" desc="Perform standard bowing and the two prostrations with calmness and focus." />
        <Step num={4} title="Middle Sitting (2nd Rakat)" desc="Sit after the 2nd rakat for Tashahhud, then stand up for the 3rd and final Fard rakat." isRed />
        <Step num={5} title="Final Sitting (3rd Rakat)" desc="After the 3rd rakat's prostrations, sit for the final Tashahhud, Salawat, and Dua." />
        {/* Hata buradaydı, 'end' kelimesi kaldırıldı 👇 */}
        <Step num={6} title="Tasleem" desc="End the Fard prayer with Salam, then stand to perform the 2 rakats of Sunnah individually." isRed />
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