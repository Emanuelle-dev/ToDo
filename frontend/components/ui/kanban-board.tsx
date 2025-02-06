"use client"

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../ui/kanban-column";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { Input } from "./input";

export type Card = {
    id: string;
    title: string;
    description: string;
};

export type Column = {
    id: string;
    title: string;
    cards: Card[];
};

const initialColumns: Column[] = [
    {
        id: "todo",
        title: "Pendente",
        cards: [
            { id: "1", title: "First Task", description: "This needs to be done" },
            { id: "2", title: "Second Task", description: "Another important task" },
        ],
    },
    {
        id: "inprogress",
        title: "Em progresso",
        cards: [{ id: "3", title: "Working On", description: "Currently in progress" }],
    },
    {
        id: "done",
        title: "Feito",
        cards: [{ id: "4", title: "Completed", description: "This task is completed" }],
    },
];

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const { toast } = useToast();

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destColumn = columns.find((col) => col.id === destination.droppableId);
        if (!sourceColumn || !destColumn) return;

        const newSourceCards = Array.from(sourceColumn.cards);
        const newDestCards = Array.from(destColumn.cards);

        if (source.droppableId === destination.droppableId) {
            const [removed] = newSourceCards.splice(source.index, 1);
            newSourceCards.splice(destination.index, 0, removed);
            const newColumns = columns.map((col) => {
                if (col.id === source.droppableId) {
                    return { ...col, cards: newSourceCards };
                }
                return col;
            });
            setColumns(newColumns);
            return;
        }

        const [removed] = newSourceCards.splice(source.index, 1);
        newDestCards.splice(destination.index, 0, removed);
        const newColumns = columns.map((col) => {
            if (col.id === source.droppableId) {
                return { ...col, cards: newSourceCards };
            }
            if (col.id === destination.droppableId) {
                return { ...col, cards: newDestCards };
            }
            return col;
        });

        setColumns(newColumns);
        toast({
            title: "Card moved",
            description: `Moved "${removed.title}" to ${destColumn.title}`,
        });
    };

    const addNewCard = (columnId: string) => {
        if (columnId !== "todo") {
            toast({
                title: "Action not allowed",
                description: "You can only add cards to the 'Pendente' column",
            });
            return;
        }

        const newCard: Card = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Task",
            description: "Click to edit this task",
        };
        const newColumns = columns.map((col) => {
            if (col.id === columnId) {
                return { ...col, cards: [...col.cards, newCard] };
            }
            return col;
        });
        setColumns(newColumns);
        toast({
            title: "Card added",
            description: "New card added to the board",
        });
    };

    return (
        <>
            <header className="w-full flex justify-center mb-10">
                <Input className="size-full xl:w-1/2" placeholder="Pesquisar" />
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full min-h-screen bg-background p-8 flex justify-center">
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {columns.map((column) => (
                            <div key={column.id} className="flex flex-col gap-4 w-80 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">{column.title}</h2>
                                    {column.id === "todo" && (
                                        <Button variant="ghost" size="icon" onClick={() => addNewCard(column.id)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <KanbanColumn column={column} className=" bg-indigo-600 justify-center rounded-lg shadow-lg p-4 min-h-[500px] w-full flex flex-col-reverse"/>
                            </div>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default KanbanBoard;