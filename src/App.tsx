import { useState } from "react";
import Layout from "./components/Layout";
import MapView from "./map/MapView";
import ClubList from "./map/ClubList";
import Agent from "./agent/Agent";
import Home from "./Home";
import ThemeToggle from "./ThemeToggle";

/**
 * App Component
 * -------------
 * Controls the full app flow:
 * - Home page
 * - Map + ClubList layout
 * - Dark/light mode toggle
 * - Mobile responsive behavior
 */
export default function App() {
  const [started, setStarted] = useState(false);

  // Home screen
  if (!started) {
    return (
      <div className="relative h-screen w-screen bg-white dark:bg-gray-900">
        <ThemeToggle />
        <Home onStart={() => setStarted(true)} />
      </div>
    );
  }

  // Map screen
  return (
    <Layout>
      <ThemeToggle />

      {/* Map Section */}
      <div className="
        absolute inset-0
        w-full md:w-2/3
        h-1/2 md:h-full
      ">
        <MapView />
      </div>

      {/* Club List Section */}
      <div className="
        absolute right-0 top-1/2 md:top-0
        w-full md:w-1/3
        h-1/2 md:h-full
        p-4 overflow-y-auto
        bg-white dark:bg-gray-900
        border-t md:border-t-0 md:border-l
        border-gray-200 dark:border-gray-700
      ">
        <ClubList />
      </div>

      {/* Agent Section */}
      <div className="fixed bottom-4 right-4 z-50">
        <Agent />
      </div>
    </Layout>
  );
}
