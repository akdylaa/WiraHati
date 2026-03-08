import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 space-y-4">
      <Loader2 size={48} className="text-orange-500 animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">
        Finding the perfect activity for you...
      </p>
    </div>
  );
}
