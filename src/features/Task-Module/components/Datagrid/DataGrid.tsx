import React from "react";
import TaskTable from "../Elements/TaskTable";
import { useTaskContext } from "../../stores/TaskContext";
import { Spinner } from "@/components/Elements";
import { Skeleton } from "antd";

export const DataGrid = () => {
  const taskContext = useTaskContext();

  React.useEffect(() => {
    taskContext.refetchTasks();
  }, []);

  if (taskContext.isLoadingGettingTasks) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      {taskContext.isLoadingGettingTasks ? (
        <Skeleton active />
      ) : (
        <TaskTable
          tasks={taskContext.Tasks}
          yScroll={5000}
          pageSize={50}
          setState={undefined}
        />
      )}
    </>
  );
};
