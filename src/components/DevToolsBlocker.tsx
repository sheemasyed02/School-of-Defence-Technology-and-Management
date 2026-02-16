"use client";

import { useEffect } from "react";

/**
 * Disables browser developer tools to prevent unauthorized inspection.
 * This is a deterrent, not a foolproof security measure.
 * Place this component in your root layout.
 */
export function DevToolsBlocker() {
  useEffect(() => {
    // Only block in production
    // if (process.env.NODE_ENV !== "production") return;

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable common keyboard shortcuts for dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C (Inspect element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save as)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools by monitoring window dimensions (debugger check)
    let devtoolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
      const widthDiff =
        window.outerWidth - window.innerWidth > threshold;
      const heightDiff =
        window.outerHeight - window.innerHeight > threshold;

      if (widthDiff || heightDiff) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          // Clear console and show warning
          console.clear();
          console.log(
            "%c⚠️ WARNING",
            "color: red; font-size: 40px; font-weight: bold;"
          );
          console.log(
            "%cThis is a secure government portal. Unauthorized access is prohibited and may be subject to legal action.",
            "color: red; font-size: 14px;"
          );
        }
      } else {
        devtoolsOpen = false;
      }
    };

    // Disable text selection on sensitive elements
    const disableSelect = (e: Event) => {
      const target = e.target as HTMLElement;
      // Ensure target is an element (not text node or document)
      if (target instanceof Element && target.closest("[data-no-select]")) {
        e.preventDefault();
      }
    };

    // Disable drag
    const handleDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectstart", disableSelect);
    document.addEventListener("dragstart", handleDrag);

    const interval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", disableSelect);
      document.removeEventListener("dragstart", handleDrag);
      clearInterval(interval);
    };
  }, []);

  return null;
}
