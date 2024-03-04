import React from 'react';
import {Table, Badge, Tooltip} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Project} from "@/features/Project-Module";
import {Button} from "@/features/Task-Module/components/Elements/Button";
import { Navigate, useNavigate } from 'react-router-dom';



interface ProjectTableProps {
    projects: Project[];
    yScroll:number;
    pageSize:number;
    setState:any;
}
const GoToButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Tooltip title="Go To Project">
        <Button onClick={onClick} className="bg-blue-500 text-white dark:text-white dark:bg-blue-500 hover:text-white hover:ring-blue-700 rounded-md" text={"Go To"} icon="" />
    </Tooltip>
);

const TeamTable: React.FC<ProjectTableProps> = ({ projects,yScroll,pageSize,setState }) => {

    const nav = useNavigate()

    const handleTaskClick = (teamId: string) => {
        setState((prevState: any) => ({ ...prevState, selectedProjectId: teamId }));
      };

    const openProject = (projectId: string) => {
        nav(`/app/project/${projectId}`, { replace: true });
    }


    const columns: ColumnsType<Project> = [
        {
            title: 'Name',
            dataIndex: 'projectName',
            fixed: 'left',
            width: 120,
            align: 'center',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'projectIsActive',
            render: (text) => (
                <Badge status={text === false ? 'warning' : 'success'} text={text ? "A  ctive" : "In Active"} />
            ),
            width: 150,
            fixed:'left',
            align: 'left',
        },
        
        {
            title: 'Created Date',
            dataIndex: 'projectCreatedDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
       
        {
            title: 'Description',
            dataIndex: 'projectDescription',
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
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <GoToButton onClick={() => handleTaskClick(record.projectId.toString())} />
            )
        }

    ];
   
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
            <Table <Project>
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            openProject(record.projectId.toString());
                        }
                    };
                }}
                style={{height:"100%"}}
                className="mb-0"
                size='middle'
                dataSource={projects}
                rowKey={(record) => record.projectId}
                columns={columns}
                bordered
                pagination={{ pageSize: pageSize }}
                scroll={{ x: '1300',y:yScroll }} />
        </>
    )

};

export default TeamTable;
