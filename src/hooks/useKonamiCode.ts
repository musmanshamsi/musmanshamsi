import { useEffect, useRef } from "react";

// Konami Code sequence
const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Only keys that are PART of the Konami sequence.
// Any other key (letters, space, enter, etc.) is fully ignored — won't reset progress.
const KONAMI_KEY_SET = new Set(KONAMI_SEQUENCE.map((k) => k.toLowerCase()));

/**
 * useKonamiCode
 *
 * Fires `onSuccess` once the full Konami sequence is entered.
 *
 * Forgiveness rules:
 *  - Only arrow keys + "b" + "a" are watched. Every other keypress is silently ignored.
 *  - The buffer resets ONLY if a wrong key from the Konami set is pressed.
 *  - A 3-second inactivity timer resets the buffer so you can re-attempt cleanly.
 */
export function useKonamiCode(onSuccess: () => void) {
  const bufferRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetBuffer = () => {
      bufferRef.current = [];
    };

    const restartInactivityTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(resetBuffer, 3000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Normalize: arrow keys keep their name, letters go lowercase
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // Ignore keys that are NOT part of the Konami set at all
      if (!KONAMI_KEY_SET.has(key.toLowerCase())) return;

      const expectedKey = KONAMI_SEQUENCE[bufferRef.current.length];

      if (key === expectedKey) {
        // Correct key — advance the buffer
        bufferRef.current = [...bufferRef.current, key];
        restartInactivityTimer();

        // Check if the full sequence is complete
        if (bufferRef.current.length === KONAMI_SEQUENCE.length) {
          if (timerRef.current) clearTimeout(timerRef.current);
          resetBuffer();
          onSuccess();
        }
      } else {
        // Wrong key from the Konami set — reset and restart from scratch
        resetBuffer();
        restartInactivityTimer();
      }
    };

    // Use capture phase to run before SecurityGuard's listeners
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onSuccess]);
}
