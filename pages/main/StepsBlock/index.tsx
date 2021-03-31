import React, {useEffect, useState} from 'react';
import { ProgressBar } from 'react-bootstrap';

import StepTwo from './StepTwo';
import StepThree from './StepThree';
import GoogleMap from '../../../components/GoogleMap';
import {useSelector} from "react-redux";
import {RootState} from "../../../types/state";

const stepsArr = [
    <StepTwo />,
    <StepThree />,
];

const StepsBlock = () => {
  const { step } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [progressBar, setProgressBar] = useState<number>(20);

  const changeProgressBar = () => {
    if (step === 1) {
      return setProgressBar(40);
    }

    if (step === 2) {
     return setProgressBar(70);
    }

    if (step === 3) {
     return setProgressBar(100);
    }

     return setProgressBar(20);
  };

  useEffect(() => {
    changeProgressBar();
  }, [step]);

  return (
    <div className='steps-block'>
      <ProgressBar className='steps-block__progress-bar' now={progressBar} />
      <div className="steps-block__main d-flex">
        <div className='ml-156 w-50 mt-87'>
            {
                stepsArr[step]
            }
        </div>
        <div className='w-50'>
          <GoogleMap lat={40.7510674} lng={-74.1660403} />
        </div>
      </div>
    </div>
  )
}

export default StepsBlock;