import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { setUserProfile } from "../../actions";
import HeaderContainer from "../../containers/Header";

import { handleAlreadyAuthenticated } from "../../utils/handleAlreadyAuthenticated";
import { getAgencyProfile, login } from "../../network-requests";

import ArrowLink from "../../assets/images/arrow-blue.svg";
import MailIcon from "../../assets/images/mail-icon.svg";
import LockIcon from "../../assets/images/lock-icon.svg";
import { password_regrex } from "../../constants";

const LoginPage = () => {
	const { t } = useTranslation("login-page");

	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;

	const validationSchema = Yup.object().shape({
		email: Yup.string().email(t("p.invalid-email")).required(t("p.required")),
		password: Yup.string().required(t("p.required")).matches(
			password_regrex.expression,
			t("label.password-message")
			// "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
		),
	});

	const handleLogin = ({ email, password }, actions) => {
		return new Promise(async (res, rej) => {
			try {
				const userProfile = await login(email, password);
				dispatch(
					setUserProfile({
						...userProfile,
					})
				);
				res("");
				if (userProfile.account_type === "agent") {
					const agency = await getAgencyProfile(locale);
					if (agency) {
						router.push("/properties");
					} else {
						router.push("register");
					}
				} else {
					router.push("/dashboard");
				}
			} catch (error) {
				actions.setErrors({
					password: t("error.message"),
				});
				rej(error);
			}
		});
	};

	const handleRegister = () => {
		router.push("/estimate");
	};

	return (
		<div className="Login">
			<HeaderContainer title={t("title")} />
			<div className="bg-image">
				<h1 className="h4">{t("title.login")}</h1>
			</div>
			<p className="desc">
				{t("desc.dont-have-account")}
				<span className="link" onClick={handleRegister}>
					{" "}
					{t("desc.create-here-link")} <img src={ArrowLink} alt="ArrowLink" />
				</span>
			</p>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={handleLogin}
				validationSchema={validationSchema}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="d-flex flex-column form-input-block">
							<label className="form-label" htmlFor="email">
								{t("label.email-phone")}
							</label>
							<div
								style={{
									position: "relative",
								}}
							>
								<img
									style={{ position: "absolute", top: 15, left: 10 }}
									src={MailIcon}
									alt="MailIcon"
								/>
								<Field
									className="form-input"
									name="email"
									type="email"
									placeholder={t("placeholder.email-phone")}
									style={{ width: "100%" }}
								/>
							</div>
							<ErrorMessage
								className="form-error"
								component="div"
								name="email"
							/>
						</div>
						<div
							style={{ marginTop: -15 }}
							className="d-flex flex-column form-input-block"
						>
							<label className="form-label" htmlFor="password">
								{t("placeholder.password")}
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
									className="form-input form-input-error"
									name="password"
									type="password"
									placeholder={t("placeholder.password")}
									style={{ width: "100%" }}
								/>
							</div>
							<ErrorMessage
								className="form-error"
								component="div"
								name="password"
							/>
						</div>
						<div
							onClick={() => router.push("/forgot-password")}
							className="form-remind-button"
						>
							{t("link.remind-password")}
						</div>
						<Button className="form-button mt-5" block type="submit">
							{isSubmitting ? t("button.loading") : t("button.login")}
						</Button>
					</Form>
				)}
			</Formik>
			<div className="short-footer d-flex justify-content-between">
				<p>
					<span>Immo Belgium </span>
					<span>
						{new Date().getFullYear()}. {t("footer.copyright")}.
					</span>
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
	async ({ locale }) => {
		return {
			props: {
				...(await serverSideTranslations(locale, ["login-page", "header"])),
			},
		};
	}
);

// export const getServerSideProps = async ({ locale }) => {
// 	console.log("testing12");
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, ["login-page", "header"])),
// 		},
// 	};
// };

export default LoginPage;
