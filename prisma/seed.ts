import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const projects = [
  {
    id: "1",
    title: "Bangladesh Finance SuperApp",
    description: "A comprehensive fintech mobile app for Bangladesh Finance PLC. covering loans, deposits, Islamic products, and digital onboarding.",
    longDescription: "A full-featured fintech super-application built for Bangladesh Finance PLC., designed to unify banking, investment, and Islamic finance products in one platform. Includes eKYC-powered digital account opening, portfolio management, QR-based payments, and real-time financial analytics. Built with Flutter for cross-platform mobile delivery and a FastAPI backend.",
    techStack: JSON.stringify(["Flutter", "FastAPI", "Python", "MongoDB", "Node.js", "REST API"]),
    liveLink: "",
    imageUrl: "/images/projects/superapp.jpg",
    featured: true,
    status: "in-development",
    slug: "bangladesh-finance-superapp",
    order: 0,
  },
  {
    id: "2",
    title: "Bangladesh Finance Main Website",
    description: "The flagship corporate website for Bangladesh Finance PLC. — a licensed non-bank financial institution in Bangladesh.",
    longDescription: "Designed and developed the primary corporate website for Bangladesh Finance PLC. Built with Next.js and React for server-side rendering and optimal performance. Integrated MongoDB for dynamic content management and Node.js for RESTful APIs. Features include product showcases, news & media, investor relations, and an online loan inquiry portal.",
    techStack: JSON.stringify(["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "REST API"]),
    liveLink: "https://bd.finance",
    imageUrl: "/images/projects/bd-finance.jpg",
    featured: true,
    status: "live",
    slug: "bangladesh-finance-main",
    order: 1,
  },
  {
    id: "3",
    title: "BD Finance Islamic Wing",
    description: "Shariah-compliant financial products portal for the Islamic division of Bangladesh Finance PLC.",
    longDescription: "A dedicated web platform for Bangladesh Finance PLC.'s Islamic finance division, offering halal savings, fixed deposits, and Ijarah products. Built as a micro-frontend with shared design tokens from the main site, featuring an Islamic finance calculator, product comparison tools, and a branch locator.",
    techStack: JSON.stringify(["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"]),
    liveLink: "https://islamic.bd.finance",
    imageUrl: "/images/projects/bd-finance-islamic.jpg",
    featured: true,
    status: "live",
    slug: "bangladesh-finance-islamic",
    order: 2,
  },
  {
    id: "4",
    title: "BD Finance Securities",
    description: "Online trading and securities brokerage platform for Bangladesh Finance & Security Ltd.",
    longDescription: "Full-stack web platform for Bangladesh Finance Securities Ltd. (BFSL), allowing investors to manage stock portfolios, track market data, and execute trades. Features real-time feed integration, client account management, trade settlement tracking, and regulatory reporting dashboards.",
    techStack: JSON.stringify(["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "REST API"]),
    liveLink: "https://bfsl.bd.finance",
    imageUrl: "/images/projects/bd-finance-securities.jpg",
    featured: true,
    status: "live",
    slug: "bangladesh-finance-securities",
    order: 3,
  },
  {
    id: "5",
    title: "BD Finance Capital",
    description: "Corporate investment and capital management portal for Bangladesh Finance Capital Ltd.",
    longDescription: "Built the corporate web presence for Bangladesh Finance Capital Ltd. (BFCL), offering merchant banking, portfolio management, and underwriting services. Includes a secure client portal, financial reports section, fund performance dashboards, and online investment application flows.",
    techStack: JSON.stringify(["Next.js", "React", "Node.js", "MongoDB", "TypeScript"]),
    liveLink: "https://bfcl.bd.finance",
    imageUrl: "/images/projects/bd-finance-capital.jpg",
    featured: false,
    status: "live",
    slug: "bangladesh-finance-capital",
    order: 4,
  },
];

const experience = [
  {
    id: "1",
    company: "Bangladesh Finance PLC.",
    role: "Software Developer (Officer Grade-1)",
    duration: "Sep 2024 – Present",
    startDate: "2024-09",
    endDate: "Present",
    responsibilities: JSON.stringify([
      "Designed, developed & maintained 4 full-scale web platforms (Main, Islamic, Securities, and Capital websites) using Next.js, React.js, MongoDB and Node.js",
      "Spearheaded development of the Bangladesh Finance Mobile eKYC App, reducing manual verification time by 60%",
      "Integrated secure RESTful APIs, ensuring compliance with financial-grade security standards",
      "Built a QR code–based File Archiving System, automating document retrieval and reducing file access time by 70%",
      "Collaborated with UI/UX teams to ensure responsive, user-friendly, and secure digital platforms",
    ]),
    achievements: JSON.stringify([
      "Built and deployed 4 production-grade corporate websites for a leading financial institution within 6 months",
      "Reduced manual verification time by 60% through the eKYC app",
      "Reduced file access time by 70% with a QR code–based archiving system",
      "Selected as top-performing intern and promoted to Officer Grade-1 within 3 months",
    ]),
    logo: "/images/companies/bangladesh-finance.png",
    order: 0,
  },
  {
    id: "2",
    company: "Bangladesh Finance PLC.",
    role: "Software Developer Intern",
    duration: "Jun 2024 – Aug 2024",
    startDate: "2024-06",
    endDate: "2024-08",
    responsibilities: JSON.stringify([
      "Assisted in developing and maintaining internal company software using React.js, PHP, and MySQL",
      "Enhanced system performance by optimizing frontend components, improving load times by up to 25%",
      "Maintained internal systems using PHP, MySQL, and React.js, following MVC architecture and secure REST API integration",
      "Worked with senior developers to debug and test mission-critical features",
      "Gained practical experience in web security, database optimization, API integration, and Agile development",
    ]),
    achievements: JSON.stringify([
      "Improved frontend load times by up to 25% through component optimization",
      "Contributed to multiple live production systems in a fast-paced fintech environment",
      "Promoted to full-time Software Developer (Officer Grade-1) after 3 months",
    ]),
    logo: "/images/companies/bangladesh-finance.png",
    order: 1,
  },
];

const education = [
  {
    id: "1",
    degree: "M.Sc in Information Systems Security (MISS)",
    institution: "Bangladesh University of Professionals (BUP)",
    duration: "Jan 2025 – Present",
    startDate: "2025-01",
    endDate: "Present",
    description: "Professional master's program focused on Penetration Testing, Digital Forensics, and Secure Software Design.",
    gpa: "3.5/4.0",
    order: 0,
  },
  {
    id: "2",
    degree: "B.Sc in Computer Science and Engineering",
    institution: "University of Information Technology and Sciences (UITS)",
    duration: "Jan 2020 – Jun 2024",
    startDate: "2020-01",
    endDate: "2024-06",
    description: "Comprehensive study in Data Structures and Algorithms, Database Management Systems, Operating Systems, Computer Networks, Web Application Development, Object-Oriented Programming, and Artificial Intelligence.",
    gpa: "3.2/4.0",
    order: 1,
  },
];

const certifications = [
  {
    id: "1",
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    date: "2023-01",
    credentialLink: "https://www.coursera.org/",
    credentialId: "",
    badgeUrl: "/images/certifications/coursera.png",
    order: 0,
  },
  {
    id: "2",
    name: "Python Data Structures",
    issuer: "Coursera",
    date: "2023-03",
    credentialLink: "https://www.coursera.org/",
    credentialId: "",
    badgeUrl: "/images/certifications/coursera.png",
    order: 1,
  },
  {
    id: "3",
    name: "A Complete Guide to the Flutter SDK & Framework for Native iOS and Android Apps",
    issuer: "Udemy",
    date: "2024-01",
    credentialLink: "https://www.udemy.com/",
    credentialId: "In Progress",
    badgeUrl: "/images/certifications/udemy.png",
    order: 2,
  },
];

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Engineering Manager",
    company: "Tech Innovations Inc.",
    content: "Outstanding developer with exceptional problem-solving skills. They consistently deliver high-quality code and are always willing to help team members. Their expertise in full-stack development has been invaluable to our projects.",
    imageUrl: "/images/testimonials/sarah-johnson.jpg",
    order: 0,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Senior Product Manager",
    company: "Digital Solutions LLC",
    content: "One of the most talented developers I've worked with. They have a unique ability to understand complex business requirements and translate them into elegant technical solutions. A true team player who elevates everyone around them.",
    imageUrl: "/images/testimonials/michael-chen.jpg",
    order: 1,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "CTO",
    company: "StartUp Ventures",
    content: "Impressive technical skills combined with excellent communication abilities. They were instrumental in scaling our platform and mentoring junior developers. Their contributions significantly impacted our company's growth.",
    imageUrl: "/images/testimonials/emily-rodriguez.jpg",
    order: 2,
  },
  {
    id: "4",
    name: "David Kim",
    role: "Lead Developer",
    company: "Tech Innovations Inc.",
    content: "A brilliant developer who brings innovative solutions to challenging problems. Their code is clean, well-documented, and maintainable. It's been a pleasure collaborating on various projects together.",
    imageUrl: "/images/testimonials/david-kim.jpg",
    order: 3,
  },
];

const socialLinks = [
  { id: "1", name: "GitHub", url: "https://github.com/Omniscientcoder1", icon: "FaGithub", order: 0 },
  { id: "2", name: "LinkedIn", url: "https://www.linkedin.com/in/tahmid-rahman9098/", icon: "FaLinkedin", order: 1 },
  { id: "3", name: "Email", url: "mailto:tahmid8017@gmail.com", icon: "FaEnvelope", order: 2 },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });
  console.log(`✅ Admin user "${adminUsername}" created/updated`);

  // Seed projects
  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log(`✅ ${projects.length} projects seeded`);

  // Seed experience
  for (const e of experience) {
    await prisma.experience.upsert({ where: { id: e.id }, update: e, create: e });
  }
  console.log(`✅ ${experience.length} experience entries seeded`);

  // Seed education
  for (const e of education) {
    await prisma.education.upsert({ where: { id: e.id }, update: e, create: e });
  }
  console.log(`✅ ${education.length} education entries seeded`);

  // Seed certifications
  for (const c of certifications) {
    await prisma.certification.upsert({ where: { id: c.id }, update: c, create: c });
  }
  console.log(`✅ ${certifications.length} certifications seeded`);

  // Seed testimonials
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.id }, update: t, create: t });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // Seed social links
  for (const s of socialLinks) {
    await prisma.socialLink.upsert({ where: { id: s.id }, update: s, create: s });
  }
  console.log(`✅ ${socialLinks.length} social links seeded`);

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
