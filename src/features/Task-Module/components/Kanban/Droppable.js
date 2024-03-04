import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card } from 'antd';

function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        border: isOver ? '2px dashed green' : '1px dashed gray',
        padding: '16px',
        marginBottom: '16px',
    };

    return (
        <Card ref={setNodeRef} style={style}>
            {props.children}
        </Card>
    );
}

export default Droppable;
