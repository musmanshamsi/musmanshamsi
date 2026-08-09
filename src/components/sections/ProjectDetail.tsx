import { motion } from "framer-motion";
import { ExternalLink, Globe, LayoutDashboard, BarChart3, Star, Layers, CheckCircle2, Utensils } from "lucide-react";

const osteriaStats = [
  { value: "100%", label: "HCI Usability Compliance" },
  { value: "3-Tier", label: "Frontend → Backend → Database" },
  { value: "Real-Time", label: "Kitchen Status Tracking" },
  { value: "Class Project", label: "Academic Classification" },
];

const osteriaFeatures = [
  "Seamless customer menu browsing, cart & order placement",
  "Real-time kitchen order management with live status tracking",
  "Business Intelligence analytics (revenue, orders, category sales)",
  "Complete CRUD menu management with item availability control",
  "5-star customer rating & feedback review system",
  "Three-tier architecture with clean separation of concerns",
  "Proper error handling & responsive mobile-first UI",
  "Warm authentic Italian bistro design aesthetic",
];

const osteriaTech = ["React.js", "Node.js", "Express", "Supabase", "Tailwind CSS", "Recharts", "HCI Principles"];

const additionalProjects = [
  {
    id: "arbitrage-bot",
    title: "ArbitrageBot",
    subtitle: "AI Cryptocurrency Arbitrage Trading System",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
    description:
      "An AI-powered cryptocurrency arbitrage system built to monitor market data, identify cross-exchange opportunities, and execute sub-second predictive filtering.",
    techStack: ["Python", "React.js", "TensorFlow", "CCXT", "OpenAI APIs", "MySQL"],
    githubUrl: "https://github.com/musmanshamsi/ArbitrageBotFYP.git",
  },
  {
    id: "portfolio-site",
    title: "Interactive Atlas Portfolio",
    subtitle: "React 19 & TypeScript Web Application",
    category: "Full-Stack Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description:
      "Modern interactive portfolio built with React 19, TypeScript, and Framer Motion featuring an Atlas stage carousel, dynamic appointment scheduling, and automated email dispatch.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://musmanshamsi.vercel.app/",
    githubUrl: "https://github.com/musmanshamsi/musmanshamsi",
  },
  {
    id: "vision-pipeline",
    title: "AI Vision & Detection Pipeline",
    subtitle: "Computer Vision & Deep Learning System",
    category: "AI & Machine Learning",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    description:
      "Real-time computer vision pipeline leveraging OpenCV and TensorFlow for automated feature extraction, object tracking, and image classification.",
    techStack: ["Python", "OpenCV", "TensorFlow", "NumPy", "Deep Learning"],
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
          <p className="proj2-kicker">02 / Featured Project · Class Project</p>
          <h2 className="proj2-title">Osteria Bella Restaurant</h2>
          <p className="proj2-intro">
            A premium, full-stack food ordering and kitchen management system designed with a warm, authentic Italian bistro aesthetic adhering to strict HCI (Human-Computer Interaction) standards.
          </p>
        </motion.div>

        {/* ── STAT STRIP ── */}
        <motion.div {...fadeUp(0.1)} className="proj2-stat-strip">
          {osteriaStats.map((s, i) => (
            <div key={s.label} className="proj2-stat">
              <span className="proj2-stat-value">{s.value}</span>
              <span className="proj2-stat-label">{s.label}</span>
              {i < osteriaStats.length - 1 && <div className="proj2-stat-divider" />}
            </div>
          ))}
        </motion.div>

        {/* ── CASE STUDY HERO CARD ── */}
        <motion.article {...fadeUp(0.15)} className="proj2-hero-card">
          <div className="proj2-hero-badge">Featured Web App</div>
          <h3>Full-Stack Ordering & Kitchen Management System</h3>
          <p>
            Osteria Bella is a premium, full-stack food ordering and kitchen management system designed with a warm, authentic Italian bistro aesthetic. The application adheres to strict HCI standards and provides seamless customer menu browsing, real-time kitchen order status tracking, live Business Intelligence analytics, complete menu CRUD management, and a customer review rating system across a clean three-tier architecture.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://osteriarestaurant.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="proj2-hero-cta inline-flex items-center gap-2"
            >
              <Globe size={16} /> Visit Live Web App →
            </a>
            <a
              href="https://github.com/musmanshamsi/osteriarestaurant"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-neutral-800 text-neutral-200 font-bold text-xs hover:bg-neutral-700 hover:text-white transition-all inline-flex items-center gap-2"
            >
              <ExternalLink size={14} /> GitHub Repository
            </a>
          </div>
        </motion.article>

        {/* ── PROBLEM / SOLUTION GRID ── */}
        <motion.div {...fadeUp(0.2)} className="proj2-ps-grid">
          <article className="proj2-ps-card proj2-problem">
            <span className="proj2-ps-badge">The Problem</span>
            <h3>Fragmented Restaurant & Kitchen Operations</h3>
            <p>
              Traditional restaurant ordering workflows suffer from manual order errors, lack of real-time kitchen status tracking, and absent business intelligence visibility for management.
            </p>
          </article>

          <article className="proj2-ps-card proj2-solution">
            <span className="proj2-ps-badge">The Solution</span>
            <h3>Three-Tier HCI Architecture & Real-Time Tracking</h3>
            <p>
              Osteria Bella provides an end-to-end digital platform: intuitive customer ordering, live kitchen order management (Pending → Preparing → Ready → Delivered), BI sales analytics, menu availability controls, and customer feedback.
            </p>
          </article>
        </motion.div>

        {/* ── CONTRIBUTION + TECH ── */}
        <motion.div {...fadeUp(0.25)} className="proj2-bottom-grid">

          {/* My Contribution */}
          <article className="proj2-contribution">
            <span className="proj2-section-label">My Contribution</span>
            <h3>Full-Stack System Architecture & HCI Usability</h3>
            <p>
              I designed and built the complete three-tier architecture — React frontend with Tailwind CSS and warm bistro styling, backend REST API routes, relational database integration, real-time kitchen management board, Recharts analytics widgets, and customer feedback review system.
            </p>

            {/* Tech tags */}
            <div className="proj2-tech-tags">
              {osteriaTech.map((t) => (
                <span key={t} className="proj2-tech-tag">{t}</span>
              ))}
            </div>
          </article>

          {/* Features checklist */}
          <article className="proj2-features">
            <span className="proj2-section-label">Key System Features</span>
            <ul className="proj2-feature-list">
              {osteriaFeatures.map((f) => (
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
                className="group relative rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Image Header */}
                {project.image && (
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-neutral-950 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md transition-colors flex items-center gap-1 shadow-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" /> Live Web App ↗
                      </a>
                    )}
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
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

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-medium text-amber-400/80 font-mono">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/60 space-y-3 mt-auto">
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
                          Visit Live Web App &rarr;
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