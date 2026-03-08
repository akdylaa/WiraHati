import { HeartPulse } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center space-x-3 text-indigo-600">
      <HeartPulse size={32} strokeWidth={2.5} />
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        WiraHati
      </h1>
    </header>
  );
}
