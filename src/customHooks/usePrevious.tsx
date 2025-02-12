import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value; // called after rendering is done
  }, [value]);

  // returned before useEffect
  return ref.current;
}
