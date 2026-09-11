import React, { useEffect, useState } from "react";

export default function SecurityGuard({ children }: { children: React.ReactNode }) {
  const [screenshotBlurred, setScreenshotBlurred] = useState(false);

  useEffect(() => {
    const isInputElement = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("input, textarea, [contenteditable='true']") !== null
      );
    };

    // 1. Right-Click & AuxClick Prevention (Capture Phase)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (isInputElement(target)) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    // 2. Keyboard Shortcut & PrintScreen Prevention
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = isInputElement(target);

      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      const code = e.code.toLowerCase();

      // PrintScreen / Screenshot Key Detection
      if (
        e.key === "PrintScreen" ||
        code === "printscreen" ||
        (ctrlOrCmd && e.shiftKey && (key === "s" || code === "keys")) || // Win+Shift+S or Cmd+Shift+4 snippet
        (ctrlOrCmd && e.shiftKey && (key === "4" || code === "digit4"))
      ) {
        // Clear clipboard immediately
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Content Protected — Screenshots Prohibited");
        }
        // Temporarily blur page to block screenshot software frame capture
        setScreenshotBlurred(true);
        setTimeout(() => setScreenshotBlurred(false), 1500);

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // F12 -> DevTools
      if (e.key === "F12" || code === "f12") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I -> DevTools Inspect
      if (ctrlOrCmd && e.shiftKey && (key === "i" || code === "keyi")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J -> Console
      if (ctrlOrCmd && e.shiftKey && (key === "j" || code === "keyj")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C -> Inspect Element
      if (ctrlOrCmd && e.shiftKey && (key === "c" || code === "keyc")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+U / Cmd+Option+U -> View Source
      if (ctrlOrCmd && (key === "u" || code === "keyu")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+S / Cmd+S -> Save Page
      if (ctrlOrCmd && (key === "s" || code === "keys")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+P / Cmd+P -> Print Page
      if (ctrlOrCmd && (key === "p" || code === "keyp")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Ctrl+C / Cmd+C -> Copy text (blocked unless typing in input)
      if (ctrlOrCmd && (key === "c" || code === "keyc") && !isInput) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // 3. Drag & Drop Prevention
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (isInputElement(target)) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    // 4. Select Start Prevention
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (isInputElement(target)) return;
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // High-priority capture-phase options
    const captureOpts: AddEventListenerOptions = { capture: true, passive: false };

    window.addEventListener("contextmenu", handleContextMenu, captureOpts);
    document.addEventListener("contextmenu", handleContextMenu, captureOpts);

    window.addEventListener("auxclick", handleContextMenu, captureOpts);
    document.addEventListener("auxclick", handleContextMenu, captureOpts);

    window.addEventListener("keydown", handleKeyDown, captureOpts);
    document.addEventListener("keydown", handleKeyDown, captureOpts);
    window.addEventListener("keyup", handleKeyDown, captureOpts);

    window.addEventListener("dragstart", handleDragStart, captureOpts);
    document.addEventListener("dragstart", handleDragStart, captureOpts);

    window.addEventListener("selectstart", handleSelectStart, captureOpts);
    document.addEventListener("selectstart", handleSelectStart, captureOpts);

    // 5. Console anti-inspect loop
    const consoleInterval = setInterval(() => {
      if (typeof window !== "undefined" && window.console) {
        console.clear();
      }
    }, 2000);

    return () => {
      clearInterval(consoleInterval);
      window.removeEventListener("contextmenu", handleContextMenu, captureOpts);
      document.removeEventListener("contextmenu", handleContextMenu, captureOpts);

      window.removeEventListener("auxclick", handleContextMenu, captureOpts);
      document.removeEventListener("auxclick", handleContextMenu, captureOpts);

      window.removeEventListener("keydown", handleKeyDown, captureOpts);
      document.removeEventListener("keydown", handleKeyDown, captureOpts);
      window.removeEventListener("keyup", handleKeyDown, captureOpts);

      window.removeEventListener("dragstart", handleDragStart, captureOpts);
      document.removeEventListener("dragstart", handleDragStart, captureOpts);

      window.removeEventListener("selectstart", handleSelectStart, captureOpts);
      document.removeEventListener("selectstart", handleSelectStart, captureOpts);
    };
  }, []);

  return (
    <div
      className={screenshotBlurred ? "security-blurred-mode" : ""}
      onContextMenu={(e) => {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        ) {
          return;
        }
        e.preventDefault();
      }}
      onDragStart={(e) => e.preventDefault()}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </div>
  );
}
