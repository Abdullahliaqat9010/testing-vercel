import React, { useState, useEffect } from "react";
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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "antd/dist/antd.css";
import { Affix } from "antd";
import estimateCover from "../../assets/images/blog/estimationCardCover.png";
import { useRouter } from "next/router";

const EstimationCard = ({ onMinimize }) => {
	const router = useRouter();
	return (
		<div className="estimation-card">
			<div
				style={{
					width: "100%",
					height: 150,
					backgroundColor: "#6c768f",
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<img
					src={estimateCover}
					style={{
						borderRadius: 8,
						height: "auto",
						width: "50%",
						marginTop: -50,
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<text
					style={{
						fontSize: 20,
						fontFamily: `"Nunito Sans", sans-serif`,
						fontWeight: 700,
						paddingTop: 20,
					}}
				>
					Do you want
				</text>
				<text
					style={{
						fontSize: 20,
						fontFamily: `"Nunito Sans", sans-serif`,
						fontWeight: 700,
						color: "#3871EF",
					}}
				>
					Your Property Estimated?
				</text>
				<text
					style={{
						fontSize: 16,
						fontFamily: `"Nunito Sans", sans-serif`,
						fontWeight: 400,
						color: "#6C768F",
						paddingTop: 10,
						textAlign: "center",
						width: "80%",
					}}
				>
					Hi, I’m Matteo. I’m Real Estate analyst and I have a property report
					ready for you. Where should I send it?
				</text>
				<Button
					style={{ padding: "10px 20px", borderRadius: 8, marginTop: 20 }}
					onClick={() => router.push("/")}
				>
					Estimate Property
				</Button>
				<Button
					style={{
						padding: 15,
						borderRadius: 8,
						color: "#3871EF",
						backgroundColor: "transparent",
						border: "none",
						outline: "none",
					}}
					onClick={onMinimize}
				>
					Minimize
				</Button>
			</div>
		</div>
	);
};

const EstimationOnScreenCard = ({ visible = false, onMinimize }) => {
	return (
		<div
			style={{ display: visible ? "flex" : "none" }}
			className="estimation-onscreen-card-container"
		>
			<EstimationCard onMinimize={onMinimize} />
		</div>
	);
};

const EstimationSideCard = () => {
	return (
		<Affix
			className="estimation-side-card-container"
			offsetTop={window.innerHeight / 2 - 200}
		>
			<EstimationCard onMinimize={() => null} />
		</Affix>
	);
};

const AddCommentForm = ({ blog_id, onCommentAdded }) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const [isAddingComment, setIsAddingComment] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsAddingComment(true);
			await axios.post(`/blog-comments`, {
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
	const [isOnscreenEstimateCardVisible, setIsOnscreenEstimateCardVisible] =
		useState(false);
	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<EstimationSideCard />
			<EstimationOnScreenCard
				visible={isOnscreenEstimateCardVisible}
				onMinimize={() => setIsOnscreenEstimateCardVisible(false)}
			/>
			{!isOnscreenEstimateCardVisible && (
				<Button
					className="estimation-onscreen-btn"
					onClick={() => setIsOnscreenEstimateCardVisible(true)}
				>
					<text style={{ fontSize: 20 }}>
						<span style={{ color: "#FE7F2D" }}>Click</span> to get special
						offers!
					</text>
				</Button>
			)}
			<div
				style={{
					backgroundColor: "#1d2e5b",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<div className="blog-header-container">
					<h1 className="blog-title">{blog.title}</h1>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							padding: "35px 0px",
						}}
					>
						<img
							src={"https://picsum.photos/200"}
							style={{
								width: 40,
								height: 40,
								borderRadius: 20,
								marginRight: 20,
							}}
						/>
						<text style={{ color: "white", fontSize: 14 }}>
							By Belgium Immo . Updated{" "}
							<span>{moment(blog?.updatedAt).format("MMM[.] DD[,] YYYY")}</span>{" "}
						</text>
					</div>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					position: "relative",
					backgroundColor: "transparent",
					marginTop: -5,
				}}
			>
				<div
					style={{
						height: "50%",
						width: "100%",
						position: "absolute",
						backgroundColor: "#1d2e5b",
					}}
				/>
				<div style={{ zIndex: 2 }} className="blog-cover-container">
					<img className="blog-cover" src={blog.cover_image} alt="cover" />
				</div>
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
	res,
}) => {
	try {
		const { data: blog } = await axios.get(`/blogs/${params.id}`);
		if (!blog) {
			return {
				notFound: true,
			};
		}
		const { data: comments } = await axios.get(`/blog-comments`, {
			params: {
				blog_id: params?.id,
			},
		});
		return {
			props: {
				blog: {
					...blog,
				},
				comments: [...comments],
				...(await serverSideTranslations(locale, ["login-page", "header"])),
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default Blog;
