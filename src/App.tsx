import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { pages } from "./data/portfolioPages";

import AtlasHeader from "./components/atlas/AtlasHeader";
import AtlasStage from "./components/atlas/AtlasStage";
import AtlasFooter from "./components/atlas/AtlasFooter";
import MobileNav from "./components/atlas/MobileNav";

import OverviewDetail from "./components/sections/OverviewDetail";
import ProjectDetail from "./components/sections/ProjectDetail";
import StackDetail from "./components/sections/StackDetail";
import ExperienceDetail from "./components/sections/ExperienceDetail";
import EducationDetail from "./components/sections/EducationDetail";
import CreativeDetail from "./components/sections/CreativeDetail";
import ContactDetail from "./components/sections/ContactDetail";

import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import SecurityGuard from "./components/common/SecurityGuard";

function getInitialPageIndex(): number {
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  if (hash) {
    const foundIndex = pages.findIndex((p) => p.id.toLowerCase() === hash);
    if (foundIndex !== -1) return foundIndex;
  }
  return 0;
}

function MainAppContent() {
  const [activeIndex, setActiveIndex] = useState(getInitialPageIndex);
  const detailRef = useRef<HTMLElement>(null);

  // Synchronize URL hash when activeIndex changes
  useEffect(() => {
    const targetHash = pages[activeIndex]?.id;
    if (targetHash) {
      const currentHash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (currentHash !== targetHash.toLowerCase()) {
        window.history.replaceState(null, "", `#${targetHash}`);
      }
    }
  }, [activeIndex]);

  // Listen for browser back/forward navigation and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      const foundIndex = pages.findIndex((p) => p.id.toLowerCase() === hash);
      if (foundIndex !== -1) {
        setActiveIndex(foundIndex);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const reduceMotion = useReducedMotion();
  const activePage = pages[activeIndex];

  const previewPages = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const nextIndex = (activeIndex + i + 1) % pages.length;
      return {
        page: pages[nextIndex],
        index: nextIndex,
      };
    });
  }, [activeIndex]);

  const selectSection = (index: number) => {
    setActiveIndex(index);
  };

  const scrollToDetail = (index: number) => {
    setActiveIndex(index);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % pages.length);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + pages.length) % pages.length);
  };



  const renderDetailContent = () => {
    if (activePage.id === "overview") return <OverviewDetail onViewProject={() => scrollToDetail(1)} />;
    if (activePage.id === "project") return <ProjectDetail />;
    if (activePage.id === "stack") return <StackDetail />;
    if (activePage.id === "experience") return <ExperienceDetail />;
    if (activePage.id === "education") return <EducationDetail />;
    if (activePage.id === "creative") return <CreativeDetail />;
    if (activePage.id === "contact") return <ContactDetail />;
    return null;
  };

  return (
    <LayoutGroup>
      <main className="site-shell">
        {/* ── FIXED CINEMATIC BACKGROUND ── */}
        <div className="fixed-background">
          <AnimatePresence>
            <motion.div
              key={activePage.id}
              className={`page-background ${activePage.visualClass}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            />
          </AnimatePresence>
          <div className="background-overlay" />
        </div>

        {/* ── STICKY NAVBAR — outside atlas-shell so it sticks on scroll ── */}
        <AtlasHeader
          activeIndex={activeIndex}
          openSection={selectSection}
        />

        {/* ── ATLAS HERO — full viewport, always visible at top ── */}
        <section className="atlas-shell" id="top">

          <AtlasStage
            activePage={activePage}
            activeIndex={activeIndex}
            previewPages={previewPages}
            reduceMotion={reduceMotion}
            selectSection={selectSection}
            scrollToDetail={scrollToDetail}
            goNext={goNext}
            goPrev={goPrev}
          />

          <AtlasFooter
            activePage={activePage}
            goPrev={goPrev}
            goNext={goNext}
          />

          <MobileNav
            activeIndex={activeIndex}
            openSection={selectSection}
          />

          {/* Scroll hint arrow */}
          <div className="scroll-hint" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4v12M4 10l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Scroll to explore</span>
          </div>
        </section>

        {/* ── DETAIL SECTION — same page, directly below atlas ── */}
        <section ref={detailRef} className="detail-section" id="detail">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage.id}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -24 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {renderDetailContent()}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </LayoutGroup>
  );
}

export default function App() {
  return (
    <SecurityGuard>
      <SiteSettingsProvider>
        <MainAppContent />
      </SiteSettingsProvider>
    </SecurityGuard>
  );
}