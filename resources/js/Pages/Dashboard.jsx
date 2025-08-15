import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePage} from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useEffect, useState} from "react";
export default function Dashboard() {
    const user = usePage().props.auth.user;
    const [likedQuantity, setLikedQuantity] = useState(0);
    const [booksQuantity, setBooksQuantity] = useState(0);
    const [apartmentsQuantity, setApartmentsQuantity] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${user.id}/likes`)
            .then(res => setLikedQuantity(res.data.length))

        axios.get(`http://localhost:8000/api/user/${user.id}/books`)
            .then(res => setBooksQuantity(res.data.length))

        axios.get(`http://localhost:8000/api/user/${user.id}/apartments`)
            .then(res => setApartmentsQuantity(res.data.length))
    }, []);

    return (
        <DashboardLayout >
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden  bg-white sm:rounded-lg dark:bg-gray-800">
                        <h1 className="text-2xl font-bold shadow-sm text-gray-600 dark:text-gray-100">Dashboard</h1>
                        <div className="mt-10 flex gap-8">
                            <Card className="min-w-[300px]">
                                <CardHeader>
                                    <CardTitle>Konto</CardTitle>
                                    <CardDescription>Co my o ciebie znamy</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="mt-0">
                                                <span className="font-semibold">Username:</span>
                                                <span
                                                    className="block border-b border-dotted border-gray-700">{user.name}</span>
                                            </div>
                                            <div className="mt-5">
                                                <span className="font-semibold">Email:</span>
                                                <span
                                                    className="block border-b border-dotted border-gray-700">{user.email}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-0">
                                                <span className="font-semibold">Telefon:</span>
                                                <span
                                                    className="block border-b border-dotted border-gray-700">{user.phone_number}</span>
                                            </div>
                                            <div className="mt-5">
                                                <span className="font-semibold">Imie:</span>
                                                <span
                                                    className="block border-b border-dotted border-gray-700">{user.first_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="text-sm underline text-right">
                                    <Link href={route("profile.edit")}>Przejdż do ustawień konta</Link>
                                </CardFooter>
                            </Card>
                            <Card className="min-w-[300px] h-24">
                                <CardHeader>
                                    <CardTitle>Polubione</CardTitle>
                                    <CardDescription>Ilośc ulunionych apartamentów: {likedQuantity}</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="min-w-[300px] h-24">
                                <CardHeader>
                                    <CardTitle>Polubione</CardTitle>
                                    <CardDescription>Ilośc twoich apartamentów: {apartmentsQuantity}</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="min-w-[300px] h-24">
                                <CardHeader>
                                    <CardTitle>Polubione</CardTitle>
                                    <CardDescription>Ilośc zarezerwowanych apartamentów: {booksQuantity}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
