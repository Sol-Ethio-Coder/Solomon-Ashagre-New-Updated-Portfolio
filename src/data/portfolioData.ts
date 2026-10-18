export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  image: string;
  imagePosition?: string; // CSS object-position for card screenshots
  github?: string;
  live?: string;
  category: "fullstack" | "frontend";
  featured: boolean;
  color: string;
  year?: string;
};

export type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools & Cloud" | "AI & Others";
  description: string;
  core?: boolean; // listed in the CV skills section
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  location: string;
  type: "Internship" | "Teaching" | "Employment" | "Hackathon";
  description: string;
  achievements: string[];
  techStack: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  location: string;
  highlight: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  popular?: boolean;
};

export const PROFILE = {
  name: "Solomon Ashagre",
  role: "Computing Teacher & Full Stack Developer",
  tagline: "Building exceptional, high-performance digital products from Addis Ababa.",
  bio:
    "Computer Science graduate from Addis Ababa University and Computing Teacher with 2+ years of professional teaching experience. I have hands-on full-stack development experience through three remote software development internships and multiple real-world projects, and I was recognized as Star Teacher of the Month at Trillium International School.",
  avatar: "/images/solomon-avatar.jpg",
  email: "solethiocoder@gmail.com",
  phone: "+251 901436358",
  location: "Addis Ababa, Ethiopia",
  availableForWork: true,
  yearsOfExperience: "2+",
  socials: {
    github: "https://github.com/Sol-Ethio-Coder",
    linkedin: "https://linkedin.com/in/Sol-Ethio-Coder",
    telegram: "https://t.me/Sol_Ethio_Coder",
    whatsapp: "https://wa.me/251901436358",
  },
};

export const ROLES_TICKER = [
  "Full Stack Web Developer",
  "STCA Founder & Educator",
  "MERN Stack Specialist",
  "React & Vite Developer",
  "AI & Machine Learning Enthusiast",
  "Computing Science Teacher",
  "Interactive UI Developer",
];

export const SKILLS: Skill[] = [
  { name: "React", category: "Frontend", core: true, description: "Component-based user interfaces for the web." },
  { name: "TypeScript", category: "Frontend", core: true, description: "Typed JavaScript for safer, more maintainable code." },
  { name: "JavaScript", category: "Frontend", core: true, description: "The language of the web, in the browser and on Node.js." },
  { name: "HTML", category: "Frontend", core: true, description: "Semantic, accessible page structure." },
  { name: "CSS / Tailwind", category: "Frontend", core: true, description: "Responsive layouts and utility-first styling." },
  { name: "Node.js", category: "Backend", core: true, description: "JavaScript on the server." },
  { name: "Express.js", category: "Backend", description: "Web servers and REST API routes." },
  { name: "REST APIs", category: "Backend", description: "Designing and consuming HTTP APIs." },
  { name: "Python", category: "Backend", core: true, description: "Scripting and programming fundamentals." },
  { name: "C++", category: "Backend", core: true, description: "Programming fundamentals and problem solving." },
  { name: "MongoDB", category: "Database", core: true, description: "Document database for full-stack apps." },
  { name: "Git / GitHub", category: "Tools & Cloud", core: true, description: "Version control and collaboration." },
  { name: "Netlify", category: "Tools & Cloud", core: true, description: "Deploying and hosting frontend apps." },
  { name: "Render", category: "Tools & Cloud", core: true, description: "Deploying backend services." },
  { name: "VS Code", category: "Tools & Cloud", core: true, description: "Day-to-day development environment." },
  { name: "AI-assisted development", category: "AI & Others", description: "Using AI tools to prototype and build faster." },
];

export const PROJECTS: Project[] = [
  {
    id: "stca",
    title: "STCA Online Course Platform",
    subtitle: "Sol Tutoring & Coding Academy",
    description:
      "A full-stack learning platform where students enroll in structured, module-based coding courses and book one-on-one academic tutoring, online or in person.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "JWT", "Chapa"],
    features: [
      "Course enrollment with Chapa checkout (Telebirr, CBE Birr, HelloCash, card) or manual transfer with admin-reviewed receipts",
      "Modules and lessons with video, progress tracking, AI explanations and practice quizzes",
      "Final exams with printable certificates that anyone can verify, plus an admin panel with analytics",
    ],
    image: "/images/project-stca.webp",
    github: "https://github.com/Sol-Ethio-Coder/Synent-Task8-Online-Course-Platform-SolomonAshagre",
    live: "https://stca-platform.vercel.app/",
    category: "fullstack",
    featured: true,
    color: "from-emerald-400 to-green-700",
    year: "2026",
  },
  {
    id: "equbhub",
    title: "Equb Hub",
    subtitle: "Equb management platform",
    description:
      "The simple, trusted way to run an Equb: track every monthly contribution, check every receipt, and keep the whole group on the same page.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Members upload payment receipts; leaders verify or reject them, with overdue detection and automatic reminders",
      "Multiple Equb groups with member and leader roles, join requests, and invite links",
      "CSV and PDF reports, Amharic language and Ethiopian calendar switches, and a 30-day free trial",
    ],
    image: "/images/project-equbhub.webp",
    github: "https://github.com/Sol-Ethio-Coder/Equib_Hub",
    live: "https://equibhub.vercel.app/",
    category: "fullstack",
    featured: true,
    color: "from-teal-400 to-emerald-600",
    year: "2026",
  },
  {
    id: "mistir",
    title: "Mistir Password Manager",
    subtitle: "Free, AI-assisted password manager built in Addis Ababa",
    description:
      "A password manager that vaults text, pictures, files, and CVs behind AES-256 encryption, with a local AI assist that scores, generates, and sorts your secrets.",
    technologies: ["AES-256 encryption", "Local AI assist", "Web app"],
    features: [
      "Encrypted vaults for passwords, images, documents, and CVs",
      "Local AI assist that scores password strength, generates passwords, and sorts entries",
      "Free forever plan, with paid plans payable in Birr",
    ],
    image: "/images/project-mistir.webp",
    github: "https://github.com/Sol-Ethio-Coder/Mistir-Password-Manager",
    live: "https://mistir.netlify.app/",
    category: "fullstack",
    featured: true,
    color: "from-violet-500 to-indigo-700",
    year: "",
  },
  {
    id: "sol-ebooks",
    title: "Sol Ethio Coder Books",
    subtitle: "Author website for published books",
    description:
      "A fast, responsive author website where readers discover the published books of Solomon Ashagre, read about each one, and buy it from the Ye-Buna store.",
    technologies: ["React", "Vite", "Tailwind CSS", "Motion", "React Router"],
    features: [
      "Searchable, filterable book library with a dedicated page for every book",
      "3D, cursor-reactive book covers with smooth scroll animations",
      "Light and dark themes, SEO-ready markup, and a contact form with no backend needed",
    ],
    image: "/images/project-sol-ebooks.webp",
    github: "https://github.com/Sol-Ethio-Coder/Ebooks-By-Sol-Ethio-Coder",
    live: "https://sol-ebooks.vercel.app/",
    category: "frontend",
    featured: true,
    color: "from-amber-400 to-orange-600",
    year: "2026",
  },
  {
    id: "tasko",
    title: "Tasko",
    subtitle: "Daily task manager",
    description:
      "A clean, modern task manager for organizing work, personal goals, health routines, and learning in one place.",
    longDescription:
      "Tasko keeps a day's tasks organized by category and priority, shows a live completion rate, and saves everything in the browser so tasks are still there after a reload. It is fully responsive, with an animated background and smooth interactions.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "LocalStorage"],
    features: [
      "Filter by All, Active, or Completed, and organize by Work, Personal, Health, and Learning",
      "Low, medium, and high priority levels with a live daily completion rate",
      "Create, edit, and delete tasks, with bulk clear for completed or all tasks",
    ],
    image: "/images/project-tasko.webp",
    github: "https://github.com/Sol-Ethio-Coder/CodeAlpha_To-Do_App",
    live: "https://sol-tasko.netlify.app/",
    category: "frontend",
    featured: true,
    color: "from-fuchsia-500 to-purple-700",
    year: "2026",
  },
  {
    id: "addiskit",
    title: "AddisKit",
    subtitle: "Free toolkit for Ethiopian job seekers and businesses",
    description:
      "A free CV maker, business document templates, and a Birr expense tracker built for Ethiopia, with AI feedback built in. No sign-up, and nothing is uploaded.",
    longDescription:
      "AddisKit helps people get hired and then build a business. Everything runs in the browser and is saved on the visitor's own device. The two AI tools call small serverless functions powered by the Groq API, and the whole site switches between English and Amharic.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Netlify Functions", "Groq API"],
    features: [
      "CV maker with live preview and PDF export, plus Ethiopian business document templates such as an Iqub agreement",
      "Birr expense tracker with the 13-month Ethiopian calendar and Iqub and Idir categories",
      "AI CV Reviewer and AI Business Advisor, with a full English and Amharic language toggle",
    ],
    image: "/images/project-addiskit.webp",
    github: "https://github.com/Sol-Ethio-Coder/AddisKit",
    live: "https://addiskit.netlify.app",
    category: "fullstack",
    featured: true,
    color: "from-yellow-500 to-amber-700",
    year: "2026",
  },
];

// Earlier projects, shown in the "More projects" list under the featured case studies.
export const MORE_PROJECTS: Project[] = [
  {
    id: "github-explorer",
    title: "GitHub Profile Explorer",
    subtitle: "API integration task, Synent Technologies internship",
    description:
      "A dependency-free web app that fetches live user data from the public GitHub REST API and shows the profile, repo count, followers, location, and join date.",
    longDescription:
      "Task 6 of my remote internship at Synent Technologies: fetch and display data from a public API with proper loading and error states. Built with plain HTML, CSS, and JavaScript, with no frameworks and no build step.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Fetch API", "GitHub REST API"],
    features: [
      "Looks up any GitHub username live and shows avatar, bio, repos, followers, following, location, company, and join date",
      "Loading spinner plus clear messages for username not found, API rate limit exceeded, and network failures",
      "XSS-safe rendering, Enter-key search, and a responsive dark interface",
    ],
    image: "/images/project-github-explorer.webp",
    github: "https://github.com/Sol-Ethio-Coder/Synent-Task6-API-Integration-SolomonAshagre",
    live: "https://sol-api-integration.vercel.app",
    category: "frontend",
    featured: false,
    color: "from-sky-400 to-blue-600",
    year: "2026",
  },
  {
    id: "mercado",
    title: "Mercado",
    subtitle: "AI-powered system built at Cursor AI Hackathon Ethiopia",
    description:
      "Built at the Cursor AI Hackathon Ethiopia: describe your business in Amharic or English and reach Telegram and the web with one budget, with payment held in Telebirr escrow until delivery is verified.",
    longDescription:
      "Built with a team in a single hackathon, Mercado shows how AI-assisted development can turn an idea into a working product quickly.",
    technologies: ["AI-assisted development", "Hackathon project"],
    features: [
      "Built collaboratively during the Cursor AI Hackathon Ethiopia, July 2026",
      "Rapid prototyping and problem-solving under hackathon time limits",
    ],
    image: "/images/project-mercado.webp",
    live: "https://mercado-bice.vercel.app",
    category: "fullstack",
    featured: false,
    color: "from-fuchsia-500 to-purple-700",
    year: "2026",
  },
  {
    id: "boardly",
    title: "Boardly",
    subtitle: "Project Board",
    description: "A full-stack Trello/Asana-style app: kanban boards, live task sync, comments, and activity feeds across teams.",
    longDescription: "Boardly is a full-stack project management tool built as an internship project at CodeAlpha. Teams create projects, invite members, and manage work on a drag-and-drop kanban board (To Do / In Progress / Done), with every change — task moves, comments, new members — synced live across every connected client via Socket.io. Task cards carry priority flags, labels, due dates, and file attachments, and a personal 'My Tasks' view rolls up everything assigned to you across all projects, with overdue items highlighted.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Axios"],
    features: [
      "Drag-and-drop kanban board with real-time sync across all clients",
      "Task detail modal: assignee, priority, labels, due date, file attachments",
      "Live activity feed and toast notifications for every project event",
      "\"My Tasks\" cross-project view with overdue highlighting",
      "Comments with a live \"user is typing\" indicator",
      "Dark mode, keyboard shortcuts, and a confetti celebration on task completion",
    ],
    image: "/images/project-boardly.webp",
    github: "https://github.com/Sol-Ethio-Coder/codealpha_task_three",
    live: "https://boardly-solomon.netlify.app/login",
    category: "fullstack",
    featured: true,
    color: "from-amber-500 to-orange-600",
    year: "2026",
  },
  {
    id: "signal",
    title: "Signal",
    subtitle: "Real-Time Video & Collaboration",
    description: "Multi-user WebRTC video calls, screen sharing, a live shared whiteboard, and end-to-end encrypted chat — nothing to install.",
    longDescription: "Signal is a full-stack video conferencing platform built as a CodeAlpha internship project. Every participant opens a direct peer-to-peer WebRTC connection to every other participant (a full mesh secured by DTLS-SRTP); Socket.io only relays the signaling needed to set that connection up, so the server never touches raw media. On top of the core spec — video, screen share, a real-time collaborative whiteboard, file sharing, and encrypted chat — it adds host controls, raise-hand, live emoji reactions, typing indicators, and automatic host handoff if the host leaves.",
    technologies: ["WebRTC", "Socket.io", "Node.js", "Express", "MongoDB Atlas", "JWT", "AES-256-GCM"],
    features: [
      "Multi-user WebRTC mesh video calling with screen sharing",
      "Real-time collaborative whiteboard synced across the room",
      "AES-256-GCM encrypted chat history, bcrypt-hashed passwords, JWT sessions",
      "Host controls: mute all, remove participant, automatic host handoff",
      "Raise hand, floating emoji reactions, and typing indicators",
      "Live connection-quality indicator and instant guest join (no account needed)",
    ],
    image: "/images/project-signal.webp",
    github: "https://github.com/Sol-Ethio-Coder/codealpha_task_four",
    live: "https://signal-solomon.netlify.app/",
    category: "fullstack",
    featured: true,
    color: "from-violet-500 to-indigo-600",
    year: "2026",
  },
  {
    id: "sol-crm",
    title: "Sol CRM - Enterprise Client Manager",
    subtitle: "Complete Client Relationship & Management Dashboard",
    description: "A feature-rich customer relationship management tool built with strict JWT secure authentication and real-time client analytics.",
    longDescription: "Developed as a standout deliverable during the CodeAlpha Tech Internship, Sol CRM equips businesses with powerful tools to onboard clients, track sales pipelines, filter revenue tiers, and maintain meticulous activity logs. Built with a highly responsive administrative dashboard and secure REST endpoints.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT Auth", "Recharts", "Tailwind CSS"],
    features: [
      "Role-based secure authentication utilizing encrypted JSON Web Tokens",
      "Real-time client analytics and customizable sales pipeline charts",
      "Advanced searching, sorting, and pagination of client records",
      "Export capabilities for offline executive reporting",
    ],
    image: "/images/project-sol-crm.webp",
    github: "https://github.com/Sol-Ethio-Coder/FUTURE_FS_02",
    live: "https://sol-crm.netlify.app/",
    category: "fullstack",
    featured: true,
    color: "from-rose-500 to-red-600",
    year: "2026",
  },
  {
    id: "age-calc",
    title: "Precision Age Calculator Web App",
    subtitle: "Sleek Exact Time Span Calculation Utility",
    description: "An ultra-polished frontend utility that computes precise lifespans down to exact years, months, weeks, and days instantly.",
    longDescription: "Created to showcase impeccable frontend validation, state management, and fluid animations. The application instantly checks leap years, historical calendar shifts, and birthday countdowns while offering an incredibly clean, accessible, and delightful user interface.",
    technologies: ["React", "JavaScript", "CSS3", "Tailwind CSS", "Netlify"],
    features: [
      "Instant real-time calculation with zero latency",
      "Upcoming birthday countdown timer with celebratory alerts",
      "Robust input validation preventing invalid historical dates",
      "Light and dark mode custom theme customization",
    ],
    image: "/images/project-age-calc.webp",
    github: "https://github.com/Sol-Ethio-Coder/CodeAlpha_AgeCalculator",
    live: "https://sol-age-calculator.netlify.app/",
    category: "frontend",
    featured: true,
    color: "from-green-400 to-emerald-600",
    year: "2026",
  },
  {
    id: "tea-cup",
    title: "3D CSS Animated Tea Cup Showcase",
    subtitle: "Creative Pure CSS Animation & Visual Masterpiece",
    description: "A pure-CSS web showcase illustrating pure CSS 3D physics, vapor particle animations, and exquisite lighting.",
    longDescription: "A pure passion project demonstrating absolute mastery over CSS3 keyframe animations, box-shadow depth layers, and custom HTML5 canvas effects. The elegant steaming tea cup reacts smoothly to viewport adjustments and provides an immersive visual treat.",
    technologies: ["HTML5", "CSS3 Animations", "Vanilla JavaScript", "Netlify"],
    features: [
      "Realistic vapor animations utilizing multi-staged keyframes",
      "Interactive lighting highlights and responsive fluid container",
      "High-performance rendering running at 60 FPS without external webgl libraries",
    ],
    image: "/images/project-tea-cup.webp",
    imagePosition: "center",
    github: "https://github.com/Sol-Ethio-Coder/tea-cup-project",
    live: "https://sol-tea-cup-project.netlify.app/",
    category: "frontend",
    featured: false,
    color: "from-cyan-500 to-blue-600",
    year: "2025",
  },
  {
    id: "stca-portal",
    title: "STCA Education Portal (Legacy Hub)",
    subtitle: "Official Platform for Sol Tutoring and Coding Academy",
    description: "The foundational educational platform providing high school coding curriculums and private STEM tutoring resources.",
    longDescription: "Built as the initial web ecosystem for STCA, this project connected Ethiopian students from Grades 5 through 12 with coding guides, problem-solving challenges, and tutoring enrollment information.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Grid", "Netlify"],
    features: [
      "Clear, accessible course catalog breakdown by academic level",
      "Integrated inquiry forms connecting parents directly with Solomon",
      "Optimized for high speed and mobile responsiveness on varied network bandwidths",
    ],
    image: "/images/project-stca-portal.webp",
    github: "https://github.com/Sol-Ethio-Coder/stca",
    live: "https://stca.netlify.app/",
    category: "frontend",
    featured: false,
    color: "from-purple-500 to-indigo-600",
    year: "2025",
  },
  {
    id: "stca-academy-react",
    title: "STCA Academy Next-Gen Portal",
    subtitle: "Modern React-Powered EdTech Web Application",
    description: "A completely refactored Next-Generation EdTech portal boasting interactive live courses, slick UI, and modern React tools.",
    longDescription: "Bringing STCA into the modern React ecosystem, this application introduced dynamic course filtering, immersive animated video previews, automated lecture syllabuses, and robust student onboarding flows.",
    technologies: ["React", "CSS3 Modules", "Responsive Design", "Vite", "Netlify"],
    features: [
      "Dynamic interactive syllabus previews with expandable lesson modules",
      "Lightning-fast client-side routing with React Router",
      "Interactive quiz sample blocks with immediate score feedback",
    ],
    image: "/images/project-stca-academy.webp",
    github: "https://github.com/Sol-Ethio-Coder/stca-academy",
    live: "https://stca-academy.netlify.app/",
    category: "fullstack",
    featured: false,
    color: "from-violet-500 to-purple-700",
    year: "2026",
  },
];

export const EXPERIENCE_TIMELINE: Experience[] = [
  {
    title: "Computing Teacher",
    company: "Trillium International School",
    period: "January 2025 - Present",
    location: "Addis Ababa, Ethiopia",
    type: "Teaching",
    description: "Teaching Cambridge IGCSE Computing and ICT for Years 9-13.",
    achievements: [
      "Develop lessons, assessments, practical activities, and programming projects",
      "Mentor students in programming, databases, web development, and computational thinking",
      "Support student academic progress and project-based learning",
    ],
    techStack: [],
  },
  {
    title: "Developer / Participant",
    company: "Cursor AI Hackathon Ethiopia",
    period: "July 2026",
    location: "Addis Ababa, Ethiopia",
    type: "Hackathon",
    description: "Collaboratively built Mercado, an AI-powered system, during the hackathon.",
    achievements: [
      "Contributed to product development, problem-solving, and rapid prototyping",
      "Applied AI-assisted development to turn an idea into a functional technology solution",
    ],
    techStack: [],
  },
  {
    title: "MERN Stack Developer Intern",
    company: "CodeAlpha",
    period: "May 2026 - June 2026",
    location: "Remote",
    type: "Internship",
    description: "Completed a practical MERN Stack development internship focused on building real-world web applications.",
    achievements: [
      "Applied MongoDB, Express.js, React.js, Node.js, JavaScript, REST APIs, and Git in project-based tasks",
      "Strengthened skills in full-stack development, responsive UI design, backend API development, and database integration",
    ],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Git"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Future Interns",
    period: "March 2026 - April 2026",
    location: "Remote",
    type: "Internship",
    description: "Worked on practical development projects in a remote, collaborative setting.",
    achievements: [
      "Strengthened skills in web development, programming, and project implementation",
      "Practiced collaborative remote development",
    ],
    techStack: [],
  },
  {
    title: "Web Developer Intern",
    company: "Codveda Technologies",
    period: "August 2025 - September 2025",
    location: "Remote",
    type: "Internship",
    description: "Gained practical software development experience through project-based tasks in a remote professional environment.",
    achievements: [
      "Applied programming, web development, debugging, and problem-solving skills",
    ],
    techStack: [],
  },
  {
    title: "ICT Teacher",
    company: "Montessorian School",
    period: "November 2024 - November 2025",
    location: "Addis Ababa, Ethiopia",
    type: "Teaching",
    description: "Taught ICT and computer fundamentals to students.",
    achievements: [
      "Developed practical lessons, exercises, and assessments",
      "Introduced students to programming, digital literacy, and problem-solving",
    ],
    techStack: [],
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    degree: "B.Sc. Computer Science",
    school: "Addis Ababa University",
    period: "October 2019 - October 2024",
    location: "Addis Ababa, Ethiopia",
    highlight: "",
    description:
      "Studied programming, databases, software engineering, web development, algorithms, and computer networks, and built practical problem-solving skills through academic projects.",
  },
];

export const CERTIFICATIONS_LIST = [
  { title: "Cursor AI Hackathon Ethiopia", issuer: "Cursor (Participant)", year: "2026", badge: "Participant" },
  { title: "Web Development Internship", issuer: "Codveda Technologies", year: "2025", badge: "Certificate" },
  { title: "Full Stack Development Internship", issuer: "Future Interns", year: "2026", badge: "Certificate" },
  { title: "MERN Stack Development Internship", issuer: "CodeAlpha", year: "2026", badge: "Certificate" },
  { title: "AI & Machine Learning Foundation", issuer: "Atingi", year: "2024", badge: "Certificate" },
  { title: "Responsive Web Development", issuer: "SoloLearn", year: "2022", badge: "Certificate" },
  { title: "Responsive UI Development", issuer: "FreeCodeCamp", year: "2023", badge: "Certificate" },
  { title: "Programming Fundamentals", issuer: "Ethio Coders Initiative", year: "2024", badge: "Certificate" },
  { title: "Data Science Fundamentals", issuer: "Ethio Coders Initiative", year: "2025", badge: "Certificate" },
  { title: "AI Fundamentals", issuer: "Ethio Coders Initiative", year: "2025", badge: "Certificate" },
];

export const AWARDS = [
  {
    title: "Star Teacher of the Month",
    org: "Trillium International School (TIS)",
    date: "December 2025",
    description: "Recognized for outstanding teaching performance, student support, commitment to academic excellence, and positive contribution to the school community.",
  },
  {
    title: "Cursor AI Hackathon Ethiopia",
    org: "Participant / Developer",
    date: "July 2026",
    description: "Built Mercado, an AI-based system, collaboratively during the hackathon.",
  },
  {
    title: "Robotics Innovators Challenge",
    org: "CJCR American Center · Participant / Developer",
    date: "",
    description: "Developed SHEBA, an autonomous robotics project focused on obstacle detection and avoidance.",
  },
];

export const LANGUAGES = [
  { name: "Amharic", level: "Native" },
  { name: "English", level: "Fluent" },
];

export const VOLUNTEERING = {
  title: "Basic Computer Skills Trainer",
  org: "Zewditu Orphanage Center",
  date: "March 2023 - May 2023",
  description: "Delivered basic computer skills training and supported students with mathematics and learning activities.",
};

export const SERVICES_LIST: Service[] = [
  {
    id: "srv-1",
    title: "Full Stack Web Application Development",
    iconName: "Layers",
    shortDesc: "End-to-end custom web products built with React, Node.js, Express, and MongoDB.",
    description: "I build fast, maintainable web applications tailored to your business requirements. From REST APIs and JWT-based authentication to responsive React frontends, I focus on clean architecture that is easy to extend.",
    deliverables: [
      "Custom UI/UX Frontend built with React 19 / Tailwind",
      "Highly secure Node.js & Express REST API Backend",
      "Optimized MongoDB Database schema and indexing",
      "Authentication, dashboards, and third-party API integration",
      "Ready-to-deploy cloud architecture (Netlify/Render/AWS)",
    ],
    popular: true,
  },
  {
    id: "srv-2",
    title: "EdTech & Learning Management Platforms",
    iconName: "GraduationCap",
    shortDesc: "Premium virtual academies, course workflows, student dashboards, and live tutoring hubs.",
    description: "Drawing on my experience building the STCA platforms and teaching computer science, I build clear, usable online learning sites. Allow students to explore courses, take interactive quizzes, book private sessions, and track their STEM learning seamlessly.",
    deliverables: [
      "Structured multi-grade course catalogs & video players",
      "Interactive student quiz blocks & automatic grading",
      "Integrated tutor scheduling calendars & booking flows",
      "Responsive layouts that work on slower mobile connections",
      "Parent and teacher progress monitoring reports",
    ],
    popular: false,
  },
  {
    id: "srv-3",
    title: "High-Conversion Corporate & Landing Sites",
    iconName: "Globe",
    shortDesc: "Custom interactive portfolio, SaaS landing, and corporate websites.",
    description: "Your website is often the first impression people get of you. I create modern, polished web experiences with Framer Motion animations, dark/light themes, pristine typography, and flawless SEO optimization to convert casual visitors into loyal high-value clients.",
    deliverables: [
      "Bespoke premium design with captivating animations",
      "Performance-focused build with image and font optimization",
      "Flawless responsive behavior on all mobile & desktop screens",
      "Direct integration with WhatsApp, Telegram, and CRM tools",
      "Advanced technical SEO metadata and OpenGraph setup",
    ],
    popular: false,
  },
  {
    id: "srv-4",
    title: "Technical Consulting & STEM Coaching",
    iconName: "Cpu",
    shortDesc: "Expert guidance on codebase modernization, cloud deployment, and private programming tutoring.",
    description: "Whether your tech startup needs guidance scaling an existing MERN application, or your development team requires structured mentoring, I offer practical, high-impact consulting. As an experienced computing science teacher, I also offer private 1-on-1 coding masterclasses.",
    deliverables: [
      "Comprehensive codebase audits & performance tuning",
      "CI/CD pipeline configuration and automated deployment setup",
      "Custom AI prompt engineering and LLM assistant integration",
      "1-on-1 personalized software engineering coaching",
      "Interactive technical handoff and developer documentation",
    ],
    popular: false,
  },
];
