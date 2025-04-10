import { useEffect, useRef, useState } from "react";

export default function useHookSingleImageLoading() {
  const imageGridRef = useRef<HTMLImageElement | null>(null);
  const [imageGridRefOnLoad, setImageGridRefOnLoad] = useState<boolean>(false); // loading state checker

  useEffect(() => {
    let imgElement: HTMLImageElement;

    if (imageGridRef.current) {
      setImageGridRefOnLoad(true);
      imgElement = imageGridRef.current;

      const handleLoad = () => {
        setImageGridRefOnLoad(false);
      };

      const handleError = () => {
        setImageGridRefOnLoad(false);
      };

      // Attach event listeners
      imgElement.onload = handleLoad;
      imgElement.onerror = handleError;
    }

    return () => {
      if (imgElement) {
        imgElement.onload = null;
        imgElement.onload = null;
      }
    };
  }, []);

  return { imageGridRef, imageGridRefOnLoad };
}
