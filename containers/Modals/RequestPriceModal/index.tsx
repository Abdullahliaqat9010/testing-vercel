import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { isMobileOnly } from "react-device-detect";
import { useTranslation } from "next-i18next";

import GoogleMap from "../../../components/GoogleMap";

import BathImage from "../../../assets/images/bath-gray.svg";
import BedsImage from "../../../assets/images/beds-gray.svg";
import SquareImage from "../../../assets/images/square-gray.svg";
import LivingSquareImage from "../../../assets/images/living-square-gray.svg";

const RequestPriceModal = ({ show, handleClose, property }) => {
	const { t } = useTranslation("property-page");
	const [validated, setValidated] = useState(false);

	const [data, setData] = useState({
		fullName: "",
		phone: "",
		email: "",
		desc: `${t("desc.have-seen")} [${property?.search_address}] ${t(
			"desc.sold-price"
		)}`,
		agree: false,
	});

	const handleChange = (el: React.ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			[el.target.name]:
				el.target.name === "agree" ? el.target.checked : el.target.value,
		});
	};

	const validation = () => {
		return (
			data?.fullName?.length > 0 &&
			data?.phone?.length > 0 &&
			data?.email?.length > 0 &&
			data?.agree
		);
	};

	const handleConfirm = () => {
		if (validation()) {
			console.log("send data to BE");
		}
		setValidated(true);
	};

	const handleCloseBtn = () => {
		setData({
			fullName: "",
			phone: "",
			email: "",
			desc: `${t("desc.have-seen")} [2464 Royal Ln. Mesa, New Jersey 45463] ${t(
				"desc.sold-price"
			)}`,
			agree: false,
		});
		setValidated(false);
		handleClose();
	};

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

	// @ts-ignore
	return (
		<Modal
			className="request-property-modal"
			show={show}
			onHide={handleCloseBtn}
			size="lg"
			aria-labelledby="request-property-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="request-property-modal">
					{t("title.request-price")}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="custom-req-price-modal">
				{isMobileOnly && (
					<span className="mobile-address">{property?.search_address}</span>
				)}
				<div className="left-block">
					<Form noValidate validated={validated}>
						<Form.Group controlId="fullName">
							<Form.Label>{t("label.fullname")}</Form.Label>
							<Form.Control
								required
								value={data.fullName}
								name="fullName"
								type="text"
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="phone">
							<Form.Label>{t("label.phone")}</Form.Label>
							<Form.Control
								required
								name="phone"
								type="number"
								value={data.phone}
								// placeholder="Please enter"
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>{t("label.email")}</Form.Label>
							<Form.Control
								required
								value={data.email}
								name="email"
								type="email"
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="desc">
							<Form.Label>{t("label.desc")}</Form.Label>
							<Form.Control
								required
								value={data.desc}
								as="textarea"
								rows={5}
								name="desc"
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId="agree">
							<Form.Check
								required
								checked={data.agree}
								name="agree"
								type="checkbox"
								onChange={handleChange}
								label={t("label.agree")}
							/>
						</Form.Group>
						<div className="modal-btn-group">
							<Button className="confirm" onClick={handleConfirm}>
								{t("button.confirm")}
							</Button>
							<Button className="cancel" onClick={handleCloseBtn}>
								{t("button.cancel")}
							</Button>
						</div>
					</Form>
				</div>
				<div className="right-block">
					<p className="property-address">{property?.search_address}</p>
					<div className="property-location">
						{/*@ts-ignore*/}
						<GoogleMap
							{...mapProps}
							// coordsCurrentProperty={{ lat: 50.4666086, lng: 4.0528334 }}
						/>
					</div>
					<div className="property-info">
						<div className="property-info__item">
							<img src={SquareImage} alt="SquareImage" />
							<div className="info-block">
								<span className="gray">{t("span.total-square")}</span>
								<span className="nunito-bold">{`${property?.total_area}m²`}</span>
							</div>
						</div>
						<div className="property-info__item">
							<img src={BedsImage} alt="BedsImage" />
							<div className="info-block">
								<span className="gray">{t("span.beds")}</span>
								<span className="nunito-bold">{property?.bedrooms}</span>
							</div>
						</div>
						<div className="property-info__item living-square">
							<img src={LivingSquareImage} alt="LivingSquareImage" />
							<div className="info-block">
								<span className="gray">{t("span.living-square")}</span>
								<span className="nunito-bold">{property?.live_area}</span>
							</div>
						</div>
						<div className="property-info__item">
							<img src={BathImage} alt="BathImage" />
							<div className="info-block">
								<span className="gray">{t("span.baths")}</span>
								<span className="nunito-bold">{property?.bathrooms}</span>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default RequestPriceModal;
