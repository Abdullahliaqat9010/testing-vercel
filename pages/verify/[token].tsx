import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { verifyEmailAction } from "../../actions";
import { RootState } from "../../types/state";
import { Spinner } from "react-bootstrap";

const Token = () => {
	const router = useRouter();
	const { locale } = router;
	const dispatch = useDispatch();
	const { email_verified } = useSelector((state: RootState) => state.userInfo);
	const { token } = router.query;

	useEffect(() => {
		dispatch(verifyEmailAction(token));
	}, []);

	useEffect(() => {
		if (email_verified) {
			router.push("/dashboard", "/dashboard", { locale });
		}
	}, [email_verified]);

	return (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading...</span>
		</Spinner>
	);
};

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking", //indicates the type of fallback
	};
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, [])),
	},
});

export default Token;
