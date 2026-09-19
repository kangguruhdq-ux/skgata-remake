import { NextResponse } from "next/server";
import { MAJORS_DATA, POSTS_DATA, SERVICES_DATA, TEACHERS_DATA } from "@/lib/data-initial";

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

  const majors = MAJORS_DATA.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
  );

  const posts = POSTS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
  );

  const services = SERVICES_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.badge.toLowerCase().includes(q)
  );

  const teachers = TEACHERS_DATA.filter(
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
