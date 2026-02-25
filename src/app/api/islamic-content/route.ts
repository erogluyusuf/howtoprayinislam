import { NextResponse } from "next/server";
import { localHadiths } from "@/lib/hadiths"; // Oluşturduğumuz dosyayı içe aktardık

export async function GET() {
  try {
    // 📖 AYETİ ÇEKMEYE DEVAM EDİYORUZ (Ücretsiz ve Anahtarsız çalışıyor)
    const verseRes = await fetch(
      "https://api.alquran.cloud/v1/ayah/2:238/editions/quran-uthmani,en.asad,tr.diyanet",
      { next: { revalidate: 86400 } }
    );

    if (!verseRes.ok) throw new Error("Ayet çekilemedi");
    const verseData = await verseRes.json();

    // 🕊 HADİSİ LOKAL LİSTEDEN RASTGELE SEÇİYORUZ
    const randomIndex = Math.floor(Math.random() * localHadiths.length);
    const selectedHadith = localHadiths[randomIndex];

    return NextResponse.json({
      verse: {
        ar: verseData.data[0].text,
        en: verseData.data[1].text,
        tr: verseData.data[2].text,
        reference: "Quran 2:238"
      },
      hadith: selectedHadith // Doğrudan seçilen hadisi gönderiyoruz
    });

  } catch (error: any) {
    console.error("API Hatası:", error.message);
    return NextResponse.json(
      { error: "Islamic content fetch failed", details: error.message },
      { status: 500 }
    );
  }
}