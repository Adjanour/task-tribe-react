// TaskCalendar.tsx
import React, { useState } from "react";
import { Calendar, Badge } from "antd";
import dayjs, { Dayjs } from "dayjs";

type Status = "Not Started" | "In Progress" | "Completed" | "Cancelled";
type StatusColor = "warning" | "processing" | "success" | "error";


interface Props {
  tasks: TaskAssignment[];
}
export interface TaskAssignment {
    taskAssignmentId: number;
    taskId: number;
    taskStatusId: number;
    taskPriorityId: number;
    taskName: string;
    taskDescription: string;
    taskStartDate: string;
    taskDueDate: string;
    taskCreatedDate: string;
    taskProgress: string;
    taskAssignedDate: string;
    taskPriority: string;
    taskStatus: Status;
    taskAssignerUserId: number;
    taskAssigneeUserId: number;
    taskAssigneeName: string;
    taskAssignerName: string;
}
interface Props {
  tasks: TaskAssignment[];
}


export const TaskCalendar: React.FC<Props> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const getStatusColor = (status: Status): StatusColor => {
    const statusMap: Record<Status, StatusColor> = {
      "Not Started": "warning",
      "In Progress": "processing",
      "Completed": "success",
      "Cancelled": "error",
    };
    return statusMap[status] || "default";
  };

  const dateCellRender = (value: Dayjs) => {
    const date = value.format("YYYY-MM-DD");
    if(!tasks) return null;
    const tasksForDate = tasks.filter((task) => task.taskDueDate === date);

    return (
      <ul style={{ listStyle: "none", padding: 0.5 }}>
        {tasksForDate.map((task) => (
          <li key={task.taskAssignmentId}>
            <Badge
              className="text-md"
              status={getStatusColor(task.taskStatus)}
              text={task.taskName}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-full rounded-md p-4">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        dateCellRender={dateCellRender}
        className="w-full h-full mx-auto shadow-md p-4 rounded-md"
      />
    </div>
  );
};

