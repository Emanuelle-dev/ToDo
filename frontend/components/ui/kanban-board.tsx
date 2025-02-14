"use client"
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../ui/kanban-column";
import { Bold, Italic, Plus, Underline } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { Input } from "./input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { ScrollArea } from "./scroll-area";
import { useQuery } from "@tanstack/react-query";
import { DefaultService } from "../../services/sdk.gen";
import { useUpdateTask } from "@/hooks/api/useUpdateTask";
import { useDeleteTask } from "@/hooks/api/useDeleteTask";
import { useCreateTask } from "@/hooks/api/useCreateTask";
import { SelectPriorityForm } from "./select-priority";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { create } from "domain";
import { TagInput, Tag } from "emblor";

export type Card = {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "normal" | "high";
    status: "pending" | "in_progress" | "completed";
    tag?: string;
};

export type Column = {
    id: string;
    title: string;
    cards: Card[];
};

const initialColumns: Column[] = [
    {
        id: "pending",
        title: "Pendente",
        cards: [],
    },
    {
        id: "in_progress",
        title: "Em progresso",
        cards: [],
    },
    {
        id: "completed",
        title: "Concluído",
        cards: [],
    },
];

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const { toast } = useToast();
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "normal" | "high">("normal")
    const [taskStatus, setTaskStatus] = useState<"pending" | "in_progress" | "completed">("pending")
    const [open, setOpen] = useState(false)
    const [selectedPriority, setSelectedPriority] = React.useState<string | null>(null)
    const [format, setFormat] = useState<{ bold: boolean; italic: boolean; underline: boolean }>({
        bold: false,
        italic: false,
        underline: false,
    });
    const handleToggle = (type: "bold" | "italic" | "underline") => {
        setFormat((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const applyFormatting = (text: string) => {
        let formattedText = text;
        if (format.bold) formattedText = `**${formattedText}**`;
        if (format.italic) formattedText = `*${formattedText}*`;
        if (format.underline) formattedText = `__${formattedText}__`;
        return formattedText;
    };
    const maxLength = 200;

    const [taskTag, setTaskTags] = useState<Tag[]>([]);

    // chamada de Apis
    // api de listar Tasks
    const { data: response } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => DefaultService.appApiListTasks(),
        refetchInterval: 1000 * 60,
    });

    useEffect(() => {
        if (response) {
            const newColumns: Column[] = [
                { id: "pending", title: "Pendente", cards: [] },
                { id: "in_progress", title: "Em progresso", cards: [] },
                { id: "completed", title: "Concluído", cards: [] },
            ];

            response.forEach((task: any) => {
                let columnId = "pending";
                if (task.status === "in_progress") columnId = "in_progress";
                else if (task.status === "completed") columnId = "completed";

                const column = newColumns.find(col => col.id === columnId);
                if (column) {
                    column.cards.push({
                        id: task.id ? task.id.toString() : "",
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        status: task.status,
                        tag: task.tag
                    });
                }
            });

            setColumns(newColumns);
        }
    }, [response]);

    //   /////////////////////////////////////////////

    //   // api de criar Tasks

    const createTaskMutation = useCreateTask();
    const handleAddTask = (task_id: number, title: string, description: string, priority: "low" | "medium" | "normal" | "high", status: "pending" | "in_progress" | "completed", tag: string) => {
        createTaskMutation.mutate({ title, description, priority, status, tag });
    }
    // /////////////////////////////////////////////

    // // api de atualizar Tasks

    const updateTaskMutation = useUpdateTask();
    const handleUpdateTask = (taskId: number, columnId: string, title: string, description: string, priority: string, status: string, tag: string) => {
        updateTaskMutation.mutate({ taskId, updatedTask: { title, description, priority, status, tag } });
    }

    // /////////////////////////////////////////////

    // // api de deletar Tasks
    const deleteTaskMutation = useDeleteTask();
    const handleDeleteTask = (task_id: number, columnId: string) => {
        deleteTaskMutation.mutate(task_id);
    }
    // /////////////////////////////////////////////

    const onDragEnd = async (result: any) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destColumn = columns.find((col) => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) return;

        const newSourceCards = Array.from(sourceColumn.cards);
        const newDestCards = Array.from(destColumn.cards);

        const [movedTask] = newSourceCards.splice(source.index, 1);
        movedTask.status = destination.droppableId; // Atualiza o status da task no frontend

        newDestCards.splice(destination.index, 0, movedTask);

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

        handleUpdateTask(
            Number(movedTask.id), // ID da task
            destination.droppableId, // Novo status
            movedTask.title,
            movedTask.description,
            movedTask.priority,
            destination.droppableId, // Novo status atualizado
            movedTask.tag || ""
        );
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full flex justify-center gap-4 mb-4">
                    {columns.map((column) => (
                        <div key={column.id} className="text-center font-semibold text-lg flex-1 min-w-[300px]">
                            {column.title}
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center max-h-[500px]">
                    {columns.map((column) => (
                        <div key={column.id} className="flex flex-col gap-4 flex-1 max-h-[600px] min-w-[300px]  max-w-xl rounded-lg p-2 shadow-lg mx-2 shadow-indigo-500/50 ">
                            <ScrollArea className="max-h-[500px] overflow-y-auto">
                                <KanbanColumn
                                    column={column}
                                    onDelete={handleDeleteTask}
                                    className="bg-card text-card-foreground justify-center rounded-lg shadow-lg p-4 w-full flex flex-col gap-2"
                                />
                            </ScrollArea>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            <div className="w-40 flex absolute bottom-4 left-2 hover:border-indigo-500">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="flex items-center">
                            <Plus className="opacity-50 px-0" />
                            Adicionar tarefa
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="max-w-lg mx-auto">
                        <SheetHeader>
                            <SheetTitle className="text-center font-semibold">Criar Tarefa</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-4">
                            {/* Título */}
                            <div className="grid grid-cols-1 gap-1">
                                <Label className="mb-1" htmlFor="task-title">Título:</Label>
                                <Input
                                    id="task-title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>

                            {/* Descrição com opções de formatação */}

                            {/* Tags */}
                            <div className="grid grid-cols-1 gap-1">
                                <Label htmlFor="task-tags">Tags:</Label>
                                <TagInput
                                    id="task-tags"
                                    tags={taskTag}
                                    setTags={(newTags) => setTaskTags(newTags)}
                                    placeholder="Adicionar tag"
                                    activeTagIndex={-1}
                                    setActiveTagIndex={() => { }}
                                    styleClasses={{
                                        inlineTagsContainer: "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
                                        input: "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                                        tag: {
                                            body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                                            closeButton: "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                                        },
                                    }}
                                />
                            </div>

                            {/* Prioridade */}
                            <div className="grid grid-cols-1 gap-1">
                                <Label>Prioridade:</Label>
                                <SelectPriorityForm onSelectPriority={setSelectedPriority} />
                            </div>
                        </div>
                                    <div className="grid grid-cols-1">
                                        <ToggleGroup type="multiple" className="flex mb-1">
                                            <ToggleGroupItem
                                                value="bold"
                                                aria-label="Toggle bold"
                                                onClick={() => handleToggle("bold")}
                                                className={format.bold ? "bg-gray-300" : ""}
                                            >
                                                <Bold className="h-3 w-3" />
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value="italic"
                                                aria-label="Toggle italic"
                                                onClick={() => handleToggle("italic")}
                                                className={format.italic ? "bg-gray-300" : ""}
                                            >
                                                <Italic className="h-3 w-3" />
                                            </ToggleGroupItem>
                                            <ToggleGroupItem
                                                value="underline"
                                                aria-label="Toggle underline"
                                                onClick={() => handleToggle("underline")}
                                                className={format.underline ? "bg-gray-300" : ""}
                                            >
                                                <Underline className="h-3 w-3" />
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                        <Textarea
                                            id="task-description"
                                            value={applyFormatting(taskDescription)}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            maxLength={200}
                                            placeholder="Comentários"
                                            className="w-full h-24"
                                        />
                            <div className="text-right text-sm text-gray-500">
                                {taskDescription.length}/{maxLength} 
                            </div>
                                    </div>
                        {/* Botão Criar */}
                        <SheetFooter className="mt-4">
                            <SheetClose asChild>
                                <Button
                                    onClick={() => handleAddTask(
                                        Date.now(),
                                        taskTitle,
                                        taskDescription,
                                        (selectedPriority as "low" | "medium" | "normal" | "high") || "normal",
                                        taskStatus || "pending",
                                        taskTag.join(", ")
                                    )}
                                    className="border rounded-xl w-28"
                                >
                                    Salvar
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}

export default KanbanBoard;