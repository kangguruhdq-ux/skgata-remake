import { PrismaClient } from "@prisma/client";
import {
  SCHOOL_INFO,
  MAJORS_DATA,
  POSTS_DATA,
  TEACHERS_DATA,
  JOBS_DATA,
  SERVICES_DATA,
} from "../src/lib/data-initial";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding authentic SMKN 3 Yogyakarta data...");

  // 1. Seed Site Setting
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      schoolName: SCHOOL_INFO.name,
      tagline: SCHOOL_INFO.motto,
      phone: SCHOOL_INFO.phone,
      email: SCHOOL_INFO.email,
      address: SCHOOL_INFO.address,
      activeVideoId: "tJhzVg7Nq4g",
      spmbActive: true,
      spmbUrl: "https://smkn3jogja.sch.id/pengumuman/",
    },
  });

  // 2. Seed Majors
  for (const major of MAJORS_DATA) {
    await prisma.major.upsert({
      where: { slug: major.slug },
      update: {},
      create: {
        code: major.code,
        name: major.name,
        slug: major.slug,
        colorBadge: major.colorBadge,
        tagline: major.tagline,
        description: major.description,
        curriculum: JSON.stringify(major.competencies),
        careerProspects: JSON.stringify(major.careerProspects),
        industryPartners: JSON.stringify(major.industryPartners),
        facilities: JSON.stringify(major.facilities),
        coverImage: major.coverImage,
        headOfMajor: major.headOfMajor,
        totalStudents: major.totalStudents,
      },
    });
  }

  // 3. Seed Posts
  for (const post of POSTS_DATA) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        coverImage: post.coverImage,
        author: post.author,
        views: post.views,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }

  // 4. Seed Services
  for (const service of SERVICES_DATA) {
    await prisma.serviceLink.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        name: service.name,
        badge: service.badge,
        category: service.category,
        description: service.description,
        url: service.url,
        icon: service.icon,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
