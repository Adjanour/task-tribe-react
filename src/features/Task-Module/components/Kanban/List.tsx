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
  const {updateTaskStatus} = useTaskAPI()
  const [filteredTasks, setFilteredTasks] = useState<{ notStarted: Task[], inProgress: Task[], done: Task[] }>({
    notStarted: [],
    inProgress: [],
    done: [],
  });

  

  useEffect(() => {
    refetchTasks();
  }, []);

  useEffect(() => {
    if (Tasks) {
      const notStarted = Tasks.filter((task: Task) => task.taskStatus === "Not Started");
      const inProgress = Tasks.filter((task: Task) => task.taskStatus === "Pending");
      const done = Tasks.filter((task: Task) => task.taskStatus === "Completed");

      setFilteredTasks({ notStarted, inProgress, done });
    }
  }, [Tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const updateTaskStatus2 = Tasks.map((task:Task) => {
        if (task.taskAssignmentId === Number(active.id)) {
          console.log("task assignment id");
          console.log(task.taskAssignmentId);
          console.log(over);
          const response = updateTaskStatus({taskId:task.taskAssignmentId,taskStatusId:+over.id.toString()})
          response.then((data)=>console.log("response from update call"))
          .then((response)=>console.log(response))
          refetchTasks();
        }
        return task;
      });
      // const updatedTasks = Tasks.map((task:Task) => {
      //   if (task.taskAssignmentId === Number(active.id)) {
      //     return { ...task, taskStatus: over.id };
      //   }
      //   return task;
      // });
      // setFilteredTasks({
      //   notStarted: updatedTasks.filter((task: Task) => task.taskStatus === "Not Started"),
      //   inProgress: updatedTasks.filter((task: Task) => task.taskStatus === "In Progress"),
      //   done: updatedTasks.filter((task: Task) => task.taskStatus === "Completed"),
      // });
    }
  };

  if (isLoadingGettingTasks) {
    return <div>Loading...</div>;
  }

  if (errorFetchingTasks) {
    return <div>Error</div>;
  }


  return (<KanbanBoardContainer>
    <DndContext onDragEnd={handleDragEnd}>
          <KanbanColumn title="To Do" id="1" count={filteredTasks.notStarted.length}>
            {filteredTasks.notStarted.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }}>
                  {task.taskDescription}
                </KanbanItem>
              )
            ))}
          </KanbanColumn>
          <KanbanColumn title="In Progress" id="2" count={filteredTasks.inProgress.length}>
            {filteredTasks.inProgress.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }}>
                  {task.taskDescription}
                </KanbanItem>
              )
            ))}
          </KanbanColumn>
          <KanbanColumn title="Done" id="6" count={filteredTasks.done.length}>
            {filteredTasks.done.map((task: Task, key) => (
              task.taskAssignmentId !== undefined && (
                <KanbanItem key={key} id={task.taskAssignmentId.toString()} data={{ task }}>
                  {task.taskDescription}
                </KanbanItem>
              )
            ))}
          </KanbanColumn>
          </DndContext>
        </KanbanBoardContainer>
  );
};
