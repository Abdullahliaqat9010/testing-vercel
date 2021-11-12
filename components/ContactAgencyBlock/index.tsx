import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import { contactAgency } from "../../network-requests";
import { RootState } from "../../types/state";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useRouter } from "next/router";

const ContactAgencyBlock = ({ agencyInfo, properties }) => {
	const { t } = useTranslation("dashboard-page");
	const { t: t2 } = useTranslation("common");
	const dispatch = useDispatch();
	const router = useRouter();

	const { firstname, lastname, email, phone_number, auth } = useSelector(
		(state: RootState) => state.userInfo
	);

	console.log(agencyInfo, "agencyInfo");

	const validationSchema = Yup.object().shape({
		fullname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required(t("p.required")),
		email: Yup.string().email("p.invalid-email").required(t("p.required")),
		phone: Yup.string().required(t("p.required")),
		message: Yup.string().required(t("p.required")),
		free_evaluated: Yup.bool(),
	});

	const sendToAgency = (contactInfo, actions) => {
		return new Promise(async (res, rej) => {
			try {
				await contactAgency(
					{
						...contactInfo,
						agencyId: agencyInfo?.id,
					},
					router.locale
				);
				actions?.resetForm();
				notification.success({
					placement: "bottomRight",
					message: "Success",
					description: `Successfully contacted the agency ${agencyInfo?.company_name} for the your property`,
				});
				res("");
				// setIsSuccessModalVisible(true);
			} catch (error) {
				rej(error);
			}
		});
	};

	return (
		<div className="contact-agency-block contact-aagency ">
			<div className="contact-agency">
				<h4>{t("title.contact-agency")}</h4>
				<p>{agencyInfo?.agency?.company_name ?? ""}</p>
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
								<Field
									disabled
									className="form-input"
									name="fullname"
									type="text"
								/>
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
								<Field className="form-input" name="phone" type="text" />
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
								<Field
									disabled
									className="form-input"
									name="email"
									type="email"
								/>
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
							{auth && (
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
												{property?.property?.search_address}
											</option>
										))}
									</Field>
									<ErrorMessage
										className="form-error"
										component="div"
										name="propertyId"
									/>
								</div>
							)}

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
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ContactAgencyBlock;
