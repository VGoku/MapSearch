export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Club Explorer
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
        Discover clubs, explore locations, and get details instantly with a
        smooth, modern map experience.
      </p>

      <button
        className="
          mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 transition
        "
        onClick={onStart}
      >
        Start Searching
      </button>
    </div>
  );
}
