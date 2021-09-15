import React, { useEffect } from "react";
import { Upload, message } from "antd";
import {
	FacebookFilled,
	InstagramFilled,
	LinkedinFilled,
	TwitterCircleFilled,
	YoutubeFilled,
} from "@ant-design/icons";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HeaderContainer from "../../containers/Header";
import { useTranslation } from "react-i18next";
import NavBarContainer from "../../containers/NavBar";
import UploadImage from "../../assets/images/upload-img.svg";
import UploadPicture from "../../assets/images/upload-picture.svg";
import * as Yup from "yup";

const { Dragger } = Upload;

const socialIconsProps = { style: { fontSize: 38, color: "#8F99B4" } };

const socialLinks = [
	{
		id: "facebook",
		icon: <FacebookFilled {...socialIconsProps} />,
	},
	{
		id: "twitter",
		icon: <TwitterCircleFilled {...socialIconsProps} />,
	},
	{
		id: "instagram",
		icon: <InstagramFilled {...socialIconsProps} />,
	},
	{
		id: "linkedin",
		icon: <LinkedinFilled {...socialIconsProps} />,
	},
	{
		id: "youtube",
		icon: <YoutubeFilled {...socialIconsProps} />,
	},
];

const languages = [
	"Arabe",
	"Allemand",
	"Coreen",
	"Hebreu",
	"Portugais",
	"Anglais",
	"Chinois",
	"Espagnol",
	"Italien",
	"Russe",
];

const TagInput = ({ tags, setTags }) => {
	const [tagData, setTagData] = React.useState(tags);
	const removeTagData = (indexToRemove: number) => {
		setTagData([
			...tagData.filter((_: string, index: number) => index !== indexToRemove),
		]);
	};
	const addTagData = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== "") {
			setTagData([...tagData, event.target.value]);
			event.target.value = "";
		}
	};

	useEffect(() => {
		setTags(tagData);
	}, [tagData]);

	return (
		<div className="tag-input">
			<ul className="tags">
				{tagData.map((tag: string, index: number) => (
					<li key={index} className="tag">
						<span className="tag-title">{tag}</span>
						<span
							className="tag-close-icon"
							onClick={() => removeTagData(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>

			<input
				type="text"
				onKeyUp={(event: any) => {
					console.log(event.key);
					event.key === " " ? addTagData(event) : null;
				}}
			/>
		</div>
	);
};

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const Formpage = () => {
	const { t } = useTranslation();
	return (
		<div>
			<HeaderContainer title={t("title")} />
			<div className="AgencySettingsPage container d-flex">
				<NavBarContainer />

				<Formik
					initialValues={{
						social_links: {
							facebook: "",
							twitter: "",
							instagram: "",
							youtube: "",
							linkedin: "",
						},
						languages: {
							Arabe: false,
							Allemand: false,
							Coreen: false,
							Hebreu: false,
							Portugais: false,
							Anglais: false,
							Chinois: false,
							Espagnol: false,
							Italien: false,
							Russe: false,
						},
						notification_emails: [],
						logo_image: "https://via.placeholder.com/150",
						cover_image: "",
					}}
					// validationSchema={SignupSchema}
					onSubmit={(values) => {
						console.log(values);
					}}
				>
					{({ values, setFieldValue, submitForm }) => (
						<Form>
							<div className="AgencySettingsPage__container w-100">
								<div className="first-block">
									<h1>{"Votre vitrine"}</h1>
									<div>
										Votre vitrine présente votre savoir-faire auprès de
										L'ensemble des visiteurs du site Meneur. Agen., acheteurs et
										vendeurs. Comp... un in.iinurn d'in.rrnations et nuit.% vos
										atts °lien. et biens vendus en avant pour mettre en valeur
										votre expertise.
									</div>

									<div className="password-block2">
										<div className="d-flex flex-row justify-content-between pb-4">
											<div className="pr-3">
												<h2>{"Photo d’en-tete"}</h2>
												<div>
													La photo de votre vitrine est un reflet de votre
													professionnaLisme. PersonnaLisez-la Le pLus rapidement
													possible avec une photo de votre agence (vitrine ou
													intérieur).
												</div>
											</div>
											<div
												style={{ width: 160 }}
												className="d-flex flex-row-reverse"
											>
												<Upload
													className="logo_uploader"
													id="logo"
													beforeUpload={() => false}
													listType="picture-card"
													showUploadList={false}
													onChange={async ({ file }) => {
														const _base64 = await getBase64(file);
														setFieldValue("logo_image", _base64);
													}}
												>
													{/* <div></div> */}
													<img
														style={{
															objectFit: "cover",
															width: "100%",
															height: "100%",
														}}
														src={values.logo_image}
													/>
												</Upload>
											</div>
										</div>
										<div className="alert-block">
											<QuestionCircleFilled
												style={{ paddingTop: 5, paddingRight: 10 }}
												color={"#d3d3d3"}
											/>
											<div>
												Astuce: Pour un rendu optimal prenez une photo de votre
												agence avec votre smartphone en position horizontale. La
												dImension idêale de la photo est de 1135 pixels de
												largeur et 350 pl.. de hauteur.
											</div>
										</div>
										<div className="w-100">
											<Upload
												className="cover_uploader"
												listType="picture-card"
												showUploadList={false}
											>
												{/* <div></div> */}
												Upload
											</Upload>
										</div>
										<div className="password-block2 pb-0">
											<h2>Socials</h2>
											{socialLinks.map(({ icon, id }) => (
												<div key={id} className="social-container">
													{icon}
													<div className="ml-4 w-100">
														<Field
															className="form-input w-100 h-auto"
															type="text"
															name={`social_links.${id}`}
															placeholder={`https://${id}.com/yourcompany`}
														/>
													</div>
												</div>
											))}
										</div>
										<div className="password-block2">
											<h2>Languages</h2>
											<div className="pb-3 small">
												Please select any that apply.
											</div>
											<div
												role="group"
												aria-labelledby="checkbox-group"
												style={{ width: "100%" }}
											>
												<div className="d-flex flex-row align-items-center flex-wrap">
													{languages.map((language) => (
														<div
															key={language}
															className="w-50 my-2 d-flex flex-row justify-content-start align-items-center"
														>
															<Field
																type="checkbox"
																name={`languages.${language}`}
															/>
															<label className="ml-3 mb-0" htmlFor={language}>
																{language}
															</label>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="password-block2">
											<h2>Email notifications</h2>
											<div style={{ fontSize: 14 }} className="pb-1 pt-3">
												Enter email you’d like to receive system notifications
											</div>
											<TagInput
												tags={values.notification_emails}
												setTags={(tags) => {
													setFieldValue("notification_emails", tags);
												}}
											/>
										</div>
										<div className="button-container">
											<div className="button-container2">
												<button
													className="save-button"
													type="button"
													onClick={() => submitForm()}
												>
													Save Changes
												</button>
											</div>
											<div className="button-container2">
												<button className="view-my-agency" onClick={() => {}}>
													Visualise my agency
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
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
