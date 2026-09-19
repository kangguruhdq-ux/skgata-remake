# SMK Negeri 3 Yogyakarta (STM 2 Jetis) - Website Remake & Modern Portal

Portal resmi SMK Negeri 3 Yogyakarta yang telah diremajakan dengan arsitektur modern, performa tinggi, animasi interaktif responsif (desktop & mobile), asisten pet AI maskot interaktif (*Si Gata*), integrasi multi-provider AI (Google Gemini, Groq, OpenRouter), serta sistem manajemen konten (CMS) admin menyeluruh dengan database persistence server-side.

---

## Fitur Utama

### 1. Desain Modern & Responsif
- **Glassmorphism & Micro-animations**: Animasi smooth menggunakan Framer Motion & CSS hardware acceleration.
- **Responsif PC & Mobile**: Seluruh layout, menu navbar, interaksi maskot, dan dashboard admin dioptimalkan penuh untuk layar smartphone maupun desktop.
- **Portal Gerbang 4 Pilar**: Representasi visual gerbang sekolah dengan ikon kode SVG responsif dan modern.
- **Navigasi Rapi**: Navbar presisi dengan dropdown lengkap, tautan layanan digital, dan pencarian cepat.

### 2. Maskot Interaktif "Si Gata" & AI Chatbot
- **Interactive Pet Mascot**: Maskot SVG interaktif yang merespons arah kursor mouse (PC) dan sentuhan jari/touch drag (mobile), ekspresi dinamis saat dielus (purr/squish/love hearts), dan dialog kontekstual.
- **Multi-Provider AI Intelligence**:
  - **Google Gemini** (Gemini 1.5 Flash / 2.0 Flash / Pro)
  - **Groq Cloud** (Llama 3.3 70B Versatile, Llama 3.1 8B Instant, Mixtral 8x7B, Gemma 2 9B)
  - **OpenRouter** (DeepSeek V3, Claude, GPT, dan model AI terbuka lainnya)
  - **Authentic Knowledge Base Engine**: Fallback otomatis jika offline atau kuota habis, menjawab pertanyaan seputar 8 jurusan, SPMB, sejarah STM 2 Jetis, dan kontak sekolah.
- **Pengaturan Langsung di Admin**: Admin dapat memilih engine aktif, memasukkan API key, memilih model AI, serta melakukan tes koneksi live dari dashboard.

### 3. Dashboard Admin CMS Menyeluruh
Admin dapat mengelola seluruh konten sekolah tanpa menyentuh source code:
- **Profil Sekolah & Identitas**: Kelola NPSN, akreditasi A, ISO 9001:2015, alamat, kontak, jumlah rombel, guru (148), dan tendik (39).
- **Sejarah & Foto Utama**: Edit foto sejarah header, narasi STM 2 Jetis sejak 1952, foto arsip tempo dulu, dan quote para tokoh/alumni.
- **8 Konsentrasi Keahlian (Jurusan)**:
  1. Broadcasting & Perfilman (BP)
  2. Teknik Jaringan Komputer & Telekomunikasi (TJKT)
  3. Desain Pemodelan & Informasi Bangunan (DPIB)
  4. Teknik Konstruksi & Perumahan (TKP)
  5. Teknik Ketenagalistrikan (TITL)
  6. Teknik Elektronika (TE)
  7. Teknik Otomotif (TKRO)
  8. Teknik Mesin (TP)
- **Kabar & Berita**: CRUD berita, pengumuman SPMB, artikel ilmiah, dan event ketarunaan.
- **Pendidik & Tendik**: Manajemen direktori guru dan staf sekolah.
- **Bursa Kerja Khusus (BKK)**: Lowongan kerja industri nasional dan program magang kerja Jepang.
- **Layanan Digital & Portal Gerbang**: Kelola URL layanan seperti LMS Kelasiber, Email sch.id, Skagata Mendengar, dll.
- **Video Profil Utama**: Ganti ID YouTube video dokumentasi profil sekolah secara instan.
- **AI Chatbot & Maskot**: Atur provider, prompt sistem kepribadian bot, dan API key.

### 4. Database Persistence & Stabilitas Produksi
- **Prisma ORM & SQLite / PostgreSQL**: Seluruh perubahan tersimpan secara aman di database server-side melalui endpoint `/api/cms`.
- **Automatic Fallback Backup**: Snapshot cadangan otomatis tersimpan di `data/cms-backup.json` untuk menjamin data tidak akan pernah hilang atau ter-reset saat di-refresh maupun di-deploy ulang.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & API Routes)
- **UI Library**: [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Database & ORM**: [Prisma](https://www.prisma.io/) (SQLite / PostgreSQL compatible)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/)

---

## Cara Menjalankan Project

### 1. Clone Repositori
```bash
git clone https://github.com/kangguruhdq-ux/skgata-remake.git
cd skgata-remake
```

### 2. Install Dependensi
```bash
npm install
```
*(Script `postinstall` akan otomatis menjalankan `prisma generate`)*

### 3. Setup Database & Environment
Buat file `.env` (contoh sudah disediakan di `.env.example`):
```env
DATABASE_URL="file:./dev.db"
```
Migrasikan skema database:
```bash
npx prisma db push
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## Akses Dashboard Admin
- **URL Admin**: `http://localhost:3000/admin`
- **Username**: `admin@smkn3jogja.sch.id`
- **Password**: `skagata2026`

---

## Lisensi
Hak Cipta © 2026 SMK Negeri 3 Yogyakarta (STM 2 Jetis). Dikelola oleh Tim Humas & IT SKAGATA.
