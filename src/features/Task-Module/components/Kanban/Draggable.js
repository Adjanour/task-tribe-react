import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from 'antd';

function Draggable(props) {
    const { id, index, children } = props;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </Card>
    );
}

export default Draggable;
