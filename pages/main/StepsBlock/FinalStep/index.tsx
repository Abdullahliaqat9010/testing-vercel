import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import ArrowIcon from '../../../../assets/images/arrow-blue.svg';
import ValidIcon from '../../../../assets/images/valid.svg';

import { goToPrevStepAction, sendStepsDataRequestAction, setUserDataAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

import IconBack from '../../../../assets/images/long-arrow.svg';

const FinalStep = () => {
  const dispatch = useDispatch();
  const {
    addressFromStepOne,
    additionalAddress,
    location,
    selectedProperty,
    propertyDetails
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [data, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    promotions: false,
    agreement: false,
  });

  const handleChangeVal = (el) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const handleChecked = (el) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.checked,
    });
  };

  const handleSubmit = () => {
    if (isDisabled) {
      dispatch(setUserDataAction(data));
      dispatch(sendStepsDataRequestAction({
        property: {
          search_address: addressFromStepOne,
          lat: location.lat,
          lng: location.lng,
          property_type: selectedProperty,
          live_area: +propertyDetails.livingArea,
          total_area: +propertyDetails.landSurface,
          bedrooms: propertyDetails.numberBedrooms,
          bathrooms: propertyDetails.numberBathrooms,
          levels: propertyDetails.numberLevels,
          street: additionalAddress.street,
          street_number: additionalAddress.number,
          zip: additionalAddress.zip,
          locality: +additionalAddress.locality
        },
        user: {...data}
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

  return (
    <div className='final-step'>
      <span className="step-title">Good job!</span>
      <h4>Your estimation is ready!</h4>
      <span className="step-desc">
        We finalized your estimation and personal report. You need to create an account or use existing
        account to review it.
      </span>
      <span className="have-account">
        I already have an account
        <img src={ ArrowIcon } alt="ArrowIcon"/>
      </span>
      <Form>
        <Form.Row className='mb-4'>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              value={ data.firstName }
              name='firstName'
              onChange={ handleChangeVal }
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              value={ data.lastName }
              name='lastName'
              onChange={ handleChangeVal }
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group className='mb-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={ data.email }
            name='email'
            onChange={ handleChangeVal }
            type="email"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group>
            <Form.Label>Password</Form.Label>
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
            <Form.Label>Confirm password</Form.Label>
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
          We strongly recommend to use strong password, with at least one symbol and digit.
        </span>
        <Form.Check
          checked={ data.promotions }
          name='promotions'
          onChange={ handleChecked }
          label="I’d like to receive occasional promotions by email."
        />
        <Form.Check
          checked={ data.agreement }
          name='agreement'
          onChange={ handleChecked }
          label="I have read and agree to service Privacy Policy and Terms and conditions"
        />

      </Form>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button
          onClick={ handleClickPrevBtn }
          className='prev-step'>
          <img src={ IconBack } alt="IconBack"/>Back
        </Button>
        <Button className='next-step' disabled={ isDisabled() } onClick={ handleSubmit }>Create an account</Button>
      </div>
    </div>
  );
};

export default FinalStep;