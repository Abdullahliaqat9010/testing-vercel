import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";

const AgencyInfo = ({ onSubmit }) => {
	const validationSchema = Yup.object().shape({
		vitrine_name: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		street: Yup.string().required("Required"),
		street_number: Yup.number().required("Required"),
		zip: Yup.number().required("Required").min(1000).max(9999),
	});

	return (
		<div className="form-container">
			<div className="form-title-container">
				<p className="form-title">Tell us about agency</p>
				<p className="form-subtitle">
					You will be able to customize agency profile from your dashboard.
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
									Name of the vitrine
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
									City
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
									Street
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
										Street Number
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
										Zipcode
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
								Next
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AgencyInfo;
