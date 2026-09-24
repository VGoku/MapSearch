import type { ReactNode } from "react";

/**
 * Layout Component
 * ----------------
 * A simple structural wrapper for the entire app.
 * - Provides full-screen responsive container
 * - Allows App.tsx to inject map, list, agent, theme toggle, etc.
 * - Keeps global background + dark/light mode consistent
 */
type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="
        relative
        h-screen w-screen
        overflow-hidden
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
      "
    >
      {children}
    </div>
  );
}
