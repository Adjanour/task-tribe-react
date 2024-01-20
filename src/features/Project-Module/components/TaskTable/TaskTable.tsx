import React from 'react';
import { Table } from 'antd';
import {useTaskAPI} from "@/features/Task-Module/hooks/useTaskAPI";

interface TaskTableProps {
    projectId: number;
}

const columns = [
    {
        title: 'Task Name',
        dataIndex: 'taskName',
        key: 'taskName',
    },
    {
        title: 'Task Description',
        dataIndex: 'taskDescription',
        key: 'taskDescription',
    },
    // Add more columns as needed
];

export const TaskTable: React.FC<TaskTableProps> = ({ projectId }) => {
    // Fetch tasks based on projectId and populate dataSource
    const tasks = useTaskAPI()
    const dataSource: any[] = [];

    return <Table columns={columns} pagination={{pageSize:5}} dataSource={tasks.task.Tasks} />;
};

export default TaskTable;
