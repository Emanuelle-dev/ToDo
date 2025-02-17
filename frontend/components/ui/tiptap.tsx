import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import Underline from "@tiptap/extension-underline";
import { Button } from "../ui/button";
import { useState } from "react";

interface TaskEditorProps {
    taskDescription: string;
    setTaskDescription: (description: string) => void;
    maxLength: number;
}

const TaskEditor = ({ taskDescription, setTaskDescription, maxLength }: TaskEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: taskDescription,
        onUpdate: ({ editor }) => {
            setTaskDescription(editor.getHTML()); // Atualiza o estado com HTML formatado
        },
    });

    if (!editor) return null;

    return (
        <div className="border p-2 rounded-lg text-left">
            {/* Botões de Formatação */}
            <div className="flex gap-2 mb-2">
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-gray-300 p-2" : "p-2"}
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-gray-300 p-2" : "p-2"}
                >
                    <Italic className="w-3 h-3" size={5}/>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "bg-gray-300 p-2" : "p-2"}
                >
                    <UnderlineIcon className="w-4 h-4" />
                </Button>
            </div>

            {/* Editor de Texto */}
            <div className="border p-2 min-h-[100px] rounded-md">
                <EditorContent editor={editor} className="outline-none w-full min-h-[80px]" />
            </div>

            {/* Contador de caracteres */}
            <div className="text-right text-sm text-gray-500 mt-1">
                {taskDescription.length}/{maxLength}
            </div>
        </div>
    );
};

export default TaskEditor;