import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';

import { goToPrevStepAction } from '../../../../actions';

const StepFour = () => {
  const dispatch = useDispatch();

  const [data, setFormData] = useState({});

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    console.log(data);
    return false;
  };

  const disabledButton = () => {
    return false;
  };

  return (
    <div className='step-three'>
      <span className="step-title">Step 3</span>
      <h4>Home details <span className="optional">(Optional)</span></h4>

      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button disabled={ disabledButton() } onClick={ handleClickNextBtn } className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepFour;