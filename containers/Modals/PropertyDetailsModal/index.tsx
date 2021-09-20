import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import moment from "moment";

import StaticImage1 from "../../../assets/images/template/first-image.png";
import StaticImage2 from "../../../assets/images/template/second-image.png";
import StaticImage3 from "../../../assets/images/template/third-image.png";
import MapImage from "../../../assets/images/agency-page/bg-agency.jpeg";
import TotalSquareImage from "../../../assets/images/total-square.svg";
import NoImage from "../../../assets/images/no-image-available.svg";

const PropertyDetailsModal = ({ show, onClose, property }) => {
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
					<div className="title">{`€${property?.price}`}</div>
					<p className="subtitle">{`Sold on ${
						property?.sold_rent_date
							? moment(property?.sold_rent_date).format("MMM DD, YYYY")
							: moment().format("MMM DD, YYYY")
					}`}</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="body">
					<div className="main-container">
						<div className="image-container2">
							<img
								src={
									property?.images[0]?.url_large
										? property?.images[0]?.url_large
										: NoImage
								}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={
										property?.images[1]?.url_large
											? property?.images[1]?.url_large
											: NoImage
									}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={
										property?.images[2]?.url_large
											? property?.images[2]?.url_large
											: NoImage
									}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
							</div>
						</div>
						<div className="info-container">
							<div className="address-and-map">
								<div className="address">
									<div className="w-70">{property?.search_address}</div>
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
											<div className="info">{`${property?.total_area}m²`}</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Living Square</div>
											<div className="info">{`${property?.live_area}m²`}</div>
										</div>
									</div>
								</div>
								<div className="detail-2container">
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Beds</div>
											<div className="info">{`${property?.bedrooms}`}</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">Baths</div>
											<div className="info">{`${property?.bathrooms}`}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="image-container">
							<img
								src={
									property?.images[0]?.url_large
										? property?.images[0]?.url_large
										: NoImage
								}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={
										property?.images[1]?.url_large
											? property?.images[1]?.url_large
											: NoImage
									}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={
										property?.images[2]?.url_large
											? property?.images[2]?.url_large
											: NoImage
									}
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
