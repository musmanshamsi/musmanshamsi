/**
 * konamiGlobal.ts
 *
 * Registers the Konami Code listener ONCE at module load time — completely
 * outside React's lifecycle. This makes it immune to StrictMode double-mount,
 * HMR, and SecurityGuard capture-phase conflicts.
 *
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 */

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

const KONAMI_KEY_SET = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "b", "a"]);

let _callback: (() => void) | null = null;
let _buffer: string[] = [];
let _timer: ReturnType<typeof setTimeout> | null = null;

window.addEventListener(
  "keydown",
  (e: KeyboardEvent) => {
    if (!_callback) return;

    // Normalize key: multi-char keys (Arrow*) keep case, single chars go lowercase
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    // Ignore keys not in the Konami set — they don't affect the buffer at all
    if (!KONAMI_KEY_SET.has(key)) return;

    // Stop arrow keys from scrolling the page during sequence entry
    e.preventDefault();

    const expected = KONAMI_SEQUENCE[_buffer.length];

    if (key === expected) {
      _buffer.push(key);

      if (_timer) clearTimeout(_timer);

      if (_buffer.length === KONAMI_SEQUENCE.length) {
        // ✅ Full sequence complete!
        _buffer = [];
        _callback();
      } else {
        // Reset if no key pressed for 3 seconds
        _timer = setTimeout(() => { _buffer = []; }, 3000);
      }
    } else {
      // Wrong key — reset buffer
      _buffer = [];
      if (_timer) clearTimeout(_timer);
    }
  },
  { capture: true, passive: false }
);

/** Call this from your React component to register the callback. */
export function setKonamiCallback(cb: (() => void) | null): void {
  _callback = cb;
}
