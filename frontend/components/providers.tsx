"use client";

import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "./ui/teme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 1000 * 60 * 5, // 5 minutes
              retry: 1,
            },
            mutations: {
              onError: (error: any) => {
                let msg: string = error?.body?.message || error.message;
                if (!msg) return toast.error("Erro");
  
                if (msg.includes("status code 403")) {
                  msg = "Você não tem permissão para fazer esta ação";
                } else if (msg.includes("status code 401")) {
                  msg = "Você precisa estar logado para fazer esta ação";
                } else if (msg.includes("status code 500")) {
                  msg = "Erro interno";
                }
                toast.error("Erro", { description: msg });
              },
            },
          },
        }),
    );

    return (
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>

      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      </ThemeProvider>
    );
}
export default Providers;