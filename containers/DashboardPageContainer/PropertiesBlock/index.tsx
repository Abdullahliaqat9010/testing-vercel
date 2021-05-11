import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';

import { Button } from 'react-bootstrap';

import { RootState } from '../../../types/state';
import { getMoreSimilarPropertyAction } from '../../../actions';

import GoogleMap from '../../../components/GoogleMap';
import PropertyBlock from '../../../containers/Property';

import LoadMoreImage from '../../../assets/images/load-more.svg';

const PropertiesBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const dispatch = useDispatch();
  const elementsOnPage = isMobile ? 3 : 6;
  const { mainProperty, similarProperty, propertiesListInfo } = useSelector((state: RootState) => state.userInfo);

  const loadMore = () => {
    const { currentPage } = propertiesListInfo;
    dispatch(getMoreSimilarPropertyAction(mainProperty.id, currentPage + 1, elementsOnPage));
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
        <p>{ t('desc.we-found') } { similarProperty.length } { t('desc.similar-sold-properties') }</p>
        <div className="property-main-block">
          {
            similarProperty.map(
              (item, index) =>
                <PropertyBlock key={ index } property={ item }/>,
            )
          }
        </div>
        {
          propertiesListInfo.currentPage < propertiesListInfo.totalPages &&
          <Button className='load-more' onClick={loadMore}>
            <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }
          </Button>
        }
      </div>
    </div>
  );
};

export default PropertiesBlock;