# The Library 📚

This is a web application for discovering books and building your personal reading list. Search millions of books from OpenLibrary and save your favorites for later.

## Overview

**The Library** is an intuitive book discovery platform that combines the vast OpenLibrary catalog with personalized reading list management. Whether you're looking for your next great read or organizing your to-be-read pile, The Library makes it simple and enjoyable.

### Key Features

- **📖 Book Search**: Search from millions of books in the OpenLibrary database
- **💾 Reading List**: Save books to your personal reading list for later
- **🎨 Modern UI**: Clean, responsive design with dark mode support
- **⚡ Fast Performance**: Server-side rendering and optimized data fetching
- **🔄 Real-time Sync**: Your reading list is stored persistently in the database

## Technical Stack

### Frontend
- **Next.js 16** - React framework with App Router for file-based routing
- **React 19** - UI library with server components
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### Backend
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database for reading list persistence
- **Mongoose** - MongoDB object modeling
- **Next.js API Routes** - Serverless backend functions

### Development Tools
- **ESLint** - Code quality and style enforcement
- **PostCSS** - CSS processing and optimization

## Architecture

### Core Components

**Pages**
- `/` - Home page with welcome message and navigation
- `/books` - Book search interface
- `/reading-list` - User's saved reading list

**Components**
- `SearchForm` - Search input and submission
- `BookCard` - Individual book display
- `ReadingListItem` - Reading list entry
- `Navigation` - App navigation
- `LoadingState` - Loading indicators
- `ErrorState` - Error handling UI

**Libraries**
- `api.ts` - OpenLibrary API integration for book search
- `actions.ts` - Server actions for database operations
- `db.ts` - MongoDB connection management
- `utils.ts` - Utility functions

### Data Flow

1. **Search**: User searches for books → Query OpenLibrary API → Display results
2. **Save**: User saves a book → Server action → MongoDB storage
3. **Retrieve**: Load reading list → Query MongoDB → Display user's books

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with:
# MONGODB_URI=your_mongodb_connection_string

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint checks
```

## Environment Variables

Create a `.env.local` file in the project root:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## Project Structure

```
app/
  ├── components/       # React components
  ├── books/           # Books search page
  ├── reading-list/    # Reading list page
  └── globals.css      # Global styles
lib/
  ├── api.ts           # OpenLibrary API client
  ├── actions.ts       # Server actions
  ├── db.ts            # Database connection
  ├── models/          # MongoDB schemas
  └── utils.ts         # Utility functions
public/               # Static assets
```