import React from "react";
import { isMobileOnly } from "react-device-detect";
import { useTranslation } from "next-i18next";
import { Button, Modal } from "react-bootstrap";

import GoogleMap from "../../../components/GoogleMap";

const GoogleMapModal = ({ show, handleClose, property }) => {
	const { t } = useTranslation("property-page");

	const mapProps = {
		markers: [
			{
				type: "home",
				position: {
					lat: property?.lat,
					lng: property?.lng,
				},
				id: property?.id,
			},
		],
	};

	return (
		<Modal
			className="map-modal"
			show={show}
			onHide={handleClose}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{property?.search_address}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/*@ts-ignore*/}
				<GoogleMap {...mapProps} />
			</Modal.Body>
			{isMobileOnly && (
				<Button className="close-btn" onClick={handleClose}>
					{t("button.close")}
				</Button>
			)}
		</Modal>
	);
};

export default GoogleMapModal;
