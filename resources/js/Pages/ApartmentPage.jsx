import MainWindowLayout from "@/Layouts/MainWindowLayout.jsx";
import {Head} from "@inertiajs/react";
import Apartment from "@/Components/common/Apartment.jsx";
import { useParams } from "react-router-dom";

const ApartmentPage = ({auth, id}) => {

    console.log(`id: ${id}`)

    return(
        <MainWindowLayout auth={auth}>
            <Head title="ApartmentCard"/>
            <Apartment id={id}/>
        </MainWindowLayout>
    )
}
export default ApartmentPage
