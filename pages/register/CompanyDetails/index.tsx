import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

const CompanyDetails = ({ onSubmit, onBack, address }) => {
	const [sameBillingAddress, setSameBillingAddress] = useState(true);

	const validationSchema = Yup.object().shape({
		ipi_number: Yup.number().required("Required").min(0),
		company_name: Yup.string().required("Required"),
		vat_number: Yup.number().required("Required").min(0),
		billing_city: Yup.string().required("Required"),
		billing_street: Yup.string().required("Required"),
		billing_street_number: Yup.number().required("Required"),
		billing_zip: Yup.number().required("Required").min(1000).max(9999),
	});

	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">Company Details</p>
				<p className="form-subtitle">
					Benefit from using ImmoBelgium for your agency
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
					{() => (
						<Form>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="ipi_number">
									IPI number
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
									Company name
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
									VAT number
								</label>
								<Field className="form-input" name="vat_number" type="number" />
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
										onChange={(e) => setSameBillingAddress(e.target.checked)}
										type="checkbox"
									/>
								</div>
								<label style={{ fontSize: 15, paddingTop: 5 }}>
									Use the same billing address as a company address
								</label>
							</div>
							{!sameBillingAddress && (
								<>
									<div className="d-flex flex-column form-input-block">
										<label className="form-label" htmlFor="billing_city">
											City
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
											Street
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
												Street number
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
												Zipcode
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
									type="submit"
									onClick={onBack}
								>
									Back
								</Button>
								<Button style={{ width: "49%" }} className="form-button">
									Next
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
