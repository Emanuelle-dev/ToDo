import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../../services/sdk.gen';
import { toast } from "sonner";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ taskId, updatedTask }: { taskId: number; updatedTask: any }) =>
            DefaultService.appApiUpdateTask({ taskId, requestBody: updatedTask }),
        onSuccess: () => {
            toast("Tarefa atualizada com sucesso!", {
                duration: 1000 * 10,
                position: "top-center",
            });

            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Atualiza a lista de tarefas
        },
        onError: () => {
            toast.error("Erro ao atualizar a tarefa.", {
                duration: 1000 * 10,
                position: "top-center",
            });
        },
    });

    return mutation;
};