import { DndContext } from '@dnd-kit/core';
import React from 'react';

interface PropsWithChildren {
  children: React.ReactNode;
}

export const KanbanBoardContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto', padding: '32px' }}>
      <div
        className='rounded-md shadow-md bg-white mx-auto grid grid-cols-3 p-2 h-full'
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DndContext>
      {children}
    </DndContext>
  );
};
