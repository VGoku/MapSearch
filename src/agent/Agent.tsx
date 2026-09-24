import { useState } from "react";

/**
 * Agent Component
 * ---------------
 * This is the UI shell for your AI agent.
 * - Bottom-right floating box
 * - Clean, modern styling
 * - Expandable for Babylon.js later
 * - Uses fetch (not axios) when we add logic
 */
export default function Agent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        Agent
      </button>

      {/* Agent Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 w-64 p-4 bg-white rounded-xl shadow-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            AI Agent
          </h3>

          <p className="text-sm text-gray-600">
            This is your agent panel.  
            We’ll add Babylon.js visuals and fetch logic here later.
          </p>
        </div>
      )}
    </div>
  );
}
