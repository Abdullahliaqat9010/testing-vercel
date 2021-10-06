import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";

import MarkerHomeIcon from "../../assets/images/marker.svg";
import MarkerAgencyIcon from "../../assets/images/marker-agency.svg";
import MarkerPropertyIcon from "../../assets/images/similar-property-marker.svg";
import MarkerPropertyActiveIcon from "../../assets/images/similar-property-marker-active.svg";
import province from "./provinces.json"

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
    markers?: MarkerI[];
    onActiveMarker?: (id: any) => void;
}

const Mapbox3dMap = ({
    markers = [],
    onActiveMarker = (id) => null,
}: MapProps) => {
    const [center, setCenter] = useState([
        markers.length > 0 ? markers[0].position.lng : 51.260197,
        markers.length > 0 ? markers[0].position.lat : 4.402771,
    ]);

    // const mapRef = useRef(null);
    console.log("features", province.features.length)


    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [4.402771, 51.260197], // starting position
            zoom: 8 // starting zoom
        });

        map.on('load', () => {
            // Add a data source containing GeoJSON data.
            map.addSource('provice_geojson', {
                'type': 'geojson',
                'data': province
            });

            // Add a new layer to visualize the polygon.
            map.addLayer({
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
                        '#7ca971',
                        4,
                        "#849251",
                        7,
                        "#af4d41",
                        9,
                        "#872233"


                    ]
                }
            }, 'waterway-label');

            map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'provice_geojson',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 1
                }
            });
        });
    });


    return (
        <div style={{ height: "100vh", width: "100%" }} id="map" />
    );
};

export default Mapbox3dMap;
