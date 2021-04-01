import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

import { RootState } from '../../../types/state';

import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import FinalStep from './FinalStep';
import GoogleMap from '../../../components/GoogleMap';

const stepsArr = [
  <StepTwo/>,
  <StepThree/>,
  <StepFour/>,
  <FinalStep/>,
];

const StepsBlock = () => {
  const {step} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
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
      <ProgressBar className='steps-block__progress-bar' now={ progressBar }/>
      <div className="steps-block__main d-flex">
        <div className='ml-156 w-50 mt-87'>
          {
            stepsArr[step]
          }
        </div>
        <div className='w-50'>
          <GoogleMap/>
        </div>
      </div>
    </div>
  );
};

export default StepsBlock;