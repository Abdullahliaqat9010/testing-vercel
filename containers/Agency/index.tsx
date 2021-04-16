import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';

import StarRatingComponent from 'react-star-rating-component';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link'

import RatingStar from '../../assets/images/rating/full-star.svg';
import RatingStarEmpty from '../../assets/images/rating/star.svg';
import ArrowImage from '../../assets/images/arrow-blue.svg';

import { modalWindowContactAgentAction } from '../../actions';
import { AgencyProps } from '../../types/agents';

import GoogleMap from '../../components/GoogleMap';

const Agency = ({agency}: AgencyProps) => {
  const dispatch = useDispatch();
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const openMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const openContactModal = (data: object) => {
    dispatch(modalWindowContactAgentAction(data));
  };

  return (
    <div className="agency-block">
      <div className="short-info d-flex align-items-center">
        <div className="short-info__left d-flex align-items-center w-55">
          <div className="logo-block">
            <img src={ isMobile ? agency.logoMobile : agency.logo } alt={ agency.title }/>
          </div>
          <div className="info">
            <span className="agency-name">{ agency.title }</span>
            <div className="rating-block d-flex align-items-center">
              <span className='total'>{ agency.rate }</span>
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
                value={ Number(agency.rate) }
              />
              <span className="from">from { agency.reviews } reviews</span>
            </div>
            {
              agency.nearest && <span className="nearest">Nearest agency to you</span>
            }
          </div>
        </div>
        <div className="agency-border"/>
        <div className="short-info__right d-flex align-items-center w-45">
          <span className="count-block">{ agency.count }</span>
          <div className="address">
            <p>similar properties sold</p>
            <p className='d-flex'>to
              <span className="address__bold">Route des Cent Ecus, 24370 Sainte Mondane</span>
            </p>
          </div>
        </div>
        <span onClick={ openMoreInfo } className={ `action-btn ${showMoreInfo ? ' open' : ''}` }/>
      </div>
      {
        showMoreInfo &&
        <div className="more-info d-flex justify-content-between">
          <div className="agent-block">
            <div className="agent-info d-flex">
              <Image src={ agency.moreInfo.avatar } roundedCircle />
              <div className="d-flex flex-column">
                <span className="bold">{agency.moreInfo.agentName} {agency.moreInfo.agentSurname}</span>
                <span>{agency.moreInfo.position}</span>
              </div>
            </div>
            <div className="desc">
              During the last 24 months, our agency has sold <span className="bold">39 properties</span> nearby
              including <span className="link">18 similar to yours</span>. Our team is at your disposal to manage
              your project
            </div>
            <Button
              className='contact'
              onClick={() => openContactModal({
                title: agency.title,
                agencyId: agency.id,
                agentName: agency.moreInfo.agentName,
                agentSurname: agency.moreInfo.agentSurname,
              })}
            >
              Contact { agency.moreInfo.agentName }
            </Button>
            <Link href={ '/agency' }>
              <span className="details">Agency details <img src={ArrowImage} alt="ArrowImage"/></span>
            </Link>
          </div>
          {
            !isMobile &&
            <div className="map-block d-flex flex-column">
              <div className="agency-map">
                <GoogleMap lng={agency.location.lng} lat={agency.location.lat}/>
              </div>
              <div className="agency-map__info d-flex justify-content-between">
                <div className="your-property d-flex align-items-center">
                  <div className="orange-circle"/>
                  <span>Your property</span>
                </div>
                <div className="similar-property d-flex align-items-center">
                  <div className="blue-circle"/>
                  <span>Similar property</span>
                </div>
                <div className="other-property d-flex align-items-center">
                  <div className="gray-circle"/>
                  <span>Other properties</span>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Agency;