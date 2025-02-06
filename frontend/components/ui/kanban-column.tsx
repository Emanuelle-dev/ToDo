"use client"

import { Droppable } from "@hello-pangea/dnd";
import { Column } from "../ui/kanban-board";
import KanbanCard from "../ui/kanban-card";
import { cn } from "@/app/lib/utils";

interface KanbanColumnProps {
    column: Column;
    className: string;
}

const KanbanColumn = ({ column, className }: KanbanColumnProps) => {
    return (
        <div className={cn(className)} >
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-column ${
                        snapshot.isDraggingOver ? "bg-secondary/50" : ""
                    }`}
                >
                    {column.cards.map((card: any, index: number) => (
                        <KanbanCard key={card.id} card={card} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div>
    );
};

export default KanbanColumn;
