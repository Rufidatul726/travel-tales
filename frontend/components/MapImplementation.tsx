'use client'

import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapImplementation = () => {
    const [map1Object, setMap1Object] = useState<Map | null>(null);
    const [center, setCenter] = useState<[number, number] | null>(null); 
    const map1Container = useRef<HTMLDivElement | null>(null); // Initialize with null and type it as HTMLDivElement

    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter([longitude, latitude]); // Set map center with longitude, latitude
                    console.log(position.coords)
                },
                (error) => {
                    console.error('Error obtaining location:', error);
                    // Fallback to a default location if permission is denied or error occurs
                    setCenter([0, 0]); // Example: Default to 0, 0 (the Equator)
                }
            );
        }
    }, []);

    useEffect(() => {
        const map1 = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [8546575.886939, 2137169.681579], // Longitude, Latitude
                zoom: 12
            }),
        });
        if (map1Container.current) {
            map1.setTarget(map1Container.current);
        }
        setMap1Object(map1);
        
        // Cleanup on component unmount
        return () => {
            map1.setTarget(undefined);
            setMap1Object(null);
        };
    }, []);

    return (
        <div ref={map1Container} className="absolute inset-0"></div>
    );
}

export default MapImplementation;
