import React, { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { KanbanBoardContainer, KanbanBoard } from './Board';
import KanbanColumn from './Column';
import KanbanItem from './Item';
import { useTaskContext } from '../../stores/TaskContext';
import { Task } from '../Elements/TaskTable';
import { useTaskAPI } from '../../hooks/useTaskAPI';


export const List: React.FC = () => {
  const { Tasks, isLoadingGettingTasks, errorFetchingTasks, refetchTasks } = useTaskContext();
  // find way of merging this into task context
  const {updateTaskStatus,myTask} = useTaskAPI()
  const [filteredTasks, setFilteredTasks] = useState<{ notStarted: Task[], inProgress: Task[], done: Task[] }>({
    notStarted: [],
    inProgress: [],
    done: [],
  });


  useEffect(() => {
    myTask.refetchMyTasks()
    if (myTask.MyTasks) {
      const notStarted = myTask.MyTasks.filter((task: Task) => task.taskStatus === "Not Started");
      const inProgress = myTask.MyTasks.filter((task: Task) => task.taskStatus === "Pending");
      const done = myTask.MyTasks.filter((task: Task) => task.taskStatus === "Completed");

      setFilteredTasks({ notStarted, inProgress, done });
    }
  }, [myTask.MyTasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      if (myTask.MyTasks.some((task:Task) => task.taskAssignmentId === Number(active.id))) {
        updateTaskStatus({taskId: Number(active.id), taskStatusId: Number(over.id)})
          .then(() => {
            console.log("Task status updated successfully");
            refetchTasks();
          })
          .catch(error => console.error("Failed to update task status", error));
      }
    }
  };

  if (myTask.isLoadingMyTasks) {
    return <div>Loading...</div>;
  }

  if (myTask.errorFetchingMyTasks) {
    return <div>Error</div>;
  }


  return (<KanbanBoardContainer>
    <DndContext onDragEnd={handleDragEnd}>
          <KanbanColumn title="To Do" id="1" count={filteredTasks.notStarted.length}>
            {filteredTasks.notStarted.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }} >
                  <div className='flex justify-between mb-2'> 
                    <div className="task-detail">
                      <span className="text-gray-900 text-lg font-semibold">{task.taskName}</span>
                    </div>
                    <div className="task-detail ">
                      <span className="text-gray-700 text-sm"> {task.taskProgress}</span>
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
              )
            ))}
          </KanbanColumn>
          <KanbanColumn title="In Progress" id="2" count={filteredTasks.inProgress.length}>
            {filteredTasks.inProgress.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }} >
                  <div className='flex justify-between mb-2'> 
                    <div className="task-detail">
                      <span className="text-gray-900 text-lg font-semibold">{task.taskName}</span>
                    </div>
                    <div className="task-detail ">
                      <span className="text-gray-700 text-sm"> {task.taskProgress}</span>
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

              )
            ))}
          </KanbanColumn>
          <KanbanColumn title="Done" id="6" count={filteredTasks.done.length}>
            {filteredTasks.done.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }} >
                  <div className='flex justify-between mb-2'> 
                    <div className="task-detail">
                      <span className="text-gray-900 text-lg font-semibold">{task.taskName}</span>
                    </div>
                    <div className="task-detail ">
                      <span className="text-gray-700 text-sm"> {task.taskProgress}</span>
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
              )
            ))}
          </KanbanColumn>
          </DndContext>
        </KanbanBoardContainer>
  );
};
