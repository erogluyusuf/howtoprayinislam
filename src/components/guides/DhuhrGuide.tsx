"use client";
import BasePrayerGuide, { Step } from "./BasePrayerGuide";
import VerseHadithBlock from "@/components/islamic/VerseHadithBlock";

export default function DhuhrGuide() {
  return (
    <BasePrayerGuide
      title="Dhuhr Prayer (Öğle)"
      subtitle="4 Sunnah • 4 Fard • 2 Final Sunnah"
      description="The Dhuhr prayer is the midday prayer. It is performed after the sun has passed its zenith."
    >
      <VerseHadithBlock />

      <Step num={1} title="Niyyah (Intention)" desc="Make the intention for the specific part of Dhuhr you are praying (Sunnah or Fard)." />
      <Step num={2} title="Takbir & Qiyam" desc="Say 'Allahu Akbar' to start. Keep your eyes looking at the place of prostration while standing." isRed />
      <Step num={3} title="Ruku (Bowing)" desc="Bow smoothly. Keep your back parallel to the ground and say 'Subhana Rabbiyal Azim' 3 times." />
      <Step num={4} title="Sujud (Prostration)" desc="Prostrate twice per rakat, pausing completely in the sitting position between them." isRed />
      <Step num={5} title="Tashahhud (Middle & Final)" desc="For 4-rakat prayers, sit after the 2nd rakat for the first Tashahhud, and again at the end." />
      <Step num={6} title="Tasleem" desc="Conclude the prayer by turning your face to the right, then left, offering greetings of peace." isRed />
    </BasePrayerGuide>
  );
}