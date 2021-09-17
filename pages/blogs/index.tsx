import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import axios from "axios";
import HeaderContainer from "../../containers/Header";
import bg from "../../assets/images/blog/blogs_cover.png";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { parseJwt } from "../../utils";
import { config } from "../../config/siteConfigs";
import moment from "moment";
import FooterContainer from "../../containers/Footer";

const BlogCard = ({ blog }) => {
	const router = useRouter();
	const { t } = useTranslation("blog");
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
					flexDirection: "row",
					alignItems: "center",
					paddingTop: 20,
				}}
			>
				<img
					src={"https://picsum.photos/200"}
					style={{
						width: 30,
						height: 30,
						borderRadius: 20,
						marginRight: 10,
					}}
				/>
				<text style={{ fontSize: 14 }}>
					{`By Belgium Immo . ${t("text.update")} `}
					<span>
						{moment(blog?.updatedAt).format("MMM[.] DD[,] YYYY")}
					</span>{" "}
				</text>
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
					onClick={() => router.push(`/blogs/${blog?.slug}`)}
					style={{ float: "right", padding: 10, marginTop: 10 }}
				>
					{t("btn.continue-reading")}
				</Button>
				{isAdmin && (
					<Button
						onClick={() => router.push(`/edit-blog/${blog?.uuid}`)}
						style={{
							float: "right",
							padding: 10,
							marginTop: 10,
							marginRight: 20,
						}}
					>
						{t("btn.edit-blog")}
					</Button>
				)}
			</div>
		</div>
	);
};

const Blogs = ({ blogs }) => {
	const { t } = useTranslation("blog");

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
				<p className="blogs-page-subtitle">{t("blog.subtitle")}</p>
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
			<FooterContainer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const axiosInstance = axios.create({
		baseURL: config.apiDomain,
	});
	const { data } = await axiosInstance.get(`/blogs`);
	return {
		props: {
			blogs: [...data],
			...(await serverSideTranslations(locale, ["blog", "header"])),
		}, // will be passed to the page component as props
	};
};

export default Blogs;
