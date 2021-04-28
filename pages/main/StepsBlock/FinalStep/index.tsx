import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

import ArrowIcon from '../../../../assets/images/arrow-blue.svg';
import ValidIcon from '../../../../assets/images/valid.svg';

import { goToPrevStepAction, sendStepsDataRequestAction, setUserDataAction } from '../../../../actions';
import { RootState } from '../../../../types/state';

import IconBack from '../../../../assets/images/long-arrow.svg';

const FinalStep = () => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();
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

  const handleSubmit = () => {
    if (isDisabled) {
      dispatch(setUserDataAction(data));
      dispatch(sendStepsDataRequestAction({
        property: {
          search_address: String(addressFromStepOne),
          country: String(additionalAddress.country),
          street: String(additionalAddress.street),
          street_number: String(additionalAddress.number),
          zip: String(additionalAddress.zip),
          locality: String(additionalAddress.locality),
          property_type: String(selectedProperty),
          live_area: Number(propertyDetails.livingArea),
          total_area: selectedProperty !== 'apartment' ? Number(propertyDetails.landSurface) : undefined,
          bedrooms: Number(propertyDetails.numberBedrooms),
          bathrooms: Number(propertyDetails.numberBathrooms),
          floor: Number(propertyDetails.numberLevels),
          levels: Number(propertyDetails.numberFloors),
          prestige: String(details.prestige),
          facades: Number(propertyDetails.facadesNumber),
          construction_year: Number(details.constructionYear) || undefined,
          terras_size: propertyDetails.gardenTerras ? Number(propertyDetails.gardenTerrasValue) : undefined,
          renov_year: details.renovated ? Number(details.renovationYear) : undefined,
          renov_level: details.renovated ? Number(details.renovationLevel) : undefined,
          epc: Number(utilities.epc) || undefined,
          view: String(utilities.view),
          orientation_terras: String(utilities.orientation),
          attic: Number(utilities.atticValue) || undefined,
          cellar: Number(utilities.cellarValue) || undefined,
          elevator: Boolean(utilities.elevator),
          pool: Boolean(utilities.swimmingPool),
          indoor_garage: utilities.parking ? Number(utilities.indoorGarage) : undefined,
          outdoor_garage: utilities.parking ? Number(utilities.outdoorGarage) : undefined,
          carport: utilities.parking ? Number(utilities.carport) : undefined,
          solar_panels: Number(utilities.solarPanels),
          owner: Boolean(personalAccount.selectedItem === 'homeowner'),
          interest: String(personalAccount.sellProperty),
          selling_way: String(personalAccount.howSell).length ? String(personalAccount.howSell) : undefined,
          state: String(details.condition),
          source: 'immoBelgium',
          status: 'for_sale',
          residence_type: String(personalAccount.selectedResidence),
          lat: String(location.lat),
          lng: String(location.lng),
        },
        user: {...data},
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
      <span className="step-title">{ t('title.good-job') }</span>
      <h4>{ t('title.estimation-ready') }</h4>
      <span className="step-desc">
        { t('desc.finalized-estimation') }
      </span>
      <span className="have-account">
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
            onChange={ handleChangeVal }
            type="email"
          />
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
            <a href="https://winleads.eu/privacy-cookie-policy" target='_blank'>{t('label.privacy')}</a>
            {t('label.terms')}
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