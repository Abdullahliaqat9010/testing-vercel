import React  from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../types/state';

import arrowIcon from '../../../assets/images/arrow-blue.svg';
import squareIcon from '../../../assets/images/square.svg';
import bedsIcon from '../../../assets/images/beds.svg';
import bathIcon from '../../../assets/images/bath.svg';

const MainInfoBlock = () => {
  const { mainProperty } = useSelector((state: RootState) => state.userInfo);

  return (
    <div className='main-info-block'>
      <div className="top-block d-flex align-items-center justify-content-between">
        <h4>{ mainProperty?.search_address }</h4>
        <span className='d-flex align-items-center'>
          Modify <img src={ arrowIcon } alt="arrowIcon"/>
        </span>
      </div>
      <div className="bottom-block d-flex">
        <div className="image-block d-flex">
          <img src={ squareIcon } alt="squareIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Square</span>
            <span className="desc">{ mainProperty?.live_area }m²</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bedsIcon } alt="bedsIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Beds</span>
            <span className="desc">{ mainProperty?.bedrooms }</span>
          </div>
        </div>
        <div className="image-block d-flex">
          <img src={ bathIcon } alt="bathIcon"/>
          <div className="image-block__info d-flex flex-column">
            <span className="title">Baths</span>
            <span className="desc">{ mainProperty?.bathrooms }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfoBlock;