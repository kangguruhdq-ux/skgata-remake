import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import KetarunaanCards from "@/components/home/KetarunaanCards";

const PillarStack = dynamic(() => import("@/components/home/PillarStack"), {
  ssr: true,
});
const VideoTheater = dynamic(() => import("@/components/home/VideoTheater"), {
  ssr: true,
});
const TokohQuotes = dynamic(() => import("@/components/home/TokohQuotes"), {
  ssr: true,
});
const MajorsGrid = dynamic(() => import("@/components/home/MajorsGrid"), {
  ssr: true,
});
const DigitalBento = dynamic(() => import("@/components/home/DigitalBento"), {
  ssr: true,
});
const NewsCarousel = dynamic(() => import("@/components/home/NewsCarousel"), {
  ssr: true,
});
const CareerBanner = dynamic(() => import("@/components/home/CareerBanner"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with Cinematic Video Background & Official Crest */}
      <HeroSection />

      {/* 2. 4 Portal Utama 'SMK Berbasis Ketarunaan' (Sejarah, Visi Misi, Prestasi, Kerjasama) */}
      <KetarunaanCards />

      {/* 3. Interactive 3D Swap Card Stack (4 Pilar Ketarunaan) */}
      <PillarStack />

      {/* 4. Video Theater Cinema (Dokumentasi & Profil Skagata) */}
      <VideoTheater />

      {/* 5. Pesan & Sambutan Tokoh Nasional (Sultan HB X, Wikan Sakarinto, Hanung Bramantyo) */}
      <TokohQuotes />

      {/* 6. Grid 8 Program Keahlian (Aksara Jawa & 3D Tilt) */}
      <MajorsGrid />

      {/* 7. Bento Grid 8 Layanan Digital dengan instant search */}
      <DigitalBento />

      {/* 8. Carousel Berita & Pengumuman Dinamis dengan Aksara Jawa */}
      <NewsCarousel />

      {/* 9. Skagata Career Center & Bursa Kerja Khusus (BKK) */}
      <CareerBanner />
    </>
  );
}
