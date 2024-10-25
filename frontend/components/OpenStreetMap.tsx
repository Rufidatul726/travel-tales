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
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';

const OpenStreetMap = ({center, setCenter}: {center: [number, number] | null, setCenter: React.Dispatch<React.SetStateAction<[number, number] | null>>}) => {
    const [map1Object, setMap1Object] = useState<Map | null>(null);
    const map1Container = useRef<HTMLDivElement | null>(null); 

    useGeographic();

    useEffect(() => {
        if (center) {
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
                const marker = new Feature({
                    geometry: new Point(center),
                });

                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: '/map-pin.png', 
                            anchor: [0.5, 1],
                            scale: 0.05
                        })
                    })
                );

                const vectorSource = new VectorSource({
                    features: [marker],
                });

                const markerLayer = new VectorLayer({
                    source: vectorSource,
                });

                map1.addLayer(markerLayer);
            }

            if (map1Container.current) {
                map1.setTarget(map1Container.current);
            }

            console.log(map1.getControls())

            // Add click interaction to update center coordinates
            map1.on('click', function(event) {
                const clickedCoordinate = map1.getEventCoordinate(event.originalEvent);
                setCenter([clickedCoordinate[0], clickedCoordinate[1]]);
            });

            setMap1Object(map1);
            
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

export default OpenStreetMap;
