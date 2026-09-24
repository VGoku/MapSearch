import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { clubs } from "./clubs";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapController } from "./useMapController";

/**
 * Fix Leaflet marker icons in React builds.
 */
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

/**
 * Glow icon
 */
const glowIcon = L.divIcon({
  className: "leaflet-marker-glow leaflet-marker-bounce",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});


/**
 * Capture map instance
 */
function MapInitializer({ setMapRef }: { setMapRef: (map: L.Map) => void }) {
  const map = useMap();
  setMapRef(map);
  return null;
}

export default function MapView() {
  const { setMapRef, registerMarker, activePopupId } = useMapController();

  const [clickedClub, setClickedClub] = useState<string | null>(null);

  const activeClub = activePopupId.current ?? clickedClub;

  return (
    <MapContainer
      className="w-full h-full"
      center={[25.8, -80.13]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <MapInitializer setMapRef={setMapRef} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {clubs.map((club) => (
        <Marker
          key={club.id}
          position={[club.lat, club.lng]}
          ref={(marker) => {
            if (marker) registerMarker(club.id, marker);
          }}
          icon={activeClub === club.id ? glowIcon : defaultIcon}
          eventHandlers={{
            click: () => setClickedClub(club.id),
          }}
        >
          {activeClub === club.id && (
            <Popup className="club-popup">
              <div className="text-sm">
                <strong>{club.name}</strong>
                <br />
                {club.address}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
