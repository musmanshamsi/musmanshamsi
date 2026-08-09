import { motion } from "framer-motion";

const journey = [
  {
    num: "01",
    title: "Language Teacher",
    place: "Self-employed",
    date: "Feb 2024 – Present",
    desc: "Strengthened communication, active listening, and interpersonal skills by working directly with language learners across diverse backgrounds.",
    tags: ["Teaching", "Communication"],
  },
  {
    num: "02",
    title: "Script Writer Volunteer",
    place: "Photography Club · Sukkur IBA University",
    date: "Mar 2025 – May 2026",
    desc: "Created scripts and narrative content for promotional videos, event documentation, and storytelling campaigns for the university society.",
    tags: ["Scriptwriting", "Storytelling", "Creative"],
  },
  {
    num: "03",
    title: "Project Exhibition Presenter",
    place: "iCOMET · Sukkur IBA University",
    date: "May 2026",
    desc: "Presented ArbitrageBot to evaluators and visitors, explaining technical objectives, system architecture, and real-world outcomes with clarity.",
    tags: ["Public Speaking", "Demo", "FYP"],
  },
  {
    num: "04",
    title: "Full-Stack AI Developer",
    place: "ArbitrageBot · Final Year Project",
    date: "Mar 2025 – May 2026",
    desc: "Led full-stack development of an AI-powered crypto arbitrage platform — backend, ML pipeline, exchange integrations, and React.js interface.",
    tags: ["Python", "React.js", "TensorFlow"],
  },
];

const highlights = [
  {
    type: "hero",
    label: "Final Year Project",
    title: "Built an AI\nTrading System",
    sub: "ArbitrageBot — cross-exchange & triangular arbitrage detection with TensorFlow and OpenAI APIs.",
    bg: "/images/project.png",
  },
  {
    type: "card",
    label: "Project Exhibition",
    title: "iCOMET Presenter",
    sub: "Demonstrated ArbitrageBot to evaluators at Sukkur IBA University's annual project showcase.",
    bg: "/images/experience.png",
  },
  {
    type: "card",
    label: "Creative Production",
    title: "Script Writer",
    sub: "Produced creative scripts for the Photography Club's video campaigns and storytelling initiatives.",
    bg: "/images/creative.png",
  },
  {
    type: "card",
    label: "Education & Teaching",
    title: "Language Teacher",
    sub: "Taught language skills while developing empathy, communication, and audience-aware presentation.",
    bg: "/images/education.png",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ExperienceDetail() {
  return (
    <section id="experience-detail" className="exp2-page">

      {/* ── PAGE HEADER ── */}
      <motion.div {...fadeUp(0)} className="exp2-header">
        <p className="exp2-kicker">04 / Experience · Professional Activity</p>
        <h2 className="exp2-title">Experience</h2>
        <p className="exp2-intro">
          Teaching, project exhibition, creative production, and full-stack engineering —
          a diverse record of communication, leadership, and practical delivery.
        </p>
      </motion.div>

      {/* ── SPLIT BODY ── */}
      <div className="exp2-body">

        {/* LEFT — MY JOURNEY (numbered process list) */}
        <aside className="exp2-journey">
          <p className="exp2-col-label">My Journey</p>

          <div className="exp2-journey-list">
            {journey.map((item, i) => (
              <motion.article
                key={item.num}
                {...fadeUp(i * 0.1)}
                className="exp2-journey-item"
              >
                <div className="exp2-journey-num">{item.num}</div>
                <div className="exp2-journey-content">
                  <div className="exp2-journey-meta">
                    <span className="exp2-journey-date">{item.date}</span>
                    <span className="exp2-journey-place">{item.place}</span>
                  </div>
                  <h3 className="exp2-journey-role">{item.title}</h3>
                  <p className="exp2-journey-desc">{item.desc}</p>
                  <div className="exp2-journey-tags">
                    {item.tags.map((t) => (
                      <span key={t} className="exp2-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="exp2-journey-line" />
              </motion.article>
            ))}
          </div>
        </aside>

        {/* RIGHT — FEATURED HIGHLIGHTS (card grid) */}
        <div className="exp2-highlights">
          <p className="exp2-col-label">Featured Highlights</p>

          <div className="exp2-highlights-grid">

            {/* Large hero card */}
            <motion.article
              {...fadeUp(0.1)}
              className="exp2-highlight-hero"
              style={{ backgroundImage: `url(${highlights[0].bg})` }}
            >
              <div className="exp2-highlight-overlay" />
              <div className="exp2-highlight-inner">
                <span className="exp2-highlight-label">{highlights[0].label}</span>
                <h3 className="exp2-highlight-title">
                  {highlights[0].title.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </h3>
                <p className="exp2-highlight-sub">{highlights[0].sub}</p>
              </div>
            </motion.article>

            {/* Small cards column */}
            <div className="exp2-highlight-cards">
              {highlights.slice(1).map((h, i) => (
                <motion.article
                  key={h.title}
                  {...fadeUp(0.15 + i * 0.08)}
                  className="exp2-highlight-card"
                  style={{ backgroundImage: `url(${h.bg})` }}
                >
                  <div className="exp2-highlight-overlay" />
                  <div className="exp2-highlight-inner">
                    <span className="exp2-highlight-label">{h.label}</span>
                    <h3 className="exp2-highlight-card-title">{h.title}</h3>
                    <p className="exp2-highlight-card-sub">{h.sub}</p>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── FOOTER ACTIONS ── */}
      <div className="exp2-footer">
        <button
          className="ov2-btn-secondary"
          onClick={() =>
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Back to Atlas
        </button>
      </div>

    </section>
  );
}