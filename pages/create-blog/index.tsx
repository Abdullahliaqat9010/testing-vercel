import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor as _Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { config } from "../../config/siteConfigs";

import HeaderContainer from "../../containers/Header";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const Editor = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor);
	},
	{ ssr: false }
) as typeof _Editor;

const CreateBlog = () => {
	const { t } = useTranslation("login-page");
	const [title, setTitle] = useState<string>("");
	const [isSavingBlog, setIsSavingBlog] = useState(false);
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);

	const router = useRouter();

	const handleCreateBlog = async () => {
		try {
			setIsSavingBlog(true);
			await axios.post(`${config.apiDomain}/blogs`, {
				title,
				content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
				text: editorState.getCurrentContent().getPlainText("\u0001"),
				cover_image: "",
			});
			router.replace("/blogs");
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingBlog(false);
		}
	};

	const handleImageUpload = (image) => {
		return new Promise((res, rej) => {
			try {
				//axios.post()
				res({
					data: {
						link: "https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?size=626&ext=jpg",
					},
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	return (
		<div style={{ height: "100vh" }}>
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
				<textarea
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add Title Here"
					maxLength={100}
					style={{
						textAlign: "center",
						color: "white",
						fontSize: 35,
						background: "transparent",
						borderStyle: "none",
						border: "none",
						width: "70%",
						resize: "none",
						overflow: "hidden",
						fontWeight: "bold",
						outline: "none",
					}}
				/>
			</div>
			<div
				style={{
					minHeight: "calc(100vh - 267px)",
					//backgroundColor: "red",
					paddingTop: 20,
					paddingLeft: 50,
					paddingRight: 50,
					paddingBottom: 20,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Editor
					placeholder="Start writing here"
					editorState={editorState}
					onEditorStateChange={(e) => {
						setEditorState(e);
					}}
					wrapperStyle={{
						border: "1px solid rgb(200,200,200)",
						backgroundColor: "white",
						borderRadius: 8,
						width: "70%",
					}}
					editorStyle={{ padding: 20 }}
					toolbar={{
						image: {
							uploadEnabled: true,
							uploadCallback: handleImageUpload,
						},
					}}
				/>

				<Button
					disabled={title.length === 0 || isSavingBlog}
					style={{ float: "right", margin: "20px 0px", padding: "10px 30px" }}
					onClick={handleCreateBlog}
				>
					{isSavingBlog ? "Saving..." : "Save"}
				</Button>
			</div>
		</div>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ["login-page", "header"])),
	},
});

export default CreateBlog;
