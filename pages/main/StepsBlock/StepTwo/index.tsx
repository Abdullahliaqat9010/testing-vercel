import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Button, Form, InputGroup } from 'react-bootstrap';

import IconClear from '../../../../assets/images/icon-close.svg';
import IconBack from '../../../../assets/images/long-arrow.svg';

import {goToNextStepAction, goToPrevStepAction} from "../../../../actions";

const StepTwo = () => {
  const dispatch = useDispatch();
  const [addressValue, setAddressValue] = useState('');

  const handleChangeVal = (el) => {
    setAddressValue(el.target.value);
  };

  const clearInput = () => {
    setAddressValue('');
  };

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    dispatch(goToNextStepAction());
  };

  return (
    <div className='step-two'>
      <span className="step-title">Step 2</span>
      <h4>Address</h4>
      <Form>
        <Form.Row>
          <Form.Group className='mr-4' controlId="street">
            <Form.Label>Street</Form.Label>
            <InputGroup>
              <Form.Control value={ addressValue } onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>
                  <img onClick={clearInput} src={ IconClear } alt="IconClear"/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>№</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className='mr-4' controlId="zip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group controlId="locality">
            <Form.Label>Locality</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Form.Row>
      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
            onClick={handleClickPrevBtn}
            className='prev-step'>
          <img src={IconBack} alt="IconBack"/>Back
        </Button>
        <Button onClick={handleClickNextBtn} className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepTwo;