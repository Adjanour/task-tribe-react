import React from 'react';
import {Table, Badge, Tooltip} from 'antd';
import type { ColumnsType } from 'antd/es/table';


export type Team = {
   teamIdpk:number,
   teamName: string,
   teamDescription: string,
   teamIsActive : boolean,
   teamCreatedDate: string,
   teamUpdatedDate: string
}
interface TeamTableProps {
    teams: Team[];
    yScroll:number;
    pageSize:number;
    setState:any;
}

const TeamTable: React.FC<TeamTableProps> = ({ teams,yScroll,pageSize,setState }) => {

    const handleTaskClick = (taskId: string) => {
        setState((prevState: any) => ({ ...prevState, selectedTaskId: taskId }));
      };


    const columns: ColumnsType<Team> = [
        {
            title: 'Name',
            dataIndex: 'teamName',
            fixed: 'left',
            width: 120,
            align: 'center',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'teamIsActive',
            render: (text) => (
                <Badge status={text === false ? 'warning' : 'success'} text={text ? "A  ctive" : "In Active"} />
            ),
            width: 150,
            fixed:'left',
            align: 'left',
        },
        
        {
            title: 'Created Date',
            dataIndex: 'teamCreatedDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
       
        {
            title: 'Description',
            dataIndex: 'teamDescription',
            width: 1000,
            ellipsis: true,
            render: (text) => (
                <Tooltip  className="bg-white-500 text-black dark:text-white dark:bg-black" title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },

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
            <Table <Team>
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            handleTaskClick(record.teamIdpk.toString());
                        }
                    };
                }}
                className="mb-0"
                size='middle'
                dataSource={teams}
                rowKey={(record) => record.teamIdpk}
                columns={columns}
                bordered
                pagination={{ pageSize: pageSize }}
                scroll={{ x: '1300',y:yScroll }} />
        </>
    )

};

export default TeamTable;
