import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SURAH_META: Record<number, { id: string; ar: string; en: string }> = {
  93: { id: "duha", ar: "الضحى", en: "Ad-Duhaa" },
  94: { id: "inshirah", ar: "الشرح", en: "Ash-Sharh" },
  95: { id: "tin", ar: "التين", en: "At-Tin" },
  96: { id: "alaq", ar: "العلق", en: "Al-Alaq" },
  97: { id: "qadr", ar: "القدر", en: "Al-Qadr" },
  98: { id: "bayyinah", ar: "البينة", en: "Al-Bayyinah" },
  99: { id: "zalzalah", ar: "الزلزلة", en: "Az-Zalzalah" },
  100: { id: "adiyat", ar: "العاديات", en: "Al-Adiyat" },
  101: { id: "qariah", ar: "القارعة", en: "Al-Qariah" },
  102: { id: "takathur", ar: "التكاثر", en: "At-Takathur" },
  103: { id: "asr", ar: "العصر", en: "Al-Asr" },
  104: { id: "humazah", ar: "الهمزة", en: "Al-Humazah" },
  105: { id: "fil", ar: "الفيل", en: "Al-Fil" },
  106: { id: "quraysh", ar: "قريش", en: "Quraysh" },
  107: { id: "maun", ar: "الماعون", en: "Al-Ma'un" },
  108: { id: "kawthar", ar: "الكوثر", en: "Al-Kawthar" },
  109: { id: "kafirun", ar: "الكافرون", en: "Al-Kafirun" },
  110: { id: "nasr", ar: "النصر", en: "An-Nasr" },
  111: { id: "masad", ar: "المسد", en: "Al-Masad" },
  112: { id: "ikhlas", ar: "الإخلاص", en: "Al-Ikhlas" },
  113: { id: "falaq", ar: "الفلق", en: "Al-Falaq" },
  114: { id: "nas", ar: "الناس", en: "An-Nas" }
};

function parseSurahs(xmlString: string) {
  const surahs: Record<number, string[]> = {};
  for (let i = 93; i <= 114; i++) {
    const suraRegex = new RegExp(`<sura index="${i}"[^>]*>([\\s\\S]*?)<\\/sura>`);
    const match = xmlString.match(suraRegex);
    if (match) {
      const ayas: string[] = [];
      const ayaRegex = /<aya index="\d+" text="([^"]+)"\/>/g;
      let ayaMatch;
      while ((ayaMatch = ayaRegex.exec(match[1])) !== null) {
        ayas.push(ayaMatch[1]);
      }
      surahs[i] = ayas;
    }
  }
  return surahs;
}

// Bozuk karakterleri temizleyen yardımcı fonksiyon
function cleanText(text: string) {
  if (!text) return "";
  return text.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const quranDir = path.join(process.cwd(), "src/lib/quran");
    const files = fs.readdirSync(quranDir);

    let targetFile = files.find(f => f.startsWith(`${lang}.`));
    if (!targetFile) {
      targetFile = files.find(f => f.startsWith("en."));
    }

    // DİKKAT: Jalalayn tefsiri yerine saf Kur'an olan muyassar veya ar.quran'ı önceliklendiriyoruz
    const arFile = files.find(f => f.startsWith("ar.muyassar") || f.startsWith("ar.quran")) || files.find(f => f.startsWith("ar."));

    if (!targetFile || !arFile) {
      return NextResponse.json({ error: "Gerekli XML dosyaları bulunamadı." }, { status: 404 });
    }

    const transXml = fs.readFileSync(path.join(quranDir, targetFile), "utf-8");
    const arXml = fs.readFileSync(path.join(quranDir, arFile), "utf-8");

    const transData = parseSurahs(transXml);
    const arData = parseSurahs(arXml);

    const result = [];

    for (let i = 93; i <= 114; i++) {
      if (!arData[i] || !transData[i]) continue;

      const verses = [];
      const totalAyahs = Math.max(arData[i].length, transData[i].length);

      // Her ayeti kendi numarasıyla bir obje olarak diziye ekliyoruz
      for (let j = 0; j < totalAyahs; j++) {
        verses.push({
          number: j + 1,
          ar: cleanText(arData[i][j]),
          meaning: cleanText(transData[i][j])
        });
      }

      result.push({
        id: SURAH_META[i].id,
        name: {
          ar: SURAH_META[i].ar,
          local: SURAH_META[i].en
        },
        verses: verses // Artık tek bir string değil, ayetler listesi gönderiyoruz
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: "Sunucu hatası", details: error.message }, { status: 500 });
  }
}