import { NextResponse } from "next/server";
import { MAJORS_DATA, POSTS_DATA, SERVICES_DATA, TEACHERS_DATA } from "@/lib/data-initial";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  if (!q) {
    return NextResponse.json({
      query: "",
      majors: [],
      posts: [],
      services: [],
      teachers: [],
    });
  }

  let sourceMajors = MAJORS_DATA;
  let sourcePosts = POSTS_DATA;
  let sourceServices = SERVICES_DATA;
  let sourceTeachers = TEACHERS_DATA;

  try {
    const record = await prisma.cmsData.findUnique({
      where: { id: "singleton" },
    });
    if (record && record.data) {
      const parsed = JSON.parse(record.data);
      if (parsed.majors && Array.isArray(parsed.majors)) sourceMajors = parsed.majors;
      if (parsed.posts && Array.isArray(parsed.posts)) sourcePosts = parsed.posts;
      if (parsed.services && Array.isArray(parsed.services)) sourceServices = parsed.services;
      if (parsed.teachers && Array.isArray(parsed.teachers) && parsed.teachers.length > 10) {
        sourceTeachers = parsed.teachers;
      }
    }
  } catch (e) {
    // fallback
  }

  const majors = sourceMajors.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
  );

  const posts = sourcePosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
  );

  const services = sourceServices.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.badge.toLowerCase().includes(q)
  );

  const teachers = sourceTeachers.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.role.toLowerCase().includes(q) ||
      (t.department && t.department.toLowerCase().includes(q))
  );

  return NextResponse.json({
    query: q,
    results: {
      majors,
      posts,
      services,
      teachers,
    },
  });
}
