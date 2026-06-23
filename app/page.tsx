import Link from 'next/link';
import { SearchForm } from './components/SearchForm';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">📚 Welcome to The Library</h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Search from books in OpenLibrary and create your personal reading list
        </p>

        <div className="mb-12">
          <SearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/books"
            className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
          >
            <div className="text-4xl mb-2">🔍</div>
            <h2 className="text-xl font-bold mb-2">Search Books</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore millions of books from OpenLibrary
            </p>
          </Link>

          <Link
            href="/reading-list"
            className="p-6 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
          >
            <div className="text-4xl mb-2">📖</div>
            <h2 className="text-xl font-bold mb-2">My Reading List</h2>
            <p className="text-gray-600 dark:text-gray-300">
              View the books you have saved for later
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
