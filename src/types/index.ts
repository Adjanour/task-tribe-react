// Basic Types
export type Status = {
    id: number;
    name: string;
    isActive: boolean;
  };
  
  export type Priority = {
    id: number;
    name: string;
    isActive: boolean;
  };
  
  export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  
  export type UserProfile = {
    id: number;
    lastLogin: Date;
    email: string;
    userName: string;
    firstName: string;
    otherName?: string;
    lastName: string;
    dateOfBirth: Date;
    isActive: boolean;
    fullName: string;
    profileImage: string;
  };
  
  // Task Related Types
  export type Task = {
    id: number;
    name: string;
    description: string;
    priorityId: number;
    statusId: number;
    assignerId: number;
    assigneeId: number;
    startDate: string;
    createdDate: string;
    endDate: string;
    duration: number;
    progress: string;
    slug?: string;
    assignerFullName: string;
    assigneeFullName: string;
  };
  
  export type TaskData = {
    name: string;
    startDate: string;
    endDate: string;
    statusId: number;
    priorityId: number;
    description: string;
  };
  
  export interface TaskDetailsModalProps {
    isVisible: boolean;
    taskId: string;
    refetchData: any;
    onClose: () => void;
  }
  
  // Custom Date Type
  export type CustomDate = {
    language: string;
    date: Date;
    year: number;
    month: number;
    day: number;
    weekday: number;
    hour: number;
    minute: number;
    second: number;
  };
  
  // Task Post and Put Data
  export interface TaskPostData {
    name: string;
    startDate: CustomDate;
    endDate: CustomDate;
    dueDate: CustomDate;
    assignedBy: number;
    assignedTo: number[];
    statusId: number;
    priorityId: number;
    description: string;
  }
  
  export type TaskPutData = {
    id?: number;
    taskId: number;
    title: string;
    description: string;
    userId: number;
    challenge: string;
    progress: number;
    details: string;
    statusId?: number;
    assignmentId: number;
  };
  
  export type TaskUpdate = {
    id: number;
    title: string;
    details: string;
    assignmentId: number;
    date: string;
    userId: number;
    progress: number;
  };
  
  export type TaskStatusUpdate = {
    id: number;
    statusId?: number;
  };
  
  // Select Component Data Type
  export type SelectComponentData = {
    label: string;
    value: number;
  };
  
  // Communication Related Types
  export type ChatMessage = {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
  };
  
  export type TaskComment = {
    id: number;
    taskId: number;
    userId: number;
    comment: string;
    timestamp: string;
  };
  
  export type ProjectComment = {
    id: number;
    projectId: number;
    userId: number;
    comment: string;
    timestamp: string;
  };
  
  // Activity Log Type
  export type ActivityLog = {
    id: number;
    userId: number;
    action: string;
    targetId: number;
    targetType: 'task' | 'project';
    timestamp: string;
  };
  
  // File and Notification Types
  export type File = {
    id: number;
    name: string;
    url: string;
    uploadedBy: number;
    taskId?: number;
    projectId?: number;
    timestamp: string;
  };
  
  export type Notification = {
    id: number;
    userId: number;
    message: string;
    timestamp: string;
    isRead: boolean;
  };
  
  // API Interfaces
  export interface ChatAPI {
    getMessages(teamId: number): Promise<ChatMessage[]>;
    sendMessage(message: { teamId: number; message: string }): Promise<void>;
  }
  
  export interface CommentAPI {
    getComments(taskId?: number, projectId?: number): Promise<(TaskComment | ProjectComment)[]>;
    addComment(comment: { taskId?: number; projectId?: number; comment: string }): Promise<void>;
  }
  
  export interface ActivityAPI {
    getFeed(userId: number): Promise<ActivityLog[]>;
  }
  
  export interface NotificationAPI {
    getNotifications(userId: number): Promise<Notification[]>;
    markAsRead(notificationId: number): Promise<void>;
  }
  
  export interface FileAPI {
    upload(fileData: { taskId?: number; projectId?: number; file: File }): Promise<void>;
    getFiles(taskId?: number, projectId?: number): Promise<File[]>;
  }
  
  // Component Props Interfaces
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
export interface UserValue {
  label: string;
  value: string;
}

export type TaskRead ={
  taskId : number;
  taskAssigneeUserId: number;
  taskPriorityId: number;	
  taskStatusId: number;	
  taskName: string;	
  taskDescription: string;
  taskStartDate: Date;
  taskDueDate: Date;
  taskCreatedDate: Date;	
  taskLastEditDate: Date;
}

export interface TaskUpdateValue {
  taskUpdateTaskAssignmentId: UserValue;
  taskUpdateTitle: string;
  taskUpdateChallenge: string;
  taskUpdateDetails: string;
  taskUpdateStatusId: number;
  taskUpdateProgress: number;
}


export interface TaskStatus {
  taskStatusId: number;
  taskStatusName: string;
  taskStatusDescription: string;
}

export interface TaskPriority {
  taskPriorityId: number;
  taskPriorityName: string;
  taskPriorityDescription: string;
}

export type TaskCreate = {
  taskId : number;
  taskName : string;
  taskAssigneeUserId : number;
  taskCreatedByUserId : number;
  taskTeamId? : number;
  taskProjectId? : number;
  taskDescription : string;
  taskStartDate : Date;
  taskDueDate : Date;
  taskPriorityId : number;
  taskStatusId : number;
  taskCreatedDate : Date;
}