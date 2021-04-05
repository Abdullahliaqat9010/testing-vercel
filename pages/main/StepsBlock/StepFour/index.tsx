import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';
import InfoIcon from '../../../../assets/images/icon-info.svg';

import { goToNextStepAction, goToPrevStepAction, setPropertyDetailsAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepFour = () => {
  const dispatch = useDispatch();
  const {
    livableArea,
    totalArea,
    numberBathrooms,
    numberBedrooms,
    numberLevels,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.propertyDetails);

  const [data, setFormData] = useState({
    livableArea,
    totalArea,
    numberBathrooms,
    numberBedrooms,
    numberLevels,
  });

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    if (disabledButton) {
      dispatch(setPropertyDetailsAction(data));
      dispatch(goToNextStepAction());
    }
    return false;
  };

  const handleChangeVal = (el) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const handleAddNumber = (elName: string) => {
    setFormData({
      ...data,
      [elName]: ++data[elName],
    });
  };

  const handleSubtractNumber = (elName: string) => {
    setFormData({
      ...data,
      [elName]: data[elName] > 1 ? --data[elName] : 1,
    });
  };

  const disabledButton = () => {
    if (!data.livableArea.length) {
      return true;
    }

    return !data.totalArea.length;
  };

  return (
    <div className='step-four'>
      <span className="step-title">Step 4</span>
      <h4>Property details</h4>
      <Form>
        <Form.Row>
          <InputGroup>
            <Form.Label>Livable area</Form.Label>
            <div className="input-block">
              <Form.Control name='livableArea' value={ data.livableArea } type="number" onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>m²</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label>Total area</Form.Label>
            <div className="input-block">
              <Form.Control name='totalArea' value={ data.totalArea } type="number" onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>m²</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label>Number of bedrooms <img src={ InfoIcon } alt="InfoIcon"/></Form.Label>
            <div className="input-block input-border-radius-0">
              <InputGroup.Prepend>
                <InputGroup.Text onClick={ () => handleSubtractNumber('numberBedrooms') }>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={ data.numberBedrooms } readOnly type="number"/>
              <InputGroup.Append>
                <InputGroup.Text onClick={ () => handleAddNumber('numberBedrooms') }>+</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label>Number of bathrooms <img src={ InfoIcon } alt="InfoIcon"/></Form.Label>
            <div className="input-block input-border-radius-0">
              <InputGroup.Prepend>
                <InputGroup.Text onClick={ () => handleSubtractNumber('numberBathrooms') }>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={ data.numberBathrooms } readOnly type="number"/>
              <InputGroup.Append>
                <InputGroup.Text onClick={ () => handleAddNumber('numberBathrooms') }>+</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label>Number of levels <img src={ InfoIcon } alt="InfoIcon"/></Form.Label>
            <div className="input-block input-border-radius-0">
              <InputGroup.Prepend>
                <InputGroup.Text onClick={ () => handleSubtractNumber('numberLevels') }>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={ data.numberLevels } readOnly type="number"/>
              <InputGroup.Append>
                <InputGroup.Text onClick={ () => handleAddNumber('numberLevels') }>+</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
        </Form.Row>
      </Form>
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