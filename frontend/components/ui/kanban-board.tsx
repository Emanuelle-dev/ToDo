"use client"
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../ui/kanban-column";
import {  Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { Input } from "./input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Label } from "./label";
import { ScrollArea } from "./scroll-area";
import { useQuery } from "@tanstack/react-query";
import { DefaultService } from "../../services/sdk.gen";
import { useUpdateTask } from "@/hooks/api/useUpdateTask";
import { useDeleteTask } from "@/hooks/api/useDeleteTask";
import { useCreateTask } from "@/hooks/api/useCreateTask";
import { SelectPriorityForm } from "./select-priority";
import { TagInput } from "emblor";
import { useEdgeStore } from "@/app/lib/edgestore";
import Link from "next/link";
import { FileState, MultiFileDropzone } from "./dropzone-image";
import { UploadAbortedError } from '@edgestore/react/errors';
import TaskEditor from "./tiptap";

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

function KanbanBoard() {    
    const [searchTerm, setSearchTerm] = useState("");
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [file, setFile] = useState<File>();
    const {edgestore} = useEdgeStore();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const [uploadRes, setUploadRes] = React.useState<
    {
      url: string;
      filename: string;
    }[]
  >([]);
    const [fileStates, setFileStates] = useState<FileState[]>([]);    
    function updateFileState(key: string, changes: Partial<FileState>) {
        setFileStates((prevStates) => {
          return prevStates.map((fileState) => {
            if (fileState.key === key) {
              return { ...fileState, ...changes };
            }
            return fileState;
          });
        });
      }


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

    const [hoveredPosition, setHoveredPosition] = useState<Record<string, number>>({});
    const [hoveredColumn, setHoveredColumn] = useState<Record<string, string | boolean>>({});
    const handleMouseEnter = (columnId: string) => {
        const columnIndex = columns.findIndex(col => col.id === columnId);
        if (columnIndex === -1) return;
    
        const adjacentColumns = {
            prev: columnIndex > 0 ? columns[columnIndex - 1].id : null,
            next: columnIndex < columns.length - 1 ? columns[columnIndex + 1].id : null
        };
    
        setHoveredColumn((prev) => ({
            ...prev,
            [columnId]: true,
            ...(adjacentColumns.prev ? { [adjacentColumns.prev]: "adjacent" } : {}),
            ...(adjacentColumns.next ? { [adjacentColumns.next]: "adjacent" } : {})
        }));
    };

    const handleMouseLeave = (columnId: string) => {
        setHoveredColumn({});
        setHoveredPosition({});
    };


    const maxLength = 200;
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

    const stripHtmlTags = (html: string) => {
        return html.replace(/<\/?[^>]+(>|$)/g, ""); 
    };

    const createTaskMutation = useCreateTask();
    const handleAddTask = (task_id: number, title: string, description: string, priority: "low" | "medium" | "normal" | "high", status: "pending" | "in_progress" | "completed") => {
        const cleanDescription = stripHtmlTags(description);

        createTaskMutation.mutate({ title, description: cleanDescription, priority, status});
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
                    <div className="absolute w-40 flex items-center">
                    <Input
                        className="flex-1 p-2 border rounded-md w-20 max-w-sm"
                        placeholder="Pesquisar tarefas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="w-full flex justify-center gap-4 mb-4">
                    {columns.map((column) => (
                        <div key={column.id} className="text-center font-semibold text-lg flex-1 min-w-[300px]">
                            {column.title}
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center h-[calc(90vh-100px)]">
                    {columns.map((column) => (
                        <div key={column.id} className={`flex flex-col gap-4 flex-1 h-full min-w-[300px] rounded-lg p-2 shadow-lg mx-2 shadow-indigo-500/50 hover:border-indigo-300 transition-all border-2 
           ${hoveredColumn[column.id] === true ? "border-indigo-500 shadow-lg shadow-[rgba(89,0,130,0.47)]" : ""}
        ${hoveredColumn[column.id] === "adjacent" ? " opacity-65" : ""}
        ${!hoveredColumn[column.id] ? "border-transparent" : ""}
    } `}
         onMouseEnter={() => handleMouseEnter(column.id)} 
         onMouseLeave={() => handleMouseLeave(column.id)}>
                            <ScrollArea className="h-full overflow-y-auto ">
                            <KanbanColumn
                                column={{
                                    ...column,
                                    cards: column.cards.filter(card =>
                                        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        card.description.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                }}
                                onDelete={handleDeleteTask}
                                className=""
                            />
                            </ScrollArea>
                        </div>
                    ))}
                </div>
            </DragDropContext>

                    <div className="absolute bottom-4 left-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="flex items-center bg-red-300 hover:bg-red-400 dark:bg-white dark:hover:bg-white">
                                    <Plus className="dark:opacity-50 px-0 dark:text-black text-red-900" />
                                    <label className="text-red-950 dark:text-black">Adicionar tarefa</label> 
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="max-w-lg mx-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-center font-semibold">Criar Tarefa</SheetTitle>
                                </SheetHeader>
                            {/* Título */}
                            <div className="flex justify-between gap-4"> 
                            <div className="flex flex-col w-56 gap-2">
                                <Label className="mb-1" htmlFor="task-title">Título:</Label>
                                <Input
                                    id="task-title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <Label className="mb-1" >Prioridade:</Label>
                                <SelectPriorityForm onSelectPriority={setSelectedPriority} />
                            </div>
                            </div>

                            {/* Descrição com opções de formatação */}

                            {/* Tags */}
                            {/* <div className="grid grid-cols-1 gap-1">
                                <Label htmlFor="task-tags">Tags:</Label>
                                <TagInput
                                    id="task-tags"
                                    tag={taskTag}
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
                            </div> */}

                            {/* Prioridade */}
                            <div className="grid grid-cols-1 gap-2 mb-2 mt-3">
                            <Label className="gap-2">Descrição:</Label>
                            <TaskEditor taskDescription={taskDescription} setTaskDescription={setTaskDescription} maxLength={maxLength} />
                        </div>

                        <div className = "flex flex-col gap-2 mt-3">
                            <Label>Upload de arquivos:</Label>
                        <MultiFileDropzone
                            value={fileStates}
                            dropzoneOptions={{
                            maxFiles: 5,
                            maxSize: 1024 * 1024 * 1, // 1 MB
                            }}
                            onChange={setFileStates}
                            onFilesAdded={async (addedFiles) => {
                            setFileStates([...fileStates, ...addedFiles]);
                            }}
                        />
                            <Button
                                    className="bg-white hover:bg-white "
                                    onClick={async () => {
                                    await Promise.all(
                                        fileStates.map(async (fileState) => {
                                        try {
                                            if (fileState.progress !== 'PENDING') return;
                                            const abortController = new AbortController();
                                            updateFileState(fileState.key, { abortController });
                                            const res = await edgestore.myPublicImages.upload({
                                            file: fileState.file,
                                            signal: abortController.signal,
                                            onProgressChange: async (progress) => {
                                                updateFileState(fileState.key, { progress });
                                                if (progress === 100) {
                                                // wait 1 second to set it to complete
                                                // so that the user can see the progress bar
                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                updateFileState(fileState.key, { progress: 'COMPLETE' });
                                                }
                                            },
                                            });
                                            setUploadRes((uploadRes) => [
                                            ...uploadRes,
                                            {
                                                url: res.url,
                                                filename: fileState.file.name,
                                            },
                                            ]);
                                        } catch (err) {
                                            console.error(err);
                                            if (err instanceof UploadAbortedError) {
                                            updateFileState(fileState.key, { progress: 'PENDING' });
                                            } else {
                                            updateFileState(fileState.key, { progress: 'ERROR' });
                                            }
                                        }
                                        }),
                                    );
                                    }}
                                    disabled={
                                    !fileStates.filter((fileState) => fileState.progress === 'PENDING')
                                        .length
                                    }
                                >
                                   <label className="text-red-950 dark:text-black hover:bg-white">Upload</label> 
                                </Button>
                                {uploadRes.map((res, index) => (
                                    <Link key={index} href={res.url} target="_blank" className="text-sm">
                                        {res.filename}
                                    </Link>
                                ))}
                                {/* {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">Thumbnail URL</Link>} */}
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
                                        )}
                                    className="border rounded-xl w-28 dark:bg-white bg-red-300 dark:hover:bg-white hover:bg-red-400"
                                >
                                   <label className="dark:text-black text-red-950"> Salvar</label>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                </div>
               {/* </div>  */}
        </>
    );
}


export default KanbanBoard;