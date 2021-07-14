import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Carousel, FormControl, InputGroup } from 'react-bootstrap';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

import { clearAutocompleteItems, getAutocompleteItemsAction, openMainStepsAction } from '../../../actions';

import FirstSlide from '../../../assets/images/main-page/slider/first-slide.jpeg';
import FirstSlideTablet from '../../../assets/images/main-page/slider/first-slide-tablet.jpeg';
import FirstSlideMobile from '../../../assets/images/main-page/slider/first-slide-mobile.jpeg';
import SecondSlide from '../../../assets/images/main-page/slider/second-slide.jpeg';
import SecondSlideTablet from '../../../assets/images/main-page/slider/second-slide-tablet.jpeg';
import SecondSlideMobile from '../../../assets/images/main-page/slider/second-slide-mobile.jpeg';
import ThirdSlide from '../../../assets/images/main-page/slider/third-slide.jpeg';
import ThirdSlideTablet from '../../../assets/images/main-page/slider/third-slide-tablet.jpeg';
import ThirdSlideMobile from '../../../assets/images/main-page/slider/third-slide-mobile.jpeg';
import { RootState } from '../../../types/state';

const ImagesBlock = () => {
  const {t} = useTranslation('main-page');
  const {dataFromMapBox} = useSelector((state: RootState) => state.stepsInfo);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    lng: null,
  });

  const [dataInfo, setData] = useState({});

  const goToMainSteps = () => {
    if (value.length === 0) {
      return false;
    }

    const data = {
      infoFromAutoComplete: value,
      location: {...geoLocation},
      additionalAddress: {...dataInfo},
    };

    dispatch(openMainStepsAction(data));
  };

  const handleAutocomplete = (el: React.ChangeEvent<HTMLInputElement>) => {
    setValue(el.target.value);
    if (el.target.value.length > 0) {
      dispatch(getAutocompleteItemsAction(el.target.value, el.target.name));
    } else {
      dispatch(clearAutocompleteItems());
    }
  };

  const handleSelectAddress = (addressId: string) => {
    const [currentAddress] = dataFromMapBox.filter(list => list.id === addressId);
    setValue(currentAddress.fullAddress);

    const dataForNextStep = {
      locality: currentAddress.locality.length > 1 ? currentAddress.locality : currentAddress.place,
      number: currentAddress.number,
      street: currentAddress.street,
      zip: currentAddress.postcode,
      country: currentAddress.country,
    };

    setData({...dataForNextStep});
    setGeoLocation(currentAddress.location);
    dispatch(clearAutocompleteItems());
  };

  const renderImage = (slideNumber: string) => {
    if (isMobileOnly) {
      switch (slideNumber) {
        case 'first':
          return FirstSlideMobile
        case 'second':
          return SecondSlideMobile
        default:
          return ThirdSlideMobile
      }
    }

    if (isTablet) {
      switch (slideNumber) {
        case 'first':
          return FirstSlideTablet
        case 'second':
          return SecondSlideTablet
        default:
          return ThirdSlideTablet
      }
    }

    switch (slideNumber) {
      case 'first':
        return FirstSlide
      case 'second':
        return SecondSlide
      default:
        return ThirdSlide
    }

    return;
  }

  return (
    <div className='image-carousel'>
      <Carousel fade controls={ false } indicators={ false } interval={ 3000 } pause={ false }>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ renderImage('first') } alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ renderImage('second') } alt="Second slide"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ renderImage('third') } alt="Third slide"/>
        </Carousel.Item>
      </Carousel>
      <div className="image-carousel__popup">
        <h1>{ t('title.image-block') }</h1>
        <div className='w-100'>
          <div className="custom-autocomplete position-relative">
            <InputGroup>
              <FormControl
                placeholder={ t('placeholder.enter-property-address') }
                name='address'
                onChange={ handleAutocomplete }
                value={ value }
                autoComplete='off'
              />
            </InputGroup>
            {
              dataFromMapBox.length > 0 &&
              <ul className='autocomplete-list'>
                {
                  dataFromMapBox.map((item, index) =>
                    <li onClick={ () => handleSelectAddress(item.id) } key={ index }>{ item.fullAddress }</li>,
                  )
                }
              </ul>
            }
          </div>
        </div>
        <Button disabled={ !geoLocation.lng && !geoLocation.lng } onClick={ goToMainSteps }>
          { t('button.get-free-estimation') }
        </Button>
      </div>
    </div>
  );
};

export default ImagesBlock;