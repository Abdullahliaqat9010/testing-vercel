import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../types/state";

import ImagesBlock from "./ImagesBlock";
import TestimonialsBlock from "./TestimonialsBlock";
import StepsBlock from "../estimate/StepsBlock/index.component";
import InfoBlock from "./InfoBlock";

const MainPageComponent = () => {
	const router = useRouter();

	const { locale } = router;

	return (
		<div className="main-page">
			<>
				<ImagesBlock />
				<InfoBlock />
				<TestimonialsBlock />
				<div className="short-footer d-flex justify-content-between">
					<p>
						<span>Immo Belgium </span>
						<span>{new Date().getFullYear()}. All Rights Reserved.</span>
					</p>
					<span className="link">
						<a href={locale + "/privacy-policy"} target="_blank">
							Politique de Confidentialité.
						</a>
					</span>
				</div>
			</>
			{/* )} */}
		</div>
	);
};

export default MainPageComponent;
