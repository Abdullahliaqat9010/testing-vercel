import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';

import { modalWindowContactAgentAction } from '../../actions';

import { PropertyContainerProps } from '../../types/properties';
import ArrowImage from '../../assets/images/arrow-blue.svg';
import NoImage from '../../assets/images/no-image-available.png';

import { agentsList } from '../../templates/agentsList';

const PropertyContainer = ({property}: PropertyContainerProps) => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const router = useRouter();
  const {locale} = router;

  const intervals = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 0},
  ];

  const [currentAgency] = agentsList.filter(agency => agency.tag === property.company_name);

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
            {
              property.company_name &&
              <Link href={ `/agency/${currentAgency.url}` } locale={locale}>
                { property.company_name }
              </Link>
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