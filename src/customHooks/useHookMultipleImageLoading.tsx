import { useEffect, useRef, useState } from "react";

export default function useHookMultipleImageLoading(imageIds: string[]) {
  const imagesRef = useRef<Map<string, HTMLImageElement | null>>(null);

  function getImageRefMap() {
    if (!imagesRef.current) {
      // Initialize the Map on first usage.
      imagesRef.current = new Map();
    }
    return imagesRef.current;
  }

  const [imageGridOnLoad, setImageGridOnLoad] = useState<Map<string, boolean>>(
    new Map(imageIds.map((id) => [id, false]))
  ); // loading state checker

  useEffect(() => {
    const map = getImageRefMap();

    imageIds.forEach((id) => {
      const imageRef = map.get(id);

      // img.complete:	true if the image has finished loading, successfully or not.
      if (imageRef && !imageRef.complete) {
        setImageGridOnLoad((prevMap) => {
          const newMap = new Map(prevMap); // Create a new Map instance
          newMap.set(id, true); // Update the value
          return newMap; // Return the new map to trigger re-render
        });

        const handleLoad = () => {
          setImageGridOnLoad((prevMap) => {
            const newMap = new Map(prevMap); // Create a new Map instance
            newMap.set(id, false); // Update the value
            return newMap; // Return the new map to trigger re-render
          });
        };

        const handleError = () => {
          setImageGridOnLoad((prevMap) => {
            const newMap = new Map(prevMap); // Create a new Map instance
            newMap.set(id, false); // Update the value
            return newMap; // Return the new map to trigger re-render
          });
        };

        // Attach event listeners
        imageRef.onload = handleLoad; // The image has been fully loaded
        imageRef.onerror = handleError; // The image fails to load (e.g., 404 error, CORS issues, broken URL).
      }
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      map.forEach((imageRef, key) => {
        if (imageRef) {
          imageRef.onload = null;
          imageRef.onerror = null;
        }
      });
    };
  }, [imageIds]);

  return { getImageRefMap, imageGridOnLoad };
}
