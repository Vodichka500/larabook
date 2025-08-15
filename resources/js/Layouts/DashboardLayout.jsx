import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/common/AppSidebar"

const DashboardLayout = ({children}) => {
    return(
        <div className="w-full relative">

            <div className="w-full">
                <SidebarProvider>
                    <AppSidebar  isMainWindow={false}/>
                    <div className="w-full">
                        {children}
                    </div>
                </SidebarProvider>

            </div>
        </div>

    )
}
export default DashboardLayout
