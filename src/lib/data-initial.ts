export interface MajorGalleryItem {
  url: string;
  title: string;
  caption: string;
}

export interface MajorData {
  id: string;
  code: string;
  name: string;
  slug: string;
  colorBadge: string;
  badgeBg: string;
  tagline: string;
  description: string;
  aksara: string;
  coverImage: string;
  gallery: MajorGalleryItem[];
  headOfMajor: string;
  headOfMajorPhoto?: string;
  totalStudents: number;
  accreditation: string;
  competencies: string[];
  careerProspects: string[];
  industryPartners: string[];
  facilities: string[];
  studentWorks: {
    title: string;
    description: string;
    image?: string;
  }[];
}

export interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Berita" | "Pengumuman" | "Artikel" | "SPMB";
  coverImage: string;
  author: string;
  publishedAt: string;
  views: number;
  isFeatured?: boolean;
}

export interface VideoData {
  id: string;
  title: string;
  subtitle: string;
  speaker: string;
  description: string;
  icon: string;
  color: string;
}

export interface ServiceData {
  id: string;
  name: string;
  badge: string;
  description: string;
  url: string;
  icon: string;
  bgGradient: string;
  category: "LMS" | "Nilai" | "Perpustakaan" | "Cloud" | "Aspirasi" | "Data" | "Akademik" | "Administrasi";
}

export interface TeacherStaffData {
  id: string;
  name: string;
  nip: string;
  role: string;
  department: string;
  photo: string;
}

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Magang Industri" | "Program Karir Jepang";
  deadline: string;
  description: string;
  requirements: string[];
  linkApply: string;
}

export const SCHOOL_INFO = {
  name: "SMK Negeri 3 Yogyakarta",
  nickname: "SKAGATA JAYA",
  historicName: "STM 2 Jetis (STM 2 Yogyakarta)",
  foundedYear: 1952,
  status: "SMK Pusat Keunggulan (SMK-PK) D.I. Yogyakarta",
  motto: "Konsisten Mencetak Teknisi Unggul, Berkarakter Taruna & Budaya",
  address: "Jl. Robert Wolter Monginsidi No. 2, Cokrodiningratan, Jetis, Kota Yogyakarta, D.I. Yogyakarta 55233",
  phone: "(0274) 513503",
  fax: "(0274) 554316",
  email: "humas@smkn3jogja.sch.id",
  headmaster: "Widada, S.Pd., M.Pd.",
  mapsUrl: "https://maps.google.com/?q=SMK+Negeri+3+Yogyakarta",
  embedMaps: "https://maps.google.com/maps?q=SMK%20Negeri%203%20Yogyakarta&t=&z=16&ie=UTF8&iwloc=&output=embed",
  stats: [
    { label: "Program Keahlian", value: "8", sub: "Industri 4.0 Terakreditasi A" },
    { label: "Taruna Aktif", value: "2.000+", sub: "Disiplin & Berintegritas" },
    { label: "Tahun Berdiri", value: "1952", sub: "Tradisi Teknik Tertua Indonesia" },
    { label: "Mitra Industri", value: "120+", sub: "Nasional & Multinasional (Jepang)" },
  ],
};

export const PILLARS_DATA = [
  {
    id: "pilar-1",
    pillarNum: "01",
    title: "Ketarunaan (Disiplin & Integritas)",
    subtitle: "Membentuk Karakter Mental Baja",
    description:
      "Pendidikan karakter semi-militer humanis yang membina ketahanan mental fisik, kepemimpinan (leadership), loyalitas, ketepatan waktu, dan integritas moral yang sangat diidamkan dunia industri internasional.",
    icon: "Shield",
    accent: "from-emerald-900 to-skagata-900",
    border: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/20 text-emerald-300",
  },
  {
    id: "pilar-2",
    pillarNum: "02",
    title: "Kewirausahaan (TEFA & BLUD)",
    subtitle: "BLUD Skagata Solutions Mandiri",
    description:
      "Teaching Factory (TEFA) dan Badan Layanan Umum Daerah (BLUD) Skagata Solutions melatih taruna menghasilkan produk bernilai jual, jasa service teknik industri riil, serta manajemen bisnis independen sejak dini.",
    icon: "Lightbulb",
    accent: "from-amber-800 to-amber-950",
    border: "border-amber-500/40",
    badgeBg: "bg-amber-500/20 text-amber-300",
  },
  {
    id: "pilar-3",
    pillarNum: "03",
    title: "Teknologi Terkini (Industri 4.0)",
    subtitle: "Kurikulum Industri Global",
    description:
      "Fasilitas CNC Center 5-Axis, Lab Mikrotik & Fiber Optik, Lab IoT Robotika, BIM Architecture Revit, Studio Digital TV Skagata, hingga Kelas Industri Modena Technical School.",
    icon: "Cpu",
    accent: "from-cyan-950 to-blue-950",
    border: "border-cyan-500/40",
    badgeBg: "bg-cyan-500/20 text-cyan-300",
  },
  {
    id: "pilar-4",
    pillarNum: "04",
    title: "Budaya Luhur (Keistimewaan DIY)",
    subtitle: "Kearifan Lokal Ngayogyakarta",
    description:
      "Menjunjung tinggi adab sopan santun Jawa, peringatan upacara adat Gagrag Ngayogyakarta dengan busana adat dan bahasa Jawa, serta Festival Seni Budaya Tahunan Festa Mangajapa.",
    icon: "Landmark",
    accent: "from-purple-950 to-slate-950",
    border: "border-purple-500/40",
    badgeBg: "bg-purple-500/20 text-purple-300",
  },
];

export const VIDEOS_DATA: VideoData[] = [
  {
    id: "tJhzVg7Nq4g",
    title: "Profil Resmi SMK Negeri 3 Yogyakarta",
    subtitle: "Official School Profile (Featured)",
    speaker: "SMK Pusat Keunggulan DIY",
    description:
      "Gambaran menyeluruh keunggulan bengkel teknik, kurikulum industri, dan kehidupan taruna-taruni STM 2 Jetis Yogyakarta.",
    icon: "Play",
    color: "text-emerald-400 bg-emerald-500/20",
  },
  {
    id: "7OoOmmRb5Ek",
    title: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 1)",
    subtitle: "Pembinaan Disiplin Taruna",
    speaker: "Korps Ketarunaan Skagata",
    description:
      "Dokumentasi pembinaan fisik, mental baja, dan tata laksana apel taruna di lapangan utama kampus sekolah.",
    icon: "Shield",
    color: "text-blue-400 bg-blue-500/20",
  },
  {
    id: "URLFZN5JZUg",
    title: "Pendidikan Karakter Berbasis Ketarunaan (Bagian 2)",
    subtitle: "Kedisiplinan & Baris Berbaris",
    speaker: "Drill Taruna Tangguh",
    description:
      "Lanjutan pembentukan etos kerja disiplin, kerjasama peleton, dan kesiapan fisik prima menghadapi dunia kerja internasional.",
    icon: "Users",
    color: "text-teal-400 bg-teal-500/20",
  },
  {
    id: "o3Kzq2jUre0",
    title: "Sambutan Sri Sultan Hamengkubuwono X",
    subtitle: "Gubernur D.I. Yogyakarta",
    speaker: "Sri Sultan Hamengku Buwono X",
    description:
      "Pesan dan restu Gubernur DIY atas peran historis dan strategis SMKN 3 Jetis dalam mencetak generasi teknisi pembangun bangsa.",
    icon: "Crown",
    color: "text-amber-400 bg-amber-500/20",
  },
  {
    id: "72o_zv3jei4",
    title: "Apresiasi Ditjen Pendidikan Vokasi",
    subtitle: "Kemendikbudristek RI",
    speaker: "Wikan Sakarinto, S.T., M.Sc., Ph.D.",
    description:
      "Pesan penting mengenai link-and-match kurikulum vokasi, teaching factory, dan karakter lulusan SMK yang adaptif terhadap revolusi industri.",
    icon: "Briefcase",
    color: "text-indigo-400 bg-indigo-500/20",
  },
  {
    id: "1paxlaUfE",
    title: "Motivasi dari Sutradara Hanung Bramantyo",
    subtitle: "Sutradara & Tokoh Perfilman Nasional",
    speaker: "Hanung Bramantyo",
    description:
      "Mengapa lulusan SMK unggul: kekuatan praktek kerja nyata, kemandirian profesional di lapangan, dan kebebasan berekspresi.",
    icon: "Film",
    color: "text-rose-400 bg-rose-500/20",
  },
];

export const MAJORS_DATA: MajorData[] = [
  {
    id: "maj-bp",
    code: "BP",
    name: "Broadcasting & Perfilman",
    slug: "broadcasting-perfilman",
    colorBadge: "bg-red-600 text-white",
    badgeBg: "bg-red-500/10 text-red-500 border-red-200",
    tagline: "Kreativitas Audio-Visual & Studio Siaran Digital",
    aksara: "ꦧꦿꦺꦴꦢ꧀ꦏꦱ꧀ꦠꦶꦁꦭꦤ꧀ꦥꦼꦂꦥ꦳ꦶꦭ꧀ꦩꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/BP-1024x740.jpeg",
    headOfMajor: "Tri Wibowo, S.Pd.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    totalStudents: 216,
    accreditation: "A (Unggul) - LSP P1 BNSP",
    description:
      "Program Keahlian Broadcasting & Perfilman mendidik taruna dalam tata kelola produksi siaran televisi modern, sinematografi digital, manajemen multi-kamera live streaming, penulisan skenario naskah siaran, tata suara audio studio, dan pengoperasian stasiun digital Skagata TV.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/BP-1024x740.jpeg",
        title: "Studio Broadcast & MCR Skagata TV",
        caption: "Studio kedap suara bertaraf broadcast profesional dengan kamera Cinema 4K dan switcher multi-channel.",
      },
      {
        url: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80",
        title: "Tata Kamera & Tata Cahaya Studio",
        caption: "Latihan sinematografi studio, pencahayaan 3-point lighting, dan pengoperasian teleprompter.",
      },
      {
        url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
        title: "Editing Suite Workstation",
        caption: "Ruang editing video non-linear berbasis DaVinci Resolve dan Adobe Premiere Pro dengan Apple Mac & RTX Workstation.",
      },
      {
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80",
        title: "Audio Recording & Sound Mixing",
        caption: "Fasilitas rekaman vokal, sulih suara (dubbing), foley effects, dan mastering audio siaran.",
      },
    ],
    competencies: [
      "Produksi Program Siaran TV & Webcast",
      "Kamera Sinematografi & Pencahayaan Studio",
      "Editing Video Non-Linear (Premiere, DaVinci Resolve)",
      "Audio Recording & Sound Engineering Studio",
      "Manajemen Siaran Live Streaming Skagata TV",
      "Desain Motion Graphic & Visual Effects",
    ],
    careerProspects: [
      "Broadcasting Director & Production Assistant",
      "Videografer & Sinematografer Profesional",
      "Video Editor & Motion Designer",
      "Sound Engineer & Teknisi Siaran Radio/TV",
      "Content Creator & Creative Producer Digital Media",
    ],
    industryPartners: [
      "TVRI Stasiun D.I. Yogyakarta",
      "RBTV Kompas Gramedia Group",
      "Dapur Film (Hanung Bramantyo)",
      "ADiTV Yogyakarta",
      "Jawa Pos TV",
    ],
    facilities: [
      "Studio Skagata TV Kedap Suara Standar Broadcast",
      "Ruang Kontrol Siaran (Master Control Room - MCR)",
      "Lab Komputer Editing High-End Apple & PC Workstation",
      "Perangkat Kamera Cinema 4K, Gimbal, & Drone",
    ],
    studentWorks: [
      {
        title: "Film Pendek Budaya Mangajapa",
        description: "Juara Festival Film Pelajar Nasional 2025",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Live Streaming Upacara Gagrag DIY",
        description: "Liputan multi-kamera ditonton 50.000+ viewers",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-tjkt",
    code: "TJKT",
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    slug: "teknik-jaringan-komputer-telekomunikasi",
    colorBadge: "bg-sky-600 text-white",
    badgeBg: "bg-sky-500/10 text-sky-600 border-sky-200",
    tagline: "Infrastruktur Jaringan Fiber Optik & Cyber Cloud Enterprise",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦗꦫꦶꦔꦤ꧀ꦏꦺꦴꦩ꧀ꦥꦸꦠꦼꦂ",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    headOfMajor: "Siti Rahmawati, S.T., M.Cs.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    totalStudents: 288,
    accreditation: "A (Unggul) - MikroTik Academy Certified",
    description:
      "TJKT membekali taruna dengan penguasaan arsitektur jaringan komputer skala enterprise, routing dan switching kelas industri, instalasi dan penyambungan kabel fiber optik mutakhir, administrasi server Linux, cloud computing AWS/Google, serta pertahanan keamanan cyber.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
        title: "Laboratorium Komputer Jaringan Skagata",
        caption: "Siswa berlatih konfigurasi routing dan switching kelas industri menggunakan perangkat MikroTik dan Cisco.",
      },
      {
        url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
        title: "Server Rack & Data Center Mini",
        caption: "Mini data center sekolah dengan server virtualization Proxmox dan cloud storage internal.",
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
        title: "Fiber Optic Fusion Splicing & OTDR",
        caption: "Praktek penyambungan kabel serat optik kecepatan tinggi dan pengukuran rugi daya transmisi.",
      },
      {
        url: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80",
        title: "Cyber Defense & Penetration Testing",
        caption: "Simulasi pertahanan jaringan terhadap ancaman cyber dan audit keamanan sistem informasi.",
      },
    ],
    competencies: [
      "Routing & Switching Enterprise (MikroTik MTCNA/MTCRE & Cisco CCNA)",
      "Instalasi & Splicing Fiber Optic (OTDR & Fusion Splicer)",
      "Administrasi Server Linux & Windows Server Active Directory",
      "Cloud Infrastructure & Virtualisasi (Proxmox, Docker)",
      "Keamanan Jaringan & Cyber Security Defense",
    ],
    careerProspects: [
      "Network Engineer & Administrator",
      "Fiber Optic Technician Telko",
      "System Administrator & Cloud Support",
      "Cyber Security Specialist",
      "IT Infrastructure Support Officer",
    ],
    industryPartners: [
      "PT Telkom Indonesia Tbk",
      "MikroTik Academy Latvia",
      "PT Citraweb Solusi Teknologi (Citranet)",
      "Biznet Networks",
      "Lintasarta",
    ],
    facilities: [
      "Lab Fiber Optic & Optical Time-Domain Reflectometer (OTDR)",
      "Lab Jaringan Cisco & MikroTik Routerboard Rack",
      "Data Center Server Mini Skagata",
      "Lab Komputer Perakitan & Maintenance Hardware",
    ],
    studentWorks: [
      {
        title: "Implementasi Smart Wi-Fi 6 Kampus Skagata",
        description: "Desain jaringan nirkabel mencakup seluruh komplek sekolah",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Sertifikasi Internasional MTCNA 100% Lulus",
        description: "Capaian siswa kelas XI meraih sertifikasi MikroTik Eropa",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-dpib",
    code: "DPIB",
    name: "Desain Pemodelan & Informasi Bangunan",
    slug: "desain-pemodelan-informasi-bangunan",
    colorBadge: "bg-amber-600 text-white",
    badgeBg: "bg-amber-500/10 text-amber-600 border-amber-200",
    tagline: "Arsitektur Digital 3D BIM & Rancang Bangun Masa Depan",
    aksara: "ꦢꦺꦱꦻꦤ꧀ꦥꦼꦩꦺꦴꦢꦺꦭꦤ꧀ꦧꦔꦸꦤꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-13-at-15.09.03-e1653536892633-1024x1024.jpeg",
    headOfMajor: "Drs. Agus Triyono, M.T.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    totalStudents: 216,
    accreditation: "A (Unggul) - Autodesk Certified",
    description:
      "DPIB fokus pada pemodelan digital arsitektur dan struktur konstruksi bangunan menggunakan teknologi Building Information Modeling (BIM), gambar teknik 2D/3D AutoCAD & Revit, kalkulasi estimasi Rencana Anggaran Biaya (RAB), dan visualisasi render fotorealistik.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-13-at-15.09.03-e1653536892633-1024x1024.jpeg",
        title: "Studio Perancangan Gambar Digital",
        caption: "Ruang kerja perancangan digital berfasilitas workstation grafis canggih dengan software Autodesk Revit dan AutoCAD.",
      },
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
        title: "BIM 3D Architectural Modeling",
        caption: "Pemodelan terintegrasi struktur beton, MEP (mekanikal elektrikal plumbing), dan fasad gedung bertingkat.",
      },
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        title: "Survey Pengukuran Tanah Total Station",
        caption: "Praktek pemetaan lahan kontur dan leveling topografi menggunakan instrumen optik digital modern.",
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
        title: "Plotting Gambar Kerja Arsitektur A0",
        caption: "Pencetakan gambar kerja konstruksi presisi tinggi untuk review kelayakan rancang bangun.",
      },
    ],
    competencies: [
      "Building Information Modeling (BIM) Autodesk Revit",
      "Perancangan Gambar Kerja 2D/3D AutoCAD",
      "Visualisasi Render 3D Lumion & Enscape",
      "Perhitungan Rencana Anggaran Biaya (RAB) & Bill of Quantity",
      "Survey Pengukuran Lahan dengan Total Station Digital",
    ],
    careerProspects: [
      "BIM Modeler & Coordinator",
      "Drafter Arsitektur & Sipil",
      "Estimator Biaya Konstruksi (Quantity Surveyor)",
      "Surveyor Pengukuran Tanah & Pemetaan",
      "Desainer Visualisasi 3D Interior & Eksterior",
    ],
    industryPartners: [
      "PT Wijaya Karya (Persero) Tbk",
      "PT PP (Persero) Tbk",
      "Ikatan Arsitek Indonesia (IAI) DIY",
      "PT Total Bangun Persada",
      "Perusahaan Kontraktor Konstruksi Jepang",
    ],
    facilities: [
      "Lab Komputer Desain Arsitektur Workstation RTX",
      "Alat Ukur Total Station & Digital Theodolite",
      "Studio Gambar Manual Drafting Table Standard",
      "Printer Plotter Cetak Gambar A0 Berwarna",
    ],
    studentWorks: [
      {
        title: "Desain Maket & 3D BIM Gedung Technopark",
        description: "Model perancangan gedung workshop 3 lantai bersertifikasi",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Juara LKS CADD Building Bidang Konstruksi",
        description: "Medali Emas LKS Tingkat Provinsi DIY",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-tkp",
    code: "TKP",
    name: "Teknik Konstruksi & Perumahan",
    slug: "teknik-konstruksi-perumahan",
    colorBadge: "bg-emerald-700 text-white",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    tagline: "Teknologi Beton Bertulang & Manajemen Proyek Konstruksi Hijau",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦏꦺꦴꦤ꧀ꦱ꧀ꦠꦿꦸꦏ꧀ꦱꦶꦭꦤ꧀ꦥꦼꦫꦸꦩꦲꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/KP-768x1024.jpg",
    headOfMajor: "Budi Santosa, S.Pd., M.Eng.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    totalStudents: 144,
    accreditation: "A (Unggul) - BNSP Vokasi Konstruksi",
    description:
      "Program Keahlian Teknik Konstruksi dan Perumahan mencetak pelaksana konstruksi tangguh dalam pekerjaan pondasi, struktur beton bertulang, pekerjaan baja ringan, pemasangan batu bata dan plesteran presisi, plumbing sanitasi modern, serta penerapan Kesehatan & Keselamatan Kerja (K3).",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/KP-768x1024.jpg",
        title: "Bengkel Konstruksi Bangunan & Batu",
        caption: "Praktek pembuatan adukan plesteran presisi, pemasangan dinding bata, dan pembesian struktur beton bertulang.",
      },
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
        title: "Fabrikasi Rangka Atap Baja Ringan",
        caption: "Pemasangan kuda-kuda dan reng truss baja ringan dengan perhitungan sudut kemiringan standar PUPR.",
      },
      {
        url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80",
        title: "Laboratorium Uji Mutu Beton",
        caption: "Pengujian kuat tekan silinder beton umur 7, 14, dan 28 hari menggunakan mesin uji hidrolik berskala.",
      },
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80",
        title: "Finishing Keramik & Sanitasi Plumbing",
        caption: "Pemasangan ubin granit presisi dan instalasi pipa air bersih-kotor dengan sambungan standar SNI.",
      },
    ],
    competencies: [
      "Pekerjaan Struktur Beton Bertulang & Uji Mutu",
      "Pemasangan Konstruksi Rangka Atap Baja Ringan & Plafon",
      "Instalasi Pemipaan Plumbing Air Bersih & Kotor",
      "Pekerjaan Finishing Keramik, Granit & Cat Gedung",
      "Penerapan Standar Keselamatan dan Kesehatan Kerja (K3) Konstruksi",
    ],
    careerProspects: [
      "Pelaksana Lapangan Proyek Konstruksi (Site Supervisor)",
      "Quality Control (QC) Pekerjaan Beton & Struktur",
      "Teknisi Konstruksi Perumahan & Interior",
      "Mandor / Supervisor Kontraktor Bangunan",
      "Tenaga Kerja Konstruksi Internasional di Jepang",
    ],
    industryPartners: [
      "PT Adhi Karya (Persero) Tbk",
      "PT Waskita Karya (Persero) Tbk",
      "Kementerian PUPR Bapekom Wilayah V Yogyakarta",
      "Perusahaan Konstruksi Prefabrikasi Jepang",
    ],
    facilities: [
      "Bengkel Kerja Batu, Beton, dan Finishing Bangunan Luas",
      "Bengkel Fabrikasi Rangka Baja Ringan & Kayu",
      "Mesin Uji Kuat Tekan Beton Uji Laboratorium",
      "Peralatan Laser Leveling Presisi Konstruksi",
    ],
    studentWorks: [
      {
        title: "Gazebo Taman Budaya Konstruksi Kayu Kamper",
        description: "Proyek TEFA pesanan instansi pemerintah kota",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Penyaluran Kerja Konstruksi Tokyo 2026",
        description: "Lulusan langsung diberangkatkan kontrak kerja resmi Jepang",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-te",
    code: "TE",
    name: "Teknik Elektronika",
    slug: "teknik-elektronika",
    colorBadge: "bg-indigo-600 text-white",
    badgeBg: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    tagline: "Otomasi Industri, Robotika Sensorik & Smart IoT Terintegrasi",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦲꦺꦭꦺꦏ꧀ꦠꦿꦺꦴꦤꦶꦏ",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-11-at-08.33.41-576x1024.jpeg",
    headOfMajor: "Ir. Bambang Haryadi, M.T.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    totalStudents: 288,
    accreditation: "A (Unggul) - Kelas Industri Modena",
    description:
      "Teknik Elektronika SMKN 3 Yogyakarta mendidik taruna dalam rekayasa mikrokontroler Arduino/ESP32, pemrograman PLC industri (Omron/Siemens), perancangan sirkuit PCB otomatis, sistem sensorik robotika, smart home appliances bersama Modena, dan elektronika daya terapan.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-11-at-08.33.41-576x1024.jpeg",
        title: "Modena Technical School Lab",
        caption: "Pusat pelatihan teknisi perlengkapan rumah tangga pintar (smart home appliances) bersama PT MODENA Indonesia.",
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
        title: "Trainer PLC & Otomasi Pabrik",
        caption: "Pemrograman PLC Omron & Siemens untuk mengendalikan conveyor belt pneumatik dan aktuator industri.",
      },
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
        title: "Robotika Mobile & Automated Guided Vehicle",
        caption: "Riset dan perakitan robot pembawa logistik otonom berbasis sensor ultrasonik dan mikroprosesor.",
      },
      {
        url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop&q=80",
        title: "Laboratorium Desain & Soldering PCB",
        caption: "Perancangan skematik dan perakitan komponen elektronika SMD dengan stasiun pemanas digital.",
      },
    ],
    competencies: [
      "Pemrograman Mikrokontroler & Internet of Things (IoT)",
      "Perancangan Sirkuit PCB dengan Software CAD Eagle / Altium",
      "Pemrograman PLC (Programmable Logic Controller) & HMI Industri",
      "Perbaikan & Perawatan Peralatan Audio-Video & Smart Home",
      "Teknologi Robotika Otomasi Pabrik",
    ],
    careerProspects: [
      "Teknisi Otomasi & Robotika Industri Pabrik",
      "IoT Hardware Developer & Firmware Specialist",
      "Service Engineer Home Appliances Modena",
      "Teknisi Instrumentasi & Kontrol Elektronika",
      "Maintenance Technician Industri Manufaktur",
    ],
    industryPartners: [
      "MODENA Indonesia (Modena Technical School)",
      "PT Omron Electronics Indonesia",
      "PT Panasonic Gobel Indonesia",
      "PT Hartono Istana Teknologi (Polytron)",
      "Schneider Electric Indonesia",
    ],
    facilities: [
      "Laboratorium Otomasi PLC & Robotika Industri",
      "Lab Modena Technical School Lengkap Peralatan Uji",
      "Lab Desain PCB & Mesin CNC PCB Milling",
      "Peralatan Ukur Digital Oscilloscope & Logic Analyzer",
    ],
    studentWorks: [
      {
        title: "Smart Energy Monitoring System IoT",
        description: "Perangkat pemantau daya listrik gedung real-time via smartphone",
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Robot Pengantar Logistik Pabrik AGV",
        description: "Robot otonom pemandu jalur sensorik magnetik",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-titl",
    code: "TITL",
    name: "Teknik Ketenagalistrikan",
    slug: "teknik-ketenagalistrikan",
    colorBadge: "bg-yellow-600 text-white",
    badgeBg: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    tagline: "Distribusi Tenaga Listrik Tegangan Menengah & Panel Industri",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦏꦺꦠꦺꦤꦒꦭꦶꦱ꧀ꦠꦿꦶꦏꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-08.46.54-576x1024.jpeg",
    headOfMajor: "Drs. Eko Prasetyo, M.T.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    totalStudents: 288,
    accreditation: "A (Unggul) - Sertifikasi Standar PLN & KESDM",
    description:
      "TITL membekali taruna keahlian instalasi penerangan dan tenaga gedung bertingkat, perakitan panel kendali motor listrik 3 fasa, instalasi energi baru terbarukan (Pembangkit Listrik Tenaga Surya - PLTS), keselamatan kerja bahaya arus listrik, serta standarisasi PUIL.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-08.46.54-576x1024.jpeg",
        title: "Bengkel Panel Distribusi Tenaga 3 Fasa",
        caption: "Instalasi dan pengawatan panel listrik industri, kontaktor magnetik, thermal overload, dan busbar tembaga.",
      },
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
        title: "Uji Kendali Motor Listrik & Inverter VFD",
        caption: "Pengendalian kecepatan motor induksi 3 fasa menggunakan Variable Frequency Drive dan Smart Relay.",
      },
      {
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
        title: "Pembangkit Listrik Tenaga Surya (PLTS Rooftop)",
        caption: "Praktek instalasi solar cell on-grid/off-grid, inverter surya, dan pemantauan efisiensi energi terbarukan.",
      },
      {
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
        title: "Instalasi Penerangan Gedung Sesuai PUIL",
        caption: "Pemasangan instalasi listrik gedung komersial dengan standar proteksi ELCB dan pentanahan grounding.",
      },
    ],
    competencies: [
      "Instalasi Penerangan & Daya Gedung Komersial Sesuai PUIL",
      "Perakitan Panel Kontrol Distribusi Listrik & Motor Listrik 3 Fasa",
      "Otomasi Kontrol Motor Listrik Berbasis Inverter VFD & Smart Relay",
      "Perencanaan & Pemasangan Pembangkit Listrik Tenaga Surya (PLTS Rooftop)",
      "Pemeliharaan Trafo Distribusi & Genset Emergency",
    ],
    careerProspects: [
      "Instalatur Listrik Gedung Bersertifikat Badan Registrasi ESDM",
      "Panel Builder & Kontrol Elektrikal Industri",
      "Teknisi Pembangkit Listrik Tenaga Surya (Solar PV Technician)",
      "Petugas Pemeliharaan Gardu & Jaringan Distribusi PLN",
      "Electrical Maintenance Engineer Gedung Bertingkat",
    ],
    industryPartners: [
      "PT PLN (Persero) Distribusi DIY & Jateng",
      "PT Schneider Electric Manufacturing Batam",
      "PT Legrand Indonesia",
      "Asosiasi Kontraktor Listrik Indonesia (AKLI)",
    ],
    facilities: [
      "Lab Instalasi Tenaga Listrik Industri Berkapasitas 3 Fasa",
      "Instalasi Praktek Panel Surya (PLTS On-Grid & Off-Grid)",
      "Bench Pengujian Motor Induksi 3 Fasa & Soft Starter",
      "Training Box Smart Relay & Inverter Siemens",
    ],
    studentWorks: [
      {
        title: "Instalasi PLTS Rooftop 10 kWp Kampus Skagata",
        description: "Pembangkit surya mandiri menyuplai listrik gedung utama",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Panel Otomatisasi Pompa Air Terpadu",
        description: "Pesanan unit BLUD dari pengelola perumahan di Yogyakarta",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-tkro",
    code: "TKRO",
    name: "Teknik Kendaraan Ringan Otomotif",
    slug: "teknik-kendaraan-ringan-otomotif",
    colorBadge: "bg-red-700 text-white",
    badgeBg: "bg-red-500/10 text-red-700 border-red-200",
    tagline: "Teknologi Kendaraan Modern, Sistem Injeksi EFI & Electric Vehicle",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦏꦼꦤ꧀ꦢꦫꦄꦤ꧀ꦫꦶꦔꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-09.29.53-576x1024.jpeg",
    headOfMajor: "Widodo, M.Pd.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    totalStudents: 288,
    accreditation: "A (Unggul) - Bengkel Resmi TEFA APM",
    description:
      "Teknik Otomotif mendidik taruna menguasai perawatan dan overhaul mesin bensin injeksi EFI, mesin diesel common rail, transmisi manual dan matic, sistem kelistrikan bodi mobil modern, AC digital kendaraan, spooring-balancing, serta dasar teknologi Electric Vehicle (EV).",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-09.29.53-576x1024.jpeg",
        title: "Bengkel Resmi TEFA Skagata Auto Service",
        caption: "Bengkel mobil standar APM dengan 4 unit car lift hidrolik, melayani tune-up, ganti oli, dan perbaikan umum masyarakat.",
      },
      {
        url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
        title: "Overhaul Mesin Bensin EFI & Common Rail",
        caption: "Bongkar pasang kepala silinder, kalibrasi celah katup, dan pengukuran keausan poros engkol dengan mikrometer.",
      },
      {
        url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
        title: "Komputerisasi Spooring 3D & Wheel Balancing",
        caption: "Penyetelan sudut camber, caster, dan toe-in roda kendaraan menggunakan kamera 3D sensorik berakurasi tinggi.",
      },
      {
        url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
        title: "Diagnostik Engine Scanner OBD II",
        caption: "Pendeteksian error kode DTC (Diagnostic Trouble Code) dan analisis data live sensor mesin mobil terkini.",
      },
    ],
    competencies: [
      "Diagnostik Kerusakan Engine Management System Menggunakan Scanner",
      "Tune Up & Overhaul Engine Bensin EFI & Diesel Common Rail",
      "Sistem Transmisi Otomatis (CVT & Planetary) & Manual Drive Train",
      "Sistem AC Mobil Digital & Perbaikan Kelistrikan Bodi",
      "Sistem Rem ABS, EPS Steering & Chassis Wheel Alignment (Spooring 3D)",
    ],
    careerProspects: [
      "Teknisi Bengkel Resmi APM (Toyota, Honda, Daihatsu, Suzuki, Mitsubishi)",
      "Service Advisor & Teknisi Diagnostik Otomotif",
      "Teknisi Kendaraan Listrik (EV Service Specialist)",
      "Owner Wirausaha Bengkel Mobil Mandiri",
      "Mekanik Otomotif di Industri Manufaktur Perakitan Mobil",
    ],
    industryPartners: [
      "PT Astra Daihatsu Motor (Kelas Binaan Daihatsu)",
      "PT Nasmoco Toyota D.I. Yogyakarta",
      "PT Sumber Baru Mobil Suzuki",
      "PT Borobudur Oto Mobil Mitsubishi Motors",
      "Perusahaan Perakitan Otomotif Jepang",
    ],
    facilities: [
      "Bengkel TEFA Skagata Auto Service dengan 4 Car Lift Hidrolik",
      "Mesin Scanner Diagnostik Engine OBD II Komprehensif",
      "Alat Spooring 3D & Balancing Roda Komputerisasi",
      "Trainer Sistem AC Mobil R134a & Engine Cut Model",
    ],
    studentWorks: [
      {
        title: "Mobil Listrik Riset Taruna Skagata EV-01",
        description: "Kendaraan prototipe listrik bertenaga baterai lithium",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Layanan Service Berkala TEFA Skagata Auto",
        description: "Melayani ratusan mobil konsumen umum setiap bulannya",
        image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "maj-tp",
    code: "TP",
    name: "Teknik Mesin (Pemesinan)",
    slug: "teknik-pemesinan",
    colorBadge: "bg-slate-800 text-white",
    badgeBg: "bg-slate-500/10 text-slate-800 border-slate-200",
    tagline: "Presisi Tinggi, Pemrograman CNC Machining & Rekayasa Manufaktur",
    aksara: "ꦠꦺꦏ꧀ꦤꦶꦏ꧀ꦥꦼꦩꦼꦱꦶꦤꦤ꧀",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-11.56.52-576x1024.jpeg",
    headOfMajor: "Ir. Bambang Haryadi, M.T.",
    headOfMajorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    totalStudents: 288,
    accreditation: "A (Unggul) - CNC Center Terakreditasi BNSP",
    description:
      "Teknik Pemesinan merupakan salah satu jurusan tertua dan paling prestisius di SMKN 3 Yogyakarta (STM 2 Jetis). Siswa dididik mengoperasikan mesin bubut konvensional presisi mikro, mesin frais horizontal/vertikal, pemrograman CNC Milling & Turning dengan CAD/CAM Mastercam, serta pengelasan SMAW/MIG/TIG.",
    gallery: [
      {
        url: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-11.56.52-576x1024.jpeg",
        title: "CNC Machining Center & Bengkel Bubut",
        caption: "Fasilitas bengkel manufaktur terbesar dengan 4 unit CNC Milling, 3 CNC Turning, dan 40+ mesin bubut presisi.",
      },
      {
        url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
        title: "Pemrograman CNC Mastercam CAD/CAM",
        caption: "Simulasi jalur pahat perkakas (toolpath) dan eksekusi pemesinan kontur 3D presisi toleransi 0.01 mm.",
      },
      {
        url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
        title: "Pemesinan Bubut & Frais Konvensional",
        caption: "Pembuatan poros bertingkat, ulir metrik/withworth, roda gigi heliks, dan alur pasak presisi tinggi.",
      },
      {
        url: "https://images.unsplash.com/photo-1508873696983-2df57046475a?w=800&auto=format&fit=crop&q=80",
        title: "Fabrikasi Pengelasan SMAW & TIG Argon",
        caption: "Pengelasan pipa dan pelat posisi 1G, 2G, 3G, hingga 6G dengan uji penetrasi las berstandar industri.",
      },
    ],
    competencies: [
      "Pemrograman & Pengoperasian CNC Milling & Turning (G-Code & Mastercam)",
      "Pemesinan Bubut Konvensional Tingkat Presisi Tinggi (Toleransi Mikro)",
      "Pemesinan Frais / Milling Roda Gigi, Alur & Bidang Rata Kompleks",
      "Pengelasan Busur Listrik SMAW, MIG/MAG, dan TIG Argon",
      "Metrologi Industri & Pengukuran Presisi Menggunakan Mikrometer & CMM",
    ],
    careerProspects: [
      "Programmer & Operator CNC Manufaktur Presisi",
      "Machinist Ahli Bubut & Frais Industri Berat",
      "Welder Bersertifikat Internasional (Pengelasan Pipa & Konstruksi)",
      "Quality Control Inspector Dimensi Komponen Manufaktur",
      "Teknisi Manufaktur Kontrak Kerja di Industri Otomotif/Mesin Jepang",
    ],
    industryPartners: [
      "PT Komatsu Indonesia",
      "PT Astra Otoparts Tbk",
      "PT Mega Andalan Kalasan (MAK)",
      "PT Yogya Presisi Tehnikatama Industri (YPTI)",
      "Perusahaan Industri Manufaktur Logam Jepang",
    ],
    facilities: [
      "CNC Center: 4 Unit CNC Milling & 3 Unit CNC Turning",
      "Bengkel Bubut Konvensional Memiliki 40+ Mesin Bubut Presisi",
      "Bengkel Frais Dilengkapi Mesin Frais Universal",
      "Bengkel Pengelasan Standar Industri Bersekat & Blower Khusus",
    ],
    studentWorks: [
      {
        title: "Komponen Presisi Pesanan Industri YPTI",
        description: "Produksi massal sparepart cetakan injeksi plastik berstandar ISO",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Medali Emas LKS Nasional CNC Milling",
        description: "Prestasi puncak taruna mesin mewakili D.I. Yogyakarta",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "srv-kelulusan",
    name: "KELULUSAN",
    badge: "Tahun 2026",
    description: "Informasi status kelulusan taruna-taruni tahun pelajaran 2025/2026.",
    url: "https://kelulusansmk.my.id",
    icon: "GraduationCap",
    bgGradient: "from-emerald-600 to-teal-800",
    category: "Akademik",
  },
  {
    id: "srv-kelasiber",
    name: "KELASIBER",
    badge: "E-Learning",
    description: "Platform LMS resmi penugasan, modul ajar interaktif, dan ujian daring.",
    url: "http://kelasiber.skagata.sch.id",
    icon: "Chalkboard",
    bgGradient: "from-slate-900 to-emerald-950",
    category: "LMS",
  },
  {
    id: "srv-skagatatv",
    name: "SKAGATA TV",
    badge: "Live Studio",
    description: "Kanal siaran resmi liputan kegiatan, tutorial teknik, dan pentas karya siswa.",
    url: "https://www.youtube.com/c/SkagataTV/videos",
    icon: "Tv",
    bgGradient: "from-red-600 to-rose-800",
    category: "Data",
  },
  {
    id: "srv-opac",
    name: "OPAC Widura",
    badge: "Perpustakaan",
    description: "Katalog online pencarian buku cetak & digital library Perpustakaan Widura.",
    url: "http://opac.smkn3jogja.sch.id:5776/",
    icon: "BookOpen",
    bgGradient: "from-amber-600 to-orange-800",
    category: "Perpustakaan",
  },
  {
    id: "srv-dapodik",
    name: "DAPODIK",
    badge: "Kemdikbud",
    description: "Sinkronisasi Data Pokok Pendidikan pendidik, tenaga kependidikan, dan murid.",
    url: "http://sia.smkn3jogja.sch.id:5774",
    icon: "Database",
    bgGradient: "from-blue-600 to-sky-800",
    category: "Data",
  },
  {
    id: "srv-rspk",
    name: "RSPK",
    badge: "Pusat Keunggulan",
    description: "Rapot SMK Pusat Keunggulan, evaluasi capaian kompetensi vokasi terstandarisasi.",
    url: "http://sia.smkn3jogja.sch.id:7252",
    icon: "Award",
    bgGradient: "from-teal-600 to-emerald-800",
    category: "Nilai",
  },
  {
    id: "srv-mpd",
    name: "MPD (Penilaian)",
    badge: "Nilai Digital",
    description: "Manajemen Penilaian Digital untuk guru, wali kelas, dan rekapitulasi nilai rapor.",
    url: "http://sia.smkn3jogja.sch.id:3780/",
    icon: "Calculator",
    bgGradient: "from-purple-600 to-indigo-800",
    category: "Nilai",
  },
  {
    id: "srv-paperless",
    name: "PAPERLESS CLOUD",
    badge: "Cloud Data",
    description: "Penyimpanan arsip digital sekolah, kurikulum, dan administrasi perkantoran efisien.",
    url: "http://cloud.skagata.sch.id:9070/",
    icon: "Cloud",
    bgGradient: "from-emerald-700 to-green-900",
    category: "Cloud",
  },
];

export const POSTS_DATA: PostData[] = [
  {
    id: "post-1",
    title: "SMKN 3 Yogyakarta Perluas Akses Kebekerjaan ke Jepang, Hadirkan Owner Perusahaan Konstruksi",
    slug: "smkn-3-yogyakarta-perluas-akses-kebekerjaan-ke-jepang-hadirkan-owner-perusahaan-konstruksi",
    excerpt: "Memperkuat jembatan penyaluran alumni teknik langsung bekerja di industri konstruksi Tokyo & Osaka, Jepang melalui rekrutmen eksklusif di aula sekolah.",
    content: `
      <p>YOGYAKARTA – SMK Negeri 3 Yogyakarta (STM 2 Jetis) terus memperkokoh reputasinya sebagai SMK Pusat Keunggulan bertaraf global. Bekerja sama dengan konsorsium industri Jepang, sekolah secara resmi menghadirkan owner perusahaan konstruksi kenamaan dari Tokyo dan Osaka untuk melakukan seleksi langsung taruna-taruni tingkat akhir dan alumni.</p>
      <p>Kepala SMKN 3 Yogyakarta, Widodo, M.Pd., menyampaikan bahwa langkah strategis ini selaras dengan program link-and-match Kemendikbudristek untuk mempertemukan lulusan vokasi dengan pasar kerja internasional berstandar tinggi.</p>
      <h3>Kebutuhan Teknisi Bersertifikasi di Jepang</h3>
      <p>Dalam pertemuan tersebut, pihak industri Jepang mengapresiasi tingginya kedisiplinan dan mentalitas taruna SMKN 3 Yogyakarta. Para siswa yang lolos seleksi akan mengikuti pembekalan intensif bahasa Jepang (JLPT N4/N3) serta adaptasi standar K3 konstruksi Jepang sebelum diberangkatkan dengan fasilitas gaji penuh, asuransi, dan jenjang karir terjamin.</p>
      <p>"Karakter ketarunaan yang ditanamkan di SMKN 3 Yogyakarta membuat lulusannya memiliki ketahanan mental prima dan etos kerja yang sangat cocok dengan budaya kerja di Jepang," ujar perwakilan pimpinan industri Jepang.</p>
    `,
    category: "Berita",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-08-at-18.14.17-260x195.jpeg",
    author: "Tim Humas Skagata",
    publishedAt: "2026-09-08",
    views: 1420,
    isFeatured: true,
  },
  {
    id: "post-2",
    title: "SMKN 3 Yogyakarta Hidupkan Nilai Keistimewaan DIY Lewat Upacara Berbahasa Jawa dan Gagrag Yogyakarta",
    slug: "smkn-3-yogyakarta-hidupkan-nilai-keistimewaan-diy-lewat-upacara-berbahasa-jawa-dan-gagrag-yogyakarta",
    excerpt: "Penanaman karakter luhur sopan santun dan busana adat Mataram Ngayogyakarta bagi ribuan taruna-taruni Skagata memperingati Hari Keistimewaan DIY.",
    content: `
      <p>YOGYAKARTA – Ribuan siswa, guru, dan tenaga kependidikan SMK Negeri 3 Yogyakarta memadati lapangan upacara dengan mengenakan busana adat Gagrag Ngayogyakarta lengkap. Upacara bendera dilaksanakan sepenuhnya menggunakan bahasa Jawa krama inggil sebagai bentuk penghormatan dan pelestarian nilai keistimewaan D.I. Yogyakarta.</p>
      <p>Kepala Sekolah dalam amanatnya menekankan bahwa kemajuan penguasaan teknologi vokasi 4.0 harus berakar kuat pada nilai-nilai budaya dan adab luhur. "Teknisi Skagata tidak hanya cerdas merakit mesin dan memprogram komputer, tetapi juga memiliki tata krama, unggah-ungguh, dan kehalusan budi pekerti khas Yogyakarta," tuturnya.</p>
    `,
    category: "Berita",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-18.30.44-2-260x195.jpeg",
    author: "Tim Publikasi Budaya",
    publishedAt: "2026-08-31",
    views: 980,
  },
  {
    id: "post-3",
    title: "Perkuat Kemitraan Industri, Kelas MODENA Disiapkan Jadi Modena Technical School",
    slug: "perkuat-kemitraan-industri-kelas-modena-disiapkan-jadi-modena-technical-school",
    excerpt: "Program link-and-match menghadirkan sertifikasi kompetensi industri appliances berstandar internasional bagi taruna jurusan elektronika dan ketenagalistrikan.",
    content: `
      <p>YOGYAKARTA – SMK Negeri 3 Yogyakarta menjalin peningkatan kemitraan strategis bersama PT MODENA Indonesia. Ruang kelas dan laboratorium praktek kini resmi ditingkatkan fasilitasnya menjadi 'Modena Technical School', pusat pelatihan teknisi home appliances terlengkap di Jawa Bagian Tengah.</p>
      <p>Melalui kurikulum khusus ini, siswa mempelajari langsung teknologi kompor induksi, smart refrigerator, oven digital, serta sistem pendingin hemat energi, dengan jaminan sertifikasi industri dan peluang rekrutmen kerja langsung di service center Modena seluruh Indonesia.</p>
    `,
    category: "Berita",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-19.49.05-1-260x195.jpeg",
    author: "Tim Humas & Hubin",
    publishedAt: "2026-08-19",
    views: 1150,
  },
  {
    id: "post-4",
    title: "FESTA MANGAJAPA, 2.000 Siswa SMKN 3 Yogyakarta Hidupkan Seni dan Budaya di Usia ke-61",
    slug: "festa-mangajapa-2-000-siswa-smkn-3-yogyakarta-hidupkan-seni-dan-budaya-di-usia-ke-61",
    excerpt: "Perayaan HUT Mangajapa menyajikan parade kirab budaya nusantara, pameran inovasi mesin, dan kreasi teknologi karya taruna-taruni.",
    content: `
      <p>YOGYAKARTA – Semarak perayaan ulang tahun Festa Mangajapa di kampus STM 2 Jetis Yogyakarta berlangsung meriah dengan partisipasi lebih dari 2.000 siswa. Berbagai kesenian tradisional dipadukan dengan pameran prototipe teknologi bengkel 8 jurusan, menumbuhkan rasa bangga almamater.</p>
    `,
    category: "Berita",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    author: "OSIS & MPK Skagata",
    publishedAt: "2026-08-20",
    views: 890,
  },
  {
    id: "post-5",
    title: "Pengumuman Hasil Akhir Seleksi Penerimaan Murid Baru (SPMB) SMKN 3 Yogyakarta Tahun 2026",
    slug: "pengumuman-hasil-akhir-seleksi-penerimaan-murid-baru-spmb-smkn-3-yogyakarta-2026",
    excerpt: "Hasil seleksi resmi calon taruna baru jalur zonasi, prestasi, dan afirmasi tahun ajaran 2026/2027 dapat diakses secara transparan beserta panduan daftar ulang.",
    content: `
      <p>Berdasarkan Surat Keputusan Kepala SMK Negeri 3 Yogyakarta tentang Hasil Seleksi Penerimaan Murid Baru (SPMB) Provinsi D.I. Yogyakarta Tahun Pelajaran 2026/2027, diumumkan daftar nama calon taruna-taruni yang dinyatakan DITERIMA pada 8 program keahlian.</p>
      <p>Calon taruna diwajibkan melakukan daftar ulang secara daring dan verifikasi berkas fisik di aula sekolah sesuai jadwal yang ditentukan dengan membawa dokumen kelulusan asli.</p>
    `,
    category: "Pengumuman",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2021/07/logosmk3yk-1024x1024.png",
    author: "Panitia SPMB Skagata",
    publishedAt: "2026-06-26",
    views: 3450,
  },
  {
    id: "post-6",
    title: "SMKN 3 Yogyakarta Jadi Tuan Rumah LKS Tingkat Provinsi DIY: Pacu Semangat Kompetitif Siswa Vokasi",
    slug: "smkn-3-yogyakarta-jadi-tuan-rumah-lks-tingkat-provinsi-diy-pacu-semangat-kompetitif",
    excerpt: "Ajang bergengsi Lomba Keterampilan Siswa (LKS) mempertandingkan keahlian CNC Milling, Welding, Electrical Installation, dan Bricklaying di bengkel modern Skagata.",
    content: `
      <p>YOGYAKARTA – SMK Negeri 3 Yogyakarta kembali dipercaya sebagai tuan rumah penyelenggaraan Lomba Keterampilan Siswa (LKS) SMK Tingkat Provinsi DIY. Bengkel CNC Machining Center dan Laboratorium Elektro Skagata menjadi saksi persaingan ketat para talenta vokasi terbaik se-DIY.</p>
    `,
    category: "Artikel",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2026/04/q-260x195.jpg",
    author: "Drs. Eko Prasetyo",
    publishedAt: "2026-04-08",
    views: 740,
  },
  {
    id: "post-7",
    title: "Career Day SMKN 3 Yogyakarta: Jembatani Dunia Pendidikan dengan 40+ Perusahaan Industri Nasional",
    slug: "career-day-smkn-3-yogyakarta-jembatani-dunia-pendidikan-dengan-industri",
    excerpt: "Bursa Kerja Khusus (BKK) menyelenggarakan job fair dan walk-in interview langsung dari industri otomotif, konstruksi sipil, manufaktur logam, dan telekomunikasi.",
    content: `
      <p>YOGYAKARTA – Bursa Kerja Khusus (BKK) SMK Negeri 3 Yogyakarta sukses menghelat Skagata Career Day yang dihadiri oleh 40 lebih mitra industri bonafide. Ratusan alumni dan siswa kelas XII langsung mengikuti proses rekrutmen kerja dan psikotes di tempat.</p>
    `,
    category: "Artikel",
    coverImage: "https://smkn3jogja.sch.id/wp-content/uploads/2025/09/Job-fair-4-260x195.jpg",
    author: "Koordinator BKK",
    publishedAt: "2025-09-19",
    views: 1280,
  },
];

export const TEACHERS_DATA: TeacherStaffData[] = [
  {
    id: "tch-1",
    name: "Widodo, M.Pd.",
    nip: "19680512 199403 1 008",
    role: "Kepala Sekolah",
    department: "Pimpinan Sekolah",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-2",
    name: "Drs. Agus Triyono, M.T.",
    nip: "19710315 199702 1 003",
    role: "Wakil Kepala Sekolah Bidang Kurikulum",
    department: "Manajemen Sekolah",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-3",
    name: "Budi Santosa, S.Pd., M.Eng.",
    nip: "19750820 200212 1 005",
    role: "Wakil Kepala Sekolah Bidang Kesiswaan",
    department: "Ketarunaan & Kesiswaan",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-4",
    name: "Siti Rahmawati, S.T., M.Cs.",
    nip: "19801104 200604 2 012",
    role: "Ketua Program Keahlian TJKT",
    department: "Teknik Jaringan Komputer & Telekomunikasi",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-5",
    name: "Ir. Bambang Haryadi, M.T.",
    nip: "19720918 200003 1 004",
    role: "Ketua Program Keahlian Teknik Pemesinan",
    department: "Teknik Mesin (Pemesinan)",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "tch-6",
    name: "Tri Wibowo, S.Pd.",
    nip: "19830422 200902 1 006",
    role: "Ketua Program Keahlian Broadcasting & Perfilman",
    department: "Broadcasting & Perfilman",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
];

export const JOBS_DATA: JobData[] = [
  {
    id: "job-1",
    title: "Teknisi Konstruksi Bangunan & Sipil (Tokyo & Osaka, Jepang)",
    company: "Konsorsium Konstruksi Mitra Jepang",
    location: "Tokyo & Osaka, Jepang",
    type: "Program Karir Jepang",
    deadline: "2026-11-30",
    description:
      "Program rekrutmen kerja formal ke Jepang untuk alumni SMKN 3 Yogyakarta program DPIB, TKP, TITL, dan TP. Kontrak kerja 3-5 tahun dengan visa Tokutei Ginou / Gijinkoku.",
    requirements: [
      "Lulusan SMK Negeri 3 Yogyakarta jurusan DPIB, TKP, TITL, TP",
      "Kondisi fisik prima dan sehat jasmani/rohani",
      "Lulus tes wawancara user dan bersedia mengikuti pelatihan bahasa Jepang",
      "Memiliki sertifikat kompetensi keahlian LSP P1",
    ],
    linkApply: "https://smkn3yk.sch.id/telusuri/lowongan",
  },
  {
    id: "job-2",
    title: "Home Appliances Service Specialist",
    company: "PT MODENA Indonesia",
    location: "Yogyakarta & Jawa Tengah",
    type: "Full-Time",
    deadline: "2026-10-31",
    description:
      "Peluang karir langsung bagi lulusan Teknik Elektronika dan Teknik Ketenagalistrikan untuk ditempatkan sebagai teknisi resmi MODENA.",
    requirements: [
      "Lulusan Teknik Elektronika atau Listrik SMKN 3 Yogyakarta",
      "Memahami sirkuit daya, kontrol mikrokontroler, dan sistem pendingin",
      "Memiliki SIM C dan kendaraan pribadi",
      "Komunikatif dan berorientasi pada kepuasan pelanggan",
    ],
    linkApply: "https://smkn3yk.sch.id/telusuri/lowongan",
  },
  {
    id: "job-3",
    title: "Junior Machining & CNC Operator",
    company: "PT Yogya Presisi Tehnikatama Industri (YPTI)",
    location: "Sleman, D.I. Yogyakarta",
    type: "Full-Time",
    deadline: "2026-10-15",
    description:
      "Operator mesin bubut, frais, dan CNC Milling untuk pembuatan mold plastik & komponen presisi tinggi manufaktur aerospace.",
    requirements: [
      "Lulusan Teknik Pemesinan SMKN 3 Yogyakarta",
      "Mampu membaca gambar teknik 2D/3D",
      "Mampu mengoperasikan alat ukur presisi (Mikrometer, Vernier Caliper)",
      "Disiplin, teliti, dan siap bekerja sistem shift",
    ],
    linkApply: "https://smkn3yk.sch.id/telusuri/lowongan",
  },
];

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  badge: string;
  description: string;
  image?: string;
}

export interface ArchivePhoto {
  id: string;
  title: string;
  caption: string;
  year: string;
  image: string;
  tag: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  equipment?: string[];
}

export interface SchoolIdentityData {
  namaSekolah: string;
  npsn: string;
  bentukSekolah: string;
  statusSekolah: string;
  alamat: string;
  statusKepemilikan: string;
  nomorTelpon: string;
  nomorFax: string;
  email: string;
  website: string;
  sertifikasiIso: string;
  aksesInternet: string;
  kompetensiKeahlian: string[];
  akreditasi: string;
  jumlahRombel: string;
  jumlahGuru: string;
  jumlahTendik: string;
}

export interface HistoryHeroData {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  imageTag: string;
  imageCaption: string;
}

export interface SchoolProfile {
  headmasterGreeting: {
    title: string;
    subtitle: string;
    photo: string;
    content: string[];
  };
  vision: string;
  missions: string[];
  goals: string[];
  ketarunaanValues: {
    number: number;
    title: string;
    desc: string;
  }[];
  identity: SchoolIdentityData;
  historyHero: HistoryHeroData;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  email: string;
}

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: "hist-1",
    year: "1952",
    title: "Cikal Bakal Berdirinya STM 2 Jetis (STM 2 Yogyakarta)",
    badge: "Tonggak Sejarah",
    description:
      "Didirikan sebagai salah satu Sekolah Menengah Teknik Negeri pertama di Yogyakarta dan Indonesia. Berlokasi di Jalan Robert Wolter Monginsidi No. 2 Jetis, sekitar 1 km utara Tugu Yogyakarta. Awalnya memfokuskan pendidikan pada keahlian mesin bubut dan konstruksi bangunan guna mengisi tenaga teknik pasca-kemerdekaan.",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
  },
  {
    id: "hist-2",
    year: "1970 - 1985",
    title: "Era Ekspansi Jurusan Listrik, Elektronika, dan Otomotif",
    badge: "Perluasan Kampus",
    description:
      "Seiring berkembangnya industrialisasi nasional, STM 2 Jetis memperluas fasilitas bengkel kerja terpadu. Dibangun laboratorium instalasi listrik tenaga, bengkel motor bakar otomotif, dan perbengkelan fabrikasi logam yang menjadi rujukan sekolah teknik se-Indonesia.",
  },
  {
    id: "hist-3",
    year: "1997",
    title: "Transformasi Nomenklatur Menjadi SMK Negeri 3 Yogyakarta",
    badge: "Era Modernisasi",
    description:
      "Berdasarkan kebijakan nasional Depdikbud, nama STM 2 Jetis secara resmi berganti nama menjadi SMK Negeri 3 Yogyakarta (dikenal akrab dengan singkatan SKAGATA). Tetap mempertahankan julukan legendaris STM 2 Jetis sebagai identitas almamater yang disegani.",
  },
  {
    id: "hist-4",
    year: "2010 - 2018",
    title: "Pionir Pendidikan Karakter Berbasis Ketarunaan & Skagata TV",
    badge: "Inovasi Karakter",
    description:
      "Menjadi sekolah kejuruan perintis di D.I. Yogyakarta yang menerapkan sistem pembinaan karakter berbasis ketarunaan (semi-militer humanis) bersama institusi TNI/Polri untuk membangun kedisiplinan dan integritas taruna. Di era ini pula studio penyiaran Skagata TV dan jurusan Multimedia/Broadcasting resmi didirikan.",
  },
  {
    id: "hist-5",
    year: "2020 - 2023",
    title: "Penetapan Sebagai SMK Pusat Keunggulan (SMK-PK)",
    badge: "Pusat Keunggulan",
    description:
      "Ditetapkan oleh Kemendikbudristek sebagai SMK Pusat Keunggulan (Center of Excellence). Memperoleh revitalisasi bengkel CNC Machining Center modern, sertifikasi kelembagaan LSP P1 BNSP, serta pendirian BLUD Skagata Solutions untuk Teaching Factory bernilai ekonomis mandiri.",
  },
  {
    id: "hist-6",
    year: "2024 - 2026",
    title: "Kelas Industri Modena & Penyaluran Karir ke Jepang",
    badge: "Kiprah Global",
    description:
      "Meresmikan Modena Technical School sebagai kelas industri home appliances pertama di Jateng-DIY, menjalin kemitraan internasional penyaluran langsung teknisi konstruksi dan manufaktur ke Tokyo & Osaka Jepang, serta mentransformasikan seluruh operasional kampus menjadi Paperless Smart Campus.",
  },
];

export const INITIAL_ARCHIVE_PHOTOS: ArchivePhoto[] = [
  {
    id: "arc-1",
    title: "Gedung Heritage Pintu Masuk STM 2 Jetis",
    caption: "Pintu gerbang utama bergaya arsitektur kolonial tropis di Jl. RW Monginsidi No. 2 Yogyakarta.",
    year: "Era 1960",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    tag: "Arsitektur Heritage",
  },
  {
    id: "arc-2",
    title: "Praktek Perbengkelan Pemesinan & CNC",
    caption: "Taruna mengoperasikan mesin bubut dan permesinan presisi di bengkel teknik STM 2 Jetis.",
    year: "Era Vokasi",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-11-at-08.33.41-576x1024.jpeg",
    tag: "Praktik Bengkel",
  },
  {
    id: "arc-3",
    title: "Upacara Adat Gagrag Ngayogyakarta Taruna",
    caption: "Tradisi busana adat Mataram Ngayogyakarta dan kedisiplinan taruna di Lapangan Utama Jetis.",
    year: "Keistimewaan",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-31-at-18.30.44-2-260x195.jpeg",
    tag: "Ketarunaan & Budaya",
  },
  {
    id: "arc-4",
    title: "Kemitraan Kelas Industri Modena & DUDIKA",
    caption: "Penandatanganan kerja sama magang, sertifikasi industri, dan rekrutmen kerja alumni Skagata.",
    year: "Era Modern",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-19-at-19.49.05-1-260x195.jpeg",
    tag: "Kerjasama Industri",
  },
];

export const INITIAL_FACILITIES: FacilityItem[] = [
  {
    id: "fac-1",
    title: "Bengkel CNC Machining Center 5-Axis",
    category: "Pemesinan",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/MESIN-2023-1024x683.jpg",
    desc: "Bengkel standar industri dirgantara dengan 12 unit mesin CNC Milling & Turning Fanuc/Siemens, mesin bubut presisi tinggi, dan mesin gerinda datar.",
    equipment: ["CNC Milling 5-Axis", "CNC Turning Lathe", "Surface Grinding", "CMM Inspection Tool"],
  },
  {
    id: "fac-2",
    title: "Studio Skagata TV & Sound Stage Broadcast",
    category: "Broadcasting",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/BC-2023-1024x683.jpg",
    desc: "Studio rekaman akustik berstandar siaran TV digital, switcher multicam 4K Blackmagic Design, lighting grid DMX, dan lab editing DaVinci Resolve.",
    equipment: ["Kamera 4K Broadcast", "Blackmagic ATEM Switcher", "Teleprompter Pro", "Soundproofing Studio"],
  },
  {
    id: "fac-3",
    title: "Lab Fiber Optic & Cloud Computing Center",
    category: "Jaringan",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    desc: "Laboratorium berstandar MikroTik Certified Training Partner Eropa, alat sambung Fusion Splicer, alat ukur OTDR, rack server, dan mini data center.",
    equipment: ["MikroTik Routerboard CCR", "Fusion Splicer Fiber Optic", "OTDR Anritsu", "Mini Server Rack"],
  },
  {
    id: "fac-4",
    title: "Modena Technical School & Otomasi Industri",
    category: "Elektronika",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-11-at-08.33.41-576x1024.jpeg",
    desc: "Laboratorium perakitan home appliances modern bersama PT MODENA Indonesia, trainer PLC Omron/Siemens, dan trainer robotika otonom.",
    equipment: ["Trainer Home Appliances MODENA", "PLC Omron Sysmac", "Trainer Robotika Autonomous", "Oscilloscope Digital"],
  },
  {
    id: "fac-5",
    title: "Bengkel TEFA Skagata Auto Service & Spooring 3D",
    category: "Otomotif",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-06-at-09.29.53-576x1024.jpeg",
    desc: "Dilengkapi 4 unit car lift hidrolik, alat spooring 3D komputerisasi, tyre changer, engine scanner OBD II, dan unit uji emisi gas buang.",
    equipment: ["4 Car Lift Hidrolik", "Kamera Sensor Spooring 3D", "Engine Scanner OBD II", "Gas Analyzer Emisi"],
  },
  {
    id: "fac-6",
    title: "Perpustakaan Widura Digital Library",
    category: "Fasilitas Umum",
    image: "https://smkn3jogja.sch.id/wp-content/uploads/2023/04/TJ-2023-1024x683.jpg",
    desc: "Katalog online OPAC Widura, ruang baca ber-AC yang nyaman, ribuan koleksi buku referensi vokasi teknik, dan akses e-journal ilmiah.",
    equipment: ["Katalog OPAC Komputer", "Akses Jurnal Ilmiah Online", "Ruang Diskusi Ber-AC", "10.000+ Judul Buku Teknik"],
  },
];

export const INITIAL_PROFILE: SchoolProfile = {
  headmasterGreeting: {
    title: "Sambutan Kepala Sekolah",
    subtitle: "Widada, S.Pd, M.Pd — Kepala SMK Negeri 3 Yogyakarta",
    photo: "https://smkn3jogja.sch.id/wp-content/uploads/2025/03/Widada_KS-scaled.jpg",
    content: [
      "Assalamualaikum Warrahmatullahi Wabarakatuh, Salam sejahtera bagi kita semua.",
      "Era revolusi Industri 4.0 menuju ke 5.0 dengan ditandainya kemajuan ilmu pengetahuan dan teknologi digital yang pesat serta perubahannya dalam hitungan detik akan berimbas pada aspek kehidupan masyarakat, karenanya harus ada upaya sungguh-sungguh untuk mengantisipasinya dan mengikutinya.",
      "Dunia pendidikan mempunyai tanggung jawab yang besar untuk menyiapkan sumber daya manusia yang mumpuni, kompetitif dan unggul sehingga mampu hidup dengan perubahan yang ada tetap menjaga nilai-nilai kearifan budaya lokal.",
      "Pendidikan investasi masa depan, sekolah sebagai sarana untuk mengembangkan minat, bakat dan potensi serta membekali karakter, pengetahuan dan keterampilan untuk menyongsong permasalahan kekinian. Mari kita Kerja keras, kerja cerdas, kerja tuntas, kerja berkualitas dan kerja ikhlas untuk mensukseskan masa depan peserta didik.",
      "Wassalamualaikum Warrahmatullahi Wabarakatuh.",
    ],
  },
  vision: "Terwujudnya tamatan yang beriman, unggul, berbudaya, berwawasan lingkungan, berjiwa wirausaha, dan berdaya saing.",
  missions: [
    "Melaksanakan pendidikan dan kegiatan keagamaan sesuai dengan ajaran yang dianut guna membentuk insan beriman dan bertaqwa.",
    "Melaksanakan kegiatan pembelajaran berbasis teknologi informasi dan industri modern secara adaptif.",
    "Mengoptimalkan pembimbingan kegiatan akademik dan non-akademik berstandar sertifikasi nasional dan internasional (LSP P1 BNSP).",
    "Mewujudkan lingkungan belajar yang berkarakter ketarunaan dan berbudaya luhur khas Yogyakarta (adiluhung).",
    "Melaksanakan pembelajaran berbasis wirausaha mandiri melalui inkubasi bisnis (Teaching Factory & BLUD Skagata Solutions).",
    "Mengembangkan kepedulian terhadap kelestarian fungsi lingkungan hidup sekolah (Adiwiyata Mandiri).",
  ],
  goals: [
    "Terserapnya lebih dari 85% tamatan di dunia kerja nasional dan multinasional.",
    "100% siswa memiliki sertifikasi kompetensi dari Lembaga Sertifikasi Profesi (LSP P1 BNSP).",
    "Peningkatan jumlah lulusan yang berwirausaha mandiri dan melanjutkan studi ke perguruan tinggi terkemuka.",
  ],
  ketarunaanValues: [
    { number: 1, title: "Disiplin & Integritas", desc: "Ketepatan waktu dan komitmen moral dalam setiap perbuatan." },
    { number: 2, title: "Tanggung Jawab", desc: "Menjalankan tugas amanah teknis dengan ketelitian maksimal." },
    { number: 3, title: "Kejujuran", desc: "Transparansi dan kebenaran data dalam setiap karya teknik." },
    { number: 4, title: "Jiwa Korsa", desc: "Solidaritas persaudaraan dan kebersamaan antar-almamater." },
    { number: 5, title: "Kreativitas & Inovasi", desc: "Kecerdasan solutif memecahkan masalah rekayasa industri." },
    { number: 6, title: "Kepedulian Lingkungan", desc: "Budaya K3 (Kesehatan & Keselamatan Kerja) serta 5R/5S." },
    { number: 7, title: "Nasionalisme", desc: "Kecintaan mendalam kepada Tanah Air Indonesia dan budaya bangsa." },
  ],
  identity: {
    namaSekolah: "SMK Negeri 3 Yogyakarta",
    npsn: "20404181",
    bentukSekolah: "SMK",
    statusSekolah: "Negeri",
    alamat: "Jl. RW. Monginsidi No. 2 RT 17 RW 4 Cokrodiningratan Jetis Yogyakarta 55233",
    statusKepemilikan: "Pemerintah Daerah",
    nomorTelpon: "0274513503",
    nomorFax: "0274582322",
    email: "humas@smkn3jogja.sch.id",
    website: "https://smkn3jogja.sch.id",
    sertifikasiIso: "9001:2015",
    aksesInternet: "Fiber Optik",
    kompetensiKeahlian: [
      "Broadcasting & Perfilman",
      "Teknik Jaringan Komputer & Telekomunikasi",
      "Desain Pemodelan & Informasi Bangunan",
      "Teknik Konstruksi & Perumahan",
      "Teknik Elektronika",
      "Teknik Ketenagalistrikan",
      "Teknik Otomotif",
      "Teknik Mesin",
    ],
    akreditasi: "A",
    jumlahRombel: "60 kelas",
    jumlahGuru: "148 orang",
    jumlahTendik: "39 orang",
  },
  historyHero: {
    badge: "Rekam Jejak Kejuruan Sejak 1952",
    title: "Perjalanan Sejarah SMK Negeri 3 Yogyakarta (STM 2 Jetis)",
    subtitle:
      "Menelusuri lebih dari tujuh dekade dedikasi tanpa henti dalam mencetak ratusan ribu teknisi handal, insinyur, akademisi, dan pemimpin industri yang mewarnai pembangunan infrastruktur dan manufaktur Indonesia.",
    image:
      "https://smkn3jogja.sch.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-20-at-21.07.59-1-260x195.jpeg",
    imageTag: "Arsip Tradisi Skagata",
    imageCaption: "Semarak Perayaan 61 Tahun Festa Mangajapa",
  },
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  facebook: "https://web.facebook.com/smkn3yogyakarta",
  twitter: "https://twitter.com/smkn3jogja",
  instagram: "https://www.instagram.com/smkn3jogja/",
  youtube: "https://www.youtube.com/c/SkagataTV",
  email: "mailto:humas@smkn3jogja.sch.id",
};

export interface PortalItem {
  id: string;
  type: "sejarah" | "visi-misi" | "prestasi" | "kerjasama";
  title: string;
  subtitle: string;
  link: string;
}

export const INITIAL_PORTAL_ITEMS: PortalItem[] = [
  {
    id: "sejarah",
    type: "sejarah",
    title: "Sejarah",
    subtitle: "SMKN 3 Yogyakarta",
    link: "/profil/sejarah",
  },
  {
    id: "visi-misi",
    type: "visi-misi",
    title: "Visi Misi",
    subtitle: "SMKN 3 Yogyakarta",
    link: "/profil/visi-misi",
  },
  {
    id: "prestasi",
    type: "prestasi",
    title: "Prestasi",
    subtitle: "Guru, Tendik, & Siswa",
    link: "/kabar?category=Berita",
  },
  {
    id: "kerjasama",
    type: "kerjasama",
    title: "Kerjasama",
    subtitle: "DUDIKA",
    link: "/karir",
  },
];

export interface TokohQuoteItem {
  id: string;
  name: string;
  title: string;
  organization: string;
  badge: string;
  quote: string;
  image: string;
}

export const INITIAL_TOKOH_QUOTES: TokohQuoteItem[] = [
  {
    id: "sultan",
    name: "Sri Sultan Hamengku Buwono X",
    title: "Gubernur Daerah Istimewa Yogyakarta",
    organization: "Kasultanan Ngayogyakarta Hadiningrat",
    badge: "Amanat Pemimpin DIY",
    quote:
      "Pendidikan kejuruan di Daerah Istimewa Yogyakarta memegang peranan krusial sebagai kawah candradimuka generasi muda. Lulusan SMK dituntut tidak hanya menguasai kecakapan teknologi industri modern, melainkan juga memiliki keluhuran budi pekerti, kepemimpinan berkarakter ketarunaan, serta komitmen menjaga peradaban dan nilai budaya adiluhung Yogyakarta.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sultan_Hamengkubuwono_X%2C_Governor_of_Special_Region_of_Yogyakarta.jpg/800px-Sultan_Hamengkubuwono_X%2C_Governor_of_Special_Region_of_Yogyakarta.jpg",
  },
  {
    id: "wikan",
    name: "Wikan Sakarinto, S.T., M.Sc., Ph.D.",
    title: "Dirjen Pendidikan Vokasi Kemendikbudristek (2020–2022)",
    organization: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI",
    badge: "Apresiasi Ditjen Vokasi",
    quote:
      "SMK Negeri 3 Yogyakarta adalah perwujudan nyata konsep 'Link and Match 8+i' yang paripurna. Dengan mengawinkan kurikulum industri global, pembelajaran berbasis proyek riil (TEFA & BLUD), sertifikasi kompetensi bertaraf internasional, serta kedisiplinan ketarunaan, tamatan Skagata menjadi incaran utama dunia kerja nasional maupun mancanegara.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Wikan_Sakarinto_PhD.jpg",
  },
  {
    id: "hanung",
    name: "Hanung Bramantyo",
    title: "Sutradara Film Nasional & Tokoh Industri Kreatif",
    organization: "Dapur Film Indonesia",
    badge: "Inspirasi Sineas Nasional",
    quote:
      "Ruang kreasi perfilman dan teknologi broadcasting di SMK Negeri 3 Yogyakarta membuktikan bahwa anak-anak muda mampu melahirkan karya sinematik berkualitas tinggi dengan teknologi modern tanpa tercerabut dari akar kearifan lokal. Yogyakarta adalah panggung cerita nusantara, dan Skagata adalah salah satu pabrik talenta kreatif terdepannya.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Hanung_Bramantyo%2C_Jogja-Netpac_Asian_Film_Festival%2C_2017-12-04_02.jpg/800px-Hanung_Bramantyo%2C_Jogja-Netpac_Asian_Film_Festival%2C_2017-12-04_02.jpg",
  },
];

export type AIProvider = "gemini" | "groq" | "openrouter";

export interface ChatbotSettings {
  enabled: boolean;
  provider: AIProvider;
  apiKey: string; // Google AI Studio (Gemini)
  groqApiKey: string; // Groq Cloud
  openRouterApiKey: string; // OpenRouter
  model: string;
  botName: string;
  greeting: string;
  systemPrompt: string;
  quickPrompts: string[];
}

export const INITIAL_CHATBOT_SETTINGS: ChatbotSettings = {
  enabled: true,
  provider: "gemini",
  apiKey: "",
  groqApiKey: "",
  openRouterApiKey: "",
  model: "gemini-1.5-flash",
  botName: "Skagata Bot AI",
  greeting:
    "Halo! Saya Skagata Bot AI, asisten virtual resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis). Ada yang bisa saya bantu terkait 8 Jurusan Keahlian, Informasi Pendaftaran SPMB 2026, Pendidikan Ketarunaan, atau Layanan Sekolah?",
  systemPrompt:
    "Anda adalah Skagata Bot AI, asisten kecerdasan buatan resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis). Berikan jawaban yang ramah, sopan, akurat, informatif, dan menjunjung tinggi nilai budaya Yogyakarta serta disiplin ketarunaan. Sekolah memiliki 8 jurusan: Broadcasting & Perfilman, TJKT, DPIB, TKP, Teknik Elektronika, Teknik Ketenagalistrikan, Teknik Otomotif, dan Teknik Mesin. NPSN sekolah 20404181, beralamat di Jl. Robert Wolter Monginsidi No. 2, Cokrodiningratan, Jetis, Yogyakarta. Berikan jawaban terstruktur dengan poin-poin yang mudah dibaca.",
  quickPrompts: [
    "Rekomendasi Jurusan yang Cocok",
    "Syarat & Alur Pendaftaran SPMB",
    "Apa saja 8 Jurusan Keahlian?",
    "Bagaimana Sistem Ketarunaan?",
    "Alamat & Kontak Resmi Sekolah",
    "Program Magang Kerja ke Jepang",
  ],
};

export interface QuizOption {
  id: string;
  text: string;
  primaryMajor: string;
  secondaryMajor?: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Aktivitas apa yang paling membuatmu lupa waktu saat punya waktu luang?",
    subtitle: "Pilih kegiatan yang paling menggambarkan ketertarikan alamimu sehari-hari.",
    options: [
      {
        id: "1a",
        text: "Membuat video pendek, foto estetik, editing konten Reels/TikTok, atau mendesain grafis visual.",
        primaryMajor: "broadcasting",
        secondaryMajor: "tjkt",
        explanation: "Kamu memiliki bakat ekspresi visual, rasa estetika tajam, dan jiwa pencerita audio visual.",
      },
      {
        id: "1b",
        text: "Mengutak-atik laptop/komputer, setting WiFi/jaringan rumah, penasaran cara kerja internet, atau coding pemula.",
        primaryMajor: "tjkt",
        secondaryMajor: "elektronika",
        explanation: "Kamu memiliki rasa ingin tahu tinggi terhadap infrastruktur digital, konektivitas, dan komputasi modern.",
      },
      {
        id: "1c",
        text: "Menggambar denah rumah impian, sketsa gedung estetik, miniatur 3D, atau mengagumi konstruksi jembatan.",
        primaryMajor: "dpib",
        secondaryMajor: "tkp",
        explanation: "Kamu dikaruniai daya spasial yang kuat, presisi arsitektural, dan visi rancang bangun fisik.",
      },
      {
        id: "1d",
        text: "Membongkar mesin sepeda motor/mobil, merakit sirkuit komponen elektronik, atau menyolder dan mengelas besi.",
        primaryMajor: "otomotif",
        secondaryMajor: "mesin",
        explanation: "Kamu adalah tipe praktisi handal yang menyukai ketangkasan tangan, mekanika gerak, dan rekayasa fisik.",
      },
    ],
  },
  {
    id: 2,
    question: "Mata pelajaran atau bidang yang paling kamu nikmati selama di SMP?",
    subtitle: "Pilih mata pelajaran yang terasa paling menantang sekaligus memuaskan bagimu.",
    options: [
      {
        id: "2a",
        text: "Seni Budaya, Bahasa, Sinematografi, Desain Grafis, atau Public Speaking & Wawancara.",
        primaryMajor: "broadcasting",
        secondaryMajor: "tjkt",
        explanation: "Kreativitas seni dan komunikasi publik adalah kekuatan intimu.",
      },
      {
        id: "2b",
        text: "Informatika / TIK, Logika Matematika, Algoritma, dan Analisis Data.",
        primaryMajor: "tjkt",
        secondaryMajor: "elektronika",
        explanation: "Kemampuan logika analitis dan pemikiran terstruktur adalah modal utama di era industri 4.0.",
      },
      {
        id: "2c",
        text: "Matematika Geometri, Menggambar Bangunan / Mistar, dan Fisika Bangunan.",
        primaryMajor: "dpib",
        secondaryMajor: "tkp",
        explanation: "Pemahaman geometri bidang dan mekanika struktur membuatmu unggul dalam rekayasa sipil.",
      },
      {
        id: "2d",
        text: "Fisika Listrik/Magnet, Kerja Bengkel Praktek, dan Mesin Perkakas.",
        primaryMajor: "ketenagalistrikan",
        secondaryMajor: "mesin",
        explanation: "Penguasaan energi, kelistrikan, dan permesinan manufaktur menjadi passion teknismu.",
      },
    ],
  },
  {
    id: 3,
    question: "Lingkungan kerja impian seperti apa yang paling kamu bayangkan di masa depan?",
    subtitle: "Bayangkan suasana tempat kamu berkarya dan mendapatkan penghasilan terbaik.",
    options: [
      {
        id: "3a",
        text: "Studio produksi film profesional, stasiun televisi nasional, agensi periklanan, atau shooting di berbagai lokasi eksotis.",
        primaryMajor: "broadcasting",
        secondaryMajor: "tjkt",
        explanation: "Dunia hiburan kreatif dan broadcast pertelevisian yang dinamis dan berkelas.",
      },
      {
        id: "3b",
        text: "Ruang Server Data Center ber-AC sejuk, tech startup unicorn, perusahaan ISP telekomunikasi, atau remote working global.",
        primaryMajor: "tjkt",
        secondaryMajor: "elektronika",
        explanation: "Jantung infrastruktur digital dunia yang menjamin internet dan komputasi tetap stabil tanpa henti.",
      },
      {
        id: "3c",
        text: "Studio konsultan arsitektur bergengsi, proyek konstruksi gedung megah, atau kantor kontraktor properti.",
        primaryMajor: "dpib",
        secondaryMajor: "tkp",
        explanation: "Menciptakan skyline kota dan bangunan ikonik yang berdiri kokoh puluhan tahun.",
      },
      {
        id: "3d",
        text: "Pabrik manufaktur otomotif/alat berat modern (Daihatsu, Toyota, Jepang), bengkel resmi, atau pembangkit energi PLN.",
        primaryMajor: "mesin",
        secondaryMajor: "otomotif",
        explanation: "Pusat industri manufaktur presisi dunia dengan standar keteknikan dan keselamatan internasional.",
      },
    ],
  },
  {
    id: 4,
    question: "Ketika melihat inovasi teknologi terbaru, aspek mana yang paling membuatmu penasaran?",
    subtitle: "Pilih sudut pandang yang secara otomatis muncul di pikiranmu.",
    options: [
      {
        id: "4a",
        text: "Bagaimana cara merekam, menyunting sudut kamera, dan mengemas cerita audio visualnya agar memikat jutaan penonton.",
        primaryMajor: "broadcasting",
        secondaryMajor: "tjkt",
        explanation: "Fokus pada storytelling visual dan kekuatan penyampaian pesan ke publik.",
      },
      {
        id: "4b",
        text: "Bagaimana sistem keamanannya, protokol jaringannya, routing data awan (cloud), dan kecerdasan buatannya.",
        primaryMajor: "tjkt",
        secondaryMajor: "elektronika",
        explanation: "Fokus pada cyber security, otomasi server, dan transmisi data berkecepatan tinggi.",
      },
      {
        id: "4c",
        text: "Bagaimana desain 3D bangunannya direncanakan menggunakan software BIM/CAD sebelum dibangun fisik.",
        primaryMajor: "dpib",
        secondaryMajor: "tkp",
        explanation: "Fokus pada digital modeling, efisiensi material, dan estetika struktur.",
      },
      {
        id: "4d",
        text: "Bagaimana sensor micro-controller, motor servo penggerak, sistem tenaga listrik, dan gir mesinnya bekerja serasi.",
        primaryMajor: "elektronika",
        secondaryMajor: "ketenagalistrikan",
        explanation: "Fokus pada integrasi mekatronika, otomasi industri, dan efisiensi konversi daya energi.",
      },
    ],
  },
  {
    id: 5,
    question: "Apa tujuan karir terbesarmu setelah lulus dari kawah candradimuka Skagata?",
    subtitle: "Visi masa depan yang ingin kamu capai bersama gelar teknisi unggul.",
    options: [
      {
        id: "5a",
        text: "Menjadi Sutradara/Director of Photography, Editor Film, atau Produser Konten Multimedia ternama.",
        primaryMajor: "broadcasting",
        secondaryMajor: "tjkt",
        explanation: "Mencetak karya audio visual legendaris yang menginspirasi banyak orang.",
      },
      {
        id: "5b",
        text: "Menjadi Network Architect, Cloud Engineer, atau Cyber Security Specialist bersertifikasi Cisco/MikroTik.",
        primaryMajor: "tjkt",
        secondaryMajor: "elektronika",
        explanation: "Menjadi arsitek jaringan tulang punggung telekomunikasi skala nasional maupun global.",
      },
      {
        id: "5c",
        text: "Menjadi Perancang Arsitektur (BIM Modeler), Quantity Surveyor, atau Kontraktor Pengusaha Bangunan.",
        primaryMajor: "dpib",
        secondaryMajor: "tkp",
        explanation: "Membangun peradaban fisik dengan tata ruang yang ramah lingkungan dan aman bencana.",
      },
      {
        id: "5d",
        text: "Bekerja sebagai Teknisi Ahli di Jepang/Multinasional, Teknisi Otomotif & Alat Berat, atau Teknisi BUMN PLN.",
        primaryMajor: "otomotif",
        secondaryMajor: "mesin",
        explanation: "Menjadi ujung tombak industri keteknikan dunia dengan etos kerja ketarunaan berstandar Jepang.",
      },
    ],
  },
];

