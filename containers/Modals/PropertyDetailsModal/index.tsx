import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import StaticImage1 from "../../../assets/images/template/first-image.png";
import StaticImage2 from "../../../assets/images/template/second-image.png";
import StaticImage3 from "../../../assets/images/template/third-image.png";
import MapImage from "../../../assets/images/agency-page/bg-agency.jpeg";
import TotalSquareImage from "../../../assets/images/total-square.svg";

const PropertyDetailsModal = ({ show, onClose }) => {
	const onHideModal = () => {
		onClose();
	};

	return (
		<Modal
			dialogClassName="property-detail-modal"
			size="xl"
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
						<div className="image-container2">
							<img
								src={StaticImage1}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={StaticImage2}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={StaticImage3}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
							</div>
						</div>
						<div className="info-container">
							<div className="address-and-map">
								<div className="address">
									<div>2464 Royal Ln. Mesa,</div>
									<div>New Jersey 45463</div>
								</div>

								<div className="map">
									<img src={MapImage} alt="" />
								</div>
							</div>
							<div className="other-details">
								<div className="detail-2container">
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Total Square</div>
											<div className="info">100m²</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Total Square</div>
											<div className="info">100m²</div>
										</div>
									</div>
								</div>
								<div className="detail-2container">
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Total Square</div>
											<div className="info">100m²</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Total Square</div>
											<div className="info">100m²</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="image-container">
							<img
								src={StaticImage1}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={StaticImage2}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={StaticImage3}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="detail-container">
						<div className="heading">Listing Details</div>
						<div className="mt-4">
							<div className="d-flex flex-row my-3">
								<div className="name">Floors:</div>
								<div className="details">2</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">Facades:</div>
								<div className="details">2</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">Parking:</div>
								<div className="details">3</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">Constructed:</div>
								<div className="details">1970</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">Note:</div>
								<div className="details">
									Sold withing 2 km from 3517 W. Gray St. Utica, Pennsylvania
									57867.
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default PropertyDetailsModal;
