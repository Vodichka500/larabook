import {User,Dot} from "lucide-react"
import {useEffect, useState} from "react";
import {Link} from "@inertiajs/react";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Map from "@/Components/common/Map.jsx";
import Gallery from "@/Components/common/Gallery.jsx";
import BookCard from "@/Components/common/BookCard.jsx";


const Apartment = ({id}) => {


    const [apartment, setApartment] = useState({})
    const [images, setImages] = useState([])
    const [seller, setSeller] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/apartment/"+id)
            .then(response => setApartment(response.data))
    }, []);

    useEffect(() => {
        apartment.images !== undefined ? setImages(JSON.parse(apartment.images)) : null
    }, [apartment])

    useEffect(() => {
        apartment.user_id !== undefined ?
            axios.get(`http://localhost:8000/api/user/${apartment.user_id}`)
                .then(response => setSeller(response.data))
            : null
    }, [apartment])

    const handleCopy = () => {
        const linkToCopy = 'http://localhost:8000/apartment/1';
        navigator.clipboard.writeText(linkToCopy)
    };



    return(
        <div className="container mx-auto  max-w-7xl mt-14 px-20">
            <div className="flex justify-between ">
                <div><h1 className="text-2xl font-bold">{apartment.title}</h1></div>
                <div className="flex gap-3">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className="underline cursor-pointer" onClick={handleCopy}>Skopiuj Link</div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-xs">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Link zostal skopiowany!</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Ok</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <div className="underline cursor-pointer">Pollub</div>
                </div>
            </div>

            <Gallery images={images} apartment={apartment}/>

            <div className="relative mt-10 grid grid-cols-2 min-h-[540px]">
                <div>
                    <h2 className="text-xl font-bold">Apartamenty w: {apartment.country}</h2>
                    <p>{apartment.max_guests} gości<Dot size={10} className="inline"/>{apartment.beds_quantity} lożka<Dot size={10} className="inline"/>{apartment.bedrooms_quantity} pokoje</p>
                    <div className="mt-5 flex gap-3">
                        <div className="p-2 rounded-full border-2 border-mainColor"><User size={30}/></div>
                        <div className="flex flex-col">
                            <div className="text-black font-bold">Gospodarzem jest <Link className="underline" href="/">{seller.name}</Link> </div>
                            <div className="text-sm">Przyjmuje gości od {seller?.created_at?.slice(0, 10)}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2 className="font-semibold">Informacje o tym miejscu</h2>
                        <p>{apartment.description}</p>
                        <h2 className="font-semibold mt-5">Mejsce</h2>
                        <p>{apartment.place_description !== '' ? apartment.place_description : "Nie dodano opisu"}</p>

                        <h2 className="font-semibold mt-5"> Inne ważne rzeczy</h2>
                        <p>{apartment.important_information !== '' ? apartment.important_information : "Nie dodano opisu"}</p>
                    </div>
                    <div className="mt-10">
                        <Map address="Kowalowa, Małopolskie, Polska"/>
                    </div>
                </div>
                <BookCard apartment={apartment}/>
            </div>

            <div className="py-10">
                <h2 className="text-xl font-bold">To warto wiedzieć:</h2>
                <div className="py-5 w-full flex justify-between">
                    <div  className="">
                        <h3 className="text-lg font-semibold">Regulamin Domu</h3>
                        <div className="mt-5 flex flex-col gap-4 text-base text-gray-600">
                            <div>Zameldowanie po 14:00</div>
                            <div>Wymeldowanie przed 11:00</div>
                            <div>Maksymalnie {apartment.max_guests} gości</div>
                            <div>Zakaz palenia</div>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-lg font-semibold">Zasady anulowania</h3>
                        <div className="mt-5 flex flex-col gap-4 text-base text-gray-600 max-w-md">
                            <div>Bezpłatne anulowanie przez 24 godziny. Po tym czasie rezerwacja nie podlega zwrotowi.</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Bezpieczeństwo i nieruchomość</h3>
                        <div className="mt-5 flex flex-col gap-4 text-base text-gray-600">
                            <div>Czujnik czadu</div>
                            <div>Czujnik dymu</div>
                            <div>Schody</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Apartment
