import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Globe,
  Database,
} from "lucide-react";

const stackGroups = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "#d6b26f",
    items: [
      { name: "Python", level: 90, note: "Primary Language" },
      { name: "JavaScript", level: 78, note: "Frontend & Backend" },
      { name: "Java", level: 65, note: "OOP & Algorithms" },
    ],
  },
  {
    title: "AI / Machine Learning",
    icon: Brain,
    color: "#a78bfa",
    items: [
      { name: "TensorFlow", level: 82, note: "Deep Learning" },
      { name: "Machine Learning", level: 85, note: "Supervised & Unsupervised" },
      { name: "Computer Vision", level: 74, note: "Image Classification" },
      { name: "OpenAI APIs", level: 88, note: "LLM Integration" },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    color: "#34d399",
    items: [
      { name: "React.js", level: 80, note: "SPA & Component Design" },
      { name: "Node.js", level: 68, note: "Backend & REST APIs" },
    ],
  },
  {
    title: "Tools & Databases",
    icon: Database,
    color: "#60a5fa",
    items: [
      { name: "Git & GitHub", level: 85, note: "Version Control" },
      { name: "MySQL", level: 76, note: "Relational Databases" },
      { name: "SQLite", level: 78, note: "Embedded Databases" },
      { name: "CCXT", level: 80, note: "Crypto Exchange APIs" },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function StackDetail() {
  return (
    <section id="stack-detail" className="stack2-page">
      <div className="stack2-shell">

        {/* ── PAGE HEADER ── */}
        <motion.div {...fadeUp(0)} className="stack2-header">
          <p className="stack2-kicker">03 / Technology Stack · Technical Layer</p>
          <h2 className="stack2-title">Stack Map</h2>
          <p className="stack2-intro">
            A practical development stack for building AI-powered applications,
            full-stack systems, automation workflows, and database-backed projects.
          </p>
        </motion.div>

        {/* ── SKILL GROUPS GRID ── */}
        <div className="stack2-grid">
          {stackGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                {...fadeUp(gi * 0.1)}
                className="stack2-group"
              >
                {/* Group header */}
                <div className="stack2-group-head">
                  <div
                    className="stack2-group-icon"
                    style={{ color: group.color, borderColor: `${group.color}33` }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 className="stack2-group-title">{group.title}</h3>
                </div>

                {/* Skill bars */}
                <div className="stack2-bars">
                  {group.items.map((item, ii) => (
                    <div key={item.name} className="stack2-bar-row">
                      <div className="stack2-bar-meta">
                        <span className="stack2-bar-name">{item.name}</span>
                        <div className="stack2-bar-right">
                          <span className="stack2-bar-note">{item.note}</span>
                          <span className="stack2-bar-pct" style={{ color: group.color }}>
                            {item.level}%
                          </span>
                        </div>
                      </div>
                      <div className="stack2-bar-track">
                        <motion.div
                          className="stack2-bar-fill"
                          style={{ background: group.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.1,
                            delay: gi * 0.08 + ii * 0.1,
                            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── QUICK LEGEND ── */}
        <motion.div {...fadeUp(0.4)} className="stack2-legend">
          <span className="stack2-legend-item">
            <span className="stack2-legend-dot" style={{ background: "#d6b26f" }} /> Languages
          </span>
          <span className="stack2-legend-item">
            <span className="stack2-legend-dot" style={{ background: "#a78bfa" }} /> AI / ML
          </span>
          <span className="stack2-legend-item">
            <span className="stack2-legend-dot" style={{ background: "#34d399" }} /> Web
          </span>
          <span className="stack2-legend-item">
            <span className="stack2-legend-dot" style={{ background: "#60a5fa" }} /> Tools
          </span>
        </motion.div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="detail-bottom-actions">
          <a
            href="https://github.com/musmanshamsi"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Profile
          </a>
          <button
            onClick={() =>
              document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Back to Atlas
          </button>
        </div>

      </div>
    </section>
  );
}