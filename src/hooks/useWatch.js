import { useRef, useEffect } from 'react';

export default (cb, deps) => {
  const cbRef = useRef(null);
  cbRef.current = cb;
  useEffect(() => {
    if (cbRef.current) {
      cbRef.current();
    }
    /* eslint-disable*/
  }, deps);
};
