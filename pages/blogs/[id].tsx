import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import axios from "axios";
import { config } from "../../config/siteConfigs";
import dynamic from "next/dynamic";
import { Editor as _Editor } from "react-draft-wysiwyg";
import HeaderContainer from "../../containers/Header";
import { EditorState, convertFromRaw } from "draft-js";
import Footer from "../../containers/Footer";
import { Form, Row, Col, Button } from "react-bootstrap";
import moment from "moment";

const AddCommentForm = ({ blog_id, onCommentAdded }) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const [isAddingComment, setIsAddingComment] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsAddingComment(true);
			await axios.post(`${config.apiDomain}/blog-comments`, {
				name,
				email,
				comment,
				blog_id,
			});
			onCommentAdded({
				name,
				email,
				comment,
				blog_id,
			});
			setName("");
			setComment("");
			setEmail("");
		} catch (error) {
			console.log(error);
		} finally {
			setIsAddingComment(false);
		}
	};

	return (
		<div
			style={{
				padding: 30,
				backgroundColor: "white",
				borderRadius: 8,
				marginTop: 20,
			}}
		>
			<p style={{ color: "#6c768f", fontWeight: "bold", fontSize: 24 }}>
				Leave a comment
			</p>
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb-3">
					<Form.Control
						style={{ resize: "none", borderRadius: 8 }}
						placeholder="Comment"
						required
						as="textarea"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						rows={5}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Row className="g-2">
						<Col style={{ paddingRight: 4 }}>
							<Form.Control
								style={{ borderRadius: 8 }}
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</Col>
						<Col style={{ paddingLeft: 4 }}>
							<Form.Control
								style={{ borderRadius: 8 }}
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Col>
					</Row>
				</Form.Group>
				<Button
					disabled={
						name.length === 0 ||
						email.length === 0 ||
						comment.length === 0 ||
						isAddingComment
					}
					style={{ width: "100%", padding: 10 }}
					type="submit"
				>
					{isAddingComment ? "Loading..." : "Submit comment"}
				</Button>
			</Form>
		</div>
	);
};

const Comment = ({ comment }) => {
	return (
		<div
			style={{
				backgroundColor: "white",
				width: "100%",
				display: "flex",
				flexDirection: "row",
				padding: 15,
				marginTop: 15,
				borderRadius: 5,
			}}
		>
			<img
				src={"https://picsum.photos/200"}
				style={{ width: 40, height: 40, borderRadius: 20 }}
			/>
			<div style={{ width: "100%" }}>
				<div
					style={{
						flexDirection: "row",
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						paddingLeft: 20,
					}}
				>
					<div style={{ color: "#6c768f", fontWeight: "bold" }}>
						{comment?.name}
					</div>
					<div style={{ color: "#8f99b4", fontSize: 14 }}>
						{moment(comment?.createdAt).fromNow()}
					</div>
				</div>
				<div style={{ padding: "10px 20px", width: "100%" }}>
					<p>{comment?.comment}</p>
				</div>
			</div>
		</div>
	);
};

const Comments = ({ comments, setComments, blog_id }) => {
	return (
		<div
			style={{
				backgroundColor: "#f2f6ff",
				//height: 200,
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				paddingBottom: 30,
			}}
		>
			<div className="comments-container">
				<div style={{ width: "100%", paddingTop: 20 }}>
					<p>
						<span style={{ color: "#3871ef", fontSize: 25, paddingRight: 10 }}>
							{" "}
							{comments?.length}
						</span>{" "}
						{`Comment${comments.length === 1 ? "" : "s"}`}
					</p>
				</div>
				<div style={{ width: "100%" }}>
					{comments.map((comment) => {
						return <Comment comment={comment} key={comment?.id} />;
					})}
					<div
						style={{
							width: "100%",
							border: "1px solid #e1eafc",
							height: 1,
							margin: "40px 0px",
						}}
					/>
					<AddCommentForm
						blog_id={blog_id}
						onCommentAdded={(newComment) => {
							setComments([...comments, newComment]);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const Editor = dynamic(
	() => {
		return import("react-draft-wysiwyg").then((mod) => mod.Editor);
	},
	{ ssr: false }
) as typeof _Editor;

const Blog = ({ blog, comments: _comments }) => {
	const { t } = useTranslation("login-page");
	const [comments, setComments] = useState([..._comments]);
	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<div
				style={{
					height: 240,
					backgroundColor: "#1d2e5b",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<h1 className="blog-title">{blog.title}</h1>
			</div>
			<div
				style={{
					paddingTop: 20,
					paddingBottom: 20,
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<img className="blog-cover" src={blog.cover_image} alt="cover" />

				<Editor
					readOnly
					toolbarHidden
					wrapperClassName="blog-editor-container"
					editorState={EditorState.createWithContent(
						convertFromRaw(JSON.parse(blog.content || "{}"))
					)}
					onChange={() => null}
				/>
			</div>
			<Comments
				blog_id={blog?.id}
				comments={comments}
				setComments={setComments}
			/>
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	const { data: blog } = await axios.get(
		`${config.apiDomain}/blogs/${params.id}`
	);
	const { data: comments } = await axios.get(
		`${config.apiDomain}/blog-comments`,
		{
			params: {
				blog_id: params?.id,
			},
		}
	);
	return {
		props: {
			blog: {
				...blog,
			},
			comments: [...comments],
			...(await serverSideTranslations(locale, ["login-page", "header"])),
		}, // will be passed to the page component as props
	};
};

export default Blog;
