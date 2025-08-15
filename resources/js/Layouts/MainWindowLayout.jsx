import Header from "@/Components/common/Header.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/common/AppSidebar"

const MainWindowLayout = ({auth, children}) => {
    return(
        <div className="w-full relative">

            <div className="w-full">
                <SidebarProvider>
                    <AppSidebar isMainWindow={true}/>
                    <div className="w-full">
                        <Header auth={auth}/>
                        {children}
                    </div>
                </SidebarProvider>

            </div>
        </div>

    )
}
export default MainWindowLayout
