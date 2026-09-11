import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DrivePortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrivePortal({ isOpen, onClose }: DrivePortalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const openDrive = () => {
    const url = import.meta.env.VITE_DRIVE_URL;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop
        <motion.div
          className="drive-portal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Private access portal"
        >
          {/* Card — stop clicks from closing */}
          <motion.div
            className="drive-portal-card"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="drive-portal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Icon */}
            <div className="drive-portal-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 87.3 78" fill="none">
                <path
                  d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H14.4c0 1.55.4 3.1 1.2 4.5z"
                  fill="#0066DA"
                />
                <path
                  d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L6.6 39.5a9 9 0 00-1.2 4.5H32.9z"
                  fill="#00AC47"
                />
                <path
                  d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H60.4l5.4 9.75z"
                  fill="#EA4335"
                />
                <path
                  d="M43.65 25L57.4 1.2A9.06 9.06 0 0054.1 0H33.2c-1.35 0-2.65.35-3.3 1.2z"
                  fill="#00832D"
                />
                <path
                  d="M60.4 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                  fill="#2684FC"
                />
                <path
                  d="M73.4 26.5l-10-17.3c-.8-1.4-1.95-2.5-3.3-3.3L46.35 25l14.05 28H87.3c0-1.55-.4-3.1-1.2-4.5z"
                  fill="#FFBA00"
                />
              </svg>
            </div>

            <h2 className="drive-portal-title">Private Access</h2>
            <p className="drive-portal-desc">
              Your personal workspace is ready.
            </p>

            <button className="drive-portal-btn" onClick={openDrive}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Drive
            </button>

            <p className="drive-portal-hint">Press Esc to dismiss</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
