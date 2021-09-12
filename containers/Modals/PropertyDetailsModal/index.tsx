import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import StaticImage1 from "../../../assets/images/template/first-image.png";

const PropertyDetailsModal = ({ show, onClose }) => {
	const onHideModal = () => {
		onClose();
	};

	return (
		<Modal
			className="property-detail-modal"
			size="lg"
			show={show}
			onHide={onHideModal}
		>
			<Modal.Header closeButton>
				<Modal.Title className="d-flex flex-column">
					<div className="title">€1,100,000</div>
					<p className="subtitle">Sold on May 14, 2020</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="body">
					<div className="main-container">
						<div className="info-container"></div>
						<div className="image-container">
							<img
								src={StaticImage1}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
						</div>
					</div>
					<br />
					<br />
					<div className="detail-container">
						<div className="heading">Listing Details</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default PropertyDetailsModal;
