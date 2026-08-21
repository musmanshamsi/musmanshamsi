import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pen, Mic, Trophy, Lightbulb,
  ChevronLeft, ChevronRight,
  Play, ExternalLink, Maximize2, X,
} from "lucide-react";

// ── Existing bento data ───────────────────────────────────────────────────────
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

// ── Gallery data ──────────────────────────────────────────────────────────────
// To add real images: set the `src` field to an import or asset path string.
const galleryItems = [
  {
    id: "g1",
    title: "Stage Presence",
    caption: "Stand-up comedy at university events — crowd reading, timing, and raw confidence under the lights.",
    theme: "amber",
    variant: "wide",
    src: "/images/standup.jpg",
  },
  {
    id: "g2",
    title: "Honoring Mentors",
    caption: "Presenting an award & title to a beloved professor at the university get-together party · 2024.",
    theme: "purple",
    variant: "narrow",
    src: "/images/gettogether.png",
  },
  {
    id: "g3",
    title: "Script Sessions",
    caption: "Writing creative scripts for multimedia productions and university drama.",
    theme: "teal",
    variant: "narrow",
    src: "",
  },
  {
    id: "g4",
    title: "Competition Day",
    caption: "Story writing competitions — shaping raw ideas under pressure and time.",
    theme: "crimson",
    variant: "wide",
    src: "",
  },
  {
    id: "g5",
    title: "The Speaker",
    caption: "Public speaking — connecting through words, presence, and authentic storytelling.",
    theme: "navy",
    variant: "narrow",
    src: "",
  },
] as const;

// ── Reels data ────────────────────────────────────────────────────────────────
// Freely mix Instagram and YouTube in any order — just add items here.
// `platform` drives the badge, glow color, and gradient theme automatically.
// No `gradient` field needed — it's auto-assigned from the pool below.
type Platform = "instagram" | "youtube" | "facebook";

const reelItems: {
  id: string;
  title: string;
  label: string;
  platform: Platform;
  url: string;
  category: string;
  desc?: string;
  badge?: string;      // optional override for the platform badge text
  openLabel?: string;  // optional override for the "Open ..." CTA text
}[] = [
  {
    id: "r1",
    title: "Stand-Up Highlights",
    label: "Comedy Set",
    platform: "instagram",
    url: "https://www.instagram.com/m.usmanshamsi/",
    category: "Comedy & Stand-Up",
  },
  {
    // Real video — Mecca Pact 2026 (Turkish Voiceover, 2nd Position in university)
    id: "r-mecca",
    title: "Mecca Pact 2026",
    label: "Turkish Voiceover · 2026",
    platform: "youtube",
    url: "https://youtube.com/shorts/5Ly4Bcb2-wA?si=4UDjTL5JTkUIXIIh",
    category: "Poetry & Voiceover",
    badge: "2nd Place",
    openLabel: "Watch Short",
    desc: "Helped Media and Science students complete their reel with Turkish voiceover narration, securing 2nd position in the university.",
  },
  {
    // Real video — landscape vlog, first solo trip to Islamabad 2025
    id: "r2",
    title: "Solo in Islamabad",
    label: "Travel Vlog · 2025",
    platform: "youtube",
    url: "https://youtu.be/m9Hm5ymSZKk?si=uCUNgEdTiuChruzX",
    category: "Travel & Vlogs",
    badge: "Vlog",
    openLabel: "Watch Vlog",
  },
  {
    // Real reel — Turkish Poetry Voiceover 2024
    id: "r3",
    title: "Turkish Poetry Voiceover",
    label: "Voice & Spoken Word · 2024",
    platform: "instagram",
    url: "https://www.instagram.com/reel/C6bq60yIdyc/?igsh=dHh5NG5vdzFsYzhv",
    category: "Poetry & Voiceover",
    badge: "Reel",
    openLabel: "Watch Reel",
  },
  {
    // Real video — T-Shirt Signing Day
    id: "r4",
    title: "T-Shirt Signing Day",
    label: "Bachelor's Farewell · 2026",
    platform: "youtube",
    url: "https://youtu.be/jIXPk98eZXY?si=4iL7NzUD15l3mg1y",
    category: "Farewell 2026",
    badge: "Memories",
    openLabel: "Watch Video",
  },
  {
    // Real video — Glass Sign Day
    id: "r5",
    title: "Glass Sign Day",
    label: "Bachelor's Farewell · 2026",
    platform: "youtube",
    url: "https://youtu.be/jIXPk98eZXY?si=p37Qna6yCfRnZtcX",
    category: "Farewell 2026",
    badge: "Memories",
    openLabel: "Watch Video",
  },
  {
    // Real video — Signing Off Last Day
    id: "r6",
    title: "Signing Off · Last Day",
    label: "Bachelor's Farewell · 2026",
    platform: "youtube",
    url: "https://youtu.be/Rkf0yY16UEo?si=L9lXu6jGe1GSX56b",
    category: "Farewell 2026",
    badge: "Memories",
    openLabel: "Watch Video",
  },
  {
    // Real video — PLF 2023 Q&A with Yasir Hussain & Tehzeeb Hafi
    id: "r-plf",
    title: "Q&A: Yasir Hussain & Tehzeeb Hafi",
    label: "Pakistan Literature Festival · 2023",
    platform: "facebook",
    url: "https://www.facebook.com/share/v/1FBBkAUFS6/",
    category: "PLF Festival 2023",
    badge: "PLF 2023",
    openLabel: "Watch on FB",
  },
  {
    // Real video — Foundation Semester Finale 2022
    id: "r7",
    title: "Foundation Semester Finale",
    label: "Foundation to BSCS · 2022",
    platform: "youtube",
    url: "https://youtu.be/Aj3_ye2GHvw?si=9RMFyugrKerFb6tA",
    category: "Foundation 2022",
    badge: "Milestone",
    openLabel: "Watch Video",
  },
  {
    id: "r8",
    title: "Novella Reading",
    label: "Spoken Word",
    platform: "instagram",
    url: "https://www.instagram.com/m.usmanshamsi/",
    category: "Poetry & Voiceover",
  },
];

// ── Shared animation ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const AllIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm10 0a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4zm-10 10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6zm10 0a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6z" />
  </svg>
);

const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YtIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "instagram") return <IgIcon />;
  if (platform === "youtube") return <YtIcon />;
  return <FbIcon />;
}

// ── Gallery sub-component ─────────────────────────────────────────────────────
function CreativeGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeModalItem, setActiveModalItem] = useState<typeof galleryItems[number] | null>(null);

  // IntersectionObserver for snapped active state
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".cre2-gallery-item");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.target.classList.toggle("is-snapped", e.isIntersecting)
        );
      },
      { root: container, rootMargin: "0px -49%", threshold: 0 }
    );

    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === "Escape") {
        setActiveModalItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIdx = galleryItems.findIndex((g) => g.id === activeModalItem.id);
        if (currentIdx !== -1 && currentIdx < galleryItems.length - 1) {
          setActiveModalItem(galleryItems[currentIdx + 1]);
        }
      } else if (e.key === "ArrowLeft") {
        const currentIdx = galleryItems.findIndex((g) => g.id === activeModalItem.id);
        if (currentIdx > 0) {
          setActiveModalItem(galleryItems[currentIdx - 1]);
        }
      }
    };
    if (activeModalItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem]);

  const scrollGallery = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 310 : -310,
      behavior: "smooth",
    });
  };

  return (
    <motion.div {...fadeUp(0.1)} className="cre2-section-block">
      {/* Header */}
      <div className="cre2-section-head">
        <div>
          <div className="cre2-section-kicker">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Creative Work
          </div>
          <h3 className="cre2-section-title">Captured Moments</h3>
          <p className="cre2-section-desc">Behind the stage, the page, and the mic.</p>
        </div>
        <div className="cre2-nav-arrows">
          <button
            className="cre2-nav-btn"
            onClick={() => scrollGallery("left")}
            aria-label="Scroll gallery left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="cre2-nav-btn"
            onClick={() => scrollGallery("right")}
            aria-label="Scroll gallery right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll container inside wrapper (wrapper provides the edge-fade) */}
      <div className="cre2-gallery-wrapper">
        <div
          className="cre2-gallery-scroll"
          ref={scrollRef}
          role="region"
          aria-label="Creative image gallery — scroll to browse"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              {...fadeUp(0.12 + i * 0.07)}
              className={`cre2-gallery-item cre2-gallery-item--${item.variant}`}
              data-theme={item.theme}
              onClick={() => setActiveModalItem(item)}
              tabIndex={0}
              role="button"
              aria-label={`View full size image: ${item.title}`}
            >
              {/* Thumbnail area */}
              <div className="cre2-gallery-thumb">
                {/* Full Size badge on hover */}
                <div className="cre2-gallery-zoom-badge">
                  <Maximize2 size={10} />
                  <span>Full Size</span>
                </div>

                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="cre2-gallery-img"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="cre2-gallery-placeholder" aria-hidden="true" />
                )}
                {/* Permanent bottom gradient for baseline readability */}
                <div className="cre2-gallery-base-grad" aria-hidden="true" />
                {/* clip-path overlay: slides in on hover / is-snapped */}
                <div className="cre2-gallery-overlay" aria-hidden="true">
                  <p className="cre2-gallery-caption">{item.caption}</p>
                </div>
              </div>
              {/* Label row — always visible */}
              <div className="cre2-gallery-label">
                <span className="cre2-gallery-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="cre2-gallery-name">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Size Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cre2-lightbox-backdrop"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="cre2-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cre2-lightbox-close"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close full size view"
              >
                <X size={20} />
              </button>

              <div className="cre2-lightbox-img-wrap" data-theme={activeModalItem.theme}>
                {activeModalItem.src ? (
                  <img
                    src={activeModalItem.src}
                    alt={activeModalItem.title}
                    className="cre2-lightbox-img"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="cre2-gallery-placeholder cre2-lightbox-placeholder-full" aria-hidden="true" />
                )}
              </div>

              <div className="cre2-lightbox-info">
                <h4 className="cre2-lightbox-title">{activeModalItem.title}</h4>
                <p className="cre2-lightbox-caption">{activeModalItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Reels sub-component ───────────────────────────────────────────────────────
const categories = [
  "All",
  "Farewell 2026",
  "PLF Festival 2023",
  "Foundation 2022",
  "Travel & Vlogs",
  "Poetry & Voiceover",
  "Comedy & Stand-Up",
] as const;

function CreativeReels() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activePlatform, setActivePlatform] = useState<Platform | "all">("all");

  const filteredReels = reelItems.filter((item) => {
    const matchesPlatform = activePlatform === "all" || item.platform === activePlatform;
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesPlatform && matchesCategory;
  });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".cre2-reel-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Array.from(items).indexOf(e.target as HTMLElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: container, rootMargin: "0px -49%", threshold: 0 }
    );

    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [activeCategory, activePlatform]);

  const handlePlatformToggle = (platform: Platform | "all") => {
    setActivePlatform(platform);
    setActiveIdx(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollReels = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 240 : -240,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIdx(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const goToReel = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>(".cre2-reel-card");
    items[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <motion.div {...fadeUp(0.15)} className="cre2-section-block">
      {/* Header */}
      <div className="cre2-section-head">
        <div>
          <div className="cre2-section-kicker">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
            Reels &amp; Videos
          </div>
          <h3 className="cre2-section-title">Short-Form Stories</h3>
          <p className="cre2-section-desc">Filter reels and videos by platform or browse all in one scroll.</p>
        </div>

        {/* Interactive Platform Filter Buttons */}
        <div className="cre2-reels-ctas" role="group" aria-label="Filter videos by platform">
          <button
            type="button"
            className={`cre2-platform-btn cre2-platform-btn--all ${
              activePlatform === "all" ? "is-active" : ""
            }`}
            onClick={() => handlePlatformToggle("all")}
            aria-pressed={activePlatform === "all"}
            aria-label="Show all videos"
          >
            <AllIcon />
            All
          </button>
          <button
            type="button"
            className={`cre2-platform-btn cre2-platform-btn--ig ${
              activePlatform === "instagram" ? "is-active" : activePlatform !== "all" ? "is-dimmed" : ""
            }`}
            onClick={() => handlePlatformToggle(activePlatform === "instagram" ? "all" : "instagram")}
            aria-pressed={activePlatform === "instagram"}
            aria-label="Filter to Instagram Reels"
          >
            <IgIcon />
            Instagram
          </button>
          <button
            type="button"
            className={`cre2-platform-btn cre2-platform-btn--yt ${
              activePlatform === "youtube" ? "is-active" : activePlatform !== "all" ? "is-dimmed" : ""
            }`}
            onClick={() => handlePlatformToggle(activePlatform === "youtube" ? "all" : "youtube")}
            aria-pressed={activePlatform === "youtube"}
            aria-label="Filter to YouTube Videos & Shorts"
          >
            <YtIcon />
            YouTube
          </button>
          <button
            type="button"
            className={`cre2-platform-btn cre2-platform-btn--fb ${
              activePlatform === "facebook" ? "is-active" : activePlatform !== "all" ? "is-dimmed" : ""
            }`}
            onClick={() => handlePlatformToggle(activePlatform === "facebook" ? "all" : "facebook")}
            aria-pressed={activePlatform === "facebook"}
            aria-label="Filter to Facebook Videos"
          >
            <FbIcon />
            Facebook
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="cre2-filter-bar" role="tablist" aria-label="Filter videos by category">
        {categories.map((cat) => {
          const count = reelItems.filter((r) => {
            const matchesPlatform = activePlatform === "all" || r.platform === activePlatform;
            const matchesCategory = cat === "All" || r.category === cat;
            return matchesPlatform && matchesCategory;
          }).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`cre2-filter-pill${isActive ? " is-active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              <span>{cat}</span>
              <span className="cre2-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll container */}
      <div className="cre2-gallery-wrapper">
        {filteredReels.length === 0 ? (
          <div className="cre2-reels-empty">
            <p>No {activePlatform !== "all" ? `${activePlatform}` : ""} videos found under "{activeCategory}".</p>
            <button
              type="button"
              className="cre2-filter-pill is-active"
              onClick={() => {
                setActivePlatform("all");
                setActiveCategory("All");
                setActiveIdx(0);
                scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
            >
              Show All Videos
            </button>
          </div>
        ) : (
          <div
            className="cre2-reels-scroll"
            ref={scrollRef}
            role="region"
            aria-label="Creative reels and videos — scroll to browse"
          >
            {filteredReels.map((reel, i) => (
              <motion.a
                key={reel.id}
                {...fadeUp(0.18 + i * 0.07)}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cre2-reel-card"
                data-platform={reel.platform}
                aria-label={`Watch "${reel.title}" on ${reel.platform === "instagram" ? "Instagram" : reel.platform === "youtube" ? "YouTube" : "Facebook"} — opens in new tab`}
              >
                {/* Platform badge */}
                <div className={`cre2-reel-badge cre2-reel-badge--${reel.platform}`}>
                  <PlatformIcon platform={reel.platform} />
                  <span>{reel.badge ?? (reel.platform === "instagram" ? "Reel" : reel.platform === "youtube" ? "Video" : "Facebook")}</span>
                </div>

                {/* Cinematic gradient background */}
                <div className="cre2-reel-bg" aria-hidden="true" />

                {/* Centered play button + pulse ring */}
                <div className="cre2-reel-play" aria-hidden="true">
                  <div className="cre2-reel-play-ring" />
                  <div className="cre2-reel-play-btn">
                    <Play size={22} fill="white" color="white" strokeWidth={0} />
                  </div>
                </div>

                {/* Info — anchored to bottom */}
                <div className="cre2-reel-info">
                  <span className="cre2-reel-label">{reel.label}</span>
                  <p className="cre2-reel-title">{reel.title}</p>
                  {reel.desc && <p className="cre2-reel-desc">{reel.desc}</p>}
                  <div className="cre2-reel-open">
                    <ExternalLink size={11} />
                    <span>{reel.openLabel ?? (reel.platform === "instagram" ? "Open Reel" : reel.platform === "youtube" ? "Watch Video" : "Watch on FB")}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation: Left Arrow + Scroll Progress Dots + Right Arrow */}
      {filteredReels.length > 0 && (
        <div className="cre2-reel-bottom-nav">
          <button
            type="button"
            className="cre2-reel-nav-btn"
            onClick={() => scrollReels("left")}
            aria-label="Previous videos"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="cre2-reel-dots" role="tablist" aria-label="Reel navigation">
            {filteredReels.map((reel, i) => (
              <button
                key={reel.id}
                className={`cre2-reel-dot${i === activeIdx ? " is-active" : ""}`}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to reel ${i + 1}: ${reel.title}`}
                onClick={() => goToReel(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="cre2-reel-nav-btn"
            onClick={() => scrollReels("right")}
            aria-label="Next videos"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
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
          <motion.article {...fadeUp(0.1)} className="cre2-feature-card">
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
                <div className="cre2-card-accent-line" style={{ background: card.accent }} />
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

        {/* ── GALLERY (Part 1) ── */}
        <CreativeGallery />

        {/* ── REELS (Part 2) ── */}
        <CreativeReels />

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