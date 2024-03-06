import { DndContext } from '@dnd-kit/core'
import React from 'react'

export const KanbanBoardContainer = ({children}:React.PropsWithChildren) => {
  return (
    <div
    >
        <div style={{
            width: '100%',
            display: 'flex',
            height: '100%',
            overflow: 'scroll',
            padding: '32px',
        }} className='rounded-md shadow-md bg-white mx-auto justify-between p-2 h-full'>
            {children}
        </div>

    </div>
  )
}

export const KanbanBoard = ({children}:React.PropsWithChildren) => {
  return (
    <DndContext>
        {children}
    </DndContext>
  )
}