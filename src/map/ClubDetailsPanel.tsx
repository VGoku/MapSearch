import type { Club } from "./clubs";
import { useMapController } from "./useMapController";
import { useRef, useState } from "react";

type Props = {
  club: Club | null;
  onClose: () => void;
};

/**
 * ClubDetailsPanel
 * ----------------
 * Premium slide-in panel with:
 * - fade + slide animation
 * - backdrop blur
 * - drag-to-close gesture
 * - ⭐ momentum flick close
 */
export default function ClubDetailsPanel({ club, onClose }: Props) {
  const { panToClub } = useMapController();

  // ⭐ Hooks must be above early return
  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!club) return null;

  function beginDrag(clientX: number) {
    startX.current = clientX;
    lastX.current = clientX;
    lastTime.current = performance.now();
    setIsDragging(true);
  }

  function moveDrag(clientX: number) {
    if (!isDragging || startX.current === null) return;

    const now = performance.now();
    const delta = clientX - startX.current;

    // Track velocity
    lastX.current = clientX;
    lastTime.current = now;

    // Only allow dragging to the right
    if (delta > 0) {
      setDragOffset(delta);
    }
  }

  function endDrag() {
    setIsDragging(false);

    // Compute velocity
    let velocity = 0;
    if (lastX.current !== null && startX.current !== null && lastTime.current !== null) {
      const dx = lastX.current - startX.current;
      const dt = performance.now() - lastTime.current;

      // pixels per millisecond
      velocity = dx / dt;
    }

    // ⭐ Momentum threshold: fast flick closes panel
    const flick = velocity > 0.6; // tweakable

    // ⭐ Distance threshold
    const farEnough = dragOffset > 120;

    if (flick || farEnough) {
      onClose();
    }

    // Reset
    setDragOffset(0);
    startX.current = null;
    lastX.current = null;
    lastTime.current = null;
  }

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className="
          fixed inset-0
          bg-black/20
          backdrop-blur-sm
          transition-opacity duration-300
          animate-panel-backdrop
        "
        onClick={onClose}
      />

      {/* Slide-in panel with drag + momentum */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80
          bg-white dark:bg-gray-900
          shadow-xl border-l border-gray-200 dark:border-gray-700
          transform transition-all
          ${isDragging ? "duration-0" : "duration-300"}
        `}
        style={{
          transform: `translateX(${dragOffset}px)`,
        }}
        onMouseDown={(e) => beginDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        <div className="p-6 space-y-4">
          <button
            className="
              text-gray-500 hover:text-gray-700
              dark:text-gray-300 dark:hover:text-gray-100
              text-sm
            "
            onClick={onClose}
          >
            Close
          </button>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {club.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300">{club.address}</p>

          <button
            className="
              mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition
            "
            onClick={() => panToClub(club)}
          >
            Zoom to Club
          </button>
        </div>
      </div>
    </>
  );
}
