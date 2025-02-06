"use client"

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "../ui/kanban-board";

interface KanbanCardProps {
    card: Card;
    index: number;
}

const KanbanCard = ({ card, index }: KanbanCardProps) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`kanban-card ${snapshot.isDragging ? "dragging" : ""}`}
                >
                    <h3 className="font-medium mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                </div>
            )}
        </Draggable>
    );
};

export default KanbanCard;
