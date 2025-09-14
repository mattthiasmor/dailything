import React, { useState } from 'react';
import type { Task } from '../types';
import TaskItem from './TaskItem';

interface ChecklistProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={!newTaskText.trim()}
        >
          Add
        </button>
      </form>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={task.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
              <TaskItem
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            </div>
          ))
        ) : (
          <li className="text-center text-slate-400 py-4">
            Your checklist is empty. Add a task to get started!
          </li>
        )}
      </ul>
    </div>
  );
};

export default Checklist;