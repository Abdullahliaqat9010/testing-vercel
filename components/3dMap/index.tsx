import React from "react";
import dynamic from "next/dynamic";
import { MapContainer as _MapContainer } from "react-leaflet";
import Head from "next/head";

const Map = dynamic(() => import("./components/map"), {
	ssr: false,
}) as typeof _MapContainer;

const _3dMap = () => {
	return (
		<>
			{/* <Head></Head> */}
			<link
				href="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
				rel="stylesheet"
			/>
			<script src="https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js" />
			<script src="https://cdn.osmbuildings.org/classic/0.2.2b/OSMBuildings-Leaflet.js" />
			<Map />
		</>
	);
};

export default _3dMap;
