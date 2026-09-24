import { createContext } from "react";
import type { Map, Marker } from "leaflet";
import type { Club } from "./clubs";

export type MapContextShape = {
  mapRef: React.MutableRefObject<Map | null>;
  markersRef: React.MutableRefObject<Record<string, Marker>>;

  setMapRef: (map: Map) => void;
  registerMarker: (id: string, marker: Marker) => void;

  panToClub: (club: Club) => void;
  zoomTo: (level: number) => void;

  highlightMarker: (id: string) => void;
  resetMarker: (id: string) => void;

  activePopupId: React.MutableRefObject<string | null>;
  openPopup: (id: string) => void;

  centerMapForPanel: (club: Club) => void;

  showSpotlight: (club: Club) => void;
  hideSpotlight: () => void;

  setUserLocation: (lat: number, lng: number) => void;
  drawRouteToClub: (club: Club) => void;
  clearRoute: () => void;
};

export const MapContext = createContext<MapContextShape | null>(null);
