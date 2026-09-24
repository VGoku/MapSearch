export default function ThemeToggle() {
  function toggle() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button
      className="
        fixed top-4 right-4 px-3 py-2 rounded-lg
        bg-gray-200 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        shadow hover:shadow-md transition
      "
      onClick={toggle}
    >
      Toggle Theme
    </button>
  );
}
