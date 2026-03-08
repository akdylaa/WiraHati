export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  videoId?: string;
  actionLink?: string;
  isError?: boolean;
}
