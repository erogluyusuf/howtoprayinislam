"use client";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";

export default function MaghribGuide() {
  return (
    <BasePrayerGuide
      title="Maghrib Prayer (Akşam)"
      subtitle="3 Fard • 2 Sunnah"
      description="The Maghrib prayer is the sunset prayer. The time for this prayer is relatively short, so it should be prayed promptly."
    >
      <VerseHadithBlock />

      <Step num={1} title="Niyyah (Intention)" desc="Make the intention to pray the 3 rakats Fard or 2 rakats Sunnah of the Maghrib prayer." />
      <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar'. In the first two rakats of the Fard, recitation is done aloud." isRed />
      <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
      <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
      <Step num={5} title="Tashahhud (Middle & Final)" desc="Sit after the 2nd rakat for the first Tashahhud, and again at the end of the 3rd rakat." />
      <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face right, then left, saying 'As-salamu alaykum wa rahmatullah'." isRed />
    </BasePrayerGuide>
  );
}