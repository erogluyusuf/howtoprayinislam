import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

// Belirli bir tarih aralığındaki tüm vakitleri getirir
export function getExtendedPrayerData(lat: number, lng: number, daysBefore: number = 15, daysAfter: number = 15) {
  const coords = new Coordinates(lat, lng);
  const params = CalculationMethod.Turkey(); 
  let allPrayers: any[] = [];

  const today = new Date();
  
  // Geçmişten geleceğe döngü
  for (let i = -daysBefore; i <= daysAfter; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    
    const prayerTimes = new PrayerTimes(coords, targetDate, params);
    
    // Her gün için verileri diziye ekliyoruz. 'dateStr' ile gün ayrımı yapacağız.
    const dateStr = targetDate.toISOString().split('T')[0];
    
    allPrayers.push(
      { name: 'Fajr', time: prayerTimes.fajr.toISOString(), dateStr },
      { name: 'Sunrise', time: prayerTimes.sunrise.toISOString(), dateStr },
      { name: 'Dhuhr', time: prayerTimes.dhuhr.toISOString(), dateStr },
      { name: 'Asr', time: prayerTimes.asr.toISOString(), dateStr },
      { name: 'Maghrib', time: prayerTimes.maghrib.toISOString(), dateStr },
      { name: 'Isha', time: prayerTimes.isha.toISOString(), dateStr }
    );
  }
  
  return allPrayers;
}