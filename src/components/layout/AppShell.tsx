"use client";

import React, { useState } from "react";
import Topbar from "./Topbar";
import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import MobileDrawer from "./MobileDrawer";
import SearchModal from "./SearchModal";
import Footer from "./Footer";
import ScrollRevealObserver from "./ScrollRevealObserver";
import PageTransition from "./PageTransition";
import SkagataBot from "@/components/chat/SkagataBot";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-800 antialiased selection:bg-skagata-500 selection:text-white">
      <ScrollRevealObserver />
      <Topbar />
      <AnnouncementBanner />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
      />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <SkagataBot />
    </div>
  );
}
