import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
    icon: "https://smkn3jogja.sch.id/wp-content/uploads/2021/07/cropped-logosmk3yk-32x32.png",
    apple: "https://smkn3jogja.sch.id/wp-content/uploads/2021/07/cropped-logosmk3yk-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`scroll-smooth ${plusJakartaSans.variable} ${outfit.variable}`}>
      <head>
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-skagata-500 selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
