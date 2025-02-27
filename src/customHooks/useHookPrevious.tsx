import { useEffect, useRef } from "react";

// Get the previous value
export function useHookPrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value; // called after rendering is done
  }, [value]);

  // returned before useEffect
  return ref.current;
}
