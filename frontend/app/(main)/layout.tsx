import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-dvh flex overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="w-40 flex absolute" style={{ right: '5%' }}>
                  <Input cmdk-input="" className="pl-15 focus:border-indigo-600 focus:outline-hidden px-8 relative" placeholder="Pesquisar..." />
                  <svg className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 22-4.3-4.3"></path>
                  </svg>
                </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div >
              {children} {/* Aqui o Kanban será renderizado */}              
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}