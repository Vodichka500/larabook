import {Button} from "@/Components/ui/button.jsx";
import {Search}  from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";
import {Calendar} from "@/Components/ui/calendar.jsx";
import GuestsCounter from "@/Components/common/GuestsCounter.jsx";

const SearchPanel = () => {

    const [searchInput, setSearchInput] = useState(null)
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [guests, setGuests] = useState(1)


    const [isGuestsClicked, setIsGuestsClicked] = useState(false)
    const months = {
        0: "Styczeń",
        1: "Luty",
        2: "Marzec",
        3: "Kwiecień",
        4: "Maj",
        5: "Czerwiec",
        6: "Lipiec",
        7: "Sierpień",
        8: "Wrzesień",
        9: "Październik",
        10: "Listopad",
        11: "Grudzień"
    };

    const checkDateFrom = (newDateFrom) => {
        if(!dateTo) return true
        return newDateFrom < dateTo;
    }

    const checkDateTo = (newDateTo) => {
        if(!dateFrom) return true
        return newDateTo > dateFrom;
    }


    return(
        <div className="grid grid-cols-6 border-[1px] border-gray-300  shadow-sm p-3 rounded-3xl">
            <div className="px-4 col-span-2 flex flex-col border-r-[1px] border-r-gray-300">
                <span className="font-bold text-sm">Gdzie</span>
                {/*<span className="text-sm text-gray-600">Wuszukaj kierunki</span>*/}
                <input type="text" placeholder="Wuszukaj kierunki" className="border-none p-0 text-sm" onInput={(e) => setSearchInput(e.target.value)}/>
            </div>
            <div className="px-4 col-span-1 flex flex-col border-r-[1px] border-r-gray-300">
                <span className="font-bold text-sm">Przyjazd</span>
                <Popover>
                    <PopoverTrigger asChild>
                       <div className="text-sm text-gray-600 cursor-pointer">{ dateFrom ? `${dateFrom.getDate()} ${months[dateFrom.getMonth()] } ${dateFrom.getFullYear()}` : "Dodaj daty"  }</div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[250px] flex justify-center">
                        <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={(prop) => {
                                if(checkDateFrom(prop)) setDateFrom(prop)
                            }}
                            className=" "
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="px-4 col-span-1 flex flex-col border-r-[1px] border-r-gray-300">
                <span className="font-bold text-sm">Wyjazd</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="text-sm text-gray-600 cursor-pointer">{ dateTo ? `${dateTo.getDate()} ${months[dateTo.getMonth()] } ${dateTo.getFullYear()}` : "Dodaj daty"  }</div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[250px] flex justify-center">
                        <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={(prop) => {
                                if(checkDateTo(prop)) setDateTo(prop)
                            }}
                            className=""
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="px-4 col-span-1 flex flex-col border-r-[1px] border-r-gray-300">
                <span className="font-bold text-sm">Kto</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="text-sm text-gray-600 cursor-pointer" onClick={() => setIsGuestsClicked(true)}>{isGuestsClicked ? guests : "Dodaj gości" }</div>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 ">
                        <GuestsCounter guests={guests} setGuests={setGuests}/>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="px-4 col-span-1 flex flex-col">
                <Button className="rounded-full bg-mainColor  hover:bg-green-400">
                    <Search /> Szukaj
                </Button>
            </div>

        </div>
    )
}
export default SearchPanel
