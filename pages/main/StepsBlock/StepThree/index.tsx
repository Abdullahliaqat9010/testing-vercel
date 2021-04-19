import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown, Form, InputGroup } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';
import CheckedIcon from '../../../../assets/images/valid-blue.svg';

import { goToNextStepAction, goToPrevStepAction, setDetailsAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

import { constructionYearList } from '../../../../templates/constructionYearList';
import { renovatedYearList } from '../../../../templates/renovatedYearList';

const StepThree = () => {
  const dispatch = useDispatch();

  const {
    prestige,
    condition,
    constructionYear,
    renovated,
    renovationYear,
    renovationLevel,
    numberFloors,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.details);
  const { selectedProperty } = useSelector((state: RootState) => state.stepsInfo.stepBlock);

  const [data, setFormData] = useState({
    prestige,
    condition,
    constructionYear,
    renovated,
    renovationYear,
    renovationLevel,
    numberFloors,
  });

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    dispatch(setDetailsAction(data));
    dispatch(goToNextStepAction());
  };

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.name === 'renovated' ? el.target.checked : el.target.value,
    });
  };

  const handleAddNumber = () => {
    setFormData({
      ...data,
      numberFloors: ++data.numberFloors,
    });
  };

  const handleSubtractNumber = () => {
    setFormData({
      ...data,
      numberFloors: data.numberFloors > 1 ? --data.numberFloors : 1,
    });
  };

  const selectPrestige = (el) => {
    setFormData({
      ...data,
      prestige: el.target.name,
    });
  };

  const selectCondition = (el) => {
    setFormData({
      ...data,
      condition: el.target.name,
    });
  };
  const handleSelectConstructionYear = (el) => {
    setFormData({
      ...data,
      constructionYear: el.target.name,
    });
  };

  const handleSelectRenovationYear = (el) => {
    setFormData({
      ...data,
      renovationYear: el.target.name,
    });
  };


  return (
    <div className='step-three'>
      <span className="step-title">Step 3</span>
      <h4>
        <span>
          { selectedProperty === 'house' ? 'home': selectedProperty }
        </span> details <span className="optional">(Optional)</span>
      </h4>
      <div className="group-block d-flex flex-column">
        <span className="form-label">Prestige / quality of the home</span>
        <ButtonGroup aria-label='prestige' className='custom-btn-group'>
          <Button
            name='basic'
            onClick={ selectPrestige }
            className={ `first-btn ${ data.prestige === 'basic' ? 'custom-active' : '' }` }
          >
            Basic
          </Button>
          <Button
            name='average'
            className={ data.prestige === 'average' ? 'custom-active' : '' }
            onClick={ selectPrestige }
          >
            Average +
          </Button>
          <Button
            name='luxury'
            onClick={ selectPrestige }
            className={ `last-btn ${ data.prestige === 'luxury' ? 'custom-active' : '' }` }
          >
            Luxury
          </Button>
        </ButtonGroup>
      </div>
      <div className="group-block d-flex flex-column">
        <span className="form-label">Property condition</span>
        <ButtonGroup aria-label='condition' className='custom-btn-group'>
          <Button
            name='new'
            className={ `first-btn ${ data.condition === 'new' ? 'custom-active' : '' }` }
            onClick={ selectCondition }
          >
            New
          </Button>
          <Button
            name='good'
            className={ data.condition === 'good' ? 'custom-active' : '' }
            onClick={ selectCondition }
          >
            Good
          </Button>
          <Button
            name='renovate'
            className={ `last-btn ${ data.condition === 'renovate' ? 'custom-active' : '' }` }
            onClick={ selectCondition }
          >
            To renovate
          </Button>
        </ButtonGroup>
      </div>
      <Form>
        <Form.Group controlId="construction-year">
          <Form.Label>Construction year</Form.Label>
          <Dropdown>
            <Dropdown.Toggle>
              { data.constructionYear }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                constructionYearList.map((item, index) =>
                  <Dropdown.Item
                    key={ index }
                    className={ data.constructionYear === item.label ? 'active' : '' }
                    name={ item.label }
                    onClick={ handleSelectConstructionYear }
                  >
                    { item.label }
                    <img src={ CheckedIcon } alt="CheckedIcon"/>
                  </Dropdown.Item>,
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="renovated">
          <Form.Label>Renovated</Form.Label>
          <Dropdown>
            <Dropdown.Toggle>
              { data.renovationYear }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                renovatedYearList.map((item, index) =>
                  <Dropdown.Item
                    key={ index }
                    className={ data.renovationYear === item.label ? 'active' : '' }
                    name={ item.label }
                    onClick={ handleSelectRenovationYear }
                  >
                    { item.label }
                    <img src={ CheckedIcon } alt="CheckedIcon"/>
                  </Dropdown.Item>,
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <InputGroup>
          <Form.Label className='d-flex'>
            <Form.Check
              value={ data.renovated }
              name='renovated'
              onChange={ handleChangeVal }
              type="checkbox"
            />
            Renovation level
          </Form.Label>
          <div className="input-block">
            <Form.Control
              name='renovationLevel'
              disabled={ !data.renovated }
              value={ data.renovationLevel }
              type="number"
              onChange={ handleChangeVal }
            />
            <InputGroup.Append>
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Append>
          </div>
        </InputGroup>
        <InputGroup className='range'>
          <InputGroup.Prepend className='prepend'>
            <InputGroup.Text>0%</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name='renovationLevel'
            disabled={ !data.renovated }
            value={ data.renovationLevel }
            type="range"
            onChange={ handleChangeVal }
            min={ 0 }
            max={ 100 }
          />
          <InputGroup.Append className='append'>
            <InputGroup.Text>100%</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        {
          selectedProperty === 'apartment' &&
          <InputGroup>
            <Form.Label>Number of floors</Form.Label>
            <div className="input-block input-border-radius-0">
              <InputGroup.Prepend>
                <InputGroup.Text onClick={ handleSubtractNumber }>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={ data.numberFloors } readOnly type="number"/>
              <InputGroup.Append>
                <InputGroup.Text onClick={ handleAddNumber}>+</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
        }
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

export default StepThree;