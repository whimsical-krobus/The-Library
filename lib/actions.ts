'use server';

import { connectDB } from './db';
import { ReadingListBook } from './models/ReadingListBook';
import type { BookData } from './api';

export async function addToReadingList(book: BookData) {
  try {
    await connectDB();

    // Kontrollera om boken redan finns
    const existing = await ReadingListBook.findOne({ olId: book.olId });
    if (existing) {
      return {
        success: false,
        message: 'This book is already in your reading list',
      };
    }

    const newBook = new ReadingListBook({
      olId: book.olId,
      title: book.title,
      author: book.author,
      year: book.year,
      coverImage: book.coverImage,
    });

    await newBook.save();

    return {
      success: true,
      message: `"${book.title}" has been added to your reading list`,
    };
  } catch (error) {
    console.error('Error adding book to reading list:', error);
    return {
      success: false,
      message: 'Failed to add the book. Please try again later.',
    };
  }
}

export async function removeFromReadingList(olId: string) {
  try {
    await connectDB();

    const result = await ReadingListBook.findOneAndDelete({ olId });

    if (!result) {
      return {
        success: false,
        message: 'Book not found in reading list',
      };
    }

    return {
      success: true,
      message: `"${result.title}" has been removed from your reading list`,
    };
  } catch (error) {
    console.error('Error removing book from reading list:', error);
    return {
      success: false,
      message: 'Failed to remove the book. Please try again later.',
    };
  }
}

export async function getReadingList() {
  try {
    await connectDB();

    const books = await ReadingListBook.find()
      .sort({ addedAt: -1 })
      .lean()
      .exec();

    return {
      success: true,
      data: books,
    };
  } catch (error) {
    console.error('Error fetching reading list:', error);
    return {
      success: false,
      message: 'Failed to fetch the reading list. Please try again later.',
      data: [],
    };
  }
}

export async function isBookInReadingList(olId: string): Promise<boolean> {
  try {
    await connectDB();

    const book = await ReadingListBook.findOne({ olId });
    return !!book;
  } catch (error) {
    console.error('Error checking if book is in reading list:', error);
    return false;
  }
}
