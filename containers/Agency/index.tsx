import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';

import StarRatingComponent from 'react-star-rating-component';
import { Button, Image } from 'react-bootstrap';
// import Link from 'next/link'

import RatingStar from '../../assets/images/rating/full-star.svg';
import RatingStarEmpty from '../../assets/images/rating/star.svg';
import ArrowImage from '../../assets/images/arrow-blue.svg';

import { modalWindowContactAgentAction } from '../../actions';

import { RootState } from '../../types/state';
import { AgencyProps } from '../../types/agents';

import GoogleMap from '../../components/GoogleMap';
// import { parseJwt } from '../../utils';

const Agency = ({agency}: AgencyProps) => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const {mainProperty} = useSelector((state: RootState) => state.userInfo);
  const {
    agencyInfoList,
    agencyCountPropertiesList,
    agencySimilarPropertiesList,
  } = useSelector((state: RootState) => state.agency);
  const [agencyReviews] = agencyInfoList.filter(list => list.place_id === agency.place_id);
  const [agencyPropertiesInfo] = agencyCountPropertiesList.filter(list => list.company_name === agency.tag);
  const [agencySimilarProperties] = agencySimilarPropertiesList.filter(list => list.name === agency.title);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const openMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const openContactModal = (data: object) => {
    //@todo uncomment when will add verify email
    // const userToken = localStorage.getItem('auth');
    // const jwtToken = parseJwt(userToken);
    // if (jwtToken.email_verified) {
    dispatch(modalWindowContactAgentAction(data));
    // } else {
    //   dispatch(pleaseVerifyEmailAction());
    // }
  };

  const agencyRating = (rate) => {
    if (rate) {
      return rate.toString().length > 1 ? rate : rate + '.0';
    }
    return '5.0';
  };

  const agencyTotalUserReview = (reviews) => {
    if (reviews) {
      return reviews;
    }
    return 120;
  };

  return (
    <div className="agency-block">
      <div className="short-info d-flex align-items-center" onClick={ openMoreInfo }>
        <div className="short-info__left d-flex align-items-center w-55">
          <div className="logo-block">
            <img src={ isMobile ? agency.logoMobile : agency.logo } alt={ agency.title }/>
          </div>
          <div className="info">
            <span className="agency-name">{ agency.title }</span>
            <div className="rating-block d-flex align-items-center">
              <span className='total'>{ agencyRating(agencyReviews?.rating) }</span>
              <StarRatingComponent
                name="rate"
                className='custom-rate'
                renderStarIcon={
                  (index, value) =>
                    <img
                      className='rating-star'
                      src={ index <= value ? RatingStar : RatingStarEmpty }
                      alt="RatingStar"
                    />
                }
                starCount={ 5 }
                value={ Number(agencyRating(agencyReviews?.rating)) }
              />
              <span className="from">
                { t('span.from') } { agencyTotalUserReview(agencyReviews?.user_ratings_total) } { t('span.reviews') }
              </span>
            </div>
            {
              agency.nearest && <span className="nearest">{ t('span.nearest-agency') }</span>
            }
          </div>
        </div>
        <div className="agency-border"/>
        <div className="short-info__right d-flex align-items-center w-45">
          <span className="count-block">{ agency.count }</span>
          <div className="address">
            <p>{ t('p.similar-properties-sold') }</p>
            <p className='d-flex'>{ t('p.to') }
              <span className="address__bold">{ mainProperty?.search_address }</span>
            </p>
          </div>
        </div>
        <span className={ `action-btn ${ showMoreInfo ? ' open' : '' }` }/>
      </div>
      {
        showMoreInfo &&
        <div className="more-info d-flex justify-content-between">
          <div className="agent-block">
            <div className="agent-info d-flex">
              <Image src={ agency.moreInfo.avatar } roundedCircle/>
              <div className="d-flex flex-column">
                <span className="bold">{ agency.moreInfo.agentName } { agency.moreInfo.agentSurname }</span>
                <span>{ agency.moreInfo.position }</span>
              </div>
            </div>
            <div className="desc">
              { t('desc-agency.agency-sold') }
              <span className="bold"> { agencyPropertiesInfo?.count || 39 } { t('desc-agency.properties') }
              </span> { t('desc-agency.nearby-including') }
              <span className="link"> { agencySimilarProperties?.count || 18 } { t('desc-agency.similar') }
              </span>. { t('desc-agency.our-team') }
            </div>
            <Button
              className='contact'
              onClick={ () => openContactModal({
                title: agency.title,
                agencyId: agency.id,
                agentName: agency.moreInfo.agentName,
                agentSurname: agency.moreInfo.agentSurname,
              }) }
            >
              { t('button.contact') } { agency.moreInfo.agentName }
            </Button>
            <span
              className="details"
              onClick={ () => openContactModal({
                title: agency.title,
                agencyId: agency.id,
                agentName: agency.moreInfo.agentName,
                agentSurname: agency.moreInfo.agentSurname,
              }) }
            >
                { t('button.agency-details') } <img src={ ArrowImage } alt="ArrowImage"/>
              </span>
          </div>
          {
            !isMobile &&
            <div className="map-block d-flex flex-column">
              <div className="agency-map position-relative">
                {/*@ts-ignore*/ }
                <GoogleMap agencyLocation={ {lat: agency.location.lat, lng: agency.location.lng} }/>
              </div>
              <div className="agency-map__info d-flex justify-content-between">
                <div className="your-property d-flex align-items-center">
                  <div className="orange-circle"/>
                  <span>{ t('span.your-property') }</span>
                </div>
                <div className="similar-property d-flex align-items-center">
                  <div className="blue-circle"/>
                  <span>{ t('span.similar-property') }</span>
                </div>
                <div className="other-property d-flex align-items-center">
                  <div className="gray-circle"/>
                  <span>{ t('span.other-properties') }</span>
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