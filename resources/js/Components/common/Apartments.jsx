import {Link, usePage} from "@inertiajs/react";
import {Star} from "lucide-react"
import ApartmentCard from "@/Components/common/ApartmentCard.jsx";
import {useEffect, useState} from "react";
import {Skeleton} from "@/Components/ui/skeleton.jsx";

const Apartments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apartments, setApartments] = useState([]);

    const user = usePage().props.auth.user;
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        if(user){
            axios.get(`http://localhost:8000/api/user/${user.id}/likes`)
                .then(response => setLikes(response.data.map(item => item.id)))
                .catch(error => console.log(error))
        }
    }, [user]);

    console.log("User likes: ", likes)


    useEffect(() => {
        axios.get('http://localhost:8000/api/apartments')
            .then(response => setApartments(response.data))
            .then(() => {setIsLoading(false); setIsSuccess(true)})
            .catch(() => {setIsLoading(false); setIsError(true)})
    }, []);



    const getSkeleton = () => {
        return Array.from({length: 8}).map((_, i) => (
            <Skeleton key={i} className="relative w-[300px] h-[400px] rounded-xl">
                <Skeleton className="mx-auto w-[300px] h-[250px] "/>
                <Skeleton className="mt-3 mx-auto w-[250px] h-[10px] "/>
                <Skeleton className="mt-3 mx-auto w-[250px] h-[10px] "/>
            </Skeleton>
        ))
    }

    const getCards = () => {
        return apartments.map(apartment => (
            <ApartmentCard key={apartment.id} apartment={apartment} likes={likes} setLikes={setLikes}/>
        ))
    }

    return(
       <div className="w-full container mx-auto px-0 py-10 flex justify-start flex-wrap gap-20">
           {isLoading && !isError && !isSuccess && (<>{getSkeleton()}</>)}
           {!isLoading && isError && !isSuccess && (
              <div className="mx-auto mt-40 text-4xl font-bold text-gray-400 max-w-[500px]">Przepraszamy nie udało się pobrać dane :( </div>
           )}
           {!isLoading && !isError && isSuccess && (
              <>{getCards()}</>
           )}
       </div>
    )
}
export default Apartments
