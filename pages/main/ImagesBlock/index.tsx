import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Carousel } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import { openMainStepsAction } from '../../../actions';

import { googleMapConfig } from '../../../config/siteConfigs';

import FirstSlide from '../../../assets/images/main-page/slider/first-slide.png';
import FirstSlideMobile from '../../../assets/images/main-page/slider/first-slide-mobile.png';
import SecondSlide from '../../../assets/images/main-page/slider/second-slide.png';
import SecondSlideMobile from '../../../assets/images/main-page/slider/second-slide-mobile.png';
import ThirdSlide from '../../../assets/images/main-page/slider/third-slide.png';
import ThirdSlideMobile from '../../../assets/images/main-page/slider/third-slide-mobile.png';

const ImagesBlock = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [geoLocation, setGeoLocation] = useState({});

  const handleChangeValue = async (el: any) => {
    setValue(el);
    const results = await geocodeByAddress(el.label);
    const getLocations = await getLatLng(results[0]);

    console.log('Successfully got latitude and longitude');
    setGeoLocation(getLocations);
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
          <img src={ isMobile ? FirstSlideMobile : FirstSlide } alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ isMobile ? SecondSlideMobile : SecondSlide } alt="Second slide"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ isMobile ? ThirdSlideMobile : ThirdSlide } alt="Third slide"/>
        </Carousel.Item>
      </Carousel>
      <div className="image-carousel__popup">
        <h2>Get your estimation in three easy steps</h2>
        <div className='w-100'>
          <GooglePlacesAutocomplete
            selectProps={ {
              placeholder: 'Enter your property address',
              value,
              onChange: handleChangeValue,
              classNamePrefix: 'custom-select',
            } }
            apiKey={ googleMapConfig.apiKey }
            apiOptions={ {language: 'en'} }
          />
        </div>
        <Button disabled={ !value } onClick={ goToMainSteps }>Get Free Estimation</Button>
      </div>
    </div>
  );
};

export default ImagesBlock;