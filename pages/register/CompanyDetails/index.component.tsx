import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const CompanyDetails = ({ onSubmit, onBack, address }) => {
	const [sameBillingAddress, setSameBillingAddress] = useState(true);
	const { t } = useTranslation("register-agency-pages")

	const validationSchema = Yup.object().shape({
		ipi_number: Yup.number().required(t("p.error")).min(0),
		company_name: Yup.string().required(t("p.error")),
		vat_number: Yup.string().required(t("p.error")),
		billing_city: Yup.string().required(t("p.error")),
		billing_street: Yup.string().required(t("p.error")),
		billing_street_number: Yup.number().required(t("p.error")),
		billing_zip: Yup.number().required(t("p.error")).min(1000, t("error.zip-validation")).max(9999, t("error.zip-validation")),
	});


	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">{t("p.company-heading")}</p>
				<p className="form-subtitle">
					{t("p.company-sub-heading")}
				</p>
			</div>
			<div>
				<Formik
					initialValues={{
						ipi_number: "",
						company_name: "",
						vat_number: "",
						billing_city: address?.city,
						billing_street: address?.street,
						billing_street_number: address?.street_number,
						billing_zip: address?.zip,
					}}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{({ resetForm, values, isSubmitting }) => (
						<Form>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="ipi_number">
									{t("label.ipi-number")}
								</label>
								<Field className="form-input" name="ipi_number" type="number" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="ipi_number"
								/>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="company_name">
									{t("label.company-name")}
								</label>
								<Field className="form-input" name="company_name" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="company_name"
								/>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="vat_number">
									{t("label.vat-number")}
								</label>
								<Field className="form-input" name="vat_number" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="vat_number"
								/>
							</div>
							<div className=" d-flex flex-row align-items-center mb-2">
								<div className="mr-2">
									<input
										checked={sameBillingAddress}
										onChange={(e) => {
											setSameBillingAddress(e.target.checked);
											resetForm({
												values: {
													...values,
													billing_city: address?.city,
													billing_street: address?.street,
													billing_street_number: address?.street_number,
													billing_zip: address?.zip,
												},
											});
										}}
										type="checkbox"
									/>
								</div>
								<label style={{ fontSize: 15, paddingTop: 5 }}>
									{t("label.checkmark")}
								</label>
							</div>
							{!sameBillingAddress && (
								<>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="billing_city">
											{t("label.city")}
										</label>
										<Field
											className="form-input"
											name="billing_city"
											type="text"
										/>
										<ErrorMessage
											className="form-error"
											component="div"
											name="billing_city"
										/>
									</div>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="billing_street">
											{t("label.street")}
										</label>
										<Field
											className="form-input"
											name="billing_street"
											type="text"
										/>
										<ErrorMessage
											className="form-error"
											component="div"
											name="billing_street"
										/>
									</div>
									<div className="d-flex flex-row justify-content-between">
										<div
											style={{ width: "49%" }}
											className="d-flex flex-column form-input-block"
										>
											<label
												className="form-label"
												htmlFor="billing_street_number"
											>
												{t("label.street-number")}
											</label>
											<Field
												className="form-input form-input-error"
												name="billing_street_number"
												type="number"
											/>
											<ErrorMessage
												className="form-error"
												component="div"
												name="billing_street_number"
											/>
										</div>
										<div
											style={{ width: "49%" }}
											className="d-flex flex-column form-input-block"
										>
											<label className="form-label" htmlFor="billing_zip">
												{t("label.zipcode")}
											</label>
											<Field
												className="form-input"
												name="billing_zip"
												type="number"
												min="1000"
												max="9999"
											/>
											<ErrorMessage
												className="form-error"
												component="div"
												name="billing_zip"
											/>
										</div>
									</div>
								</>
							)}
							<div className="d-flex flex-row justify-content-between">
								<Button
									style={{ width: "49%" }}
									className="form-back-button"
									onClick={onBack}
								>
									{t("button.back")}
								</Button>
								<Button
									style={{ width: "49%" }}
									type="submit"
									className="form-button"
								>
									{isSubmitting ? t("button.loading") : t("button.next")}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CompanyDetails;
