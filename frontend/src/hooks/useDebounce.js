import { useState, useEffect } from "react";

export default function useDebounce(value, callback, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
      if (callback) callback(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, callback]);

  return debounced;
}