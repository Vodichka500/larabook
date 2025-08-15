import { Home, User, CircleFadingPlus, Gauge, Heart, FilePenLine, WalletCards } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import {Link} from "@inertiajs/react";
import {Checkbox} from "@/Components/ui/checkbox.jsx";


const AppSidebar = ({isMainWindow}) => {

    return(
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <Home/>
                                    <span>Główna</span>
                                </Link>
                            </SidebarMenuButton>

                            <SidebarMenuButton asChild>
                                <Link  href={route('dashboard')}>
                                    <Gauge />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>

                            <SidebarMenuButton asChild>
                                <Link  href={route('profile.edit')}>
                                    <User/>
                                    <span>Konto</span>
                                </Link>
                            </SidebarMenuButton>

                        </SidebarMenu>
                    </SidebarGroupContent>
                    {
                        isMainWindow ? (
                            <>
                                {/*<SidebarGroupLabel className="mt-7 text-md">Wybierz Kraj</SidebarGroupLabel>*/}
                                {/*<SidebarGroupContent>*/}
                                {/*    <SidebarMenu className="px-2.5 mt-2">*/}
                                {/*        <div className="flex items-center">*/}
                                {/*            <Checkbox value="Polska" id="Polska"/>*/}
                                {/*            <label htmlFor="Polska" className="ml-2">Polska</label>*/}
                                {/*        </div>*/}

                                {/*        <div className="flex items-center">*/}
                                {/*            <Checkbox value="Niemcy" id="Niemcy"/>*/}
                                {/*            <label htmlFor="Niemcy" className="ml-2">Niemcy</label>*/}
                                {/*        </div>*/}

                                {/*        <div className="flex items-center">*/}
                                {/*            <Checkbox value="Hiszpania" id="Hiszpania"/>*/}
                                {/*            <label htmlFor="Hiszpania" className="ml-2">Hiszpania</label>*/}
                                {/*        </div>*/}
                                {/*    </SidebarMenu>*/}
                                {/*</SidebarGroupContent>*/}
                            </>
                        ) : (
                            <>
                                <SidebarGroupLabel className="mt-7">Rezerwacje</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="mt-2 ml-2">
                                        <div className="flex items-center gap-1.5"><WalletCards size={17}/><Link href={route("booked")}>Moje Rezerwacje</Link>
                                        </div>
                                        <div className="flex items-cente gap-1.5"><Heart size={17}/><Link href={route("liked")}>Moje Ulubione</Link>
                                        </div>
                                    </SidebarMenu>
                                </SidebarGroupContent>

                                <SidebarGroupLabel className="mt-7">Ogloszenia</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="mt-2 ml-2">
                                        <div className="flex items-center gap-1.5"><FilePenLine size={17}/><Link href={route("manageApartments")}>Zarządzaj Ogloszeniami</Link>
                                        </div>
                                        <div className="flex items-center gap-1.5"><CircleFadingPlus size={17}/><Link href={route("rentApartment")}>Dodaj Ogloszenie</Link>
                                        </div>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </>
                        )
                    }
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar
