import React, {useEffect, useRef, useState} from 'react';
import {Skeleton} from "@/Components/ui/skeleton.jsx";

const Map = ({ address }) => {
    const mapRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let map;
        let geocoder;

        const initMap = () => {
            if (mapRef.current) {
                map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: -34.397, lng: 150.644 }, // начальный центр карты
                    zoom: 8,
                });

                geocoder = new window.google.maps.Geocoder();
                if (address) {
                    placeMarkerByAddress(address);
                }
                setIsLoading(false);
            }
        };

        const placeMarkerByAddress = (address) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    map.setCenter(location);

                    new window.google.maps.Marker({
                        map,
                        position: location,
                    });
                } else {
                    setIsError(true);
                }
            });
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v6.8/mapsJavaScriptAPI.js';
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }, [address]); // Перезапускаем эффект при изменении адреса

    return (
        <>
            {
                isLoading && !isError &&
                (<Skeleton className="relative w-full h-[30vh]">
                    <Skeleton className="absolute left-5 top-5 w-10 h-10"></Skeleton>
                </Skeleton>)
            }
            {

                !isLoading && isError &&
                <div>Nie udalo sę pobrać danych mapy</div>
            }
            {
                !isLoading && !isError &&
                <div
                    id="map"
                    ref={mapRef}
                    style={{height: '30vh', width: '100%'}}
                ></div>
            }

        </>
    );
};

export default Map;
