import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import axios from "axios";
import HeaderContainer from "../../containers/Header";
import { config } from "../../config/siteConfigs";
import bg from "../../assets/images/login-bg.png";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const BlogCard = ({ blog }) => {
	const router = useRouter();
	return (
		<div
			style={{
				width: "50%",
				paddingTop: "20px",
				paddingBottom: "50px",
				//height: 200,
			}}
		>
			<h2 style={{ fontWeight: "bold" }}>{blog.title}</h2>
			<div
				style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
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
				style={{ width: "100%", paddingTop: 10 }}
				src={
					"https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmdzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
				}
			/>
			{/* {
				"Sample text for the blog. It will be dynamic once retrieved from the database"
			} */}
			<div>
				<Button
					onClick={() => router.push(`/blogs/${blog.id}`)}
					style={{ float: "right", padding: 10, marginTop: 10 }}
				>
					Continue Reading
				</Button>
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
					//background: bg,
					width: "100%",
					height: 250,
					//backgroundColor: "red",
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					zIndex: 2,
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
				<h1 style={{ fontWeight: "bold" }}>Belgium Immo Blog</h1>
				<p style={{ fontSize: 18, paddingTop: 5 }}>
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
	const { data } = await axios.get(`${config.apiDomain}/blogs`);
	return {
		props: {
			blogs: [...data],
			...(await serverSideTranslations(locale, ["login-page", "header"])),
		}, // will be passed to the page component as props
	};
};

export default Blogs;
