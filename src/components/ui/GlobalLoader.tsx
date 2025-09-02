interface GlobalLoaderProps {
  show: boolean;
}

export function GlobalLoader({ show }: GlobalLoaderProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
        <div className="text-cyan-400 font-mono text-lg">Loading...</div>
        <div className="text-gray-400 font-mono text-sm">Initializing Shadow Ranch</div>
      </div>
    </div>
  );
}