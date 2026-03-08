import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface EmotionInputFormProps {
  onSubmit: (emotion: string) => void;
  isLoading: boolean;
}

export function EmotionInputForm({ onSubmit, isLoading }: EmotionInputFormProps) {
  const [emotion, setEmotion] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emotion.trim() && !isLoading) {
      onSubmit(emotion.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="How are you feeling right now? (e.g., angry, anxious, sluggish)"
          disabled={isLoading}
          className="w-full px-6 py-4 text-lg bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!emotion.trim() || isLoading}
          className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Submit emotion"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}
