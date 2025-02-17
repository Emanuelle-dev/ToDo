import { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateTask } from "../../hooks/api/useUpdateTask"; // Certifique-se do caminho correto
import { Card } from "./kanban-board";
import TaskEditor from "./tiptap";
import { SelectPriorityForm } from "./select-priority";
import { Label } from "./label";


interface TaskEditDialogProps {
    task: Card;
}
const TaskEditDialog = ({ task }: { task: Card}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.status);
    const [tag, setTag] = useState(task.tag);
    const [taskDescription, setTaskDescription] = useState("")
    const maxLength = 200;
    const updateTaskMutation = useUpdateTask();
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
    

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const handleUpdateTask = () => {
        const cleanedDescription = stripHtmlTags(taskDescription);
        updateTaskMutation.mutate({ 
            taskId: Number(task.id),
            updatedTask: { 
                title, 
                description: cleanedDescription, 
                priority: selectedPriority ?? priority,
                status
            }
        });
        setOpen(false);
    };

    return (
        <div className="absolute top-2 right-8">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Pencil className="text-black hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer" size={15} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar tarefa</DialogTitle>
                        <DialogDescription>
                            Clique em salvar para aplicar as alterações.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Formulário de edição */}
                    <div className="flex flex-col gap-4">
                        <label>Título</label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Descrição</label>
                        <TaskEditor 
                            taskDescription={taskDescription} 
                            setTaskDescription={setTaskDescription} 
                            maxLength={maxLength} 
                        />
                        <Label className="mb-1" >Prioridade:</Label>
                        <SelectPriorityForm onSelectPriority={setSelectedPriority} />
                        {/* <label>Tag</label>
                        <Input value={tag} onChange={(e) => setTag(e.target.value)} /> */}
                    </div>

                    <DialogFooter>
                        <Button onClick={handleUpdateTask} disabled={updateTaskMutation.isPending}>
                            {updateTaskMutation.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TaskEditDialog;