"use client"

import React from "react"

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
    SidebarMenuAction
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
import { signOut } from "@/app/lib/auth-client"

// Menu items.
const items = [
    {
        title: "Tarefas",
        url: "#",
        icon: ListTodo,
    },
    // {
    //     title: "Arquivadas",
    //     url: "#",
    //     icon: Archive,
    // },
    // {
    //     title: "Pesquisar",
    //     url: "#",
    //     icon: Search,
    // },
]

export function AppSidebar() {
    const {setTheme} = useTheme()
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    return (
            <Sidebar collapsible="icon" className="w-[--width]" style={{"--width": isCollapsed ? "4rem" : "16rem"} as React.CSSProperties} >
            <SidebarContent>
            <SidebarGroup className="group-data-[collapsible=icon]">
            <SidebarHeader>
                <SidebarGroupLabel className="text-lg">Next Level</SidebarGroupLabel>
            </SidebarHeader>
            <SidebarContent/>
            <SidebarGroupContent>
                <SidebarMenu >
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="mb-2">
                            <SidebarMenuButton className= "dark:hover:text-indigo-500 hover:text-indigo-600"  asChild>
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
                                            <DropdownMenuItem onClick={signOut}>
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