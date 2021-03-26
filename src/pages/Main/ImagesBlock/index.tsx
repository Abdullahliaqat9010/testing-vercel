import React from 'react';
import { Carousel } from 'react-bootstrap';

import FirstRightItem from '../../../assets/images/main-page/slider/first-right.png';
import FirstLeftItem from '../../../assets/images/main-page/slider/first-left.png';
import SecondItem from '../../../assets/images/main-page/slider/second-right.png';
import ThirdLeftItem from '../../../assets/images/main-page/slider/third-left.png';
import ThirdRightItem from '../../../assets/images/main-page/slider/third-right.png';

const ImagesBlock = () => {
  return (
    <div className='image-carousel'>
      <Carousel fade controls={false} indicators={false} interval={3000} pause={false}>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ FirstLeftItem } alt="First slide left"/>
          <img src={ FirstRightItem } alt="First slide right"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ FirstLeftItem } alt="Second slide left"/>
          <img src={ SecondItem } alt="Second slide"/>
        </Carousel.Item>
        <Carousel.Item className='d-flex justify-content-between'>
          <img src={ ThirdLeftItem } alt="Third slide left"/>
          <img src={ ThirdRightItem } alt="Third slide right"/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImagesBlock;