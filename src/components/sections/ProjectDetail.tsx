import { motion } from "framer-motion";

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

        {/* ── BOTTOM ACTIONS ── */}
        <div className="detail-bottom-actions">
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