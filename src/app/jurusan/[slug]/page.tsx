import React from "react";
import { notFound } from "next/navigation";
import { MAJORS_DATA } from "@/lib/data-initial";
import MajorDetailClient from "@/components/jurusan/MajorDetailClient";

export function generateStaticParams() {
  return MAJORS_DATA.map((m) => ({
    slug: m.slug,
  }));
}

export default function MajorDetailPage({ params }: { params: { slug: string } }) {
  const initialMajor = MAJORS_DATA.find((m) => m.slug === params.slug);

  if (!initialMajor) {
    notFound();
  }

  return <MajorDetailClient initialMajor={initialMajor} slug={params.slug} />;
}
