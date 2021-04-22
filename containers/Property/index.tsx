import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

import { Button, Image } from 'react-bootstrap';

import { PropertyContainerProps } from '../../types/properties';
import ArrowImage from '../../assets/images/arrow-blue.svg';


const PropertyContainer = ({property}: PropertyContainerProps) => {
  const {t} = useTranslation('dashboard-page');
  return (
    <div className='property-block d-flex'>
      <div className="property-block__image">
        <Image src={ isMobile && property.imgMobile ? property.imgMobile : property.img } rounded/>
      </div>
      <div className="property-block__info">
        <span className="address">{ property.address }</span>
        <div className='short-desc'>
          <div className="house-info">
            <span>{ property.square }m²</span>
            <span>{ property.bath } Baths</span>
            <span>{ property.beds } Beds</span>
          </div>
          <div className="time">
            <span>{ t('desc.sold') } 3 { t('desc.months-ago') }</span> <a href="#">{ t('link.real-estate-agent') }</a>
          </div>
        </div>
        <Button variant="outline-primary">{ t('button.request-price') }
        <img src={ ArrowImage } alt="ArrowImage"/>
        </Button>
      </div>
    </div>
  );
};
export default PropertyContainer;