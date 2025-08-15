import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import { useFormik } from 'formik';
import {Label} from "@/Components/ui/label.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {useState} from "react";
import {Button} from "@/Components/ui/button.jsx";
import {usePage} from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    } else if (values.title.length < 10) {
        errors.title = 'Musi być więcej niż 10 znaków';
    }

    if (!values.description) {
        errors.description = 'Required';
    } else if (values.description.length < 20) {
        errors.description = 'Opis musi mieć co najmniej 20 znaków';
    }  else if (values.description.length > 1000) {
        errors.description = 'Opis musi mieć mniej niż 1000 znaków';
    }

    if (values.placeDescription.length !== 0 && values.placeDescription.length < 20) {
        errors.placeDescription = 'Opis musi mieć co najmniej 20 znaków';
    }  else if (values.placeDescription.length > 500) {
        errors.placeDescription = 'Opis musi mieć mniej niż 500 znaków';
    }

    if (values.importantInformation.length !== 0 && values.importantInformation.length < 20) {
        errors.importantInformation = 'Opis musi mieć co najmniej 20 znaków';
    }  else if (values.importantInformation.length > 500) {
        errors.importantInformation = 'Opis musi mieć mniej niż 500 znaków';
    }

    if (!values.address) {
        errors.address = 'Required';
    }

    if (!values.country) {
        errors.country = 'Required';
    }

    if (!values.apartmentType) {
        errors.apartmentType = 'Required';
    }

    if (values.maxGuests <= 0) {
        errors.maxGuests = 'Liczba gości musi być większa niż 0';
    }

    if (values.bedrooms < 1) {
        errors.bedrooms = 'Musi być co najmniej jedna sypialnia';
    }

    if (values.beds < 1) {
        errors.beds = 'Musi być co najmniej jedno łóżko';
    }

    if (values.bathrooms < 1) {
        errors.bathrooms = 'Musi być co najmniej jedna łazienka';
    }

    if (!values.price || values.price <= 0) {
        errors.price = 'Cena musi być większa niż 0';
    }

    if (!values.images || values.images.length < 5) {
        errors.images = 'Musi być co najmniej 5 zdjęc';
    }



    return errors;
}

const RentApartmentPage = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [open, setOpen] = useState(false);

    const user = usePage().props.auth.user;
    const handleSubmit = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            if (key === 'images') {
                values.images.forEach((file) => formData.append('images[]', file));
            } else {
                formData.append(key, values[key]);
            }
        }
        axios.post('/api/apartments', formData)
            .then(response => setOpen(true))
            .catch((error) => {alert('Error creating apartment. Error: ' + error.response.data.message)});
    };


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            placeDescription: '',
            importantInformation: '',
            country: '',
            address: '',
            apartmentType: '',
            maxGuests: 0,
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
            price: 0,
            rules: '',
            images: [],
        },
        validate,
        onSubmit: (values) => {
            handleSubmit(values)
            formik.resetForm();
            setUploadedImages([])
        },
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setUploadedImages((prev) => [...prev, ...fileURLs]);
        formik.setFieldValue("images", [...formik.values.images, ...files]);
    };

    const removeImage = (index) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
        formik.setFieldValue("images", formik.values.images.filter((_, i) => i !== index));
    };

    return(
        <DashboardLayout>
            <div className="mt-10 container mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold">Utwórz ogłoszenie i zacznij zarabiać!</h1>
                <form onSubmit={formik.handleSubmit} className="mt-10">
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.title ?
                                    <div className="text-sm text-red-400">{formik.errors.title}</div> : null}
                            </div>

                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="text-sm text-red-400">{formik.errors.description}</div> : null}
                            </div>

                            <div>
                                <Label htmlFor="placeDescription">Place description</Label>
                                <Input
                                    id="placeDescription"
                                    name="placeDescription"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.placeDescription}
                                />
                                {formik.touched.placeDescription && formik.errors.placeDescription ?
                                    <div className="text-sm text-red-400">{formik.errors.placeDescription}</div> : null}
                            </div>

                            <div>
                                <Label htmlFor="importantInformation">Important Information</Label>
                                <Input
                                    id="importantInformation"
                                    name="importantInformation"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.importantInformation}
                                />
                                {formik.touched.importantInformation && formik.errors.importantInformation ?
                                    <div
                                        className="text-sm text-red-400">{formik.errors.importantInformation}</div> : null}
                            </div>

                            <div>
                                <Label htmlFor="address">Country *</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country}
                                />
                                {formik.touched.country && formik.errors.country ?
                                    <div className="text-sm text-red-400">{formik.errors.country}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="address">Address *</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address ?
                                    <div className="text-sm text-red-400">{formik.errors.address}</div> : null}

                            </div>


                            <div>
                                <Label htmlFor="apartmentType">Apartment Type *</Label>
                                <Input
                                    id="apartmentType"
                                    name="apartmentType"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apartmentType}
                                />
                                {formik.touched.apartmentType && formik.errors.apartmentType ?
                                    <div className="text-sm text-red-400">{formik.errors.apartmentType}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="maxGuests">Max Guests *</Label>
                                <Input
                                    id="maxGuests"
                                    name="maxGuests"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.maxGuests}
                                />
                                {formik.touched.maxGuests && formik.errors.maxGuests ?
                                    <div className="text-sm text-red-400">{formik.errors.maxGuests}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="bedrooms">Bedrooms *</Label>
                                <Input
                                    id="bedrooms"
                                    name="bedrooms"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bedrooms}
                                />
                                {formik.touched.bedrooms && formik.errors.bedrooms ?
                                    <div className="text-sm text-red-400">{formik.errors.bedrooms}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="beds">Beds *</Label>
                                <Input
                                    id="beds"
                                    name="beds"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.beds}
                                />
                                {formik.touched.beds && formik.errors.beds ?
                                    <div className="text-sm text-red-400">{formik.errors.beds}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="bathrooms">Bathrooms *</Label>
                                <Input
                                    id="bathrooms"
                                    name="bathrooms"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bathrooms}
                                />
                                {formik.touched.bathrooms && formik.errors.bathrooms ?
                                    <div className="text-sm text-red-400">{formik.errors.bathrooms}</div> : null}

                            </div>

                            <div>
                                <Label htmlFor="price">Price *</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price}
                                />
                                {formik.touched.price && formik.errors.price ?
                                    <div className="text-sm text-red-400">{formik.errors.price}</div> : null}
                            </div>

                            <div>
                                <Label htmlFor="rules">Rules</Label>
                                <Input
                                    id="rules"
                                    name="rules"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.rules}
                                />
                                {formik.touched.rules && formik.errors.rules ?
                                    <div className="text-sm text-red-400">{formik.errors.rules}</div> : null}

                            </div>
                        </div>
                        <div className="col-span-2 px-10">
                            <Label htmlFor="images">Dodaj zdjęcia *</Label>
                            <input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full p-2 mb-4 border rounded"
                            />
                            <div className="flex justify-start flex-wrap gap-6  max-h-[500px] overflow-y-scroll">
                                {uploadedImages.map((image, index) => (
                                    <div key={index} className="relative border-2 rounded-2xl overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`Uploaded ${index}`}
                                            className="w-[300px] h-[168px] object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="text-lg absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {formik.touched.images && formik.errors.images ? <div className="text-sm text-red-400">{formik.errors.images}</div> : null}

                        </div>
                    </div>

                    <div className="w-full flex justify-start mt-10">
                        <Button variant="outline" type="submit" className="border-mainColor text-mainColor hover:border-black">Submit</Button>
                    </div>
                </form>
                <Dialog open={open} defaultOpen={open} onOpenChange={() => setOpen(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Udało się!</DialogTitle>
                            <DialogDescription>
                               Apartament został dodany pomyślnie!
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="h-24"/>
            </div>
        </DashboardLayout>
    )
}

export default RentApartmentPage;
