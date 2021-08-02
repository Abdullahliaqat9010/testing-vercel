import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { Button, Image } from 'react-bootstrap';

import { modalWindowContactAgentAction, setActivePropertyFromMapAction } from '../../actions';

import { PropertyContainerProps } from '../../types/properties';
import ArrowImage from '../../assets/images/arrow-blue.svg';
import NoImage from '../../assets/images/no-image-available.svg';
import NoImageFr from '../../assets/images/no-image-available-fr.svg';

import { agentsList } from '../../templates/agentsList';
import { RootState } from '../../types/state';
import { useRouter } from 'next/router';

const PropertyContainer = ({property}: PropertyContainerProps) => {
  const {t} = useTranslation('dashboard-page');
  const router = useRouter();

  const {locale} = router;

  const dispatch = useDispatch();
  const intervals = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 0},
  ];

  const {similarPropertiesLocation} = useSelector((state: RootState) => state.userInfo);
  const [activePropertyOnMap] = similarPropertiesLocation.filter(property => property.activeOnMap);

  const [currentAgency] = agentsList.filter(agency => agency.tag === property.company_name);

  const timeSince = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);

    if (interval.label === 'year' && locale === 'fr') {
      return `${ count } ${ t(`span.${interval.label}`) } ${t('sold.ago')}${ count !== 1 ? 's' : '' }`;
    }
    if (interval.label === 'month' && locale === 'fr') {
      return `${ count } ${ t(`span.${interval.label}`) } ${t('sold.ago')}`;
    }
    return `${ count } ${ t(`span.${interval.label}`) }${ count !== 1 ? 's' : '' } ${t('sold.ago')}`;
  };

  const getImageLink = () => {
    if (property.images.length) {
      return property.images[0].url_small;
    }

    return locale === 'fr' ? NoImageFr : NoImage;
  }

  const openContactModal = (data: object) => {
    dispatch(modalWindowContactAgentAction(data));
  };

  const setActiveMarker = (propertyId) => {
    if (propertyId) {
      dispatch(setActivePropertyFromMapAction(propertyId));
    }
    return;
  };

  return (
    <div
      onClick={() => setActiveMarker(property.id)}
      className={ `property-block d-flex ${activePropertyOnMap?.id === property.id ? 'active-block' : ''}` }
    >
      <div className="property-block__image">
        <Image src={ getImageLink() } rounded/>
      </div>
      <div className="property-block__info">
        <div className="address">
          { property.street } { property.zip } { property.locality }
        </div>
        <div className='short-desc'>
          <div className="house-info">
            <span>{ property.live_area }m²</span>
            <span>{ property.bathrooms } Baths</span>
            <span>{ property.bedrooms } Beds</span>
          </div>
          <div className="time">
            <span>{ t('desc.sold') } { timeSince(new Date(property.sold_date)) } </span>
            {
              property.company_name &&
              <a href="#">
                { property.company_name }
              </a>
            }
          </div>
        </div>
        <Button disabled={!currentAgency} onClick={
          () => openContactModal({
          title: currentAgency.title,
          agencyId: currentAgency.id,
          agentName: currentAgency.moreInfo.agentName,
          agentSurname: currentAgency.moreInfo.agentSurname,
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