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
  const initialMajor = MAJORS_DATA.find((m) => m.slug === params.slug) || {
    id: params.slug,
    code: params.slug.toUpperCase(),
    name: params.slug.replace(/-/g, " ").toUpperCase(),
    slug: params.slug,
    colorBadge: "bg-emerald-700 text-white",
    badgeBg: "bg-emerald-50 text-emerald-800",
    tagline: "",
    description: "",
    aksara: "",
    coverImage: "/media/school/otomotif-cover.webp",
    gallery: [],
    headOfMajor: "",
    totalStudents: 0,
    accreditation: "A (Unggul)",
    competencies: [],
    careerProspects: [],
    industryPartners: [],
    facilities: [],
    studentWorks: [],
  };

  return <MajorDetailClient initialMajor={initialMajor} slug={params.slug} />;
}
