import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import { Button, Image } from 'react-bootstrap';

import LoadMoreImage from '../../../assets/images/load-more.svg';
import FacebookImage from '../../../assets/images/facebook-icon.svg';

import { testimonialList } from '../../../templates/testimonialList';
import RatingStar from '../../../assets/images/rating/full-star.svg';

const TestimonialsBlock = () => {
  return (
    <div className='testimonials container'>
      <h4>Testimonials</h4>
      <div className="testimonials__list">
        {
          testimonialList.map((item, index) => (
            <div key={ index } className="testimonials__item">
              <div className="user-block d-flex justify-content-between align-items-start">
                <div className='left-block d-flex'>
                  <Image className='avatar' src={ item.avatar } roundedCircle/>
                  <div className='d-flex flex-column align-items-start'>
                    <span className='full-name'>{ item.name } { item.surname }</span>
                    <StarRatingComponent
                      name="rate"
                      renderStarIcon={ () => <img className='rating-star' src={ RatingStar } alt="RatingStar"/> }
                      starCount={ 5 }
                      value={ Number(item.rating) }
                    />
                  </div>
                </div>
                <Image src={ FacebookImage } alt='FacebookImage'/>
              </div>
              <span className="desc">"{ item.desc }"</span>
            </div>
          ))
        }
        <Button className='load-more'>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>Load More
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsBlock;