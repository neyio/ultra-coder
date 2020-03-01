import { useRef, useEffect } from 'react';

const defaultOption = {
  leading: false,
  trailing: true,
  maxing: false,
  maxWait: 0,
};

export function createUseDebounce(options) {
  const opt = Object.assign({}, defaultOption, options);
  const { leading, trailing, maxing } = opt;
  return (func, wait) => {
    const maxWait = !maxing ? 0 : opt.maxWait ? opt.maxWait : wait;
    const useRAF = !wait && wait !== 0 && typeof window.requestAnimationFrame === 'function';
    const lastArgsRef = useRef();
    const lastThisRef = useRef();
    const resultRef = useRef();

    const timerIdRef = useRef();
    const lastCallTimeRef = useRef();
    const lastInvokeTimeRef = useRef();

    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.

    if (typeof func !== 'function') {
      throw new TypeError('Expected a function');
    }
    wait = +wait || 0;

    function invokeFunc(time) {
      const args = lastArgsRef.current;
      const thisArg = lastThisRef.current;

      lastArgsRef.current = lastThisRef.current = undefined;
      lastInvokeTimeRef.current = time;
      resultRef.current = func.apply(thisArg, args);
      return resultRef.current;
    }

    function startTimer(pendingFunc, waitTime) {
      if (useRAF) {
        window.cancelAnimationFrame(timerIdRef.current);
        return window.requestAnimationFrame(pendingFunc);
      }
      return setTimeout(pendingFunc, waitTime);
    }

    function cancelTimer(id) {
      if (useRAF) {
        return window.cancelAnimationFrame(id);
      }
      clearTimeout(id);
    }

    function trailingEdge(time) {
      timerIdRef.current = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgsRef.current) {
        return invokeFunc(time);
      }
      lastArgsRef.current = lastThisRef.current = undefined;
      return resultRef.current;
    }
    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTimeRef.current = time;
      // Start the timer for the trailing edge.
      timerIdRef.current = startTimer(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : resultRef.current;
    }

    function remainingWait(time) {
      const timeSinceLastCall = time - (lastCallTimeRef.current || 0);
      const timeSinceLastInvoke = time - (lastInvokeTimeRef.current || 0);
      const timeWaiting = wait - timeSinceLastCall;

      return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
      const timeSinceLastCall = time - (lastCallTimeRef.current || 0);
      const timeSinceLastInvoke = time - (lastInvokeTimeRef.current || 0);

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTimeRef.current === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerIdRef.current = startTimer(timerExpired, remainingWait(time));
    }

    function cancel() {
      if (timerIdRef.current !== undefined) {
        cancelTimer(timerIdRef.current);
      }
      lastInvokeTimeRef.current = 0;
      lastArgsRef.current = lastCallTimeRef.current = lastThisRef.current = timerIdRef.current = undefined;
    }

    function flush() {
      return timerIdRef.current === undefined ? resultRef.current : trailingEdge(Date.now());
    }

    function pending() {
      return timerIdRef.current !== undefined;
    }

    function debounced(...args) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgsRef.current = args;
      lastThisRef.current = this;
      lastCallTimeRef.current = time;

      if (isInvoking) {
        if (timerIdRef.current === undefined) {
          return leadingEdge(lastCallTimeRef.current);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerIdRef.current = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTimeRef.current);
        }
      }
      if (timerIdRef.current === undefined) {
        timerIdRef.current = startTimer(timerExpired, wait);
      }
      return resultRef.current;
    }
    /* eslint-disable */
    useEffect(() => cancel, []);
    return [debounced, cancel, flush, pending];
  };
}

export default createUseDebounce();
