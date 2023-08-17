import { useState, useEffect } from "react";

const useResizeEvent = (ref: any, time: number) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>();
  useEffect(() => {
    if (!ref) return;

    const observerTarget = ref.current;
    let timeoutId: any = null;
    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
        });
      }, time);
    });
    resizeObserver.observe(observerTarget);
    return () => {
      resizeObserver.unobserve(observerTarget);
    };
  }, [ref, time]);
  return dimensions;
};
export default useResizeEvent;
