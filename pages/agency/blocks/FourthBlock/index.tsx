import React from 'react';
import { Button, Form, ProgressBar } from 'react-bootstrap';

import LoadMoreImage from '../../../../assets/images/load-more.svg';
import ActiveStar from '../../../../assets/images/rating/full-star.svg';
import NoActiveStar from '../../../../assets/images/rating/dark-star.svg';
import NoActiveLightStar from '../../../../assets/images/rating/star.svg';
import MessageIcon from '../../../../assets/images/message-icon.svg';
import FlagIcon from '../../../../assets/images/flag.svg';
import Avatar from '../../../../assets/images/no-photo.png';

const FourthBlock = () => {
  return (
    <div className="Agency__fourth-block">
      <div className="main-content">
        <h3>Client reviews</h3>
        <p>for Century 21 - Patrimoine 24</p>
        <div className="main-rate-info">
          <div className="total-info">
            <div className="total-info__main">
              <div className="left-block">
                <span className="total">4.6</span>
                <div className="stars">
                  <img src={ ActiveStar } alt="ActiveStar"/>
                  <img src={ ActiveStar } alt="ActiveStar"/>
                  <img src={ ActiveStar } alt="ActiveStar"/>
                  <img src={ ActiveStar } alt="ActiveStar"/>
                  <img src={ ActiveStar } alt="ActiveStar"/>
                </div>
                <span className="from">From 125 reviews</span>
              </div>
              <div className="right-block">
                <div className='statistic'>
                  <span className='stars'>5</span>
                  <img src={ NoActiveStar } alt="NoActiveStar"/>
                  <ProgressBar now={ 96 }/>
                  <span>96%</span>
                </div>
                <div className='statistic'>
                  <span className='stars'>4</span>
                  <img src={ NoActiveStar } alt="NoActiveStar"/>
                  <ProgressBar now={ 3 }/>
                  <span>3%</span>
                </div>
                <div className='statistic'>
                  <span className='stars'>3</span>
                  <img src={ NoActiveStar } alt="NoActiveStar"/>
                  <ProgressBar now={ 1 }/>
                  <span>1%</span>
                </div>
                <div className='statistic'>
                  <span className='stars'>2</span>
                  <img src={ NoActiveStar } alt="NoActiveStar"/>
                  <ProgressBar now={ 0 }/>
                  <span>0%</span>
                </div>
                <div className='statistic mb-0'>
                  <span className='stars'>1</span>
                  <img src={ NoActiveStar } alt="NoActiveStar"/>
                  <ProgressBar now={ 0 }/>
                  <span>0%</span>
                </div>
              </div>
            </div>
            <div className="total-info__feedback">
              <p>Would you like to say a word about this agency?</p>
              <span className='leave-feedback'>
                <img src={ MessageIcon } alt="MessageIcon"/>
                Leave a feedback
              </span>
            </div>
          </div>
          <div className="sort-block">
            <Form.Control className='custom-select' as="select" defaultValue="All reviews">
              <option>All reviews</option>
              <option>...</option>
              <option>...</option>
            </Form.Control>
            <Form.Control className='custom-select' as="select" defaultValue="Popular first">
              <option>Popular first</option>
              <option>...</option>
              <option>...</option>
            </Form.Control>
          </div>
          <div className="reviews-list">
            <div className="review">
              <div className="review__head">
                <div className="review-title">
                  <div className="stars-block">
                    <img src={ ActiveStar } alt="ActiveStar"/>
                    <img src={ ActiveStar } alt="ActiveStar"/>
                    <img src={ ActiveStar } alt="ActiveStar"/>
                    <img src={ ActiveStar } alt="ActiveStar"/>
                    <img src={ ActiveStar } alt="ActiveStar"/>
                  </div>
                  <span className="bold">Very nice experience...</span>
                </div>
                <img src={ FlagIcon } alt="FlagIcon" className="flag"/>
              </div>
              <div className="review__content">
                <div className="left-side">
                  <p className="desc">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                    duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non
                    deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                    Exercitation veniam consequat sunt nostrud amet.
                  </p>
                  <div className="author-block">
                    <img src={ Avatar } alt="Avatar"/>
                    <span className="full-name">Leslie Alexander</span>
                    <span className="commented">commented on</span>
                    <span className="commented-date">10/03/2021</span>
                  </div>
                </div>
                <div className="right-side">
                  <div className="rate-block">
                    <div className="rating">
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                    </div>
                    <span className="rating-name">Responsiveness</span>
                  </div>
                  <div className="rate-block">
                    <div className="rating">
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                    </div>
                    <span className="rating-name">General reception</span>
                  </div>
                  <div className="rate-block">
                    <div className="rating">
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ NoActiveLightStar } alt="NoActiveLightStar"/>
                    </div>
                    <span className="rating-name">Fee / service ratio</span>
                  </div>
                  <div className="rate-block">
                    <div className="rating">
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ NoActiveLightStar } alt="NoActiveLightStar"/>
                    </div>
                    <span className="rating-name">Competences </span>
                  </div>
                  <div className="rate-block">
                    <div className="rating">
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ ActiveStar } alt="ActiveStar"/>
                      <img src={ NoActiveLightStar } alt="NoActiveLightStar"/>
                    </div>
                    <span className="rating-name">Service quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className='load-more'>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/> Load more
        </Button>
      </div>
    </div>
  );
};

export default FourthBlock;