import React, { useState } from 'react';
import { Table, Tooltip, Progress } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { TaskUpdate } from '@/features/Task-Module';
import TaskDetailsModal from '@/features/Task-Module/components/Elements/TaskDetailsModal';

interface TaskTableProps {
  tasks: TaskUpdate[];
  yScroll: number;
  pageSize: number;
  refetchData: any;
}

const getStatus = (progress: number) => {
  if (progress === 100) {
    return 'success';
  } else if (progress > 70) {
    return 'active';
  } else {
    return 'exception';
  }
};

const formatDate = (date: string): string => {
  const newDate = new Date(date.split('T')[0]);
  return newDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const TaskTableRow = ({ record, onClick }: { record: TaskUpdate; onClick: () => void }) => (
  <Tooltip className="bg-white-500 text-black dark:text-white dark:bg-black" title={record.taskUpdateDetails}>
    <span onClick={onClick}>{record.taskUpdateDetails}</span>
  </Tooltip>
);

const TaskTable: React.FC<TaskTableProps> = ({ tasks, yScroll, pageSize, refetchData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedTaskId('');
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<TaskUpdate> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<TaskUpdate> = [
    {
      title: 'Title',
      dataIndex: 'tkuTitle',
      fixed: 'left',
      width: 120,
      align: 'left',
    },
    {
      title: 'Progress',
      dataIndex: 'tkuProgress',
      width: 150,
      align: 'left',
      key: 'taskProgress',
      render: (progress) => (
        <Progress percent={progress} style={{ width: '75%' }} size={[150, 25]} format={() => `${progress}%`} showInfo status={getStatus(progress)} />
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'tkuCreatedDate',
      width: 150,
      filtered: true,
      align: 'left',
      render: (date) => formatDate(date),
    },
    {
      title: 'Updated Date',
      dataIndex: 'tkuUpdatedDate',
      width: 150,
      align: 'left',
      render: (date) => formatDate(date),
    },
    {
      title: 'Details',
      dataIndex: 'tkuDescription',
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <TaskTableRow record={record} onClick={() => handleTaskClick(record.taskUpdateId.toString())} />
      ),
    },
  ];

  return (
    <>
      <Table<TaskUpdate>
        onRow={(record) => {
          return {
            onClick: () => handleTaskClick(record.taskUpdateId.toString()),
            onChange: () => {
              setSelectedRowKeys([record.taskUpdateId.toString()]);
            },
          };
        }}
        className="mb-0"
        key={1}
        size="middle"
        rowSelection={rowSelection}
        dataSource={tasks}
        columns={columns}
        bordered
        pagination={{ pageSize }}
        scroll={{ x: '1300', y: yScroll }}
      />
      <TaskDetailsModal key={5} isVisible={isModalVisible} taskId={selectedTaskId} onClose={handleModalCancel} refetchData={refetchData} />
    </>
  );
};

export default TaskTable;
