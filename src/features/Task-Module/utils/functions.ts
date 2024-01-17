// dataFetchers.ts
import {axios}  from '@/lib/axios';
import {Priority, Status, TaskUpdate} from "@/features/Task-Module/types";

export interface UserValue {
    label: string;
    value: string;
}

export async function fetchTaskStatus(param: string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/tasks/${param}`);
    const { taskStatus, taskStatusId } = res.data;
    return { label: taskStatus, value: taskStatusId };
}
export async function fetchTaskDescription(param: string): Promise<{taskDescription:string}> {
    const res = await axios.get(`/api/v1/tasks/${param}`);
    const { taskDescription } = res.data.taskDescription;
    return taskDescription;
}
export async function fetchTaskAssigner(param: string): Promise<UserValue> {
    const res = await axios.get(`/user/task-details/${param}`);
    const { AssignerFullName, tkaAssigner_id } = res.data[0];
    return { label: AssignerFullName, value: tkaAssigner_id };
}
export async function fetchTaskAssignees(param: string): Promise<UserValue[]> {
    const res = await axios.get(`user/task-details/${param}`);
    return res.data.map( ({tkaAssignee_id,fullName}:Task) => ({
        label: fullName, value: tkaAssignee_id,
    }))
}

export async function fetchTask(param: string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/tasks/${param}`);
    const { taskName, taskId } = res.data;
    return { label: taskName, value: taskId };
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
    taskSlug: string | null;
}

export async function fetchTaskPriority(param:string): Promise<UserValue> {
    const res = await axios.get(`/api/v1/priorities/${param}`)
    const { priorityName, priorityId } = res.data;
    return { label: priorityName, value: priorityId };
}
export async function fetchTasks(): Promise<UserValue[]> {
    const res = await axios.get('/api/v1/tasks')
    return res.data.map( ({taskId,taskName}:Task) => ({
        label: `${taskName}`,
        value: taskId,
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
    const res = await axios.get('/api/v1/priorities/')
    return res.data.map( ({priorityId,priorityName}:Priority) => ({
        label: `${priorityName}`,
        value: priorityId,
    }))
}
export async function fetchUsers(): Promise<UserValue[]> {
    const res = await axios.get('/api/v1/users')
    return res.data.map( ({id,firstName,lastName}:{id:number,email:string,firstName:string,lastName:string}) => ({
        label: `${firstName} ${lastName}`,
        value: id,
    }))

}