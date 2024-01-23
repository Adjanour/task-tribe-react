import { UserValue, fetchTaskStatus, fetchTaskPriority, fetchTaskAssignees, fetchTaskAssigner, fetchTaskDescription } from "@/features/Task-Module/utils/functions";
import { message,Form } from "antd";
import { useState, useEffect } from "react";
import {TaskAssignFormContents} from "./TaskAssignFormContents";
import {useTaskAPI} from "@/features/Task-Module/hooks/useTaskAPI";


type description = {
    taskDescription :string
  }

type stateTypes ={
    statusData: UserValue;
    taskData: UserValue;
    startDate: string;
    endDate: string;
    loading: boolean;
    taskId: UserValue|UserValue[]|any;
    priorityData: UserValue;
    assigneesData: UserValue[];
    assignerData: UserValue;
    taskDescription: description
}

export const TaskAssignForm = () => {
    const [form] = Form.useForm();
    const date = new Date();
    const [state, setState] = useState<stateTypes>({
        statusData: {label:"",value:""},
        taskData: {label:"",value:""},
        startDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        endDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        loading: false,
        taskId: "1",
        priorityData: {label:"",value:""},
        assigneesData: [{label:"",value:""}],
        assignerData: {label:"",value:""},
        taskDescription: {taskDescription:""},
    })

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [statusData, priorityData, assigneesData, assignerData, taskDescription] = await Promise.all([
            fetchTaskStatus(state.taskId.toString()),
            fetchTaskPriority(state.taskId.toString()),
            fetchTaskAssignees(state.taskId.toString()),
            fetchTaskAssigner(state.taskId.toString()),
            fetchTaskDescription(state.taskId.toString())
          ]);
    
          setState((prevState) => ({
            ...prevState,
            statusData,
            priorityData,
            assigneesData,
            assignerData,
            taskDescription
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, [state.taskId]);
    
    ;
    useEffect(() => {
     
      const fetchInitialData = async () => {
        try {
            setState((prevState) => ({ ...prevState, loading: true }));
  
            // Fetch the initial data
          
              const initialData =  {
                    task_description: "This is a task description",
                    taskStatus:state.statusData,
                    assignedTo:state.assigneesData,
                    taskPriority:state.priorityData,
                    taskDescription:state.taskDescription?.taskDescription,
                    assignedBy:state.assignerData
              };
  
          // Set initial values in the form
          form.setFieldsValue(initialData);
        } catch (error) {
          console.error("Error fetching initial data:", error);
          message.error(
              "An error occurred while fetching initial data. Please try again."
          );
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
      };
  
      // Call the function to fetch initial data
      fetchInitialData();
    }, [form,state.taskId]);
    const {assignTask} = useTaskAPI()

    const onFinish = async (formData: any) => {
      try {
        setState({ ...state, loading: true });
        console.log(formData)
          const {task_name,assignedBy,assignedTo} = formData
          const assignTaskResponses = [];

          for (const assignee of assignedTo) {
            const response = await assignTask(task_name, assignee, assignedBy.value);
            assignTaskResponses.push(response.toString());
          }
        try {
          const response = await fetch("/api/v1/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: formData }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            message.success("Form submitted successfully!");
            if (data.success === true) {
              message.success("Tasks created and assigned successfully");
            } else {
              message.warning("An error occurred. Please try again.");
            }
          } else {
            console.error("Error creating task:", data.error);
            message.warning("An error occurred. Please try again.");
          }
        } catch (error) {
          console.error("Error creating task:", error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        message.error(
            "An error occurred while submitting the form. Please try again."
        );
      } finally {
        setState({ ...state, loading: false });
      }
    };
    const handleClearForm = () => {
        form.resetFields();
      }
   
    return (
        <Form form={form} onFinish={onFinish} initialValues={{remember:true}} className=" dark:text-white w-full">
            <TaskAssignFormContents handleClearForm={handleClearForm} setState={setState} state={state}/>
        </Form>
    );
  };
  