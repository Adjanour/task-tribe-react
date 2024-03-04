// TCalendar.tsx
import React from 'react';
import { Spinner } from '../Elements';
import { TaskCalendar } from './Calendar';
import { useTaskAPI } from '@/features/Task-Module/hooks/useTaskAPI';

export const TaskCalendarContainer: React.FC = () => {
  const { task } = useTaskAPI();
  const { Tasks, isLoadingGettingTasks } = task;

  if (isLoadingGettingTasks) {
    return <Spinner />;
  }

  return <TaskCalendar tasks={Tasks} />;
};