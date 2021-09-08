import React from "react";
import { Upload, message } from "antd";
import { FacebookFilled, InboxOutlined } from "@ant-design/icons";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";

const { Dragger } = Upload;

const Formpage = () => {
	const draggerProps = {
		name: "file",
		multiple: true,

		onChange: (info) => {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop: (e) => {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

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
								facebookUrl: "",
								instagramUrl: "",
								twitterUrl: "",
								linkedinUrl: "",
								youtubeUrl: "",
							}}
							// validationSchema={SignupSchema}
							onSubmit={(values) => {
								console.log(values);
							}}
						>
							{({ errors, touched, values }) => (
								<Form>
									<div className="password-block2">
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
										<Dragger {...draggerProps}>
											<div className="Dragger">
												<div className="child-Dragger">
													<p className="ant-upload-drag-icon">
														<InboxOutlined
															style={{
																fontSize: 50,
															}}
														/>
													</p>
													<p className="ant-upload-text">
														Click or drag file to this area to upload
													</p>
													<p className="ant-upload-hint">
														Support for a single or bulk upload. Strictly
														prohibit from uploading company data or other band
														files
													</p>
												</div>
											</div>
										</Dragger>
										<div className="password-block2">
											<h2>Socials</h2>
											<div className="social-container">
												<FacebookFilled style={{ fontSize: 35 }} />

												<Field
													className="input-field"
													type="url"
													name="facebookUrl"
													placeholder={
														values?.facebookUrl
															? values?.facebookUrl
															: "https://facebook.com/yourcompany"
													}
												/>
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
