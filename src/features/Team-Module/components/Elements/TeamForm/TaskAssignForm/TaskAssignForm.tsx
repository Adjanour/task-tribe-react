import { fetchTaskStatus, fetchTaskPriority, fetchTaskAssignees, fetchTaskAssigner, fetchTaskDescription } from "@/features/Task-Module/utils/functions";
import { message,Form } from "antd";
import { useState, useEffect } from "react";
import {TaskAssignFormContents} from "./TaskAssignFormContents";
import { UserValue } from "@/types";


type description = {
    taskDescription :string
  }

type stateTypes ={
    statusData: UserValue|undefined;
    taskData: UserValue|undefined;
    startDate: string;
    endDate: string;
    loading: boolean;
    taskId: UserValue|UserValue[]|any;
    priorityData: UserValue|undefined;
    assigneesData: UserValue[]|undefined;
    assignerData: UserValue|undefined;
    taskDescription: description|undefined
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
          const data = await fetchTaskStatus(state.taskId.toString());
            setState((prevState)=>({...prevState,statusData:data}))
          console.log(data); // Log the data after it's fetched
          console.log(state);
        } catch (error) {
          console.error("Error fetching status data:", error);
        }
        try {
          const data = await fetchTaskPriority(state.taskId.toString());
            setState((prevState)=>({...prevState,priorityData:data}))
        }catch (error){
          console.error("Error fetching priority data:", error);
        }
        try {
          const data = await fetchTaskAssignees(state.taskId.toString());
            setState((prevState)=>({...prevState,assigneesData:data}))
        }catch (error){
          console.error("Error fetching task assignees data:", error);
        }
        try {
          const data = await fetchTaskAssigner(state.taskId.toString());
            setState((prevState)=>({...prevState,assignerData:data}))
        }catch (error){
          console.error("Error fetching assigner data:", error);
        }
        try {
          const data = await fetchTaskDescription(state.taskId.toString());
            setState((prevState)=>({...prevState,taskDescription:data}))
        }catch (error){
          console.error("Error fetching task description data:", error);
        }
      };
      fetchData();
    }, [state.taskId])
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

    const onFinish = async (formData: any) => {
      try {
        setState({ ...state, loading: true });
  
        try {
          const response = await fetch("/api/createTask", {
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
        <Form form={form} onFinish={onFinish} className=" dark:text-white w-full">
            <TaskAssignFormContents handleClearForm={handleClearForm} setState={setState} state={state}/>
        </Form>
    );
  };
  