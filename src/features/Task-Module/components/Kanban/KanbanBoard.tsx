// // KanbanBoard.js (Kanban board component)
// import React, { useState } from 'react';
// import Column from './Column';

// const initialTasks = [
//   { id: 1, name: 'Task 1', status: 'todo' },
//   { id: 2, name: 'Task 2', status: 'inProgress' },
//   { id: 3, name: 'Task 3', status: 'done' },
//   { id:4 , name: 'Task 1', status: 'todo' },
//   { id: 5, name: 'Task 2', status: 'inProgress' },
//   { id: 6, name: 'Task 3', status: 'done' },
//   { id: 7, name: 'Task 1', status: 'todo' },
//   { id: 8, name: 'Task 2', status: 'inProgress' },
//   { id: 9, name: 'Task 3', status: 'done' },
// ];

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState(initialTasks);

//   const handleTaskClick = (taskId:number) => {
//     // Move task to the next column (status)
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               status:
//                 task.status === 'todo'
//                   ? 'inProgress'
//                   : task.status === 'inProgress'
//                   ? 'done'
//                   : 'todo',
//             }
//           : task
//       )
//     );
//   };

//   return (
//     <div className="flex justify-between p-4 bg-gray-200">
//       <Column
//         title="To Do"
//         tasks={tasks.filter((task) => task.status === 'todo')}
//         onTaskClick={handleTaskClick}
//         columnStyle="bg-blue-200"
//       />
//       <Column
//         title="In Progress"
//         tasks={tasks.filter((task) => task.status === 'inProgress')}
//         onTaskClick={handleTaskClick}
//         columnStyle="bg-yellow-200"
//       />
//       <Column
//         title="Done"
//         tasks={tasks.filter((task) => task.status === 'done')}
//         onTaskClick={handleTaskClick}
//         columnStyle="bg-green-200"
//       />
//     </div>
//   );
// };

// export default KanbanBoard;

// import React, { useState } from 'react';
// import { List, Card, Row, Col } from 'antd';
// import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

// interface Task {
//   id: number;
//   title: string;
// }

// interface BoardData {
//   [key: string]: Task[];
// }

// const KanbanBoard: React.FC = () => {
//   const initialData: BoardData = {
//     todo: [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }],
//     inProgress: [{ id: 3, title: 'Task 3' }],
//     done: [{ id: 4, title: 'Task 4' }, { id: 5, title: 'Task 5' }],
//   };

//   const [boardData, setBoardData] = useState(initialData);

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const { source, destination } = result;
//     const sourceColumn = boardData[source.droppableId];
//     const destinationColumn = boardData[destination.droppableId];
//     const [movedTask] = sourceColumn.splice(source.index, 1);
//     destinationColumn.splice(destination.index, 0, movedTask);

//     setBoardData({ ...boardData });
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Row gutter={16}>
//         {Object.keys(boardData).map((column) => (
//           <Col key={column} span={8}>
//             <Card title={column} style={{ minHeight: '300px' }}>
//               <Droppable droppableId={column} key={column}>
//                 {(provided:any) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     <List
//                       dataSource={boardData[column]}
//                       renderItem={(item, index) => (
//                         <Draggable
//                           key={item.id.toString()}
//                           draggableId={item.id.toString()}
//                           index={index}
//                         >
//                           {(provided:any) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                               <List.Item>
//                                 <Card>{item.title}</Card>
//                               </List.Item>
//                             </div>
//                           )}
//                         </Draggable>
//                       )}
//                     />
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </DragDropContext>
//   );
// };

// export default KanbanBoard;

// import React, { useState } from 'react';
// import { List, Card, Row, Col } from 'antd';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// interface Task {
//   id: number;
//   title: string;
// }

// interface BoardData {
//   [key: string]: Task[];
// }

// const KanbanBoard: React.FC = () => {
//   const initialData: BoardData = {
//     todo: [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }],
//     inProgress: [{ id: 3, title: 'Task 3' }],
//     done: [{ id: 4, title: 'Task 4' }, { id: 5, title: 'Task 5' }],
//   };

//   const [boardData, setBoardData] = useState(initialData);

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const { source, destination } = result;
//     const sourceColumn = boardData[source.droppableId];
//     const destinationColumn = boardData[destination.droppableId];
//     const [movedTask] = sourceColumn.splice(source.index, 1);
//     destinationColumn.splice(destination.index, 0, movedTask);

//     setBoardData({ ...boardData });
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Row gutter={16}>
//         {Object.keys(boardData).map((column) => (
//           <Col key={column} span={8}>
//             <Card title={column} style={{ minHeight: '300px' }}>
//               <Droppable droppableId={column} key={column}>
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     <List
//                       dataSource={boardData[column]}
//                       renderItem={(item, index) => (
//                         <Draggable
//                           key={item.id.toString()}
//                           draggableId={item.id.toString()}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                               <List.Item>
//                                 <Card>{item.title}</Card>
//                               </List.Item>
//                             </div>
//                           )}
//                         </Draggable>
//                       )}
//                     />
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </DragDropContext>
//   );
// };

// export default KanbanBoard;

import React, { useState } from 'react';
import { List, Card, Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Task {
  id: string; // Change to string type
  title: string;
}

interface BoardData {
  [key: string]: Task[];
}

const KanbanBoard: React.FC = () => {
  const initialData: BoardData = {
    todo: [{ id: '1', title: 'Task 1' }, { id: '2', title: 'Task 2' }],
    inProgress: [{ id: '3', title: 'Task 3' }],
    done: [{ id: '4', title: 'Task 4' }, { id: '5', title: 'Task 5' }],
  };

  const [boardData, setBoardData] = useState(initialData);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const sourceColumn = boardData[source.droppableId];
    const destinationColumn = boardData[destination.droppableId];
    const movedTask = sourceColumn.find((task) => task.id === draggableId);

    if (movedTask) {
      sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, movedTask);
      setBoardData({ ...boardData });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16}>
        {Object.keys(boardData).map((column) => (
          <Col key={column} span={8}>
            <Card title={column} style={{ minHeight: '300px' }}>
              <Droppable droppableId={column} key={column}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <List
                      dataSource={boardData[column]}
                      renderItem={(item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <List.Item>
                                <Card>{item.title}</Card>
                              </List.Item>
                            </div>
                          )}
                        </Draggable>
                      )}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;


