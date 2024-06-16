import { DragOverlay, useDraggable } from "@dnd-kit/core";
import React from "react";

interface Props {
  id: string;
  data?: object;
}

const KanbanItem: React.FC<React.PropsWithChildren<Props>> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div className="relative">
      <div ref={setNodeRef} {...attributes} {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "5px",
          padding: "10px",
          position: "relative",
          cursor: "grab",
          fill:"#f3f3f3",
          backgroundColor:"#f2f2f2"
        }}
      >
        {children}
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div style={{ cursor: 'grabbing', borderRadius: "5px",
          padding: "10px", }} className="rounded-md shadow-md ">
              {children}
            </div>
          </DragOverlay>
        )}
      </div>
    </div>
  );
};

export default KanbanItem;
