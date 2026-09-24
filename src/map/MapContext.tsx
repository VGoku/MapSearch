import { useRef } from "react";
import type { Map, Marker } from "leaflet";
import type { Polyline } from "leaflet";
import type { Club } from "./clubs";
import { MapContext } from "./MapContextObject";
import L from "leaflet";
import "../map/markerStyles.css";

/**
 * MapProvider
 * -----------
 * Centralized map state + Leaflet layer management.
 */
export function MapProvider({ children }: { children: React.ReactNode }) {
  /** Core map + markers */
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  /** Spotlight layer */
  const spotlightLayerRef = useRef<L.Circle | null>(null);

  /** Route preview */
  const userLocationRef = useRef<[number, number] | null>(null);
  const routeLayerRef = useRef<Polyline | null>(null);

  /** Travel dot */
  const travelDotRef = useRef<L.CircleMarker | null>(null);

  /** Default Leaflet marker icon */
  const originalIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  /** Popup sync */
  const activePopupId = useRef<string | null>(null);
  function openPopup(id: string) {
    activePopupId.current = id;
  }

  /** Map + marker registration */
  function setMapRef(map: Map) {
    mapRef.current = map;
  }

  function registerMarker(id: string, marker: Marker) {
    markersRef.current[id] = marker;
  }

  /** Map movement */
  function panToClub(club: Club) {
    if (!mapRef.current) return;
    mapRef.current.flyTo([club.lat, club.lng], 14, { duration: 1.2 });
  }

  function centerMapForPanel(club: Club) {
    if (!mapRef.current) return;
    const offsetLng = club.lng - 0.01;
    mapRef.current.flyTo([club.lat, offsetLng], 14, { duration: 1.2 });
  }

  function zoomTo(level: number) {
    if (!mapRef.current) return;
    mapRef.current.setZoom(level, { animate: true });
  }

  /** Marker highlight */
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

  function resetMarker(id: string) {
    const marker = markersRef.current[id];
    if (!marker) return;
    marker.setIcon(originalIcon);
  }

  /** Spotlight */
  function showSpotlight(club: Club) {
    if (!mapRef.current) return;

    if (spotlightLayerRef.current) {
      spotlightLayerRef.current.remove();
      spotlightLayerRef.current = null;
    }

    const layer = L.circle([club.lat, club.lng], {
      radius: 250,
      color: "transparent",
      fillColor: "rgba(0, 122, 255, 0.25)",
      fillOpacity: 0.35,
      className: "leaflet-spotlight",
    });

    layer.addTo(mapRef.current);
    spotlightLayerRef.current = layer;
  }

  function hideSpotlight() {
    if (spotlightLayerRef.current) {
      spotlightLayerRef.current.remove();
      spotlightLayerRef.current = null;
    }
  }

  /** Route preview */
  function setUserLocation(lat: number, lng: number) {
    userLocationRef.current = [lat, lng];
  }

  /** ⭐ Travel dot animation */
  function animateTravelDot(club: Club) {
    if (!mapRef.current) return;
    if (!userLocationRef.current) return;

    const [userLat, userLng] = userLocationRef.current;
    const start = L.latLng(userLat, userLng);
    const end = L.latLng(club.lat, club.lng);

    // Remove old dot
    if (travelDotRef.current) {
      travelDotRef.current.remove();
      travelDotRef.current = null;
    }

    const dot = L.circleMarker(start, {
      radius: 6,
      color: "rgba(0,122,255,0.9)",
      fillColor: "rgba(0,122,255,0.9)",
      fillOpacity: 1,
      className: "travel-dot",
    });

    dot.addTo(mapRef.current);
    travelDotRef.current = dot;

    let t = 0;
    const duration = 900;
    const startTime = performance.now();

    function step() {
      const now = performance.now();
      t = (now - startTime) / duration;

      if (t >= 1) {
        dot.setLatLng(end);
        return;
      }

      const lat = start.lat + (end.lat - start.lat) * t;
      const lng = start.lng + (end.lng - start.lng) * t;

      dot.setLatLng([lat, lng]);

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function drawRouteToClub(club: Club) {
    if (!mapRef.current) return;
    if (!userLocationRef.current) return;

    const [userLat, userLng] = userLocationRef.current;

    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    const polyline = L.polyline(
      [
        [userLat, userLng],
        [club.lat, club.lng],
      ],
      {
        color: "rgba(0, 122, 255, 0.85)",
        weight: 4,
        opacity: 0.9,
        className: "route-preview-line",
      }
    );

    polyline.addTo(mapRef.current);
    routeLayerRef.current = polyline;

    animateTravelDot(club);
  }

  function clearRoute() {
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (travelDotRef.current) {
      travelDotRef.current.remove();
      travelDotRef.current = null;
    }
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

        activePopupId,
        openPopup,

        centerMapForPanel,

        showSpotlight,
        hideSpotlight,

        setUserLocation,
        drawRouteToClub,
        clearRoute,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
