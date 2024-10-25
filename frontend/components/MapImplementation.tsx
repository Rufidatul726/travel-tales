'use client'

import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { useGeographic } from 'ol/proj';

const MapImplementation = ({center, setCenter}: {center: [number, number] | null, setCenter: React.Dispatch<React.SetStateAction<[number, number] | null>>}) => {
    const [map1Object, setMap1Object] = useState<Map | null>(null);
    const map1Container = useRef<HTMLDivElement | null>(null); 


    useGeographic()

    useEffect(() => {
        if(center){
            const map1 = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({ 
                    center: center,
                    zoom: 12
                }),
            });

            if (center && center.length === 2) {
                // Create a marker for the current location
                const marker = new Feature({
                    geometry: new Point(center), // Set the point at the center
                });

                // Define the marker style (e.g., an icon)
                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: '/map-pin.png', // Path to marker icon
                            anchor: [0.5, 1], // Positioning the anchor at the bottom of the image
                            scale: 0.05 // Adjust the scale of the icon if necessary
                        })
                    })
                );

                // Create a vector source to hold the marker
                const vectorSource = new VectorSource({
                    features: [marker],
                });

                // Create a vector layer to display the marker
                const markerLayer = new VectorLayer({
                    source: vectorSource,
                });

                // Add the marker layer to the map
                map1.addLayer(markerLayer);
            }
    
            
            if (map1Container.current) {
                map1.setTarget(map1Container.current);
            }
            setMap1Object(map1);
            
            // Cleanup on component unmount
            return () => {
                map1.setTarget(undefined);
                setMap1Object(null);
            };
        }
    }, [center]);

    return (
        <div ref={map1Container} className="absolute inset-0 rounded-lg"></div>
    );
}

export default MapImplementation;
