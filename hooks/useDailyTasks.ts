import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';

interface StoredTasks {
  date: string; // YYYY-MM-DD
  tasks: Task[];
}

const PREDEFINED_TASKS: Task[] = [
  { id: 'preset-1', text: 'Gym', completed: false, details: 'AT LEAST upper body 2x and lower body 1x a week. Caloric deficit, high protein.' },
  { id: 'preset-2', text: 'Hustle', completed: false, details: 'AT LEAST 3 hours.' },
  { id: 'preset-3', text: 'Study', completed: false, details: 'AT LEAST 1 hour.' },
  { id: 'preset-4', text: 'No Brainrot', completed: false, details: 'No gaming, scrolling at all. MAX podcast at gym or on the way. No music but chants either.' },
  { id: 'preset-5', text: 'Time with God', completed: false, details: 'AT LEAST 2 times of focused prayer and bible reading.' },
];

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const sendWebhookReport = async (tasks: Task[], lastCompletedTaskText?: string) => {
  const webhookUrl = 'https://ayeiropsa.app.n8n.cloud/webhook/fd660c55-980b-418d-b8d9-80830cacdfb6';

  // Basic check to ensure the hardcoded URL is valid before sending.
  if (!URL.canParse(webhookUrl)) {
    console.error("The hardcoded webhook URL is invalid:", webhookUrl);
    return;
  }

  const completedTasks = tasks.filter(t => t.completed);
  const summary: Record<string, any> = {
    date: getTodayString(),
    totalTasks: tasks.length,
    completedTasks: completedTasks.length,
    completionRate: tasks.length > 0 ? parseFloat(((completedTasks.length / tasks.length) * 100).toFixed(2)) : 0,
    tasks: tasks,
  };

  if (lastCompletedTaskText) {
    summary.lastCompletedTask = lastCompletedTaskText;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(summary),
      mode: 'cors',
    });

    if (response.ok) {
        console.log('Webhook report sent successfully.');
    } else {
        console.error('Webhook response was not ok.', await response.text());
    }
  } catch (error) {
    console.error('Failed to send webhook report:', error);
  }
};


const useDailyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const saveTasks = useCallback((updatedTasks: Task[]) => {
    try {
      const dataToStore: StoredTasks = {
        date: getTodayString(),
        tasks: updatedTasks,
      };
      window.localStorage.setItem('dailyTasks', JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('dailyTasks');
      const today = getTodayString();

      if (item) {
        const storedData: StoredTasks = JSON.parse(item);
        if (storedData.date === today) {
          // It's the same day, load the tasks
          setTasks(storedData.tasks);
        } else {
          // It's a new day, reset completion status but keep the tasks
          const resetTasks = storedData.tasks.map(task => ({ ...task, completed: false }));
          setTasks(resetTasks);
          saveTasks(resetTasks);
        }
      } else {
        // No tasks in localStorage, initialize with predefined tasks
        setTasks(PREDEFINED_TASKS);
        saveTasks(PREDEFINED_TASKS);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
      setTasks(PREDEFINED_TASKS); // Fallback on error
    }
  }, [saveTasks]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    sendWebhookReport(updatedTasks);
  };

  const toggleTask = (id: string) => {
    let lastCompletedTaskText: string | undefined;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const isNowCompleted = !task.completed;
        if (isNowCompleted) {
            lastCompletedTaskText = task.text;
        }
        return { ...task, completed: isNowCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    sendWebhookReport(updatedTasks, lastCompletedTaskText);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    sendWebhookReport(updatedTasks);
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

export default useDailyTasks;
