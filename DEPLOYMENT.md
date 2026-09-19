# PANDUAN DEPLOYMENT VERCEL: SMKN 3 YOGYAKARTA (SKAGATA)

Dokumen ini berisi panduan lengkap langkah demi langkah untuk melakukan live deployment portal web resmi **SMK Negeri 3 Yogyakarta** ke platform **Vercel** dengan arsitektur Next.js App Router berkinerja tinggi.

---

## 1. Persiapan Repository (Git)

Inisialisasi git dan unggah kode sumber ke GitHub / GitLab / Bitbucket:

```bash
# 1. Inisialisasi Git
git init

# 2. Tambahkan file ke staging
git add .

# 3. Buat initial commit
git commit -m "feat: complete enterprise redesign and all-in-one CMS for SMKN 3 Yogyakarta"

# 4. Hubungkan remote repository GitHub Anda
git remote add origin https://github.com/<username>/skagata-websiteremake.git
git branch -M main
git push -u origin main
```

---

## 2. Impor Proyek di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository GitHub `skagata-websiteremake` yang baru Anda push.
4. Pada bagian **Framework Preset**, Vercel akan otomatis mendeteksi **Next.js**.
5. Pada bagian **Root Directory**, biarkan `./` (default).

---

## 3. Konfigurasi Environment Variables

Buka bagian **Environment Variables** di Vercel dan tambahkan variabel berikut:

| Key | Value Contoh | Deskripsi |
|---|---|---|
| `DATABASE_URL` | `file:./dev.db` *(atau koneksi Supabase/Neon PostgreSQL)* | URL database Prisma |
| `NEXTAUTH_SECRET` | `skagata-secret-key-super-secure-2026` | Kunci enkripsi autentikasi admin |
| `NEXTAUTH_URL` | `https://smkn3jogja.sch.id` *(atau URL Vercel)* | Base URL aplikasi |

> **Catatan Database**:
> - Secara default, proyek ini dilengkapi dengan bank data otentik in-memory & SQLite fallback yang memungkinkan aplikasi langsung berjalan 100% tanpa konfigurasi database eksternal.
> - Jika ingin menghubungkan ke **Supabase** atau **Neon PostgreSQL**:
>   1. Ubah `provider = "postgresql"` pada `prisma/schema.prisma`.
>   2. Masukkan connection string pooler pada variabel `DATABASE_URL` di Vercel.
>   3. Jalankan `npx prisma db push` untuk membuat tabel di PostgreSQL.

---

## 4. Build Settings di Vercel

Secara default Vercel telah mengoptimalkan build script:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Klik tombol **"Deploy"**. Vercel akan melakukan proses build dalam waktu ~1-2 menit.

---

## 5. Menghubungkan Domain Kustom (`smkn3jogja.sch.id`)

1. Pada Vercel Dashboard, masuk ke menu **Settings** > **Domains**.
2. Masukkan domain resmi sekolah: `smkn3jogja.sch.id` atau subdomain seperti `web.smkn3jogja.sch.id`.
3. Tambahkan DNS Record pada cPanel/Cloudflare pengelola domain sekolah:
   - **Type A**: `76.76.21.21`
   - **CNAME (www)**: `cname.vercel-dns.com`
4. Sertifikat SSL (HTTPS) gratis dari Let's Encrypt akan aktif secara otomatis dalam beberapa menit.

---

## 6. Verifikasi Fitur Pasca-Deploy

1. **Halaman Beranda (`/`)**:
   - Periksa Three.js 3D Canvas di Hero section bergerak halus.
   - Uji 3D Swap Card Engine (4 Pilar) dapat berputar bergantian.
   - Putar video YouTube di Skagata Cinema Theater untuk memastikan mode `youtube-nocookie.com` berjalan lancar tanpa Error 153.
   - Uji live search di Bento Grid Layanan Digital.
2. **Halaman 8 Jurusan (`/jurusan/*`)**:
   - Pastikan seluruh 8 landing page konsentrasi keahlian (BP, TJKT, DPIB, TKP, TE, TITL, TKRO, TP) menampilkan kompetensi, prospek kerja, dan mitra DUDIKA secara lengkap.
3. **Portal Kabar & Berita (`/kabar`)**:
   - Uji filter tab (Berita, Pengumuman, Artikel, SPMB) dan buka artikel membaca detail.
4. **All-in-One CMS Admin (`/admin`)**:
   - Buka `/admin`, coba tambahkan satu pengumuman baru di `/admin/berita`, dan pastikan langsung tampil real-time di halaman depan.
