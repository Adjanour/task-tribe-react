// TaskDetailsModal.tsx
import React from 'react';
import { Modal } from 'antd';
import {TaskDetailsModalProps} from "@/features/Task-Module";
import { TaskUpdateForm } from './TaskForm/TaskUpdateForm';


const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isVisible, taskId, onClose,refetchData }) => {
    return (
        <Modal className="w-fit" width={600} title="Task Progress Update" open={isVisible} onCancel={onClose} footer={null}>
            <TaskUpdateForm taskId={taskId} refetchData={refetchData} />
        </Modal>
    );
};

export default TaskDetailsModal;
