import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./HelloLoader.css";

const SESSION_KEY = "hello-shown";

interface HelloLoaderProps {
  onComplete: () => void;
}

// ── Yellowtail Single Unbroken Stroke "hello" Continuous Path ────────────────
// Traced as ONE continuous bezier stroke from the start of 'h' to the end of 'o'
const YELLOWTAIL_STROKE_PATH =
  "M 65 142 C 55 125 72 68 88 44 C 98 28 112 24 116 34 C 120 48 98 120 92 160 C 90 168 102 128 124 105 C 140 88 158 90 159 114 C 160 136 148 160 168 160 C 182 160 196 142 208 122 C 218 104 224 92 214 84 C 202 76 188 92 192 116 C 196 140 212 160 234 160 C 252 160 266 138 276 112 C 288 78 302 36 312 24 C 320 14 330 18 327 34 C 320 64 298 136 294 160 C 304 160 322 138 336 112 C 348 85 362 36 372 24 C 380 14 390 18 387 34 C 380 65 358 136 354 160 C 364 160 384 140 400 116 C 414 94 432 82 452 85 C 476 88 488 108 482 135 C 476 158 454 168 434 164 C 418 160 410 140 416 118 C 422 96 446 88 466 92 C 484 96 504 108 532 108";

export default function HelloLoader({ onComplete }: HelloLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [strokeDone, setStrokeDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Cross-fade filled ink upon stroke completion at 1.8s
    const strokeTimer = setTimeout(() => {
      setStrokeDone(true);
    }, reduceMotion ? 50 : 1800);

    // 2. Fixed total duration (~2.4s: 1.8s draw + ink settle + short hold)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Storage disabled or blocked
      }
      setTimeout(() => {
        onComplete();
      }, 500);
    }, reduceMotion ? 900 : 2400);

    return () => {
      clearTimeout(strokeTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete, reduceMotion]);

  // Ambient gradient orb animations (12–18s loops)
  const orb1Animation = reduceMotion
    ? {}
    : {
        x: [0, 55, -35, 0],
        y: [0, -45, 35, 0],
        scale: [1, 1.14, 0.94, 1],
      };

  const orb2Animation = reduceMotion
    ? {}
    : {
        x: [0, -65, 45, 0],
        y: [0, 40, -55, 0],
        scale: [1, 0.92, 1.16, 1],
      };

  const orb3Animation = reduceMotion
    ? {}
    : {
        x: [0, 45, -55, 0],
        y: [0, -30, 45, 0],
        scale: [1, 1.1, 0.9, 1],
      };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="hello-loader-screen"
          className="hello-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.03,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          {/* ── 3 DRIFTING AMBIENT GRADIENT BLOBS ── */}
          <div className="hello-orbs-container" aria-hidden="true">
            {/* Teal #2dd4bf */}
            <motion.div
              className="hello-orb hello-orb--teal"
              animate={orb1Animation}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Gold #d4af37 */}
            <motion.div
              className="hello-orb hello-orb--gold"
              animate={orb2Animation}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Blue #3b82f6 */}
            <motion.div
              className="hello-orb hello-orb--blue"
              animate={orb3Animation}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* ── CENTRAL YELLOWTAIL CONTINUOUS SINGLE-STROKE GREETING ── */}
          <div className="hello-content-wrap">
            <span className="sr-only">hello</span>

            <div className="hello-svg-container">
              <svg
                viewBox="0 0 560 190"
                className="hello-svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="hello"
              >
                {/* 1. Continuous single-stroke path animated via pathLength */}
                <motion.path
                  d={YELLOWTAIL_STROKE_PATH}
                  fill="transparent"
                  stroke="#f6e0ad"
                  strokeWidth={4.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 1, pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    pathLength: {
                      duration: reduceMotion ? 0 : 1.8,
                      ease: [0.45, 0, 0.2, 1],
                    },
                  }}
                />

                {/* 2. Cross-fade settled ink layer */}
                <motion.path
                  d={YELLOWTAIL_STROKE_PATH}
                  fill="transparent"
                  stroke="#f6e0ad"
                  strokeWidth={5.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: strokeDone ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
