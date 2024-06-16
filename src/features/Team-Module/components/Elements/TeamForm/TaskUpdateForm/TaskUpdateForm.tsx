import  { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useTaskAPI } from "@/features/Task-Module/hooks/useTaskAPI";
import { UserValue, fetchTaskStatus, fetchTask } from "@/features/Task-Module/utils/functions";
import TaskProgressUpdateFormContent from "./TaskUpdateFormContent";

interface TaskProgressUpdateFormProps {
  taskId: string;
  refetchData: any;
}

export interface State {
  percent: number | null;
  statusData: UserValue|undefined;
  taskData: UserValue|undefined;
  startDate: string;
  endDate: string;
  loading: boolean;
}

export  function TaskUpdateForm({
  taskId,
  refetchData,
}: TaskProgressUpdateFormProps) {
  const date = new Date();

  const [state, setState] = useState<State>({
    percent: 0,
    statusData: { label: "", value: "" },
    taskData: { label: "", value: "" },
    startDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    endDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    loading: false,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const status = await fetchTaskStatus(taskId);
        const task = await fetchTask(taskId);

        setState((prevState) => ({
          ...prevState,
          statusData: status,
          taskData: task,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [taskId]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));

        const initialData = {
          taskUpdateTaskId: state.taskData,
          currentStatus: state.statusData,
        };

        form.setFieldsValue(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        message.error("An error occurred while fetching initial data. Please try again.");
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchInitialData();
  }, [form, state.statusData, state.taskData, taskId]);


  const { addTaskUpdate } = useTaskAPI();

  const onFinish = async (formData: any) => {
    console.log('Form submitted with values:', formData);

    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      const response = await addTaskUpdate(formData);

      if (response) {
        message.success("Form submitted successfully!");
        if (response === "201") {
          message.success("Tasks Update Created successfully");
        } else {
          message.warning("An error occurred. Please try again.");
        }
      } else {
        console.error("Error creating task update ");
        message.warning("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error creating task update :", error);
    } finally {
      refetchData();
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="w-fit">
      <Form form={form} onFinish={onFinish}>
        <TaskProgressUpdateFormContent
        setState={setState}
        state={state}
        />
      </Form>
    </div>
  );
}
