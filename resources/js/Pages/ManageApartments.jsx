import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/react";
import ApartmentCard from "@/Components/common/ApartmentCard.jsx";


const ManageApartments = () => {
    const user = usePage().props.auth.user;
    const [apartments, setApartments] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${user.id}/apartments`)
            .then(req => setApartments(req.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <DashboardLayout>
            <div className="mt-10 container mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold">Zarządzaj swoimi apartamentami!</h1>
                <div className="w-full flex gap-10 py-10">
                    {apartments.length < 1 && <p className="text-gray-500">Nie masz żadnych apartamentów</p>}
                    {
                        apartments.map(apartment => (
                            <>
                                <ApartmentCard key={apartment.id} apartment={apartment} apartments={apartments} setApartments={setApartments} isManagement={true} />
                            </>

                        ))
                    }
                </div>
            </div>
        </DashboardLayout>
);
}

export default ManageApartments
