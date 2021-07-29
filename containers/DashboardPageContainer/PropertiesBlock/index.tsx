import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { isMobileOnly } from 'react-device-detect';

import { Button } from 'react-bootstrap';

import { RootState } from '../../../types/state';
// import { getMoreSimilarPropertyAction } from '../../../actions';

import GoogleMap from '../../../components/GoogleMap';
import PropertyBlock from '../../../containers/Property';

import LoadMoreImage from '../../../assets/images/load-more.svg';
import NoEstimationImage from '../../../assets/images/no-estimation.svg';

const PropertiesBlock = () => {
  const {t} = useTranslation('dashboard-page');
  // const dispatch = useDispatch();
  const elementsOnPage = isMobileOnly ? 3 : 6;
  const [sizeArr, setSizeArr] = useState(elementsOnPage);
  const { mainProperty, similarProperty } = useSelector((state: RootState) => state.userInfo);
  const properties = similarProperty.slice(0, sizeArr);

  const loadMore = () => {
    setSizeArr(sizeArr + elementsOnPage);
  }

  return (
    <div className='properties-block d-flex'>
      {
        !isMobileOnly &&
        <div className="map-block w-48 position-relative">
          {
            mainProperty && mainProperty.lng && mainProperty.lat && <GoogleMap />
          }
        </div>
      }
      <div className="properties-list">
        <h3 className='h5'>{ t('title.similar-sold-properties') }</h3>
        <p>{ t('desc.we-found') } { similarProperty.length } { t('desc.similar-sold-properties') }</p>
        <div className="property-main-block">
          {
            properties.length > 0 ?
              <>
                {
                  properties.map((item, index) => <PropertyBlock key={ index } property={ item }/>)
                }
                {
                  properties.length < similarProperty.length &&
                  <Button className='load-more' onClick={loadMore}>
                    <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }
                  </Button>
                }
              </>
              : <div className="property-main-block__no-items">
                <img src={ NoEstimationImage } alt="NoEstimationImage"/>
                <span>
                  {t('desc.no-items')}
                </span>
              </div>
          }
        </div>

      </div>
    </div>
  );
};

export default PropertiesBlock;