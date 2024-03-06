// TCalendar.tsx
import React, { useEffect } from 'react';
import { Spinner } from '../Elements';
import { TaskCalendar } from './Calendar';
import { useTaskAPI } from '@/features/Task-Module/hooks/useTaskAPI';

export const TaskCalendarContainer: React.FC = () => {
  const { task } = useTaskAPI();
  const { Tasks, isLoadingGettingTasks } = task;

  useEffect(() =>{
    task.refetchTasks();
  },[])

  if (isLoadingGettingTasks) {
    return <Spinner />;
  }

  return <TaskCalendar tasks={Tasks} />;
};