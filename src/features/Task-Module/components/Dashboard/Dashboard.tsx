import React, { useEffect } from "react";
import { Row, Col, Card, Statistic, Table, Badge, Skeleton } from "antd";

import { ColumnsType } from "antd/es/table";
import {
  CheckCircleOutlined,
  FallOutlined,
  LoadingOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Task } from "../../types";
import { useTaskContext } from "@/features/Task-Module/stores/TaskContext";

export const Dashboard = () => {
  const task = useTaskContext();

  useEffect(() => {
    task.refetchTasks();
  }, []);

  //Extracting task count, completed tasks, not started tasks and pending tasks
  const totalTasks = task.Tasks?.length;
  const completedTasks = task.Tasks?.filter(
    (task: Task) => task.taskStatus?.toString().toLowerCase() === "ended"
  ).length;
  const pendingTasks = totalTasks - completedTasks;
  const notStartedTasks: number = task.Tasks?.filter(
    (task: Task) => task.taskStatus?.toString().toLowerCase() === "not started"
  ).length;

  // Define columns for the Task Table
  //22-02-05
  const columns: ColumnsType<Task> = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "",
    },
    {
      title: "Assignee",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Status",
      dataIndex: "taskStatus",
      key: "taskStatus",
      render: (text) => (
        <Badge
          status={text === "Not Started" ? "warning" : "success"}
          text={text}
        />
      ),
    },
  ];

  const taskTableData = task.Tasks?.slice(-20); // Displaying only the first 5 tasks

  return (
    <>
      {task.isLoadingGettingTasks ? (
        <Skeleton active />
      ) : (
        <div>
          {/* Task Overview Section */}
          <Row gutter={20} style={{ justifyContent: "center" }}>
            <Col span={5}>
              <Card>
                <Statistic
                  prefix={
                    <CheckCircleOutlined
                      style={{ fontSize: 28, color: "#201b1b" }}
                    />
                  }
                  title="Total Tasks"
                  value={totalTasks}
                />
              </Card>
            </Col>
            <Col span={5}>
              <Card>
                <Statistic
                  title="Completed Tasks"
                  valueStyle={{ color: "green" }}
                  prefix={<RiseOutlined />}
                  value={completedTasks}
                />
              </Card>
            </Col>
            <Col span={5}>
              <Card>
                <Statistic
                  prefix={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "yellow" }}
                    />
                  }
                  title="Pending Tasks"
                  value={pendingTasks}
                />
              </Card>
            </Col>
            <Col span={5}>
              <Card>
                <Statistic
                  title="Not Started"
                  valueStyle={{ color: "red" }}
                  prefix={<FallOutlined />}
                  value={notStartedTasks}
                />
              </Card>
            </Col>
          </Row>

          {/* Task Table Section */}
          <Row style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card
                title="Recent Tasks"
                style={{ minHeight: "400px", height: "100%" }}
              >
                <Table
                  dataSource={taskTableData}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
