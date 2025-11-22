import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
    
  useEffect(() => {

    const effect = () => {
      setDebouncedValue(value);
    }

    const handler = setTimeout(effect, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
