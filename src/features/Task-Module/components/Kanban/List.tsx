import React from 'react'
import { KanbanBoardContainer , KanbanBoard} from './Board'
import KanbanColumn from './Column'
import KanbanItem from './Item'
import { useTaskContext } from '../../stores/TaskContext'

export const List = () => {
    const data = useTaskContext()

    console.log(data)
  return (
    <>
    <KanbanBoardContainer>
        <KanbanBoard>
        <KanbanColumn >
            {/* <KanbanItem>
                This is my first to do
            </KanbanItem> */}
        </KanbanColumn>
        
        </KanbanBoard>
    </KanbanBoardContainer>
    </>
  )
}
