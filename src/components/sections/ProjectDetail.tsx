import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const stats = [
  { value: "85%+", label: "Predictive Filtering Accuracy" },
  { value: "<1s", label: "Opportunity Detection Speed" },
  { value: "7", label: "Technologies Integrated" },
  { value: "FYP", label: "Academic Classification" },
];

const features = [
  "Real-time market data monitoring",
  "Cross-exchange arbitrage detection",
  "Triangular arbitrage detection",
  "AI-based predictive filtering",
  "React.js web interface",
  "Exchange integration via CCXT",
  "SQLite & MySQL database support",
  "OpenAI API integration",
  "Sub-second opportunity detection",
];

const techStack = ["Python", "React.js", "TensorFlow", "CCXT", "OpenAI APIs", "SQLite", "MySQL"];

const additionalProjects = [
  {
    id: "portfolio-site",
    title: "Interactive Atlas Portfolio",
    subtitle: "React 19 & TypeScript Web Application",
    category: "Full-Stack Web",
    description:
      "Modern interactive portfolio built with React 19, TypeScript, and Framer Motion featuring an Atlas stage carousel, dynamic appointment scheduling, and automated email dispatch.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/musmanshamsi/musmanshamsi",
  },
  {
    id: "vision-pipeline",
    title: "AI Vision & Detection Pipeline",
    subtitle: "Computer Vision & Deep Learning System",
    category: "AI & Machine Learning",
    description:
      "Real-time computer vision pipeline leveraging OpenCV and TensorFlow for automated feature extraction, object tracking, and image classification.",
    techStack: ["Python", "OpenCV", "TensorFlow", "NumPy", "Deep Learning"],
    githubUrl: "https://github.com/musmanshamsi",
  },
  {
    id: "automation-crawler",
    title: "High-Throughput Data Crawler",
    subtitle: "Real-Time Telemetry & Alerting Engine",
    category: "Automation & Scripting",
    description:
      "Asynchronous Python web scraper and market monitoring system designed for high-frequency data extraction, filtering, and database persistence.",
    techStack: ["Python", "AsyncIO", "SQLite", "REST APIs", "BeautifulSoup"],
    githubUrl: "https://github.com/musmanshamsi",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ProjectDetail() {
  return (
    <section id="project-detail" className="proj2-page">
      <div className="proj2-shell">

        {/* ── HEADER ── */}
        <motion.div {...fadeUp(0)} className="proj2-header">
          <p className="proj2-kicker">02 / Featured Project · Final Year Project</p>
          <h2 className="proj2-title">ArbitrageBot</h2>
          <p className="proj2-intro">
            An AI-powered cryptocurrency arbitrage platform built to monitor real-time
            market data and identify cross-exchange and triangular arbitrage opportunities.
            Developed as an academic software engineering project at Sukkur IBA University.
          </p>
        </motion.div>

        {/* ── STAT STRIP ── */}
        <motion.div {...fadeUp(0.1)} className="proj2-stat-strip">
          {stats.map((s, i) => (
            <div key={s.label} className="proj2-stat">
              <span className="proj2-stat-value">{s.value}</span>
              <span className="proj2-stat-label">{s.label}</span>
              {i < stats.length - 1 && <div className="proj2-stat-divider" />}
            </div>
          ))}
        </motion.div>

        {/* ── CASE STUDY HERO CARD ── */}
        <motion.article {...fadeUp(0.15)} className="proj2-hero-card">
          <div className="proj2-hero-badge">Case Study</div>
          <h3>Smarter Crypto Trading Through Automation</h3>
          <p>
            ArbitrageBot is my Final Year Project developed to explore automation,
            artificial intelligence, and real-time financial market analysis. The system
            monitors cryptocurrency market data across exchanges and identifies potential
            arbitrage opportunities, including cross-exchange and triangular arbitrage.
            It combines Python-based backend logic, React.js interface design,
            TensorFlow-based predictive filtering, CCXT exchange integrations, OpenAI API
            support, and SQLite/MySQL database management.
          </p>
          <a
            href="https://github.com/musmanshamsi/ArbitrageBotFYP.git"
            target="_blank"
            rel="noreferrer"
            className="proj2-hero-cta"
          >
            View on GitHub →
          </a>
        </motion.article>

        {/* ── PROBLEM / SOLUTION GRID ── */}
        <motion.div {...fadeUp(0.2)} className="proj2-ps-grid">
          <article className="proj2-ps-card proj2-problem">
            <span className="proj2-ps-badge">The Problem</span>
            <h3>Fast-Moving, Hard-to-Track Opportunities</h3>
            <p>
              Cryptocurrency prices vary across exchanges, creating short-lived arbitrage
              windows. These opportunities are nearly impossible to detect manually because
              market prices change within fractions of a second.
            </p>
          </article>

          <article className="proj2-ps-card proj2-solution">
            <span className="proj2-ps-badge">The Solution</span>
            <h3>Automated Detection & Predictive Filtering</h3>
            <p>
              ArbitrageBot automates market monitoring, integrates exchange data feeds via
              CCXT, applies TensorFlow-based predictive filtering to reduce noise, and
              presents detected opportunities through a React.js interface — all without
              manual intervention.
            </p>
          </article>
        </motion.div>

        {/* ── CONTRIBUTION + TECH ── */}
        <motion.div {...fadeUp(0.25)} className="proj2-bottom-grid">

          {/* My Contribution */}
          <article className="proj2-contribution">
            <span className="proj2-section-label">My Contribution</span>
            <h3>Full-Stack Development & AI Integration</h3>
            <p>
              I worked across the full development lifecycle — system architecture, Python
              backend, AI/ML integration with TensorFlow and OpenAI APIs, exchange data
              handling through CCXT, React.js interface design, database schema, and
              end-to-end project presentation at iCOMET.
            </p>

            {/* Tech tags */}
            <div className="proj2-tech-tags">
              {techStack.map((t) => (
                <span key={t} className="proj2-tech-tag">{t}</span>
              ))}
            </div>
          </article>

          {/* Features checklist */}
          <article className="proj2-features">
            <span className="proj2-section-label">Key Features</span>
            <ul className="proj2-feature-list">
              {features.map((f) => (
                <li key={f} className="proj2-feature-item">
                  <span className="proj2-feature-dot" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </article>

        </motion.div>

        {/* ── OUTCOME STRIP ── */}
        <motion.div {...fadeUp(0.3)} className="proj2-outcome">
          <p className="proj2-outcome-label">Outcome</p>
          <p className="proj2-outcome-text">
            Achieved sub-second opportunity detection and predictive filtering accuracy
            above 85%, demonstrating the practical application of AI and automation in
            cryptocurrency market analysis as an academic software engineering project.
          </p>
        </motion.div>

        {/* ── TEAM & TIMELINE ── */}
        <motion.div {...fadeUp(0.35)} className="proj2-meta-strip">
          <div className="proj2-meta-item">
            <span className="proj2-meta-label">Team</span>
            <span className="proj2-meta-value">Muhammad Usman · Hummera Arshad · Muhammad Saad</span>
          </div>
          <div className="proj2-meta-item">
            <span className="proj2-meta-label">Supervisor</span>
            <span className="proj2-meta-value">Muhammad Atif Memon</span>
          </div>
          <div className="proj2-meta-item">
            <span className="proj2-meta-label">Co-Supervisor</span>
            <span className="proj2-meta-value">Muhammad Hussain Mughal</span>
          </div>
          <div className="proj2-meta-item">
            <span className="proj2-meta-label">Timeline</span>
            <span className="proj2-meta-value">Mar 2025 – May 2026</span>
          </div>
        </motion.div>

        {/* ── ADDITIONAL PROJECTS GRID ── */}
        <motion.div {...fadeUp(0.4)} className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800/80 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase font-mono">
                Explore More Work
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                Other Featured Projects
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Selected software engineering, AI pipelines, and web applications built across academic and personal exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-semibold">
                      {project.category}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                      title="View GitHub Repository"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs font-medium text-amber-400/80 font-mono">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/60 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-400 border border-neutral-800 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline pt-1"
                  >
                    Repository & Details &rarr;
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="detail-bottom-actions mt-12">
          <a
            href="https://github.com/musmanshamsi/ArbitrageBotFYP.git"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </a>
          <button
            onClick={() =>
              document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Back to Portfolio
          </button>
        </div>

      </div>
    </section>
  );
}