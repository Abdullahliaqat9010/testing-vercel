import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import { ProgressBar } from "react-bootstrap";


import MarkerHomeIcon from "../../assets/images/marker.svg";
import MarkerAgencyIcon from "../../assets/images/marker-agency.svg";
import MarkerPropertyIcon from "../../assets/images/similar-property-marker.svg";
import MarkerPropertyActiveIcon from "../../assets/images/similar-property-marker-active.svg";
import province from "./provinces.json"
import * as provinces from "./provinces.json";

mapboxgl.Marker.prototype.onClick = function (handleClick) {
    this._handleClick = handleClick;
    return this;
};
mapboxgl.Marker.prototype._onMapClick = function (t) {
    const targetElement = t.originalEvent.target;
    const element = this._element;
    if (
        this._handleClick &&
        (targetElement === element || element.contains(targetElement))
    ) {
        this.togglePopup();
        this._handleClick();
    }
};

interface MarkerI {
    type: string;
    position: {
        lat: number;
        lng: number;
    };
    id: null | number | string;
}

interface MapProps {
    markers?: MarkerI[],
    city4?: string
}
const progressBar = {
    height: '15px',
    width: '80%',
    position: "relative",
}

const Mapbox3dMap = ({
    markers = [],
    city4
}: MapProps) => {

    const [center, setCenter] = useState([4.402771, 51.260197,]);
    const [first, setFirst] = useState(false);

    let mapRef = useRef(null);
    useEffect(() => {
        if (markers.length > 0) {
            setCenter([
                markers[0].position.lat,
                markers[0].position.lng,

            ]);
        }
    }, [markers]);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ';
        mapRef.current = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [4.402771, 51.260197,], // starting position
            zoom: 6 // starting zoom
        });

        mapRef.current.on('load', () => {
            // Add a data source containing GeoJSON data.
            mapRef.current.addSource('provice_geojson', {
                'type': 'geojson',
                'data': province
            });

            // Add a new layer to visualize the polygon.
            mapRef.current.addLayer({
                'id': 'province',
                'type': 'fill',
                'source': 'provice_geojson', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'price'],
                        0,
                        "#22b804",
                        2000,
                        "#f2f20c",
                        2500,
                        '#ed5807',
                        5000,
                        '#e60b0b',
                        7500,
                        '#e60b0b'
                    ]
                }
            }, 'waterway-label');

            mapRef.current.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'provice_geojson',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-opacity': 0.3,
                    'line-width': 1
                }
            });
        });
    }, [mapRef]);

    useEffect(() => {
        if (city4.length > 0) {
            const _provinces = provinces as any;
            const getRegion = _provinces?.default?.features.find(
                (feature) =>
                    feature.properties.NAME_4.toLocaleLowerCase() ===
                    city4.toLocaleLowerCase()
            );
            const provinceLevelData = {
                "type": "FeatureCollection",
                "name": "gadm36_BEL_4",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                features: [
                   {...getRegion}
                ]
            }

            mapRef.current.addSource('provice_data', {
                'type': 'geojson',
                'data': provinceLevelData
            });

            mapRef.current.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'provice_data',
                'layout': {},
                'paint': {
                    'line-color': '#009900',
                    // 'line-opacity': 0.7,
                    'line-width': 2
                }
            });

        }

    }, [city4])

    useEffect(() => {
        if (first) {
            var map = mapRef.current;
            map?.flyTo({
                center: [...center],
                zoom: 10,
                // essential: true,
            });
        } else { setFirst(true) }
    }, [center]);


    return (
        <>
            {/* <div className="d-flex" style={{ position: "absolute", top: "30px" , zIndex: 10 } }>
                <select>
                    <option>price per m</option>
                    <option>price per rent</option>
                </select>
                    <span> {">"} 7238</span>
                    <ProgressBar now={60} variant="warning" min={0} max={100} style={progressBar} />
                    <input type="range" id="volume" name="volume" min="0" max="11" />
                    <span>{"<"} 89831</span>
            </div> */}
            <div style={{ height: "100vh", width: "100%" }} ref={mapRef} id="map" />

        </>
    );
};

export default Mapbox3dMap;
