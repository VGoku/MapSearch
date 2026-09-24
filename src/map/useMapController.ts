import { useContext } from "react";
import { MapContext } from "./MapContextObject";

/**
 * useMapController
 * ----------------
 * Access the shared map controller.
 * Pure accessor — no local state, no mutations.
 */
export function useMapController() {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error("useMapController must be used inside <MapProvider>");
  }

  return ctx;
}
