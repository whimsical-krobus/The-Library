import { Suspense } from 'react';
import Link from 'next/link';
import { getReadingList } from '@/lib/actions';
import { ReadingListItem } from '@/app/components/ReadingListItem';
import { ErrorState } from '@/app/components/ErrorState';
import { LoadingState } from '@/app/components/LoadingState';

async function ReadingListContent() {
  try {
    const result = await getReadingList();

    if (!result.success) {
      return (
        <ErrorState
          title="Could not fetch the reading list"
          message={result.message}
        />
      );
    }

    const books = result.data || [];

    if (books.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Your reading list is empty. Start by searching for books to add to your list
          </p>
          <Link
            href="/books"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search Books
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You have <strong>{books.length}</strong> books in your reading list
        </p>

        <div className="grid gap-4">
          {books.map((book: any) => (
            <ReadingListItem key={book._id} book={book} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ReadingListContent:', error);
    return (
      <ErrorState
        title="Could not fetch the reading list"
        message="An error occurred while fetching your reading list. Please try again later."
      />
    );
  }
}

export default function ReadingListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">My Reading List 📖</h1>

      <Suspense fallback={<LoadingState message="Fetching your reading list..." />}>
        <ReadingListContent />
      </Suspense>
    </div>
  );
}
