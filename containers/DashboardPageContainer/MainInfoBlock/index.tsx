import React  from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { RootState } from '../../../types/state';

import arrowIcon from '../../../assets/images/arrow-blue.svg';
import squareIcon from '../../../assets/images/square.svg';
import bedsIcon from '../../../assets/images/beds.svg';
import bathIcon from '../../../assets/images/bath.svg';


const MainInfoBlock = () => {
  const {t} = useTranslation('dashboard-page');
  const { mainProperty } = useSelector((state: RootState) => state.userInfo);

  return (
    <div className='main-info-block'>
      <div className="top-block d-flex align-items-center justify-content-between">
        <h4>{ mainProperty?.search_address }</h4>
        <span className='d-flex align-items-center'>
          { t('link.modify') } <img src={ arrowIcon } alt="arrowIcon"/>
        </span>
      </div>
      <div className="bottom-block d-flex">
        <div className="image-block d-flex">
          <img src={ squareIcon } alt="squareIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.square') }</span>
            <span className="desc">{ mainProperty?.live_area }m²</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bedsIcon } alt="bedsIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.beds') }</span>
            <span className="desc">{ mainProperty?.bedrooms }</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bathIcon } alt="bathIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">{ t('title.baths') }</span>
            <span className="desc">{ mainProperty?.bathrooms }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlock;