import React from 'react';
import { Table } from 'antd';

interface TeamTableProps {
    setState: any; // Add the appropriate type for setState
    pageSize: number;
    teams: any[]; // Add the appropriate type for teams
    yScroll: number;
}

const columns = [
    {
        title: 'Team Name',
        dataIndex: 'teamName',
        key: 'teamName',
    },
    {
        title: 'Team Description',
        dataIndex: 'teamDescription',
        key: 'teamDescription',
    },
    // Add more columns as needed
];

export const TeamTable: React.FC<TeamTableProps> = ({ setState, pageSize, teams, yScroll }) => {
    // Adjust the dataSource based on the structure of the teams data
    const dataSource = teams.map((team) => ({ ...team, key: team.teamId }));

    return <Table columns={columns} dataSource={dataSource} pagination={{ pageSize }} scroll={{ y: yScroll }} />;
};

export default TeamTable;
