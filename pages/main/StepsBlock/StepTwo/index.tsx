import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';
import FloorsIcon from '../../../../assets/images/steps/floors.svg';
import FacadesIcon from '../../../../assets/images/steps/facades.svg';
import BedroomsIcon from '../../../../assets/images/steps/bedrooms.svg';
import BathroomsIcon from '../../../../assets/images/steps/bathrooms.svg';

import { goToNextStepAction, goToPrevStepAction, setPropertyDetailsAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepTwo = () => {
  const dispatch = useDispatch();
  const {
    livingArea,
    landSurface,
    numberBathrooms,
    numberBedrooms,
    numberLevels,
    facadesNumber,
    gardenTerras,
    elevator,
    gardenTerrasValue,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.propertyDetails);
  const { selectedProperty } = useSelector((state: RootState) => state.stepsInfo.stepBlock);

  const [data, setFormData] = useState({
    livingArea,
    landSurface,
    numberBathrooms,
    numberBedrooms,
    numberLevels,
    facadesNumber,
    gardenTerras,
    elevator,
    gardenTerrasValue,
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

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.name === 'gardenTerras' || el.target.name === 'elevator' ? el.target.checked : el.target.value,
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
    if (!data.livingArea.length) {
      return true;
    }

    return !data.landSurface.length;
  };

  return (
    <div className='step-two'>
      <span className="step-title">Step 2</span>
      <h4>Home details</h4>
      <Form>
        <Form.Row>
          <InputGroup className='mb-3'>
            <Form.Label>Living Area</Form.Label>
            <div className="input-block">
              <Form.Control name='livingArea' value={ data.livingArea } type="number" onChange={ handleChangeVal }/>
              <InputGroup.Append>
                <InputGroup.Text>m²</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup className='range'>
            <InputGroup.Prepend className='prepend'>
              <InputGroup.Text>0 m²</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name='livingArea'
              value={data.livingArea}
              type="range"
              onChange={ handleChangeVal }
              min={0}
              max={1000}
            />
            <InputGroup.Append className='append'>
              <InputGroup.Text>1,000 m²</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          {
            selectedProperty === 'house' &&
              <>
                <InputGroup className='mb-3'>
                  <Form.Label>Land surface</Form.Label>
                  <div className="input-block">
                    <Form.Control name='landSurface' value={ data.landSurface } type="number" onChange={ handleChangeVal }/>
                    <InputGroup.Append>
                      <InputGroup.Text>m²</InputGroup.Text>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
                <InputGroup className='range'>
                  <InputGroup.Prepend className='prepend'>
                    <InputGroup.Text>0 m²</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name='landSurface'
                    value={data.landSurface}
                    type="range"
                    onChange={ handleChangeVal }
                    min={0}
                    max={20000}
                  />
                  <InputGroup.Append className='append'>
                    <InputGroup.Text>20,000 m²</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </>
          }
          {
            selectedProperty === 'apartment' &&
              <>
                <InputGroup>
                  <Form.Label className='d-flex'>
                    <Form.Check
                      value={ data.gardenTerras }
                      name='gardenTerras'
                      onChange={ handleChangeVal }
                      type="checkbox"
                    />
                    Garden, terras
                  </Form.Label>
                  <div className="input-block">
                    <Form.Control
                      name='gardenTerrasValue'
                      disabled={ !data.gardenTerras }
                      value={ data.gardenTerrasValue }
                      type="number"
                      onChange={ handleChangeVal }
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>m²</InputGroup.Text>
                    </InputGroup.Append>
                  </div>
                </InputGroup>
                <InputGroup>
                  <Form.Check
                    value={ data.elevator }
                    name='elevator'
                    onChange={ handleChangeVal }
                    type="checkbox"
                    label='Elevator'
                  />
                </InputGroup>
              </>
          }
          <InputGroup>
            <Form.Label><img src={ FloorsIcon } alt="FloorsIcon"/>Floors</Form.Label>
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
          <InputGroup>
            <Form.Label><img src={ FacadesIcon } alt="FloorsIcon"/>Facades</Form.Label>
            <div className="input-block input-border-radius-0">
              <InputGroup.Prepend>
                <InputGroup.Text onClick={ () => handleSubtractNumber('facadesNumber') }>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={ data.facadesNumber } readOnly type="number"/>
              <InputGroup.Append>
                <InputGroup.Text onClick={ () => handleAddNumber('facadesNumber') }>+</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label><img src={ BedroomsIcon } alt="BedroomsIcon"/>Bedrooms</Form.Label>
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
            <Form.Label><img src={ BathroomsIcon } alt="BathroomsIcon"/>Bathrooms</Form.Label>
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

export default StepTwo;