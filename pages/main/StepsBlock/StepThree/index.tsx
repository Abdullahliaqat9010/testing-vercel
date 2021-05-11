import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';

import IconBack from '../../../../assets/images/long-arrow.svg';

import { goToNextStepAction, goToPrevStepAction, setDetailsAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

const StepThree = () => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();

  const {
    prestige,
    condition,
    constructionYear,
    renovationYear,
    renovationLevel,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.details);
  const {selectedProperty} = useSelector((state: RootState) => state.stepsInfo.stepBlock);

  const [data, setFormData] = useState({
    prestige,
    condition,
    constructionYear,
    renovationYear,
    renovationLevel,
  });

  const [noValidRenYear, setValidRenYear] = useState(false);

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const handleClickNextBtn = () => {
    const validData = {...data};

    if (+validData.constructionYear > new Date().getFullYear()) {
      validData.constructionYear = String(new Date().getFullYear());
    }

    if (+validData.renovationYear > new Date().getFullYear()) {
      validData.renovationYear = String(new Date().getFullYear());
    }

    dispatch(setDetailsAction(validData));
    dispatch(goToNextStepAction());
  };

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    if (el.target.name === 'renovationYear' || el.target.name === 'constructionYear') {
      setFormData({
        ...data,
        [el.target.name]: +el.target.value < 0 ? +el.target.value * -1
          : +el.target.value > new Date().getFullYear() ? new Date().getFullYear() : el.target.value,
      });
    } else {
      setFormData({
        ...data,
        [el.target.name]: el.target.value,
      });
    }

    if (el.target.name === 'renovationYear') {
      setValidRenYear(el.target.value.length > 3 && checkIfValidYears(el.target.value));
    }
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

  const setRenovationLevel = () => {
    if (data.renovationYear && Number(data.renovationLevel) === 0) {
      setFormData({
        ...data,
        renovationLevel: '25',
      });
    }
  };

  const checkIfValidYears = (renovationYear) => {
    return Number(data.constructionYear) && Number(renovationYear) < Number(data.constructionYear);
  };

  const checkMinValue = (name: string, value: string) => {
    setFormData({
      ...data,
      [name]: data[name] < value ? value : data[name],
    });

    setRenovationLevel();
  };

  return (
    <div className='step-three'>
      <span className="step-title">{ t('span.step') } 3</span>
      <h4>
        <span>
          { selectedProperty === 'house' ? 'home' : selectedProperty }
        </span> details <span className="optional">({ t('title.optional') })</span>
      </h4>
      <div className="group-block d-flex flex-column">
        <span className="form-label">{ t('title.prestige') }</span>
        <ButtonGroup aria-label='prestige' className='custom-btn-group'>
          <Button
            name='basic'
            onClick={ selectPrestige }
            className={ `first-btn ${ data.prestige === 'basic' ? 'custom-active' : '' }` }
          >
            { t('button.basic') }
          </Button>
          <Button
            name='average'
            className={ data.prestige === 'average' ? 'custom-active' : '' }
            onClick={ selectPrestige }
          >
            { t('button.average') }
          </Button>
          <Button
            name='luxury'
            onClick={ selectPrestige }
            className={ `last-btn ${ data.prestige === 'luxury' ? 'custom-active' : '' }` }
          >
            { t('button.luxury') }
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
            { t('button.new') }
          </Button>
          <Button
            name='good'
            className={ data.condition === 'good' ? 'custom-active' : '' }
            onClick={ selectCondition }
          >
            { t('button.good') }
          </Button>
          <Button
            name='renovate'
            className={ `last-btn ${ data.condition === 'renovate' ? 'custom-active' : '' }` }
            onClick={ selectCondition }
          >
            { t('button.renovate') }
          </Button>
        </ButtonGroup>
      </div>
      <Form>
        <InputGroup>
          <Form.Label>{ t('label.construction-year') }</Form.Label>
          <div className="input-block">
            <Form.Control
              className='constructionYear'
              name='constructionYear'
              min={ 1800 }
              max={ new Date().getFullYear() }
              value={ data.constructionYear }
              type="number"
              onBlur={ () => checkMinValue('constructionYear', '1800') }
              onChange={ handleChangeVal }
            />
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label>{ t('label.renovated') }</Form.Label>
          <div className="input-block d-flex flex-column">
            <Form.Control
              className='renovationYear'
              name='renovationYear'
              min={ 1920 }
              max={ new Date().getFullYear() }
              value={ data.renovationYear }
              type="number"
              onBlur={ () => checkMinValue('renovationYear', '1920') }
              onChange={ handleChangeVal }
              isInvalid={ noValidRenYear }
            />
            <Form.Control.Feedback type="invalid">
              Renovation year can't be before construction year
            </Form.Control.Feedback>
          </div>
        </InputGroup>
        <InputGroup>
          <Form.Label className='d-flex'>
            { t('label.renovation-level') }
          </Form.Label>
          <div className="input-block">
            <Form.Control
              min={ 0 }
              name='renovationLevel'
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
          <img src={ IconBack } alt="IconBack"/>{ t('button.back') }
        </Button>
        <Button onClick={ handleClickNextBtn } className='next-step'>{ t('button.next') }</Button>
      </div>
    </div>
  );
};

export default StepThree;