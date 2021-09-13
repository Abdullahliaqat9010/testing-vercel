import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { notification } from "antd";

import RemindPasswordModal from "../../containers/Modals/RemindPasswordModal";
import HeaderContainer from "../../containers/Header";

import ArrowLink from "../../assets/images/arrow-blue.svg";
import MailIcon from "../../assets/images/mail-icon.svg";
import BackArrow from "../../assets/images/full-arrow.svg";

import { recoverPassword } from "../../network-requests";
import { handleAlreadyAuthenticated } from "../../utils/handleAlreadyAuthenticated";

const ForgotPasswordPage = () => {
	const { t } = useTranslation("login-page");
	const { t: t2 } = useTranslation("common");
	const router = useRouter();
	const { locale } = router;

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required"),
	});

	const onSubmit = (values) => {
		return new Promise(async (res, rej) => {
			try {
				await recoverPassword(values?.email, locale);
				notification.success({
					message:
						"We have sent instructions to your mailbox with the following steps, please check it.",
				});
				res("");
			} catch (error) {
				rej(error);
			}
		});
	};

	return (
		<div className="ForgotPassword">
			<RemindPasswordModal />
			<HeaderContainer title="Remind password" />
			<div className="bg-image">
				<h1 className="h4">Remind password</h1>
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
				initialValues={{ email: "" }}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
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
						<div style={{ marginTop: -15 }} className="group-btn">
							<Button type="submit" className="send-reminder">
								{isSubmitting ? t2("text.loading") : "Send a reminder"}
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
				"common",
			])),
		},
	})
);

export default ForgotPasswordPage;
