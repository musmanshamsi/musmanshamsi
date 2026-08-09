import { motion } from "framer-motion";
import { Brain, Code2, Sparkles, Layers } from "lucide-react";

type OverviewDetailProps = {
  onViewProject?: () => void;
};

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    desc: "Building intelligent systems using TensorFlow, deep learning models, computer vision pipelines, and OpenAI API integrations.",
    index: "01",
    color: "#a78bfa",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Designing and shipping end-to-end web applications — Python backends, React.js interfaces, REST APIs, and database design.",
    index: "02",
    color: "#34d399",
  },
  {
    icon: Layers,
    title: "Automation & Systems",
    desc: "Creating robust automation workflows: real-time data pipelines, cross-exchange monitoring, and multi-service integrations.",
    index: "03",
    color: "#60a5fa",
  },
  {
    icon: Sparkles,
    title: "Creative Communication",
    desc: "Novella writing, stand-up comedy, and storytelling sharpen product communication, audience empathy, and presentation.",
    index: "04",
    color: "#d6b26f",
  },
];

const stats = [
  { value: "4+", label: "Years of Coding" },
  { value: "10+", label: "Projects Built" },
  { value: "3", label: "Core Domains" },
  { value: "BS", label: "CS Undergraduate" },
];

const skills = [
  "Python", "JavaScript", "Java", "React.js", "Node.js",
  "Machine Learning", "Deep Learning", "Computer Vision",
  "LLMs", "TensorFlow", "OpenAI APIs", "GitHub", "Git",
  "MySQL", "SQLite", "CCXT",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function OverviewDetail({ onViewProject }: OverviewDetailProps) {
  return (
    <section id="overview-detail" className="ov2-page">

      {/* ── HERO SPLIT ── */}
      <div className="ov2-hero">

        {/* LEFT: Identity block */}
        <div className="ov2-hero-left">

          <motion.p {...fadeUp(0)} className="ov2-kicker">
            01 / Overview · Candidate Profile
          </motion.p>

          <motion.h2 {...fadeUp(0.05)} className="ov2-name">
            Muhammad<br />Usman
          </motion.h2>

          <motion.p {...fadeUp(0.1)} className="ov2-role">
            Final-Year Computer Science Student<br />
            <span>AI &amp; Full-Stack Developer</span>
          </motion.p>

          <motion.blockquote {...fadeUp(0.15)} className="ov2-quote">
            "I combine intelligent systems with practical engineering to build
            software that solves real problems — fast, clean, and at scale."
          </motion.blockquote>

          {/* Availability badge */}
          <motion.div {...fadeUp(0.18)} className="ov2-badge">
            <span className="ov2-badge-dot" />
            Available for Internships &amp; Junior Roles
          </motion.div>

          {/* STATS BAR */}
          <motion.div {...fadeUp(0.22)} className="ov2-stats">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="ov2-stat"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22 + i * 0.07, duration: 0.5 }}
              >
                <span className="ov2-stat-value">{s.value}</span>
                <span className="ov2-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div {...fadeUp(0.3)} className="ov2-actions">
            <a
              href="#detail"
              className="ov2-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (onViewProject) onViewProject();
              }}
            >
              View Featured Project
            </a>
            <a href="mailto:m.usman.shamsi.pak@gmail.com" className="ov2-btn-secondary">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Photo */}
        <motion.div
          {...fadeUp(0.12)}
          className="ov2-hero-right"
        >
          <div className="ov2-photo-frame">
            <img
              src="/images/profile_image.png"
              alt="Muhammad Usman"
              className="ov2-photo"
            />
            {/* Floating meta chip */}
            <div className="ov2-photo-chip">
              <span className="ov2-photo-chip-dot" />
              Sukkur IBA University · Karachi, Pakistan
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── WHAT I DO ── */}
      <div className="ov2-services-block">
        <motion.div {...fadeUp(0)} className="ov2-services-header">
          <p className="ov2-section-label">What I Do</p>
          <p className="ov2-section-sub">
            A focused developer with expertise across AI systems, web engineering, and automation — grounded in creative thinking.
          </p>
        </motion.div>

        <div className="ov2-services-grid">
          {services.map((svc, i) => (
            <motion.article
              key={svc.index}
              className="ov2-service-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="ov2-service-top">
                <span className="ov2-service-num">{svc.index}</span>
                <svc.icon
                  className="ov2-service-icon"
                  style={{ color: svc.color }}
                />
              </div>
              <h3 className="ov2-service-title">{svc.title}</h3>
              <p className="ov2-service-desc">{svc.desc}</p>
              <div className="ov2-service-line" style={{ background: svc.color }} />
            </motion.article>
          ))}
        </div>
      </div>

      {/* ── SKILLS CLOUD ── */}
      <motion.div {...fadeUp(0.1)} className="ov2-skills-block">
        <p className="ov2-section-label">Technical Skills &amp; Technologies</p>
        <div className="ov2-skills-cloud">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="ov2-skill-tag"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.38 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── BOTTOM ACTIONS ── */}
      <motion.div {...fadeUp(0.2)} className="ov2-footer-actions">
        <a
          href="https://github.com/musmanshamsi"
          target="_blank"
          rel="noreferrer"
          className="ov2-btn-secondary"
        >
          GitHub Profile
        </a>
        <button
          className="ov2-btn-ghost"
          onClick={() =>
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Back to Atlas
        </button>
      </motion.div>

    </section>
  );
}