import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

import { Button, Modal } from "react-bootstrap";
import { RootState } from "../../../types/state";
import SendSuccess from "../../../assets/images/message-send.svg";
import { contactAgency } from "../../../network-requests";

const ContactAgentModal = ({
	show,
	onClose,
	properties = [],
	agencyOwner,
	agencyName,
}) => {
	const { t } = useTranslation("dashboard-page");
	const { t: t2 } = useTranslation("common");
	const { firstname, lastname, email, phone_number } = useSelector(
		(state: RootState) => state.userInfo
	);
	const [isSuccessModalVisible, setIsSuccessModalVisible] =
		useState<boolean>(false);

	const validationSchema = Yup.object().shape({
		fullname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
		phone: Yup.string().required(),
		message: Yup.string().required("Required"),
		free_evaluated: Yup.bool(),
		propertyId: Yup.number().required(),
	});

	const handleClose = () => {
		onClose();
		setIsSuccessModalVisible(false);
	};

	const sendToAgency = (contactInfo) => {
		return new Promise(async (res, rej) => {
			try {
				await contactAgency({
					...contactInfo,
					agencyId: 3, // hard coded for now
				});
				res("");
				setIsSuccessModalVisible(true);
			} catch (error) {
				rej(error);
			}
		});
	};

	return (
		<Modal className="contact-agent-modal" show={show} onHide={handleClose}>
			{!isSuccessModalVisible ? (
				<>
					<Modal.Header closeButton>
						<Modal.Title className="d-flex flex-column">
							{t("button.contact")}{" "}
							{agencyOwner?.firstname + " " + agencyOwner?.lastname}
							<p>{agencyName}</p>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Formik
							initialValues={{
								fullname: `${firstname} ${lastname}`,
								phone: phone_number ? phone_number : "",
								email,
								message: t("placeholder.message"),
								free_evaluated: true,
								propertyId: properties.length > 0 ? properties[0]?.id : "",
							}}
							onSubmit={sendToAgency}
							validationSchema={validationSchema}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="fullname">
											{t("label.fullname")}
										</label>
										<Field className="form-input" name="fullname" type="text" />
										<ErrorMessage
											className="form-error"
											component="div"
											name="fullname"
										/>
									</div>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="phone">
											{t("label.phone")}
										</label>
										<Field className="form-input" name="phone" type="number" />
										<ErrorMessage
											className="form-error"
											component="div"
											name="phone"
										/>
									</div>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="email">
											{t("label.email")}
										</label>
										<Field className="form-input" name="email" type="email" />
										<ErrorMessage
											className="form-error"
											component="div"
											name="email"
										/>
									</div>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="message">
											{t("label.message")}
										</label>
										<Field
											className="form-input"
											name="message"
											type="text"
											as="textarea"
											style={{ height: "auto" }}
											rows={5}
										/>
										<ErrorMessage
											className="form-error"
											component="div"
											name="message"
										/>
									</div>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="propertyId">
											{t("label.select")}
										</label>
										<Field
											className="custom-select"
											name="propertyId"
											type="text"
											as="select"
											style={{ paddingRight: 40 }}
										>
											{properties.map((property) => (
												<option key={property?.id} value={property?.id}>
													{property?.search_address}
												</option>
											))}
										</Field>
										<ErrorMessage
											className="form-error"
											component="div"
											name="propertyId"
										/>
									</div>

									<div className="d-flex flex-row">
										<Field
											name="free_evaluated"
											type="checkbox"
											className="mr-2 mt-1"
										/>
										<label className="label-terms-condition">
											{t("label.free-charge")}
										</label>
										<ErrorMessage
											className="form-error"
											component="div"
											name="free_evaluated"
										/>
									</div>
									<div className="modal-btn-group mt-4">
										<Button className="confirm" type="submit">
											{isSubmitting ? t2("text.loading") : t("button.confirm")}
										</Button>
										<Button className="cancel" onClick={handleClose}>
											{t("button.cancel")}
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</Modal.Body>
				</>
			) : (
				<>
					<Modal.Header closeButton />
					<Modal.Body>
						<div className="main-content">
							<img src={SendSuccess} alt="SendSuccess" />
							<h3>{t("title.message-sent-successfully")}</h3>
							<p>
								<span>
									{t("desc.agency")} {agencyName} {t("desc.soon")}
								</span>
							</p>
							<Button className="close" onClick={handleClose}>
								{t("button.close")}
							</Button>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	);
};

export default ContactAgentModal;
