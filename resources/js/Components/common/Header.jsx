import SearchPanel from "./SearchPanel.jsx"
import {Button} from "@/Components/ui/button.jsx";
import {User} from "lucide-react"
import { Link } from '@inertiajs/react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {SidebarTrigger} from "@/Components/ui/sidebar.jsx";

const Header = ({auth = true}) => {
    return(
        <header className="sticky top-0 bg-white z-10 w-full border-b-[1px] border-b-gray-200">
            <div className="container mx-auto flex justify-between items-center py-6">
                <div className="font-semibold text-2xl ">

                    <SidebarTrigger />
                    <Link href="/">Larabook</Link>
                </div>
                <SearchPanel/>
                <div className="flex gap-2">
                    <Link
                        href={route('rentApartment')}>
                    <Button className="text-black bg-transparent hover:bg-gray-50 rounded-full">Wynajmij swój dom na larabook</Button>
                        </Link>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex gap-2 rounded-full">
                                <div className="flex flex-col gap-1">
                                    <div className="bg-black w-[15px] h-[1px]"></div>
                                    <div className="bg-black w-[15px] h-[1px]"></div>
                                    <div className="bg-black w-[15px] h-[1px]"></div>
                                </div>
                                <User />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto flex flex-col gap-3">
                            {
                                auth.user ? (
                                    <>
                                        <Link href={route('login')} className="text-sm hover:bg-gray-100" >Profile</Link>
                                        <Link  href={route('logout')} method="post"  className="text-sm hover:bg-gray-100">Wyloguj się</Link>
                                    </>
                                ):(
                                    <>
                                        <Link href={route('login')} className="text-sm hover:bg-gray-100" >Zaloguj się</Link>
                                        <Link href={route('register')} className="text-sm hover:bg-gray-100">Zarejestruj się</Link>
                                    </>
                                )

                            }


                            <hr/>
                            <Link href="/"  className="text-sm hover:bg-gray-100">Wynajmij dom</Link>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </header>
    )
}
export default Header
