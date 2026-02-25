// Sadece en temel dilleri (veya senin özel olarak düzeltmek istediklerini) buraya yazıyoruz.
// Geri kalan her şeyi Google Translate otomatik halledecek.
export const prayerNamesMap: any = {
  tr: { Fajr: "Sabah", Dhuhr: "Öğle", Asr: "İkindi", Maghrib: "Akşam", Isha: "Yatsı", Sunrise: "Güneş", Midnight: "Gece Yarısı" },
  en: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha", Sunrise: "Sunrise", Midnight: "Midnight" },
  ar: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء", Sunrise: "الشروق", Midnight: "منتصف الليل" },
};

export function getPrayerTranslation(name: string) {
  // Client-side'da tarayıcı dilini alıyoruz
  if (typeof window === "undefined") return name;
  
  const lang = navigator.language.split('-')[0];
  const dictionary = prayerNamesMap[lang];

  // Eğer yukarıdaki haritada dil varsa çevir, yoksa Google Translate'e bırakmak için orijinal ismi dön.
  if (dictionary && dictionary[name]) {
    return dictionary[name];
  }
  
  return name; 
}