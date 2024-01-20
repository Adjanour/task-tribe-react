// ProjectDetails.tsx
import React from 'react';
import { Descriptions } from 'antd';
import { Project } from '../../types';

interface ProjectDetailsProps {
    project: Project;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
    return (
        <Descriptions layout="vertical" className="w-full" bordered>
            <Descriptions.Item label="Project Name">{project.projectName}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{project.projectStartDate}</Descriptions.Item>
            <Descriptions.Item label="End Date">{project.projectEndDate}</Descriptions.Item>
            {/* Add more details as needed */}
        </Descriptions>
    );
};

