import React, { useState } from 'react';

import StarRatingComponent from 'react-star-rating-component';

import ContactAgencyBlock from '../../../../components/ContactAgencyBlock';

import BGImage from '../../../../assets/images/agency-page/bg-agency.jpeg';
import RatingStar from '../../../../assets/images/rating/full-star.svg';
import RatingStarEmpty from '../../../../assets/images/rating/star.svg';
import AddressImage from '../../../../assets/images/agency-page/address-icon.svg';
import PhoneImage from '../../../../assets/images/agency-page/phone-icon.svg';
import ScheduleImage from '../../../../assets/images/agency-page/schedule-icon.svg';
import LanguagesImage from '../../../../assets/images/agency-page/langauges-icon.svg';
import FacebookIcon from '../../../../assets/images/agency-page/social/facebook-icon.svg';
import TwitterIcon from '../../../../assets/images/agency-page/social/twitter-icon.svg';
import InstagramIcon from '../../../../assets/images/agency-page/social/instagram-icon.svg';
import YoutubeIcon from '../../../../assets/images/agency-page/social/youtube-icon.svg';
import LinkedinIcon from '../../../../assets/images/agency-page/social/linkedin-icon.svg';
import ArrowImage from '../../../../assets/images/arrow-blue.svg';

const FirstBlock = () => {

  const [show, setShowBlock] = useState<boolean>(false);

  const showPhone = () => {
    setShowBlock(true);
  };

  return (
    <div className="Agency__first-block">
      <div className="main-content">
        <img className='main-content__bg' src={ BGImage } alt="BGImage"/>
        <div className="agency-info">
          <div className='d-flex agency-info__title'>
            <div className="logo-block">

            </div>
            <div className="agency-info__block">
              <h1 className="agency-name">Century 21 - PATRIMOINE 24</h1>
              <div className="rating-block d-flex align-items-center">
                <span className='total'>5.0</span>
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
                  value={ 5 }
                />
                <span className="from">from 120 reviews</span>
              </div>
              <span className='gray'>With Immo Belgium since 2021</span>
            </div>
          </div>
          <div className="agency-info__contact-block">
            <h2>Contact details</h2>
            <div className="contact-agency-list">
              <div className="contact-agency-list__name">
                <img src={ AddressImage } alt="AddressImage"/>
                <span>Address</span>
              </div>
              <div className="contact-agency-list__info">
                <span>2464 Royal Ln. Mesa, New Jersey 45463</span>
              </div>
            </div>
            <div className="contact-agency-list">
              <div className="contact-agency-list__name">
                <img src={ PhoneImage } alt="PhoneImage"/>
                <span>Contact Phone</span>
              </div>
              <div className="contact-agency-list__info">
                {
                  show
                    ? <span className='hidden-phone'>3213 3213 321</span>
                    : <span onClick={ showPhone } className='show-phone'>Show Phone</span>
                }
              </div>
            </div>
            <div className="contact-agency-list">
              <div className="contact-agency-list__name">
                <img src={ ScheduleImage } alt="ScheduleImage"/>
                <span>Schedule</span>
              </div>
              <div className="contact-agency-list__info">
                <span>Mon-Fri: 9AM-6PM, Sat: 11AM-4PM</span>
              </div>
            </div>
            <div className="contact-agency-list">
              <div className="contact-agency-list__name">
                <img src={ LanguagesImage } alt="LanguagesImage"/>
                <span>Languages</span>
              </div>
              <div className="contact-agency-list__info">
                <span>English, French, Deutsch</span>
              </div>
            </div>
          </div>
          <div className="agency-info__social-links">
            <p>Connect on socials</p>
            <div className="social-block">
              <img src={ FacebookIcon } alt="FacebookIcon"/>
              <img src={ TwitterIcon } alt="TwitterIcon"/>
              <img src={ InstagramIcon } alt="InstagramIcon"/>
              <img src={ YoutubeIcon } alt="YoutubeIcon"/>
              <img src={ LinkedinIcon } alt="LinkedinIcon"/>
            </div>
          </div>
          <div className="agency-info__about_us">
            <h3>About agency</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra ante at tellus
              feugiat, ac consectetur erat ultricies. Aliquam facilisis tincidunt sem eu condimentum. Quisque
              et nisi sed lorem lacinia ullamcorper. Integer eget euismod ante, vel ullamcorper tellus. Maecenas
              mattis luctus est, sit amet tincidunt est semper ut. Curabitur at mi commodo, sollicitudin sapien
              eget, convallis massa. Proin dapibus sed urna eget ornare. Sed suscipit ligula justo, et mollis arcu
              finibus id. Fusce id blandit est. Sed dapibus egestas massa, at dignissim augue ornare vel. Mauris
              porttitor lacus quis convallis pretium. Nullam quis vestibulum mauris, ut hendrerit ex.
            </p>
            <span className='show-more'><img src={ ArrowImage } alt="ArrowImage"/>Show more</span>
          </div>
        </div>
      </div>
      <ContactAgencyBlock/>
    </div>
  )
};

export default FirstBlock;