import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import axios from "axios";
import HeaderContainer from "../../containers/Header";
import { config } from "../../config/siteConfigs";
import bg from "../../assets/images/blog/blogs_cover.png";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { parseJwt } from "../../utils";

const BlogCard = ({ blog }) => {
	const router = useRouter();
	const access_token = localStorage.getItem("access_token");
	const isAdmin = access_token
		? parseJwt(access_token)?.account_type === "admin"
		: false;
	return (
		<div className="blog-container">
			<text className="blog-preview-title">{blog.title}</text>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "row",
					paddingTop: 20,
				}}
			>
				<img
					style={{ width: 30, borderRadius: 15 }}
					src={
						"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
					}
				/>
				<text style={{ paddingLeft: 10, color: "#5183f1" }}>James Doe</text>
				<text style={{ paddingLeft: 10, paddingRight: 10, color: "#ebf1fd" }}>
					|
				</text>
				<text style={{ color: "#878fa4" }}>Updated on </text>
				<text style={{ color: "#5183f1", paddingLeft: 10 }}>Jan 23 2021</text>
			</div>
			<img
				style={{
					width: "100%",
					marginTop: 20,
					borderRadius: 8,
					aspectRatio: "2/1",
					objectFit: "cover",
				}}
				src={blog?.cover_image}
			/>
			<div style={{ marginTop: 20, marginBottom: 20 }}>
				<text
					style={{
						fontSize: 17,
						fontFamily: `"Cormorant", serif`,
						fontWeight: 600,
						// color: "black",
					}}
				>
					{blog?.text
						.replace(/[^a-zA-Z ]/g, " ")
						.split(" ")
						.slice(0, 40)
						.join(" ") + " ..."}
				</text>
			</div>
			<div>
				<Button
					onClick={() => router.push(`/blogs/${blog.id}`)}
					style={{ float: "right", padding: 10, marginTop: 10 }}
				>
					Continue Reading
				</Button>
				{isAdmin && (
					<Button
						onClick={() => router.push(`/edit-blog/${blog.id}`)}
						style={{
							float: "right",
							padding: 10,
							marginTop: 10,
							marginRight: 20,
						}}
					>
						Edit Blog
					</Button>
				)}
			</div>
		</div>
	);
};

const Blogs = ({ blogs }) => {
	const { t } = useTranslation("login-page");

	return (
		<div style={{ minHeight: "100vh", backgroundColor: "white" }}>
			<HeaderContainer title={t("title")} />
			<div
				style={{
					width: "100%",
					height: 250,
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					zIndex: 2,
					borderTop: "3px solid #3871ef",
				}}
			>
				<img
					src={bg}
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						zIndex: -1,
					}}
				/>
				<h1 className="blogs-page-title">Belgium Immo Blog</h1>
				<p className="blogs-page-subtitle">
					Get the latest market trends and updates weekly. No Spam.
				</p>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				{blogs.map((blog) => {
					return <BlogCard key={blog.id} blog={blog} />;
				})}
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const { data } = await axios.get(`/blogs`);
	return {
		props: {
			blogs: [...data],
			...(await serverSideTranslations(locale, ["login-page", "header"])),
		}, // will be passed to the page component as props
	};
};

export default Blogs;
