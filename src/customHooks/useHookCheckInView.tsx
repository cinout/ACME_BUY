import { useEffect, useRef, useState } from "react";

export default function useHookCheckInView() {
  const elementRef = useRef(null);
  const [inView, setInView] = useState(false);

  // check if it enters viewport
  useEffect(() => {
    let elementCopy = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !inView) {
            setInView(true); // Update state when element is in view
          }
        });
      },
      { threshold: 0.5 } // Adjust to trigger when 50% of the element is in view
    );

    if (elementRef.current) {
      elementCopy = elementRef.current;
      observer.observe(elementCopy);
    }

    return () => {
      if (elementCopy) {
        observer.unobserve(elementCopy); // Clean up observer
      }
    };
  }, [inView]);

  return { elementRef, inView };
}
