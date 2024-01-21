// // ProjectForm.tsx
// import React from 'react';
// import { Form, Input, DatePicker, Button } from 'antd';
// import { Project } from '../../types';
//
// interface ProjectFormProps {
//     onSubmit: (values: Project) => void;
// }
//
// export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
//     const [form] = Form.useForm();
//
//     const handleSubmit = (values: Project) => {
//         onSubmit(values);
//         form.resetFields();
//     };
//
//     return (
//         <Form form={form} onFinish={handleSubmit} layout="vertical">
//             <Form.Item label="Project Name" name="projectName" rules={[{ required: true, message: 'Please enter the project name' }]}>
//                 <Input />
//             </Form.Item>
//             <Form.Item label="Start Date" name="projectStartDate" rules={[{ required: true, message: 'Please select the start date' }]}>
//                 <DatePicker />
//             </Form.Item>
//             <Form.Item label="End Date" name="projectEndDate" rules={[{ required: true, message: 'Please select the end date' }]}>
//                 <DatePicker />
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Submit
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };
//
import { useState } from "react";
import {Form, message, notification} from "antd";
import { usePostData } from "@/features/Task-Module/hooks/usePostData";
import ProjectCreateFormContents from "@/features/Project-Module/components/ProjectForm/ProjectFormContents";
import {processDateString} from "@/features/Project-Module/utils/format";

/**
 * Component for creating a task form.
 *
 * @param children - The child components to render within the form.
 */
export function ProjectForm({refetchProjects}:{refetchProjects:()=>void}) {

    const [form] = Form.useForm();
    const date = new Date();
    const [state, setState] = useState({
        loading: false,
    });

    const { postData,isPosting,postError} = usePostData({endpoint:"http://localhost:8000/api/v1/projects/",token:""})

    const onFinish = async (values: any) => {
        console.log("Received values of form: ", values);
        const{projectDescription,projectName,projectStartDate,projectEndDate,projectStatus,projectProjectManagerId} = values

        const data = {
            projectDescription,
            projectName,
            projectStartDate:processDateString(projectStartDate),
            projectEndDate:processDateString(projectEndDate),
            projectStatus,
            projectProjectManagerId,
        }
        console.log(data)
        setState({ ...state, loading: true });
        // const response = await postData(data);

        try {
            const response = await postData(data);
            notification.success({ message: "Project created successfully" });
            console.log("Project created successfully:", values);
            refetchProjects();
            handleClearForm();
        } catch (error) {
            message.error("Error creating project");
            console.error("Error creating project:", error);
        }

        setState({ ...state, loading: isPosting });
    }




    const handleClearForm = () => {
        // Reset form fields to their initial state
        form.resetFields();
    }

    return (
        <div className="w-full">
            <Form form={form} onFinish={onFinish} className=" dark:text-white w-full" requiredMark={false} style={{ margin: '0', padding: '0' }} layout="horizontal">
                <ProjectCreateFormContents
                    handleClearForm={handleClearForm}
                    loading={state.loading}
                    state={state}
                    setState={setState}
                />
            </Form>
        </div>
    );
}


