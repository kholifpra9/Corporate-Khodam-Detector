export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Corporate Khodam Detector &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">
          Dibuat untuk bersenang-senang. Tidak ada khodam nyata yang dirugikan.
        </p>
      </div>
    </footer>
  );
}
