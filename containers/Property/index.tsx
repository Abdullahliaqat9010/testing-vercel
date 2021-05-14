import React from 'react';
import { useDispatch } from 'react-redux';
// import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';

import { Button, Image } from 'react-bootstrap';

import { PropertyContainerProps } from '../../types/properties';
import ArrowImage from '../../assets/images/arrow-blue.svg';
import NoImage from '../../assets/images/no-image-available.png';
import { modalWindowContactAgentAction } from '../../actions';

const PropertyContainer = ({property}: PropertyContainerProps) => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const intervals = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 0},
  ];

  const timeSince = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${ count } ${ interval.label }${ count !== 1 ? 's' : '' } ago`;
  };

  const getImageLink = () => {
    if (property.images.length) {
      return property.images[0].url_small;
    }

    return NoImage;
  }

  const openContactModal = (data: object) => {
    dispatch(modalWindowContactAgentAction(data));
  };

  return (
    <div className='property-block d-flex'>
      <div className="property-block__image">
        <Image src={ getImageLink() } rounded/>
      </div>
      <div className="property-block__info">
        <span className="address">{ property.search_address }</span>
        <div className='short-desc'>
          <div className="house-info">
            <span>{ property.live_area }m²</span>
            <span>{ property.bathrooms } Baths</span>
            <span>{ property.bedrooms } Beds</span>
          </div>
          <div className="time">
            <span>{ t('desc.sold') } { timeSince(new Date(property.sold_date)) } </span>
            <a href="#">
              { property.source }
            </a>
          </div>
        </div>
        <Button onClick={
          () => openContactModal({
          title: 'agency.title',
          agencyId: 'agency.id',
          agentName: 'agency.moreInfo.agentName',
          agentSurname: 'agency.moreInfo.agentSurname',
          }) }
                variant="outline-primary">
          { t('button.request-price') }
          <img src={ ArrowImage } alt="ArrowImage"/>
        </Button>
      </div>
    </div>
  );
};
export default PropertyContainer;