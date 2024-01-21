// TaskDashboardPage.tsx
import React, { useState, useEffect } from 'react';
import TaskDashboard from './TaskDashboard'; // Adjust the path based on your actual structure
import { TaskAssignment } from '@/features/Task-Module/utils/functions'; // Adjust the path

const TaskDashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/task-assignments/');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskDashboard tasks={tasks} />
      )}
    </div>
  );
};

export default TaskDashboardPage;
