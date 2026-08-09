import { motion } from "framer-motion";
import { Pen, Mic, Trophy, Lightbulb } from "lucide-react";

const creativeCards = [
  {
    id: "novella",
    icon: Pen,
    label: "Authored Work",
    title: "Novella Writer",
    desc: "Authored an original novella that received recognition within the university community — demonstrating narrative structure, character development, and creative discipline.",
    accent: "#d6b26f",
    size: "large",
  },
  {
    id: "standup",
    icon: Mic,
    label: "Performance",
    title: "Stand-Up Comedy",
    desc: "Performed stand-up at university events — building confidence, timing, crowd-reading, and the art of making complex ideas land simply.",
    accent: "#a78bfa",
    size: "normal",
  },
  {
    id: "story",
    icon: Trophy,
    label: "Competition",
    title: "Story Writing",
    desc: "Participated in story writing competitions, sharpening idea development, concise communication, and narrative clarity under pressure.",
    accent: "#34d399",
    size: "normal",
  },
];

const why = [
  "Technical skill without communication is invisible.",
  "Storytelling drives product thinking and audience empathy.",
  "Creativity makes engineers more valuable in real teams.",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function CreativeDetail() {
  return (
    <section id="creative-detail" className="cre2-page">
      <div className="cre2-shell">

        {/* ── PAGE HEADER ── */}
        <motion.div {...fadeUp(0)} className="cre2-header">
          <p className="cre2-kicker">06 / Creative Edge · Beyond Code</p>
          <h2 className="cre2-title">Beyond Code</h2>
          <p className="cre2-intro">
            Creativity, communication, and storytelling are not extras —
            they define how ideas become products and engineers become leaders.
          </p>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="cre2-bento">

          {/* Large feature card */}
          <motion.article
            {...fadeUp(0.1)}
            className="cre2-feature-card"
          >
            <div className="cre2-quote-icon" aria-hidden="true">"</div>
            <blockquote className="cre2-quote">
              Ideas become stronger when they are communicated clearly.
              Technical excellence combined with storytelling creates engineers
              who build with purpose and present with confidence.
            </blockquote>
            <div className="cre2-quote-attr">
              Muhammad Usman · CS Student, Storyteller, Performer
            </div>
          </motion.article>

          {/* Activity cards */}
          {creativeCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.id}
                {...fadeUp(0.15 + i * 0.1)}
                className="cre2-card"
                style={{ "--card-accent": card.accent } as React.CSSProperties}
              >
                <div className="cre2-card-top">
                  <div
                    className="cre2-card-icon"
                    style={{
                      color: card.accent,
                      borderColor: `${card.accent}30`,
                      background: `${card.accent}10`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="cre2-card-label">{card.label}</span>
                </div>
                <h3 className="cre2-card-title">{card.title}</h3>
                <p className="cre2-card-desc">{card.desc}</p>
                <div
                  className="cre2-card-accent-line"
                  style={{ background: card.accent }}
                />
              </motion.article>
            );
          })}

          {/* Why it matters card */}
          <motion.article {...fadeUp(0.45)} className="cre2-why-card">
            <div className="cre2-why-head">
              <Lightbulb size={18} color="#d6b26f" />
              <span>Why It Matters</span>
            </div>
            <ul className="cre2-why-list">
              {why.map((w) => (
                <li key={w} className="cre2-why-item">
                  <span className="cre2-why-dot" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </motion.article>

        </div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className="detail-bottom-actions">
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