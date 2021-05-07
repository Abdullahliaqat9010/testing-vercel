import React, { useState } from 'react';

import { isMobile } from 'react-device-detect';
import StarRatingComponent from 'react-star-rating-component';
import { useTranslation } from 'next-i18next';

import { Button, Image } from 'react-bootstrap';

import LoadMoreImage from '../../../assets/images/load-more.svg';
import FacebookImage from '../../../assets/images/facebook-icon.svg';
import RatingStar from '../../../assets/images/rating/full-star.svg';
import RatingStarEmpty from '../../../assets/images/rating/star.svg';

import { testimonialList } from '../../../templates/testimonialList';

const TestimonialsBlock = () => {
  const { t } = useTranslation('main-page');
  const elementsOnPage = 3;
  const [sizeArr, setSizeArr] = useState(3);
  const testimonials = isMobile ? testimonialList.slice(0, sizeArr) : testimonialList;

  const loadMore = () => {
    setSizeArr(sizeArr + elementsOnPage);
  }

  return (
    <div className='testimonials container'>
      <h4>{t('title.testimonials')}</h4>
      <div className="testimonials__list">
        {
          testimonials.map((item, index) => (
            <div key={ index } className="testimonials__item">
              <div className="user-block d-flex justify-content-between align-items-start">
                <div className='left-block d-flex'>
                  <Image className='avatar' src={ item.avatar } roundedCircle/>
                  <div className='d-flex flex-column align-items-start'>
                    <span className='full-name'>{ t(item.slug+'.testimonial.title') }</span>
                    <StarRatingComponent
                      name="rate"
                      renderStarIcon={
                        (index, value) =>
                          <img
                            className='rating-star'
                            src={ index <= value ? RatingStar : RatingStarEmpty }
                            alt="RatingStar"
                          />
                      }
                      starCount={ 5 }
                      value={ Number(item.rating) }
                    />
                  </div>
                </div>
                <Image src={ FacebookImage } alt='FacebookImage'/>
              </div>
              <span className="desc">"{ t(item.slug+'.testimonial.desc') }"</span>
            </div>
          ))
        }
        <Button className='load-more' onClick={loadMore}>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>{t('button.load-more')}
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsBlock;