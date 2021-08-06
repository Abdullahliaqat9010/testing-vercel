import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import axios from "axios";
import { config } from "../../config/siteConfigs";
import dynamic from "next/dynamic";
import { Editor as _Editor } from "react-draft-wysiwyg";
import HeaderContainer from "../../containers/Header";
import { EditorState, convertFromRaw } from "draft-js";

const Editor = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor);
	},
	{ ssr: false }
) as typeof _Editor;

const Blog = ({ blog }) => {
	const { t } = useTranslation("login-page");

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<div
				style={{
					height: 240,
					backgroundColor: "#1d2e5b",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h1
					style={{
						color: "white",
						textAlign: "center",
						fontWeight: "bold",
						width: "70%",
					}}
				>
					{blog.title}
				</h1>
			</div>
			<div
				style={{
					paddingTop: 20,
					paddingLeft: 50,
					paddingRight: 50,
					paddingBottom: 20,
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Editor
					readOnly
					toolbarHidden
					wrapperStyle={{ width: "60%" }}
					editorState={EditorState.createWithContent(
						convertFromRaw(JSON.parse(blog.content || "{}"))
					)}
					onChange={() => null}
				/>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	const { data } = await axios.get(`${config.apiDomain}/blogs/${params.id}`);
	return {
		props: {
			blog: {
				...data,
			},
			...(await serverSideTranslations(locale, ["login-page", "header"])),
		}, // will be passed to the page component as props
	};
};

export default Blog;
