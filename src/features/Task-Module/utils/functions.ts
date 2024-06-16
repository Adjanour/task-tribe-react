import { axios } from '@/lib/axios';
import { Priority, Status, TaskUpdate } from "@/features/Task-Module/types";

export interface UserValue {
    label: string;
    value: string;
}

/**
 * Handles errors from API requests.
 *
 * @param error - The error object.
 * @throws The provided error.
 */
const handleError = (error: any) => {
    console.error("API request error:", error);
    throw error;
}

/**
 * Fetches the task status for a given parameter.
 *
 * @param param - The parameter to fetch the task status for.
 * @returns The task status value.
 */
export async function fetchTaskStatus(param: string): Promise<UserValue|undefined> {
    try {
        const res = await axios.get(`/api/v1/task-assignments/${param}`);
        const { taskStatus, taskStatusId } = res.data;
        return { label: taskStatus, value: taskStatusId };
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches the task description for a given parameter.
 *
 * @param param - The parameter used to fetch the task description.
 * @returns A promise that resolves to an object containing the task description.
 */
export async function fetchTaskDescription(param: string): Promise<{ taskDescription: string }|undefined> {
    try {
        const res = await axios.get(`/api/v1/task-assignments/${param}`);
        const { taskDescription } = res.data;
        return { taskDescription };
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskAssigner(param: string): Promise<UserValue|undefined> {
    try {
        const res = await axios.get(`/api/v1/task-assignments/${param}`);
        const { taskAssignerName, taskAssignerUserId } = res.data[0];
        return { label: taskAssignerName, value: taskAssignerUserId };
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskAssignees(param: string): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get(`/api/v1/task-assignments/${param}`);
        return res.data.map(({ taskAssigneeName, taskAssigneeUserId }: Task) => ({
            label: taskAssigneeName,
            value: taskAssigneeUserId,
        }));
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTask(param: string): Promise<UserValue|undefined> {
    try {
        const res = await axios.get(`/api/v1/tasks/${param}`);
        const { taskName, taskId } = res.data;
        return { label: taskName, value: taskId };
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskAssignment(param: string): Promise<UserValue|undefined> {
    try {
        const res = await axios.get(`/api/v1/task-assignments/${param}`);
        const { taskName, taskId } = res.data;
        return { label: taskName, value: taskId };
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskUpdates(param: string): Promise<TaskUpdate[] | any> {
    try {
        const res = await axios.get(`/api/v1/task-updates/${param}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export type Task = {
    taskId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    taskPriorityId: number;
    taskStatus: string;
    taskStatusId: number;
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
    taskAssigneeName: string;
    taskAssigneeUserId: string;
    taskAssignerName: string;
    taskAssignerUserId: string;
    taskSlug: string | null;
}

export interface TaskAssignment {
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

export async function fetchTaskPriority(param: string): Promise<UserValue|undefined> {
    try {
        const res = await axios.get(`/api/v1/tasks/${param}`);
        const { taskPriority, taskPriorityId } = res.data;
        return { label: taskPriority, value: taskPriorityId };
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTasks(): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get('/api/v1/tasks');
        return res.data.map(({ taskId, taskName }: Task) => ({
            label: `${taskName}`,
            value: taskId,
        }));
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskAssignments(): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get('/api/v1/task-assignments');
        return res.data.map(({ taskAssignmentId, taskName }: TaskAssignment) => ({
            label: `${taskName}`,
            value: taskAssignmentId,
        }));
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskStatuses(): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get('/api/v1/statuses/');
        return res.data.map(({ statusId, statusName }: Status) => ({
            label: `${statusName}`,
            value: statusId,
        }));
    } catch (error) {
        handleError(error);
    }
}

export async function fetchTaskPriorities(): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get('api/v1/priorities/');
        return res.data.map(({ priorityId, priorityName }: Priority) => ({
            label: `${priorityName}`,
            value: priorityId,
        }));
    } catch (error) {
        handleError(error);
    }
}

/**
 * Fetches users from the API and returns an array of UserValue objects.
 * Each UserValue object contains the user's label and value.
 *
 * @returns {Promise<UserValue[]>} An array of UserValue objects.
 */
export async function fetchUsers(): Promise<UserValue[]|undefined> {
    try {
        const res = await axios.get('/api/v1/user-details/');
        return res.data.map(({ userId, userName }: { userId: number; userName: string }) => ({
            label: userName,
            value: userId,
        }));
    } catch (error) {
        handleError(error);
    }
}
