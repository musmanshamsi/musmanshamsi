export type Page = {
  id: string;
  number: string;
  nav: string;
  title: string;
  subtitle: string;
  label: string;
  description: string;
  chips: string[];
  cta?: string;
  href?: string;
  visualClass: string;
};

export const pages: Page[] = [
  {
    id: "overview",
    number: "01",
    nav: "Overview",
    title: "Muhammad Usman",
    subtitle: "Final-Year Computer Science Student | AI & Full-Stack Developer",
    label: "Candidate Profile",
    description:
      "I am a final-year Computer Science student at Sukkur IBA University with experience in AI, machine learning, and full-stack development. I build practical technology solutions focused on intelligent systems, automation, and real-world problem solving.",
    chips: ["Python", "React.js", "Machine Learning", "Full-Stack", "OpenAI APIs"],
    cta: "Open Overview",
    visualClass: "visual-overview",
  },
  {
    id: "project",
    number: "02",
    nav: "Project",
    title: "ArbitrageBot",
    subtitle: "Smarter Crypto Trading Through Automation",
    label: "Final Year Project",
    description:
      "An AI-powered cryptocurrency arbitrage system built to monitor market data and identify cross-exchange and triangular arbitrage opportunities.",
    chips: ["Python", "React.js", "TensorFlow", "CCXT", "OpenAI APIs", "SQLite/MySQL"],
    cta: "View GitHub",
    href: "https://github.com/musmanshamsi/ArbitrageBotFYP.git",
    visualClass: "visual-project",
  },
  {
    id: "stack",
    number: "03",
    nav: "Stack",
    title: "Technology Stack",
    subtitle: "AI systems, web apps, and practical software tools",
    label: "Technical Layer",
    description:
      "A practical development stack for building AI-powered applications, full-stack systems, interfaces, automation tools, and database-backed projects.",
    chips: ["Python", "JavaScript", "Java", "Machine Learning", "Deep Learning", "Node.js"],
    cta: "View Stack",
    visualClass: "visual-stack",
  },
  {
    id: "experience",
    number: "04",
    nav: "Experience",
    title: "Experience",
    subtitle: "Teaching, project presentation, and creative production",
    label: "Professional Activity",
    description:
      "Experience across language teaching, university project exhibition, and creative script writing — strengthening communication, teamwork, and presentation skills.",
    chips: ["Language Teacher", "Project Exhibition", "Script Writer", "Teamwork"],
    cta: "See Experience",
    visualClass: "visual-experience",
  },
  {
    id: "education",
    number: "05",
    nav: "Education",
    title: "Education",
    subtitle: "Computer Science foundation with technical growth",
    label: "Academic Journey",
    description:
      "Bachelor of Science in Computer Science from Sukkur IBA University, with academic background from Khairpur in Pre-Medical and Science.",
    chips: ["Sukkur IBA University", "BS Computer Science", "2022 — Current"],
    cta: "View Education",
    visualClass: "visual-education",
  },
  {
    id: "creative",
    number: "06",
    nav: "Creative",
    title: "Beyond Code",
    subtitle: "Creativity, communication, and audience understanding",
    label: "Creative Edge",
    description:
      "Novella writing, stand-up comedy, and story writing strengthen storytelling, confidence, audience understanding, and product communication.",
    chips: ["Novella Writer", "Stand-Up Comedy", "Story Writing", "Public Speaking"],
    cta: "Explore Creative Edge",
    visualClass: "visual-creative",
  },
  {
    id: "contact",
    number: "07",
    nav: "Contact",
    title: "Let’s Connect",
    subtitle: "Available for internships and junior opportunities",
    label: "Contact",
    description:
      "Based in Karachi, Pakistan. Open to internship and junior developer opportunities in AI, React.js, full-stack development, and software engineering.",
    chips: ["Karachi, Pakistan", "Email", "GitHub", "Open to Opportunities"],
    cta: "Send Email",
    href: "mailto:m.usman.shamsi.pak@gmail.com",
    visualClass: "visual-contact",
  },
];