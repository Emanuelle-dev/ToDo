"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "../../hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Schema atualizado para aceitar a prioridade
const FormSchema = z.object({
  priority: z.enum(["low", "medium", "normal", "high"], {
    required_error: "Please select a priority.",
  }),
})

export function SelectPriorityForm({ onSelectPriority }: { onSelectPriority: (value: string) => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSelectPriority(data.priority)
    toast({
      title: "Priority Selected",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={(value) => {
                field.onChange(value)
                onSelectPriority(value)
              }} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                </FormControl>
                <SelectContent className="hover:shadow-indigo-500">
                  <SelectItem className="dark:hover:bg-purple-400 font-semibold" value="low">Baixa</SelectItem>
                  <SelectItem className="dark:hover:bg-purple-400 font-semibold" value="normal">Normal</SelectItem>
                  <SelectItem className="dark:hover:bg-purple-400 font-semibold" value="medium">Média</SelectItem>
                  <SelectItem className="dark:hover:bg-purple-400 font-semibold" value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}