import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

function KanbanBoard() {
  const columns = [
    { id: 'column-1', title: 'To Do' },
    { id: 'column-2', title: 'In Progress' },
    { id: 'column-3', title: 'Done' }
  ];
  const tasks = [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    { id: 'task-3', content: 'Task 3' }
  ];
  const [parent, setParent] = useState(null);

  const draggableMarkup = (
      <Draggable id="draggable">Drag me</Draggable>
  );

  const handleDragEnd = (event) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };

  return (
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        <div style={{ display: 'flex' }}>
          {columns.map((column) => (
              <Droppable key={column.id} id={column.id}>
                {parent === column.id ? draggableMarkup : column.title}
              </Droppable>
          ))}
        </div>

        <div>
          {tasks.map((task) => (
              <Draggable key={task.id} id={task.id}>
                {task.content}
              </Draggable>
          ))}
        </div>
      </DndContext>
  );
}

export default KanbanBoard;
