"use client"

import { Droppable } from "@hello-pangea/dnd";
import { Column } from "../ui/kanban-board";
import KanbanCard from "../ui/kanban-card";
import { cn } from "@/app/lib/utils";

interface KanbanColumnProps {
    column: Column;
    className: string;
    onDelete: (task_id: number, columnId: string) => void;
}

const KanbanColumn = ({column, className, onDelete }: KanbanColumnProps) => {
    console.log("Column:",column.title, column.cards)
    return (
        <div className={`${className} flex flex-col gap-2 min-h-[400px]`} >
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                        "p-2 rounded-lg transition-all min-h-[400px]",
                        snapshot.isDraggingOver
                    )}
                >
                    {column.cards.map((card, index) => (
                        <KanbanCard key={card.id} card={card} index={index} columnId={column.id} task_id={parseInt(card.id)} onDelete={onDelete} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div>
    );
};

export default KanbanColumn;
