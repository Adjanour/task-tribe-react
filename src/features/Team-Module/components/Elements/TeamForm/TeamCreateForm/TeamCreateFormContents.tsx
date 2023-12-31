import React from "react";
import { HolidayComponent } from "@/components/HolidayComponent/Holiday";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { processDateString } from "@/features/Task-Module/utils/format";
import { Button } from "@/features/Team-Module/components/Elements/Button";
import { InputEdit } from "@/features/Team-Module/components/Elements/InputEdit";
import { SelectEdit } from "@/features/Team-Module/components/Elements/SelectEdit";
import { TextAreaEdit } from "@/features/Team-Module/components/Elements/TextAreaEdit";
import {
  fetchTaskPriorities,
  fetchTaskStatuses,
  fetchUsers,
} from "@/features/Task-Module/utils/functions";

export type TaskFormContentsProps = {
  handleClearForm: () => void;
  loading: boolean;
  state: {
    loading: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
    }>
  >;
};

export const TeamCreateFormContents = ({
  handleClearForm,
}: TaskFormContentsProps) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[{ required: true, message: "Team name is required" }]}
            labelCol={{ span: 6 }}
            className="mb-2.5"
          >
            <InputEdit placeholder="Enter Team Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Form.Item
            label="Lead"
            name="teamLead"
            rules={[{ required: true, message: "Lead is required" }]}
            labelCol={{ span: 9 }}
            className="mb-2.5"
          >
            <SelectEdit
              mode="single"
              placeholder="Select Lead"
              fetchOptions={fetchUsers}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Status"
            name="teamStatus"
            rules={[{ required: true, message: "Status is required" }]}
            labelCol={{ span: 9 }}
            className="mb-2.5"
          >
            <SelectEdit
              mode="single"
              placeholder="Select Status"
              fetchOptions={fetchTaskStatuses}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Members"
            name="teamMembers"
            labelCol={{ span: 6 }}
            className="mb-2.5"
          >
            <SelectEdit
              mode="multiple"
              placeholder="Select Members"
              fetchOptions={fetchUsers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Description"
            name="teamDescription"
            labelCol={{ span: 6 }}
            rules={[{ required: true, message: "Description is required" }]}
          >
            <TextAreaEdit rows={4} cols={40} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item className="float-right mb-1">
            <Button type="primary" htmlType="submit" text="Save" />
          </Form.Item>
          <Form.Item className="float-right mb-1 mr-2">
            <Button type="primary" text="New" onClick={handleClearForm} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default TeamCreateFormContents;
