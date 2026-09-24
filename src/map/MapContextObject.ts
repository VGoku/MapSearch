import { createContext } from "react";
import type { Map, Marker } from "leaflet";
import type { Club } from "./clubs";

/**
 * MapContextShape
 * ----------------
 * Defines the full shape of the map controller.
 */
export type MapContextShape = {
  mapRef: React.MutableRefObject<Map | null>;
  markersRef: React.MutableRefObject<Record<string, Marker>>;
  setMapRef: (map: Map) => void;
  registerMarker: (id: string, marker: Marker) => void;
  panToClub: (club: Club) => void;
  zoomTo: (level: number) => void;
  highlightMarker: (id: string) => void;
  resetMarker: (id: string) => void;

  // ⭐ These were missing — required for popup syncing
  activePopupId: React.MutableRefObject<string | null>;
  openPopup: (id: string) => void;
};

/**
 * The actual React context object.
 * Exported alone to satisfy Fast Refresh rules.
 */
export const MapContext = createContext<MapContextShape | null>(null);
