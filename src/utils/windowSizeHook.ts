import { useState, useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
};

export default function useWindowSize(): WindowSize {
  const isClient = typeof window === "object";

  function getSize(): WindowSize {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return windowSize;
}
