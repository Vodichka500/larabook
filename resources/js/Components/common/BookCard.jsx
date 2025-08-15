import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover.jsx";
import {Calendar} from "@/Components/ui/calendar.jsx";
import GuestsCounter from "@/Components/common/GuestsCounter.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {useEffect, useState} from "react";
import {handler} from "tailwindcss-animate";
import {usePage} from "@inertiajs/react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/Components/ui/dialog.jsx";

const BookCard = ({apartment}) => {
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [guests, setGuests] = useState(1)
    const [currentBooks, setCurrentBooks] = useState([])
    const user = usePage().props.auth.user;

    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(apartment.id !== undefined){
            console.log("Lol keks "+apartment.id)
            axios.get(`http://localhost:8000/api/apartment/${apartment.id}/books`)
                .then(req => setCurrentBooks(req.data))
                .then(() => console.log(currentBooks))
                .catch(err => console.log(err))
        }
    }, [apartment.id]);

    const formatDateForMySQL = (date) => {
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleBooking = () => {
        if(!user){
            setModalTitle("Rezerwacja nieudana")
            setModalMessage("Musisz być zalogowany")
            setOpen(true)
            return
        }

        if(dateFrom && dateTo){
            currentBooks.forEach(currentBook => {
                if(
                    (dateFrom >= new Date(currentBook.start_date) &&
                        dateFrom <= new Date(currentBook.end_date)) ||
                    (dateTo >= new Date(currentBook.start_date) &&
                        dateTo <= new Date(currentBook.end_date))
                ){
                    setModalTitle("Rezerwacja nieudana")
                    setModalMessage("Wybrany termin jest już zajęty")
                    setOpen(true)
                } else if(guests > apartment.maxGuests){
                    setModalTitle("Rezerwacja nieudana")
                    setModalMessage("Zbyt duża liczba gości")
                    setOpen(true)

                } else {
                   axios.post('http://localhost:8000/api/books', {
                       apartment_id: apartment.id,
                       customer_id: user.id,
                       start_date: formatDateForMySQL(dateFrom),
                       end_date: formatDateForMySQL(dateTo),
                       guests_quantity: guests
                   })
                       .then(req => {
                            setModalTitle("Udało się!")
                            setModalMessage("Rezerwacja przebiegła pomyślnie")
                            setOpen(true)
                       })
                       .catch(err => console.log(err))
                }

            })

        } else{
            setModalTitle("Rezerwacja nieudana")
            setModalMessage("Nie wybrano daty")
            setOpen(true)
        }
    }

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

    return (
        <div className="flex justify-center items-start">
            <div className="sticky top-36 py-5 px-4  bg-white rounded-xl shadow-lg border-2 ">
                <div>
                    <span className="font-bold">{apartment.price} zł</span>
                    {" "}noc
                </div>
                <div className="mt-5 grid grid-cols-2 grid-rows-5 rounded-lg border-[1px] border-black">
                    <div className="min-w-36 p-2  border-r-[1px] border-black row-span-2">
                        <span className="font-bold text-sm">Zamiełdowanie</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div
                                    className="text-sm text-gray-600 cursor-pointer">{dateFrom ? `${dateFrom.getDate()} ${months[dateFrom.getMonth()]} ${dateFrom.getFullYear()}` : "Dodaj datę"}</div>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[250px] flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={(prop) => {
                                        if (checkDateFrom(prop)) setDateFrom(prop)
                                    }}
                                    className=" "
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="min-w-36 p-2 row-span-2">
                        <span className="font-bold text-sm">Wymiełdowanie</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div
                                    className="text-sm text-gray-600 cursor-pointer">{dateTo ? `${dateTo.getDate()} ${months[dateTo.getMonth()]} ${dateTo.getFullYear()}` : "Dodaj datę"}</div>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[250px] flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={dateTo}
                                    onSelect={(prop) => {
                                        if (checkDateTo(prop)) setDateTo(prop)
                                    }}
                                    className=""
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="row-span-3 col-span-2  border-t-[1px] border-black p-2">
                        <span className="font-bold text-sm ">Liczba gości</span>
                        <div className="w-full flex justify-center">
                            <GuestsCounter guests={guests} setGuests={setGuests} hiddenText={true}/>
                        </div>
                    </div>
                </div>
                <Button onClick={handleBooking} className="mt-5 w-full bg-mainColor hover:bg-mainColor hover:animate-pulse">
                    Rezerwuj
                </Button>
            </div>
            <Dialog open={open} defaultOpen={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{modalTitle}</DialogTitle>
                        <DialogDescription>
                            {modalMessage}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default BookCard;
