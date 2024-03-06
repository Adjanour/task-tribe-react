// Filename: TaskMePage.tsx

// Importing necessary modules and components
import React, { useEffect, useState } from "react";
import { Card, Col, Divider, FloatButton, Row, Skeleton } from "antd";
import { useTaskAPI } from "@/features/Task-Module/hooks/useTaskAPI";
import { TaskCreateForm } from "@/features/Task-Module/components/Elements/TaskForm/TaskCreateForm";
import TaskUpdateTable from "@/features/Task-Module/components/Elements/TaskUpdateTable";
import TaskTable from "@/features/Task-Module/components/Elements/TaskTable";
import { TaskAssignForm } from "../components/Elements/TaskForm/TaskAssignForm";
import { TaskUpdateForm } from "../components/Elements/TaskForm/TaskUpdateForm";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

// Defining TaskMePage component
const TaskMePage = () => {
  // Using the useTaskAPI hook to fetch tasks and manage task-related data
  const { task, refetchTasks } = useTaskAPI();
  const { Tasks, isLoadingGettingTasks } = task;

  // State to hold filtered tasks for the current user
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Effect to refetch tasks when the component mounts or when Tasks state changes
  useEffect(() => {
    refetchTasks();
  }, []);

  // Effect to filter tasks for the current user when Tasks state changes
  useEffect(() => {
    // Check if tasks have been fetched
    if (Tasks) {
      // Filter tasks for the current user
      const currentUserTasks = Tasks.filter(
        (task: any) => task.taskAssigneeUserId === getCurrentUserId()
      );
      setFilteredTasks(currentUserTasks);
    }
  }, [Tasks]);

  // Function to get the current user ID (for demo purposes)
  const getCurrentUserId = () => {
    return 1;
  };

  const [state, setState] = useState({
    selectedTaskId: "0",
    statusData: { label: "", value: "" },
    taskData: { label: "", value: "" },
    startDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    endDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    loading: false,
    taskUpdates: [],
    pageState: 0,
  });
  // useEffect(() => {
  //   task.refetchTasks();
  // }, [task]);

  const handlePageChange = (newPageState: number) => {
    setState({ ...state, pageState: newPageState });
  };

  // Rendering TaskMePage component
  return (
    <div className=" ">
      <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }}>
        <FloatButton
          tooltip={<div>Create</div>}
          icon={<PlusOutlined />}
          className="p-1"
          onClick={() => handlePageChange(0)}
        />
        <FloatButton
          tooltip={<div>Assign</div>}
          icon={<EditOutlined />}
          className="p-1"
          onClick={() => handlePageChange(1)}
        />
        <FloatButton
          tooltip={<div>Update</div>}
          icon={<EditOutlined />}
          className="p-1"
          onClick={() => handlePageChange(2)}
        />
      </FloatButton.Group>
      <Row className="w-fit">
        <Col span={9}>
          <Card className="h-full p-0">
            <div className="w-full mb-0 md:mb-0 p-0">
              <div className="bg-gray-200 w-full rounded-md mb-2 dark:bg-white dark:text-black">
                {state.pageState === 0 && (
                  <p className="text-2xl">Task Details</p>
                )}
                {state.pageState === 1 && (
                  <p className="text-2xl">Task Assignment</p>
                )}
                {state.pageState === 2 && (
                  <p className="text-2xl">Task Progress Update</p>
                )}
              </div>
              {task.isLoadingGettingTasks ? (
                <Skeleton active />
              ) : (
                <>
                  {state.pageState === 0 && <TaskCreateForm />}
                  {state.pageState === 1 && <TaskAssignForm />}
                  {state.pageState === 2 && (
                    <TaskUpdateForm taskId={state.selectedTaskId} refetchData={refetchTasks} />
                  )}
                </>
              )}
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card className="h-full">
            <div className="w-full mb-0">
              <div className="bg-gray-200 rounded-md mb-0 dark:bg-white dark:text-black">
                <p className="text-2xl">Task Updates</p>
              </div>
              {/* Conditionally rendering task update table */}
              {isLoadingGettingTasks ? (
                <Skeleton active />
              ) : (
                <TaskUpdateTable
                  pageSize={5}
                  tasks={state.taskUpdates}
                  yScroll={295}
                  selectedTask={state.selectedTaskId}
                  refetchData={refetchTasks}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <Divider className="bg-blue-400 m-0" />
      {/* Task Table Card */}
      <Card title="Task Table">
        {/* Conditionally rendering task table */}
        {isLoadingGettingTasks ? (
          <Skeleton active />
        ) : (
          <TaskTable
            tasks={filteredTasks}
            setState={setState}
            pageSize={50}
            yScroll={350}
          />
        )}
      </Card>
    </div>
  );
};

export default TaskMePage;
