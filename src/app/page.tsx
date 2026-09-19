import HeroSection from "@/components/home/HeroSection";
import KetarunaanCards from "@/components/home/KetarunaanCards";
import PillarStack from "@/components/home/PillarStack";
import VideoTheater from "@/components/home/VideoTheater";
import TokohQuotes from "@/components/home/TokohQuotes";
import MajorsGrid from "@/components/home/MajorsGrid";
import DigitalBento from "@/components/home/DigitalBento";
import NewsCarousel from "@/components/home/NewsCarousel";
import CareerBanner from "@/components/home/CareerBanner";

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
