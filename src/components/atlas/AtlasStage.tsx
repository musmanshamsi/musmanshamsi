import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Page } from "../../data/portfolioPages";
import { ArrowIcon } from "../icons/PortfolioIcons";

type PreviewPage = {
  page: Page;
  index: number;
};

type AtlasStageProps = {
  activePage: Page;
  activeIndex: number;
  previewPages: PreviewPage[];
  reduceMotion: boolean | null;
  selectSection: (index: number) => void;
  scrollToDetail: (index: number) => void;
  goNext: () => void;
  goPrev?: () => void;
};

export default function AtlasStage({
  activePage,
  activeIndex,
  previewPages,
  reduceMotion,
  selectSection,
  scrollToDetail,
  goNext,
  goPrev,
}: AtlasStageProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      goNext();
    } else if (diff < -50 && goPrev) {
      goPrev();
    }
    setTouchStart(null);
  };

  return (
    <section
      className="atlas-stage"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage.id}
          className="content-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0, y: -18 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="section-label">
            <span>{activePage.number}</span>
            {activePage.label}
          </div>

          <h1>{activePage.title}</h1>

          <p className="subtitle">{activePage.subtitle}</p>

          <p className="description">{activePage.description}</p>

          <div className="chip-row">
            {activePage.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="main-actions">
            {activePage.href ? (
              <a
                href={activePage.href}
                target={activePage.href.startsWith("http") ? "_blank" : undefined}
                rel={activePage.href.startsWith("http") ? "noreferrer" : undefined}
                className="primary-action"
              >
                {activePage.cta}
                <ArrowIcon />
              </a>
            ) : (
              <button
                className="primary-action"
                onClick={() => scrollToDetail(activeIndex)}
              >
                {activePage.cta ?? "Open Page"}
                <ArrowIcon />
              </button>
            )}

            <button className="secondary-action" onClick={goNext}>
              Next Section
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="carousel-zone" aria-label="Portfolio preview pages">
        <div className="preview-stack">
          <AnimatePresence mode="popLayout">
            {previewPages.map(({ page, index }, position) => (
              <motion.button
                key={page.id}
                className={`preview-card ${page.visualClass}`}
                onClick={() => selectSection(index)}
                aria-label={`Go to ${page.nav} section`}
                initial={reduceMotion ? false : { opacity: 0, x: 80, scale: 0.94 }}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        y: position * 12,
                      }
                }
                exit={reduceMotion ? {} : { opacity: 0, x: -90, scale: 0.92 }}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        y: position * 12 - 12,
                        scale: 1.04,
                        transition: { duration: 0.4, ease: "easeOut" },
                      }
                }
                whileTap={
                  reduceMotion
                    ? {}
                    : {
                        scale: 0.96,
                        y: position * 12 + 4,
                        transition: { duration: 0.2 },
                      }
                }
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  delay: position * 0.05,
                }}
                style={{ zIndex: 10 - position }}
              >
                <span className="preview-number">{page.number}</span>
                <div>
                  <strong>{page.title}</strong>
                  <small>{page.label}</small>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}