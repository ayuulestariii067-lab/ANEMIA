export interface Flashcard {
  id: string;
  category: 'Gejala & Ciri' | 'Nutrisi & Makanan' | 'Mitos vs Fakta' | 'Tablet Tambah Darah' | 'Tips Remaja';
  title: string;
  subtitle: string;
  frontContent: string;
  frontIcon: string;
  backContent: string;
  keyFact: string;
  actionTip: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  badge: string;
  hint?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  type: 'heme' | 'non-heme' | 'enhancer' | 'inhibitor';
  ironContent: number; // in mg per standard portion
  portion: string;
  vitCContent?: number; // mg
  icon: string;
  description: string;
  badgeText: string;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Gejala & Ciri',
    title: 'Apa itu 5L yang Sering Bikin Mager?',
    subtitle: 'Tanda klasik sel tubuh kelaparan oksigen',
    frontContent: 'Pernah merasa capek terus-menerus padahal nggak banyak olahraga? Kenali sindrom 5L yang jadi sinyal awal anemia pada remaja.',
    frontIcon: 'BatteryLow',
    backContent: '5L adalah: Lemah, Letih, Lesu, Lelah, dan Lalai (sulit konsentrasi/mudah lupa). Terjadi karena kadar hemoglobin (Hb) darah rendah, sehingga oksigen yang dikirim ke otak dan otot tidak mencukupi.',
    keyFact: 'Lebih dari 32% remaja di Indonesia mengalami anemia defisiensi zat besi tanpa disadari!',
    actionTip: 'Jika kamu sering merasa 5L saat belajar atau di kelas, segera cek kadar Hb di Puskesmas atau ruang UKS.'
  },
  {
    id: 'fc-2',
    category: 'Mitos vs Fakta',
    title: 'Darah Rendah = Kurang Darah?',
    subtitle: 'Dua kondisi yang sering tertukar padahal berbeda total',
    frontContent: 'Banyak orang bilang: "Lagi pusing nih, darah rendah kumat, harus makan daging kambing!". Apakah hipotensi sama dengan anemia?',
    frontIcon: 'HelpCircle',
    backContent: 'MITOS BESAR! Darah Rendah (Hipotensi) adalah tekanan pompa aliran darah di pembuluh (misal <90/60 mmHg). Sedangkan Kurang Darah (Anemia) adalah kekurangan sel darah merah atau kadar Hemoglobin (<12 g/dL). Seseorang bisa punya tekanan darah normal tapi ternyata anemia!',
    keyFact: 'Makan daging kambing tidak otomatis menyembuhkan hipotensi, tapi kandungan zat besinya memang baik untuk anemia.',
    actionTip: 'Ukur tensi darah dengan tensimeter, tapi pastikan cek Hb melalui tes darah tusuk jari/laboratorium.'
  },
  {
    id: 'fc-3',
    category: 'Nutrisi & Makanan',
    title: 'Zat Besi Heme vs Non-Heme',
    subtitle: 'Ternyata tubuh kita pilih-pilih dalam menyerap zat besi',
    frontContent: 'Tahukah kamu bahwa zat besi dari ayam atau daging sapi diserap jauh lebih cepat dibanding zat besi dari bayam?',
    frontIcon: 'Beef',
    backContent: 'Zat Besi Heme berasal dari sumber hewani (hati ayam, daging sapi, ikan, telur) dengan daya serap 20-30%. Sedangkan Zat Besi Non-Heme berasal dari tumbuhan (bayam, tempe, tahu, kacang) dengan daya serap hanya 1-10% dan mudah diganggu zat lain.',
    keyFact: '1 potong hati ayam mengandung zat besi setara dengan hampir 3 mangkuk besar bayam matang!',
    actionTip: 'Gabungkan sayuran hijau dengan lauk hewani agar penyerapan zat besi non-heme meningkat drastis.'
  },
  {
    id: 'fc-4',
    category: 'Nutrisi & Makanan',
    title: 'Sahabat Sejati Zat Besi: Vitamin C',
    subtitle: 'The Ultimate Booster Pengangkut Oksigen',
    frontContent: 'Mengapa dokter dan ahli gizi menyarankan makan buah jeruk atau jambu biji berbarengan dengan makanan kaya zat besi?',
    frontIcon: 'Citrus',
    backContent: 'FAKTA ILMIAH! Vitamin C mengubah zat besi feri (Fe3+) menjadi fero (Fe2+) yang jauh lebih mudah larut dan diserap oleh dinding usus halus kita. Penyerapan zat besi nabati bisa melonjak hingga 3-4 kali lipat!',
    keyFact: 'Jambu biji merah mengandung vitamin C 4x lipat lebih tinggi dari buah jeruk manis.',
    actionTip: 'Jadikan buah segar (jeruk, jambu, pepaya, stroberi) sebagai camilan penutup sehabis makan siang.'
  },
  {
    id: 'fc-5',
    category: 'Nutrisi & Makanan',
    title: 'Musuh Bebuyutan: Minum Es Teh Sehabis Makan',
    subtitle: 'Kebiasaan nongkrong yang bikin zat besi terbuang sia-sia',
    frontContent: 'Hobi pesan "Es Teh Manis" setiap makan bakso, pecel lele, atau soto? Hati-hati, kebiasaan ini bikin zat besi ambyar!',
    frontIcon: 'Coffee',
    backContent: 'Teh dan kopi mengandung Tanin dan Polifenol, sedangkan susu mengandung Kalsium tinggi yang mengikat zat besi membentuk senyawa tak larut. Akibatnya, hingga 60-80% zat besi dalam makanan gagal diserap tubuh dan langsung terbuang!',
    keyFact: 'Minum teh saat makan bisa memangkas penyerapan zat besi makanan hingga 64%.',
    actionTip: 'Beri jeda minimal 1-2 jam setelah makan jika ingin minum teh, kopi, atau susu. Utamakan air putih saat makan.'
  },
  {
    id: 'fc-6',
    category: 'Tablet Tambah Darah',
    title: 'Aturan Emas Minum TTD Rematri',
    subtitle: 'Program resmi Kemenkes RI untuk remaja putri berprestasi',
    frontContent: 'Berapa kali sebenarnya remaja putri harus minum Tablet Tambah Darah (TTD)? Dan kapan waktu yang paling tepat?',
    frontIcon: 'Pill',
    backContent: 'Minum 1 TABLET SETIAP MINGGU (1x seminggu) sepanjang tahun, dan 1 tablet per hari selama masa menstruasi. Waktu terbaik: Malam hari setelah makan sebelum tidur untuk menghindari rasa mual ringan.',
    keyFact: 'TTD mengandung 60 mg zat besi elemental + 400 mcg asam folat yang penting untuk regenerasi sel.',
    actionTip: 'Tentukan hari rutin (misal: "Jumat Cantik / Jumat Sehat") bersama teman-teman sekolah agar tidak lupa.'
  },
  {
    id: 'fc-7',
    category: 'Mitos vs Fakta',
    title: 'Minum TTD Bikin Gemuk & Rusak Ginjal?',
    subtitle: 'Mitos hoaks yang bikin banyak remaja enggan minum TTD',
    frontContent: 'Beredar kabar kalau minum TTD bikin nafsu makan gila-gilaan, berat badan naik, atau merusak saringan ginjal. Benarkah?',
    frontIcon: 'ShieldAlert',
    backContent: '100% HOAKS! Zat besi adalah mineral mikro esensial yang tidak mengandung kalori berlebih dan tidak bikin gemuk. TTD yang dikonsumsi sesuai anjuran (1x seminggu) sangat aman dan tidak merusak ginjal karena zat besi diserap di usus dan kelebihannya disimpan sebagai feritin.',
    keyFact: 'Kotoran (BAB) mungkin berubah warna sedikit lebih gelap setelah minum TTD, itu hal wajar dan tidak berbahaya.',
    actionTip: 'Jangan percaya rumor tanpa verifikasi ilmiah. TTD adalah investasi kecerdasan dan masa depanmu.'
  },
  {
    id: 'fc-8',
    category: 'Tips Remaja',
    title: 'Dampak Anemia pada Otak & Prestasi Sekolah',
    subtitle: 'Kenapa nilai pelajaran bisa jeblok gara-gara anemia?',
    frontContent: 'Otak kita mengonsumsi sekitar 20% total oksigen tubuh. Apa yang terjadi jika suplai oksigen menipis karena anemia?',
    frontIcon: 'Brain',
    backContent: 'Sel-sel saraf otak kekurangan energi metabolik. Efeknya: gampang mengantuk di jam sekolah, konsentrasi buyar, daya ingat jangka pendek menurun, dan lambat menangkap materi ujian. Nilai akademis bisa anjlok!',
    keyFact: 'Remaja yang bebas anemia memiliki rata-rata skor kognitif dan ketahanan fisik 15-20% lebih unggul.',
    actionTip: 'Cegah anemia sedini mungkin agar kamu tetap fokus juara dan tidak gampang ngantuk di jam pelajaran pagi!'
  },
  {
    id: 'fc-9',
    category: 'Gejala & Ciri',
    title: 'Cek Fisik Cepat: Konjungtiva & Kuku',
    subtitle: 'Deteksi dini anemia tanpa alat medis rumit',
    frontContent: 'Bagaimana cara melihat tanda-tanda anemia pada tubuh sendiri di depan cermin?',
    frontIcon: 'Eye',
    backContent: 'Tarik perlahan kelopak mata bagian bawah (konjungtiva). Jika warnanya pucat keputihan (bukan merah muda kemerahan), itu indikasi kuat anemia. Perhatikan juga telapak tangan yang pucat dingin, serta kuku rapuh berbentuk cekung sendok (koilonikia).',
    keyFact: 'Bibir yang pucat dan gampang sariawan di sudut bibir (angular cheilitis) juga merupakan tanda defisiensi zat besi.',
    actionTip: 'Ajak teman sebangku saling mengecek kelopak mata bawah di tempat yang terang.'
  },
  {
    id: 'fc-10',
    category: 'Tablet Tambah Darah',
    title: 'Trik Atasi Mual Saat Minum TTD',
    subtitle: 'Gak ada lagi alasan ogah minum suplemen zat besi!',
    frontContent: 'Pernah merasa mual atau rasa amis seperti besi di mulut setelah menelan TTD? Ini trik jitunya!',
    frontIcon: 'Sparkles',
    backContent: '1. Jangan minum saat perut kosong!\n2. Minum di malam hari, 30 menit setelah makan malam tepat sebelum tidur.\n3. Telan dengan air perasan jeruk atau air putih dingin.\n4. Jika mual berulang, konsultasikan jenis sediaan zat besi lain ke tenaga kesehatan.',
    keyFact: 'Rasa mual adalah reaksi sementara saat lambung memproses mineral besi pekat.',
    actionTip: 'Sediakan sebutir buah manis atau air madu hangat setelah menelan TTD untuk menetralkan aroma.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Gejala & Ciri',
    question: 'Sindrom 5L adalah gejala umum anemia pada remaja. Manakah di bawah ini kepanjangan 5L yang tepat?',
    options: [
      'Lemah, Letih, Lesu, Lelah, Lalai',
      'Lapar, Lemas, Lambat, Linu, Linglung',
      'Lelah, Lemah, Loyo, Latah, Lesu',
      'Lega, Lincah, Lembut, Lucu, Luwes'
    ],
    correctIndex: 0,
    explanation: '5L adalah Lemah, Letih, Lesu, Lelah, dan Lalai (sulit konsentrasi). Hal ini terjadi karena jaringan tubuh dan otak kekurangan pasokan oksigen akibat hemoglobin yang rendah.',
    badge: 'Detektif Gejala'
  },
  {
    id: 2,
    category: 'Mitos vs Fakta',
    question: 'Apakah kondisi "Kurang Darah" (Anemia) sama persis dengan "Tekanan Darah Rendah" (Hipotensi)?',
    options: [
      'Ya, keduanya adalah penyakit yang sama persis',
      'Tidak sama, Anemia adalah kekurangan sel darah merah/Hb, sedangkan Hipotensi adalah rendahnya tekanan pompa aliran darah',
      'Ya, karena sama-sama bisa disembuhkan dengan makan daging kambing',
      'Tidak sama, tapi hanya menyerang anak laki-laki saja'
    ],
    correctIndex: 1,
    explanation: 'Anemia diukur dari kadar Hemoglobin (<12 g/dL pada remaja putri), sedangkan Hipotensi diukur dari tekanan darah dengan tensimeter (<90/60 mmHg). Seseorang bisa tensinya normal bahkan tinggi namun tetap menderita anemia!',
    badge: 'Pemecah Mitos'
  },
  {
    id: 3,
    category: 'Nutrisi & Makanan',
    question: 'Manakah sumber makanan di bawah ini yang mengandung "Zat Besi Heme" dengan daya serap paling tinggi bagi tubuh?',
    options: [
      'Bayam dan kangkung rebus',
      'Hati ayam, daging sapi, dan ikan',
      'Tahu dan tempe goreng',
      'Kacang hijau dan almond'
    ],
    correctIndex: 1,
    explanation: 'Zat besi hewani (Heme) yang ada di hati ayam, daging merah, dan ikan diserap oleh tubuh manusia sebesar 20-30%, jauh lebih efisien dibanding zat besi nabati (1-10%).',
    badge: 'Nutrisionis Muda'
  },
  {
    id: 4,
    category: 'Nutrisi & Makanan',
    question: 'Zat apa yang bekerja sebagai "booster" melipatgandakan penyerapan zat besi di saluran pencernaan?',
    options: [
      'Vitamin C (asam askorbat)',
      'Tanin pada teh pekat',
      'Kafein pada kopi',
      'Kalsium dosis tinggi'
    ],
    correctIndex: 0,
    explanation: 'Vitamin C (seperti pada jeruk, jambu biji, tomat) mereduksi zat besi ke bentuk ion ferro (Fe2+) yang sangat gampang diserap oleh jonjot usus.',
    badge: 'Kimia Darah Juara'
  },
  {
    id: 5,
    category: 'Kebiasaan Remaja',
    question: 'Mengapa TIDAK dianjurkan minum es teh manis atau kopi langsung bersamaan dengan makan makanan berzat besi?',
    options: [
      'Karena teh akan membuat rasa makanan jadi terlalu pahit',
      'Zat tanin dalam teh dan kafein mengikat zat besi sehingga tidak bisa diserap dan terbuang',
      'Karena teh akan meningkatkan kadar oksigen terlalu cepat',
      'Karena teh menyebabkan darah membeku seketika'
    ],
    correctIndex: 1,
    explanation: 'Tanin dan polifenol dalam teh/kopi mengikat molekul zat besi menjadi endapan yang tidak larut, memangkas penyerapan zat besi hingga lebih dari 60%!',
    badge: 'Penjaga Zat Besi'
  },
  {
    id: 6,
    category: 'Tablet Tambah Darah',
    question: 'Sesuai pedoman Kementerian Kesehatan RI, seberapa sering remaja putri dianjurkan mengonsumsi Tablet Tambah Darah (TTD)?',
    options: [
      '1 tablet setiap hari seumur hidup tanpa henti',
      '1 tablet seminggu sekali sepanjang tahun, dan 1 tablet per hari saat menstruasi',
      'Cukup 1 tablet setahun sekali saat ulang tahun',
      'Hanya boleh diminum jika sudah pingsan di sekolah'
    ],
    correctIndex: 1,
    explanation: 'Rekomendasi resmi pencegahan anemia bagi Rematri (Remaja Putri) adalah 1 tablet seminggu sekali secara teratur, dan saat sedang menstruasi dapat ditingkatkan 1 tablet setiap hari untuk mengganti darah haid yang hilang.',
    badge: 'Duta TTD'
  },
  {
    id: 7,
    category: 'Gejala & Ciri',
    question: 'Berapakah batas ambang kadar Hemoglobin (Hb) normal untuk remaja putri berusia 12-15 tahun ke atas menurut WHO?',
    options: [
      'Minimal 12.0 g/dL',
      'Minimal 7.0 g/dL',
      'Cukup 4.5 g/dL',
      'Minimal 25.0 g/dL'
    ],
    correctIndex: 0,
    explanation: 'Batas kadar Hb normal untuk remaja putri usia reproduksi adalah 12.0 g/dL. Bila di bawah 12 g/dL sudah dikategorikan anemia (ringan: 11-11.9, sedang: 8-10.9, berat: <8 g/dL). Untuk remaja putra usia >15 tahun batasnya 13.0 g/dL.',
    badge: 'Master Laboratorium'
  },
  {
    id: 8,
    category: 'Tips Remaja',
    question: 'Waktu terbaik dan cara paling aman minum TTD untuk meminimalkan rasa mual adalah...',
    options: [
      'Pagi hari saat perut kosong dengan segelas es kopi susu',
      'Malam hari setelah makan malam sebelum tidur, ditelan dengan air putih atau air jeruk',
      'Saat sedang lari maraton di siang terik',
      'Dihancurkan lalu dicampur ke dalam saus sambal'
    ],
    correctIndex: 1,
    explanation: 'Minum TTD di malam hari setelah makan sebelum tidur membuat efek mual ringan terjadi saat kita terlelap, dan air jeruk membantu absorpsi zat besi secara optimal.',
    badge: 'Strategi Jitu'
  }
];

export const SCREENING_QUESTIONS = [
  {
    id: 'sq-1',
    question: 'Apakah kamu sering merasa cepat lelah, loyo, atau mengantuk di kelas meski tidur malam cukup?',
    weight: 2,
    options: [
      { label: 'Hampir setiap hari', score: 2 },
      { label: 'Kadang-kadang (1-2x seminggu)', score: 1 },
      { label: 'Jarang / Tidak pernah', score: 0 }
    ]
  },
  {
    id: 'sq-2',
    question: 'Pernahkah kamu merasa pusing berkunang-kunang atau pandangan gelap mendadak saat berdiri dari posisi duduk/jongkok?',
    weight: 2,
    options: [
      { label: 'Sering sekali', score: 2 },
      { label: 'Kadang-kadang', score: 1 },
      { label: 'Tidak pernah', score: 0 }
    ]
  },
  {
    id: 'sq-3',
    question: 'Bagaimana warna kelopak mata bagian dalam (konjungtiva) atau telapak tanganmu saat diperiksa di tempat terang?',
    weight: 3,
    options: [
      { label: 'Tampak pucat keputihan / kekuningan', score: 3 },
      { label: 'Agak pucat meragukan', score: 1.5 },
      { label: 'Segar kemerahan / merah muda sehat', score: 0 }
    ]
  },
  {
    id: 'sq-4',
    question: 'Khusus remaja putri: Apakah volume darah menstruasimu sangat deras (ganti pembalut >5 kali/hari) atau durasi haid >7 hari?',
    weight: 3,
    options: [
      { label: 'Ya, deras dan sering tembus / durasi panjang', score: 3 },
      { label: 'Sedang / biasa saja (3-5 hari)', score: 1 },
      { label: 'Saya remaja putra / haid normal teratur', score: 0 }
    ]
  },
  {
    id: 'sq-5',
    question: 'Seberapa sering kamu makan lauk hewani kaya zat besi (hati ayam, daging sapi, telur, ikan)?',
    weight: 2,
    options: [
      { label: 'Jarang sekali (< 2x seminggu / sering diet ketat)', score: 2 },
      { label: 'Kadang-kadang (3-4x seminggu)', score: 1 },
      { label: 'Hampir setiap hari', score: 0 }
    ]
  },
  {
    id: 'sq-6',
    question: 'Apakah kamu punya kebiasaan minum teh, es teh manis, atau kopi langsung sehabis makan?',
    weight: 2,
    options: [
      { label: 'Ya, wajib ada es teh / kopi setiap makan', score: 2 },
      { label: 'Kadang-kadang', score: 1 },
      { label: 'Tidak, selalu air putih / jeda 2 jam', score: 0 }
    ]
  },
  {
    id: 'sq-7',
    question: 'Apakah kamu rutin minum Tablet Tambah Darah (TTD) 1 tablet per minggu?',
    weight: 2,
    options: [
      { label: 'Tidak pernah / selalu membuangnya', score: 2 },
      { label: 'Kadang minum kalau ingat saja', score: 1 },
      { label: 'Ya, rutin 1x seminggu sesuai jadwal', score: 0 }
    ]
  }
];

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Hati Ayam',
    type: 'heme',
    ironContent: 11.6,
    portion: '1 potong sedang (75g)',
    icon: '🍗',
    description: 'Juara zat besi hewani! Penyerapan maksimal 20-30% oleh usus.',
    badgeText: 'Zat Besi Heme Tertinggi'
  },
  {
    id: 'food-2',
    name: 'Daging Sapi Segar',
    type: 'heme',
    ironContent: 3.5,
    portion: '1 porsi sedang (100g)',
    icon: '🥩',
    description: 'Sumber zat besi hewani yang mudah diserap dan kaya protein pembentuk hemoglobin.',
    badgeText: 'Zat Besi Heme'
  },
  {
    id: 'food-3',
    name: 'Telur Ayam Rebus',
    type: 'heme',
    ironContent: 1.5,
    portion: '1 butir (50g)',
    icon: '🥚',
    description: 'Mudah didapat, kuning telur kaya zat besi dan asam folat.',
    badgeText: 'Zat Besi Heme'
  },
  {
    id: 'food-4',
    name: 'Ikan Kembung / Tongkol',
    type: 'heme',
    ironContent: 2.1,
    portion: '1 ekor sedang (80g)',
    icon: '🐟',
    description: 'Zat besi hewani plus omega-3 untuk kecerdasan otak remaja.',
    badgeText: 'Zat Besi Heme'
  },
  {
    id: 'food-5',
    name: 'Sayur Bayam Rebus',
    type: 'non-heme',
    ironContent: 3.2,
    portion: '1 mangkuk sedang (100g)',
    icon: '🥬',
    description: 'Zat besi nabati non-heme. Perlu dibarengi vitamin C agar penyerapannya maksimal.',
    badgeText: 'Zat Besi Nabati (Non-Heme)'
  },
  {
    id: 'food-6',
    name: 'Tempe Kedelai',
    type: 'non-heme',
    ironContent: 2.5,
    portion: '2 potong sedang (80g)',
    icon: '🧈',
    description: 'Fermentasi tempe membantu mengurangi zat fitat sehingga zat besi lebih ramah diserap.',
    badgeText: 'Zat Besi Nabati'
  },
  {
    id: 'food-7',
    name: 'Tahu Putih',
    type: 'non-heme',
    ironContent: 1.8,
    portion: '2 potong sedang (100g)',
    icon: '🧊',
    description: 'Sumber nabati sehat, padukan dengan sambal tomat ber-vitamin C.',
    badgeText: 'Zat Besi Nabati'
  },
  {
    id: 'food-8',
    name: 'Jambu Biji Merah',
    type: 'enhancer',
    ironContent: 0.3,
    portion: '1 buah sedang (100g)',
    vitCContent: 228,
    icon: '🍈',
    description: 'Booster No.1! Vitamin C super tinggi (228mg) yang mempercepat penyerapan zat besi hingga 4x lipat.',
    badgeText: 'Super Booster (Vit C)'
  },
  {
    id: 'food-9',
    name: 'Jeruk Manis',
    type: 'enhancer',
    ironContent: 0.1,
    portion: '1 buah (100g)',
    vitCContent: 53,
    icon: '🍊',
    description: 'Sahabat zat besi. Minum air jeruk atau makan jeruk segar sesudah lauk.',
    badgeText: 'Booster Penyerapan'
  },
  {
    id: 'food-10',
    name: 'Es Teh Manis / Teh Hangat',
    type: 'inhibitor',
    ironContent: 0,
    portion: '1 gelas (250ml)',
    icon: '🧋',
    description: 'Penghambat berat! Mengandung Tanin yang mengikat zat besi hingga 64% gagal diserap.',
    badgeText: 'Inhibitor (Penghambat Serap)'
  },
  {
    id: 'food-11',
    name: 'Kopi Susu',
    type: 'inhibitor',
    ironContent: 0,
    portion: '1 cangkir (200ml)',
    icon: '☕',
    description: 'Polifenol kopi dan kalsium susu keduanya menghambat penyerapan zat besi.',
    badgeText: 'Inhibitor Kuat'
  }
];
