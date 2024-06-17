export type Status = {
    statusId: number;
    statusName:string;
    statusIsActive:boolean;
}

export type Priority = {
    priorityId: number;
    priorityName:string;
    priorityIsActive:boolean;
}

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

export type UserProfile = {
  id: number;
  last_login: Date;
  email: string;
  userName: string;
  firstName: string;
  otherName: string;
  lastName: string;
  dateOfBirth: Date;
  isActive: boolean;
  fullName: string;
  profileImage: string;
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
    tkaId: number;
    tkaTaskId: number;
    fullName: string;
    taskDuration: number;
    taskProgress: string;
    taskSlug: string | null;
}

export interface TaskDetailsModalProps {
    isVisible: boolean;
    taskId: string;
    refetchData:any;
    onClose: () => void;
}


export type SelectComponentData= {
    label:string;
    value:number;
}

export type TaskData = {
    taskName : string;
    taskStartDate:string;
    taskEndDate:string;
    taskStatusId:number;
    taskPriorityId:number;
    taskDescription:string;
}
export interface TaskPostData{
    taskName : string;
    taskStartDate:CustomDate;
    taskEndDate:CustomDate;
    taskDueDate:CustomDate;
    assignedBy:number;
    assignedTo:number[];
    taskStatusId:number;
    taskPriorityId:number;
    taskDescription:string;
}

export type CustomDate = {
    "$L": string;  // Language
    "$u"?: undefined;  // Some property with undefined value
    "$d": Date;  // Date object
    "$y": number;  // Year
    "$M": number;  // Month
    "$D": number;  // Day
    "$W": number;  // Weekday
    "$H": number;  // Hour
    "$m": number;  // Minute
    "$s": number;  // Second
}

export type  TaskPutData ={
    taskId?:number;
    taskUpdateTaskId:SelectComponentData|number;
    taskUpdateTitle:string;
    taskUpdateDescription:string;
    taskUpdateUser:number;
    taskUpdateChallenge:string;
    taskUpdateProgress:number;
    taskUpdateDetails:string;
    taskUpdateStatusId?:number;
    taskUpdateTaskAssignmentId:SelectComponentData|number;
}
export type TaskUpdate = {
    taskUpdateId: number;
    taskUpdateTitle: string;
    taskUpdateDetails: string;
    taskUpdateTaskAssignmentId: number;
    taskUpdateDate: string;
    taskUpdateUserId: number;
    taskUpdateProgress: number;
};

export type TaskStatusUpdate = {
    taskId : number;
    taskStatusId?:number;
}