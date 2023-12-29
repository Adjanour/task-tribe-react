// Column.js
import React from 'react';
import {Task} from './Task';

export type task = {
    id: number;
    name: string;
    status: string;
}
export type TaskProps = {
  title: string;
  tasks: task[];
  onTaskClick: (id: number) => void;
  columnStyle: string; // Add a prop for column style
};

const Column = ({ title, tasks, onTaskClick, columnStyle }: TaskProps) => {
  return (
    <div className={`column p-4 rounded-md ${columnStyle}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
};

export default Column;
