import { useState } from "react";
import {Form, message} from "antd";
import {useTaskAPI} from "@/features/Task-Module/hooks/useTaskAPI";
import {useTaskContext} from "@/features/Task-Module/stores/TaskContext";
import TaskCreateFormContents
    from "@/features/Task-Module/components/Elements/TaskForm/TaskCreateForm/Test";

/**
 * Component for creating a task form.
 *
 * @param children - The child components to render within the form.
 */
export function TaskCreateForm() {
    const { refetchTasks } = useTaskContext();

    const [form] = Form.useForm();
    const date = new Date();
    const [state, setState] = useState({
        statusData: { label: "", value: "" },
        taskData: { label: "", value: "" },
        startDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        endDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        loading: false,
    });

    const { createAndAssignTask } = useTaskAPI();

    /**
     * Callback function when the form is submitted.
     *
     * @param formData - The form data submitted.
     */
    const onFinish = async (formData: any) => {
        try {
            setState({ ...state, loading: true });

            console.log(formData);

            const response = await createAndAssignTask(formData);
            console.log(response);
            if (response) {
                message.success("Form submitted successfully!");
                if (response === "201") {
                    message.success("Tasks created and assigned successfully");
                } else {
                    message.warning("An error occurred. Please try again.");
                }
            } else {
                console.error("Error creating task ");
                message.warning("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error creating task :", error);
        } finally {
            refetchTasks();
            form.resetFields();
            setState({ ...state, loading: false });
        }
    };
    const handleClearForm = () => {
        // Reset form fields to their initial state
        form.resetFields();
    }

    return (
        <div className="w-full">
            <Form form={form} onFinish={onFinish} initialValues={{remember:true}} className=" dark:text-white w-full" requiredMark={false}>
                <TaskCreateFormContents
                    handleClearForm={handleClearForm}
                    loading={state.loading}
                    state={state}
                    setState={setState}
                   />
            </Form>
        </div>
    );
}


