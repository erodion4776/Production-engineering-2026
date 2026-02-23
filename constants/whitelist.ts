
export const WHITELIST_START_TIME = "2026-02-22T16:47:59-08:00"; // Hardcoded Start Time

export const WHITELIST = [
  { name: "Albert Joy", matNo: "ENG2204325" },
  { name: "Abdul Imuekheme", matNo: "ENG2204342" },
  { name: "Jefffrey Agadaga Chingwese", matNo: "ENG2204321" },
  { name: "Daniel Louis Chidera", matNo: "ENG2204345" },
  { name: "Oghenenovo Endurance", matNo: "ENG2204351" },
  { name: "favour Martho Omonigho", matNo: "ENG2264358" },
  { name: "Amabiwendi God's favour", matNo: "ENG2204327" },
  { name: "Adelekeke Divine", matNo: "ENG2204320" },
  { name: "Emmanuel Okwoge", matNo: "ENG2204355" },
  { name: "Daniel Yusuf Teslim", matNo: "ENG2204331" },
  { name: "Iredogosa Erhabor", matNo: "ENG2204335" },
  { name: "Osakpamwan Divine", matNo: "ENG2204360" },
  { name: "Brattcie Eunice", matNo: "ENG2204330" },
  { name: "Joshua - Aluko Favour", matNo: "ENG2204344" },
  { name: "Eromosele Clinton", matNo: "ENG2204336" },
  { name: "Caleb Iwinosus Enofe", matNo: "ENG2204334" },
  { name: "Ediale Prince", matNo: "ENG2204332" },
  { name: "Ikhade Benjamin", matNo: "ENG2204340" },
  { name: "Imade Osamudiomen", matNo: "ENG2204341" },
  { name: "Eguenum Peter Ebube", matNo: "ENG2204333" },
  { name: "Igbinomwanhia Emmanuel Osarukpagbon", matNo: "ENG2204339" },
  { name: "Osamede Thelma Amadasun", matNo: "ENG2204328" },
  { name: "OLAWALE AMINOLA RILLWAN", matNo: "ENG2204357" },
  { name: "Akingbaso Feyisayo", matNo: "ENG2204324" },
  { name: "Ero Odion", matNo: "ENG1427666" }
];

export const isStudentWhitelisted = (name: string, matNo: string): boolean => {
  const now = new Date();
  const startTime = new Date(WHITELIST_START_TIME);
  const expiryTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

  if (now < startTime || now > expiryTime) return false;

  return WHITELIST.some(
    s => s.name.toLowerCase().trim() === name.toLowerCase().trim() && 
         s.matNo.toUpperCase().trim() === matNo.toUpperCase().trim()
  );
};
