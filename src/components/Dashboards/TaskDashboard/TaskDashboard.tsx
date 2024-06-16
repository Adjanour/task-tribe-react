import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TaskAssignment } from '@/features/Task-Module/utils/functions';
import { Dayjs } from 'dayjs';

interface TaskDashboardProps {
  tasks: TaskAssignment[];
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const TaskDashboard: React.FC<TaskDashboardProps> = ({ tasks }) => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filterTasks = () => {
    let filteredTasks = tasks;

    if (dateRange && dateRange.length === 2) {
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.taskDueDate) >= dateRange[0].toDate() && new Date(task.taskDueDate) <= dateRange[1].toDate()
      );
    }

    if (selectedCategory !== 'All') {
      filteredTasks = filteredTasks.filter((task) => task.taskStatus === selectedCategory);
    }

    return filteredTasks;
  };

  const prepareChartDataForLine = () => {
    const filteredTasks = filterTasks();

    // Group tasks by status
    const groupedData = filteredTasks.reduce((acc, task) => {
      const monthYear = task.taskDueDate; // Assuming taskDueDate is a Dayjs object
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(groupedData).map(([month, count]) => ({
      month,
      value: count,
    }));

    return data;
  };

  const prepareChartDataForPie = () => {
    const filteredTasks = filterTasks();

    // Group tasks by status
    const groupedData = filteredTasks.reduce((acc, task) => {
      acc[task.taskStatus] = (acc[task.taskStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(groupedData).map(([status, count]) => ({
      status,
      value: count,
    }));

    return data;
  };

  const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    setDateRange(dates);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <div>
        <RangePicker/>
        <Select defaultValue="All" style={{ width: 120 }} onChange={handleCategoryChange}>
          <Option value="All">All Categories</Option>
          <Option value="Not Started">Not Started</Option>
          <Option value="Started">Started</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      </div>
      <div style={{ marginTop: 20 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={prepareChartDataForLine()}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: 20 }}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={prepareChartDataForPie()}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="blue"
              label
            >
              {prepareChartDataForPie().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${index}${index}${index}`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskDashboard;
