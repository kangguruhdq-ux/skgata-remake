"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Eye,
  User,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { PostData } from "@/lib/data-initial";
import { useCMS } from "@/lib/store";
import { formatDate } from "@/lib/utils";

interface ArticleDetailClientProps {
  initialPost: PostData;
  slug: string;
}

export default function ArticleDetailClient({ initialPost, slug }: ArticleDetailClientProps) {
  const { posts } = useCMS();

  // Dynamic lookup from CMS posts with fallback to initial static post
  const post = (posts && posts.length > 0 ? posts.find((p) => p.slug === slug) : null) || initialPost;
  const postList = posts && posts.length > 0 ? posts : [initialPost];
  const relatedPosts = postList.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-slate-50 py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-skagata-700">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/kabar" className="hover:text-skagata-700">Kabar</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-slate-800 line-clamp-1">{post.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm overflow-hidden">
          {/* Category Badge & Meta */}
          <div className="space-y-3">
            <span className="bg-skagata-700 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{post.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.publishedAt)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views} pembaca</span>
              </span>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="my-8 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full max-h-[460px] object-cover"
            />
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border-l-4 border-emerald-600 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
            {post.excerpt}
          </div>

          {/* Body Content */}
          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & Actions */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span>Bagikan kabar resmi ini ke rekan dan jejaring Anda</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                WhatsApp
              </a>
              <a
                href="https://web.facebook.com/smkn3yogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
              >
                Facebook
              </a>
            </div>
          </div>
        </article>

        {/* Back Link */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/kabar"
            className="inline-flex items-center gap-2 text-xs font-bold text-skagata-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pusat Kabar</span>
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Kabar Terkait Lainnya
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/kabar/${rel.slug}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 transition flex items-center gap-3.5 group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-600">
                      {rel.category}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 mt-0.5 group-hover:text-skagata-700 transition">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">{formatDate(rel.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
