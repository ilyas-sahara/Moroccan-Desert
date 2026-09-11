export default function PageLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sand-50 pt-20">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-sand-200 border-t-sand-700"
        role="status"
        aria-label="Loading"
      />
    </main>
  );
}