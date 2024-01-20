// dataFetchers.ts
import {axios} from '@/lib/axios';
import {Priority, Status, TaskUpdate} from "@/features/Task-Module/types";

export interface UserValue {
    label: string;
    value: string;
}

/**
 * Fetches the task status for a given parameter.
 *
 * @param param - The parameter to fetch the task status for.
 * @returns The task status value.
 */
export async function fetchTaskStatus(param: string): Promise<UserValue> {
    // Make a GET request to the API endpoint to fetch the task status
    const res = await axios.get(`/api/v1/task-assignments/${param}`);

    // Extract the task status and task status ID from the response data
    const { taskStatus, taskStatusId } = res.data;

    // Return the task status value
    return { label: taskStatus, value: taskStatusId };
}
/**
 * Fetches the task description for a given parameter.
 *
 * @param param - The parameter used to fetch the task description.
 * @returns A promise that resolves to an object containing the task description.
 * @throws An error if there is an issue fetching the task description.
 */
export async function fetchTaskDescription(param: string): Promise<{taskDescription: string}> {
    try {
        // Make a GET request to the API endpoint with the provided parameter
        const res = await axios.get(`/api/v1/task-assignments/${param}`);

        // Extract the task description from the response data
        const { taskDescription } = res.data;

        // Return an object containing the task description
        return { taskDescription };
    } catch (error) {
        // Log the error and throw it to the caller
        console.error("Error fetching task description:", error);
        throw error;
    }
}
export async function fetchTaskAssigner(param: string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/task-assignments/${param}`);
    const { taskAssignerName,taskAssignerUserId } = res.data[0];
    return { label: taskAssignerName, value: taskAssignerUserId };
}
export async function fetchTaskAssignees(param: string): Promise<UserValue[]> {
    const res = await axios.get(`api/v1/task-assignments/${param}`);
    return res.data.map( ({taskAssigneeName,taskAssigneeUserId}:Task) => ({
        label: taskAssigneeName, value: taskAssigneeUserId
    }))
}

export async function fetchTask(param: string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/tasks/${param}`);
    const { taskName, taskId } = res.data;
    return { label: taskName, value: taskId };
}
export async function fetchTaskAssignment(param: string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/task-assignments/${param}`);
    const { taskName, taskId } = res.data;
    return {label: taskName, value: taskId};
}
export async function fetchTaskUpdates(param: string): Promise<TaskUpdate[]|any> {
    const res = await axios.get(`/api/v1/task-updates/${param}`);
    return res.data
}

export type Task = {
    taskId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    taskPriorityId:number;
    taskStatus: string;
    taskStatusId:number;
    tkaAssignerId: number;
    taskStartDate: string;
    taskCreatedDate: string;
    taskEndDate: string;
    assignerFullName: string;
    tkaAssigneeId: number;
    tkaAssignee_id: number;
    tkaId: number;
    tkaTaskId: number;
    fullName: string;
    taskDuration: number;
    taskProgress: string;
    taskAssigneeName:string;
    taskAssigneeUserId:string;
    taskAssignerName:string;
    taskAssignerUserId:string;
    taskSlug: string | null;
}
interface TaskAssignment {
    taskAssignmentId: number;
    taskId: number;
    taskStatusId: number;
    taskPriorityId: number;
    taskName: string;
    taskDescription: string;
    taskStartDate: string;
    taskDueDate: string;
    taskCreatedDate: string;
    taskProgress: string;
    taskAssignedDate: string;
    taskPriority: string;
    taskStatus: string;
    taskAssignerUserId: number;
    taskAssigneeUserId: number;
    taskAssigneeName: string;
    taskAssignerName: string;
}
export async function fetchTaskPriority(param:string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/tasks/${param}`)
    const { taskPriority, taskPriorityId } = res.data;
    return { label: taskPriority, value: taskPriorityId };
}
export async function fetchTasks(): Promise<UserValue[]> {
    const res = await axios.get('/api/v1/tasks')
    return res.data.map( ({taskId,taskName}:Task) => ({
        label: `${taskName}`,
        value: taskId,
    }))
}
export async function fetchTaskAssignemnts(): Promise<UserValue[]> {
    const res = await axios.get('/api/v1/task-assignments')
    return res.data.map( ({taskAssignmentId,taskName}:TaskAssignment) => ({
        label: `${taskName}`,
        value: taskAssignmentId,
    }))
}
export async function fetchTaskStatuses(): Promise<UserValue[]> {

    const res = await axios.get('/api/v1/statuses/')
    return res.data.map( ({statusId,statusName}:Status) => ({
        label: `${statusName}`,
        value: statusId,
    }))

}
export async function fetchTaskPriorities(): Promise<UserValue[]> {
    const res = await axios.get('api/v1/priorities/')
    return res.data.map( ({priorityId,priorityName}:Priority) => ({
        label: `${priorityName}`,
        value: priorityId,
    }))
}
/**
 * Fetches users from the API and returns an array of UserValue objects.
 * Each UserValue object contains the user's label and value.
 *
 * @returns {Promise<UserValue[]>} An array of UserValue objects.
 */
export async function fetchUsers(): Promise<UserValue[]> {
    const res = await axios.get('/api/v1/users');

    // Map the response data to create an array of UserValue objects
    return res.data.map(({id, firstName, lastName}: {
        id: number,
        email: string,
        firstName: string,
        lastName: string
    }) => ({
        label: `${lastName} ${firstName}`,
        value: id,
    }));
}