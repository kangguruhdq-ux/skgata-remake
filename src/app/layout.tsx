import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "SMK Negeri 3 Yogyakarta – Konsisten Mencetak Teknisi Unggul (STM 2 Jetis)",
  description:
    "Portal Resmi SMK Negeri 3 Yogyakarta (STM 2 Jetis) - SMK Pusat Keunggulan (SMK-PK) D.I. Yogyakarta. 8 Program Keahlian, Pendidikan Berkarakter Ketarunaan, Budaya Luhur, dan Jejaring Industri Dunia.",
  keywords: [
    "SMKN 3 Yogyakarta",
    "STM 2 Jetis",
    "Skagata",
    "SMK Pusat Keunggulan",
    "SMK Jogja",
    "Pendidikan Vokasi",
    "Ketarunaan",
    "SPMB SMKN 3 Jogja",
  ],
  authors: [{ name: "Tim ICT & Humas SMKN 3 Yogyakarta" }],
  icons: {
    icon: "/media/school/logo.webp",
    apple: "/media/school/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`scroll-smooth overflow-x-hidden w-full max-w-full ${plusJakartaSans.variable} ${outfit.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/media/school/video-profil-480.webp"
          imageSrcSet="/media/school/video-profil-480.webp 480w, /media/school/video-profil.webp 1080w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('skagata_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden w-full max-w-full selection:bg-skagata-500 selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
