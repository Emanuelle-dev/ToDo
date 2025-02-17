"use client";

import { Draggable } from "@hello-pangea/dnd";
// import { Card } from "../ui/kanban-board";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Button } from "./button";
import { Badge, Trash2, Pencil } from "lucide-react";
import { Chip } from "@heroui/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import TaskEditDialog from "./edit-task-dialog";
import { Card } from "./kanban-board";
import {Card as Card1} from "./card"

interface KanbanCardProps {
    card: Card;
    index: number;
    columnId: string;
    task_id: number;
    onDelete: (task_id: number, columnId: string) => void;
}


const KanbanCard = ({ card, index, columnId, onDelete, task_id }: KanbanCardProps) => {
    const [open, setOpen] = useState(false);
    const priorityColors: Record<"low" | "normal" | "medium" | "high", string> = {
        low: "bg-gray-300 border-gray-400",     // Baixa prioridade → Cinza
        normal: "bg-green-300 border-green-500", // Normal → Verde
        medium: "bg-yellow-300 border-yellow-500", // Média → Amarelo
        high: "bg-red-300 border-red-500",       // Alta → Vermelho
    };

    return (
        <div className="min-w-60 flex min-h-24">
            <Draggable draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                   <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`rounded-lg shadow-md p-4 cursor-move hover:shadow-lg transition-shadow w-full py-5 border relative 
                        ${snapshot.isDragging ? "ring-2 ring-indigo-400" : ""} 
                        `}
                >
                        {/* Botão da lixeira no canto superior direito */}
                        <div className="absolute top-2 right-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 className="text-black hover:text-red-600 cursor-pointer" size={15} />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza que deseja deletar a tarefa?</AlertDialogTitle>
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
                        <div className="" > 
                        <TaskEditDialog task={card} />
                        </div>
                        {/* Título da tarefa */}
                        <h3 className="font-semibold text-lg text-gray-700 dark:text-white">{card.title}</h3>
                        <h4 className="dark:text-neutral-200 text-gray-500 text-sm ">{card.description}</h4>

                    {card.priority && (
                        <div className="mt-3 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Prioridade:</span>
                                <span className="px-2 py-1 rounded-full text-white text-xs font-semibold"
                                    style={{
                                        backgroundColor: card.priority === "low" ? "#6b7280" :  // Cinza
                                                        card.priority === "normal" ? "#10b981" : // Verde
                                                        card.priority === "medium" ? "#facc15" : // Amarelo
                                                        "#ef4444"  // Vermelho
                                    }}>
                                    {card.priority === "low" ? "Baixa" : 
                                    card.priority === "normal" ? "Normal" : 
                                    card.priority === "medium" ? "Média" : 
                                    "Alta"}
                                </span>
                        </div>
                    )}
                        </div>
                    )}
                </Draggable>
            </div>
    );
};

export default KanbanCard;