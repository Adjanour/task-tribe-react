import React from 'react';
import {Table, Badge, Tooltip, Progress} from 'antd';
import type { ColumnsType } from 'antd/es/table';


export type Task = {
    key:React.Key;
    taskId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    taskStatus: string;
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
interface TaskTableProps {
    tasks: Task[];
    yScroll:number;
    pageSize:number;
    state:any;
    setState:any;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks,yScroll,pageSize,setState,state }) => {

    const handleTaskClick = (taskId: string) => {
        setState({...state,selectedTaskId:taskId});
    };



    const columns: ColumnsType<Task> = [
        {
            title: 'Name',
            dataIndex: 'taskName',
            fixed: 'left',
            width: 120,
            align: 'center',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'taskStatus',
            render: (text) => (
                <Badge status={text === 'Not Started' ? 'warning' : 'success'} text={text} />
            ),
            width: 150,
            fixed:'left',
            align: 'left',
            filters: [
                {
                    text: 'Not Started',
                    value: 'Not Started',
                },
                {
                    text: 'In Progress',
                    value: 'In Progress',
                },
                {
                    text: 'Ended',
                    value: 'Ended',
                },
            ],
        },
        {
            title: 'Progress',
            dataIndex: 'taskProgress',
            width: 150,
            align: 'left',
            fixed:'left',
            defaultSortOrder: 'descend',
            sorter: (a, b) => +a.taskProgress - +b.taskProgress,
            key: 'taskProgress',
            render: (progress) => (
                <Progress percent={progress} style={{width:'75%'}} size={[150,25]} format={() => `${progress}%`} showInfo status={getStatus(progress)} />
            ),
        },

        {
            title: 'Assigned To',
            dataIndex: 'fullName',
            width: 200,
            fixed:'left',
            align: 'left',
        },
        {
            title: 'Assigned By',
            dataIndex: 'AssignerFullName',
            width: 200,
            fixed:'left',
            align: 'left',
        },
        {
            title: 'Start Date',
            dataIndex: 'taskStartDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
        {
            title: 'End Date',
            dataIndex: 'taskEndDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
        {
            title: 'Description',
            dataIndex: 'taskDescription',
            width: 1000,
            ellipsis: true,
            render: (text) => (
                <Tooltip  className="bg-white-500 text-black dark:text-white dark:bg-black" title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },

    ];
    const getStatus = (progress:string) => {
        if (+progress === 100) {
            return 'success';
        } else if (+progress > 70) {
            return 'active';
        } else {
            return 'exception';
        }
    };
    const formatDate = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <>
            <Table <Task>
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            handleTaskClick(record.taskId.toString());
                        }
                    };
                }}
                className="mb-0"
                size='middle'
                dataSource={tasks}
                rowKey={(record) => record.taskId}
                columns={columns}
                bordered
                pagination={{ pageSize: pageSize }}
                scroll={{ x: '1300',y:yScroll }} />
        </>
    )

};

export default TaskTable;
