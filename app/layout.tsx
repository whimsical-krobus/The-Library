import type { Metadata } from "next";
import { Navigation } from "./components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Library - Your Personal Reading List",
  description: "Search books from OpenLibrary and create your personal reading list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
