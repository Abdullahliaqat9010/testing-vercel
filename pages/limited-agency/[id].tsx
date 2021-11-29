import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { getLimitedAgencyById } from "../../network-requests";
import { useRouter } from "next/router";
import PortFolio from "../../containers/agency-detaile-page";
import axios from "axios";

const agencyProtfolio = () => {
	const router = useRouter();
	const { id } = router.query;

	const [agency, setAgency] = useState(null);
	const [comments, setComments] = useState([]);

	const _getAgency = async () => {
		try {
			let _agency = await getLimitedAgencyById(Number(id));
			setAgency({ ..._agency, isLimited: true });
		} catch (error) {
			console.log(error);
		}
	};
	const getComments = async () => {
		try {
			const { data: comments } = await axios.get(`/blog-comments/agency`, {
				params: {
					agency_id: id,
				},
			});
			setComments(comments);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		_getAgency();
		getComments();
	}, []);

	return <PortFolio agency={agency} comments={comments} />;
};

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking", //indicates the type of fallback
	};
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [
			"header",
			"agency-page",
			"dashboard-page",
			"common",
		])),
	},
});

export default agencyProtfolio;
