"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "../ui/kanban-board";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Button } from "./button";
import { Badge, Trash2 } from "lucide-react";
import { Chip } from "@heroui/react";

interface KanbanCardProps {
    card: Card;
    index: number;
    columnId: string;
    task_id: number;
    onDelete: (task_id: number, columnId: string) => void;
}

const priorityColors: Record<string, "default" | "secondary" | "success" | "warning" | "primary" | "danger" | undefined> = {
    low: "default",
    medium: "secondary",
    normal: "success",
    high: "warning",
};

const priorityLabels: Record<string, string> = {
    low: "Baixa",
    medium: "Média",
    normal: "Normal",
    high: "Alta",
};

const KanbanCard = ({ card, index, columnId, onDelete, task_id }: KanbanCardProps) => {
    return (
        <div className="w-full flex">
            <Draggable draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`dark:bg-stone-100 rounded-lg shadow-md p-4 cursor-move hover:shadow-lg transition-shadow w-full min-w-[460px] max-w-[350px] py-5 border relative ${
                            snapshot.isDragging ? "ring-2 ring-indigo-400" : ""
                        }`}
                    >
                        {/* Botão da lixeira no canto superior direito */}
                        <div className="absolute top-2 right-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 className="text-black hover:text-gray-700 cursor-pointer" size={15} />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza que deseja continuar?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Essa ação não pode ser desfeita. Sua tarefa será deletada permanentemente do quadro.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(task_id, columnId)}>
                                            Continuar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        {/* Título da tarefa */}
                        <h3 className="font-semibold text-gray-800">{card.title}</h3>
                        <h4 className="text-gray-500">{card.description}</h4>

                        {/* {card.tag && (
                            <Badge color="primary" className="mt-2">
                                {card.tag}
                            </Badge>
                        )}
                        <div className="flex gap-2 mt-2">
                            <Chip color={priorityColors[card.priority]}>
                                {priorityLabels[card.priority]}
                            </Chip>
                        </div> */}
                        </div>
                    )}
                </Draggable>
            </div>
    );
};

export default KanbanCard;