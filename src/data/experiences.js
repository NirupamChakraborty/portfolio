export const experiences = [
  {
    role: "Software Developer (Backend)",
    company: "RiskGrid AI",
    period: "July 2025 – Present",
    location: "Remote (Bangalore, India)",
    current: true,
    points: [
      "Built a Relationship-Based Access Control (ReBAC) engine using Python, FastAPI and PostgreSQL with Firebase authentication, enabling fine-grained, relationship-aware role and permission management across the platform.",
      "Developed backend services for Project Hub in Python and FastAPI, with audit logging that records user and system actions for traceability and accountability.",
      "Set up CI/CD pipelines with GitHub Actions for 15+ services, automating build, test, Docker containerization and deployment to GCP Cloud Run.",
      "Provisioned multi-region GCP environments for development, staging and production using Terraform, with keyless authentication via Workload Identity Federation.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Firebase", "GCP Cloud Run", "Terraform", "GitHub Actions", "Docker"],
  },
  {
    role: "Software Developer Intern",
    company: "Indian Oil Corporation Limited (IOCL)",
    period: "July 2025 – Aug 2025",
    location: "Digboi, Assam",
    points: [
      "Developed a cybersecurity web app integrating Google Gemini 1.5 Flash to identify phishing URLs and malicious files, enabling 30% faster threat detection.",
      "Designed and implemented 6 RESTful API endpoints, reducing data processing time by 50%; troubleshot full-stack issues and documented system workflows.",
    ],
    tags: ["Gemini API", "REST APIs", "Cybersecurity"],
  },
  {
    role: "Web Developer Intern",
    company: "GrowthLink Solutions",
    period: "Jan 2025 – Apr 2025",
    location: "Remote",
    points: [
      "Migrated the company portfolio from WordPress to React.js, improving page load speed by 60% and delivering the project 1 week ahead of schedule.",
      "Implemented a 4-layered architecture (UI, Hooks, State, API), reducing senior engineer code review time by 15%.",
    ],
    tags: ["React.js", "Architecture", "Performance"],
  },
];

export const currentWork = [
  {
    label: "Access control",
    title: "A ReBAC engine for fine-grained permissions.",
    text: "Relationship-aware role and permission management across the platform, built with Python, FastAPI and PostgreSQL on Firebase authentication.",
    hue: 212,
  },
  {
    label: "Backend services",
    title: "Project Hub, with a full audit trail.",
    text: "Backend services in Python and FastAPI, with audit logging that records user and system actions for traceability and accountability.",
    hue: 265,
  },
  {
    label: "Delivery",
    title: "CI/CD for 15+ services.",
    text: "GitHub Actions pipelines that automate build, test, Docker containerization and deployment to GCP Cloud Run.",
    hue: 170,
  },
  {
    label: "Infrastructure",
    title: "Multi-region GCP, defined in Terraform.",
    text: "Development, staging and production environments, with keyless deployments through Workload Identity Federation.",
    hue: 25,
  },
];

export default experiences;
