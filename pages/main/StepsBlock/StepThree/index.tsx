import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';

import { goToNextStepAction, goToPrevStepAction, setDetailsAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepThree = () => {
  const dispatch = useDispatch();

  const {
    prestige,
    condition,
    constructionYear,
    renovated,
    renovationYear,
    renovationLevel,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.details);

  const [data, setFormData] = useState({
    prestige,
    condition,
    constructionYear,
    renovated,
    renovationYear,
    renovationLevel,
  });

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    console.log(data);
      dispatch(setDetailsAction(data));
      dispatch(goToNextStepAction());
    return false;
  };

  const handleChangeVal = (el) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.name === 'renovated' ? el.target.checked : el.target.value,
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

  const disabledButton = () => {
    return false;
  };

  return (
    <div className='step-three'>
      <span className="step-title">Step 3</span>
      <h4>Home details <span className="optional">(Optional)</span></h4>
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
          <Form.Control
            name='constructionYear'
            onChange={handleChangeVal}
            as="select"
            className='custom-select'
            value={data.constructionYear}
          >
            <option>1998</option>
            <option>1999</option>
            <option>2000</option>
            <option>2001</option>
            <option>2002</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="renovated">
          <Form.Label>Renovated</Form.Label>
          <Form.Control
            name='renovationYear'
            onChange={handleChangeVal}
            value={data.renovationYear}
            as="select"
            className='custom-select'
          >
            <option>2006</option>
            <option>2007</option>
            <option>2008</option>
            <option>2009</option>
            <option>2010</option>
          </Form.Control>
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

export default StepThree;