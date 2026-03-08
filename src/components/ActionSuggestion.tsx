import { Activity } from 'lucide-react';

interface ActionSuggestionProps {
  suggestion: string;
}

export function ActionSuggestion({ suggestion }: ActionSuggestionProps) {
  if (!suggestion) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-indigo-50 border border-indigo-100 rounded-3xl shadow-sm">
      <div className="flex items-center space-x-3 mb-4 text-indigo-600">
        <Activity size={24} />
        <h2 className="text-xl font-semibold text-slate-800">Recommended Action</h2>
      </div>
      <p className="text-2xl font-medium text-slate-900 capitalize leading-relaxed">
        {suggestion}
      </p>
    </div>
  );
}
