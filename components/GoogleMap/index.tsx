import React, { useState, useRef } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import { googleMapStyle } from "../../config/googleMapStyle";
import { googleMapConfig } from "../../config/siteConfigs";

import MarkerHomeIcon from "../../assets/images/marker.svg";
import MarkerAgencyIcon from "../../assets/images/marker-agency.svg";
import MarkerPropertyIcon from "../../assets/images/similar-property-marker.svg";
import MarkerPropertyActiveIcon from "../../assets/images/similar-property-marker-active.svg";
import { useEffect } from "react";

type MarkerType = "home" | "agency" | "property" | "property-active";

interface MarkerI {
	type: MarkerType;
	position: {
		lat: number;
		lng: number;
	};
	id: null | number | string;
}

interface GoogleMapProps {
	google?: any;
	markers?: MarkerI[];
}

const GoogleMap = ({ google, markers = [] }: GoogleMapProps) => {
	const [center, setCenter] = useState({
		lat: markers.length > 0 ? markers[0].position.lat : 51.260197,
		lng: markers.length > 0 ? markers[0].position.lng : 4.402771,
	});

	const mapRef = useRef(null);

	const setActiveMarker = (marker: MarkerI) => {
		setCenter({
			lat: marker.position.lat,
			lng: marker.position.lng,
		});
		mapRef.current?.map?.setZoom(20);
	};

	useEffect(() => {
		setCenter({
			lat: markers.length > 0 ? markers[0].position.lat : 51.260197,
			lng: markers.length > 0 ? markers[0].position.lng : 4.402771,
		});
	}, [markers]);

	useEffect(() => {
		mapRef.current?.map?.setMapTypeId("satellite");
	}, [mapRef]);

	return (
		<Map
			ref={mapRef}
			fullscreenControl={false}
			zoomControl={false}
			mapTypeControl={false}
			streetViewControl={false}
			zoom={20}
			google={google}
			mapTypeId="satellite"
			initialCenter={{
				lat: 51.260197,
				lng: 4.402771,
			}}
			center={{ ...center }}
		>
			{markers.map((marker, index) => {
				return (
					<Marker
						key={index}
						icon={
							marker.type === "home" ? (
								MarkerHomeIcon
							) : marker.type === "agency" ? (
								<MarkerAgencyIcon />
							) : marker.type === "property" ? (
								MarkerPropertyIcon
							) : (
								MarkerPropertyActiveIcon
							)
						}
						onClick={() => setActiveMarker(marker)}
						position={{
							lat: marker.position.lat,
							lng: marker.position.lng,
						}}
					/>
				);
			})}
		</Map>
	);
};

export default GoogleApiWrapper({
	apiKey: googleMapConfig.apiKey,
})(GoogleMap);
