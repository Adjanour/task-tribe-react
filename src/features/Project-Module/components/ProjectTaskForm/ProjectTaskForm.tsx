import React from 'react';
import { Form, Input, Button } from 'antd';

interface ProjectTaskFormProps {
    projectId: number;
}

export const ProjectTaskForm: React.FC<ProjectTaskFormProps> = ({ projectId }) => {
    const onFinish = (values: any) => {
        // Handle form submission, e.g., create/update project tasks
        console.log('Received values:', values);
    };

    return (
        <Form name="projectTaskForm" onFinish={onFinish}>
            <Form.Item label="Task Name" name="taskName" rules={[{ required: true, message: 'Please enter task name' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Task Description" name="taskDescription">
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save Task
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProjectTaskForm;
