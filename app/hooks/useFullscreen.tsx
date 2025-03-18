import { useRef, useCallback } from "react";

export function useFullscreen<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);

  const enterFullscreen = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      if ("requestFullscreen" in element) {
        element.requestFullscreen();
      } else if ("webkitRequestFullscreen" in element) {
        (
          element as HTMLElement & { webkitRequestFullscreen: () => void }
        ).webkitRequestFullscreen();
      } else if ("msRequestFullscreen" in element) {
        (
          element as HTMLElement & { msRequestFullscreen: () => void }
        ).msRequestFullscreen();
      }
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ("webkitExitFullscreen" in document) {
      (
        document as Document & { webkitExitFullscreen: () => void }
      ).webkitExitFullscreen();
    } else if ("msExitFullscreen" in document) {
      (
        document as Document & { msExitFullscreen: () => void }
      ).msExitFullscreen();
    }
  }, []);

  return { elementRef, enterFullscreen, exitFullscreen };
}
