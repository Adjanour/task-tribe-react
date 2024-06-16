import { PlusCircleOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Card, Button, Modal, Form, Input, DatePicker, Space, Badge } from "antd";
import React, { useState } from "react";
import { TaskCreateForm } from "../Elements/TaskForm";

interface Task {
  title: string;
  description?: string;
  dueDate?: Date;
}

interface KanbanColumnProps {
  title: string;
  id: string;
  count?: number;
  children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, id, count, children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const handleAddTask = (values: Task) => {
    setTasks([...tasks, values]);
    setIsModalVisible(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
        maxWidth: "600px",
        maxHeight:"750px"
      }}
      className="w-full"
    >
      <div style={{ padding: "12px" }}>
        <Space className="w-full justify-between">
          <Space>
            <h2>{title}</h2>
            {count !== undefined && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsModalVisible(true)}
          />
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: isOver ? "unset" : "scroll",
          border: '2px dashed transparent',
          borderColor: isOver ? '#000' : 'transparent',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {children}
        </div>
      </div>
      <Modal
        title="Add Task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TaskCreateForm/>
      </Modal>
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
        <DatePicker placeholder="Due Date" style={{ width: '100%' }} />
      </Form.Item>
      <Button type="default" htmlType="submit" block>
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
export { TaskCard };
