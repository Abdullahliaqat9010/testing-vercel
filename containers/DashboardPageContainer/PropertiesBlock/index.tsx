import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';

import { Button } from 'react-bootstrap';

import { RootState } from '../../../types/state';

import GoogleMap from '../../../components/GoogleMap';
import PropertyBlock from '../../../containers/Property';

import LoadMoreImage from '../../../assets/images/load-more.svg';
import { propertiesList } from '../../../templates/propertiesList';

const PropertiesBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const elementsOnPage = 3;
  const [sizeArr, setSizeArr] = useState(3);
  const { mainProperty } = useSelector((state: RootState) => state.userInfo);
  const properties = isMobile ? propertiesList.slice(0, sizeArr) : propertiesList;

  const loadMore = () => {
    setSizeArr(sizeArr + elementsOnPage);
  }

  return (
    <div className='properties-block d-flex'>
      {
        !isMobile &&
        <div className="map-block w-50">
          {
            mainProperty && mainProperty.lng && mainProperty.lat
              && <GoogleMap lng={Number(mainProperty.lng)} lat={ Number(mainProperty.lat)}/>
          }
        </div>
      }
      <div className="properties-list w-50">
        <h5>{ t('title.similar-sold-properties') }</h5>
        <p>{ t('desc.we-found') } 1,205 { t('desc.similar-sold-properties') }</p>
        {
          properties.map(
            (item, index) =>
              <PropertyBlock key={ index } property={ item }/>,
          )
        }
        <Button className='load-more' onClick={loadMore}>
          <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }
        </Button>
      </div>
    </div>
  );
};

export default PropertiesBlock;