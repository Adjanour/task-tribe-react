import React from 'react'
import TaskTable from '../Elements/TaskTable'
import { useTaskAPI } from '../../hooks/useTaskAPI'
import { useTaskContext } from '../../stores/TaskContext'

export const DataGrid = () => {
    const task = useTaskContext()
  return (
    <>
    <TaskTable tasks={task.Tasks} yScroll={5000} pageSize={3000} setState={undefined} />
    </>
  )
}
