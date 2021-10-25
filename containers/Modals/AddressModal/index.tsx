import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { Form, Formik, Field } from "formik";
import { googleMapConfig } from "../../../config/siteConfigs";

const _LocationMap = () => {
	const [center, setCenter] = useState({
		lat: 51.260197,
		lng: 4.402771,
	});
	const mapRef = useRef(null);

	useEffect(() => {
		mapRef.current?.map?.setMapTypeId("hybrid");
	}, [mapRef]);

	return (
		<Map
			ref={mapRef}
			fullscreenControl={false}
			zoomControl={false}
			mapTypeControl={false}
			streetViewControl={false}
			zoom={20}
			containerStyle={{ width: "61%" }}
			style={{ borderRadius: "0px 6px 6px 0px" }}
			google={google}
			initialCenter={{
				lat: 51.260197,
				lng: 4.402771,
			}}
			center={{ ...center }}
		></Map>
	);
};

const LocationMap = GoogleApiWrapper({
	apiKey: googleMapConfig.apiKey,
})(_LocationMap);

const AddressModal = ({ show, handleClose }) => {
	return (
		<Modal
			className="map-modal"
			show={show}
			onHide={handleClose}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<div className="d-flex h-100">
					<div style={{ width: "40%" }}>p</div>
					<LocationMap />
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default AddressModal;
