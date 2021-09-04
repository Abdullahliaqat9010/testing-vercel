import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req } = context;
		const access_token = req.cookies?.access_token as string;
		if (!access_token) {
			// Redirect to login page
			return {
				redirect: {
					destination: "/login",
					permanent: true,
				},
			};
		}

		return await gssp(context); // Continue on to call `getServerSideProps` logic
	};
}
