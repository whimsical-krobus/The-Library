'use client';

import { useState } from 'react';
import Image from 'next/image';
import { removeFromReadingList } from '@/lib/actions';
import type { IReadingListBook } from '@/lib/models/ReadingListBook';

interface ReadingListItemProps {
  book: IReadingListBook;
  onRemoveSuccess?: () => void;
}

export function ReadingListItem({ book, onRemoveSuccess }: ReadingListItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  async function handleRemove() {
    if (!window.confirm(`Do you want to remove "${book.title}" from your reading list?`)) {
      return;
    }

    setIsRemoving(true);

    try {
      const result = await removeFromReadingList(book.olId);

      if (result.success) {
        setMessageType('success');
        onRemoveSuccess?.();
      } else {
        setMessageType('error');
        setMessage(result.message);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred while removing the book. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {/* Cover Image */}
      <div className="flex-shrink-0 relative h-32 w-24 bg-gray-100 dark:bg-gray-700 rounded">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover rounded"
            sizes="100px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-400 dark:text-gray-500 text-center px-1">No image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-1">
          {book.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{book.author}</p>

        <p className="text-gray-500 dark:text-gray-400 text-xs mb-auto">{book.year}</p>

        {message && (
          <div
            className={`mt-2 text-xs p-2 rounded ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Delete Button */}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="mt-3 self-start px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {isRemoving ? 'Remove...' : 'Removed from list'}
        </button>
      </div>
    </div>
  );
}
