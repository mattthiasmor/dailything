import React from 'react';
import Checklist from './components/Checklist';
import Quote from './components/Quote';
import useDailyTasks from './hooks/useDailyTasks';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useDailyTasks();

  const getProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto relative">
        
        <header className="text-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight">
            Daily Momentum
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Seize the day, one task at a time.
          </p>
        </header>

        <main className="space-y-8">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Quote />
          </div>
          
          <div 
            className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-700/50 animate-fade-in-up shadow-blue-500/10" 
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="text-2xl font-bold text-slate-200 mb-4">Today's Checklist</h2>
             <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <Checklist 
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <p>Built with React & Tailwind CSS.</p>
          <p>Your progress is stored locally and resets daily.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;