export interface Task {
  id: string;
  text: string;
  completed: boolean;
  details?: string; // <--- This line was added
}