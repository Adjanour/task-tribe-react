import {axios}  from '@/lib/axios';
import {message} from "antd";
import {TaskData, TaskPostData, TaskPutData} from "@/features/Task-Module/types";
import {processDateString} from "@/features/Task-Module/utils/format";
import {usePostData} from "@/features/Task-Module/hooks/usePostData";
import {useGetData} from "@/hooks/useGetData";
import storage from "@/utils/storage";


/**
 * Custom hook for interacting with the task API.
 *
 * @returns An object containing data and functions related to tasks.
 */
export const useTaskAPI = () => {
    // Retrieve token from local storage
   const Token = storage.getToken()

    /**
     * Creates and assigns a task.
     *
     * @param newTask - The data for the new task.
     * @returns A string representation of the response.
     */
    const createAndAssignTask = async (newTask: TaskPostData) => {
        try {
            // Destructure the properties from newTask
            const {
                taskName,
                taskStartDate,
                taskEndDate,
                taskStatusId,
                taskPriorityId,
                taskDescription,
            } = newTask;

            // Process the start and end date strings
            const startDate = processDateString(taskStartDate);
            const endDate = processDateString(taskEndDate);

            // Create the new task object
            const Task = {
                taskName,
                taskStartDate: startDate,
                taskEndDate: endDate,
                taskStatusId,
                taskPriorityId,
                taskDescription
            };

            // Create the task and get the task ID
            const taskId = await createTask(Task);

            // Assign the task to the assignees
            const { assignedTo, assignedBy } = newTask;
            console.log(assignedTo);
            if (assignedTo) {
                for (const assignee of assignedTo) {
                    const response = await assignTask(taskId, assignee, assignedBy);
                    return response.toString();
                }
            }
        } catch (e) {
            return message.error(`Error creating and assigning task ${e}`);
        }
    };
    const { postData:postTaskUpdate,postError:TaskUpdateError } = usePostData({
        endpoint: 'http://localhost:8000/api/user/task/update/',
        token: Token
    });
    const { postData, isPosting, postError, } = usePostData({
        endpoint: 'http://localhost:8000/api/user/task/create/',
        token: Token
    });
    /**
     * Create a new task.
     *
     * @param newTask - The data for the new task.
     * @returns The ID of the created task.
     */
    const createTask = async (newTask: TaskData) => {
        // Send a POST request to create a new task.
        const response = await postData(newTask);

        // Return the ID of the created task.
        return response.taskId;
    }
    /**
     * Assigns a task to an assignee.
     *
     * @param taskId - The ID of the task to be assigned.
     * @param assigneeId - The ID of the assignee.
     * @param assignerId - The ID of the assigner.
     * @returns The HTTP status code of the response.
     * @throws An error if the task assignment fails.
     */
    const assignTask = async (taskId: number, assigneeId: number, assignerId: number): Promise<number> => {
        try {
            const taskData = {
                tkaTask: taskId,
                tkaAssignee: assigneeId,
                tkaAssigner: assignerId,
            };

            console.log(taskData);

            const response = await axios.post(
                "/user/tasks/",
                taskData,
                {
                    headers: {
                        Authorization: Token ? `Token ${Token}` : ""
                    }
                }
            );

            if (response.status !== 201) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.status;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to assign task');
        }
    };

    const addTaskUpdate = async (newUpdate: TaskPutData) => {
        const {
            taskUpdateTaskId,
            taskUpdateTitle,
            taskUpdateChallenge,
            taskUpdateDescription,
            // taskUpdateUser,
            taskUpdateProgress
        } = newUpdate;
    
        // Validate taskUpdateTaskId
        if (!taskUpdateTaskId) {
            throw new Error('taskUpdateTaskId is required.');
        }
    
        // Convert taskUpdateTaskId to a number
        const taskId = typeof taskUpdateTaskId === 'object' ? taskUpdateTaskId.value : +taskUpdateTaskId;
    
        // Create the data object
        const data = {
            taskUpdateTaskId: taskId,
            taskUpdateChallenge,
            taskUpdateTitle,
            taskUpdateProgress,
            taskUpdateDescription,
            taskUpdateUser: 1 // Assuming a default value
        };
    
        // Call the API to post the task update
        const response = await postTaskUpdate(data);
        
        return response;
    };
    

    const {data:Tasks, refetchData: refetchTasks, isLoading:isLoadingGettingTasks, error:errorFetchingTasks} = useGetData({
            dataAlias: "task",
            endpoint: "http://localhost:8000/api/user/tasks",
            token: Token,
    });
    const task = {
        Tasks,
        refetchTasks,
        isLoadingGettingTasks,
        errorFetchingTasks
    }

    return {task,refetchTasks,createTask,createAndAssignTask,addTaskUpdate,assignTask,isPosting }
}



