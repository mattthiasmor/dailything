import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id:string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between bg-slate-700/50 p-3.5 rounded-lg border border-slate-700 hover:bg-slate-600/50 hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
          />
          <span className={`text-slate-300 ${task.completed ? 'line-through text-slate-500' : ''} transition-colors`}>
            {task.text}
          </span>
        </div>
        {task.details && (
          <p className={`text-slate-400 text-sm mt-1 ml-8 ${task.completed ? 'text-slate-600' : ''}`}>
            {task.details}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
        aria-label={`Delete task: ${task.text}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
};
export default TaskItem;
