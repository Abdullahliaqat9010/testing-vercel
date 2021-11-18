import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const CompanyDetails = ({ onSubmit, onBack, address }) => {
	const [sameBillingAddress, setSameBillingAddress] = useState(true);
	const { t } = useTranslation("register-agency-pages");

	const validationSchema = Yup.object().shape({
		ipi_number: Yup.string().optional().min(0),
		company_name: Yup.string().required(t("p.error")),
		vat_number: Yup.string().optional(),
		billing_address: Yup.string().required(t("p.error")),
	});

	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">{t("p.company-heading")}</p>
				<p className="form-subtitle">{t("p.company-sub-heading")}</p>
			</div>
			<div>
				<Formik
					initialValues={{
						ipi_number: "",
						company_name: "",
						vat_number: "",
						billing_address: address,
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
								<Field className="form-input" name="ipi_number" type="text" />
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
													billing_address: address,
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
										<label className="form-label" htmlFor="billing_address">
											{t("label.billing-address")}
										</label>
										<Field
											className="form-input"
											name="billing_address"
											type="text"
										/>
										<ErrorMessage
											className="form-error"
											component="div"
											name="billing_address"
										/>
									</div>
								</>
							)}
							<div className="d-flex flex-row justify-content-between mt-4">
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
