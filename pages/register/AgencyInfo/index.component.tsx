import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const AgencyInfo = ({ onSubmit }) => {
	const { t } = useTranslation("register-agency-pages")

	const validationSchema = Yup.object().shape({
		vitrine_name: Yup.string().required(t("p.error")),
		city: Yup.string().required(t("p.error")),
		street: Yup.string().required(t("p.error")),
		street_number: Yup.number().required(t("p.error")),
		zip: Yup.number().required(t("p.error")).min(1000, t("error.zip-validation")).max(9999, t("error.zip-validation")),
	});


	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">{t("p.heading")}</p>
				<p className="form-subtitle">
					{t("p.sub-heading")}
				</p>
			</div>
			<div>
				<Formik
					initialValues={{
						vitrine_name: "",
						city: "",
						street: "",
						street_number: "",
						zip: "",
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{() => (
						<Form>
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
								<Field className="form-input" name="city" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="city"
								/>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="street">
									{t("label.street")}
								</label>
								<Field className="form-input" name="street" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="street"
								/>
							</div>
							<div className="d-flex flex-row justify-content-between">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="street_number">
										{t("label.street-number")}
									</label>
									<Field
										className="form-input form-input-error"
										name="street_number"
										type="number"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="street_number"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="zip">
										{t("label.zipcode")}
									</label>
									<Field
										className="form-input"
										name="zip"
										type="number"
										min="1000"
										max="9999"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="zip"
									/>
								</div>
							</div>
							<Button className="form-button" block type="submit">
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
