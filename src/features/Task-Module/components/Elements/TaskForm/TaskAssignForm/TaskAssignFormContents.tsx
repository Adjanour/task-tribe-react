import { HolidayComponent } from '@/components/HolidayComponent/Holiday'
import {  fetchUsers, fetchTaskStatuses, fetchTaskPriorities, UserValue, fetchTaskAssignments } from '@/features/Task-Module/utils/functions'
import { DatePicker,Form } from 'antd'
import { SelectEdit } from '../../SelectEdit'
import { TextAreaEdit } from '../../TextAreaEdit'
import { Button } from '../../Button'
import { processDateString } from '@/features/Task-Module/utils/format'

export type TaskAssignFormContentsProps = {
    handleClearForm: () => void;
    state : {
        statusData: UserValue|undefined;
        taskData: UserValue|undefined;
        startDate: string;
        endDate: string;
        loading: boolean;
        taskId: UserValue|UserValue[]|any;
        priorityData: UserValue|undefined;
        assigneesData: UserValue[]|undefined;
        assignerData: UserValue|undefined;
        taskDescription: {taskDescription:string}|undefined
    }
    setState :  React.Dispatch<React.SetStateAction<{statusData: UserValue|undefined;
    taskData: UserValue|undefined;
    startDate: string;
    endDate: string;
    loading: boolean;
    taskId: UserValue|UserValue[]|any;
    priorityData: UserValue|undefined;
    assigneesData: UserValue[]|undefined;
    assignerData: UserValue|undefined;
    taskDescription: {taskDescription:string}|undefined}>>
}

export const  TaskAssignFormContents = ({handleClearForm,setState,state}:TaskAssignFormContentsProps)=>{
    const handleDateChange = (value:any,type:number) => {
        if(type===1)
            setState({...state,startDate:processDateString(value)})
        else if(type===2){
            setState({...state,endDate:processDateString(value)})
        }
    }
  return (
    <table className="dark:text-white w-full">
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
                <td className="flex float-right  items-center justify-center mt-2 ">
                    <label htmlFor="taskName" className="block text-sm font-medium">
                    Task Name:
                    </label>
                </td>
                <td colSpan={3}>
                    <Form.Item
                        name="task_name"
                        className="mb-0"
                        rules={[
                        {
                            required: true,
                            message: "Please select the task ",
                        },
                        ]}
                    >
                    <SelectEdit mode="single" onChange={(value)=> { 
                        setState({...state , taskId: value})
        
                    }} fetchOptions={fetchTaskAssignments} placeholder="Select a Task"/>
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className="items-center justify-center  text-sm font-medium">
                    Assigner:
                    </label>
                </td>
                <td colSpan={3}>
                    <Form.Item
                        name="assignedBy"
                        className="mb-0"
                        rules={[
                        {
                            required: true,
                            message: "Please select an assigner",
                        },
                        ]}
                    >
                    <SelectEdit mode="single" disabled fetchOptions={fetchUsers} placeholder="Select Task Assigner"/>
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2 ">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" items-center justify-center block text-sm font-medium">
                    Assignee(s):
                    </label>
                </td>
                <td colSpan={4}>
                    <Form.Item
                        name="assignedTo"
                        className="mb-0"
                        rules={[
                        {
                            required: true,
                            message: "Please select an assignee",
                        },
                        ]}
                    >
                    <SelectEdit mode={"multiple"} fetchOptions={fetchUsers} placeholder="Select Task Assignees"/>
                    </Form.Item>
                </td>
            </tr>
            <tr className="mt-2 ">
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" items-center justify-center block text-sm font-medium">
                    Status:
                    </label>
                </td>
                <td>
                    <Form.Item
                        name="taskStatus"
                        className="mb-0"
                        rules={[
                        {
                            required: true,
                            message: "Please select a task status",
                        },
                        ]}
                    >
                    <SelectEdit fetchOptions={fetchTaskStatuses} placeholder="Select status"/>

                    </Form.Item>
                </td>
                <td className="flex float-right  items-center justify-center mt-1 ">
                    <label className=" items-center justify-center block text-sm font-medium">
                    Priority:
                    </label>
                </td>
                <td>
                    <Form.Item
                        name="taskPriority"
                        className="mb-0"
                        rules={[
                        {
                            required: true,
                            message: "Please select a task priority",
                        },
                        ]}
                    >
                    <SelectEdit fetchOptions={fetchTaskPriorities} placeholder="Select Task Assigner"/>

                    {/* <Select options={[{label:"Kirk",value:"kirk"},{label:"bernard",value:"bernard"}]} mode="multiple"  optionLabelProp="label"/> */}
                    </Form.Item>
                </td>
            </tr>
            <tr>
                <td className="flex float-right mt-2">
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
                        className="mb-0"
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
                        className="mt-1 p-1 w-full border rounded-md"
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
                        <Button text="Assign" htmlType="submit" loading={state.loading} />
                        <Button text="New" onClick={handleClearForm} />
                    </div>
                </td>
            </tr>
        </tbody>
  </table>
  )
}

