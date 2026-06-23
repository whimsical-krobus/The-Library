const OPENLIBRARY_API = 'https://openlibrary.org/search.json';

export interface BookData {
  olId: string;
  title: string;
  author: string;
  year: number;
  coverImage: string | null;
}

interface OpenLibrarySearchResult {
  docs: {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  }[];
  numFound: number;
}

export async function searchBooks(query: string, limit: number = 10): Promise<BookData[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      q: query.trim(),
      limit: String(limit),
      fields: 'key,title,author_name,first_publish_year,cover_i',
    });

    const response = await fetch(`${OPENLIBRARY_API}?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`OpenLibrary API error: ${response.status}`);
    }

    const data: OpenLibrarySearchResult = await response.json();

    return data.docs.map((doc) => ({
      olId: doc.key.replace('/works/', ''),
      title: doc.title || 'Unknown Title',
      author: doc.author_name?.[0] || 'Unknown Author',
      year: doc.first_publish_year || new Date().getFullYear(),
      coverImage: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('Could not fetch books from OpenLibrary. Please try again later.');
  }
}

export async function getBook(bookId: string): Promise<BookData | null> {
  try {
    const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      olId: bookId,
      title: data.title || 'Unknown Title',
      author: data.authors?.[0]?.name || 'Unknown Author',
      year: data.first_publish_date?.split('-')[0] || new Date().getFullYear(),
      coverImage: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
        : null,
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}
