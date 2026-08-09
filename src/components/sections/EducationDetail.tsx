import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    degree: "Bachelor of Science in Computer Science",
    institution: "Sukkur IBA University",
    location: "Sukkur, Pakistan",
    period: "2022 – Present",
    status: "In Progress",
    highlight: true,
    details:
      "Focused on intelligent systems, software engineering, data structures, algorithms, and practical full-stack application development.",
  },
  {
    icon: BookOpen,
    degree: "Intermediate — Pre-Medical",
    institution: "Govt. Superior Science College, Khairpur",
    location: "Khairpur, Pakistan",
    period: "2019 – 2021",
    status: "Completed",
    highlight: false,
    details:
      "Built a strong science foundation before transitioning into computer science and technology.",
  },
  {
    icon: Award,
    degree: "Matriculation — Science",
    institution: "Sindh Children's Academy, Khairpur",
    location: "Khairpur, Pakistan",
    period: "2017 – 2019",
    status: "Completed",
    highlight: false,
    details: "Completed secondary-level science education with solid academic grounding.",
  },
];

const coursework = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Database Systems",
  "Software Engineering",
  "Computer Networks",
  "Operating Systems",
  "Artificial Intelligence",
  "Web Technologies",
  "Object-Oriented Programming",
  "Computer Vision",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function EducationDetail() {
  return (
    <section id="education-detail" className="edu2-page">
      <div className="edu2-shell">

        {/* ── PAGE HEADER ── */}
        <motion.div {...fadeUp(0)} className="edu2-header">
          <p className="edu2-kicker">05 / Education · Academic Journey</p>
          <h2 className="edu2-title">Education</h2>
          <p className="edu2-intro">
            A Computer Science academic journey grounded in science and growing
            expertise in intelligent systems and software engineering.
          </p>
        </motion.div>

        {/* ── VERTICAL TIMELINE ── */}
        <div className="edu2-timeline">
          {timeline.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.degree}
                {...fadeUp(i * 0.12)}
                className={`edu2-timeline-item ${item.highlight ? "edu2-highlight" : ""}`}
              >
                {/* Left: connector */}
                <div className="edu2-connector">
                  <div className={`edu2-dot ${item.highlight ? "edu2-dot-active" : ""}`}>
                    <Icon size={14} />
                  </div>
                  {i < timeline.length - 1 && <div className="edu2-line" />}
                </div>

                {/* Right: content */}
                <div className="edu2-content">
                  <div className="edu2-meta">
                    <span className="edu2-period">{item.period}</span>
                    <span className={`edu2-status ${item.highlight ? "edu2-status-active" : ""}`}>
                      {item.highlight && <span className="edu2-status-dot" />}
                      {item.status}
                    </span>
                  </div>
                  <h3 className="edu2-degree">{item.degree}</h3>
                  <p className="edu2-institution">
                    {item.institution}
                    <span className="edu2-location"> · {item.location}</span>
                  </p>
                  <p className="edu2-details">{item.details}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── RELEVANT COURSEWORK ── */}
        <motion.div {...fadeUp(0.36)} className="edu2-coursework">
          <p className="edu2-section-label">Relevant Coursework</p>
          <div className="edu2-course-grid">
            {coursework.map((course, i) => (
              <motion.span
                key={course}
                className="edu2-course-tag"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36 + i * 0.04, duration: 0.4 }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>

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