export type Option = {
  id: string; // "A", "B", "C", "D"
  text: string;
};

export type Question = {
  id: number;
  subject: string;
  topic: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string;
  subjectInfo: {
    icon: string;
    label: string;
    color: string;
  };
  questions: Question[];
};

export const sampleQuizArray: Quiz[] = [
  {
    id: "quiz-logic-01",
    title: "Penalaran Umum & Logika",
    subjectInfo: {
      icon: "Σ",
      label: "Logic & Mathematics",
      color: "bg-purple-100 text-purple-600"
    },
    questions: [
      {
        id: 1,
        subject: "PENGETAHUAN KUANTITATIF",
        topic: "Aritmatika Sosial",
        question: "Sebuah toko memberikan diskon bertingkat. Jika harga awal adalah Rp 200.000, lalu didiskon 20%, kemudian didiskon lagi 10% dari harga setelah diskon pertama, berapa harga akhirnya?",
        options: [
          { id: "A", text: "Rp 140.000" },
          { id: "B", text: "Rp 144.000" },
          { id: "C", text: "Rp 150.000" },
          { id: "D", text: "Rp 160.000" },
        ],
        correctAnswer: "B",
        explanation: "Diskon pertama 20% dari 200.000 = 40.000. Harga menjadi 160.000. Diskon kedua 10% dari 160.000 = 16.000. Harga akhir = 160.000 - 16.000 = 144.000."
      },
      {
        id: 2,
        subject: "PENALARAN UMUM",
        topic: "Logika Deduktif",
        question: "Semua kucing adalah mamalia. Sebagian mamalia pemakan ikan. Maka...",
        options: [
          { id: "A", text: "Semua kucing pemakan ikan" },
          { id: "B", text: "Sebagian kucing pemakan ikan" },
          { id: "C", text: "Tidak ada kesimpulan yang pasti tentang kucing pemakan ikan" },
          { id: "D", text: "Semua mamalia pemakan ikan" },
        ],
        correctAnswer: "C",
        explanation: "Kita tahu sebagian mamalia memakan ikan, namun tidak ada kepastian apakah kucing (meski mamalia) memakan ikan. Oleh karenanya, tidak ada kesimpulan pasti."
      },
      {
        id: 3,
        subject: "PENGETAHUAN KUANTITATIF",
        topic: "Aljabar",
        question: "Jika x + 2y = 10 dan y = 3, berapakah nilai x?",
        options: [
          { id: "A", text: "4" },
          { id: "B", text: "7" },
          { id: "C", text: "5" },
          { id: "D", text: "6" },
        ],
        correctAnswer: "A",
        explanation: "Masukkan y = 3 ke x + 2y = 10 -> x + 2(3) = 10 -> x + 6 = 10 -> x = 4."
      },
      {
        id: 4,
        subject: "PENGETAHUAN KUANTITATIF",
        topic: "Bilangan",
        question: "Manakah dari bilangan berikut yang merupakan bilangan prima?",
        options: [
          { id: "A", text: "21" },
          { id: "B", text: "27" },
          { id: "C", text: "25" },
          { id: "D", text: "31" },
        ],
        correctAnswer: "D",
        explanation: "31 tidak memiliki pembagi selain 1 dan dirinya sendiri."
      },
      {
        id: 5,
        subject: "PENALARAN UMUM",
        topic: "Pola Bilangan",
        question: "Tentukan angka selanjutnya pada deret ini: 2, 5, 10, 17, ...",
        options: [
          { id: "A", text: "24" },
          { id: "B", text: "26" },
          { id: "C", text: "23" },
          { id: "D", text: "25" },
        ],
        correctAnswer: "B",
        explanation: "Selisih antar angka: +3, +5, +7... Selisih selanjutnya adalah +9. Maka 17 + 9 = 26."
      }
    ]
  }
]
