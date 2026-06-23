interface ErrorStateProps {
  message?: string;
  title?: string;
}

export function ErrorState({
  message = 'Ett fel inträffade. Försök igen senare.',
  title = 'Något gick fel',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center">{message}</p>
    </div>
  );
}
