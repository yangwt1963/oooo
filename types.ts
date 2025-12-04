export type CourseCategory = 'all' | 'free' | 'basic' | 'bootcamp';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'free' | 'basic' | 'bootcamp';
  duration: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  students: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}