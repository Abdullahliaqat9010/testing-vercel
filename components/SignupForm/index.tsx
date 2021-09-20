import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const SignupForm = ({
	onRegister,
	accountType = "personal",
	showTitle = true,
	onBack = null,
}) => {
	const { t } = useTranslation("steps");

	const router = useRouter();
	const { locale } = router;

	const linkProps = {
		target: "_blank",
		locale,
	};

	const checkForDuplicateEmail = (email: string): Promise<boolean> => {
		return new Promise(async (res, rej) => {
			try {
				const { data: exists } = await axios.get(`users/${email}/exist`);
				res(!exists);
			} catch (error) {
				rej(error);
			}
		});
	};

	const validationSchema = Yup.object().shape({
		firstname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),
		lastname: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),
		email: Yup.string()
			.email("Invalid email")
			.required("Required")
			.test(
				"checkForDuplicate",
				"email already exists",
				checkForDuplicateEmail
			),
		phone_number: Yup.string().optional(),
		password: Yup.string()
			.required("Required")
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
		confirm_password: Yup.string().test(
			"passwords-match",
			"Passwords must match",
			function (value) {
				return this.parent.password === value;
			}
		),
		t_c: Yup.bool().oneOf(
			[true],
			"You must accept Privacy Policy and Terms & Conditions"
		),
	});

	return (
		<div className="form-container">
			{showTitle && (
				<div className="form-title-container">
					<p className="form-title">Create {accountType} account</p>
					<p className="form-subtitle">
						Benefit from using ImmoBelgium for your agency
					</p>
				</div>
			)}
			<div>
				<Formik
					initialValues={{
						firstname: "",
						lastname: "",
						email: "",
						phone_number: "",
						password: "",
						confirm_password: "",
						t_c: false,
						promo_mailing: false,
					}}
					onSubmit={onRegister}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<div className="d-flex flex-row justify-content-between">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="firstname">
										{t("label.first-name")}
									</label>
									<Field
										className="form-input form-input-error"
										name="firstname"
										type="text"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="firstname"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="lastname">
										{t("label.last-name")}
									</label>
									<Field className="form-input" name="lastname" type="text" />
									<ErrorMessage
										className="form-error"
										component="div"
										name="lastname"
									/>
								</div>
							</div>
							<div className="d-flex flex-column form-input-block">
								<label className="form-label" htmlFor="phone_number">
									{`${t("label.phone")} (${t("title.optional")})`}
								</label>
								<Field className="form-input" name="phone_number" type="text" />
								<ErrorMessage
									className="form-error"
									component="div"
									name="phone_number"
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
							<div className="d-flex flex-row justify-content-between">
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="password">
										{t("label.password")}
									</label>
									<Field
										className="form-input form-input-error"
										name="password"
										type="password"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="password"
									/>
								</div>
								<div
									style={{ width: "49%" }}
									className="d-flex flex-column form-input-block"
								>
									<label className="form-label" htmlFor="confirm_password">
										{t("label.confirm-password")}
									</label>
									<Field
										className="form-input"
										name="confirm_password"
										type="password"
									/>
									<ErrorMessage
										className="form-error"
										component="div"
										name="confirm_password"
									/>
								</div>
							</div>
							<div className="form-password-disclaimer">
								{t("desc.strongly-recommend")}
							</div>
							<div className="d-flex flex-row mt-4">
								<Field
									name="promo_mailing"
									type="checkbox"
									className="mr-2 mt-1"
								/>
								<label className="label-terms-condition">
									{t("label.promotions")}
								</label>
							</div>
							<div className="d-flex flex-row mt-1">
								<Field name="t_c" type="checkbox" className="mr-2 mt-1" />
								<label className="label-terms-condition">
									{t("label.read-privacy")}
									<a href={"/privacy-policy"} {...linkProps}>
										{t("label.privacy")}
									</a>
									{t("label.and")}
									<a href={"/terms-and-condition"} {...linkProps}>
										{t("label.terms")}
									</a>
								</label>
							</div>
							<div style={{ marginTop: -10 }}>
								<ErrorMessage
									className="form-error"
									component="div"
									name="t_c"
								/>
							</div>
							<div className="my-4">
								{onBack ? (
									<div className="d-flex flex-row justify-content-between align-items-center">
										<Button
											style={{ width: "49%" }}
											className="form-back-button"
											block
											onClick={onBack}
										>
											{t("button.back")}
										</Button>
										<Button
											style={{ width: "49%" }}
											className="form-button"
											block
											type="submit"
										>
											{isSubmitting
												? `${t("button.loading")}...`
												: t("button.create-account")}
										</Button>
									</div>
								) : (
									<Button className="form-button" block type="submit">
										{isSubmitting
											? `${t("button.loading")}...`
											: t("button.create-account")}
									</Button>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignupForm;
