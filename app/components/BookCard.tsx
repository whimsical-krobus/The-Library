'use client';

import { useState } from 'react';
import Image from 'next/image';
import { addToReadingList } from '@/lib/actions';
import type { BookData } from '@/lib/api';

interface BookCardProps {
  book: BookData;
  isInReadingList?: boolean;
  onAddSuccess?: () => void;
}

export function BookCard({ book, isInReadingList = false, onAddSuccess }: BookCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  async function handleAddToReadingList() {
    setIsAdding(true);

    try {
      const result = await addToReadingList(book);

      if (result.success) {
        setMessageType('success');
        onAddSuccess?.();
      } else {
        setMessageType('error');
      }

      setMessage(result.message);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Cover Image */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">No cover image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-2">
          {book.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{book.author}</p>

        <p className="text-gray-500 dark:text-gray-400 text-xs mb-auto">{book.year}</p>

        {/* Message */}
        {message && (
          <div
            className={`mt-3 text-xs p-2 rounded ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAddToReadingList}
          disabled={isAdding || isInReadingList}
          className={`mt-4 w-full px-4 py-2 rounded text-white font-medium transition-colors ${
            isInReadingList
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400'
          }`}
        >
          {isAdding ? 'Adding book...' : isInReadingList ? 'In reading list' : 'Add to reading list'}
        </button>
      </div>
    </div>
  );
}
