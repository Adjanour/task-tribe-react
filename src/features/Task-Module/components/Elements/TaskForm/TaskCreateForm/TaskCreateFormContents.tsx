import React from 'react';
import {HolidayComponent} from "@/components/HolidayComponent/Holiday";
import {Col, DatePicker, Form, Row} from "antd";
import {CustomDate, processDateString} from "@/features/Task-Module/utils/format";
import {Button} from "@/features/Task-Module/components/Elements/Button";
import {InputEdit} from "@/features/Task-Module/components/Elements/InputEdit";
import {SelectEdit} from "@/features/Task-Module/components/Elements/SelectEdit";
import {TextAreaEdit} from "@/features/Task-Module/components/Elements/TextAreaEdit";
import {fetchTaskPriorities, fetchTaskStatuses, fetchUsers} from "@/features/Task-Module/utils/functions";

export type TaskFormContentsProps = {
    handleClearForm: () => void;
    loading: boolean;
    state : {statusData: {label: string, value: string}, taskData: {label: string, value: string},startDate: string, endDate: string, loading: boolean};
    setState :  React.Dispatch<React.SetStateAction<{statusData: {label: string, value: string}, taskData: {label: string, value: string},startDate: string, endDate: string, loading: boolean}>>
}


export const  TaskCreateFormContents= ({handleClearForm,setState,state}: TaskFormContentsProps) => {
    const handleDateChange = (value:any,type:number) => {
        if(type===1)
            setState({...state,startDate:processDateString(value)})
        else if(type===2){
            setState({...state,endDate:processDateString(value)})
        }
    }
    return (
          <table className=" mb-1 dark:text-white w-full">
           <tbody> 
            <tr className="mb-0">
                <td className="flex align-middle justify-end mr-1">
                    <label htmlFor="taskStartDate" className="align-middle text-sm font-medium mt-1">
                        Start Date:
                    </label>
                </td>
                <td className="">
                    <Form.Item name="taskStartDate" className="w-fit mb-0">
                        <DatePicker className="w-fit text-sm" format="DD MMM YYYY" onChange={(value)=>handleDateChange(value,1)}  />
                    </Form.Item>
                </td>
                <td className="flex justify-end  min-w-[80px] mr-1">
                    <label htmlFor="taskEndDate" className="text-sm font-medium mt-1">End Date:</label>
                </td>
                <td>
                    <Form.Item name="taskEndDate" className="w-fit mb-0">
                        <DatePicker className="w-fit text-sm" format="DD MMM YYYY " onChange={(value)=>handleDateChange(value,2)} />
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-0">
                <td colSpan={3}>
                    <div className="flex flex-row float-right">
                        <HolidayComponent startDate={state.startDate} endDate={state.endDate}/>
                    </div>
                </td>
            </tr>
            <tr>
                <td className="flex float-right  items-center justify-end mt-2 mr-1 ">
                    <label htmlFor="taskName" className="text-sm font-medium">
                        Task Name:
                    </label>
                </td>
                <td colSpan={3}>
                    <Form.Item
                        name="taskName"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the task name",
                            },
                        ]}
                    >
                        <InputEdit placeholder="Enter task name" />
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2">
                <td className="flex float-right  items-center justify-end mt-1 mr-1 ">
                    <label className="justify-center  text-sm font-medium">
                        Assigner:
                    </label>
                </td>
                <td colSpan={3}>
                    <Form.Item
                        name="assignedBy"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please select an assigner",
                            },
                        ]}
                    >
                        <SelectEdit mode="single"  placeholder="Select assigner" fetchOptions={fetchUsers}/>

                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2 ">
                <td className="flex float-right  items-center justify-center mt-1 mr-1">
                    <label className=" items-center justify-center block text-sm font-medium">
                        Assignee(s):
                    </label>
                </td>
                <td colSpan={4}>
                    <Form.Item
                        name="assignedTo"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please select an assignee",
                            },
                        ]}
                    >
                        <SelectEdit mode="multiple" placeholder="Select assignee(s)" fetchOptions={fetchUsers}/>
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2 ">
                <td className="flex float-right  items-center justify-center mt-1 mr-1 ">
                    <label className=" items-center justify-center block text-sm font-medium">
                        Status:
                    </label>
                </td>
                <td>
                    <Form.Item
                        name="taskStatusId"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please select a task status",
                            },
                        ]}
                    >
                        <SelectEdit placeholder="Select Status" fetchOptions={fetchTaskStatuses}/>
                    </Form.Item>
                </td>
                <td className="flex float-right  items-center justify-center mt-1 mr-1 ">
                    <label className=" items-center justify-center block text-sm font-medium">
                        Priority:
                    </label>
                </td>
                <td>
                    <Form.Item
                        name="taskPriorityId"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please select a task priority",
                            },
                        ]}
                    >
                        <SelectEdit  placeholder="Select Priority" fetchOptions={fetchTaskPriorities}/>

                    </Form.Item>
                </td>
            </tr>
            <tr>
                <td className="flex float-right mt-2 mr-1">
                    <label
                        htmlFor="taskDescription"
                        className="block items-center justify-center  text-sm font-medium"
                    >
                        Description:
                    </label>
                </td>
                <td colSpan={4}>
                    <Form.Item
                        name="taskDescription"
                        className="mb-1"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the task description",
                            },
                        ]}
                    >
                        <TextAreaEdit
                            rows={5}
                            cols={40}
                            className="mt-1 p-1  border rounded-md"
                        />
                    </Form.Item>
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <div className="flex mr-2 mt-2 grid-cols-3 gap-4 float-right">
                        <Button text="Approved" formAction="" />
                        <Form.Item>
                            <Button text="Save" htmlType="submit" loading={state.loading} />
                        </Form.Item>
                        <Button text="New" onClick={handleClearForm} />

                    </div>
               </td>
            </tr>
            </tbody>
        </table>
    );
}

export default TaskCreateFormContents;