import React from 'react';
import { Form, Input, Button } from 'antd';

interface ProjectTeamFormProps {
    projectId: number;
}

export const ProjectTeamForm: React.FC<ProjectTeamFormProps> = ({ projectId }) => {
    const onFinish = (values: any) => {
        // Handle form submission, e.g., create/update project teams
        console.log('Received values:', values);
    };

    return (
        <Form name="projectTeamForm" onFinish={onFinish}>
            <Form.Item label="Team Name" name="teamName" rules={[{ required: true, message: 'Please enter team name' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Team Description" name="teamDescription">
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save Team
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProjectTeamForm;
