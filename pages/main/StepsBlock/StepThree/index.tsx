import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';
import ApartmentImageActive from '../../../../assets/images/apartment-active.svg';
import ApartmentImageNoActive from '../../../../assets/images/apartment-noactive.svg';
import HomeImageActive from '../../../../assets/images/home-active.svg';
import HomeImageNoActive from '../../../../assets/images/home-noactive.svg';

import { goToNextStepAction, goToPrevStepAction, setActivePropertyAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepThree = () => {
  const dispatch = useDispatch();
  const {selectedProperty: currentProp} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [selectedProperty, setCurrentProperty] = useState<string>(currentProp);

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    dispatch(goToNextStepAction());
  };

  const setActiveBlock = (item: string) => {
    setCurrentProperty(item);
    dispatch(setActivePropertyAction(item));
  };

  return (
    <div className='step-three'>
      <span className="step-title">Step 3</span>
      <h4>Property Type</h4>
      <div className="properties d-flex justify-content-between">
        <div
          onClick={ () => setActiveBlock('home') }
          className={ `property-home ${ selectedProperty === 'home' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'home' ? HomeImageActive : HomeImageNoActive } alt="home"/>
          <span className="title">Home</span>
          <div className="active-item"/>
        </div>
        <div
          onClick={ () => setActiveBlock('apartment') }
          className={ `property-apartment ${ selectedProperty === 'apartment' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'apartment' ? ApartmentImageActive : ApartmentImageNoActive }
               alt="apartment"/>
          <span className="title">Apartment</span>
          <div className="active-item"/>
        </div>
      </div>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button disabled={ selectedProperty.length === 0 } onClick={ handleClickNextBtn }
                className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepThree;