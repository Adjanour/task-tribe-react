import { useState } from "react";
import {Form, message, notification} from "antd";
import {useTaskAPI} from "@/features/Task-Module/hooks/useTaskAPI";
import {useTaskContext} from "@/features/Task-Module/stores/TaskContext";
import { TeamCreateFormContents } from "./TeamCreateFormContents";
import { usePostData } from "@/features/Task-Module/hooks/usePostData";
 
/**
 * Component for creating a task form.
 *
 * @param children - The child components to render within the form.
 */
export function TeamCreateForm({refetchTeams}:{refetchTeams:()=>void}) {

    const [form] = Form.useForm();
    const date = new Date();
    const [state, setState] = useState({
        loading: false,
    });

    const { postData,isPosting,postError} = usePostData({endpoint:"http://localhost:8000/api/user/team/",token:""})

    const onFinish = async (values: any) => {

        
        setState({ ...state, loading: true });
        const response = await postData(values);

        if (postError) {
            message.error("Error creating task");
            console.error("Error creating task:", postError);
        } else {
            notification.success({ message: "Team created successfully" });
            console.log("Team created successfully:", values);
            refetchTeams();
            handleClearForm();
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
                <TeamCreateFormContents
                    handleClearForm={handleClearForm}
                    loading={state.loading}
                    state={state}
                    setState={setState}
                   />
            </Form>
        </div>
    );
}


