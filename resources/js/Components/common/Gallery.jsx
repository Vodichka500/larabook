import {Button} from "@/Components/ui/button.jsx";
import {Grip} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {useState, useEffect} from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = ({images, apartment}) => {
    const [carouselApi, setCarouselApi] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        if (!carouselApi) return;

        const updateCarouselState = () => {
            setCurrentIndex(carouselApi.selectedScrollSnap());
            setTotalItems(carouselApi.scrollSnapList().length);
        };

        updateCarouselState();

        carouselApi.on("select", updateCarouselState);

        return () => {
            carouselApi.off("select", updateCarouselState); // Clean up on unmount
        };
    }, [carouselApi]);

    const scrollToIndex = (index) => {
        carouselApi?.scrollTo(index);
    };

    return (
        <div>
            <div className="relative mt-5 grid grid-cols-4 grid-rows-2 gap-4 rounded-3xl overflow-hidden h-[600px]">
                <div className="relative col-span-2 row-span-2">
                    <img
                        className="absolute w-full h-full object-cover"
                        src={images?.[0]}
                        alt="photo1"/>
                </div>
                <div className="relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={images?.[1]}
                        alt="Photo 2"/>
                </div>
                <div className="relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={images?.[2]}
                        alt="Photo 3"/>
                </div>
                <div className="relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={images?.[3]}
                        alt="Photo 4"/>
                </div>
                <div className="relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={images?.[4]}
                        alt="Photo 5"/>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="absolute bottom-5 right-5 bg-white text-black hover:bg-gray-200"><Grip/> Pokaż
                            wszystkie zdjęcia</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Wszystkie zdjęcia</DialogTitle>
                            <DialogDescription>
                                Zobacz zdjęcia przyszlego domku.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="relative h-96  px-5 mx-auto mt-5 max-w-7xl lg:mt-6">
                            <Carousel
                                setApi={setCarouselApi}
                                opts={{ loop: true }}
                                className="w-full max-w-7xl h-96 max-h-[500px] z-10"
                            >
                                <CarouselContent className="w-[400px]">
                                    {images.map((item, index) => (
                                        <CarouselItem key={index} >
                                            <Card className="bg-gray-400">
                                                <CardContent className="relative flex items-center justify-center h-[350px] overflow-hidden p-0">
                                                    <img className="absolute w-full h-full object-cover" src={item} alt="Photo"/>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Navigation Arrows */}
                            <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
                                <Button
                                    onClick={() => scrollToIndex(currentIndex - 1)}
                                    className="tpointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
                                >
                                    <ChevronLeft className="size-32" strokeWidth={0.5} />
                                </Button>
                                <Button
                                    onClick={() => scrollToIndex(currentIndex + 1)}
                                    className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
                                >
                                    <ChevronRight className="size-32" strokeWidth={0.5} />
                                </Button>
                            </div>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                                {Array.from({ length: totalItems }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToIndex(index)}
                                        className={`w-3 h-3 rounded-full ${
                                            currentIndex === index ? "bg-black" : "bg-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose>
                                <Button>Zamknij</Button>
                            </DialogClose>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
export default Gallery;
