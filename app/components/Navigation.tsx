import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
            📚 The Free Library
          </Link>

          <div className="flex gap-6">
            <Link
              href="/books"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Search for books
            </Link>
            <Link
              href="/reading-list"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Reading List
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
