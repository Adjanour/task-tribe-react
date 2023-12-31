// Task.js
import React from 'react';

export type TaskProps = {
  task: {
    id: number;
    name: string;
    status: string;
  };
  onTaskClick: (id: number) => void;
};

export const Task = ({ task, onTaskClick }: TaskProps) => {
  return (
    <div
      className="task p-3 mb-2 bg-white rounded-md shadow-md cursor-pointer"
      onClick={() => onTaskClick(task.id)}
    >
      <p className="text-lg font-semibold">{task.name}</p>
      <p className="text-sm text-gray-500">{task.status}</p>
    </div>
  );
};
