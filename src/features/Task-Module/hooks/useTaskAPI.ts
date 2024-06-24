import { axios } from '@/lib/axios';
import { message } from 'antd';
import { TaskData, TaskPostData, TaskPutData, TaskStatusUpdate } from '@/features/Task-Module/types';
import { processDateString } from '@/features/Task-Module/utils/format';
import { usePostData } from '@/features/Task-Module/hooks/usePostData';
import { useGetData } from '@/hooks/useGetData';
import storage from '@/utils/storage';
import { AuthUser } from '@/features/auth';

export const useTaskAPI = () => {
  const Token = storage.getToken();
  const User: AuthUser = storage.getUser();

  const CommonPostData = (endpoint: string) => usePostData({ endpoint, token: Token });

  const { postData: postTaskStatusUpdate } = CommonPostData('http://localhost:8000/api/v1/task/status/update');
  const { postData: postTaskUpdate } = CommonPostData('http://localhost:8000/api/v1/task-updates/');
  const { postData, isPosting, postError } = CommonPostData('http://localhost:8000/api/v1/tasks/');

  const createTask = async (newTask: TaskData) => {
    try {
      const response = await postData(newTask);
      return response.taskId;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw new Error('Failed to create task');
    }
  };

  const assignTask = async (taskId: number, assigneeId: number, assignerId: number): Promise<number> => {
    try {
      const taskData = { taskId, assigneeUserId: assigneeId, assignerUserId: assignerId };
      const response = await axios.post('/api/v1/task-assignments/', taskData, {
        headers: { Authorization: Token ? `Token ${Token}` : '' },
      });

      if (response.status !== 201) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.status;
    } catch (error) {
      console.error('Failed to assign task:', error);
      throw new Error('Failed to assign task');
    }
  };

  const createAndAssignTask = async (newTask: TaskPostData) => {
    try {
      const {
        taskName,
        taskStartDate,
        taskEndDate,
        taskStatusId,
        taskPriorityId,
        taskDescription,
        assignedBy: taskAssigneeUserId,
        assignedBy: taskCreatedByUserId,
        assignedTo,
        assignedBy,
      } = newTask;

      const Task = {
        taskName,
        taskStartDate: processDateString(taskStartDate),
        taskDueDate: processDateString(taskEndDate),
        taskEndDate: processDateString(taskEndDate),
        taskAssigneeUserId,
        taskCreatedByUserId,
        taskStatusId,
        taskPriorityId,
        taskDescription,
      };

      const taskId = await createTask(Task);
      const assignTaskResponses = assignedTo
        ? await Promise.all(assignedTo.map(assignee => assignTask(taskId, assignee, assignedBy)))
        : [];
      
      return assignTaskResponses[0];
    } catch (e) {
      message.error(`Error creating and assigning task: ${e}`);
    }
  };

  const updateTaskStatus = async (newStatus: TaskStatusUpdate) => {
    try {
      const response = await postTaskStatusUpdate(newStatus);
      if (response.status === 200) return response.message;
      throw new Error('Failed to update task status');
    } catch (error) {
      console.error('Failed to update task status:', error);
      throw new Error('Failed to update task status');
    }
  };

  const addTaskUpdate = async (newUpdate: TaskPutData) => {
    try {
      const { taskUpdateTaskAssignmentId, taskUpdateTitle, taskUpdateChallenge, taskUpdateDetails, taskUpdateStatusId, taskUpdateProgress } = newUpdate;

      if (!taskUpdateTaskAssignmentId) throw new Error('taskUpdateTaskId is required.');
      const taskAssignmentId = typeof taskUpdateTaskAssignmentId === 'object' ? taskUpdateTaskAssignmentId.value : +taskUpdateTaskAssignmentId;

      const data = {
        taskUpdateTaskAssignmentId: taskAssignmentId,
        taskUpdateChallenge,
        taskUpdateTitle,
        taskUpdateProgress,
        taskUpdateDetails,
        taskUpdateUserId: User.id,
      };

      const response = await postTaskUpdate(data);
      await updateTaskStatus({ taskId: taskAssignmentId, taskStatusId: taskUpdateStatusId });
      return response;
    } catch (error) {
      console.error('Failed to add task update:', error);
      throw new Error('Failed to add task update');
    }
  };

  const { data: Tasks, refetchData: refetchTasks, isLoading: isLoadingGettingTasks, error: errorFetchingTasks } = useGetData({
    dataAlias: 'task',
    endpoint: 'http://localhost:8000/api/v1/task-assignments/',
    token: Token,
  });

  const { data: MyTasks, refetchData: refetchMyTasks, isLoading: isLoadingMyTasks, error: errorFetchingMyTasks } = useGetData({
    dataAlias: 'myTask',
    endpoint: 'http://localhost:8000/api/v1/task-assignments/user/',
    token: Token,
  });

  return {
    task: { Tasks, refetchTasks, isLoadingGettingTasks, errorFetchingTasks },
    myTask: { MyTasks, refetchMyTasks, isLoadingMyTasks, errorFetchingMyTasks },
    createTask,
    createAndAssignTask,
    addTaskUpdate,
    assignTask,
    updateTaskStatus,
    MyTasks,
    refetchMyTasks,
    isLoadingMyTasks,
    errorFetchingMyTasks,
    isPosting,
    postError,
  };
};
