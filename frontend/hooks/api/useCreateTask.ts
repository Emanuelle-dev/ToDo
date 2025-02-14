import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DefaultService } from '../../services/sdk.gen';


export const useCreateTask = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: {title: string; description: string; priority: "low" | "medium" | "normal" | "high"; status: "pending" | "in_progress" | "completed"; tag: string }) =>
      DefaultService.appApiCreateTask ({ requestBody: values }),
      onSuccess: () => {
      toast.success("Novo card adicionado com sucesso!", {
        duration: 10000, // 10 segundos
        position: "top-center",
      });
    },
    onError: () => {
      toast.error("Não foi possível criar a tarefa.", {
        duration: 10000, // 10 segundos
        position: "top-center",
      });
    },
  });
};