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
    role: "Full-Stack Web Developer",
    title: "MERN Stack Specialist & Next.js Engineer",
    bio: "Computer Science student and Full-Stack Developer specializing in building high-performance web applications, scalable backend microservices, and modern UI architectures using MERN Stack, Next.js, and TypeScript.",
    avatarUrl: "/photo.png",
    resumeUrl: "/Youssef_Abdeltwab_CV.pdf",
    email: "youssefabdeltawb@gmail.com",
    github: "https://github.com/YoussefAbdeltwab20035",
    linkedin: "https://linkedin.com/in/youssef-abdeltawb-2ba2ba323",
    whatsapp: "https://wa.me/201550386456",
    instagram: "https://instagram.com",
  },
  about: {
    heading: "Bridging complex system architecture with intuitive user experiences.",
    description:
      "Passionate about software architecture, database optimization, and modern frontend frameworks. Experienced in engineering full-stack production environments from concept to cloud deployment with clean, maintainable code standards.",
  },
  skillCategories: [
    {
      title: "Frontend Engineering",
      skills: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "HTML5 & CSS3"],
    },
    {
      title: "Backend & Database",
      skills: ["Node.js", "Express.js", "MongoDB & Mongoose", "PostgreSQL", "SQLite & Prisma", "RESTful APIs", "Socket.io", "JWT / RBAC"],
    },
    {
      title: "Tools & DevOps",
      skills: ["Git & GitHub", "Vercel", "Render", "Postman", "VS Code", "Cloudinary", "Stripe API"],
    },
  ],
  projects: [
    {
      id: "wasla",
      title: "Wasla — Service Matching Platform",
      subtitle: "Peer-to-peer transaction & service request system",
      description: "A comprehensive service ecosystem built with real-time tracking, live messaging, and automated request matching.",
      longDescription: "Wasla is engineered to resolve peer-to-peer service discovery and exchange challenges. It features an automated matching system that pairs service seekers with validated providers based on location, availability, and specific requirements.",
      image: "/wasla.png",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
      keyFeatures: [
        "Real-time bidirectional messaging via Socket.io",
        "Automated service matching algorithm",
        "State-driven order tracking & status updates",
        "Secure user authentication & role management",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "learnhub",
      title: "LearnHub — E-Learning Management System",
      subtitle: "Structured roadmap & student analytics engine",
      description: "An intuitive learning platform designed for structured course delivery, roadmaps, and student progress analytics.",
      longDescription: "LearnHub delivers a distraction-free environment for students and educators. It organizes complex curricula into intuitive modules while providing continuous analytics on learning pace and completion metrics.",
      image: "/learnhub.png",
      techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "TypeScript"],
      keyFeatures: [
        "Interactive course roadmap and progress persistence",
        "Modular video & document streaming architecture",
        "Comprehensive student performance dashboard",
        "Server-Side Rendering (SSR) for optimal SEO & load speed",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "workhub",
      title: "WorkHub — Freelance Marketplace",
      subtitle: "Bidding system & portfolio presentation platform",
      description: "A streamlined marketplace connecting clients with specialized talent, featuring proposal bidding and portfolio management.",
      longDescription: "WorkHub solves the complexity of proposal management and project handoffs. Clients can post job requisitions, evaluate candidate portfolios, and manage proposals through a clean unified dashboard.",
      image: "/workhub.png",
      techStack: ["React", "Node.js", "MongoDB", "Cloudinary", "Tailwind CSS"],
      keyFeatures: [
        "Dynamic job posting and custom bid submission flow",
        "Cloudinary integration for rich portfolio asset storage",
        "Filterable talent search by skills and hourly rates",
        "In-app notifications for bid approvals and contract updates",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
    {
      id: "shoply",
      title: "Shoply — Modular E-Commerce Engine",
      subtitle: "Inventory management & secure checkout system",
      description: "A modern e-commerce application featuring real-time inventory control, admin analytics, and secure Stripe payments.",
      longDescription: "Shoply provides an end-to-end e-commerce solution focused on conversion speed and operational efficiency. It handles dynamic cart state, secure payment tokenization, and instant order fulfillment tracking.",
      image: "/shoply.png",
      techStack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      keyFeatures: [
        "Fully integrated Stripe checkout pipeline with Webhooks",
        "Real-time stock level synchronization and inventory alerts",
        "Client-side dynamic cart state with persistent local caching",
        "Admin dashboard with revenue, order, and sales charts",
      ],
      githubUrl: "https://github.com/YoussefAbdeltwab20035",
      liveUrl: "#",
    },
  ],
};