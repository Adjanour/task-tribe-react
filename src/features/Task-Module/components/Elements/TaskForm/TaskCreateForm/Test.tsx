import React from "react";
import { HolidayComponent } from "@/components/HolidayComponent/Holiday";
import { Col, DatePicker, Form, Row } from "antd";
import { processDateString } from "@/features/Task-Module/utils/format";
import { Button } from "@/features/Task-Module/components/Elements/Button";
import { InputEdit } from "@/features/Task-Module/components/Elements/InputEdit";
import { SelectEdit } from "@/features/Task-Module/components/Elements/SelectEdit";
import { TextAreaEdit } from "@/features/Task-Module/components/Elements/TextAreaEdit";
import {
  fetchTaskPriorities,
  fetchTaskStatuses,
  fetchUsers,
} from "@/features/Task-Module/utils/functions";

export type TaskFormContentsProps = {
  handleClearForm: () => void;
  loading: boolean;
  state: {
    statusData: { label: string; value: string };
    taskData: { label: string; value: string };
    startDate: string;
    endDate: string;
    loading: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      statusData: { label: string; value: string };
      taskData: { label: string; value: string };
      startDate: string;
      endDate: string;
      loading: boolean;
    }>
  >;
};

export const TaskCreateFormContents = ({
  handleClearForm,
  setState,
  state,
}: TaskFormContentsProps) => {
  const handleDateChange = (value: any, type: number) => {
    if (type === 1) setState({ ...state, startDate: processDateString(value) });
    else if (type === 2) {
      setState({ ...state, endDate: processDateString(value) });
    }
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="taskStartDate"
            label = "Start Date"
            labelCol={{ span: 12 }}
            className="mb-1 mr-1"
            rules={[{ required: true, message: "Task Start Date is required" }]}
          >
            <DatePicker
              format="DD MMM YYYY "
              onChange={(value) => handleDateChange(value, 1)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="taskEndDate" label="End Date"  className="mb-1" rules={[{ required: true, message: "Task End Date is required" }]}>
            <DatePicker
              format="DD MMM YYYY "
              onChange={(value) => handleDateChange(value, 2)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={14} offset={7}>
            <div className="">
            <HolidayComponent
              startDate={state.startDate}
              endDate={state.endDate}
            />
            </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            name="assignedBy"
            label="Assigner"
            rules={[
              {
                required: true,
                message: "Assigner is required",
              },
            ]}
            labelCol={{ span: 6 }}
            className="mb-2.5"
          >
            <SelectEdit
              mode="single"
              placeholder="Select assigner"
              fetchOptions={fetchUsers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="assignedTo"
            labelCol={{ span: 6 }}
            className="mb-2.5"
            label="Assignee(s)"
            rules={[
              {
                required: true,
                message: "Please select an assignee",
              },
            ]}
          >
            <SelectEdit
              mode="multiple"
              placeholder="Select assignee(s)"
              fetchOptions={fetchUsers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="taskStatusId"
            label="Status"
            labelCol={{ span: 12 }}
            className="mb-2.5"
            rules={[
              {
                required: true,
                message: "Please select a task status",
              },
            ]}
          >
            <SelectEdit
              placeholder="Select Status"
              fetchOptions={fetchTaskStatuses}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="taskPriorityId"
            label="Priority"
            labelCol={{ span: 6 }}
            className="mb-2.5"
            rules={[
              {
                required: true,
                message: "Please select a task priority",
              },
            ]}
          >
            <SelectEdit
              placeholder="Select Priority"
              fetchOptions={fetchTaskPriorities}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: "Task name is required" }]}
            labelCol={{ span: 6 }}
            className="mb-2.5"
          >
            <InputEdit placeholder="Enter Task Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="taskDescription"
            label="Description"
            labelCol={{ span: 6 }}
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="flex mr-2 mt-2 grid-cols-3 gap-4 float-right">
            <Button text="Approved" formAction="" />
            <Form.Item>
              <Button text="Save" htmlType="submit" loading={state.loading} />
            </Form.Item>
            <Button text="New" onClick={handleClearForm} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TaskCreateFormContents;
