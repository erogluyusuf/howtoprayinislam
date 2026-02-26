"use client";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";

export default function IshaGuide() {
  return (
    <BasePrayerGuide
      title="Isha Prayer (Yatsı)"
      subtitle="4 Sunnah • 4 Fard • 2 Final Sunnah • 3 Witr"
      description="The Isha prayer is the night prayer. It is the final obligatory prayer of the day."
    >
      <VerseHadithBlock />

      <Step num={1} title="Niyyah (Intention)" desc="Make the intention for the specific part of Isha you are praying." />
      <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar'. In the first two rakats of the Fard, recitation is done aloud." isRed />
      <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
      <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
      <Step num={5} title="Tashahhud (Middle & Final)" desc="Sit after the 2nd rakat for the first Tashahhud, and again at the end of the 4th rakat." />
      <Step num={6} title="Witr Prayer" desc="Don't forget the 3 rakats of Witr prayer after completing Isha. Recite the Qunut dua in the 3rd rakat." isRed />
    </BasePrayerGuide>
  );
}