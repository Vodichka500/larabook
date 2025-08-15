import {Link, usePage} from "@inertiajs/react";
import {Star, Heart, X} from "lucide-react";
import {useEffect, useState} from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog.jsx";

const ApartmentCard = ({apartment, likes, setLikes, apartments, setApartments, isManagement = false}) => {
    const [seller, setSeller] = useState({});
    const user = usePage().props.auth.user;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${apartment.user_id}`)
            .then(response => setSeller(response.data))
    }, []);
    const like = () => {
        if(user){
            if(likes.includes(apartment.id)){
                axios.delete(`http://localhost:8000/api/user/${user.id}/likes/${apartment.id}`)
                    .then(() => {
                        setLikes(likes.filter(id => id !== apartment.id))
                    })
                    .catch(error => console.log(error))
            } else {
                axios.post(`http://localhost:8000/api/user/${user.id}/likes/${apartment.id}`, {})
                    .then(() => {
                        setLikes([...likes, apartment.id])
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    const removeApartment = () => {
        axios.delete(`http://localhost:8000/api/apartment/${apartment.id}`)
            .then((req) => setApartments(apartments.filter(item => item.id !== apartment.id)))
            .catch(error => console.log(error))
    }

    return(
        <div className="relative">
            <Link href={route("apartment", {id: apartment.id})} className="block relative">
                <div className="max-w-[300px] ">
                    <div className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden">
                        <img className="w-full h-full top-0 left-0 object-cover" src={JSON.parse(apartment.images)[0]}
                             alt="apart"/>
                    </div>
                    <div>
                        <div className="flex justify-between mt-3">
                            <h3 className="font-semibold min-h-10">{apartment.title.length > 50 ? apartment.title.slice(0, 50) + "..." : apartment.title}</h3>
                            <div className="flex items-center gap-1"><Star size={20}/>{apartment.rating}</div>
                        </div>
                        <p>{apartment.country}</p>
                        <p>Gospodzrzem jest <Link href="/" className="underline">{seller.name}</Link></p>
                        <p className="mt-2"><span className="font-semibold">{apartment.price}</span>{" "}zł/noc</p>
                    </div>
                </div>
            </Link>
            <div className="absolute right-2 top-2 cursor-pointer">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {isManagement ? <X onClick={removeApartment} color="#ff0000"/> : <Heart onClick={like} color={likes.includes(apartment.id) ? "#ff0000" : "#ffffff"}/>}

                    </AlertDialogTrigger>
                    {
                        !user && (
                            <AlertDialogContent className=" max-w-xs">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Aby dodać do ulubionych, musisz najpierw się zalogować lub zarejestrować.
                                    </AlertDialogTitle>
                                </AlertDialogHeader>

                                <Link href={route('login')} className="block text-center bg-mainColor text-white rounded-md px-3 py-2 mt-3">Zaloguj się</Link>
                                <Link href={route('register')} className="block text-center bg-mainColor text-white rounded-md px-3 py-2 mt-3">Zarejestruj się</Link>

                                <AlertDialogFooter>
                                    <AlertDialogCancel className="absolute border-0 top-1 right-0 ">x</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )
                    }
                </AlertDialog>
            </div>
        </div>

    )
}
export default ApartmentCard
