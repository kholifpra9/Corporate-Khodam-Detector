export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="text-3xl">🔮</span>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Corporate Khodam Detector
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Temukan khodam perusahaan dalam dirimu
          </p>
        </div>
      </div>
    </header>
  );
}
