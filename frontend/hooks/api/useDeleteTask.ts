import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DefaultService } from '../../services/sdk.gen';
import { toast } from "sonner";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => DefaultService.appApiDeleteTask({ taskId }),
    onSuccess: () => {
      toast.success("Tarefa excluída com sucesso!", {
        duration: 10000, // 10 segundos
        position: "top-center",
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Atualiza a lista de tarefas
    },
  });
};