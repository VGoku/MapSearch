/**
 * Club data for the right-side list and map markers.
 * --------------------------------------------------
 * Each club has:
 * - id: unique identifier
 * - name: display name
 * - address: full address
 * - lat/lng: coordinates for Leaflet map
 *
 * Keeping this separate makes the map and UI cleaner.
 */

export type Club = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const clubs: Club[] = [
  {
    id: "bath",
    name: "The Bath Club",
    address: "5937 Collins Ave, Miami Beach, FL 33140",
    lat: 25.8375,
    lng: -80.1208,
  },
  {
    id: "surf",
    name: "The Surf Club",
    address: "9011 Collins Ave, Surfside, FL 33154",
    lat: 25.8790,
    lng: -80.1220,
  },
  {
    id: "fisher",
    name: "Fisher Island Club",
    address: "1 Fisher Island Dr, Miami Beach, FL 33109",
    lat: 25.7546,
    lng: -80.1425,
  },
  {
    id: "soho",
    name: "Soho Beach House",
    address: "4385 Collins Ave, Miami Beach, FL 33140",
    lat: 25.8170,
    lng: -80.1228,
  },
];
