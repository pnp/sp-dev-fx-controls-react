/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";

import type { Style } from "maplibre-gl";

/**
 * Fetches and cleans a MapLibre style JSON, removing any graticule layer.
 */
export const useCleanMapStyle = (url: string): Style | undefined => {
  const [styleJson, setStyleJson] = useState<Style | undefined>(undefined);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(url);
        const json = (await res.json()) as Style;

        if (!cancelled) setStyleJson(json);
      } catch (e) {
        console.error("Error loading style:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);
  return styleJson;
};
