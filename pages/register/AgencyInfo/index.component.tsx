import React, { useState, useRef } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import AddressModal from "../../../containers/Modals/AddressModal";
import { EnvironmentFilled } from "@ant-design/icons";

const AgencyInfo = ({ onSubmit, initialValues }) => {
	const { t } = useTranslation("register-agency-pages");
	const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
	const [addressComponents, setAddressComponents] = useState({
		search_address: initialValues?.search_address,
		street: initialValues?.street,
		street_number: initialValues?.street_number,
		zip: initialValues?.zip,
		locality: initialValues?.locality,
		city: initialValues?.city,
		latlng: initialValues?.latlng,
	});

	const validationSchema = Yup.object().shape({
		vitrine_name: Yup.string().required(t("p.error")),
		search_address: Yup.string().required(t("p.error")),
		city: Yup.string().required(t("p.error")),
	});

	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">{t("p.heading")}</p>
				<p className="form-subtitle">{t("p.sub-heading")}</p>
			</div>
			<div>
				<Formik
					initialValues={{
						vitrine_name: initialValues?.vitrine_name,
						search_address: initialValues?.search_address,
						city: initialValues?.city,
					}}
					onSubmit={(values) => {
						onSubmit({ ...values, ...addressComponents });
					}}
					validationSchema={validationSchema}
				>
					{({ setFieldValue }) => (
						<Form>
							<AddressModal
								show={isLocationModalVisible}
								handleClose={() => {
									setIsLocationModalVisible(false);
								}}
								onAddress={(values) => {
									setAddressComponents({ ...values });
									setFieldValue("search_address", values?.search_address);
									setFieldValue("city", values?.city);
								}}
								initialValues={{ ...addressComponents }}
							/>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="vitrine_name">
									{t("label.vitrine-name")}
								</label>
								<Field className="form-input" name="vitrine_name" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="vitrine_name"
								/>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="city">
									{t("label.city")}
								</label>

								<Field
									className="form-input"
									name="city"
									type="text"
									onChange={() => setIsLocationModalVisible(true)}
								/>

								<ErrorMessage
									className="form-error"
									component="div"
									name="city"
								/>
							</div>

							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="search_address">
									{t("label.search-address")}
								</label>
								<Field
									className="form-input"
									name="search_address"
									type="text"
									onChange={() => setIsLocationModalVisible(true)}
								/>
								<ErrorMessage
									className="form-error"
									component="div"
									name="search_address"
								/>
							</div>

							<div
								style={{ cursor: "pointer" }}
								onClick={() => setIsLocationModalVisible(true)}
								className="d-flex flex-row align-items-center"
							>
								<EnvironmentFilled
									style={{ color: "#3871EF" }}
									className="mr-3"
								/>
								<div style={{ color: "#3871EF", fontSize: 13 }}>
									{" "}
									{t("info-agency-location")}
								</div>
							</div>

							<Button className="form-button mt-4" block type="submit">
								{t("button.next")}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AgencyInfo;
