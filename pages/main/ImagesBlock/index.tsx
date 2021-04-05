import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Carousel } from 'react-bootstrap';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import { openMainStepsAction } from '../../../actions';

import { googleMapConfig } from '../../../config/siteConfigs';

import FirstRightItem from '../../../assets/images/main-page/slider/first-right.png';
import FirstLeftItem from '../../../assets/images/main-page/slider/first-left.png';
import SecondLeftItem from '../../../assets/images/main-page/slider/second-left.png';
import SecondRightItem from '../../../assets/images/main-page/slider/second-right.png';

const ImagesBlock = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [geoLocation, setGeoLocation] = useState({});

  const handleChangeValue = (el: any) => {
    setValue(el);
    geocodeByAddress(el.label)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        console.log('Successfully got latitude and longitude');
        setGeoLocation({lat, lng});
      });
  };

  const goToMainSteps = () => {
    if (!value) {
      return false;
    }

    const data = {
      infoFromAutoComplete: value.label,
      location: {...geoLocation},
    };

    dispatch(openMainStepsAction(data));
  };

  return (
    <div className='image-carousel'>
      <Carousel fade controls={ false } indicators={ false } interval={ 3000 } pause={ false }>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ FirstLeftItem } alt="First slide left"/>
          <img src={ FirstRightItem } alt="First slide right"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ SecondLeftItem } alt="Second slide left"/>
          <img src={ SecondRightItem } alt="Second slide right"/>
        </Carousel.Item>
      </Carousel>
      <div className="image-carousel__popup">
        <h2>What's the value of your home?</h2>
        <p>Discover it in three easy steps</p>
        <div className='w-100'>
          <GooglePlacesAutocomplete
            selectProps={ {
              placeholder: 'Enter your property address',
              value,
              onChange: handleChangeValue,
            } }
            apiKey={ googleMapConfig.apiKey }
            apiOptions={ {language: 'en'} }
          />
        </div>
        <Button disabled={ !value } onClick={ goToMainSteps }>Get Free Estimation</Button>
        <p className="gray">* ONLY FOR SELLER OWNERS</p>
      </div>
    </div>
  );
};

export default ImagesBlock;
