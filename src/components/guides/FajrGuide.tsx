"use client";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";

export default function FajrGuide() {
  return (
    <BasePrayerGuide
      title="Fajr Prayer (Sabah)"
      subtitle="2 Sunnah • 2 Fard"
      description="The Fajr prayer is the dawn prayer. It is highly rewarded to pray it at the beginning of its time."
    >
      <VerseHadithBlock />

      <Step num={1} title="Niyyah (Intention)" desc="Make the intention to pray the 2 rakats Sunnah or 2 rakats Fard of the Fajr prayer." />
      <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar'. For the Fard of Fajr, it is recommended to recite longer Surahs." isRed />
      <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
      <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
      <Step num={5} title="Final Tashahhud" desc="Sit after the 2nd rakat for the final Tashahhud, recite Attahiyat, Salawat, and Rabbana." />
      <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face right, then left, saying 'As-salamu alaykum wa rahmatullah'." isRed />
    </BasePrayerGuide>
  );
}