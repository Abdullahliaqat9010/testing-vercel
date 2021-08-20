import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import HeaderContainer from "../../containers/Header";
import { BlogEditor as _Editor } from "../../components/Editor";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

const Editor = dynamic(
	() => {
		return import("../../components/Editor").then((mod) => mod.BlogEditor);
	},
	{ ssr: false }
) as typeof _Editor;

const CreateBlog = () => {
	const { t } = useTranslation("blog");
	const [title, setTitle] = useState<string>("");
	const [isSavingBlog, setIsSavingBlog] = useState(false);
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);
	const [cover, setCover] = useState(null);

	const router = useRouter();

	const handleCreateBlog = async () => {
		try {
			setIsSavingBlog(true);
			await axios.post(
				`/blogs`,
				{
					title,
					content: JSON.stringify(
						convertToRaw(editorState.getCurrentContent())
					),
					text: editorState.getCurrentContent().getPlainText("\u0001"),
					cover_image: cover,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token"),
					},
				}
			);
			router.replace("/blogs");
		} catch (error) {
			console.log(error);
		} finally {
			setIsSavingBlog(false);
		}
	};

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<Editor
				editorState={editorState}
				setEditorState={setEditorState}
				title={title}
				setTitle={setTitle}
				cover={cover}
				setCover={setCover}
				buttonFooter={
					<div style={{ marginTop: 20, marginBottom: 20 }}>
						<Button
							disabled={title.length === 0 || isSavingBlog || !cover}
							style={{ padding: "10px 30px", borderRadius: "8px" }}
							onClick={handleCreateBlog}
						>
							{isSavingBlog ? "Saving..." : t("btn.save-blog")}
						</Button>
					</div>
				}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	req,
}) => {
	if (req.cookies?.access_token) {
		const parsedAccessToken = jwt.decode(req.cookies?.access_token) as {
			account_type: string;
		};
		const isAdmin = parsedAccessToken.account_type === "admin";
		if (!isAdmin) {
			return {
				notFound: true,
			};
		}
	} else {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...(await serverSideTranslations(locale, [
				"login-page",
				"header",
				"blog",
			])),
		},
	};
};

export default CreateBlog;
