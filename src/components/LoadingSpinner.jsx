export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--bg-secondary)] border-t-[var(--accent-dark)]"></div>
    </div>
  );
}
