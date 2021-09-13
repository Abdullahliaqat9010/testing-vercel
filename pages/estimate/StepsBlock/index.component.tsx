import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { isMobile } from "react-device-detect";

import { RootState } from "../../../types/state";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import GoogleMap from "../../../components/GoogleMap";
// import _3DMap from "../../../components/3dMap";

const StepsBlock = ({ setStep, step }) => {
	const location = useSelector<RootState>(
		(state) => state.stepsInfo.stepBlock.location
	) as any;

	const stepsArr = [
		<StepOne setStep={setStep} />,
		<StepTwo setStep={setStep} />,
		<StepThree setStep={setStep} />,
		<StepFour setStep={setStep} />,
	];

	const mapProps = {
		markers: location.lat
			? [
					{
						position: {
							lat: location?.lat,
							lng: location?.lng,
						},
						type: "home",
						id: null,
					},
			  ]
			: [],
	};

	return (
		<div className="steps-block">
			<ProgressBar className="steps-block__progress-bar" now={step * 33.34} />
			<div className="steps-block__main d-flex">
				<div className="ml-156 w-50 mt-57">{stepsArr[step]}</div>
				{!isMobile && (
					<div className="steps-google-maps">
						<GoogleMap {...mapProps} />
					</div>
				)}
			</div>
		</div>
	);
};

export default StepsBlock;
