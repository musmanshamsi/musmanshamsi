import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";

const fypStats = [
  { value: "FYP", label: "Final Year Project" },
  { value: "3+", label: "Exchange Integrations" },
  { value: "85%+", label: "Prediction Accuracy" },
  { value: "iCOMET", label: "Presented 2026" },
];

const fypFeatures = [
  "Cross-exchange & triangular arbitrage opportunity detection",
  "TensorFlow ML pipeline for price prediction & signal filtering",
  "OpenAI API integration for market sentiment analysis",
  "CCXT connectors for real-time multi-exchange data feeds",
  "React.js dashboard with live opportunity tracking",
  "SQLite database for historical trade logging & analytics",
  "Sub-second detection latency with async Python backend",
  "Presented at iCOMET 2026 · Sukkur IBA University",
];

const fypTech = ["Python", "React.js", "TensorFlow", "OpenAI API", "CCXT", "SQLite", "Node.js", "REST APIs"];

type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  image?: string;
};

const additionalProjects: ProjectItem[] = [
  {
    id: "osteria-restaurant",
    title: "Osteria Bella Restaurant",
    subtitle: "Full-Stack Food Ordering & Kitchen System",
    category: "Full-Stack Web & HCI",
    description:
      "A premium food ordering and kitchen management system built with a warm Italian bistro aesthetic adhering to strict HCI standards. Features live kitchen status tracking, BI analytics, menu CRUD, and a customer review rating system.",
    techStack: ["React", "Node.js", "Express", "Supabase", "Tailwind CSS", "Recharts", "HCI"],
    liveUrl: "https://osteriarestaurant.vercel.app/",
    githubUrl: "https://github.com/musmanshamsi/osteriarestaurant",
  },
  {
    id: "portfolio-site",
    title: "Interactive Atlas Portfolio",
    subtitle: "React 19 & TypeScript Web Application",
    category: "Full-Stack Web",
    description:
      "Modern interactive portfolio built with React 19, TypeScript, and Framer Motion featuring an Atlas stage carousel, dynamic appointment scheduling, and automated email dispatch.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://musmanshamsi.vercel.app/",
    githubUrl: "https://github.com/musmanshamsi/musmanshamsi",
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
            An AI-powered cryptocurrency arbitrage detection and trading system built as a Final Year Project. Combines a TensorFlow ML pipeline, OpenAI market sentiment, multi-exchange CCXT connectors, and a live React.js dashboard — presented at iCOMET 2026.
          </p>
        </motion.div>

        {/* ── STAT STRIP ── */}
        <motion.div {...fadeUp(0.1)} className="proj2-stat-strip">
          {fypStats.map((s, i) => (
            <div key={s.label} className="proj2-stat">
              <span className="proj2-stat-value">{s.value}</span>
              <span className="proj2-stat-label">{s.label}</span>
              {i < fypStats.length - 1 && <div className="proj2-stat-divider" />}
            </div>
          ))}
        </motion.div>

        {/* ── CASE STUDY HERO CARD ── */}
        <motion.article {...fadeUp(0.15)} className="proj2-hero-card">
          <div className="proj2-hero-badge">Final Year Project · iCOMET 2026</div>
          <h3>AI-Powered Cryptocurrency Arbitrage Detection System</h3>
          <p>
            ArbitrageBot is an intelligent trading system that detects real-time cross-exchange and triangular arbitrage opportunities across cryptocurrency markets. Built using a TensorFlow ML pipeline for predictive filtering, OpenAI API for sentiment analysis, and CCXT for live multi-exchange data feeds — all visualized through a React.js dashboard with sub-second detection latency.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://github.com/musmanshamsi/ArbitrageBotFYP"
              target="_blank"
              rel="noopener noreferrer"
              className="proj2-hero-cta inline-flex items-center gap-2"
            >
              <Globe size={16} /> View on GitHub →
            </a>
          </div>
        </motion.article>

        {/* ── PROBLEM / SOLUTION GRID ── */}
        <motion.div {...fadeUp(0.2)} className="proj2-ps-grid">
          <article className="proj2-ps-card proj2-problem">
            <span className="proj2-ps-badge">The Problem</span>
            <h3>Missed Arbitrage Windows & Slow Manual Monitoring</h3>
            <p>
              Cryptocurrency arbitrage opportunities last milliseconds across exchanges. Manual monitoring is impossible, and existing tools lack AI-driven prediction to filter noise from genuine signals.
            </p>
          </article>

          <article className="proj2-ps-card proj2-solution">
            <span className="proj2-ps-badge">The Solution</span>
            <h3>Automated AI Pipeline with Real-Time Detection</h3>
            <p>
              ArbitrageBot automates the full cycle: live price ingestion from multiple exchanges via CCXT, TensorFlow ML filtering for signal confidence, OpenAI sentiment analysis, and instant dashboard alerts — all with sub-second latency.
            </p>
          </article>
        </motion.div>

        {/* ── CONTRIBUTION + TECH ── */}
        <motion.div {...fadeUp(0.25)} className="proj2-bottom-grid">

          {/* My Contribution */}
          <article className="proj2-contribution">
            <span className="proj2-section-label">My Contribution</span>
            <h3>Full-Stack AI Architecture & ML Pipeline</h3>
            <p>
              I led the complete system design and development — Python async backend, TensorFlow model training, CCXT exchange integrations, OpenAI API calls, SQLite data persistence, REST API layer, and the React.js live opportunity dashboard.
            </p>

            {/* Tech tags */}
            <div className="proj2-tech-tags">
              {fypTech.map((t) => (
                <span key={t} className="proj2-tech-tag">{t}</span>
              ))}
            </div>
          </article>

          {/* Features checklist */}
          <article className="proj2-features">
            <span className="proj2-section-label">Key System Features</span>
            <ul className="proj2-feature-list">
              {fypFeatures.map((f) => (
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
            Achieved sub-second opportunity detection and predictive filtering accuracy above 85%, demonstrating the practical application of AI and automation in cryptocurrency market analysis. Successfully presented at iCOMET 2026 at Sukkur IBA University.
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

        {/* ── OTHER FEATURED PROJECTS GRID ── */}
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

                  <div className="flex items-center gap-3 pt-1">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline"
                      >
                        Live Web App &rarr;
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium hover:text-white transition-colors"
                    >
                      Repository &rarr;
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="detail-bottom-actions mt-12">
          <a
            href="https://github.com/musmanshamsi/ArbitrageBotFYP"
            target="_blank"
            rel="noopener noreferrer"
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