import React from 'react';
import {Table, Badge, Tooltip, Progress, Popconfirm,notification} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Button} from "@/features/Task-Module/components/Elements/Button";
import axios from 'axios';


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
    taskAssignmentId:number;
}
interface TaskTableProps {
    tasks: Task[];
    yScroll:number;
    pageSize:number;
    setState:any;
}

const EditTaskButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Tooltip title="Edit Task">
        <Button onClick={onClick} className="bg-blue-500 text-white dark:text-white dark:bg-blue-500 hover:text-white rounded-md" text={"Edit Task"} icon="+" />
    </Tooltip>
);

const DeleteTaskButton: React.FC<{ onClick: () => void}> =({onClick})=>(
    <Tooltip title="Delete Task">
          <Popconfirm title="Sure to delete?" onConfirm={onClick}>
            <Button  style={{backgroundColor:"red"}}  className=" text-white  dark:text-white dark:bg-black hover:text-white rounded-md" text={"Delete Task"} icon="-"/>
          </Popconfirm>
    </Tooltip>
);


type Status = 'Not Started' | 'In Progress' | 'Completed' | 'Cancelled'; // Add more statuss
type StatusColor = 'warning' | 'processing' | 'success' | 'error';
/**
 * Maps the status values to their corresponding colors.
 * @param status - The status value.
 * @returns The color associated with the given status.
 */
const getStatusColor = (status: Status): StatusColor => {
    // Define a mapping of status values to colors
    const statusColorMap: Record<string, "warning" | "processing" | "success" | "error"> = {
        'Not Started': 'warning',
        'In Progress': 'processing',
        'Pending': 'warning',
        'Started': 'processing',
        'Completed': 'success',
        'Cancelled': 'error',
        // Add more status-color mappings as needed
    };

    // Use the mapping to get the color for the given status
    return statusColorMap[status] || 'default';
};


const TaskTable: React.FC<TaskTableProps> = ({ tasks,yScroll,pageSize,setState }) => {

    const handleTaskClick = (taskId: string) => {
        setState((prevState: any) => ({ ...prevState, selectedTaskId: taskId }));
      };
    
    const deleteTask = async (taskId: string) => {
        const response = await axios.delete(`http://localhost:8000/api/v1/task-assignments/${taskId}`)
        if (response.status === 200){
            notification.success({message:"Task Deleted Successfully"})
        }
    }

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
                <Badge status={getStatusColor(text)} text={text} />
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
            fixed: 'left',
            defaultSortOrder: 'descend',
            sorter: (a, b) => parseFloat(a.taskProgress) - parseFloat(b.taskProgress),
            render: (progress) => (
              <Progress
                percent={+parseFloat(progress).toFixed(2)}
                style={{ width: '75%' }}
                size={[150, 25]}
                format={() => `${parseFloat(progress)}%`}
                showInfo
                status={getStatus(progress)}
              />
            ),
          },

        {
            title: 'Assigned To',
            dataIndex: 'taskAssigneeName',
            width: 200,
           
            align: 'left',
        },
        {
            title: 'Assigned By',
            dataIndex: 'taskAssignerName',
            width: 200,
            
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
            dataIndex: 'taskDueDate',
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
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 150,
            render: () => (<EditTaskButton onClick={() => handleTaskClick('1')} />)
        },
        {
            title:'Action',
            key:'Delete',
            fixed:'right',
            align: 'center',
            width: 150,
            render: (text, record, index) =>(<DeleteTaskButton onClick={() => deleteTask(record.taskAssignmentId.toString())}/>)
        }
    ];
    const getStatus = (progress: string) => {
        if (parseFloat(progress) === 100) {
          return 'success';
        } else if (parseFloat(progress) > 70) {
          return 'active';
        } else {
          return 'exception';
        }
      };
    const formatDate = (date: string) => {
        console.log(date)
        const newDate = new Date(date);
        console.log(newDate)
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
                            handleTaskClick(record.taskAssignmentId.toString());
                        }
                    };
                }}
                className="mb-0"
                size='middle'
                dataSource={tasks}
                rowKey={(record) => record.taskAssignmentId}
                columns={columns}
                bordered
                pagination={{ pageSize: pageSize }}
                scroll={{ x: '1300',y:yScroll }} />
        </>
    )

};

export default TaskTable;
