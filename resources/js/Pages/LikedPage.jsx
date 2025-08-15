import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import {useEffect, useState} from "react";
import ApartmentCard from "@/Components/common/ApartmentCard.jsx";
import {usePage} from "@inertiajs/react";

const likedPage = () => {
    const [likes, setLikes] = useState([]);
    const [apartments, setApartments] = useState([]);
    const user = usePage().props.auth.user;

    useEffect(() => {
        if(user){
            axios.get(`http://localhost:8000/api/user/${user.id}/likes`)
                .then(response => {
                    setLikes(response.data.map(item => item.id))
                    setApartments(response.data)
                })
                .catch(error => console.log(error))
        }
    }, [user]);

    return(
        <DashboardLayout>
            <div className="mt-10 container mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold">Apartamenty które ci podoba</h1>
                <div className="w-full flex gap-10 py-10">
                    {apartments.length < 1 && <p className="text-gray-500">Nie masz żadnych apartamentów</p>}
                    {
                        apartments.map(apartment => (
                            <>
                                <ApartmentCard key={apartment.id} apartment={apartment} likes={likes} setLikes={setLikes}/>
                            </>

                        ))
                    }
                </div>
            </div>
        </DashboardLayout>

    )
}
export default likedPage
