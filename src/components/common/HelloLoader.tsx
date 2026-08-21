import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import "./HelloLoader.css";

const SESSION_KEY = "hello-shown";

interface HelloLoaderProps {
  onComplete: () => void;
}

export default function HelloLoader({ onComplete }: HelloLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Total display duration (~1.8s hold before smooth fade out)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Storage blocked/disabled
      }
      setTimeout(() => {
        onComplete();
      }, 450);
    }, reduceMotion ? 800 : 1800);

    return () => {
      clearTimeout(exitTimer);
    };
  }, [onComplete, reduceMotion]);

  // Orb drifting animations (12–18s ease-in-out loops)
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
            scale: reduceMotion ? 1 : 1.02,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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

          {/* ── NATURAL UPRIGHT HANDWRITTEN GREETING ── */}
          <div className="hello-content-wrap">
            <span className="sr-only">hello</span>

            <motion.h1
              className="hello-handwritten-text"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              hello
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
