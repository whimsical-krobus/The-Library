import { Suspense } from 'react';
import { searchBooks } from '@/lib/api';
import { getReadingList } from '@/lib/actions';
import { SearchForm } from '@/app/components/SearchForm';
import { BookCard } from '@/app/components/BookCard';
import { ErrorState } from '@/app/components/ErrorState';
import { LoadingState } from '@/app/components/LoadingState';

async function BooksList({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Börja med att söka efter böcker ovan
        </p>
      </div>
    );
  }

  try {
    const [books, readingListResult] = await Promise.all([
      searchBooks(query, 12),
      getReadingList(),
    ]);

    if (books.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Inga böcker hittades för "{query}". Försök med ett annat sökord.
          </p>
        </div>
      );
    }

    const readingListOlIds = new Set(
      readingListResult.data?.map((book: any) => book.olId) || []
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.olId}
            book={book}
            isInReadingList={readingListOlIds.has(book.olId)}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error in BooksList:', error);
    return (
      <ErrorState
        title="Kunde inte hämta böcker"
        message="Ett fel inträffade när vi försökte hämta böcker från OpenLibrary. Försök igen senare."
      />
    );
  }
}

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function BooksPage({ searchParams }: PageProps) {
  const { search = '' } = await searchParams;
  const decodedQuery = decodeURIComponent(search);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Sök böcker</h1>
        <SearchForm initialQuery={decodedQuery} />
      </div>

      {decodedQuery && (
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Visar resultat för: <strong>"{decodedQuery}"</strong>
          </p>
        </div>
      )}

      <Suspense fallback={<LoadingState message="Söker böcker..." />}>
        <BooksList query={decodedQuery} />
      </Suspense>
    </div>
  );
}
