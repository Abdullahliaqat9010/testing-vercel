import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

export function handleAlreadyAuthenticated(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		const { req } = context;
		const access_token = req.cookies?.access_token as string;
		if (access_token) {
			// Redirect to login page

			const { account_type } = jwt.decode(access_token) as {
				account_type: string;
			};
			return {
				redirect: {
					destination: `${
						account_type === "agent" ? "/properties" : "/dashboard"
					}`,
					permanent: true,
				},
			};
		}

		return await gssp(context); // Continue on to call `getServerSideProps` logic
	};
}
