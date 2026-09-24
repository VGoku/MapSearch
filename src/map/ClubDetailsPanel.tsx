import type { Club } from "./clubs";
import { useMapController } from "./useMapController";

type Props = {
  club: Club | null;
  onClose: () => void;
};

/**
 * ClubDetailsPanel
 * ----------------
 * A premium slide-in panel showing club details.
 */
export default function ClubDetailsPanel({ club, onClose }: Props) {
  const { panToClub } = useMapController();

  if (!club) return null;

  return (
    <div
      className="
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l border-gray-200
        transform transition-transform duration-300
        translate-x-0
      "
    >
      <div className="p-6 space-y-4">
        <button
          className="text-gray-500 hover:text-gray-700 text-sm"
          onClick={onClose}
        >
          Close
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          {club.name}
        </h2>

        <p className="text-gray-600">{club.address}</p>

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
  );
}
