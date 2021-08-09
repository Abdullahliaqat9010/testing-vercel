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
import _3DMap from "../../../components/3dMap";

const stepsArr = [<StepOne />, <StepTwo />, <StepThree />, <StepFour />];

const StepsBlock = () => {
	const { step } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
	const [progressBar, setProgressBar] = useState<number>(33);
	const [showBlock, setShowBlock] = useState<boolean>(false);

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
					<div className="w-50 position-relative">
						{showBlock && <_3DMap />}
					</div>
				)}
			</div>
		</div>
	);
};

export default StepsBlock;
