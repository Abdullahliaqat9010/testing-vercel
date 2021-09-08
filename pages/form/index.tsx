import React from "react";
import {} from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Formik, Form } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";

const Formpage = () => {
	const { t } = useTranslation();
	return (
		<div>
			<HeaderContainer title={t("title")} />
			<div className="SettingsPage container">
				<NavBarContainer />
				<div className="SettingsPage__container w-100">
					<div className="first-block">
						<h1>{"Votre vitrine"}</h1>
						<div>
							{
								"Votre vitrine présente votre savoir-faire auprès de L'ensemble des visiteurs du site Meneur. Agen., acheteurs et vendeurs. Comp... un in.iinurn d'in.rrnations et nuit.% vos atts °lien. et biens vendus en avant pour mettre en valeur votre expertise."
							}
						</div>

						<Formik
							initialValues={{
								firstName: "",
								lastName: "",
								email: "",
							}}
							// validationSchema={SignupSchema}
							onSubmit={(values) => {
								console.log(values);
							}}
						>
							{({ errors, touched }) => (
								<Form>
									<div className="password-block">
										<h2>{"Photo d’en-tete"}</h2>
										<div>
											La photo de votre vitrine est un reflet de votre
											professionnaLisme. PersonnaLisez-la Le pLus rapidement
											possible avec une photo de votre agence (vitrine ou
											intérieur).
										</div>
										<div className="alert-block">
											<QuestionCircleFilled color={"#d3d3d3"} />
											<div className="text-block">
												Astuce: Pour un rendu optimal prenez une photo de votre
												agence avec votre smartphone en position horizontale. La
												dImension idêale de la photo est de 1135 pixels de
												largeur et 350 pl.. de hauteur.
											</div>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["steps", "header", "common"])),
		},
	};
};

export default Formpage;
