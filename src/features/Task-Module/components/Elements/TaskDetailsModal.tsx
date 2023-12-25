// TaskDetailsModal.tsx
import React from 'react';
import { Modal } from 'antd';
import {TaskCreateForm} from "@/features/Task-Module/components/Elements/TaskForm";
import {TaskDetailsModalProps} from "@/features/Task-Module";




const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isVisible, taskId, onClose,refetchData }) => {
    return (
        <Modal className="w-fit" width={600} title="Task Progress Update" open={isVisible} onCancel={onClose} footer={null}>
            <TaskCreateForm />
        </Modal>
    );
};

export default TaskDetailsModal;
