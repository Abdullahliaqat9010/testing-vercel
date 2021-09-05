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
	const [progressBar, setProgressBar] = useState<number>(33);
	const [showBlock, setShowBlock] = useState<boolean>(false);
	const stepsArr = [
		<StepOne setStep={setStep} />,
		<StepTwo setStep={setStep} />,
		<StepThree setStep={setStep} />,
		<StepFour setStep={setStep} />,
	];

	const changeProgressBar = () => {
		if (step === 1) {
			return setProgressBar(67);
		}

		if (step === 2) {
			return setProgressBar(83);
		}

		if (step === 3) {
			return setProgressBar(100);
		}

		return;
	};
	useEffect(() => {
		setTimeout(() => setShowBlock(true), 500);
	}, []);

	useEffect(() => {
		changeProgressBar();
	}, [step]);

	return (
		<div className="steps-block">
			<ProgressBar className="steps-block__progress-bar" now={progressBar} />
			<div className="steps-block__main d-flex">
				<div className="ml-156 w-50 mt-57">{stepsArr[step]}</div>
				{!isMobile && (
					<div className="steps-google-maps">{showBlock && <GoogleMap />}</div>
				)}
			</div>
		</div>
	);
};

export default StepsBlock;
