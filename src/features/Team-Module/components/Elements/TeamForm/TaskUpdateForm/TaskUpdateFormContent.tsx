// TaskProgressUpdateFormContent.tsx
import React from "react";
import { DatePicker, Form,  InputNumber,  Progress, Select} from "antd";
import { HolidayComponent } from "@/components/HolidayComponent/Holiday";
import { fetchTasks, fetchTaskStatuses } from "@/features/Task-Module/utils/functions";
import { SelectEdit } from "../../SelectEdit";
import { TextAreaEdit } from "../../TextAreaEdit";
import { InputEdit } from "../../InputEdit";
import { Button } from "../../Button";
import { State } from "./TaskUpdateForm";
import { processDateString } from "@/features/Task-Module/utils/format";

interface TaskUpdateFormContentProps {
    state : State;
    setState : React.Dispatch<React.SetStateAction<State>>;
}

const TaskProgressUpdateFormContent = ({ state,setState }:TaskUpdateFormContentProps) => {

    const handleDateChange = (value:any,type:number) => {
        if(type===1)
            setState({...state,startDate:processDateString(value)})
        else if(type===2){
            setState({...state,endDate:processDateString(value)})
        }
    }
    return (
        <table>
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
            <tr className="mb-0">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" align-middle text-sm font-medium ">
                        Task:
                    </label>
                </td>
                <td>
                    <Form.Item  name="taskUpdateTaskId" rules={[{ required: true, message: 'Please select a task' }]} className='mb-1'>
                        <SelectEdit mode="single" fetchOptions={fetchTasks} placeholder="Select task "/>
                    </Form.Item>
                </td>
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" align-middle text-sm font-medium ">
                        Status:
                    </label>
                </td>
                <td>
                    <Form.Item className="mb-1"  name="currentStatus" rules={[{ required: true, message: 'Please select current status' }]}>
                        <SelectEdit mode="single" fetchOptions={fetchTaskStatuses} placeholder="Select task status"/>
                    </Form.Item>
                </td>
            </tr>
            <tr className="mb-0">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" align-middle text-sm font-medium ">
                        Title:
                    </label>
                </td>
                <td colSpan={3}>
                    <Form.Item className="mb-1"  name="taskUpdateTitle" rules={[{ required: true, message: 'Please enter update title' }]}>
                        <InputEdit className="w-full" placeholder="Enter update title" />
                    </Form.Item>
                </td>
            </tr>
            <tr className="mb-0"> <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" align-middle text-sm font-medium ">
                    Details:
                </label>
            </td>
                <td colSpan={3}>
                    <Form.Item className="mb-1"  name="taskUpdateDescription" rules={[{ required: true, message: 'Please enter task update details' }]}>
                        <TextAreaEdit rows={4} cols={60}  placeholder="Enter task update details" />
                    </Form.Item>
                </td>
            </tr>
            <tr className="mb-0">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" align-middle text-sm font-medium ">
                        Progress:
                    </label>
                </td>
                <td>
                    <Form.Item className="mb-1"  name="taskUpdateProgress">
                        <InputNumber<number> className="w-full" placeholder="Progress percentage" onChange={(value)=>setState({...state,percent:value})}/>
                    </Form.Item>
                </td>
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" align-middle text-sm font-medium ">
                        Type:
                    </label>
                </td>
                <td>
                    <Form.Item className="mb-1" name="progressType">
                        <Select
                            showSearch
                            className="w-full"
                            placeholder="Select update type"
                            options={[{label:'Percentage',value:'percentage'},{label:'Hours',value:'hours'},{label:'Days',value:'days'}]}
                        >
                        </Select>
                    </Form.Item>
                </td>
            </tr>
            <tr>
                <td></td>
                <td colSpan={3}>
                    <Form.Item name="progressPercentage" className="mb-0">
                        <Progress percent={state.percent? state.percent : 0} />
                    </Form.Item>
                </td>
            </tr>
            <tr className="mb-0"> <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" align-middle text-sm font-medium ">
                    Challenge(s):
                </label>
            </td>
                <td colSpan={3}>
                    <Form.Item className="mb-1"  name="taskUpdateChallenge">
                        <TextAreaEdit rows={4} cols={60} maxLength={6}   placeholder="Describe your progress and any challenges" />
                    </Form.Item>
                </td>
            </tr>

            <tr className="mb-0">
                <td colSpan={4}>
                    <div className="float-right">
                        <Form.Item className="mb-1">
                            <Button type="default" htmlType="submit" className='rounded-md' loading={state.loading} text="Save" />
                        </Form.Item>
                    </div>
                </td>
            </tr>

            </tbody>
        </table>
    );
};

export default TaskProgressUpdateFormContent;
