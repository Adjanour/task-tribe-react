import React from "react";
import { HolidayComponent } from "@/components/HolidayComponent/Holiday";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { Button } from "@/features/Team-Module/components/Elements/Button";
import { InputEdit } from "@/features/Team-Module/components/Elements/InputEdit";
import { SelectEdit } from "@/features/Team-Module/components/Elements/SelectEdit";
import { TextAreaEdit } from "@/features/Team-Module/components/Elements/TextAreaEdit";
import {
    fetchTaskStatuses,
    fetchUsers,
} from "@/features/Task-Module/utils/functions";
import {processDateString} from "@/features/Task-Module/utils/format";

export type ProjectFormContentsProps = {
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


export const ProjectCreateFormContents = ({
                                           handleClearForm,
                                       }: ProjectFormContentsProps) => {
    return (
        <>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="projectStartDate"
                        label = "Start Date"
                        labelCol={{ span: 12 }}
                        className="mb-1 mr-1"
                        rules={[{ required: true, message: "Task Start Date is required" }]}
                    >
                        <DatePicker
                            format="DD MMM YYYY "

                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="projectEndDate" label="End Date"  className="mb-1" rules={[{ required: true, message: "Task End Date is required" }]}>
                        <DatePicker
                            format="DD MMM YYYY "

                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        label="Project Name"
                        name="projectName"
                        rules={[{ required: true, message: "Project name is required" }]}
                        labelCol={{ span: 6 }}
                        className="mb-2.5"
                    >
                        <InputEdit placeholder="Enter Project Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Form.Item
                        label="Manager"
                        name="projectProjectManagerId"
                        rules={[{ required: true, message: "Manager is required" }]}
                        labelCol={{ span: 9 }}
                        className="mb-2.5"
                    >
                        <SelectEdit
                            mode="single"
                            placeholder="Select Project Manager"
                            fetchOptions={fetchUsers}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Status"
                        name="projectStatus"
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
                        name="projectMembers"
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
                        name="projectDescription"
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

export default ProjectCreateFormContents;
