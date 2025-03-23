import React from "react";

export function useIsVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (!ref.current || observerRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return isIntersecting;
}
