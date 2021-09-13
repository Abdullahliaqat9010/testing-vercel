import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { notification } from "antd";

import HeaderContainer from "../../containers/Header";

import ArrowLink from "../../assets/images/arrow-blue.svg";
import LockIcon from "../../assets/images/lock-icon.svg";
import BackArrow from "../../assets/images/full-arrow.svg";

import { resetPassword } from "../../network-requests";
import { handleAlreadyAuthenticated } from "../../utils/handleAlreadyAuthenticated";

const ResetPasswordPage = () => {
	const { t } = useTranslation("login-page");
	const { t: t2 } = useTranslation("steps");
	const { t: t3 } = useTranslation("common");

	const router = useRouter();
	const { locale } = router;
	const { token } = router.query;

	const validationSchema = Yup.object().shape({
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
	});

	const onSubmit = (values) => {
		return new Promise(async (res, rej) => {
			try {
				await resetPassword(token, values?.password);
				notification.success({
					message: "Your password has been changed successfully",
				});
				router.push("/login");
				res("");
			} catch (error) {
				rej(error);
			}
		});
	};

	return (
		<div className="ResetPassword">
			<HeaderContainer title="Reset your password" />
			<div className="bg-image">
				<h1 className="h4">Reset password</h1>
			</div>
			<p className="desc">
				If you know your password please
				<Link href={"/login"} locale={locale}>
					<span className="link">
						{" "}
						go back to login <img src={ArrowLink} alt="ArrowLink" />
					</span>
				</Link>
			</p>
			<Formik
				initialValues={{ password: "", confirm_password: "" }}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="d-flex flex-column form-input-block">
							<label className="form-label" htmlFor="password">
								{t("label.password")}
							</label>
							<div
								style={{
									position: "relative",
								}}
							>
								<img
									style={{ position: "absolute", top: 15, left: 10 }}
									src={LockIcon}
									alt="LockIcon"
								/>
								<Field
									className="form-input"
									name="password"
									type="password"
									style={{ width: "100%" }}
									placeholder="Enter new password"
								/>
							</div>
							<ErrorMessage
								className="form-error"
								component="div"
								name="password"
							/>
						</div>
						<div
							style={{ marginTop: -15 }}
							className="d-flex flex-column form-input-block"
						>
							<label className="form-label" htmlFor="confirm_password">
								{t2("label.confirm-password")}
							</label>
							<div
								style={{
									position: "relative",
								}}
							>
								<img
									style={{ position: "absolute", top: 15, left: 10 }}
									src={LockIcon}
									alt="LockIcon"
								/>
								<Field
									className="form-input"
									name="confirm_password"
									type="password"
									style={{ width: "100%" }}
									placeholder="Confirm your password"
								/>
							</div>
							<ErrorMessage
								className="form-error"
								component="div"
								name="confirm_password"
							/>
						</div>
						<div style={{ marginTop: -10 }} className="group-btn">
							<Button type="submit" className="send-reminder">
								{isSubmitting ? t3("text.loading") : "Change Password"}
							</Button>
							<Link href="/" locale={locale}>
								<span>
									<img src={BackArrow} alt="BackArrow" />
									{t("button.back")}
								</span>
							</Link>
						</div>
					</Form>
				)}
			</Formik>
			<div className="short-footer d-flex justify-content-between">
				<p>
					<span>Immo Belgium </span>
					<span>{new Date().getFullYear()}. All Rights Reserved.</span>
				</p>
				<span className="link">
					<a href={"/" + locale + "/privacy-policy"} target="_blank">
						Politique de Confidentialité.
					</a>
				</span>
			</div>
		</div>
	);
};

export const getServerSideProps = handleAlreadyAuthenticated(
	async ({ locale }) => ({
		props: {
			...(await serverSideTranslations(locale, [
				"login-page",
				"header",
				"steps",
				"common",
			])),
		},
	})
);

export default ResetPasswordPage;
