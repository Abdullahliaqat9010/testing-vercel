import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';

import { goToNextStepAction, goToPrevStepAction, setUtilitiesDataAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

import IconBack from '../../../../assets/images/long-arrow.svg';
import NorthInactive from '../../../../assets/images/steps/orientation/n-inactive.svg';
import NorthActive from '../../../../assets/images/steps/orientation/n-active.svg';
import NorthEastInactive from '../../../../assets/images/steps/orientation/ne-inactive.svg';
import NorthEastActive from '../../../../assets/images/steps/orientation/ne-active.svg';
import EastInactive from '../../../../assets/images/steps/orientation/e-inactive.svg';
import EastActive from '../../../../assets/images/steps/orientation/e-active.svg';
import SouthEastInactive from '../../../../assets/images/steps/orientation/se-inactive.svg';
import SouthEastActive from '../../../../assets/images/steps/orientation/se-active.svg';
import SouthInactive from '../../../../assets/images/steps/orientation/s-inactive.svg';
import SouthActive from '../../../../assets/images/steps/orientation/s-active.svg';
import SouthWestInactive from '../../../../assets/images/steps/orientation/sw-inactive.svg';
import SouthWestActive from '../../../../assets/images/steps/orientation/sw-active.svg';
import WestInactive from '../../../../assets/images/steps/orientation/w-inactive.svg';
import WestActive from '../../../../assets/images/steps/orientation/w-active.svg';
import NorthWestInactive from '../../../../assets/images/steps/orientation/nw-inactive.svg';
import NorthWestActive from '../../../../assets/images/steps/orientation/nw-active.svg';

const StepFour = () => {
  const dispatch = useDispatch();

  const {
    epc,
    view,
    orientation,
    attic,
    atticValue,
    cellar,
    cellarValue,
    elevator,
    swimmingPool,
    indoorGarage,
    outdoorGarage,
    carport,
    solarPanels,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.utilities);

  const [data, setFormData] = useState({
    epc,
    view,
    orientation,
    attic,
    atticValue,
    cellar,
    cellarValue,
    elevator,
    swimmingPool,
    indoorGarage,
    outdoorGarage,
    carport,
    solarPanels,
  });

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const checkIfCheckbox = (name: string) => {
    return name === 'attic' || name === 'cellar' || name === 'swimmingPool' || name === 'elevator';
  }

  const handleChangeVal = (el) => {
    setFormData({
      ...data,
      [el.target.name]: checkIfCheckbox(el.target.name) ? el.target.checked : el.target.value,
    });
  };

  const selectView = (el) => {
    setFormData({
      ...data,
      view: el.target.name,
    });
  };

  const selectOrientation = (name: string) => {
    setFormData({
      ...data,
      orientation: name,
    });
  };

  const handleAddNumber = (elName: string) => {
    setFormData({
      ...data,
      [elName]: ++data[elName],
    });
  };

  const handleSubtractNumber = (elName: string) => {
    if (elName === 'solarPanels') {
      setFormData({
        ...data,
        solarPanels: data.solarPanels > 0 ? --data.solarPanels : 0,
      });
    } else {
      setFormData({
        ...data,
        [elName]: data[elName] > 1 ? --data[elName] : 1,
      });
    }
  };

  const handleClickNextBtn = () => {
    dispatch(setUtilitiesDataAction(data));
    dispatch(goToNextStepAction());
  };

  return (
    <div className='step-four'>
      <span className="step-title">Step 3</span>
      <h4>Home details <span className="optional">(Optional)</span></h4>
      <Form>
        <InputGroup className='epc'>
          <Form.Label className='d-flex'>
            EPC/PEB
          </Form.Label>
          <div className="input-block">
            <Form.Control
              name='epc'
              value={ data.epc }
              onChange={ handleChangeVal }
              placeholder='Enter'
              type="number"
            />
            <InputGroup.Append>
              <InputGroup.Text>kWh/m²</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <div className="group-block d-flex flex-column">
          <span className="form-label">View</span>
          <ButtonGroup aria-label='condition' className='custom-btn-group'>
            <Button
              name='enclosed'
              className={ `first-btn ${ data.view === 'enclosed' ? 'custom-active' : '' }` }
              onClick={ selectView }
            >
              Enclosed
            </Button>
            <Button
              name='normal'
              className={ data.view === 'normal' ? 'custom-active' : '' }
              onClick={ selectView }
            >
              Normal
            </Button>
            <Button
              name='good'
              className={ data.view === 'good' ? 'custom-active' : '' }
              onClick={ selectView }
            >
              Good
            </Button>
            <Button
              name='unique'
              className={ `last-btn ${ data.view === 'unique' ? 'custom-active' : '' }` }
              onClick={ selectView }
            >
              Unique
            </Button>
          </ButtonGroup>
        </div>
        <div className="group-block d-flex align-items-center justify-content-between">
          <span className="form-label">Orientation terras</span>
          <div className="terras-block">
            <img
              className='north'
              src={ data.orientation === 'north' ? NorthActive : NorthInactive }
              alt="North"
              onClick={ () => selectOrientation('north') }
            />
            <img
              className='north-east'
              src={ data.orientation === 'north-east' ? NorthEastActive : NorthEastInactive }
              alt="North-East"
              onClick={ () => selectOrientation('north-east') }
            />
            <img
              className='east'
              src={ data.orientation === 'east' ? EastActive : EastInactive }
              alt="East"
              onClick={ () => selectOrientation('east') }
            />
            <img
              className='south-east'
              src={ data.orientation === 'south-east' ? SouthEastActive : SouthEastInactive }
              alt="South-East"
              onClick={ () => selectOrientation('south-east') }
            />
            <img
              className='south'
              src={ data.orientation === 'south' ? SouthActive : SouthInactive }
              alt="South"
              onClick={ () => selectOrientation('south') }
            />
            <img
              className='south-west'
              src={ data.orientation === 'south-west' ? SouthWestActive : SouthWestInactive }
              alt="South-West"
              onClick={ () => selectOrientation('south-west') }
            />
            <img
              className='west'
              src={ data.orientation === 'west' ? WestActive : WestInactive }
              alt="West"
              onClick={ () => selectOrientation('west') }
            />
            <img
              className='north-west'
              src={ data.orientation === 'north-west' ? NorthWestActive : NorthWestInactive }
              alt="North-West"
              onClick={ () => selectOrientation('north-west') }
            />
          </div>
        </div>
        <InputGroup>
          <Form.Label className='d-flex'>
            <Form.Check name='attic' onChange={ handleChangeVal } defaultChecked={ data.attic } type="checkbox"/>
            Attic
          </Form.Label>
          <div className="input-block">
            <Form.Control
              disabled={ !data.attic }
              name='atticValue'
              value={ data.atticValue }
              onChange={ handleChangeVal }
              type="number"
            />
            <InputGroup.Append>
              <InputGroup.Text>m²</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label className='d-flex'>
            <Form.Check name='cellar' onChange={ handleChangeVal } defaultChecked={ data.cellar } type="checkbox"/>
            Cellar
          </Form.Label>
          <div className="input-block">
            <Form.Control
              disabled={ !data.cellar }
              name='cellarValue'
              value={ data.cellarValue }
              onChange={ handleChangeVal }
              type="number"
            />
            <InputGroup.Append>
              <InputGroup.Text>m²</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Check
            name='elevator'
            onChange={ handleChangeVal }
            defaultChecked={ data.elevator }
            type="checkbox"
            label='Elevator'
          />
        </InputGroup>
        <InputGroup>
          <Form.Check
            name='swimmingPool'
            onChange={ handleChangeVal }
            defaultChecked={ data.swimmingPool }
            type="checkbox"
            label='Swimming pool'
          />
        </InputGroup>
        <InputGroup>
          <Form.Label>Indoor Garage</Form.Label>
          <div className="input-block input-border-radius-0">
            <InputGroup.Prepend>
              <InputGroup.Text onClick={ () => handleSubtractNumber('indoorGarage') }>-</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={ data.indoorGarage } readOnly type="number"/>
            <InputGroup.Append>
              <InputGroup.Text onClick={ () => handleAddNumber('indoorGarage') }>+</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label>Outdoor Garage</Form.Label>
          <div className="input-block input-border-radius-0">
            <InputGroup.Prepend>
              <InputGroup.Text onClick={ () => handleSubtractNumber('outdoorGarage') }>-</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={ data.outdoorGarage } readOnly type="number"/>
            <InputGroup.Append>
              <InputGroup.Text onClick={ () => handleAddNumber('outdoorGarage') }>+</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label>Carport</Form.Label>
          <div className="input-block input-border-radius-0">
            <InputGroup.Prepend>
              <InputGroup.Text onClick={ () => handleSubtractNumber('carport') }>-</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={ data.carport } readOnly type="number"/>
            <InputGroup.Append>
              <InputGroup.Text onClick={ () => handleAddNumber('carport') }>+</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label>Solar panels</Form.Label>
          <div className="input-block input-border-radius-0">
            <InputGroup.Prepend>
              <InputGroup.Text onClick={ () => handleSubtractNumber('solarPanels') }>-</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={ data.solarPanels } readOnly type="number"/>
            <InputGroup.Append>
              <InputGroup.Text onClick={ () => handleAddNumber('solarPanels') }>+</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button onClick={ handleClickNextBtn } className='next-step'>Next</Button>
      </div>
    </div>
  );
};

export default StepFour;