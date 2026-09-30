import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth-server";
import { logAuditAction } from "@/lib/audit";

const DEFAULT_ORG_NODES = [
  {
    name: "Widada, S.Pd., M.Pd.",
    nip: "19680512 199403 1 008",
    position: "Kepala Sekolah",
    department: "Pucuk Pimpinan",
    level: 1,
    order: 1,
    photo: "/media/school/kepala-sekolah.webp",
    task: "Penanggung jawab utama seluruh kebijakan manajerial, edukasi, dan akuntabilitas SMK Negeri 3 Yogyakarta.",
    isActive: true,
  },
  {
    name: "Drs. H. Sukardi",
    nip: "Komite Sekolah & Tokoh Industri",
    position: "Ketua Komite Sekolah",
    department: "Dewan Pertimbangan",
    level: 1,
    order: 2,
    photo: null,
    task: "Memberikan masukan, pertimbangan, dan pengawasan kemitraan masyarakat serta industri pendukung.",
    isActive: true,
  },
  {
    name: "Drs. Agus Triyono, M.T.",
    nip: "19710315 199802 1 003",
    position: "Wakil Kepala Sekolah Bidang Kurikulum",
    department: "Manajemen Akademik",
    level: 2,
    order: 1,
    photo: null,
    task: "Pengembangan Kurikulum Merdeka Vokasi, Penjadwalan Pembelajaran, Uji Kompetensi Keahlian (UKK).",
    isActive: true,
  },
  {
    name: "Budi Santosa, S.Pd., M.Eng.",
    nip: "19750820 200212 1 004",
    position: "Wakil Kepala Sekolah Bidang Kesiswaan & Ketarunaan",
    department: "Ketarunaan & Kesiswaan",
    level: 2,
    order: 2,
    photo: null,
    task: "Pembinaan karakter Taruna Skagata, tata tertib kedisiplinan, OSIS, dan 25+ ekstrakurikuler unggulan.",
    isActive: true,
  },
  {
    name: "Rina Wijayanti, S.Pd., M.Hum.",
    nip: "19800412 200604 2 015",
    position: "Wakil Kepala Sekolah Bidang Humas & Hubin",
    department: "Kemitraan Industri & BKK",
    level: 2,
    order: 3,
    photo: null,
    task: "Kerja sama 120+ DUDIKA nasional/internasional, Prakerin, Penyaluran Kerja Jepang, dan Skagata TV.",
    isActive: true,
  },
  {
    name: "Heri Purwanto, S.T.",
    nip: "19780918 200501 1 009",
    position: "Wakil Kepala Sekolah Bidang Sarana & Prasarana",
    department: "Sarana & Prasarana",
    level: 2,
    order: 4,
    photo: null,
    task: "Modernisasi bengkel mesin CNC, lab fiber optik, keselamatan kerja (K3), dan pemeliharaan gedung kampus Jetis.",
    isActive: true,
  },
  {
    name: "Siti Rahmawati, S.AP.",
    nip: "19821105 200801 2 007",
    position: "Kepala Sub Bagian Tata Usaha (KTU)",
    department: "Tata Usaha & Administrasi",
    level: 2,
    order: 5,
    photo: null,
    task: "Pengelolaan administrasi kepegawaian, surat-menyurat dinas, keuangan sekolah, dan kearsipan.",
    isActive: true,
  },
  {
    name: "Ketua Program Keahlian Penyiaran & Perfilman (BP)",
    nip: "Guru Pengampu BP",
    position: "Kepala Program Keahlian BP",
    department: "Broadcasting & Perfilman",
    level: 3,
    order: 1,
    photo: null,
    task: "Koordinator kurikulum penyiaran, produksi film, studio Skagata TV, dan kemitraan TVRI/Jogja TV.",
    isActive: true,
  },
  {
    name: "Ketua Program Keahlian TJKT",
    nip: "Guru Pengampu TJKT",
    position: "Kepala Program Keahlian TJKT",
    department: "Teknik Jaringan Komputer & Telko",
    level: 3,
    order: 2,
    photo: null,
    task: "Koordinator Cisco Academy, MikroTik Academy, dan fiber optic training center Telkom.",
    isActive: true,
  },
  {
    name: "Ketua Program Keahlian DPIB & TKP",
    nip: "Guru Pengampu Konstruksi",
    position: "Kepala Program Keahlian DPIB & Konstruksi",
    department: "Desain Pemodelan & Bangunan",
    level: 3,
    order: 3,
    photo: null,
    task: "Koordinator BIM (Building Information Modeling) dan kemitraan PT Adhi Karya / PP.",
    isActive: true,
  },
  {
    name: "Ketua Program Keahlian Ketenagalistrikan & Elektronika",
    nip: "Guru Pengampu Listrik & Elektro",
    position: "Kepala Program Keahlian TITL & TE",
    department: "Teknik Elektro & Ketenagalistrikan",
    level: 3,
    order: 4,
    photo: null,
    task: "Koordinator otomasi industri PLC, instalasi tenaga listrik Schneider, dan panel surya.",
    isActive: true,
  },
  {
    name: "Ketua Program Keahlian Otomotif & Pemesinan",
    nip: "Guru Pengampu Otomotif & Mesin",
    position: "Kepala Program Keahlian TKRO & Mesin",
    department: "Otomotif & Teknik Mesin",
    level: 3,
    order: 5,
    photo: null,
    task: "Koordinator Kelas Industri Daihatsu/Toyota dan standarisasi bengkel CNC Machining Center.",
    isActive: true,
  },
  {
    name: "Koordinator Bursa Kerja Khusus (BKK)",
    nip: "Tim Khusus BKK",
    position: "Koordinator BKK & Kemitraan Karir",
    department: "Unit Layanan Karir",
    level: 4,
    order: 1,
    photo: null,
    task: "Penyelenggaraan rekrutmen kerja industri langsung di kampus dan seleksi magang luar negeri.",
    isActive: true,
  },
  {
    name: "Koordinator Perpustakaan 'Widura'",
    nip: "Pustakawan Ahli",
    position: "Kepala Perpustakaan Digital",
    department: "Unit Perpustakaan",
    level: 4,
    order: 2,
    photo: null,
    task: "Pengembangan e-library, literasi taruna, dan repositori karya ilmiah guru/siswa.",
    isActive: true,
  },
  {
    name: "Komandan Batalyon Ketarunaan",
    nip: "Instruktur Taruna",
    position: "Koordinator Satuan Pembina Taruna",
    department: "Unit Ketarunaan",
    level: 4,
    order: 3,
    photo: null,
    task: "Penegakan kedisiplinan apel pagi, PBB, defile, dan ketahanan fisik mental peserta didik.",
    isActive: true,
  },
];

export async function GET() {
  try {
    let nodes = await prisma.organizationNode.findMany({
      orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "asc" }],
      include: {
        children: {
          orderBy: { order: "asc" },
        },
      },
    });

    // Auto-seed if database is empty
    if (nodes.length === 0) {
      for (const item of DEFAULT_ORG_NODES) {
        await prisma.organizationNode.create({ data: item });
      }
      nodes = await prisma.organizationNode.findMany({
        orderBy: [{ level: "asc" }, { order: "asc" }],
        include: { children: { orderBy: { order: "asc" } } },
      });
    }

    return NextResponse.json({
      status: "success",
      count: nodes.length,
      data: nodes,
    });
  } catch (error: any) {
    console.error("GET /api/admin/organization error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const body = await req.json();

    const { name, nip, position, department, level, order, photo, task, parentId, isActive, period } = body;

    if (!name || !position) {
      return NextResponse.json(
        { status: "error", message: "Nama dan Jabatan wajib diisi." },
        { status: 400 }
      );
    }

    const newNode = await prisma.organizationNode.create({
      data: {
        name: String(name).trim(),
        nip: nip ? String(nip).trim() : null,
        position: String(position).trim(),
        department: department ? String(department).trim() : null,
        level: Number(level) || 1,
        order: Number(order) || 0,
        photo: photo ? String(photo).trim() : null,
        task: task ? String(task).trim() : null,
        parentId: parentId || null,
        isActive: isActive !== false,
        period: period || "2025/2026",
      },
    });

    await logAuditAction({
      actor: session.email,
      action: "CREATE",
      entity: "ORG_NODE",
      entityId: newNode.id,
      details: `Menambahkan posisi ${newNode.position}: ${newNode.name}`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      data: newNode,
      message: "Data struktur organisasi berhasil ditambahkan.",
    });
  } catch (error: any) {
    console.error("POST /api/admin/organization error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const body = await req.json();
    const { id, name, nip, position, department, level, order, photo, task, parentId, isActive, period } = body;

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID Node organisasi wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await prisma.organizationNode.update({
      where: { id },
      data: {
        name: name !== undefined ? String(name).trim() : undefined,
        nip: nip !== undefined ? (nip ? String(nip).trim() : null) : undefined,
        position: position !== undefined ? String(position).trim() : undefined,
        department: department !== undefined ? (department ? String(department).trim() : null) : undefined,
        level: level !== undefined ? Number(level) : undefined,
        order: order !== undefined ? Number(order) : undefined,
        photo: photo !== undefined ? (photo ? String(photo).trim() : null) : undefined,
        task: task !== undefined ? (task ? String(task).trim() : null) : undefined,
        parentId: parentId !== undefined ? (parentId || null) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
        period: period !== undefined ? String(period) : undefined,
      },
    });

    await logAuditAction({
      actor: session.email,
      action: "UPDATE",
      entity: "ORG_NODE",
      entityId: updated.id,
      details: `Memperbarui posisi ${updated.position}: ${updated.name}`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      data: updated,
      message: "Data struktur organisasi berhasil diperbarui.",
    });
  } catch (error: any) {
    console.error("PUT /api/admin/organization error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { status: "error", message: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID Node organisasi wajib disertakan." },
        { status: 400 }
      );
    }

    const existing = await prisma.organizationNode.findUnique({ where: { id } });
    await prisma.organizationNode.delete({ where: { id } });

    await logAuditAction({
      actor: session.email,
      action: "DELETE",
      entity: "ORG_NODE",
      entityId: id,
      details: `Menghapus posisi ${existing?.position || id} (${existing?.name || ""})`,
      ip,
    });

    return NextResponse.json({
      status: "success",
      message: "Data struktur organisasi berhasil dihapus.",
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/organization error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
