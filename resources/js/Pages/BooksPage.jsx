import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import ApartmentCard from "@/Components/common/ApartmentCard.jsx";
import {useEffect, useState} from "react";
import {Link, usePage} from "@inertiajs/react";
import {Star} from "lucide-react";
import {Button} from "@/Components/ui/button.jsx";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [apartments, setApartments] = useState([]);
    const user = usePage().props.auth.user;

    useEffect(() => {
        if(user){
            axios.get(`http://localhost:8000/api/user/${user.id}/books`)
                .then(response => {
                    setBooks(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [user]);

    useEffect(() => {
        if(user){
            books.forEach(book => {
                axios.get("http://localhost:8000/api/apartment/"+book.apartment_id)
                    .then(response => {
                        let isExist = false
                        apartments.map(apartment => {
                            if(apartment.id == response.data.id){
                                isExist = true
                            }
                        })
                       !isExist ? setApartments(prevState => [...prevState, response.data]) : null
                    })
                    .catch(err => console.log(err))
            })
        }
    }, [books]);

    const removeBook = (apartmentId) => {
        const bookId = books.filter(item => item.apartment_id === apartmentId)[0].id

        axios.delete(`http://localhost:8000/api/books/${bookId}`)
            .then(() => {
                setBooks(books.filter(item => item.id !== bookId))
                setApartments(apartments.filter(item => item.id !== apartmentId))
            })
            .catch(err => console.log(err))
    }

    return(
        <DashboardLayout>
            <div className="mt-10 container mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold">Apartamenty które zarezerwowałeś</h1>
                <div className="w-full flex gap-10 py-10">
                    {apartments.length < 1 && <p className="text-gray-500">Nie masz żadnych apartamentów</p>}
                    {
                        apartments.map(apartment => (
                           <div className="grid grid-cols-2">
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
                                           <p className="mt-2"><span className="font-semibold">{apartment.price}</span>{" "}zł/noc</p>
                                       </div>
                                   </div>
                               </Link>
                               <div className="flex flex-col justify-between items-center">
                                   <div className="p-4 flex flex-col items-center gap-6">
                                       <h2 className="text-2xl font-semibold">Rezerwacja</h2>
                                       <div>Od: {books.filter(item => item.apartment_id === apartment.id)[0].start_date}</div>
                                       <div>Do: {books.filter(item => item.apartment_id === apartment.id)[0].end_date}</div>
                                       <div>Liczba
                                           gości: {books.filter(item => item.apartment_id === apartment.id)[0].guests_quantity}</div>
                                   </div>
                                   <Button onClick={() => removeBook(apartment.id)} className="w-32 bg-red-500">Usuń rezerwacje</Button>
                               </div>
                           </div>

                        ))
                    }
                </div>
            </div>
        </DashboardLayout>
    )
}
export default BooksPage
