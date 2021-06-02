import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { Button } from 'react-bootstrap';

import GoogleMap from '../../../../components/GoogleMap';
import PropertyBlock from '../../../../containers/Property';

import { AgentsItem } from '../../../../types/agents';
import { RootState } from '../../../../types/state';

import LoadMoreImage from '../../../../assets/images/load-more.svg';

const ThirdBlock = ({elementsOnPage, currentAgency}: { elementsOnPage: number, currentAgency: AgentsItem }) => {

  const {t} = useTranslation('dashboard-page');

  const [sizeArr, setSizeArr] = useState(elementsOnPage);

  const { similarProperty } = useSelector((state: RootState) => state.userInfo);
  const properties = similarProperty.slice(0, elementsOnPage);

  const loadMore = () => {
    setSizeArr(sizeArr + elementsOnPage);
  }

  return (
    <div className="Agency__third-block">
      <div className="main-content">
        <h3>Sold properties</h3>
        <p>by { currentAgency.title }</p>
        <div className="properties-list">
          <div className="left-block position-relative">
            <GoogleMap />
          </div>
          <div className="right-block">
            <div className="property-main-block">
              {
                properties.map(
                  (item, index) =>
                    <PropertyBlock key={ index } property={ {...item, currentNumber: ++index} }/>,
                )
              }
            </div>
            <Button className='load-more' onClick={loadMore}>
              <img src={ LoadMoreImage } alt="LoadMoreImage"/>{ t('button.load-more') }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdBlock;