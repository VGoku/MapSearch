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
 * - Smooth hover → spotlight
 * - Click → open details panel (animated)
 * - Selected club highlight
 * - Hover lift effect
 * - Active glow effect
 * - ⭐ Map dim overlay when panel opens (new)
 */
export default function ClubList() {
  const {
    panToClub,
    highlightMarker,
    resetMarker,
    openPopup,
    centerMapForPanel,
    showSpotlight,
    hideSpotlight,
  } = useMapController();

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  function openPanel(club: Club) {
    openPopup(club.id);
    centerMapForPanel(club);
    setSelectedClub(club);
    setTimeout(() => setIsPanelVisible(true), 10);
  }

  function closePanel() {
    setIsPanelVisible(false);
    setTimeout(() => setSelectedClub(null), 300);
  }

  return (
    <div className="relative">

      {/* ⭐ Map dim overlay */}
      {isPanelVisible && (
        <div
          className="
            fixed inset-0
            bg-black/30
            backdrop-blur-[2px]
            transition-opacity duration-300
            animate-panel-backdrop
            pointer-events-none
          "
        />
      )}

      {/* Club list */}
      <div className="space-y-4">
        {clubs.map((club: Club) => {
          const isSelected = selectedClub?.id === club.id;

          return (
            <div
              key={club.id}
              className={`
                p-4 rounded-lg border transition-all cursor-pointer
                transform-gpu
                hover:-translate-y-1 hover:shadow-lg

                ${
                  isSelected
                    ? `
                      border-blue-500
                      bg-blue-50 dark:bg-blue-900/20
                      shadow-[0_0_12px_rgba(0,122,255,0.45)]
                      ring-2 ring-blue-400/40
                    `
                    : `
                      border-gray-200
                      hover:border-blue-400
                      hover:bg-blue-50 dark:hover:bg-blue-900/20
                    `
                }
              `}
              onMouseEnter={() => {
                highlightMarker(club.id);
                panToClub(club);
                showSpotlight(club);
              }}
              onMouseLeave={() => {
                resetMarker(club.id);
                hideSpotlight();
              }}
              onClick={() => openPanel(club)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {club.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {club.address}
              </p>
            </div>
          );
        })}
      </div>

      {/* Slide-in details panel wrapper */}
      {selectedClub && (
        <div
          className={`
            fixed top-0 right-0 h-full w-80 transform transition-transform duration-300
            ${isPanelVisible ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <ClubDetailsPanel club={selectedClub} onClose={closePanel} />
        </div>
      )}
    </div>
  );
}
