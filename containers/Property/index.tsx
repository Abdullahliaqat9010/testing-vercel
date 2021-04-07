import React from 'react';
import { isMobile } from 'react-device-detect';

import { Button, Image } from 'react-bootstrap';

import { PropertyContainerProps } from '../../types/properties';
import ArrowImage from '../../assets/images/arrow-blue.svg';

const PropertyContainer = ({property}: PropertyContainerProps) => {
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
            <span>Sold 3 months ago</span> <a href="#">Real Estate Agent</a>
          </div>
        </div>
        <Button variant="outline-primary">Request price <img src={ ArrowImage } alt="ArrowImage"/></Button>
      </div>
    </div>
  );
};
export default PropertyContainer;