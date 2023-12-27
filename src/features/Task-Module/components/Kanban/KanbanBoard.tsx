// KanbanBoard.js (Kanban board component)
import React, { useState } from 'react';
import Column from './Column';

const initialTasks = [
  { id: 1, name: 'Task 1', status: 'todo' },
  { id: 2, name: 'Task 2', status: 'inProgress' },
  { id: 3, name: 'Task 3', status: 'done' },
  { id:4 , name: 'Task 1', status: 'todo' },
  { id: 5, name: 'Task 2', status: 'inProgress' },
  { id: 6, name: 'Task 3', status: 'done' },
  { id: 7, name: 'Task 1', status: 'todo' },
  { id: 8, name: 'Task 2', status: 'inProgress' },
  { id: 9, name: 'Task 3', status: 'done' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleTaskClick = (taskId:number) => {
    // Move task to the next column (status)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === 'todo'
                  ? 'inProgress'
                  : task.status === 'inProgress'
                  ? 'done'
                  : 'todo',
            }
          : task
      )
    );
  };

  return (
    <div className="flex justify-between p-4 bg-gray-200">
      <Column
        title="To Do"
        tasks={tasks.filter((task) => task.status === 'todo')}
        onTaskClick={handleTaskClick}
        columnStyle="bg-blue-200"
      />
      <Column
        title="In Progress"
        tasks={tasks.filter((task) => task.status === 'inProgress')}
        onTaskClick={handleTaskClick}
        columnStyle="bg-yellow-200"
      />
      <Column
        title="Done"
        tasks={tasks.filter((task) => task.status === 'done')}
        onTaskClick={handleTaskClick}
        columnStyle="bg-green-200"
      />
    </div>
  );
};

export default KanbanBoard;
