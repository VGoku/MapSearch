import { useContext } from "react";
import { MapContext } from "./MapContextObject";

/**
 * useMapController
 * ----------------
 * Access the shared map controller.
 * Now includes:
 * - openPopup(id)
 * - activePopupId ref
 */
export function useMapController() {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error("useMapController must be used inside <MapProvider>");
  }

  return ctx;
}
