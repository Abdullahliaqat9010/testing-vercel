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
	const { t } = useTranslation("property-details");

	const onHideModal = () => {
		onClose();
	};
	const images = property?.images;
	return (
		<Modal
			dialogClassName="property-detail-modal"
			size="xl"
			show={show}
			onHide={onHideModal}
		>
			<Modal.Header closeButton>
				<Modal.Title className="d-flex flex-column">
					<div className="title">{`€${property?.sold_rent_price}`}</div>
					<p className="subtitle">{`${t("p.sold-on")}${
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
								src={images[0] ? images[0] : NoImage}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={images[1] ? images[1] : NoImage}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={images[2] ? images[2] : NoImage}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
							</div>
						</div>
						<div className="info-container">
							<div className="address-and-map">
								<div className="address">
									<div className="w-70">
										{property?.property?.search_address}
									</div>
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
											<div className="heading">{t("p.total-square")}</div>
											<div className="info">{`${property?.property?.total_area}m²`}</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">{t("p.living-square")}</div>
											<div className="info">{`${property?.property?.live_area}m²`}</div>
										</div>
									</div>
								</div>
								<div className="detail-2container">
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">{t("p.beds")}</div>
											<div className="info">{`${property?.property?.bedrooms}`}</div>
										</div>
									</div>
									<div className="detail-1container">
										<img src={TotalSquareImage} alt="" />
										<div className="ml-3">
											<div className="heading">{t("p.baths")}</div>
											<div className="info">{`${property?.property?.bathrooms}`}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="image-container">
							<img
								src={images[0] ? images[0] : NoImage}
								style={{ height: "100%", width: "100%" }}
								alt=""
							/>
							<div className="subimage-container">
								<img
									className="img1"
									src={images[1] ? images[1] : NoImage}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
								<img
									className="img2"
									src={images[2] ? images[2] : NoImage}
									style={{ height: "100%", width: "100%" }}
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="detail-container">
						<div className="heading">	{t("p.listing-detail")}</div>
						<div className="mt-4">
							<div className="d-flex flex-row my-3">
								<div className="name">{t("p.floors")}</div>
								<div className="details">{property?.property?.floor}</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">{t("p.facades")}</div>
								<div className="details">{property?.property?.facades}</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">{t("p.parking")}</div>
								<div className="details">
									{property?.property?.parking_spot}
								</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">{t("p.constructed")}</div>
								<div className="details">
									{property?.property?.construction_year}
								</div>
							</div>
							<div className="d-flex flex-row my-3">
								<div className="name">{t("p.note")}</div>
								<div className="details">{property?.property?.note}</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};


export default PropertyDetailsModal;
