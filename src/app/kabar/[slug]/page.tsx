import React from "react";
import { notFound } from "next/navigation";
import { POSTS_DATA } from "@/lib/data-initial";
import ArticleDetailClient from "@/components/kabar/ArticleDetailClient";

export function generateStaticParams() {
  return POSTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const initialPost = POSTS_DATA.find((p) => p.slug === params.slug);

  if (!initialPost) {
    notFound();
  }

  return <ArticleDetailClient initialPost={initialPost} slug={params.slug} />;
}
