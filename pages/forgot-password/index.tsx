import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";

import RemindPasswordModal from "../../containers/Modals/RemindPasswordModal";
import HeaderContainer from "../../containers/Header";

import ArrowLink from "../../assets/images/arrow-blue.svg";
import MailIcon from "../../assets/images/mail-icon.svg";
import BackArrow from "../../assets/images/full-arrow.svg";

import { remindPasswordAction } from "../../actions";

const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const ForgotPasswordPage = () => {
	const { t } = useTranslation("login-page");
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const router = useRouter();
	const dispatch = useDispatch();
	const { locale } = router;

	const handleChangeData = (el: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(el.target.value.trim());
	};

	const handleSendData = (event) => {
		event.preventDefault();
		if (emailRegex.test(email)) {
			setIsValidEmail(true);
			dispatch(remindPasswordAction(email, locale));
		} else {
			setIsValidEmail(false);
		}
		// if (userData.length) {
		//   dispatch(remindPasswordAction(userData, locale));
		// }
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
			<Form noValidate onSubmit={handleSendData}>
				<Form.Group controlId="email-or-phone">
					<Form.Label>{t("label.email-phone")}</Form.Label>
					<img src={MailIcon} alt="MailIcon" />
					<Form.Control
						required
						type="email"
						name="email"
						value={email}
						isInvalid={!isValidEmail}
						onChange={handleChangeData}
						placeholder={t("placeholder.email-phone")}
					/>
					<Form.Control.Feedback type="invalid">
						Please enter a valid email address
					</Form.Control.Feedback>
				</Form.Group>
				<div className="group-btn">
					<Button
						type="submit"
						className="send-reminder"
						// onClick={handleSendData}
					>
						Send a reminder
					</Button>
					<Link href="/" locale={locale}>
						<span>
							<img src={BackArrow} alt="BackArrow" />
							{t("button.back")}
						</span>
					</Link>
				</div>
			</Form>
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

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["login-page", "header"])),
	},
});

export default ForgotPasswordPage;
