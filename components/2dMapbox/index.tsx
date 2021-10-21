
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect , useRef} from "react";

const mapboxContainer = () => {

    const mapRef = useRef(null)
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXNocmFmYWxpMTEyMiIsImEiOiJja3Rkd2UzaHUyazg3MnVwZ2w4YjFubTh3In0.XU0TSvROhCasiUBhLaCbiQ';
        mapRef.current = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [4.402771, 51.260197], // starting position
            zoom: 6 // starting zoom
        });
    });

    return (
        <div id="map" style={{ height:'300px' , width: "100%" }} ref={mapRef} />
    )
}

export default mapboxContainer