import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

import ArrowIcon from '../../../../assets/images/arrow-blue.svg';
import ValidIcon from '../../../../assets/images/valid.svg';

import {
  checkIfEmailExistAction,
  goToPrevStepAction,
  sendStepsDataRequestAction,
  setUserDataAction,
} from '../../../../actions';
import { RootState } from '../../../../types/state';

import IconBack from '../../../../assets/images/long-arrow.svg';
import { generatePropertyData } from '../../../../utils/generatePropertyData';

const FinalStep = () => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();
  const router = useRouter();
  const {locale} = router;
  const {
    addressFromStepOne,
    additionalAddress,
    location,
    selectedProperty,
    propertyDetails,
    details,
    utilities,
    personalAccount,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const {existEmail} = useSelector((state: RootState) => state.userInfo);

  const [data, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    promotions: false,
    agreement: false,
  });

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const handleChecked = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.checked,
    });
  };

  const propertyData = () => {
    return {
      owner: Boolean(personalAccount.selectedItem === 'homeowner'),
      interest: String(personalAccount.sellProperty),
      selling_way: String(personalAccount.howSell).length ? String(personalAccount.howSell) : undefined,
      residence_type: String(personalAccount.selectedResidence),
      ...generatePropertyData(
        addressFromStepOne,
        additionalAddress,
        selectedProperty,
        propertyDetails,
        details,
        utilities,
        location
      )
    }
  };

  const handleSubmit = () => {
    if (isDisabled) {
      dispatch(setUserDataAction(data));
      dispatch(sendStepsDataRequestAction({
        property: propertyData(),
        user: {...data},
        locale
      }));
    }
    return false;
  };

  const isDisabled = () => {
    if (!data.firstName) {
      return true;
    }

    if (!data.lastName) {
      return true;
    }

    if (!data.email) {
      return true;
    }

    if (!data.agreement) {
      return true;
    }

    return data.password !== data.confirmPassword;
  };

  const checkIfPasswordsEqual = () => {
    return data.password && data.confirmPassword && data.password === data.confirmPassword;
  };

  const handleClickPrevBtn = () => {
    dispatch(goToPrevStepAction());
  };

  const checkIfEmailExist = (value: string) => {
    dispatch(checkIfEmailExistAction(value));
  };

  const goToLogin = () => {
    window.sessionStorage.setItem('forgotLogin', JSON.stringify(propertyData()));
    router.push('/login');
  };

  return (
    <div className='final-step'>
      <span className="step-title">{ t('title.good-job') }</span>
      <h4>{ t('title.estimation-ready') }</h4>
      <span className="step-desc">
        { t('desc.finalized-estimation') }
      </span>
      <span className="have-account" onClick={ goToLogin }>
        { t('link.already-have-account') }
        <img src={ ArrowIcon } alt="ArrowIcon"/>
      </span>
      <Form>
        <Form.Row className='mb-4'>
          <Form.Group>
            <Form.Label>{ t('label.first-name') }</Form.Label>
            <Form.Control
              value={ data.firstName }
              name='firstName'
              onChange={ handleChangeVal }
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{ t('label.last-name') }</Form.Label>
            <Form.Control
              value={ data.lastName }
              name='lastName'
              onChange={ handleChangeVal }
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group className='mb-4'>
          <Form.Label>{ t('label.email') }</Form.Label>
          <Form.Control
            value={ data.email }
            name='email'
            onBlur={ (el) => checkIfEmailExist(el.target.value) }
            onChange={ handleChangeVal }
            type="email"
            isInvalid={existEmail}
          />
          <Form.Control.Feedback type="invalid">
            Email already exists. click on I already have an account to login
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>{ t('label.phone') }({ t('title.optional') })</Form.Label>
          <Form.Control
            value={ data.phone_number }
            name='phone_number'
            onChange={ handleChangeVal }
            type="text"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group>
            <Form.Label>{ t('label.password') }</Form.Label>
            <Form.Control
              value={ data.password }
              name='password'
              onChange={ handleChangeVal }
              type="password"
            />
            {
              data.password.length > 0 && <img src={ ValidIcon } alt="ValidIcon"/>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>{ t('label.confirm-password') }</Form.Label>
            <Form.Control
              value={ data.confirmPassword }
              name='confirmPassword'
              onChange={ handleChangeVal }
              type="password"
            />
            {
              checkIfPasswordsEqual() && <img src={ ValidIcon } alt="ValidIcon"/>
            }
          </Form.Group>

        </Form.Row>
        <span className='recommendation'>
          { t('desc.strongly-recommend') }
        </span>
        <Form.Check
          checked={ data.promotions }
          name='promotions'
          onChange={ handleChecked }
          label={ t('label.promotions') }
        />
        <div className='d-flex'>
          <Form.Check
            checked={ data.agreement }
            name='agreement'
            onChange={ handleChecked }
          />
          <Form.Label className='fs-16'>
            { t('label.read-privacy') }
            <a href="https://winleads.eu/privacy-cookie-policy" target='_blank'>{ t('label.privacy') }</a>
            { t('label.terms') }
          </Form.Label>
        </div>
      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>{ t('button.back') }
        </Button>
        <Button className='next-step' disabled={ isDisabled() } onClick={ handleSubmit }>
          { t('button.create-account') }
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;