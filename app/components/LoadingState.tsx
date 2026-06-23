interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading data...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin text-4xl mb-4">⏳</div>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}
