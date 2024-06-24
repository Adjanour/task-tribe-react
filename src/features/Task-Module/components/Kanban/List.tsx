import React, { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { KanbanBoardContainer } from './Board';
import KanbanColumn from './Column';
import KanbanItem from './Item';
import { Task } from '../Elements/TaskTable';
import { useTaskAPI } from '../../hooks/useTaskAPI';

export const List: React.FC = () => {
  const { updateTaskStatus, myTask } = useTaskAPI();
  const [filteredTasks, setFilteredTasks] = useState<{
    notStarted: Task[];
    inProgress: Task[];
    done: Task[];
  }>({
    notStarted: [],
    inProgress: [],
    done: [],
  });
  console.log(myTask.MyTasks)

  useEffect(() => {
    if (myTask.MyTasks) {
      const notStarted = myTask.MyTasks.filter((task: Task) => task.taskStatusId === 1);
      const inProgress = myTask.MyTasks.filter((task: Task) => task.taskStatusId === 2);
      const done = myTask.MyTasks.filter((task: Task) => task.taskStatusId === 6);

      setFilteredTasks({ notStarted, inProgress, done });
    }
  }, [myTask.MyTasks]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const taskId = Number(active.id);
      const newStatusId = Number(over.id);
      const task = myTask.MyTasks.find((task: Task) => task.taskAssignmentId === taskId);

      if (task) {
        try {
          const result = await updateTaskStatus({ taskId, taskStatusId: newStatusId });
          if (result) {
            myTask.refetchMyTasks();
            console.log("Task status updated successfully");
          }
        } catch (error) {
          console.error("Failed to update task status", error);
        }
      }
    }
  };

  const renderTaskItem = (task: Task, key: number) => (
    <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }}>
      <div className='flex justify-between mb-2'>
        <div className="task-detail">
          <span className="text-gray-900 text-lg font-semibold">{task.taskName}</span>
        </div>
        <div className="task-detail ">
          <span className="text-gray-700 text-sm">{task.taskProgress}</span>
        </div>
      </div>
      <div className="w-full mb-2">
        <hr className="border-t-2 border-gray-300" />
      </div>
      <div className="task-detail mb-2">
        <span className="text-gray-700 text-sm">{task.taskDescription}</span>
      </div>
      <div className="task-detail mb-2">
        <span className="text-gray-700 text-sm">{`Progress: ${task.taskProgress}`}</span>
      </div>
      <div className='flex justify-between mb-2'>
        <div className="task-detail">
          <span className="text-gray-700 text-sm">{`Assigned by: ${task.assignerFullName}`}</span>
        </div>
        <div className="task-detail">
          <span className="text-gray-700 text-sm">{`Status: ${task.taskStatus}`}</span>
        </div>
      </div>
    </KanbanItem>
  );

  if (myTask.isLoadingMyTasks) {
    return <div>Loading...</div>;
  }

  if (myTask.errorFetchingMyTasks) {
    return <div>Error</div>;
  }

  return (
    <KanbanBoardContainer>
      <DndContext onDragEnd={handleDragEnd}>
        <KanbanColumn title="To Do" id="1" count={filteredTasks.notStarted.length}>
          {filteredTasks.notStarted.map(renderTaskItem)}
        </KanbanColumn>
        <KanbanColumn title="In Progress" id="2" count={filteredTasks.inProgress.length}>
          {filteredTasks.inProgress.map(renderTaskItem)}
        </KanbanColumn>
        <KanbanColumn title="Done" id="6" count={filteredTasks.done.length}>
          {filteredTasks.done.map(renderTaskItem)}
        </KanbanColumn>
      </DndContext>
    </KanbanBoardContainer>
  );
};
