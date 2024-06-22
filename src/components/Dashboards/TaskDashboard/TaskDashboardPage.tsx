// TaskDashboardPage.tsx
import React from 'react';
import TaskDashboard from './TaskDashboard'; // Adjust the path based on your actual structure
import { useTaskAPI } from '@/features/Task-Module/hooks/useTaskAPI';

const TaskDashboardPage: React.FC = () => {
  const {myTask} = useTaskAPI()


  return (
    <div>
      {myTask.isLoadingMyTasks ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskDashboard tasks={myTask.MyTasks} />
      )}
    </div>
  );
};

export default TaskDashboardPage;
