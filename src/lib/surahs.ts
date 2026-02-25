export type Lang = "en" | "tr" | "ar";

export const shortSurahs = [
  {
    id: "duha",
    name: { en: "Ad-Duhaa", tr: "Duha", ar: "الضحى" },
    arabic: "وَالضُّحَىٰ ﴿١﴾ وَاللَّيْلِ إِذَا سَجَىٰ ﴿٢﴾ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ﴿٣﴾...",
    meaning: {
      en: "By the morning sunlight, and the night when it falls still! Your Lord has not abandoned you, nor has He become hateful...",
      tr: "Kuşluk vaktine andolsun, karanlığı çöktüğü vakit geceye andolsun ki, Rabbin seni terk etmedi, sana darılmadı da...",
    }
  },
  {
    id: "inshirah",
    name: { en: "Ash-Sharh", tr: "İnşirah", ar: "الشرح" },
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ﴿١﴾ وَوَضَعْنَا عَنكَ وِزْرَكَ ﴿٢﴾...",
    meaning: {
      en: "Did We not expand for you, [O Muhammad], your breast? And We removed from you your burden...",
      tr: "Biz senin göğsünü açıp genişletmedik mi? Belini büken yükünü üzerinden kaldırmadık mı?...",
    }
  },
  {
    id: "tin",
    name: { en: "At-Tin", tr: "Tin", ar: "التين" },
    arabic: "وَالتِّينِ وَالزَّيْتُونِ ﴿١﴾ وَطُورِ سِينِينَ ﴿٢﴾ وَهَٰذَا الْبَلَدِ الْأَمِينِ ﴿٣﴾...",
    meaning: {
      en: "By the fig and the olive, and [by] Mount Sinai, and [by] this secure city...",
      tr: "İncire, zeytine, Sina Dağı'na ve bu güvenli kente andolsun ki...",
    }
  },
  {
    id: "alak",
    name: { en: "Al-Alaq", tr: "Alak", ar: "العلق" },
    arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ ﴿٢﴾ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ﴿٣﴾...",
    meaning: {
      en: "Recite in the name of your Lord who created, created man from a clinging substance...",
      tr: "Yaratan Rabbinin adıyla oku! İnsanı bir alaktan yarattı. Oku, Rabbin en cömerttir...",
    }
  },
  {
    id: "qadr",
    name: { en: "Al-Qadr", tr: "Kadir", ar: "القدر" },
    arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ﴿١﴾ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ﴿٢﴾...",
    meaning: {
      en: "Indeed, We sent it down during the Night of Decree. And what can make you know what is the Night of Decree?",
      tr: "Şüphesiz onu Kadir Gecesi'nde indirdik. Kadir Gecesi'nin ne olduğunu sen ne bileceksin?",
    }
  },
  {
    id: "bayyina",
    name: { en: "Al-Bayyina", tr: "Beyyine", ar: "البينة" },
    arabic: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ ﴿١﴾...",
    meaning: {
      en: "Those who disbelieved among the People of the Scripture and the polytheists were not going to depart from disbelief until there came to them clear evidence...",
      tr: "Kitap Ehli ve müşriklerden inkâr edenler, kendilerine apaçık bir delil gelinceye kadar ayrılmayacaklardı...",
    }
  },
  {
    id: "zilzal",
    name: { en: "Az-Zilzal", tr: "Zilzal", ar: "الزلزلة" },
    arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ﴿١﴾ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ﴿٢﴾...",
    meaning: {
      en: "When the earth is shaken with its [final] earthquake and the earth discharges its burdens...",
      tr: "Yeryüzü, dehşetli sarsıntısını yaşadığında ve yeryüzü yüklerini çıkardığında...",
    }
  },
  {
    id: "adiyat",
    name: { en: "Al-Adiyat", tr: "Adiyat", ar: "العاديات" },
    arabic: "وَالْعَادِيَاتِ ضَبْحًا ﴿١﴾ فَالْمُورِيَاتِ قَدْحًا ﴿٢﴾...",
    meaning: {
      en: "By the racers, panting, striking sparks of fire, raiding at dawn...",
      tr: "Nefes nefese koşan atlara andolsun, şafakta saldıranlara, kıvılcım çıkaranlara...",
    }
  },
  {
    id: "qaria",
    name: { en: "Al-Qaria", tr: "Karia", ar: "القارعة" },
    arabic: "الْقَارِعَةُ ﴿١﴾ مَا الْقَارِعَةُ ﴿٢﴾...",
    meaning: {
      en: "The Striking Calamity! What is the Striking Calamity?",
      tr: "Çarpan felaket! Çarpan felaket nedir?",
    }
  },
  {
    id: "takasur",
    name: { en: "At-Takasur", tr: "Tekasur", ar: "التكاثر" },
    arabic: "أَلْهَاكُمُ التَّكَاثُرُ ﴿١﴾ حَتَّى زُرْتُمُ الْمَقَابِرَ ﴿٢﴾...",
    meaning: {
      en: "Competition in [worldly] increase diverts you until you visit the graves...",
      tr: "Çoğalma hırsı sizi meşgul etti; ta ki mezarları ziyaret edinceye kadar...",
    }
  },
  {
    id: "asr",
    name: { en: "Al-Asr", tr: "Asr", ar: "العصر" },
    arabic: "وَالْعَصْرِ ﴿١﴾ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ﴿٢﴾...",
    meaning: {
      en: "By time, indeed mankind is in loss, except those who believe and do righteous deeds...",
      tr: "Zamana andolsun, insan gerçekten ziyandadır; iman edip salih amel işleyenler hariç...",
    }
  },
  {
    id: "humaza",
    name: { en: "Al-Humaza", tr: "Humaza", ar: "الهمزة" },
    arabic: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُمَزَةٍ ﴿١﴾ الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ ﴿٢﴾...",
    meaning: {
      en: "Woe to every scorner and mocker, who collects wealth and counts it...",
      tr: "Her dilenci ve kötü söz söyleyene vay! Mal toplayan ve sayıp döken kimseye vay...",
    }
  },
  {
    id: "fil",
    name: { en: "Al-Fil", tr: "Fil", ar: "الفيل" },
    arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ﴿١﴾...",
    meaning: {
      en: "Have you not seen how your Lord dealt with the companions of the elephant?",
      tr: "Rabbinin Fil sahiplerine ne yaptığını görmedin mi?",
    }
  },
  {
    id: "quraish",
    name: { en: "Quraish", tr: "Kureyş", ar: "قريش" },
    arabic: "لِإِيلَافِ قُرَيْشٍ ﴿١﴾ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ﴿٢﴾...",
    meaning: {
      en: "For the accustomed security of the Quraysh, their accustomed journey in winter and summer...",
      tr: "Kureyşin alışık olduğu güven için, kış ve yaz yolculuklarına alışmaları için...",
    }
  },
  {
    id: "maun",
    name: { en: "Al-Ma'un", tr: "Ma’un", ar: "الماعون" },
    arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ﴿١﴾ فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ﴿٢﴾...",
    meaning: {
      en: "Have you seen the one who denies the Recompense? That is the one who drives away the orphan...",
      tr: "Din gününü inkâr edeni gördün mü? İşte yetimi iten odur...",
    }
  },
  {
    id: "kawthar",
    name: { en: "Al-Kawthar", tr: "Kevser", ar: "الكوثر" },
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ﴿١﴾ فَصَلِّ لِرَبِّكَ وَانْحَرْ ﴿٢﴾...",
    meaning: {
      en: "Indeed, We have granted you Al-Kawthar. So pray to your Lord and sacrifice...",
      tr: "Gerçekten sana Kevser’i verdik. Öyleyse Rabbin için namaz kıl ve kurban kes...",
    }
  },
  {
    id: "kafirun",
    name: { en: "Al-Kafirun", tr: "Kafirun", ar: "الكافرون" },
    arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾ لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾...",
    meaning: {
      en: "Say, 'O disbelievers, I do not worship what you worship...' ",
      tr: "De ki: Ey inkârcılar! Ben sizin taptıklarınıza tapmam...",
    }
  },
  {
    id: "nasr",
    name: { en: "An-Nasr", tr: "Nasr", ar: "النصر" },
    arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ﴿١﴾...",
    meaning: {
      en: "When the victory of Allah has come and the conquest...",
      tr: "Allah’ın yardımı ve fetih geldiğinde...",
    }
  },
  {
    id: "lail",
    name: { en: "Al-Masad", tr: "Tebbet / Mesed", ar: "المسد" },
    arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ﴿١﴾...",
    meaning: {
      en: "May the hands of Abu Lahab be ruined, and ruined is he...",
      tr: "Ebu Leheb’in elleri felakete uğrasın, o da helak olsun...",
    }
  },
  {
    id: "ikhlas",
    name: { en: "Al-Ikhlas", tr: "İhlas", ar: "الإخلاص" },
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾...",
    meaning: {
      en: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge...'",
      tr: "De ki: O Allah’tır, birdir, Allah, her şeyin sığınağıdır...",
    }
  },
  {
    id: "falak",
    name: { en: "Al-Falaq", tr: "Felak", ar: "الفلق" },
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾...",
    meaning: {
      en: "Say, 'I seek refuge in the Lord of daybreak, from the evil of what He created...' ",
      tr: "De ki: Sığınırım fecrin Rabbine, yarattıklarının şerrinden...",
    }
  },
  {
    id: "nas",
    name: { en: "An-Nas", tr: "Nas", ar: "الناس" },
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٢﴾...",
    meaning: {
      en: "Say, 'I seek refuge in the Lord of mankind, from the evil of the whisperer...' ",
      tr: "De ki: İnsanların Rabbine sığınırım, sinsi vesvesecinin şerrinden...",
    }
  }
];