import { useState } from "react";
import type { Club } from "./clubs";
import { clubs } from "./clubs";
import { useMapController } from "./useMapController";
import ClubDetailsPanel from "./ClubDetailsPanel";

/**
 * ClubList Component
 * ------------------
 * Renders the right-side list of clubs.
 * - Clean UI
 * - Strong typing
 * - Smooth hover → map pan
 * - Smooth hover → marker highlight
 * - Click → open details panel (animated)
 */
export default function ClubList() {
  const { panToClub, highlightMarker, resetMarker, openPopup } = useMapController();

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  function openPanel(club: Club) {
    // ⭐ NEW: open popup on the map
    openPopup(club.id);

    setSelectedClub(club);
    setTimeout(() => setIsPanelVisible(true), 10); // allow mount → animate
  }

  function closePanel() {
    setIsPanelVisible(false);
    setTimeout(() => setSelectedClub(null), 300); // wait for animation
  }

  return (
    <div className="relative">
      {/* Club list */}
      <div className="space-y-4">
        {clubs.map((club: Club) => (
          <div
            key={club.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
            onMouseEnter={() => {
              highlightMarker(club.id);
              panToClub(club);
            }}
            onMouseLeave={() => {
              resetMarker(club.id);
            }}
            onClick={() => openPanel(club)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {club.name}
            </h3>
            <p className="text-sm text-gray-600">{club.address}</p>
          </div>
        ))}
      </div>

      {/* Slide-in details panel wrapper */}
      {selectedClub && (
        <div
          className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 ${
            isPanelVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ClubDetailsPanel club={selectedClub} onClose={closePanel} />
        </div>
      )}
    </div>
  );
}
