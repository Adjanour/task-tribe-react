import { PlusCircleOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Card, Button, Modal, Form, Input, DatePicker, Space, Badge } from "antd";
import React, { Children, useState } from "react";

interface Task {
  title: string;
  description?: string;
  dueDate?: Date;
}

interface KanbanColumnProps {
  children: React.PropsWithChildren
}

const KanbanColumn = ( {children}: React.PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    data: {},
  });

  const handleAddTask = (values: Task) => {
    setTasks([...tasks, values]);
    setIsModalVisible(false);
  };

  const count = 2
  const description = 'Description of the task'
  const title = 'Task Title'

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
        maxWidth: "300px", // Example of limiting column width
      }}
    >
      <div style={{ padding: "12px" }}>
        <Space className="w-full justify-between">
          <Space>
              <h2 className="">TO DO</h2>
              {!!count && <Badge count={count} color="cyan"/> }
          </Space>
          <Button
          shape="circle"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
          />

        </Space>
          {description}
      </div>
      <div
      style={{
        flex: 1,
        overflowY: active ? "unset": "scroll",
        border: '2px dashed transparent',
        borderColor: isOver ? '#0000':'transparent',
        borderRadius: '4px',
      }}
      >
        <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface TaskFormProps {
  onFinish: (values: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true, message: "Title is required" }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item name="dueDate">
        <DatePicker placeholder="Due Date" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add Task
      </Button>
    </Form>
  );
};

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card title={task.title} style={{ marginBottom: "12px" }} className="rounded-md shadow-md bg-white">
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate ? task.dueDate.toISOString().split("T")[0] : "Not set"}</p>
    </Card>
  );
};

export default KanbanColumn;
