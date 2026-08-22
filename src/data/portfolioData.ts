export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  keyFeatures?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Youssef Abdeltwab",
    role: "Full-Stack Software Engineer",
    title: "MERN Stack Specialist & Scalable Web Architect",
    bio: "Software Engineer specializing in building fault-tolerant backend architectures, ultra-fast web interfaces, and high-concurrency systems using Next.js, Node.js, TypeScript, and MongoDB.",
    avatarUrl: "/photo.png",
    resumeUrl: "/Youssef_Abdeltwab_CV.pdf",
    email: "youssefabdeltawb@gmail.com",
    github: "https://github.com/YoussefAbdeltwab20035",
    linkedin: "https://linkedin.com/in/youssef-abdeltawb-2ba2ba323",
    whatsapp: "https://wa.me/201550386456",
    instagram: "https://instagram.com",
  },
  about: {
    heading: "Architecting high-availability systems with measurable business impact.",
    description:
      "Focused on engineering decoupled client-server ecosystems, optimizing database throughput, and shipping production-grade web applications. Experienced in designing resilient REST APIs, edge caching strategies, and robust cloud deployments.",
  },
  skillCategories: [
    {
      title: "Frontend Engineering",
      skills: [
        "React.js",
        "Next.js (App Router / SSR / ISR)",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "State Architecture (Redux / Context)",
        "Web Vitals & Performance",
      ],
    },
    {
      title: "Backend & System Design",
      skills: [
        "Node.js & Express.js",
        "MongoDB (Aggregation & Indexing)",
        "PostgreSQL & Prisma ORM",
        "RESTful API Design",
        "WebSocket & Real-Time Engines",
        "JWT / RBAC Security Architectures",
        "Rate Limiting & Data Sanitization",
      ],
    },
    {
      title: "DevOps & Tooling",
      skills: [
        "Git & Advanced Workflows",
        "Edge CDNs & Vercel / Render",
        "Cloud Architecture (Cloudinary / S3)",
        "Stripe Webhook Infrastructure",
        "Postman API Automated Testing",
        "Performance Benchmarking (Autocannon)",
      ],
    },
  ],
  projects: [
    {
      id: "wasla",
      title: "Wasla — Peer-to-Peer Service Engine",
      subtitle: "High-concurrency matching algorithm & real-time communication pipeline",
      description:
        "A distributed peer-to-peer exchange engine designed to automate order fulfillment and cross-border request matching with sub-second latency.",
      longDescription:
        "Engineered to eliminate intermediation bottlenecks in cross-border requests. Features a deterministic matching algorithm pairing users based on real-time availability and geolocation, backed by WebSocket-driven bidirectionality.",
      image: "/wasla.png",
      techStack: ["Node.js", "Express", "MongoDB", "Socket.io", "React", "Tailwind CSS"],
      keyFeatures: [
        "Low-latency duplex communication architecture powered by Socket.io",
        "Automated request matching engine optimizing fulfillment latency",
        "Atomic transaction state machine ensuring Zero-Loss order tracking",
        "Enterprise-grade JWT authentication and granular Role-Based Access Control (RBAC)",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "shoply",
      title: "Shoply — High-Throughput E-Commerce Engine",
      subtitle: "Distributed inventory synchronization & idempotent payment workflows",
      description:
        "An enterprise-ready commerce platform engineered for high conversion rates, real-time inventory management, and zero-drop transactional workflows.",
      longDescription:
        "Built to handle intensive peak traffic while maintaining deterministic cart states and accurate inventory counts. Integrates asynchronous webhook processing to guarantee zero duplicate charges and immediate fulfillment updates.",
      image: "/shoply.png",
      techStack: ["Next.js (App Router)", "TypeScript", "Node.js", "MongoDB", "Stripe API", "Tailwind CSS"],
      keyFeatures: [
        "Idempotent Stripe payment processing with verified cryptographic webhooks",
        "Real-time database indexing for concurrency-safe stock reservation",
        "Client-side optimistic UI updates with persistent localStorage reconciliation",
        "Comprehensive metric tracking and sales analytics dashboard",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "learnhub",
      title: "LearnHub — Enterprise Learning Management System",
      subtitle: "Edge-cached video delivery & real-time analytics aggregation",
      description:
        "A scalable learning platform providing interactive learning paths, modular curriculum delivery, and predictive student progress analytics.",
      longDescription:
        "Architected with Next.js Server Components and incremental static regeneration (ISR) to achieve sub-100ms First Contentful Paint (FCP) while dynamically tracking student retention, quiz progress, and completion velocity.",
      image: "/learnhub.png",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB Aggregation"],
      keyFeatures: [
        "Hybrid SSR/ISR rendering pipeline achieving optimal SEO and millisecond edge loads",
        "Advanced MongoDB aggregation pipelines for instant student progress analytics",
        "Modular curriculum streaming architecture with low layout shift (Zero CLS)",
        "Session-persistent state management across complex nested learning roadmaps",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "workhub",
      title: "WorkHub — Talent Marketplace & Proposal Gateway",
      subtitle: "Decoupled bidding engine & secure digital asset pipeline",
      description:
        "A production-grade talent marketplace featuring dynamic bidding workflows, portfolio asset distribution, and secure milestone contracts.",
      longDescription:
        "Solves freelancer-client matching inefficiencies through structured proposal lifecycle states. Incorporates automated asset compression pipelines and query filtering to deliver instant talent discovery across high-volume listings.",
      image: "/workhub.png",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary CDN", "Tailwind CSS"],
      keyFeatures: [
        "Stateful proposal lifecycle engine with real-time in-app status dispatching",
        "Optimized media delivery via automated Cloudinary transformations and CDN delivery",
        "Multi-parameter search indexing supporting compound skill queries and budget filters",
        "Sanitized REST endpoints with strict input validation guarding against injection attacks",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
  ],
};