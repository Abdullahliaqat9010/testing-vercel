import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import { goToPrevStepAction } from '../../../../actions';

import IconBack from '../../../../assets/images/long-arrow.svg';
import LinkArrow from '../../../../assets/images/arrow-blue.svg';

const CreatePersonalAccount = () => {
  const dispatch = useDispatch();

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    console.log(3213);
  };
  return (
    <div className='create-personal-account'>
      <span className="step-title">Great job!</span>
      <h4>Estimation is ready!</h4>
      <span className="step-title">
        We finalized your estimation and personal report. You need to create an account or use existing
        account to review it.
      </span>
      <Link href={'/login'}>
        <span className='have-account'>I already have an account<img src={ LinkArrow } alt="LinkArrow"/></span>
      </Link>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button onClick={ handleClickNextBtn } className='next-step'>Next</Button>
      </div>
    </div>
  )
}

export default CreatePersonalAccount;