import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

import IconClear from '../../../../assets/images/icon-close.svg';
import IconBack from '../../../../assets/images/long-arrow.svg';

import { goToNextStepAction, goToPrevStepAction, setAdditionalAddressAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepTwo = () => {
  const dispatch = useDispatch();
  const {
    street,
    number,
    locality,
    zip,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.additionalAddress);
  const [data, setFormData] = useState({
    street,
    number,
    zip,
    locality,
  });

  const handleChangeVal = (el) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const clearInput = () => {
    setFormData({
      ...data,
      street: '',
    });
  };

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    if(disabledButton) {
      dispatch(setAdditionalAddressAction(data));
      dispatch(goToNextStepAction());
    }
    return false;
  };

  const disabledButton = () => {
    if (!data.street.length) {
      return true;
    }
    if (!data.locality.length) {
      return true;
    }
    if (!data.number.length) {
      return true;
    }

    return !data.zip.length;
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
              <Form.Control name='street' value={ data.street } onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>
                  {
                    data.street.length > 0 && <img onClick={ clearInput } src={ IconClear } alt="IconClear"/>
                  }
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>№</Form.Label>
            <Form.Control type="text" name='number' value={ data.number } onChange={ handleChangeVal }/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className='mr-4' controlId="zip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control type="text" name='zip' value={ data.zip } onChange={ handleChangeVal }/>
          </Form.Group>
          <Form.Group controlId="locality">
            <Form.Label>Locality</Form.Label>
            <Form.Control type="text" name='locality' value={ data.locality } onChange={ handleChangeVal }/>
          </Form.Group>
        </Form.Row>
      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button disabled={ disabledButton() } onClick={ handleClickNextBtn } type='submit'
                className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepTwo;