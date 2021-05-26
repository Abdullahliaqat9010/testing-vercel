import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import GoogleMap from '../../../../components/GoogleMap';

import {
  goToNextStepAction,
  setActivePropertyAction,
  setAdditionalAddressAction,
  updateAddressList,
} from '../../../../actions';
import { RootState } from '../../../../types/state';

import HomeImageActive from '../../../../assets/images/home-active.svg';
import HomeImageNoActive from '../../../../assets/images/home-noactive.svg';
import ApartmentImageActive from '../../../../assets/images/apartment-active.svg';
import ApartmentImageNoActive from '../../../../assets/images/apartment-noactive.svg';
// import LandImageActive from '../../../../assets/images/land-active.svg';
// import LandImageNoActive from '../../../../assets/images/land-noactive.svg';
import MarkerImage from '../../../../assets/images/marker-blue.svg';
import CloseIcon from '../../../../assets/images/close-icon.svg';

const StepTwo = () => {
  const {t} = useTranslation('steps');
  const dispatch = useDispatch();
  const {
    street,
    number,
    locality,
    zip,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.additionalAddress);
  const {
    addressFromStepOne,
    selectedProperty: currentProp,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [selectedProperty, setCurrentProperty] = useState<string>(currentProp);
  const [showMapBlock, setShowMapBlock] = useState<boolean>(false);
  const [showAddressBlock, changeAddressBlockState] = useState<boolean>(true);
  const [data, setFormData] = useState({
    street,
    number,
    zip,
    locality,
  });

  const [error, setError] = useState({zip: ''});

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: +el.target.value < 0 ? +el.target.value * -1 : el.target.value,
    });
  };

  const handleClickNextBtn = () => {
    if (disabledButton) {
      dispatch(setAdditionalAddressAction(data));
      dispatch(goToNextStepAction());
    }
    return false;
  };

  const setActiveBlock = (item: string) => {
    setCurrentProperty(item);
    dispatch(setActivePropertyAction(item));
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
    if (!selectedProperty.length) {
      return true;
    }

    return !data.zip.length;
  };

  const showMap = () => {
    changeAddressBlockState(true);
    setShowMapBlock(!showMapBlock);
  };

  const closeAddressBlock = () => {
    changeAddressBlockState(false);
  };

  const getAddress = async (value: string) => {
    if (data.locality.length === 0 && value.length && (+value >= 1000 && +value <= 9999)) {
      try {
        setError({...error, zip: ''});
        const results = await geocodeByAddress(`postalCode=${ value }, location=bel`);
        const getLocations = await getLatLng(results[0]);
        const locality = results[0].address_components.filter(res => res.types[0] === 'locality')[0]?.short_name || '';
        setFormData({...data, locality});
        const addressList = {
          addressFromStepOne: results[0].formatted_address,
          location: {...getLocations},
        };
        dispatch(updateAddressList(addressList));
      } catch (e) {
        console.log(e);
      }
    } else {
      setError({...error, zip: 'please use only Belgium zip codes'});
    }

    if (data.zip.length === 0 && value.length) {
      try {
        const results = await geocodeByAddress(`postalCode='', locality=${ value }, location=bel`);
        const getLocations = await getLatLng(results[0]);
        const zip = results[0].address_components.filter(res => res.types[0] === 'postal_code')[0]?.short_name || '';
        setFormData({...data, zip});
        const addressList = {
          addressFromStepOne: results[0].formatted_address,
          location: {...getLocations},
        };
        dispatch(updateAddressList(addressList));
      } catch (e) {
        console.log(e);
      }
    }
  };


  return (
    <div className='step-one'>
      <span className="step-title">{ t('span.step') } 1</span>
      <h4>{ t('title.address') }</h4>
      <Form>
        <Form.Row>
          <Form.Group id='street' controlId="street">
            <Form.Label>{ t('label.street') }</Form.Label>
            <InputGroup>
              <Form.Control
                name='street'
                value={ data.street }
                onChange={ handleChangeVal }
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>№</Form.Label>
            <Form.Control type="number" min={ 1 } name='number' value={ data.number } onChange={ handleChangeVal }/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className='mr-4 custom-styles' controlId="zip">
            <Form.Label>{ t('label.zip') }</Form.Label>
            <Form.Control
              type="number"
              min={ 1000 }
              max={ 9999 }
              name='zip'
              value={ data.zip }
              onChange={ handleChangeVal }
              onBlur={ (el) => getAddress(el.target.value) }
            />
            {
              error.zip.length > 0 && <span className="error">{ error.zip }</span>
            }
          </Form.Group>
          <Form.Group controlId="locality">
            <Form.Label>{ t('label.locality') }</Form.Label>
            <Form.Control
              name='locality'
              value={ data.locality }
              onChange={ handleChangeVal }
              onBlur={ (el) => getAddress(el.target.value) }
            />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        isMobile && <span className='pick-on-map' onClick={ showMap }>
          <img src={ MarkerImage } alt="marker"/>{ t('span.pick-on-map') }
        </span>
      }
      <h5>{ t('title.property-type') }</h5>
      <div className="properties d-flex justify-content-between">
        <div
          onClick={ () => setActiveBlock('house') }
          className={ `property-home ${ selectedProperty === 'house' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'house' ? HomeImageActive : HomeImageNoActive } alt="house"/>
          <span className="title">{ t('select.home') }</span>
          <div className="active-item"/>
        </div>
        <div
          onClick={ () => setActiveBlock('apartment') }
          className={ `property-apartment ${ selectedProperty === 'apartment' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'apartment' ? ApartmentImageActive : ApartmentImageNoActive }
               alt="apartment"/>
          <span className="title">{ t('select.apartment') }</span>
          <div className="active-item"/>
        </div>
        {/*<div*/ }
        {/*  onClick={ () => setActiveBlock('land') }*/ }
        {/*  className={ `property-land ${ selectedProperty === 'land' ? 'active' : '' }` }*/ }
        {/*>*/ }
        {/*  <img src={ selectedProperty === 'land' ? LandImageActive : LandImageNoActive } alt="land"/>*/ }
        {/*  <span className="title">Land</span>*/ }
        {/*  <div className="active-item"/>*/ }
        {/*</div>*/ }
      </div>
      <Button
        disabled={ disabledButton() }
        onClick={ handleClickNextBtn }
        type='submit'
        className='next-step'
      >
        { t('button.next') }
      </Button>
      {
        isMobile && showMapBlock &&
        <div className='mobile-map'>
          {
            showAddressBlock &&
            <div className="address-block">
              <span>{ addressFromStepOne }</span>
              <img onClick={ closeAddressBlock } src={ CloseIcon } alt="CloseIcon"/>
            </div>
          }
          <GoogleMap />
          <span className="close-map" onClick={ showMap }>{ t('button.close') }</span>
        </div>
      }
    </div>
  );
};

export default StepTwo;