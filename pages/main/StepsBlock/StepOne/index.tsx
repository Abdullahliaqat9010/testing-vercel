import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import GoogleMap from '../../../../components/GoogleMap';

import { goToNextStepAction, setActivePropertyAction, setAdditionalAddressAction } from '../../../../actions';
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
  const dispatch = useDispatch();
  const {
    street,
    number,
    boxNumber,
    locality,
    zip,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.additionalAddress);
  const {selectedProperty: currentProp} = useSelector((state: RootState) => state.stepsInfo.stepBlock);
  const [selectedProperty, setCurrentProperty] = useState<string>(currentProp);
  const [showMapBlock, setShowMapBlock] = useState<boolean>(false);
  const [showAddressBlock, changeAddressBlockState] = useState<boolean>(true);
  const [data, setFormData] = useState({
    street,
    number,
    boxNumber,
    zip,
    locality,
  });

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });
  };

  const handleClickNextBtn = () => {
    if(disabledButton) {
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
  }

  const closeAddressBlock = () => {
    changeAddressBlockState(false);
  }

  return (
    <div className='step-one'>
      <span className="step-title">Step 1</span>
      <h4>Address</h4>
      <Form>
        <Form.Row>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <InputGroup>
              <Form.Control name='street' value={ data.street } onChange={ handleChangeVal }/>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="number">
            <Form.Label>№</Form.Label>
            <Form.Control type="number" name='number' value={ data.number } onChange={ handleChangeVal }/>
          </Form.Group>
          <Form.Group controlId="boxNumber">
            <Form.Label>Box №</Form.Label>
            <Form.Control type="number" name='boxNumber' value={ data.boxNumber } onChange={ handleChangeVal }/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className='mr-4' controlId="zip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control type="number" name='zip' value={ data.zip } onChange={ handleChangeVal }/>
          </Form.Group>
          <Form.Group controlId="locality">
            <Form.Label>Locality</Form.Label>
            <Form.Control name='locality' value={ data.locality } onChange={ handleChangeVal }/>
          </Form.Group>
        </Form.Row>
      </Form>
      {
        isMobile && <span className='pick-on-map' onClick={showMap}>
          <img src={ MarkerImage } alt="marker"/>Pick on map
        </span>
      }
      <h5>Property Type</h5>
      <div className="properties d-flex justify-content-between">
        <div
          onClick={ () => setActiveBlock('house') }
          className={ `property-home ${ selectedProperty === 'house' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'house' ? HomeImageActive : HomeImageNoActive } alt="house"/>
          <span className="title">Home</span>
          <div className="active-item"/>
        </div>
        <div
          onClick={ () => setActiveBlock('apartment') }
          className={ `property-apartment ${ selectedProperty === 'apartment' ? 'active' : '' }` }
        >
          <img src={ selectedProperty === 'apartment' ? ApartmentImageActive : ApartmentImageNoActive } alt="apartment"/>
          <span className="title">Apartment</span>
          <div className="active-item"/>
        </div>
        {/*<div*/}
        {/*  onClick={ () => setActiveBlock('land') }*/}
        {/*  className={ `property-land ${ selectedProperty === 'land' ? 'active' : '' }` }*/}
        {/*>*/}
        {/*  <img src={ selectedProperty === 'land' ? LandImageActive : LandImageNoActive } alt="land"/>*/}
        {/*  <span className="title">Land</span>*/}
        {/*  <div className="active-item"/>*/}
        {/*</div>*/}
      </div>
      <Button
        disabled={ disabledButton() }
        onClick={ handleClickNextBtn }
        type='submit'
        className='next-step'
      >
        Next
      </Button>
      {
        isMobile && showMapBlock &&
          <div className='mobile-map'>
            {
              showAddressBlock &&
              <div className="address-block">
                <span>2464 Royal Ln. Mesa, New Jersey 45463</span>
                <img onClick={closeAddressBlock} src={ CloseIcon } alt="CloseIcon"/>
              </div>
            }
            <GoogleMap />
            <span className="close-map" onClick={showMap}>Close</span>
          </div>
      }
    </div>
  );
};

export default StepTwo;