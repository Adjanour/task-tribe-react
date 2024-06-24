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

export type ChatMessage = {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
  }
  
  export type TaskComment = {
    id: number;
    taskId: number;
    userId: number;
    comment: string;
    timestamp: string;
  }
  
  export type ProjectComment = {
    id: number;
    projectId: number;
    userId: number;
    comment: string;
    timestamp: string;
  }
  
  export type ActivityLog = {
    id: number;
    userId: number;
    action: string;
    targetId: number;
    targetType: 'task' | 'project';
    timestamp: string;
  }
  
  export type File = {
    id: number;
    name: string;
    url: string;
    uploadedBy: number;
    taskId?: number;
    projectId?: number;
    timestamp: string;
  }
  
  export type Notification = {
    id: number;
    userId: number;
    message: string;
    timestamp: string;
    isRead: boolean;
  }
  
  export interface ChatAPI {
    getChatMessages(teamId: number): Promise<ChatMessage[]>;
    sendChatMessage(chatMessage: { teamId: number, message: string }): Promise<void>;
  }
  
  export interface CommentAPI {
    getComments(taskId?: number, projectId?: number): Promise<(TaskComment | ProjectComment)[]>;
    addComment(commentData: { taskId?: number, projectId?: number, comment: string }): Promise<void>;
  }
  
  export interface ActivityAPI {
    getActivityFeed(userId: number): Promise<ActivityLog[]>;
  }

  export interface NotificationAPI {
    getNotifications(userId: number): Promise<Notification[]>;
    markAsRead(notificationId: number): Promise<void>;
  }
  
  export interface FileAPI {
    uploadFile(fileData: { taskId?: number, projectId?: number, file: File }): Promise<void>;
    getFiles(taskId?: number, projectId?: number): Promise<File[]>;
  }
  
  export interface ChatProps {
    teamId: number;
  }
  
  export interface CommentsProps {
    taskId?: number;
    projectId?: number;
  }
  
  export interface ActivityFeedProps {
    userId: number;
  }
  
  export interface NotificationsProps {
    userId: number;
  }
  
  export interface FileUploadProps {
    taskId?: number;
    projectId?: number;
  }
  