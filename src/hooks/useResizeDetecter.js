import { useRef, useLayoutEffect } from 'react';
import ResizeOberver from 'resize-observer-polyfill';

const useResizeDetecter = (callback, targetRef) => {
  // const ref = useRef(null);
  const handler = useRef(null);
  handler.current = callback;
  useLayoutEffect(() => {
    if (!targetRef.current) return;
    const monitor = new ResizeOberver(([t]) => {
      if (handler.current) {
        handler.current(t);
      }
    });
    monitor.observe(targetRef.current);

    return () => {
      monitor.disconnect();
    };
  }, [targetRef]);
  return targetRef;
};

export default useResizeDetecter;
