import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

import StepOnePro from './StepOne';
import StepTwoPro from './StepTwo';
import StepThreePro from './StepThree';

import { RootState } from '../../../types/state';
import { showStepsOnTheHeaderAction } from '../../../actions';

const stepsArr = [
  <StepOnePro/>,
  <StepTwoPro/>,
  <StepThreePro/>,
];
const ProWorkspaceSteps = () => {
  const dispatch = useDispatch();
  const {step} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [progressBar, setProgressBar] = useState<number>(33);

  useEffect(() => {
    dispatch(showStepsOnTheHeaderAction());
  }, []);

  const changeProgressBar = () => {
    if (step === 1) {
      return setProgressBar(67);
    }

    if (step === 2) {
      return setProgressBar(100);
    }

    return;
  };

  useEffect(() => {
    changeProgressBar();
  }, [step]);

  return (
    <div className='ProWorkspacePage__main-component'>
      <ProgressBar className='custom-progress-bar' now={ progressBar }/>
      {
        stepsArr[step]
      }
    </div>
  );
};

export default ProWorkspaceSteps;