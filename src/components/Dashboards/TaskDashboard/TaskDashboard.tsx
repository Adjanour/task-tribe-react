// import React, { useState } from 'react';
// import { DatePicker, Select } from 'antd';
// import { Line } from '@ant-design/charts';
// import { TaskAssignment } from '@/features/Task-Module/utils/functions';
// import moment from "moment"
// import dayjs, { Dayjs } from 'dayjs';


// interface TaskDashboardProps {
//   tasks: TaskAssignment[];
// }

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const TaskDashboard: React.FC<TaskDashboardProps> = ({ tasks }) => {
//   // State for date range selection
//   // const [dateRange, setDateRange] = useState<Date[]>([]);
//   const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

//   // State for category selection
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   // Function to filter tasks based on date range and category
//   const filterTasks = () => {
//     let filteredTasks = tasks;

//     // Filter by date range
// if (dateRange && dateRange[0] && dateRange[1]) {
//   filteredTasks = filteredTasks.filter(
//     (task) => dayjs(task.taskDueDate).isAfter(dateRange[0]) && dayjs(task.taskDueDate).isBefore(dateRange[1])
//   );
// }


//     // Filter by category
//     if (selectedCategory !== 'All') {
//       filteredTasks = filteredTasks.filter((task) => task.taskStatus === selectedCategory);
//     }

//     return filteredTasks;
//   };

//   // Prepare data for the line chart
//   const prepareChartData = () => {
//     const filteredTasks = filterTasks();

//     // Group tasks by month
//     const groupedData = filteredTasks.reduce((acc, task) => {
//       const monthYear = dayjs(task.taskDueDate).format('YYYY-MM'); // Use dayjs formatting
//       acc[monthYear] = (acc[monthYear] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);
    

//     // Convert data to array format
//     const data = Object.entries(groupedData).map(([month, count]) => ({
//       month,
//       value: count,
//     }));

//     return data;
//   };

//   // Configuring the line chart
//   const config = {
//     data: prepareChartData(),
//     xField: 'month',
//     yField: 'value',
//     height: 400,
//   };

//   // Handler for date range change
//   // const handleDateRangeChange = (dates: [moment.Moment, moment.Moment]) => {
//   //   setDateRange([dates[0].toDate(), dates[1].toDate()]);
//   // };
//   const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null|any) => {
//     setDateRange(dates);
//   };

//   // Handler for category change
//   const handleCategoryChange = (value: string) => {
//     setSelectedCategory(value);
//   };

//   return (
//     <div>
//       <h1>Task Dashboard</h1>
//       <div>
//         <RangePicker onChange={handleDateRangeChange} />
//         <Select defaultValue="All" style={{ width: 120 }} onChange={handleCategoryChange}>
//           <Option value="All">All Categories</Option>
//           <Option value="Category A">Category A</Option>
//           <Option value="Category B">Category B</Option>
//         </Select>
//       </div>
//       <div style={{ marginTop: 20 }}>
//         <Line {...config} />
//       </div>
//     </div>
//   );
// };

// export default TaskDashboard;
// TaskDashboard.tsx
import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { Line, Pie } from '@ant-design/charts'; // Import Pie from @ant-design/charts
import { TaskAssignment } from '@/features/Task-Module/utils/functions';
import moment from 'moment';
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

  const prepareChartData = () => {
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

  const lineChartConfig = {
    data: prepareChartData(),
    xField: 'status',
    yField: 'value',
    height: 400,
  };

  const pieChartConfig = {
    data: prepareChartData(),
    angleField: 'value',
    colorField: 'status',
    height: 400,
  };

  const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null|any) => {
    setDateRange(dates);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <div>
        <RangePicker onChange={handleDateRangeChange} />
        <Select defaultValue="All" style={{ width: 120 }} onChange={handleCategoryChange}>
          <Option value="All">All Categories</Option>
          <Option value="Not Started">Not Started</Option>
          <Option value="Started">Started</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      </div>
      <div style={{ marginTop: 20 }}>
        <Line {...lineChartConfig} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Pie {...pieChartConfig} />
      </div>
    </div>
  );
};

export default TaskDashboard;
