import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
//import * as L from "leaflet";

const Map = () => {
	useEffect(() => {
		var map = new OSMBuildings({
			container: "map",
			position: { latitude: 52.51836, longitude: 13.40438 },
			zoom: 16,
			minZoom: 15,
			maxZoom: 20,
			attribution:
				'© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>',
		});
		map.addMapTiles("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
		map.addGeoJSONTiles(
			"https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json"
		);
		map.setTilt(45);
		// var map = new L.Map("map");

		// map.setView([52.51836, 13.40438], 16, false);

		// new L.TileLayer(
		// 	"https://{s}.tiles.mapbox.com/v3/[YOUR_MAPBOX_KEY]/{z}/{x}/{y}.png",
		// 	{
		// 		attribution: '© Map tiles <a href="https://mapbox.com">Mapbox</a>',

		// 		maxZoom: 18,

		// 		maxNativeZoom: 20,
		// 	}
		// ).addTo(map);

		// var osmb = new OSMBuildings(map).load(
		// 	"https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json"
		// );
	}, []);
	return (
		<div id="map"></div>
		// <div style={{ width: "100%", height: "100%" }}>
		// 	<MapContainer
		// 		id="map"
		// 		center={[51.505, -0.09]}
		// 		zoom={13}
		// 		scrollWheelZoom={false}
		// 		style={{ height: "100%", width: "100%" }}
		// 	>
		// 		<TileLayer
		// 			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		// 			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		// 		/>
		// 		<Marker position={[51.505, -0.09]}>
		// 			<Popup>
		// 				A pretty CSS3 popup. <br /> Easily customizable.
		// 			</Popup>
		// 		</Marker>
		// 	</MapContainer>
		// </div>
	);
};

export default Map;
