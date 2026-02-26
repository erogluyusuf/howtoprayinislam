"use client";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";

export default function AsrGuide() {
  return (
    <BasePrayerGuide
      title="Asr Prayer (İkindi)"
      subtitle="4 Sunnah • 4 Fard"
      description="The Asr prayer is the mid-afternoon prayer. The Quran places special emphasis on safeguarding this specific prayer."
    >
      {/* Sabit Hadis Alanı */}
      <VerseHadithBlock />

      {/* SADECE BU NAMAZA ÖZGÜ ADIMLAR */}
      <Step num={1} title="Niyyah (Intention)" desc="Make the intention to pray the 4 rakats of the Asr prayer." />
      <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar' to start. Keep your eyes looking at the place of prostration while standing." isRed />
      <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
      <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
      <Step num={5} title="Tashahhud (Middle & Final)" desc="Remember to sit after the 2nd rakat for the first Tashahhud, and again at the end of the 4th rakat." />
      <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face to the right, then left, offering greetings of peace." isRed />
    </BasePrayerGuide>
  );
}