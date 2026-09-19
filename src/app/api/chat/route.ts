import { NextResponse } from "next/server";

// Comprehensive School Knowledge Fallback Engine for SMKN 3 Yogyakarta
function generateKnowledgeFallbackReply(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // 1. SPMB / Pendaftaran
  if (
    query.includes("spmb") ||
    query.includes("daftar") ||
    query.includes("pendaftaran") ||
    query.includes("syarat masuk") ||
    query.includes("jalur") ||
    query.includes("biaya")
  ) {
    return (
      "**Informasi Penerimaan Peserta Didik Baru (SPMB 2026/2027) SMKN 3 Yogyakarta:**\n\n" +
      "Pendaftaran dilakukan secara daring (online) sesuai petunjuk teknis Dinas Dikpora DIY. Jalur seleksi meliputi:\n" +
      "1. **Jalur Zonasi**: Radius domisili terdekat dengan sekolah.\n" +
      "2. **Jalur Afirmasi**: Untuk calon taruna-taruni dari keluarga pemegang KIP/KKS.\n" +
      "3. **Jalur Prestasi**: Nilai gabungan Asesmen Standarisasi Pendidikan Daerah (ASPD) dan piagam kejuaraan (akademik/non-akademik/LKS).\n" +
      "4. **Jalur Minat Bakat**: Tes minat dan tes fisik/kesehatan ketarunaan.\n\n" +
      "*Persyaratan Utama*: Lulus SMP/MTs sederajat, usia maks 21 tahun, sehat jasmani (tidak buta warna untuk jurusan teknik tertentu), dan memiliki integritas kedisiplinan.\n\n" +
      "Selengkapnya dapat dibaca pada menu **Kabar & Pengumuman** atau kunjungi portal SPMB kami di `/kabar?category=SPMB`."
    );
  }

  // 2. Kuis Jurusan / Rekomendasi
  if (
    query.includes("rekomendasi") ||
    query.includes("kuis") ||
    query.includes("bingung") ||
    query.includes("pilih jurusan") ||
    query.includes("cocok")
  ) {
    return (
      "**Bingung Memilih Jurusan yang Tepat?**\n\n" +
      "Kami menyediakan fitur **Kuis Rekomendasi Jurusan (Smart Major Matcher)** interaktif dengan 5 pertanyaan santai seputar minat, hobi, dan mimpi karirmu.\n\n" +
      "Sistem kami akan langsung menganalisis dan memberikan persentase kecocokan ke 8 program keahlian Skagata!\n\n" +
      "[Klik di sini untuk Ikuti Kuis Rekomendasi Jurusan](/kuis-jurusan)."
    );
  }

  // 3. 8 Program Keahlian / Jurusan Spesifik
  if (
    query.includes("broadcasting") ||
    query.includes("perfilman") ||
    query.includes("film") ||
    query.includes("multimedia")
  ) {
    return (
      "**Broadcasting & Perfilman (Skagata Media Lab):**\n\n" +
      "Fokus pada produksi film pendek/panjang, penyuntingan video sinematik, tata kamera studio televisi, audio engineering, live streaming multicam, dan animasi grafis siaran.\n\n" +
      "• **Fasilitas**: Studio TV kedap suara, Kamera Cinema 4K, Lab Editing DaVinci Resolve/Premiere Pro.\n" +
      "• **Peluang Karir**: Sutradara, DOP, Video Editor, Produser Konten, Broadcaster TV/Radio, Creative Agency.\n" +
      "• **Mitra Industri**: Studio perfilman nasional (Dapur Film Hanung Bramantyo, TVRI, Jogja Film Academy)."
    );
  }

  if (
    query.includes("tjkt") ||
    query.includes("jaringan") ||
    query.includes("komputer") ||
    query.includes("telekomunikasi") ||
    query.includes("tkj")
  ) {
    return (
      "**Teknik Jaringan Komputer & Telekomunikasi (TJKT):**\n\n" +
      "Mencetak teknisi infrastruktur jaringan handal, cloud computing, cybersecurity, mikrotik/cisco routing, fiber optic splicing, dan administrasi server linux.\n\n" +
      "• **Fasilitas**: Lab Fiber Optik Fusion Splicer, Lab Komputer Server Cisco Academy, Data Center Mini.\n" +
      "• **Peluang Karir**: Network Administrator, Cloud Engineer, Cyber Security Officer, ISP Technician, IT Support.\n" +
      "• **Mitra Industri**: PT Telkom Indonesia, Indosat Ooredoo Hutchison, APJII, FiberStar."
    );
  }

  if (
    query.includes("dpib") ||
    query.includes("arsitek") ||
    query.includes("gambar bangunan") ||
    query.includes("desain pemodelan")
  ) {
    return (
      "**Desain Pemodelan & Informasi Bangunan (DPIB):**\n\n" +
      "Keahlian dalam perancangan arsitektur digital 2D & 3D, Building Information Modelling (BIM), kalkulasi Rencana Anggaran Biaya (RAB), dan pemetaan konstruksi modern.\n\n" +
      "• **Fasilitas**: Workstation Studio CAD/Revit/AutoCAD, Total Station Digital Theodolite, Plotter Cetak A0.\n" +
      "• **Peluang Karir**: Drafter Arsitektur, BIM Modeler, Surveyor Bangunan, Estimator Proyek, Pengusaha Desain Interior.\n" +
      "• **Mitra Industri**: Ikatan Arsitek Indonesia (IAI), PT PP, Wijaya Karya, Konsultan Arsitek Jogja."
    );
  }

  if (
    query.includes("tkp") ||
    query.includes("konstruksi") ||
    query.includes("perumahan") ||
    query.includes("bangunan sipil")
  ) {
    return (
      "**Teknik Konstruksi & Perumahan (TKP):**\n\n" +
      "Mempelajari rekayasa konstruksi kayu, baja ringan, beton bertulang, finishing interior, plumbing, dan tata kelola kontraktor perumahan ramah lingkungan.\n\n" +
      "• **Fasilitas**: Bengkel Kerja Kayu Mesin Modern, Lab Uji Kuat Tekan Beton, Area Praktek Pasang Bata & Baja Ringan.\n" +
      "• **Peluang Karir**: Pengawas Lapangan Konstruksi, Kontraktor Sipil Perumahan, Pelaksana Proyek, Wirausaha Kayu Modern.\n" +
      "• **Mitra Industri**: PT Adhi Karya, PT Hutama Karya, Asosiasi Kontraktor Konstruksi Indonesia."
    );
  }

  if (query.includes("elektronika") || query.includes("robotika") || query.includes("iot")) {
    return (
      "**Teknik Elektronika (Industrial IoT & Robotics):**\n\n" +
      "Penguasaan instrumentasi elektronika, pemrograman mikrokontroler (Arduino, STM32, ESP32), sistem kendali pneumatik PLC industri, perbaikan audio-video, dan smart home.\n\n" +
      "• **Fasilitas**: Lab PLC Schneider & Omron, 3D Printer prototyping, Lab SMD Surface Mount Soldering, Robotika Arena.\n" +
      "• **Peluang Karir**: Teknisi Otomasi Pabrik, Teknisi Instrumentasi Industri, IoT Developer, Teknisi Elektronika Medis.\n" +
      "• **Mitra Industri**: PT Panasonic Gobel, PT Hartono Istana Teknologi (Polytron), industri mekatronika multinasional."
    );
  }

  if (
    query.includes("ketenagalistrikan") ||
    query.includes("listrik") ||
    query.includes("pln") ||
    query.includes("daya")
  ) {
    return (
      "**Teknik Ketenagalistrikan (Power Engineering & Smart Grid):**\n\n" +
      "Instalasi tenaga listrik tegangan rendah & menengah, instalasi motor listrik 3-fasa, panel distribusi genset/PLTS tenaga surya, dan pemeliharaan gardu listrik berstandar SNI/IEC.\n\n" +
      "• **Fasilitas**: Bengkel Instalasi Penerangan & Tenaga, Simulator Smart Grid PLTS Rooftop, Lab Motor Control VFD.\n" +
      "• **Peluang Karir**: Teknisi Operasi & Pemeliharaan PLN, Teknisi Panel MCC Industri, Pengawas Keselamatan K3 Listrik.\n" +
      "• **Mitra Industri**: PT PLN (Persero), Schneider Electric, PT Siemens Indonesia."
    );
  }

  if (query.includes("otomotif") || query.includes("mobil") || query.includes("motor") || query.includes("tkr")) {
    return (
      "**Teknik Otomotif (Modern Vehicle & Electric Vehicle):**\n\n" +
      "Spesialisasi sistem injeksi bensin (EFI), common rail diesel modern, transmisi otomatis, chassis & suspensi, kelistrikan bodi, serta pengenalan konversi kendaraan listrik (EV).\n\n" +
      "• **Fasilitas**: Bengkel Daihatsu School Skill Center (DSSC), Car Lift Hidrolik, Scanner Diagnostic EFI Launch, Dyno Test.\n" +
      "• **Peluang Karir**: Service Advisor Dealer Resmi, Master Mekanik Otomotif, Teknisi Heavy Duty, Magang Industri Otomotif ke Jepang.\n" +
      "• **Mitra Industri**: PT Astra Daihatsu Motor, Toyota Nasmoco, Astra Honda Motor, Auto2000."
    );
  }

  if (query.includes("mesin") || query.includes("cnc") || query.includes("bubut") || query.includes("frais")) {
    return (
      "**Teknik Mesin (Precision Machining & CAM):**\n\n" +
      "Permesinan presisi dengan mesin bubut, milling konvensional, pemrograman CNC Milling & CNC Turning 3-axis/4-axis, pengelasan SMAW/MIG/TIG, serta CAD/CAM Mastercam.\n\n" +
      "• **Fasilitas**: Bengkel Mesin Bubut Presisi, Lab Mesin CNC GSK & Fanuc Controller, Lab Pengelasan Argon/CO2.\n" +
      "• **Peluang Karir**: CNC Programmer, Operator Permesinan Presisi, Toolmaker, Inspektur Quality Control (QC), Program Magang Manufaktur Jepang.\n" +
      "• **Mitra Industri**: MODENA Home Appliances, Perusahaan Manufaktur Jepang, PT Pindad, industri cetakan presisi."
    );
  }

  if (query.includes("jurusan") || query.includes("keahlian") || query.includes("program")) {
    return (
      "**8 Program Keahlian Unggulan SMK Negeri 3 Yogyakarta:**\n\n" +
      "1. **Broadcasting & Perfilman**\n" +
      "2. **Teknik Jaringan Komputer & Telekomunikasi (TJKT)**\n" +
      "3. **Desain Pemodelan & Informasi Bangunan (DPIB)**\n" +
      "4. **Teknik Konstruksi & Perumahan (TKP)**\n" +
      "5. **Teknik Elektronika**\n" +
      "6. **Teknik Ketenagalistrikan**\n" +
      "7. **Teknik Otomotif**\n" +
      "8. **Teknik Mesin**\n\n" +
      "Seluruh jurusan berpredikat **Akreditasi A** dengan kurikulum industri, kelas industri (Daihatsu, Telkom, Modena), dan sertifikasi LSP-P1 BNSP.\n\n" +
      "Buka menu [Program Keahlian](/program-keahlian) untuk membaca rincian kurikulum masing-masing."
    );
  }

  // 4. Ketarunaan
  if (
    query.includes("taruna") ||
    query.includes("ketarunaan") ||
    query.includes("disiplin") ||
    query.includes("upacara") ||
    query.includes("seragam")
  ) {
    return (
      "**Pendidikan Berkarakter Ketarunaan di SMKN 3 Yogyakarta:**\n\n" +
      "SMKN 3 Yogyakarta memadukan keunggulan vokasi teknologi dengan sistem **Pendidikan Ketarunaan**.\n\n" +
      "• **Nilai Utama**: Kedisiplinan tinggi, ketahanan fisik & mental, integritas kejujuran, kepemimpinan, dan jiwa korsa persaudaraan.\n" +
      "• **Ciri Khas**: Apel pagi harian, tata cara salam hormat taruna, pembinaan fisik berkala, seragam dinas taruna (PDH & PDL kebanggaan), serta upacara khusus bergagrag budaya Yogyakarta.\n" +
      "• **Manfaat Nyata**: Lulusan bermental tangguh yang sangat disegani dan diprioritaskan oleh rekruter industri multinasional dan BUMN."
    );
  }

  // 5. Alamat, Kontak, Jam Kerja
  if (
    query.includes("alamat") ||
    query.includes("lokasi") ||
    query.includes("dimana") ||
    query.includes("kontak") ||
    query.includes("nomor") ||
    query.includes("telepon") ||
    query.includes("email") ||
    query.includes("jam")
  ) {
    return (
      "**Identitas & Kontak Resmi SMKN 3 Yogyakarta (STM 2 Jetis):**\n\n" +
      "• **NPSN**: 20404181\n" +
      "• **Alamat**: Jl. Robert Wolter Monginsidi No. 2, Cokrodiningratan, Jetis, Kota Yogyakarta, D.I. Yogyakarta 55233\n" +
      "• **Nomor Telepon**: (0274) 513503\n" +
      "• **Nomor Fax**: (0274) 554316\n" +
      "• **Email Resmi**: humas@smkn3jogja.sch.id\n" +
      "• **Website Resmi**: https://smkn3jogja.sch.id\n" +
      "• **Jam Pelayanan Administrasi**: Senin – Jumat, pukul 07.00 – 15.30 WIB.\n\n" +
      "Kampus kami berlokasi sangat strategis di pusat kota Yogyakarta, dekat dengan Tugu Jogja dan Stasiun Tugu."
    );
  }

  // 6. Sejarah / STM 2 Jetis
  if (
    query.includes("sejarah") ||
    query.includes("stm 2 jetis") ||
    query.includes("berdiri") ||
    query.includes("sejak") ||
    query.includes("asal")
  ) {
    return (
      "**Sejarah Singkat SMKN 3 Yogyakarta (STM 2 Jetis):**\n\n" +
      "Berdiri sejak **1952**, sekolah ini awalnya dikenal masyarakat nusantara sebagai **STM 2 Jetis (STM 2 Yogyakarta)**, salah satu sekolah teknik tertua dan paling legendaris di Indonesia.\n\n" +
      "Selama lebih dari tujuh dekade, sekolah ini telah meluluskan puluhan ribu teknisi, insinyur, direktur industri, tokoh nasional, dan perwira TNI/Polri.\n\n" +
      "Kini bertransformasi menjadi **SMK Pusat Keunggulan (SMK-PK)** dengan akreditasi A dan sertifikasi mutu ISO 9001:2015.\n\n" +
      "Baca linimasa bersejarah selengkapnya di menu [Sejarah Sekolah](/sejarah)."
    );
  }

  // 7. Karir, Bursa Kerja, BKK & Magang Jepang
  if (
    query.includes("karir") ||
    query.includes("kerja") ||
    query.includes("bkk") ||
    query.includes("bursa kerja") ||
    query.includes("jepang") ||
    query.includes("magang") ||
    query.includes("lulusan")
  ) {
    return (
      "**Bursa Kerja Khusus (BKK Skagata) & Program Karir Luar Negeri:**\n\n" +
      "SMKN 3 Yogyakarta memiliki unit BKK resmi berkinerja tinggi yang menjembatani taruna dengan ratusan mitra industri terkemuka:\n\n" +
      "• **Program Karir Jepang**: Rekrutmen langsung industri konstruksi, otomotif, dan manufaktur ke Jepang dengan gaji tinggi dan pelatihan bahasa intensif.\n" +
      "• **Kerjasama Nasional**: Penyaluran kerja ke PT Astra Daihatsu, PT Telkom, PLN, Modena, Nasmoco, dll.\n" +
      "• **Statistik Serapan**: Lebih dari 85% lulusan langsung bekerja dan berwirausaha sebelum wisuda kelulusan.\n\n" +
      "Kunjungi menu [Bursa Kerja BKK](/karir) untuk melihat lowongan aktif saat ini."
    );
  }

  // 8. Legalisir / Alumni
  if (query.includes("legalisir") || query.includes("ijazah") || query.includes("alumni")) {
    return (
      "**Layanan Legalisir Ijazah & Alumni Skagata:**\n\n" +
      "Bagi para alumni STM 2 Jetis / SMKN 3 Yogyakarta yang membutuhkan legalisir ijazah dan transkrip nilai:\n" +
      "1. Datang langsung ke Ruang Tata Usaha (TU) SMKN 3 Yogyakarta pada jam kerja dengan membawa ijazah asli dan fotokopi.\n" +
      "2. Atau gunakan permohonan digital melalui menu **Layanan Digital Skagata** pada navbar.\n" +
      "3. Proses verifikasi biasanya memakan waktu 1x24 jam kerja tanpa dipungut biaya resmi sekolah."
    );
  }

  // 9. Kepala Sekolah / Visi Misi
  if (query.includes("kepala sekolah") || query.includes("kepsek") || query.includes("pimpinan")) {
    return (
      "**Pimpinan Sekolah SMKN 3 Yogyakarta:**\n\n" +
      "SMK Negeri 3 Yogyakarta dipimpin oleh Ibu **Ertin Primirestiyani, S.Pd., M.Pd.** selaku Kepala Sekolah.\n\n" +
      "Beliau berkomitmen membawa Skagata sebagai SMK Pusat Keunggulan terdepan yang adaptif terhadap revolusi industri 4.0, penguatan ketarunaan, dan pelestarian budaya adiluhung Yogyakarta."
    );
  }

  // 10. Greetings
  if (
    query === "halo" ||
    query === "hai" ||
    query === "hi" ||
    query === "p" ||
    query.includes("selamat") ||
    query.includes("assalamu")
  ) {
    return (
      "**Sugeng Rawuh! Selamat Datang di Skagata Bot AI!**\n\n" +
      "Saya asisten virtual cerdas resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis). Ada yang bisa saya bantu hari ini?\n\n" +
      "Pilihan topik populer:\n" +
      "• [Kuis Rekomendasi Jurusan](/kuis-jurusan)\n" +
      "• Info Pendaftaran SPMB 2026\n" +
      "• 8 Program Keahlian Teknologi & Industri\n" +
      "• Keistimewaan Pendidikan Ketarunaan\n" +
      "• Alamat & Kontak Resmi Sekolah\n" +
      "• Peluang Magang & Karir ke Jepang"
    );
  }

  // Default response with helpful navigation
  return (
    "Terima kasih atas pertanyaannya! Sebagai asisten virtual **SMK Negeri 3 Yogyakarta (STM 2 Jetis)**, saya siap membantu memberikan informasi seputar:\n\n" +
    "1. **8 Program Keahlian**: Broadcasting & Perfilman, TJKT, DPIB, TKP, Elektronika, Listrik, Otomotif, dan Mesin.\n" +
    "2. **Pendaftaran SPMB 2026/2027**: Jalur seleksi, syarat berkas, dan kuota.\n" +
    "3. **Pendidikan Ketarunaan & Budaya**: Pembentukan karakter kedisiplinan dan budaya Yogyakarta.\n" +
    "4. **Kuis Rekomendasi Jurusan**: Tes kesesuaian minat bakat siswa baru.\n" +
    "5. **Bursa Kerja BKK & Magang Jepang**: Peluang kerja sebelum lulus.\n\n" +
    "Silakan ketik pertanyaan spesifik Anda atau pilih salah satu tombol saran di bawah ini!"
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      message,
      history = [],
      provider = "gemini",
      apiKey = "",
      groqApiKey = "",
      openRouterApiKey = "",
      model = "",
      systemPrompt = "",
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const schoolContext =
      systemPrompt ||
      "Anda adalah Skagata Bot AI, asisten resmi cerdas dari SMK Negeri 3 Yogyakarta (STM 2 Jetis). Berikan jawaban yang ramah, sopan, akurat, informatif, dan menjunjung tinggi nilai budaya Yogyakarta serta ketarunaan. Sekolah memiliki 8 jurusan: Broadcasting & Perfilman, TJKT, DPIB, TKP, Teknik Elektronika, Teknik Ketenagalistrikan, Teknik Otomotif, Teknik Mesin. NPSN 20404181, Alamat Jl. RW. Monginsidi No. 2, Cokrodiningratan, Jetis, Yogyakarta. Berikan format jawaban rapi menggunakan poin atau teks bersih tanpa emotikon.";

    let lastApiError = "";

    // -------------------------------------------------------------
    // PROVIDER 1: GROQ CLOUD (Ultra-Fast Inference)
    // -------------------------------------------------------------
    if (provider === "groq") {
      const activeGroqKey = (groqApiKey || apiKey || "").trim();
      if (activeGroqKey.length > 5) {
        const groqModel = model || "llama-3.3-70b-versatile";
        const messagesPayload: any[] = [
          { role: "system", content: schoolContext },
        ];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.text && item.role) {
              messagesPayload.push({
                role: item.role === "user" ? "user" : "assistant",
                content: item.text,
              });
            }
          }
        }
        messagesPayload.push({ role: "user", content: message });

        try {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${activeGroqKey}`,
            },
            body: JSON.stringify({
              model: groqModel,
              messages: messagesPayload,
              temperature: 0.7,
              max_tokens: 1024,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const replyText = data.choices?.[0]?.message?.content;
            if (replyText && replyText.trim().length > 0) {
              return NextResponse.json({
                reply: replyText.trim(),
                source: "groq",
                model: groqModel,
              });
            }
          } else {
            const errText = await response.text();
            try {
              const parsed = JSON.parse(errText);
              lastApiError = parsed.error?.message || `HTTP ${response.status}`;
            } catch {
              lastApiError = `HTTP ${response.status}: ${errText.slice(0, 150)}`;
            }
          }
        } catch (groqErr: any) {
          lastApiError = groqErr.message || "Network connection error to Groq API";
        }
      } else {
        lastApiError = "Groq API Key belum diisi.";
      }
    }

    // -------------------------------------------------------------
    // PROVIDER 2: OPENROUTER (Multi-Model Hub)
    // -------------------------------------------------------------
    else if (provider === "openrouter") {
      const activeOrKey = (openRouterApiKey || apiKey || "").trim();
      if (activeOrKey.length > 5) {
        const orModel = model || "google/gemini-2.0-flash-exp:free";
        const messagesPayload: any[] = [
          { role: "system", content: schoolContext },
        ];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.text && item.role) {
              messagesPayload.push({
                role: item.role === "user" ? "user" : "assistant",
                content: item.text,
              });
            }
          }
        }
        messagesPayload.push({ role: "user", content: message });

        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${activeOrKey}`,
              "HTTP-Referer": "https://smkn3jogja.sch.id",
              "X-Title": "SMKN 3 Yogyakarta Skagata",
            },
            body: JSON.stringify({
              model: orModel,
              messages: messagesPayload,
              temperature: 0.7,
              max_tokens: 1024,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const replyText = data.choices?.[0]?.message?.content;
            if (replyText && replyText.trim().length > 0) {
              return NextResponse.json({
                reply: replyText.trim(),
                source: "openrouter",
                model: orModel,
              });
            }
          } else {
            const errText = await response.text();
            try {
              const parsed = JSON.parse(errText);
              lastApiError = parsed.error?.message || `HTTP ${response.status}`;
            } catch {
              lastApiError = `HTTP ${response.status}: ${errText.slice(0, 150)}`;
            }
          }
        } catch (orErr: any) {
          lastApiError = orErr.message || "Network connection error to OpenRouter API";
        }
      } else {
        lastApiError = "OpenRouter API Key belum diisi.";
      }
    }

    // -------------------------------------------------------------
    // PROVIDER 3: GOOGLE AI STUDIO (GEMINI REST API)
    // -------------------------------------------------------------
    else {
      const activeGeminiKey = (apiKey || "").trim();
      if (activeGeminiKey.length > 6) {
        const selectedModel = model || "gemini-1.5-flash";

        // Format history for Gemini contents array
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.text && item.role) {
              contents.push({
                role: item.role === "user" ? "user" : "model",
                parts: [{ text: item.text }],
              });
            }
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const geminiPayload: any = {
          contents,
          systemInstruction: {
            parts: [{ text: schoolContext }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 900,
          },
        };

        const candidateModels = [
          selectedModel,
          "gemini-1.5-flash-latest",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
          "gemini-pro",
        ];
        const uniqueModels = Array.from(new Set(candidateModels));

        for (const m of uniqueModels) {
          const endpoints = [
            `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(activeGeminiKey)}`,
            `https://generativelanguage.googleapis.com/v1/models/${m}:generateContent?key=${encodeURIComponent(activeGeminiKey)}`,
            `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,
          ];

          let modelSuccess = false;

          for (const url of endpoints) {
            try {
              const headers: Record<string, string> = {
                "Content-Type": "application/json",
                "x-goog-api-key": activeGeminiKey,
              };

              if (activeGeminiKey.startsWith("AQ.") || activeGeminiKey.startsWith("ya29.") || !activeGeminiKey.startsWith("AIza")) {
                headers["Authorization"] = `Bearer ${activeGeminiKey}`;
              }

              const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(geminiPayload),
              });

              if (response.ok) {
                const data = await response.json();
                const candidateText =
                  data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (candidateText && candidateText.trim().length > 0) {
                  return NextResponse.json({
                    reply: candidateText.trim(),
                    source: "gemini",
                    model: m,
                  });
                }
              } else {
                const errBody = await response.text();
                try {
                  const parsed = JSON.parse(errBody);
                  lastApiError = parsed.error?.message || `HTTP ${response.status}`;
                } catch {
                  lastApiError = `HTTP ${response.status}: ${errBody.slice(0, 150)}`;
                }
              }
            } catch (fetchErr: any) {
              lastApiError = fetchErr.message || "Network connection error";
            }
          }

          if (modelSuccess) break;
        }
      } else {
        lastApiError = "Google AI Studio API Key belum diisi.";
      }
    }

    // High-Fidelity Fallback using School Knowledge Engine
    const fallbackReply = generateKnowledgeFallbackReply(message);
    return NextResponse.json({
      reply: fallbackReply,
      source: "knowledge_engine",
      apiError: lastApiError,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Mohon maaf, terjadi gangguan koneksi sementara pada sistem kecerdasan buatan. Silakan hubungi kami di (0274) 513503 atau hubungi humas@smkn3jogja.sch.id.",
        source: "error_fallback",
      },
      { status: 200 }
    );
  }
}
