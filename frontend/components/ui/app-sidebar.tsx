"use client"

import { ListTodo, Search, Settings, ChevronUp, Archive, Moon, Sun, Palette, MonitorCog, User,LogOut} from "lucide-react"
import { useTheme } from "next-themes"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
  } from "@/components/ui/dropdown-menu"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
  

// Menu items.
const items = [
    {
        title: "Tarefas",
        url: "#",
        icon: ListTodo,
    },
    {
        title: "Arquivadas",
        url: "#",
        icon: Archive,
    },
    {
        title: "Pesquisar",
        url: "#",
        icon: Search,
    },
]

export function AppSidebar() {
    const {setTheme} = useTheme()
    return (
        <Sidebar>
            <SidebarContent>
                    <SidebarGroup>
                        <SidebarHeader>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                        </SidebarHeader>
                        <SidebarContent/>
                        <SidebarGroupContent>
                            <SidebarMenu >
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className="mb-2">
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                        </SidebarGroup>
                        </SidebarContent>
                            <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton>
                                                <Settings/> Configurações
                                                <ChevronUp className="ml-auto" />
                                                </SidebarMenuButton>
                                                </DropdownMenuTrigger>
                                                    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]" align="end">
                                                        <DropdownMenuLabel> Minha Conta </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem>
                                                               <User/> 
                                                                 <span>Perfil</span>
                                                            </DropdownMenuItem>
                                                                <DropdownMenuSub>
                                                                <DropdownMenuSubTrigger>
                                                                    <Palette/>
                                                                    <span> Temas </span>
                                                                    </DropdownMenuSubTrigger>
                                                                    <DropdownMenuPortal>
                                                                        <DropdownMenuSubContent>
                                                                        <DropdownMenuItem onClick={() => setTheme("light")}>
                                                                            <Sun/>
                                                                            <span> Light </span>
                                                                            </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                                            <Moon/>
                                                                        <span> Dark </span>
                                                                    </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => setTheme("system")}>
                                                            <MonitorCog/>
                                                            <span> System </span>
                                                        </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                        </DropdownMenuSub>
                                                        <DropdownMenuItem>
                                                            <LogOut/> 
                                                            <span> Sair </span>
                                                        </DropdownMenuItem>
                                                        </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarFooter>
                                    </Sidebar>
            )
          }