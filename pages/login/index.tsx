import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { RootState } from "../../types/state";
import { userLoginAction } from "../../actions";

import HeaderContainer from "../../containers/Header";

import ArrowLink from "../../assets/images/arrow-blue.svg";
import MailIcon from "../../assets/images/mail-icon.svg";
import LockIcon from "../../assets/images/lock-icon.svg";
import BackArrow from "../../assets/images/full-arrow.svg";

const LoginPage = () => {
	const { t } = useTranslation("login-page");

	const dispatch = useDispatch();
	const router = useRouter();
	const { locale } = router;

	const { auth, errors } = useSelector((state: RootState) => state.userInfo);
	const [data, setData] = useState({ userData: "", password: "" });
	const [errorsData, setErrors] = useState({
		noValid: false,
		userData: "this field is required",
		password: "this field is required",
	});

	useEffect(() => {
		if (auth) {
			router.push(`${locale}/dashboard`);
		}
	}, [auth]);

	useEffect(() => {
		// if (auth) {
		// 	window.location.href = "dashboard";
		// }

		if (errors.length) {
			setData({ ...data, password: "" });
			setErrors({ ...errorsData, noValid: true, password: errors });
		}
	}, [errors, errorsData.noValid]);

	const handleChangeData = (el: React.ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			[el.target.name]: el.target.value.trim(),
		});
	};

	const handleLogin = (event) => {
		event.preventDefault();
		if (data.userData.length === 0 || data.password.length === 0) {
			setErrors({ ...errorsData, noValid: true });
		}

		if (data.userData.length && data.password.length) {
			setErrors({ noValid: false, userData: "", password: "" });
			dispatch(userLoginAction(data));
		}
	};

	const handleRegister = () => {
		window.sessionStorage.setItem(
			"modify",
			JSON.stringify({ mainBlocks: true })
		);
		router.push("/", "/", { locale });
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
			<Form noValidate validated={errorsData.noValid}>
				<Form.Group controlId="email-or-phone">
					<Form.Label>{t("label.email-phone")}</Form.Label>
					<img src={MailIcon} alt="MailIcon" />
					<Form.Control
						onChange={handleChangeData}
						required
						value={data.userData}
						name="userData"
						type="text"
						placeholder={t("placeholder.email-phone")}
					/>
					<Form.Control.Feedback type="invalid">
						{errorsData.userData}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>{t("label.password")}</Form.Label>
					<img src={LockIcon} alt="LockIcon" />
					<Form.Control
						onChange={handleChangeData}
						value={data.password}
						required
						name="password"
						type="password"
						placeholder={t("placeholder.password")}
					/>
					<Form.Control.Feedback type="invalid">
						{errorsData.password}
					</Form.Control.Feedback>
				</Form.Group>
				<Link href={"/forgot-password"} locale={locale}>
					<span className="link">{t("link.remind-password")}</span>
				</Link>
				<div className="group-btn">
					<Button type="submit" onClick={handleLogin}>
						{t("button.login")}
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

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["login-page", "header"])),
	},
});

export default LoginPage;
