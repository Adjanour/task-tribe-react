import React, {useCallback, useEffect, useState} from 'react';
import {Card, Col, Divider, FloatButton, Row, Skeleton} from 'antd';
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useTaskContext} from "@/features/Task-Module/stores/TaskContext";
import {fetchTaskUpdates} from "@/features/Task-Module/utils/functions";
import {TaskCreateForm} from "@/features/Task-Module/components/Elements/TaskForm";
import TaskUpdateTable from "@/features/Task-Module/components/Elements/TaskUpdateTable";
import TaskTable from "@/features/Task-Module/components/Elements/TaskTable";
import { TaskAssignForm } from '../components/Elements/TaskForm/TaskAssignForm';
import { TaskUpdateForm } from '../components/Elements/TaskForm/TaskUpdateForm';

const 
TaskCreatePage = () => {
    const task = useTaskContext();
    const [state,setState] = useState({
        selectedTaskId: "0",
        statusData: { label: "", value: "" },
        taskData: { label: "", value: "" },
        startDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        endDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        loading: false,
        taskUpdates: [],
        pageState: 0
    })
    useEffect(()=>{
        task.refetchTasks()
    },[])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const taskUpdates = await fetchTaskUpdates(state.selectedTaskId);
              setState({ ...state, taskUpdates: taskUpdates });
            } catch (error) {
              console.error("Error fetching task updates:", error);
            }
          };
      
          fetchData();
        }, [state.selectedTaskId]);
      
        const refetchData = async () => {
          try {
            const taskUpdates = await fetchTaskUpdates(state.selectedTaskId);
            setState({ ...state, taskUpdates: taskUpdates });
            task.refetchTasks()
          } catch (error) {
            console.error("Error refetching task updates:", error);
          }
        };

    const handlePageChange = (newPageState:number) => {
        setState({...state,pageState:newPageState})
    }

    return (
        <div className=" ">
            <FloatButton.Group trigger="click" type="primary" style={{ right: 24}}>
                <FloatButton tooltip={<div>Create</div>} icon={<PlusOutlined />} className="p-1"   onClick={() => handlePageChange(0)} />
                <FloatButton tooltip={<div>Assign</div>}  icon={<EditOutlined />} className="p-1" onClick={() => handlePageChange(1)} />
                <FloatButton tooltip={<div>Update</div>}  icon={<EditOutlined />} className="p-1" onClick={() => handlePageChange(2)} />
            </FloatButton.Group>
            <Row className="w-fit">
                <Col span={9}>
                    <Card className="h-full p-0">
                        <div className="w-full mb-0 md:mb-0 p-0">
                            <div className="bg-gray-200 w-full rounded-md mb-2 dark:bg-white dark:text-black">
                                {state.pageState === 0 && <p className="text-2xl">Task Details</p>}
                                {state.pageState === 1 && <p className="text-2xl">Task Assignment</p>}
                                {state.pageState === 2 && <p className="text-2xl">Task Progress Update</p>}
                            </div>
                            {task.isLoadingGettingTasks ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    {state.pageState === 0 && <TaskCreateForm />}
                                    {state.pageState === 1 && <TaskAssignForm />}
                                    {state.pageState === 2 && <TaskUpdateForm taskId={'1'} refetchData={refetchData}/>}
                                </>
                            )}
                        </div>
                    </Card>
                </Col>
                <Col span={15}>
                    <Card className="h-full">
                        <div className="w-full mb-0">
                            <div className="bg-gray-200 rounded-md mb-0 dark:bg-white dark:text-black">
                                <p className="text-2xl">Task  Updates</p>
                            </div>
                            {task.isLoadingGettingTasks ? (
                                <Skeleton active />
                            ) : (
                                <TaskUpdateTable pageSize={5} tasks={state.taskUpdates} yScroll={295} selectedTask={state.selectedTaskId} refetchData={refetchData} />
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Divider className="bg-blue-400 m-0" />
            <Row className="w-full h-1/2">
                <Col span={24}>
                    <Card className="h-full p-1">

                        {task.isLoadingGettingTasks ? (
                            <Skeleton active />
                        ) : (
                            <TaskTable setState={setState} pageSize={50} tasks={task.Tasks} yScroll={350} />
                        )}

                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TaskCreatePage;
