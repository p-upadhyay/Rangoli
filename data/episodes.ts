export type Song = {
  title: string;
  film: string;
  year: number;
  artists: string;
  mood: string;
};

export const songs: Song[] = [
  { title: "Aap Ki Aankhon Mein Kuch", film: "Ghar", year: 1978, artists: "Kishore Kumar · Lata Mangeshkar", mood: "Shubh Aarambh" },
  { title: "Lag Ja Gale", film: "Woh Kaun Thi?", year: 1964, artists: "Lata Mangeshkar", mood: "Lata Special" },
  { title: "Pal Pal Dil Ke Paas", film: "Blackmail", year: 1973, artists: "Kishore Kumar", mood: "Aaj Ke Kalakaar" },
  { title: "Kahin Door Jab Din Dhal Jaye", film: "Anand", year: 1971, artists: "Mukesh", mood: "Bhoola-Bisra Ratna" },
  { title: "Tere Bina Zindagi Se", film: "Aandhi", year: 1975, artists: "Kishore Kumar · Lata Mangeshkar", mood: "Sada Bahaar" },
  { title: "Rimjhim Gire Saawan", film: "Manzil", year: 1979, artists: "Kishore Kumar", mood: "Mausam Ke Naam" },
  { title: "Zindagi Ek Safar Hai Suhana", film: "Andaz", year: 1971, artists: "Kishore Kumar", mood: "Muskurahat" },
  { title: "Main Zindagi Ka Saath", film: "Hum Dono", year: 1961, artists: "Mohammed Rafi", mood: "Vidaai Geet" }
];

export const memories = [
  ["☂", "Barsaat Ke Geet"],
  ["☕", "Sardi Ki Subah"],
  ["♡", "Papa Ke Pasandida"],
  ["✿", "Lata Special"],
  ["◉", "Kishore & Rafi"],
  ["✒", "Gulzar Subah"],
  ["◼", "Black & White"],
  ["●", "70s Ke Geet"],
  ["🇮🇳", "15 August Special"]
];
