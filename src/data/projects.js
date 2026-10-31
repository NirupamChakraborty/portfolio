export const projects = [
  {
    slug: "medtrust",
    plate: "MED 01",
    shot: "/projects/medtrust.jpg",
    title: "MedTrust",
    desc: "A production-grade telemedicine platform anchoring the SHA-256 hash of every prescription on a private Quorum blockchain for tamper detection, with AI-powered disease prediction and a native Kotlin Android app.",
    longDesc: "MedTrust is a comprehensive telemedicine platform built on Next.js 15 with Clerk authentication, Vonage video consultations, and Razorpay payments. Every prescription is hashed with SHA-256 and anchored to a private Quorum blockchain (three custom smart contracts under Raft consensus) so tampering can be detected after the fact. A BiLSTM + Attention model predicts disease likelihood from symptoms at 91.8% accuracy, PDF prescriptions are generated with pdf-lib and stored via Cloudinary, and a companion native Android app (Kotlin, MVVM) gives patients on-the-go access.",
    metric: { value: "91.8%", label: "disease prediction accuracy" },
    tags: ["Next.js", "Blockchain", "Prisma", "AI/ML"],
    stack: ["Next.js 15", "Clerk", "Prisma", "Quorum Blockchain", "Vonage Video", "Razorpay", "BiLSTM", "Kotlin (Android)"],
    github: "https://github.com/NirupamChakraborty/medtrust",
    live: "https://medtrust-omega.vercel.app",
  },
  {
    slug: "quickai",
    plate: "QAI 02",
    shot: "/projects/quickai.jpg",
    title: "QuickAI",
    desc: "A full-stack AI SaaS platform offering blog generation, resume review, and text-to-image generation, serving 30+ active users.",
    longDesc: "QuickAI bundles several AI-powered writing and design tools — blog generation, resume review, and text-to-image generation — behind a single SaaS dashboard. It integrates Gemini 2.5 Flash and ClipDrop APIs with carefully structured prompt engineering, which improved AI response accuracy by 35% and cut token usage by 20% compared to the first version. It currently serves 30+ active users.",
    metric: { value: "30+", label: "active users" },
    tags: ["React", "Node.js", "PostgreSQL", "Gemini API"],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "NeonDB", "Gemini 2.5 Flash", "Cloudinary", "Clerk", "ClipDrop API"],
    github: "https://github.com/NirupamChakraborty/Quick-Ai",
    live: "https://quick-ai-client-tau.vercel.app/",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export default projects;
