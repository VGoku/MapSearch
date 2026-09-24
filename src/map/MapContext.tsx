import { useRef, type ReactNode } from "react";
import type { Map, Marker } from "leaflet";
import type { Club } from "./clubs";
import { MapContext } from "./MapContextObject";
import L from "leaflet";
import "../map/markerStyles.css";

/**
 * Provider Component
 * ------------------
 * Wraps the entire app and provides shared map + marker state.
 */
export function MapProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  /**
   * Store the original Leaflet icon once.
   */
  const originalIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  /**
   * Popup sync state
   */
  const activePopupId = useRef<string | null>(null);

  function openPopup(id: string) {
    activePopupId.current = id;
  }

  function setMapRef(map: Map) {
    mapRef.current = map;
  }

  function registerMarker(id: string, marker: Marker) {
    markersRef.current[id] = marker;
  }

  function panToClub(club: Club) {
    if (!mapRef.current) return;

    mapRef.current.flyTo([club.lat, club.lng], 14, {
      duration: 1.2,
    });
  }

  function zoomTo(level: number) {
    if (!mapRef.current) return;

    mapRef.current.setZoom(level, {
      animate: true,
    });
  }

  /**
   * Highlight a marker with pulse animation.
   */
  function highlightMarker(id: string) {
    const marker = markersRef.current[id];
    if (!marker) return;

    const pulseIcon = L.divIcon({
      className: "leaflet-marker-pulse",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    marker.setIcon(pulseIcon);
  }

  /**
   * Reset marker to default Leaflet icon.
   */
  function resetMarker(id: string) {
    const marker = markersRef.current[id];
    if (!marker) return;

    marker.setIcon(originalIcon);
  }

  return (
    <MapContext.Provider
      value={{
        mapRef,
        markersRef,
        setMapRef,
        registerMarker,
        panToClub,
        zoomTo,
        highlightMarker,
        resetMarker,

        // ⭐ These were missing — now added
        activePopupId,
        openPopup,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
